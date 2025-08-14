import React from "react";

import { FieldImageUpload } from "./FieldImageUpload";

import { ScrollData, ScrollSlide } from "@/types/fieldTypes";

type ScrollFieldProps = {
  data: ScrollData;
  index: number;
  fieldName: string;
  onFieldChange: (fieldIndex: number, newData: Record<string, unknown>) => void;
  pendingFiles?: Map<string, File>;
  onPendingFile?: (blobUrl: string, file: File) => void;
  onRemovePending?: (blobUrl: string) => void;
};

const ScrollField: React.FC<ScrollFieldProps> = ({
  data,
  index,
  fieldName,
onFieldChange,
onPendingFile,
  onRemovePending,
pendingFiles,
}) => {
  const handleSlideChange = (slideIndex: number, newSlide: Partial<ScrollSlide>) => {
    const updatedSlides = (data.slidesData || []).map((slide, i) =>
      i === slideIndex ? { ...slide, ...newSlide } : slide,
    );
    onFieldChange(index, { slidesData: updatedSlides });
  };

  const handleSlideDescriptionChange = (slideIndex: number, descIndex: number, newDesc: string) => {
    const updatedSlides = (data.slidesData || []).map((slide, i) => {
      if (i === slideIndex) {
        const updatedDescriptions = (slide.description || []).map((desc, j) =>
          j === descIndex ? newDesc : desc,
        );
        return { ...slide, description: updatedDescriptions };
      }
      return slide;
    });
    onFieldChange(index, { slidesData: updatedSlides });
  };

  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
        <input
          type="text"
          value={data.heading}
          onChange={(e) => {
            onFieldChange(index, { heading: e.target.value });
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
        />
      </div>
      {Array.isArray(data.slidesData) && data.slidesData.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Slides</label>
          <div className="space-y-6">
            {data.slidesData.map((slide, slideIndex) => (
              <div key={slideIndex} className="border border-gray-200 rounded-md p-4">
                <div className="mb-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Slide Title
                  </label>
                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) => {
                      handleSlideChange(slideIndex, { title: e.target.value });
                    }}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Descriptions
                  </label>
                  {Array.isArray(slide.description) &&
                    slide.description.map((desc, descIndex) => (
                      <textarea
                        key={descIndex}
                        value={desc}
                        rows={2}
                        onChange={(e) => {
                          handleSlideDescriptionChange(slideIndex, descIndex, e.target.value);
                        }}
                        className="w-full mb-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
                      />
                    ))}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Image</label>
                  <div className="border border-dashed border-gray-300 rounded-md p-2">
                    <FieldImageUpload
                      value={slide.image || ""}
                      onChange={(url) => {
                        handleSlideChange(slideIndex, { image: url });
                      }}
                      pendingFiles={pendingFiles}
                      onPendingFile={onPendingFile}
                      onRemovePending={onRemovePending}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ScrollField;
