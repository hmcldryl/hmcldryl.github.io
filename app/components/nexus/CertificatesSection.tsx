"use client";

import { usePortfolio } from "@/lib/contexts/PortfolioContext";

export function CertificatesSection() {
  const { certificates } = usePortfolio();

  if (!certificates?.length) return null;

  return (
    <section id="certificates" className="py-16 px-5 md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <div className="mb-10" data-reveal>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-on-surface mb-2">
            Certificates
          </h2>
          <div className="w-16 h-[3px] bg-black" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert, i) => {
            const Card = (
              <div className="brutal-press brutal-panel p-5 h-full flex flex-col">
                <span className="material-symbols-outlined text-2xl text-primary mb-2">
                  workspace_premium
                </span>
                <h3 className="font-display text-base font-semibold text-on-surface mb-1">
                  {cert.name}
                </h3>
                <p className="text-on-surface-variant text-[13px] mb-1">
                  {cert.issuer}
                </p>
                <p className="text-on-surface-variant text-[12px] mt-auto">
                  {cert.date}
                </p>
              </div>
            );

            return cert.link ? (
              <a key={i} href={cert.link} target="_blank" rel="noopener noreferrer" className="block">
                {Card}
              </a>
            ) : (
              <div key={i}>{Card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
