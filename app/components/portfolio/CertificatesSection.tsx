import Image from "next/image";
import { portfolio } from "@/lib/portfolio";
import { SectionHeading } from "./SectionHeading";

export function CertificatesSection() {
  const { certificates } = portfolio;

  if (!certificates?.length) return null;

  return (
    <section id="certificates" className="py-12 md:py-16 px-5 md:px-10 xl:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <SectionHeading title="Certificates" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert, i) => {
            const Card = (
              <div className={`${cert.link ? "brutal-press" : ""} brutal-panel p-5 h-full flex flex-col`}>
                {cert.image ? (
                  <div className="relative h-32 border-2 border-black mb-3">
                    <Image
                      src={`/certificates/${cert.image}`}
                      alt={cert.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <span className="icon text-[24px] text-primary-ink mb-2">
                    workspace_premium
                  </span>
                )}
                <h3 className="font-display text-base font-semibold text-on-surface mb-1">
                  {cert.name}
                </h3>
                <p className="text-on-surface-variant text-[13px] mb-1">
                  {cert.issuer}
                </p>
                <p className="text-on-surface-variant text-[13px] mt-auto">
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
