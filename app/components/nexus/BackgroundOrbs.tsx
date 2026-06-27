export function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {/* Primary orb — top left */}
      <div className="orb-a absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/[0.07] blur-[120px]" />
      {/* Secondary orb — top right */}
      <div className="orb-b absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-secondary/[0.05] blur-[100px]" />
      {/* Tertiary orb — bottom center */}
      <div className="orb-c absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-tertiary/[0.04] blur-[140px]" />
      {/* Small accent — mid right */}
      <div className="orb-a absolute top-1/2 -right-20 w-[300px] h-[300px] rounded-full bg-primary/[0.06] blur-[80px]" style={{ animationDelay: "-6s" }} />
    </div>
  );
}
