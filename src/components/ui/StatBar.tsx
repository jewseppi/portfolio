interface Stat {
  number: string;
  label: string;
}

const stats: Stat[] = [
  { number: "15+", label: "Years Enterprise Dev" },
  { number: "CI/CD", label: "& DevOps" },
  { number: "Testing", label: "Infrastructure" },
];

export default function StatBar() {
  return (
    <div className="hero-stats">
      {stats.map((stat) => (
        <div key={stat.label} className="stat">
          <span className="stat-number">{stat.number}</span>
          <span className="stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
