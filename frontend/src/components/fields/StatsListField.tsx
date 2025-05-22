import React from "react";

import { StatItem, StatsListData } from "@/types/fieldTypes";

type StatsListFieldProps = {
  data: StatsListData;
  index: number;
  fieldName: string;
  onFieldChange: (fieldIndex: number, newData: Record<string, unknown>) => void;
};

const StatsListField: React.FC<StatsListFieldProps> = ({ data, index, onFieldChange }) => {
  const handleStatChange = (statIndex: number, newStat: Partial<StatItem>) => {
    const updated = data.map((stat, i) => (i === statIndex ? { ...stat, ...newStat } : stat));
    onFieldChange(index, { data: updated });
  };

  const handleAddStat = () => {
    const updated = [...data, { number: "", description: "" }];
    onFieldChange(index, { data: updated });
  };

  const handleRemoveStat = (statIndex: number) => {
    const updated = data.filter((_, i) => i !== statIndex);
    onFieldChange(index, { data: updated });
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">Stats</label>
        <button
          type="button"
          className="px-3 py-1 bg-[#f26522] text-white rounded-md"
          onClick={handleAddStat}
        >
          Add Stat
        </button>
      </div>
      <div className="space-y-6">
        {data.map((stat, statIndex) => (
          <div key={statIndex} className="border border-gray-200 rounded-md p-4 relative">
            <button
              type="button"
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              onClick={() => {
                handleRemoveStat(statIndex);
              }}
              title="Remove stat"
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
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Number</label>
              <input
                type="text"
                value={stat.number}
                onChange={(e) => {
                  handleStatChange(statIndex, { number: e.target.value });
                }}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
              <textarea
                value={stat.description}
                rows={2}
                onChange={(e) => {
                  handleStatChange(statIndex, { description: e.target.value });
                }}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsListField;
