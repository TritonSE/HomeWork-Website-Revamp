import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ComponentProps<"button"> {
  label: string;
  kind?: "primary" | "secondary" | "destructive" | "secondary-destructive";
  size?: "regular" | "small";
  className?: string; // For additional styling flexibility
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { label, kind = "primary", size = "regular", className, ...props },
  ref,
) {
  // Base class
  let buttonClass = `${styles.button} ${styles[kind]} ${styles[size]}`;

  // Add custom class if provided
  if (className) {
    buttonClass += ` ${className}`;
  }

  return (
    <button ref={ref} className={buttonClass} {...props}>
      <span>{label}</span>
    </button>
  );
});
