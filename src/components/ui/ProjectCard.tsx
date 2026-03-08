import { Project } from "@/types/project";
import TechTag from "./TechTag";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card">
      <div className="project-icon">{project.icon}</div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.description}</p>
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
    </div>
  );
}
