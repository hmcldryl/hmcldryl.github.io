import { portfolio } from "@/lib/portfolio";

const linkCls = "text-[13px] font-medium text-on-surface-variant hover:text-primary-ink transition-colors";

export function Footer() {
  const { name, github, linkedin, email } = portfolio.personalInfo;

  return (
    <footer className="w-full py-8 border-t-4 border-black">
      <div className="flex flex-col md:flex-row justify-between items-center px-5 md:px-margin-desktop max-w-container-max mx-auto gap-3">
        <div className="text-[13px] text-on-surface-variant">
          © {new Date().getFullYear()} {name}
        </div>
        <div className="flex gap-5">
          <a href={github} target="_blank" rel="noopener noreferrer" className={linkCls}>
            GitHub
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className={linkCls}>
            LinkedIn
          </a>
          <a href={`mailto:${email}`} className={linkCls}>
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
