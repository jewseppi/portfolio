import GitHubIcon from "@/components/icons/GitHubIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import EmailIcon from "@/components/icons/EmailIcon";

export default function SocialDock() {
  return (
    <div className="social-dock">
      <a
        href="https://github.com/jewseppi"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
      >
        <GitHubIcon />
      </a>
      <a
        href="https://www.linkedin.com/in/joseph-silverman/"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
      >
        <LinkedInIcon />
      </a>
      <a href="mailto:joseph@jsilverman.ca" className="social-link">
        <EmailIcon />
      </a>
    </div>
  );
}
