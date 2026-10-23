export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
        {eyebrow}
      </h2>
      <p className="mt-4 text-sm md:text-base leading-7 text-[var(--muted-foreground)] sm:text-lg">
        {description}
      </p>
    </div>
  );
}
