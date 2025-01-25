import React from "react";
import styles from "../components/TextField.module.css";
import Image from "next/image";

export interface TextFieldProps extends Omit<React.ComponentProps<"input">, "type"> {
  label: string;
  errorMessage?: string;
  caption?: string;
  hasError?: boolean;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, errorMessage, caption, hasError = false, className, ...props }, ref) => {
    let inputClass = styles.input;
    if (hasError) {
      inputClass += ` ${styles.error}`;
    }
    if (className) {
      inputClass += ` ${className}`;
    }

    return (
      <div className={styles.container}>
        <label className={styles.label}>
          <p>{label}</p>
          <input ref={ref} type="text" className={inputClass} {...props} />
        </label>
        {caption && !hasError && <p className={styles.caption}>{caption}</p>}
        {hasError && errorMessage && (
          <p className={styles.errorMessage}>
            <Image
              src="/images/ic_error.svg" // Path relative to the public folder
              alt="Error Icon"
              width={16} // Specify the width of the icon
              height={16} // Specify the height of the icon
              className={styles.errorIcon} // Custom styles
            />
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";
