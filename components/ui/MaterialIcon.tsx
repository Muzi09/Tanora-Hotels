type MaterialIconProps = {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  fill?: boolean;
};

/**
 * Renders a Material Symbols Outlined icon. Matches the original
 * `<span class="material-symbols-outlined" data-icon="...">name</span>`
 * pattern in the HTML so that styling and the FILL axis stay identical.
 */
export default function MaterialIcon({
  name,
  className,
  style,
  fill = false,
}: MaterialIconProps) {
  const mergedStyle: React.CSSProperties = fill
    ? {
        ...style,
        fontVariationSettings: "'FILL' 1",
      }
    : style ?? {};

  return (
    <span
      className={`material-symbols-outlined ${className ?? ""}`.trim()}
      data-icon={name}
      style={mergedStyle}
    >
      {name}
    </span>
  );
}
