import React from "react";

import { FieldImageUpload } from "./FieldImageUpload";

import { TeamListData, TeamMember } from "@/types/fieldTypes";

type TeamListFieldProps = {
  data: TeamListData;
  index: number;
  onFieldChange: (fieldIndex: number, newData: Record<string, unknown>) => void;
  pendingFiles?: Map<string, File>;
  onPendingFile?: (blobUrl: string, file: File) => void;
  onRemovePending?: (blobUrl: string) => void;
};

const TeamListField: React.FC<TeamListFieldProps> = ({
  data,
  index,
  onFieldChange,
  onPendingFile,
  onRemovePending,
}) => {
  const handleMemberChange = (memberIndex: number, newMember: Partial<TeamMember>) => {
    const updated = data.map((member, i) =>
      i === memberIndex ? { ...member, ...newMember } : member,
    );
    onFieldChange(index, { data: updated });
  };

  const handleAddMember = () => {
    const updated = [...data, { name: "", title: "", imageUrl: "" }];
    onFieldChange(index, { data: updated });
  };

  const handleRemoveMember = (memberIndex: number) => {
    const updated = data.filter((_, i) => i !== memberIndex);
    onFieldChange(index, { data: updated });
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">Team Members</label>
        <button
          type="button"
          className="px-3 py-1 bg-[#f26522] text-white rounded-md"
          onClick={handleAddMember}
        >
          Add Member
        </button>
      </div>
      <div className="space-y-6">
        {data.map((member, memberIndex) => (
          <div key={memberIndex} className="border border-gray-200 rounded-md p-4 relative">
            <button
              type="button"
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              onClick={() => {
                handleRemoveMember(memberIndex);
              }}
              title="Remove member"
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
                  value={member.imageUrl ?? ""}
                  onChange={(url) => {
                    handleMemberChange(memberIndex, { imageUrl: url });
                  }}
                  onPendingFile={onPendingFile}
                  onRemovePending={onRemovePending}
                />
              </div>
              <div className="flex-1">
                <div className="mb-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => {
                      handleMemberChange(memberIndex, { name: e.target.value });
                    }}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                  <input
                    type="text"
                    value={member.title}
                    onChange={(e) => {
                      handleMemberChange(memberIndex, { title: e.target.value });
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

export default TeamListField;
