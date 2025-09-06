import React from "react";

import { TextData, TextStat } from "@/types/fieldTypes";

type TextFieldProps = {
  data: TextData;
  index: number;
  fieldName: string;
  onTextChange: (id: string, text: string) => void;
  wordCounts: Record<string, number>;
  countWords: (text: string) => number;
  getStringValue: (value: unknown) => string;
  onFieldChange: (fieldIndex: number, newData: Record<string, unknown>) => void;
};

const TextField: React.FC<TextFieldProps> = ({
  data,
  index,
  fieldName,
  onTextChange,
  wordCounts,
  countWords,
  getStringValue,
  onFieldChange,
}) => {
  const handleStatChange = (statIndex: number, newStat: Partial<TextStat>) => {
    const updatedStats = (data.stats ?? []).map((stat, i) =>
      i === statIndex ? { ...stat, ...newStat } : stat,
    );
    onFieldChange(index, { stats: updatedStats });
  };

  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={getStringValue(data.title) ?? ""}
          onChange={(e) => {
            onFieldChange(index, { title: e.target.value });
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Subtext</label>
        <textarea
          value={getStringValue(data.description) ?? ""}
          rows={4}
          id={`${fieldName}-description-${index.toString()}`}
          onChange={(e) => {
            onTextChange(`${fieldName}-description-${index.toString()}`, e.target.value);
            onFieldChange(index, { description: e.target.value });
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
        />
        <div className="text-xs text-gray-500 mt-1 text-right">
          {wordCounts[`${fieldName}-description-${index.toString()}`] ??
            countWords(getStringValue(data.description) ?? "")}
          /200 words
        </div>
      </div>
      {Array.isArray(data.stats) && data.stats.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Stats</label>
          <div className="space-y-2">
            {data.stats.map((stat, statIndex) => (
              <div key={statIndex} className="flex items-center gap-2">
                <input
                  type="number"
                  value={stat.percentage}
                  min={0}
                  max={100}
                  onChange={(e) => {
                    handleStatChange(statIndex, { percentage: Number(e.target.value) });
                  }}
                  className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
                />
                <span className="text-gray-500">%</span>
                <input
                  type="text"
                  value={stat.description}
                  onChange={(e) => {
                    handleStatChange(statIndex, { description: e.target.value });
                  }}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TextField;
