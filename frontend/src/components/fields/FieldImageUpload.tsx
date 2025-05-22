import React, { useRef } from "react";

type FieldImageUploadProps = {
  value: string;
  onChange: (value: string) => void;
};

export const FieldImageUpload: React.FC<FieldImageUploadProps> = ({ value, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onChange("");
  };

  return (
    <div
      className="relative w-40 h-40 rounded-xl border border-gray-300 bg-white flex items-center justify-center cursor-pointer transition hover:shadow-sm"
      onClick={value ? undefined : handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      {value ? (
        <>
          <img
            src={value}
            alt="Preview"
            className="object-contain w-32 h-32 rounded-lg mx-auto bg-gray-100"
            style={{ display: "block" }}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow hover:bg-red-600 z-10"
            tabIndex={-1}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full select-none">
          <div className="bg-gray-100 rounded-lg w-28 h-28 flex items-center justify-center mb-2">
            <svg
              className="w-12 h-12 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" fill="#e5eaf4" />
              <path
                d="M8 13l3 3 4-4 5 5"
                stroke="#4a90e2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="8.5" cy="9.5" r="1.5" fill="#4a90e2" />
            </svg>
          </div>
          <span className="text-xs text-gray-500">Click to upload</span>
        </div>
      )}
    </div>
  );
};
