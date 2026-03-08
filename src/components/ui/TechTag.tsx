interface TechTagProps {
  label: string;
}

export default function TechTag({ label }: TechTagProps) {
  return <span className="tech-tag">{label}</span>;
}
