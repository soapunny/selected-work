type TagBadgeProps = { label: string };

export function TagBadge({ label }: TagBadgeProps) {
  return (
    <span className="rounded-lg border border-border px-2.5 py-1 text-xs text-muted">
      {label}
    </span>
  );
}
