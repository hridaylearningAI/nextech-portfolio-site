import {
  ArrowRightIcon,
  CalendarCheckIcon,
  CertificateIcon,
  ClockIcon,
  EnvelopeIcon,
  FacebookLogoIcon,
  FactoryIcon,
  FlaskIcon,
  GaugeIcon,
  GearIcon,
  GlobeHemisphereWestIcon,
  GlobeIcon,
  HandshakeIcon,
  InstagramLogoIcon,
  LeafIcon,
  LinkedinLogoIcon,
  LightningIcon,
  HardHatIcon,
  MapPinIcon,
  PlugIcon,
  PhoneIcon,
  ShieldCheckIcon,
  ShippingContainerIcon,
  SkypeLogoIcon,
  DropIcon,
  UsersIcon,
  WrenchIcon,
  XLogoIcon,
  YoutubeLogoIcon,
  BlueprintIcon,
  ChartBarIcon,
  ClipboardTextIcon,
  CompassIcon,
  DiamondIcon,
  EyeIcon,
  KanbanIcon,
  MagnifyingGlassIcon,
  SealCheckIcon,
  SpeakerHighIcon,
  SpeakerSlashIcon,
  TargetIcon,
  TrendUpIcon,
  UserIcon,
  UsersThreeIcon,
  CraneIcon,
  PauseIcon,
  PlayIcon,
} from "@phosphor-icons/react/dist/ssr";

const GLYPHS = {
  pause: PauseIcon,
  play: PlayIcon,
  blueprint: BlueprintIcon,
  chart: ChartBarIcon,
  clipboard: ClipboardTextIcon,
  compass: CompassIcon,
  diamond: DiamondIcon,
  eye: EyeIcon,
  kanban: KanbanIcon,
  search: MagnifyingGlassIcon,
  seal: SealCheckIcon,
  soundOn: SpeakerHighIcon,
  soundOff: SpeakerSlashIcon,
  target: TargetIcon,
  trend: TrendUpIcon,
  user: UserIcon,
  team: UsersThreeIcon,
  crane: CraneIcon,
  arrow: ArrowRightIcon,
  calendar: CalendarCheckIcon,
  certificate: CertificateIcon,
  clock: ClockIcon,
  email: EnvelopeIcon,
  facebook: FacebookLogoIcon,
  rig: FactoryIcon,
  flask: FlaskIcon,
  gauge: GaugeIcon,
  hardhat: HardHatIcon,
  plug: PlugIcon,
  wrench: WrenchIcon,
  cog: GearIcon,
  globe: GlobeHemisphereWestIcon,
  website: GlobeIcon,
  handshake: HandshakeIcon,
  instagram: InstagramLogoIcon,
  leaf: LeafIcon,
  linkedin: LinkedinLogoIcon,
  bolt: LightningIcon,
  address: MapPinIcon,
  phone: PhoneIcon,
  shield: ShieldCheckIcon,
  ship: ShippingContainerIcon,
  skype: SkypeLogoIcon,
  drop: DropIcon,
  users: UsersIcon,
  twitter: XLogoIcon,
  youtube: YoutubeLogoIcon,
};
export type IconName = keyof typeof GLYPHS;
export function Symbol({
  name,
  className = "size-6",
  weight = "regular",
}: {
  name: IconName;
  className?: string;
  /** Phosphor stroke weight. "thin"/"light" read as line drawing. */
  weight?: "thin" | "light" | "regular" | "bold";
}) {
  const Glyph = GLYPHS[name];
  return (
    <Glyph
      weight={weight}
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    />
  );
}
/** Keeps the original cards' icon API and dimensions. */
export function Icon({
  children,
  className = "size-7",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 [&>svg]:size-full ${className}`}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
export const ICONS: Record<string, React.ReactNode> = Object.fromEntries(
  Object.entries(GLYPHS).map(([key, Glyph]) => [
    key,
    <Glyph key={key} weight="regular" />,
  ]),
);
export const SOCIAL_ICONS: Record<string, IconName> = {
  LinkedIn: "linkedin",
};
