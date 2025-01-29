import React from "react";

type TextAreaProps = {
  label?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  disabled?: boolean;
  className?: string;
};

const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder = "Write your message (optional)",
  name = "message",
  value,
  onChange,
  rows = 5,
  disabled = false,
  className = "",
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="font-golos">
          {label}
        </label>
      )}
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`mt-1 block w-full p-2 border border-[rgba(0,0,0,.4)] text-[16px] rounded-md focus:outline-none focus:border-[var(--tse-constellation-color-secondary-highlight-1)] placeholder:font-golos ${className}`}
      />
    </div>
  );
};

export default TextArea;
