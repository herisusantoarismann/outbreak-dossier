import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
    "danger" | "warning" | "critical" | "cyan" | "neutral";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    pulse?: boolean;
    children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
    danger: "bg-red-950/80 text-red-400 border-red-800/80 shadow-[0_0_10px_rgba(239,68,68,0.2)]",
    critical:
        "bg-red-600 text-white border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)] font-bold",
    warning:
        "bg-amber-950/80 text-amber-400 border-amber-800/80 shadow-[0_0_10px_rgba(245,158,11,0.2)]",
    cyan: "bg-cyan-950/80 text-cyan-300 border-cyan-800/80 shadow-[0_0_10px_rgba(6,182,212,0.2)]",
    neutral: "bg-neutral-900/90 text-neutral-400 border-neutral-800",
};

const pulseStyles: Record<BadgeVariant, string> = {
    danger: "bg-red-500",
    critical: "bg-white",
    warning: "bg-amber-500",
    cyan: "bg-cyan-400",
    neutral: "bg-neutral-400",
};

export const Badge: React.FC<BadgeProps> = ({
    variant = "danger",
    pulse = false,
    className,
    children,
    ...props
}) => {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded border font-mono text-[11px] tracking-wider uppercase select-none transition-colors",
                variantStyles[variant],
                className,
            )}
            {...props}
        >
            {pulse && (
                <span
                    className={cn(
                        "w-1.5 h-1.5 rounded-full animate-pulse shrink-0",
                        pulseStyles[variant],
                    )}
                />
            )}
            {children}
        </span>
    );
};

export default Badge;
