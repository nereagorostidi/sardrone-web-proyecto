export function BrandIcon({
  path,
  color,
  className,
}: {
  path: string;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      className={className}
      fill={color ?? "currentColor"}
    >
      <path d={path} />
    </svg>
  );
}
