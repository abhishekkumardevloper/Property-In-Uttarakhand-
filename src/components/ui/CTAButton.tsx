"use client";

import Link from "next/link";
import { ReactNode, useRef } from "react";
import { ArrowRight } from "lucide-react";

interface CTAButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "filled" | "ghost" | "gold";
  showArrow?: boolean;
  className?: string;
  dataCursor?: string;
}

export default function CTAButton({
  href,
  onClick,
  children,
  variant = "primary",
  showArrow = false,
  className = "",
  dataCursor = "View",
}: CTAButtonProps) {
  const btnRef = useRef<HTMLElement>(null);

  const variantClass = {
    primary: "btn-primary",
    filled: "btn-primary-filled",
    ghost: "btn-ghost",
    gold: "btn-primary-filled",
  }[variant];

  const content = (
    <span className="flex items-center gap-3">
      {children}
      {showArrow && (
        <ArrowRight
          size={14}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        ref={btnRef as React.Ref<HTMLAnchorElement>}
        className={`btn-magnetic group ${variantClass} ${className}`}
        data-cursor={dataCursor}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={btnRef as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      className={`btn-magnetic group ${variantClass} ${className}`}
      data-cursor={dataCursor}
    >
      {content}
    </button>
  );
}
