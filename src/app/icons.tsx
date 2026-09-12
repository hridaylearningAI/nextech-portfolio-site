import {
  ArrowRightIcon,
  CalendarCheckIcon,
  CertificateIcon,
  ClockIcon,
  EnvelopeIcon,
  FacebookLogoIcon,
  FactoryIcon,
  FlaskIcon,
  GearIcon,
  GlobeHemisphereWestIcon,
  GlobeIcon,
  HandshakeIcon,
  InstagramLogoIcon,
  LeafIcon,
  LightningIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  ShippingContainerIcon,
  SkypeLogoIcon,
  DropIcon,
  UsersIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

const GLYPHS = {
  arrow: ArrowRightIcon,
  calendar: CalendarCheckIcon,
  certificate: CertificateIcon,
  clock: ClockIcon,
  email: EnvelopeIcon,
  facebook: FacebookLogoIcon,
  rig: FactoryIcon,
  flask: FlaskIcon,
  cog: GearIcon,
  globe: GlobeHemisphereWestIcon,
  website: GlobeIcon,
  handshake: HandshakeIcon,
  instagram: InstagramLogoIcon,
  leaf: LeafIcon,
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
}: {
  name: IconName;
  className?: string;
}) {
  const Glyph = GLYPHS[name];
  return (
    <Glyph
      weight="regular"
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
  Facebook: "facebook",
  Twitter: "twitter",
  Instagram: "instagram",
  YouTube: "youtube",
  Skype: "skype",
};
