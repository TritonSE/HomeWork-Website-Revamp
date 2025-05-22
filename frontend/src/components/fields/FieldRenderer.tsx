import React from "react";

import BoxLinksField from "./BoxLinksField";
import EventsCarouselField from "./EventsCarouselField";
import FlashcardListField from "./FlashcardListField";
import HeaderField from "./HeaderField";
import HomeworkModelField from "./HomeworkModelField";
import ImageField from "./ImageField";
import MissionField from "./MissionField";
import NewsPastEventsField from "./NewsPastEventsField";
import ScrollField from "./ScrollField";
import SectionField from "./SectionField";
import StatsListField from "./StatsListField";
import SuccessStoriesField from "./SuccessStoriesField";
import TeamField from "./TeamField";
import TeamListField from "./TeamListField";
import TextField from "./TextField";
import VisionField from "./VisionField";

import {
  BaseField,
  isBoxLinksData,
  isEventsCarouselData,
  isFlashcardListData,
  isHeaderData,
  isHomeworkModelData,
  isImageData,
  isMissionData,
  isNewsPastEventsData,
  isScrollData,
  isSectionData,
  isStatsListData,
  isSuccessStoriesData,
  isTeamData,
  isTeamListData,
  isTextData,
  isVisionData,
} from "@/types/fieldTypes";

type FieldRendererProps = {
  field: BaseField;
  index: number;
  onTextChange: (id: string, text: string) => void;
  wordCounts: Record<string, number>;
  countWords: (text: string) => number;
  getStringValue: (value: unknown) => string;
  onFieldChange: (fieldIndex: number, newData: Record<string, unknown>) => void;
};

const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  index,
  onTextChange,
  wordCounts,
  countWords,
  getStringValue,
  onFieldChange,
}) => {
  const renderField = () => {
    switch (field.type) {
      case "vision":
        if (isVisionData(field.data)) {
          return (
            <VisionField
              data={field.data}
              index={index}
              fieldName={field.name}
              onTextChange={onTextChange}
              wordCounts={wordCounts}
              countWords={countWords}
              getStringValue={getStringValue}
            />
          );
        }
        break;
      case "header":
        if (isHeaderData(field.data)) {
          return (
            <HeaderField
              data={field.data}
              index={index}
              fieldName={field.name}
              onTextChange={onTextChange}
              wordCounts={wordCounts}
              countWords={countWords}
              getStringValue={getStringValue}
              onFieldChange={onFieldChange}
            />
          );
        }
        break;
      case "text":
        if (isTextData(field.data)) {
          return (
            <TextField
              data={field.data}
              index={index}
              fieldName={field.name}
              onTextChange={onTextChange}
              wordCounts={wordCounts}
              countWords={countWords}
              getStringValue={getStringValue}
              onFieldChange={onFieldChange}
            />
          );
        }
        break;
      case "scroll":
        if (isScrollData(field.data)) {
          return (
            <ScrollField
              data={field.data}
              index={index}
              fieldName={field.name}
              onFieldChange={onFieldChange}
            />
          );
        }
        break;
      case "team":
        if (isTeamData(field.data)) {
          return (
            <TeamField
              data={field.data}
              index={index}
              fieldName={field.name}
              onFieldChange={onFieldChange}
            />
          );
        }
        // Support team as an array of members
        if (isTeamListData(field.data)) {
          return (
            <TeamListField
              data={field.data}
              index={index}
              fieldName={field.name}
              onFieldChange={onFieldChange}
            />
          );
        }
        break;
      case "stats":
        if (isStatsListData(field.data)) {
          return (
            <StatsListField
              data={field.data}
              index={index}
              fieldName={field.name}
              onFieldChange={onFieldChange}
            />
          );
        }
        break;
      case "image":
        if (isImageData(field.data)) {
          return (
            <ImageField
              data={field.data}
              index={index}
              fieldName={field.name}
              onFieldChange={onFieldChange}
            />
          );
        }
        break;
      case "section":
        if (isSectionData(field.data)) {
          return (
            <SectionField
              data={field.data}
              index={index}
              fieldName={field.name}
              onFieldChange={onFieldChange}
            />
          );
        }
        break;
      case "flashcardList":
        if (isFlashcardListData(field.data)) {
          return (
            <FlashcardListField
              data={field.data}
              index={index}
              fieldName={field.name}
              onFieldChange={onFieldChange}
            />
          );
        }
        break;
      case "mission":
        if (isMissionData(field.data)) {
          return (
            <MissionField
              data={field.data}
              index={index}
              fieldName={field.name}
              onFieldChange={onFieldChange}
            />
          );
        }
        break;
      case "boxLinks":
        if (isBoxLinksData(field.data)) {
          return (
            <BoxLinksField
              data={field.data}
              index={index}
              fieldName={field.name}
              onFieldChange={onFieldChange}
            />
          );
        }
        break;
      case "homeworkModel":
        if (isHomeworkModelData(field.data)) {
          return (
            <HomeworkModelField
              data={field.data}
              index={index}
              fieldName={field.name}
              onFieldChange={onFieldChange}
            />
          );
        }
        break;
      case "successStories":
        if (isSuccessStoriesData(field.data)) {
          return (
            <SuccessStoriesField
              data={field.data}
              index={index}
              fieldName={field.name}
              onFieldChange={onFieldChange}
            />
          );
        }
        break;
      case "newsPastEvents":
        if (isNewsPastEventsData(field.data)) {
          return (
            <NewsPastEventsField
              data={field.data}
              index={index}
              fieldName={field.name}
              onFieldChange={onFieldChange}
            />
          );
        }
        break;
      case "eventsCarousel":
        if (isEventsCarouselData(field.data)) {
          return (
            <EventsCarouselField
              data={field.data}
              index={index}
              fieldName={field.name}
              onFieldChange={onFieldChange}
            />
          );
        }
        break;
      // Add other field type cases here as they are created
      default:
        return <div>Unsupported field type: {field.type}</div>;
    }
  };

  return <>{renderField()}</>;
};

export default FieldRenderer;
