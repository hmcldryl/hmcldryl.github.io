export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-10">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-on-surface mb-2">
        {title}
      </h2>
      <div className="w-16 h-[3px] bg-black" />
      {subtitle && <p className="text-on-surface-variant text-sm mt-3">{subtitle}</p>}
    </div>
  );
}
