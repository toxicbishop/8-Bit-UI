import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { Badge as ShadcnBadge } from "@/components/ui/badge";
import { badgeVariants } from "@/components/ui/8bit/badge-variants";

export interface BitBadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({
  children,
  className = "",
  font,
  variant,
  ...props
}: BitBadgeProps) {
  const color = badgeVariants({ variant, font });

  const classes = className.split(" ");

  // visual classes for badge and sidebars
  const visualClasses = classes.filter(
    (c: string) =>
      c.startsWith("bg-") ||
      c.startsWith("border-") ||
      c.startsWith("text-") ||
      c.startsWith("rounded-"),
  );

  // Container should accept all non-visual utility classes (e.g., size, spacing, layout)
  const containerClasses = classes.filter(
    (c: string) =>
      !(
        c.startsWith("bg-") ||
        c.startsWith("border-") ||
        c.startsWith("text-") ||
        c.startsWith("rounded-")
      ),
  );

  return (
    <div className={cn("relative inline-flex items-stretch", containerClasses)}>
      <ShadcnBadge
        {...props}
        className={cn(
          "h-full",
          "rounded-none",
          "w-full",
          font !== "normal" && "retro",
          visualClasses,
        )}
        variant={variant}>
        {children}
      </ShadcnBadge>

      {/* Left pixel bar */}
      <div
        className={cn(
          "-left-1.5 absolute inset-y-[4px] w-1.5",
          color,
          visualClasses,
        )}
      />
      {/* Right pixel bar */}
      <div
        className={cn(
          "-right-1.5 absolute inset-y-[4px] w-1.5",
          color,
          visualClasses,
        )}
      />
    </div>
  );
}

export { Badge };
