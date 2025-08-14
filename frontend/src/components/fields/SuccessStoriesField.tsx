import React from "react";

import { FieldContainer } from "@/components/fields/FieldContainer";
import { FieldImageUpload } from "@/components/fields/FieldImageUpload";
import { FieldInput } from "@/components/fields/FieldInput";
import { FieldLabel } from "@/components/fields/FieldLabel";
import { FieldTextarea } from "@/components/fields/FieldTextarea";
import { SuccessStoriesData } from "@/types/fieldTypes";

type SuccessStoriesFieldProps = {
  data: SuccessStoriesData;
  index: number;
  fieldName: string;
  onFieldChange: (fieldIndex: number, newData: Record<string, unknown>) => void;
pendingFiles?: Map<string, File>;
  onPendingFile?: (blobUrl: string, file: File) => void;
  onRemovePending?: (blobUrl: string) => void;
};

const SuccessStoriesField: React.FC<SuccessStoriesFieldProps> = ({
  data,
  index,
  fieldName,
  onFieldChange,
pendingFiles,
  onPendingFile,
  onRemovePending,
}) => {
  const handleChange = (key: string, value: unknown) => {
    onFieldChange(index, { ...data, [key]: value });
  };

  const handleSlideChange = (slideIndex: number, key: string, value: string | number) => {
    const newSlides = [...data.slides];
    newSlides[slideIndex] = { ...newSlides[slideIndex], [key]: value };
    handleChange("slides", newSlides);
  };

  const addSlide = () => {
    const newSlides = [
      ...data.slides,
      {
        id: Math.max(0, ...data.slides.map((s) => s.id)) + 1,
        image: "",
        quote: "",
        author: "",
      },
    ];
    handleChange("slides", newSlides);
  };

  const removeSlide = (slideIndex: number) => {
    const newSlides = data.slides.filter((_, i) => i !== slideIndex);
    handleChange("slides", newSlides);
  };

  return (
    <FieldContainer>
      <FieldLabel>{fieldName}</FieldLabel>

      <div className="space-y-4">
        <div>
          <FieldLabel>Title</FieldLabel>
          <FieldInput
            value={data.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange("title", e.target.value);
            }}
          />
        </div>

        <div>
          <FieldLabel>Description</FieldLabel>
          <FieldTextarea
            value={data.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              handleChange("description", e.target.value);
            }}
          />
        </div>

        <div>
          <FieldLabel>Success Stories</FieldLabel>
          <div className="space-y-4">
            {data.slides.map((slide, slideIndex) => (
              <div key={slide.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Story {slideIndex + 1}</h4>
                  <button
                    onClick={() => {
                      removeSlide(slideIndex);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div>
                  <FieldLabel>Image</FieldLabel>
                  <FieldImageUpload
                    value={slide.image}
                    onChange={(value: string) => {
                      handleSlideChange(slideIndex, "image", value);
                    }}
pendingFiles={pendingFiles}
                    onPendingFile={onPendingFile}
                    onRemovePending={onRemovePending}
                  />
                </div>

                <div>
                  <FieldLabel>Quote</FieldLabel>
                  <FieldTextarea
                    value={slide.quote}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      handleSlideChange(slideIndex, "quote", e.target.value);
                    }}
                  />
                </div>

                <div>
                  <FieldLabel>Author</FieldLabel>
                  <FieldInput
                    value={slide.author}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleSlideChange(slideIndex, "author", e.target.value);
                    }}
                  />
                </div>
              </div>
            ))}

            <button
              onClick={addSlide}
              className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Add Success Story
            </button>
          </div>
        </div>
      </div>
    </FieldContainer>
  );
};

export default SuccessStoriesField;
