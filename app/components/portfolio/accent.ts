// Lives under app/ because Tailwind's content glob doesn't scan lib/.
export const ACCENTS = {
  primary: "bg-primary text-on-primary",
  secondary: "bg-secondary text-on-secondary",
  tertiary: "bg-tertiary text-on-tertiary",
} as const;

export function accentClass(color: string | undefined): string {
  return ACCENTS[color as keyof typeof ACCENTS] ?? ACCENTS.primary;
}
