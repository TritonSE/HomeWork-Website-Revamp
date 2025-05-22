import React from "react";

import { FieldImageUpload } from "./FieldImageUpload";

import { Flashcard, FlashcardListData } from "@/types/fieldTypes";

type FlashcardListFieldProps = {
  data: FlashcardListData;
  index: number;
  fieldName: string;
  onFieldChange: (fieldIndex: number, newData: Record<string, unknown>) => void;
};

const FlashcardListField: React.FC<FlashcardListFieldProps> = ({ data, index, onFieldChange }) => {
  const handleFlashcardChange = (cardIndex: number, newCard: Partial<Flashcard>) => {
    const updated = data.map((card, i) => (i === cardIndex ? { ...card, ...newCard } : card));
    onFieldChange(index, { flashcards: updated });
  };

  const handleAddFlashcard = () => {
    const updated = [...data, { title: "", icon: "", info: "" }];
    onFieldChange(index, { flashcards: updated });
  };

  const handleRemoveFlashcard = (cardIndex: number) => {
    const updated = data.filter((_, i) => i !== cardIndex);
    onFieldChange(index, { flashcards: updated });
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">Flashcards</label>
        <button
          type="button"
          className="px-3 py-1 bg-[#f26522] text-white rounded-md"
          onClick={handleAddFlashcard}
        >
          Add Flashcard
        </button>
      </div>
      <div className="space-y-6">
        {data.map((card, cardIndex) => (
          <div key={cardIndex} className="border border-gray-200 rounded-md p-4 relative">
            <button
              type="button"
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              onClick={() => {
                handleRemoveFlashcard(cardIndex);
              }}
              title="Remove flashcard"
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
                ></path>
              </svg>
            </button>
            <div className="mb-2 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-shrink-0">
                <FieldImageUpload
                  value={card.icon || ""}
                  onChange={(url) => {
                    handleFlashcardChange(cardIndex, { icon: url });
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="mb-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => {
                      handleFlashcardChange(cardIndex, { title: e.target.value });
                    }}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Info</label>
                  <textarea
                    value={card.info}
                    rows={3}
                    onChange={(e) => {
                      handleFlashcardChange(cardIndex, { info: e.target.value });
                    }}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashcardListField;
