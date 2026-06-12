import { Project } from "@/types/project";
import TechTag from "./TechTag";

interface ProjectCardProps {
  project: Project;
}

const statusLabels: Record<Project["status"], string> = {
  live: "Live",
  "in-progress": "In Progress",
  documented: "Case Study",
  conditional: "Conditional",
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-card-header">
        <div className="project-icon">{project.icon}</div>
        <span className={`project-status project-status-${project.status}`}>
          <span className="project-status-dot" aria-hidden="true" />
          {statusLabels[project.status]}
        </span>
      </div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <ul className="project-highlights">
        {project.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <div className="project-tech">
        {project.techStack.map((tech) => (
          <TechTag key={tech} label={tech} />
        ))}
      </div>
      <div className="project-links">
        {project.links.map((link) => (
          <a key={link.label} href={link.url} className="project-link">
            <span>{link.icon}</span>
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}
