"use client";
import React, { useRef, useMemo, useState, useCallback, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Line, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

export interface GlobeMarker {
  lat: number;
  lng: number;
  src: string;
  label?: string;
  size?: number;
}

export interface Globe3DConfig {
  /** Globe radius */
  radius?: number;
  /** Globe base color (used as fallback or tint) */
  globeColor?: string;
  /** URL to the Earth texture map */
  textureUrl?: string;
  /** URL to the bump/elevation map for terrain */
  bumpMapUrl?: string;
  /** Whether to show atmosphere glow */
  showAtmosphere?: boolean;
  /** Atmosphere color */
  atmosphereColor?: string;
  /** Atmosphere intensity */
  atmosphereIntensity?: number;
  /** Atmosphere blur/softness (higher = more diffuse, default 3) */
  atmosphereBlur?: number;
  /** Terrain bump scale (0 = flat, higher = more pronounced) */
  bumpScale?: number;
  /** Auto rotate speed (0 = disabled) */
  autoRotateSpeed?: number;
  /** Enable zoom */
  enableZoom?: boolean;
  /** Enable pan */
  enablePan?: boolean;
  /** Min zoom distance */
  minDistance?: number;
  /** Max zoom distance */
  maxDistance?: number;
  /** Initial rotation */
  initialRotation?: { x: number; y: number };
  /** Marker default size */
  markerSize?: number;
  /** Show wireframe overlay */
  showWireframe?: boolean;
  /** Wireframe color */
  wireframeColor?: string;
  /** Ambient light intensity */
  ambientIntensity?: number;
  /** Point light intensity */
  pointLightIntensity?: number;
  /** Background color (null for transparent) */
  backgroundColor?: string | null;
  /** Colour of the hub marker's ring and of the arcs to it */
  arcColor?: string;
  /** Flow the dashes along each arc towards the hub (set false for reduced motion) */
  animateArcs?: boolean;
}

interface Globe3DProps {
  /** Array of markers to display on the globe */
  markers?: GlobeMarker[];
  /** Globe configuration */
  config?: Globe3DConfig;
  /** Additional CSS classes */
  className?: string;
  /** Callback when a marker is clicked */
  onMarkerClick?: (marker: GlobeMarker) => void;
  /** Callback when a marker is hovered */
  onMarkerHover?: (marker: GlobeMarker | null) => void;
  /**
   * Optional hub, e.g. a head office. Rendered as a highlighted marker, with a
   * dashed arc drawn from every other marker to it.
   */
  hub?: GlobeMarker;
}

// ============================================================================
// Constants - Earth Texture URLs (NASA Blue Marble)
// ============================================================================

const DEFAULT_EARTH_TEXTURE =
  "https://cdn.21st.dev/assets/localized/228deba2e4b600146bdcb6cfa359b8ead6aacc2b1c13550a29cd82824cfa1c01.jpg";
const DEFAULT_BUMP_TEXTURE =
  "https://cdn.21st.dev/assets/localized/839b12da2e4dd346b256cebae72e10c479a102c8980a22084c41275e4b9a0e12.png";

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Convert latitude/longitude to 3D cartesian coordinates
 */
function latLngToVector3(
  lat: number,
  lng: number,
  radius: number,
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

/**
 * Points along the great circle between two markers, lifted off the surface so
 * the arc reads as a flight path rather than a line painted on the map. Longer
 * routes are lifted higher, which keeps them from grazing the globe.
 */
function arcPoints(
  from: GlobeMarker,
  to: GlobeMarker,
  radius: number,
  segments = 64,
): THREE.Vector3[] {
  const a = latLngToVector3(from.lat, from.lng, 1);
  const b = latLngToVector3(to.lat, to.lng, 1);
  const angle = a.angleTo(b);
  const sinAngle = Math.sin(angle);
  const lift = 0.05 + 0.24 * (angle / Math.PI);

  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    // Spherical interpolation, so points are evenly spaced along the route.
    const direction =
      sinAngle < 1e-6
        ? a.clone()
        : a
            .clone()
            .multiplyScalar(Math.sin((1 - t) * angle) / sinAngle)
            .add(b.clone().multiplyScalar(Math.sin(t * angle) / sinAngle));
    const height = radius * (1.002 + lift * Math.sin(Math.PI * t));
    points.push(direction.normalize().multiplyScalar(height));
  }
  return points;
}

// ============================================================================
// Marker Component (static - rotation handled by parent group)
// ============================================================================

interface MarkerProps {
  marker: GlobeMarker;
  radius: number;
  defaultSize: number;
  onClick?: (marker: GlobeMarker) => void;
  onHover?: (marker: GlobeMarker | null) => void;
  /** Ring colour for a highlighted (hub) marker. Omit for a normal marker. */
  highlight?: string;
}

function Marker({
  marker,
  radius,
  defaultSize,
  onClick,
  onHover,
  highlight,
}: MarkerProps) {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const groupRef = useRef<THREE.Group>(null);
  const imageGroupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Surface position (where the line starts)
  const surfacePosition = useMemo(() => {
    return latLngToVector3(marker.lat, marker.lng, radius * 1.001);
  }, [marker.lat, marker.lng, radius]);

  // Top of the line (where the image is) - hub sits a touch further out so
  // the larger UAE flag chip clears the atmosphere rim without being clipped.
  const topPosition = useMemo(() => {
    const lift = highlight ? 1.24 : 1.18;
    return latLngToVector3(marker.lat, marker.lng, radius * lift);
  }, [marker.lat, marker.lng, radius, highlight]);

  const lineHeight = topPosition.distanceTo(surfacePosition);

  // Check if marker is facing the camera
  useFrame(() => {
    if (!imageGroupRef.current) return;

    // Get the world position of the image (the positioned element)
    const worldPos = new THREE.Vector3();
    imageGroupRef.current.getWorldPosition(worldPos);

    // Direction from globe center (0,0,0) to marker
    const markerDirection = worldPos.clone().normalize();

    // Direction from globe center to camera
    const cameraDirection = camera.position.clone().normalize();

    // Dot product: positive means facing camera, negative means behind
    const dot = markerDirection.dot(cameraDirection);

    // Upstream compared against a fixed 0.1, which is well past the horizon:
    // markers on the far side stayed visible and, because <Html> is not depth
    // tested, drew *in front of* the globe. The true horizon for a sphere seen
    // from distance d is dot === radius / d, so derive it instead of guessing.
    // Hub keeps a smaller margin so Abu Dhabi stays readable near the limb.
    const cameraDistance = camera.position.length();
    const horizon = cameraDistance > radius ? radius / cameraDistance : 0;
    const margin = highlight ? 0.01 : 0.04;
    setIsVisible(dot > horizon + margin);
  });

  const handlePointerEnter = useCallback(() => {
    setHovered(true);
    onHover?.(marker);
  }, [marker, onHover]);

  const handlePointerLeave = useCallback(() => {
    setHovered(false);
    onHover?.(null);
  }, [onHover]);

  const handleClick = useCallback(() => {
    onClick?.(marker);
  }, [marker, onClick]);

  // Calculate line center and orientation
  const { lineCenter, lineQuaternion } = useMemo(() => {
    const center = surfacePosition.clone().lerp(topPosition, 0.5);

    // Calculate rotation to align cylinder with the direction from surface to top
    const direction = topPosition.clone().sub(surfacePosition).normalize();
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

    return { lineCenter: center, lineQuaternion: quaternion };
  }, [surfacePosition, topPosition]);

  // px size of the marker chip. Upstream hardcoded 8px and ignored `marker.size`
  // entirely, which makes a flag or logo unreadable. Honour the per-marker value
  // and keep 8 as the fallback. Deliberately NOT falling back to `defaultSize`:
  // config.markerSize defaults to 0.06, a 3D unit, and 0.06px would vanish.
  //
  // Flag chips are rectangles (≈2:1), not circles: UAE, Qatar and others have
  // a vertical hoist stripe that a round crop shears off.
  const chipHeight = marker.size ?? 8;
  const chipWidth = Math.round(chipHeight * 1.7);

  return (
    <group ref={groupRef} visible={isVisible}>
      {/* Pin line from surface to image - properly oriented */}
      <mesh position={lineCenter} quaternion={lineQuaternion}>
        <cylinderGeometry args={[0.003, 0.003, lineHeight, 8]} />
        <meshBasicMaterial
          color={hovered ? "#ffffff" : "#94a3b8"}
          transparent
          opacity={hovered ? 0.9 : 0.6}
        />
      </mesh>

      {/* Pin point at the surface */}
      <mesh position={surfacePosition} quaternion={lineQuaternion}>
        <coneGeometry args={[0.015, 0.04, 8]} />
        <meshBasicMaterial color={hovered ? "#f97316" : "#ef4444"} />
      </mesh>

      {/* Circular image at the top */}
      <group ref={imageGroupRef} position={topPosition}>
        <Html
          transform
          center
          sprite
          distanceFactor={10}
          style={{
            pointerEvents: isVisible ? "auto" : "none",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.15s ease-out",
          }}
        >
          <div className="relative p-1">
            {/* The hub gets a pulsing halo in its accent colour. The global
                reduced-motion rule stops the pulse after one cycle. */}
            {highlight && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 animate-ping rounded-sm"
                style={{ boxShadow: `0 0 0 2px ${highlight}` }}
              />
            )}
            <div
              className={cn(
                "cursor-pointer overflow-hidden rounded-sm bg-neutral-900 shadow-lg ring-1 ring-black/20 transition-transform duration-200",
                hovered && "scale-125 shadow-xl ring-white/50",
              )}
              style={{
                width: `${chipWidth}px`,
                height: `${chipHeight}px`,
                boxShadow: highlight ? `0 0 0 2px ${highlight}` : undefined,
              }}
              onMouseEnter={handlePointerEnter}
              onMouseLeave={handlePointerLeave}
              onClick={handleClick}
            >
              <img
                src={marker.src}
                alt={marker.label || "Marker"}
                className="h-full w-full object-cover object-left"
                draggable={false}
              />
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}

// ============================================================================
// Arcs to the hub
// ============================================================================

interface ArcsProps {
  markers: GlobeMarker[];
  hub: GlobeMarker;
  radius: number;
  color: string;
  animate: boolean;
}

/**
 * Dashed routes from every marker to the hub. Drawn with drei's Line (a fat
 * line in screen-space pixels, so it stays visible on high-DPI screens) and
 * depth tested, so the far side of each route is hidden by the globe itself.
 */
function Arcs({ markers, hub, radius, color, animate }: ArcsProps) {
  const routes = useMemo(
    () =>
      markers
        .filter((m) => m.lat !== hub.lat || m.lng !== hub.lng)
        .map((m) => ({
          key: `${m.lat},${m.lng}`,
          points: arcPoints(m, hub, radius),
        })),
    [markers, hub, radius],
  );

  const group = useRef<THREE.Group>(null);

  // Decreasing dashOffset moves the dashes forward along each line, which
  // runs from the marker to the hub, so the flow reads as inbound.
  useFrame((_, delta) => {
    if (!animate || !group.current) return;
    group.current.traverse((obj) => {
      const material = (obj as THREE.Mesh).material as
        (THREE.Material & { dashOffset?: number }) | undefined;
      if (material && typeof material.dashOffset === "number") {
        material.dashOffset -= delta * 0.12;
      }
    });
  });

  return (
    <group ref={group}>
      {routes.map((route) => (
        <Line
          key={route.key}
          points={route.points}
          color={color}
          lineWidth={1.2}
          dashed
          dashSize={0.045}
          gapSize={0.035}
          transparent
          opacity={0.85}
        />
      ))}
    </group>
  );
}

// ============================================================================
// Rotating Globe with Markers (all rotate together)
// ============================================================================

interface RotatingGlobeProps {
  config: Required<Globe3DConfig>;
  markers: GlobeMarker[];
  hub?: GlobeMarker;
  onMarkerClick?: (marker: GlobeMarker) => void;
  onMarkerHover?: (marker: GlobeMarker | null) => void;
}

function RotatingGlobe({
  config,
  markers,
  hub,
  onMarkerClick,
  onMarkerHover,
}: RotatingGlobeProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Load and configure the Earth textures. The configuration goes in
  // useTexture's own onLoad rather than a separate effect: mutating a value a
  // hook returned is what react-hooks/immutability rejects, and this is the
  // hook that constructs them, so it is also the correct place to set them up.
  const [earthTexture, bumpTexture] = useTexture(
    [config.textureUrl, config.bumpMapUrl],
    (loaded) => {
      const [earth, bump] = Array.isArray(loaded) ? loaded : [loaded];
      if (earth) {
        earth.colorSpace = THREE.SRGBColorSpace;
        earth.anisotropy = 16;
      }
      if (bump) {
        bump.anisotropy = 8;
      }
    },
  );

  // Create geometries
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(config.radius, 64, 64);
  }, [config.radius]);

  const wireframeGeometry = useMemo(() => {
    return new THREE.SphereGeometry(config.radius * 1.002, 32, 16);
  }, [config.radius]);

  return (
    <group
      ref={groupRef}
      rotation={[config.initialRotation.x, config.initialRotation.y, 0]}
    >
      {/* Main globe mesh with Earth texture */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          map={earthTexture}
          bumpMap={bumpTexture}
          bumpScale={config.bumpScale * 0.05}
          roughness={0.7}
          metalness={0.0}
        />
      </mesh>

      {/* Wireframe overlay */}
      {config.showWireframe && (
        <mesh geometry={wireframeGeometry}>
          <meshBasicMaterial
            color={config.wireframeColor}
            wireframe
            transparent
            opacity={0.08}
          />
        </mesh>
      )}

      {/* Markers - now inside the rotating group */}
      {markers.map((marker, index) => (
        <Marker
          key={`marker-${index}-${marker.lat}-${marker.lng}`}
          marker={marker}
          radius={config.radius}
          defaultSize={config.markerSize}
          onClick={onMarkerClick}
          onHover={onMarkerHover}
        />
      ))}

      {/* Hub, and the routes to it - inside the rotating group so they turn
          with the Earth rather than staying fixed to the camera */}
      {hub && (
        <>
          <Arcs
            markers={markers}
            hub={hub}
            radius={config.radius}
            color={config.arcColor}
            animate={config.animateArcs}
          />
          <Marker
            marker={hub}
            radius={config.radius}
            defaultSize={config.markerSize}
            onClick={onMarkerClick}
            onHover={onMarkerHover}
            highlight={config.arcColor}
          />
        </>
      )}
    </group>
  );
}

// ============================================================================
// Atmosphere Component (stays static - doesn't rotate)
// ============================================================================

interface AtmosphereProps {
  radius: number;
  color: string;
  intensity: number;
  blur: number;
}

function Atmosphere({ radius, color, intensity, blur }: AtmosphereProps) {
  // blur controls the fresnel exponent: lower = more diffuse, higher = sharper edge
  // We invert it so higher blur value = more diffuse (lower exponent)
  const fresnelPower = Math.max(0.5, 5 - blur);

  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        atmosphereColor: { value: new THREE.Color(color) },
        intensity: { value: intensity },
        fresnelPower: { value: fresnelPower },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 atmosphereColor;
        uniform float intensity;
        uniform float fresnelPower;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float fresnel = pow(1.0 - abs(dot(vNormal, normalize(-vPosition))), fresnelPower);
          gl_FragColor = vec4(atmosphereColor, fresnel * intensity);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
  }, [color, intensity, fresnelPower]);

  return (
    <mesh scale={[1.12, 1.12, 1.12]}>
      <sphereGeometry args={[radius, 64, 32]} />
      <primitive object={atmosphereMaterial} attach="material" />
    </mesh>
  );
}

// ============================================================================
// Scene Component
// ============================================================================

interface SceneProps {
  markers: GlobeMarker[];
  hub?: GlobeMarker;
  config: Required<Globe3DConfig>;
  onMarkerClick?: (marker: GlobeMarker) => void;
  onMarkerHover?: (marker: GlobeMarker | null) => void;
}

function Scene({
  markers,
  hub,
  config,
  onMarkerClick,
  onMarkerHover,
}: SceneProps) {
  const { camera } = useThree();

  // Set initial camera position (pulled back so flag markers clear the frame)
  React.useEffect(() => {
    camera.position.set(0, 0, config.radius * 3.85);
    camera.lookAt(0, 0, 0);
  }, [camera, config.radius]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={config.ambientIntensity} />
      <directionalLight
        position={[config.radius * 5, config.radius * 2, config.radius * 5]}
        intensity={config.pointLightIntensity}
        color="#ffffff"
      />
      <directionalLight
        position={[-config.radius * 3, config.radius, -config.radius * 2]}
        intensity={config.pointLightIntensity * 0.3}
        color="#88ccff"
      />

      {/* Rotating Globe with Markers */}
      <RotatingGlobe
        config={config}
        markers={markers}
        hub={hub}
        onMarkerClick={onMarkerClick}
        onMarkerHover={onMarkerHover}
      />

      {/* Atmosphere (static) */}
      {config.showAtmosphere && (
        <Atmosphere
          radius={config.radius}
          color={config.atmosphereColor}
          intensity={config.atmosphereIntensity}
          blur={config.atmosphereBlur}
        />
      )}

      {/* Controls */}
      <OrbitControls
        makeDefault
        enablePan={config.enablePan}
        enableZoom={config.enableZoom}
        minDistance={config.minDistance}
        maxDistance={config.maxDistance}
        rotateSpeed={0.4}
        autoRotate={config.autoRotateSpeed > 0}
        autoRotateSpeed={config.autoRotateSpeed}
        enableDamping
        dampingFactor={0.1}
      />
    </>
  );
}

// ============================================================================
// Loading Fallback
// ============================================================================

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex shrink-0 flex-col items-center gap-3">
        <span className="inline-block shrink-0 text-sm text-neutral-400">
          Loading globe...
        </span>
      </div>
    </Html>
  );
}

// ============================================================================
// Main Globe3D Component
// ============================================================================

const defaultConfig: Required<Globe3DConfig> = {
  radius: 2,
  globeColor: "#1a1a2e",
  textureUrl: DEFAULT_EARTH_TEXTURE,
  bumpMapUrl: DEFAULT_BUMP_TEXTURE,
  showAtmosphere: false,
  atmosphereColor: "#4da6ff",
  atmosphereIntensity: 0.5,
  atmosphereBlur: 2,
  bumpScale: 1,
  autoRotateSpeed: 0.3,
  enableZoom: false,
  enablePan: false,
  minDistance: 5,
  maxDistance: 15,
  initialRotation: { x: 0, y: 0 },
  markerSize: 0.06,
  showWireframe: false,
  wireframeColor: "#4a9eff",
  ambientIntensity: 0.6,
  pointLightIntensity: 1.5,
  backgroundColor: null,
  arcColor: "#7dd3fc",
  animateArcs: true,
};

export function Globe3D({
  markers = [],
  config = {},
  className,
  onMarkerClick,
  onMarkerHover,
  hub,
}: Globe3DProps) {
  const mergedConfig = useMemo(
    () => ({ ...defaultConfig, ...config }),
    [config],
  );

  return (
    <div className={cn("relative h-[500px] w-full overflow-visible", className)}>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [0, 0, mergedConfig.radius * 3.85],
        }}
        style={{
          background: mergedConfig.backgroundColor || "transparent",
          overflow: "visible",
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene
            markers={markers}
            hub={hub}
            config={mergedConfig}
            onMarkerClick={onMarkerClick}
            onMarkerHover={onMarkerHover}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Globe3D;
