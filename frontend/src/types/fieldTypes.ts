// Base field type that all other field types extend
export type BaseField = {
  name: string;
  type: string;
  data: Record<string, unknown>;
};

// Vision related types
export type VisionPillarCard = {
  title: string;
  icon: string;
  description: string;
};

export type VisionPillars = {
  title: string;
  description: string;
  cards: VisionPillarCard[];
};

export type VisionData = {
  title: string;
  description: string;
  pillars: VisionPillars;
};

// Header related types
export type HeaderData = {
  header?: string;
  title?: string;
  subheader?: string;
  subtitle?: string;
  imageUrl?: string;
  fancy?: boolean;
};

// Text related types
export type TextStat = {
  percentage: number;
  description: string;
};

export type TextData = {
  title: string;
  description: string;
  stats?: TextStat[];
};

// Section related types
export type SectionData = {
  title: string;
  description?: string;
  paragraphs?: string[];
  imageUrl?: string;
};

// Mission related types
export type MissionData = {
  title: string;
  description: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
};

// Scroll related types
export type ScrollSlide = {
  title: string;
  description: string[];
  image: string;
};

export type ScrollData = {
  heading: string;
  slidesData: ScrollSlide[];
};

// Team related types
export type TeamData = {
  title: string;
  description: string;
  imageUrl?: string;
  buttonLabel?: string;
  buttonLink?: string;
};

// Team member list types
export type TeamMember = {
  name: string;
  title: string;
  imageUrl?: string;
};

export type TeamListData = TeamMember[];

// Stats list types
export type StatItem = {
  number: string;
  description: string;
};

export type StatsListData = StatItem[];

// Image type
export type ImageData = {
  imageUrl: string;
  alt?: string;
};

// Flashcard list types
export type Flashcard = {
  title: string;
  icon: string;
  info: string;
};

export type FlashcardListData = Flashcard[];

// BoxLinks types
export type BoxLink = {
  tall: boolean;
  src: string;
  header: string;
  body: string;
  link: string;
};

export type BoxLinksData = BoxLink[];

export type HomeworkModelData = {
  title: string;
  description: string;
  pillars: {
    title: string;
    subtitle: string;
    icon: string;
  }[];
};

export function isHomeworkModelData(data: unknown): data is HomeworkModelData {
  if (!data || typeof data !== "object") return false;
  const d = data as HomeworkModelData;
  return (
    typeof d.title === "string" &&
    typeof d.description === "string" &&
    Array.isArray(d.pillars) &&
    d.pillars.every(
      (pillar) =>
        typeof pillar === "object" &&
        pillar !== null &&
        typeof pillar.title === "string" &&
        typeof pillar.subtitle === "string" &&
        typeof pillar.icon === "string",
    )
  );
}

export type SuccessStorySlide = {
  id: number;
  image: string;
  quote: string;
  author: string;
};

export type SuccessStoriesData = {
  title: string;
  description: string;
  slides: SuccessStorySlide[];
};

export function isSuccessStoriesData(data: unknown): data is SuccessStoriesData {
  if (!data || typeof data !== "object") return false;
  const d = data as SuccessStoriesData;
  return (
    typeof d.title === "string" &&
    typeof d.description === "string" &&
    Array.isArray(d.slides) &&
    d.slides.every(
      (slide) =>
        typeof slide === "object" &&
        slide !== null &&
        typeof slide.id === "number" &&
        typeof slide.image === "string" &&
        typeof slide.quote === "string" &&
        typeof slide.author === "string",
    )
  );
}

export type NewsPastEventsData = {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
};

export function isNewsPastEventsData(data: unknown): data is NewsPastEventsData {
  if (!data || typeof data !== "object") return false;
  const d = data as NewsPastEventsData;
  return (
    typeof d.title === "string" &&
    typeof d.description === "string" &&
    typeof d.buttonText === "string" &&
    typeof d.buttonLink === "string"
  );
}

export type EventCarouselItem = {
  header: string;
  dateCreated: string;
  body: string;
  thumbnail: string;
  thumbnailAlt: string;
  learnMoreUrl: string;
};

export type EventsCarouselData = EventCarouselItem[];

export function isEventsCarouselData(data: unknown): data is EventsCarouselData {
  return (
    Array.isArray(data) &&
    data.every(
      (item): item is EventCarouselItem =>
        typeof item === "object" &&
        item !== null &&
        "header" in item &&
        typeof (item as { header?: unknown }).header === "string" &&
        "dateCreated" in item &&
        typeof (item as { dateCreated?: unknown }).dateCreated === "string" &&
        "body" in item &&
        typeof (item as { body?: unknown }).body === "string" &&
        "thumbnail" in item &&
        typeof (item as { thumbnail?: unknown }).thumbnail === "string" &&
        "thumbnailAlt" in item &&
        typeof (item as { thumbnailAlt?: unknown }).thumbnailAlt === "string" &&
        "learnMoreUrl" in item &&
        typeof (item as { learnMoreUrl?: unknown }).learnMoreUrl === "string",
    )
  );
}

// Union type for all possible field data types
export type FieldData =
  | VisionData
  | HeaderData
  | TextData
  | SectionData
  | MissionData
  | ScrollData
  | TeamData
  | TeamListData
  | StatsListData
  | ImageData
  | FlashcardListData
  | BoxLinksData
  | HomeworkModelData
  | SuccessStoriesData
  | NewsPastEventsData
  | EventsCarouselData;

// Type guard functions to check field types
export const isVisionData = (data: Record<string, unknown>): data is VisionData => {
  return "pillars" in data;
};

export const isHeaderData = (data: Record<string, unknown>): data is HeaderData => {
  return "header" in data || "title" in data;
};

export const isTextData = (data: Record<string, unknown>): data is TextData => {
  return "title" in data && "description" in data;
};

export const isSectionData = (data: Record<string, unknown>): data is SectionData => {
  return "title" in data && ("description" in data || "paragraphs" in data);
};

export const isMissionData = (data: Record<string, unknown>): data is MissionData => {
  return "title" in data && "description" in data;
};

// Type guard for scroll
export const isScrollData = (data: unknown): data is ScrollData => {
  if (!data || typeof data !== "object") return false;
  return "slidesData" in data && Array.isArray((data as { slidesData?: unknown }).slidesData);
};

export const isTeamData = (data: Record<string, unknown>): data is TeamData => {
  return "title" in data && "description" in data && "buttonLabel" in data && "buttonLink" in data;
};

export const isTeamListData = (data: unknown): data is TeamListData => {
  return (
    Array.isArray(data) &&
    data.every(
      (member) =>
        typeof member === "object" && member !== null && "name" in member && "title" in member,
    )
  );
};

export const isStatsListData = (data: unknown): data is StatsListData => {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === "object" && item !== null && "number" in item && "description" in item,
    )
  );
};

export const isImageData = (data: Record<string, unknown>): data is ImageData => {
  return "imageUrl" in data;
};

export const isFlashcardListData = (data: unknown): data is FlashcardListData => {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "title" in item &&
        "icon" in item &&
        "info" in item,
    )
  );
};

export const isBoxLinksData = (data: unknown): data is BoxLinksData => {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "header" in item &&
        "body" in item &&
        "src" in item &&
        "link" in item &&
        "tall" in item,
    )
  );
};
