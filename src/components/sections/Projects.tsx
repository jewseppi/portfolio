import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="page-section fade-in">
      <div className="container">
        <SectionHeader
          badge="🚀 Projects"
          title="Enterprise Projects & Tools"
          subtitle="Real-world infrastructure, testing frameworks, and developer tools"
        />

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
