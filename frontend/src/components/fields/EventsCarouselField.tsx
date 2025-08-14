import React from "react";

import { FieldContainer } from "@/components/fields/FieldContainer";
import { FieldImageUpload } from "@/components/fields/FieldImageUpload";
import { FieldInput } from "@/components/fields/FieldInput";
import { FieldLabel } from "@/components/fields/FieldLabel";
import { FieldTextarea } from "@/components/fields/FieldTextarea";
import { EventsCarouselData } from "@/types/fieldTypes";

type EventsCarouselFieldProps = {
  data: EventsCarouselData;
  index: number;
  fieldName: string;
  onFieldChange: (fieldIndex: number, newData: Record<string, unknown>) => void;
pendingFiles?: Map<string, File>;
  onPendingFile?: (blobUrl: string, file: File) => void;
  onRemovePending?: (blobUrl: string) => void;
};

const EventsCarouselField: React.FC<EventsCarouselFieldProps> = ({
  data,
  index,
  fieldName,
  onFieldChange,
pendingFiles,
  onPendingFile,
  onRemovePending,
}) => {
  const handleItemChange = (itemIndex: number, key: string, value: string) => {
    const newItems = [...data];
    newItems[itemIndex] = { ...newItems[itemIndex], [key]: value };
    onFieldChange(index, { data: newItems });
  };

  const addItem = () => {
    const newItems = [
      ...data,
      {
        header: "",
        dateCreated: "",
        body: "",
        thumbnail: "",
        thumbnailAlt: "",
        learnMoreUrl: "",
      },
    ];
    onFieldChange(index, { data: newItems });
  };

  const removeItem = (itemIndex: number) => {
    const newItems = data.filter((_, i) => i !== itemIndex);
    onFieldChange(index, { data: newItems });
  };

  return (
    <FieldContainer>
      <FieldLabel>{fieldName}</FieldLabel>
      <div className="space-y-4">
        {data.map((item, itemIndex) => (
          <div key={itemIndex} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Event {itemIndex + 1}</h4>
              <button
                onClick={() => {
                  removeItem(itemIndex);
                }}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
            <div>
              <FieldLabel>Header</FieldLabel>
              <FieldInput
                value={item.header}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleItemChange(itemIndex, "header", e.target.value);
                }}
              />
            </div>
            <div>
              <FieldLabel>Date Created</FieldLabel>
              <FieldInput
                value={item.dateCreated}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleItemChange(itemIndex, "dateCreated", e.target.value);
                }}
              />
            </div>
            <div>
              <FieldLabel>Body</FieldLabel>
              <FieldTextarea
                value={item.body}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  handleItemChange(itemIndex, "body", e.target.value);
                }}
              />
            </div>
            <div>
              <FieldLabel>Thumbnail</FieldLabel>
              <FieldImageUpload
                value={item.thumbnail}
                onChange={(value: string) => {
                  handleItemChange(itemIndex, "thumbnail", value);
                }}
pendingFiles={pendingFiles}
                onPendingFile={onPendingFile}
                onRemovePending={onRemovePending}
              />
            </div>
            <div>
              <FieldLabel>Thumbnail Alt</FieldLabel>
              <FieldInput
                value={item.thumbnailAlt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleItemChange(itemIndex, "thumbnailAlt", e.target.value);
                }}
              />
            </div>
            <div>
              <FieldLabel>Learn More URL</FieldLabel>
              <FieldInput
                value={item.learnMoreUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleItemChange(itemIndex, "learnMoreUrl", e.target.value);
                }}
              />
            </div>
          </div>
        ))}
        <button
          onClick={addItem}
          className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Add Event
        </button>
      </div>
    </FieldContainer>
  );
};

export default EventsCarouselField;
