import React from "react";

import { FieldContainer } from "@/components/fields/FieldContainer";
import { FieldImageUpload } from "@/components/fields/FieldImageUpload";
import { FieldInput } from "@/components/fields/FieldInput";
import { FieldLabel } from "@/components/fields/FieldLabel";
import { FieldTextarea } from "@/components/fields/FieldTextarea";
import { HomeworkModelData } from "@/types/fieldTypes";

type HomeworkModelFieldProps = {
  data: HomeworkModelData;
  index: number;
  fieldName: string;
  onFieldChange: (fieldIndex: number, newData: Record<string, unknown>) => void;
pendingFiles?: Map<string, File>;
  onPendingFile?: (blobUrl: string, file: File) => void;
  onRemovePending?: (blobUrl: string) => void;
};

const HomeworkModelField: React.FC<HomeworkModelFieldProps> = ({
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

  const handlePillarChange = (pillarIndex: number, key: string, value: string) => {
    const newPillars = [...data.pillars];
    newPillars[pillarIndex] = { ...newPillars[pillarIndex], [key]: value };
    handleChange("pillars", newPillars);
  };

  const addPillar = () => {
    const newPillars = [...data.pillars, { title: "", subtitle: "", icon: "" }];
    handleChange("pillars", newPillars);
  };

  const removePillar = (pillarIndex: number) => {
    const newPillars = data.pillars.filter((_, i) => i !== pillarIndex);
    handleChange("pillars", newPillars);
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
          <FieldLabel>Pillars</FieldLabel>
          <div className="space-y-4">
            {data.pillars.map((pillar, pillarIndex) => (
              <div key={pillarIndex} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Pillar {pillarIndex + 1}</h4>
                  <button
                    onClick={() => {
                      removePillar(pillarIndex);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div>
                  <FieldLabel>Title</FieldLabel>
                  <FieldInput
                    value={pillar.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handlePillarChange(pillarIndex, "title", e.target.value);
                    }}
                  />
                </div>

                <div>
                  <FieldLabel>Subtitle</FieldLabel>
                  <FieldInput
                    value={pillar.subtitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handlePillarChange(pillarIndex, "subtitle", e.target.value);
                    }}
                  />
                </div>

                <div>
                  <FieldLabel>Icon</FieldLabel>
                  <FieldImageUpload
                    value={pillar.icon}
                    onChange={(value: string) => {
                      handlePillarChange(pillarIndex, "icon", value);
                    }}
pendingFiles={pendingFiles}
                    onPendingFile={onPendingFile}
                    onRemovePending={onRemovePending}
                  />
                </div>
              </div>
            ))}

            <button
              onClick={addPillar}
              className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Add Pillar
            </button>
          </div>
        </div>
      </div>
    </FieldContainer>
  );
};

export default HomeworkModelField;
