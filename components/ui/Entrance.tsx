import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from "react";

type EntranceProps = {
  children: ReactNode;
  /** Stagger, in ms. */
  delay?: number;
  as?: ElementType;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "children" | "className">;

/**
 * Fades + lifts its children on load. Pure CSS, so it works without
 * JavaScript and never leaves content stranded at opacity 0. Any extra props
 * (e.g. `data-*`, `aria-*`) pass through to the rendered element.
 */
export function Entrance({
  children,
  delay = 0,
  as,
  className,
  ...rest
}: EntranceProps) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      className={["enter", className].filter(Boolean).join(" ")}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
