interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
}

export default function SectionHeader({ badge, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div className="section-badge">{badge}</div>
      <h2 className="section-title">{title}</h2>
      <p className="section-subtitle">{subtitle}</p>
    </div>
  );
}
