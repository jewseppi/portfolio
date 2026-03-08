export interface ProjectLink {
  label: string;
  icon: string;
  url: string;
}

export interface Project {
  id: string;
  icon: string;
  title: string;
  description: string;
  techStack: string[];
  links: ProjectLink[];
}
