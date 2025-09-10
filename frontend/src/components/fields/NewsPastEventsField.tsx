import React from "react";

import { FieldContainer } from "@/components/fields/FieldContainer";
import { FieldInput } from "@/components/fields/FieldInput";
import { FieldLabel } from "@/components/fields/FieldLabel";
import { FieldTextarea } from "@/components/fields/FieldTextarea";
import { NewsPastEventsData } from "@/types/fieldTypes";

type NewsPastEventsFieldProps = {
  data: NewsPastEventsData;
  index: number;
  fieldName: string;
  onFieldChange: (fieldIndex: number, newData: Record<string, unknown>) => void;
};

const NewsPastEventsField: React.FC<NewsPastEventsFieldProps> = ({
  data,
  index,
  fieldName,
  onFieldChange,
}) => {
  const handleChange = (key: string, value: string) => {
    onFieldChange(index, { ...data, [key]: value });
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
          <FieldLabel>Button Text</FieldLabel>
          <FieldInput
            value={data.buttonText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange("buttonText", e.target.value);
            }}
          />
        </div>
        <div>
          <FieldLabel>Button Link</FieldLabel>
          <FieldInput
            value={data.buttonLink}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange("buttonLink", e.target.value);
            }}
          />
        </div>
      </div>
    </FieldContainer>
  );
};

export default NewsPastEventsField;
