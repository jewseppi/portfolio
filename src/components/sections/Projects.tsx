import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="page-section fade-in">
      <div className="container">
        <SectionHeader
          badge="🚀 Current Work"
          title="AI-Driven Projects & Innovations"
          subtitle="Bridging enterprise software expertise with AI technologies"
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
