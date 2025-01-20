import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

import learnMoreIcon from "@/../public/icons/learn-more.svg";

type Event = {
  header: string;
  dateCreated: string;
  body: string;
  thumbnail: string;
  thumbnailAlt?: string;
  learnMoreUrl: string;
};

type EventProps = {
  event: Event;
};

/**
 * Card to display event information in the EventsCarousel component
 */
export const EventsCarouselCard: React.FC<EventProps> = ({ event }) => {
  return (
    <div
      className="
            flex-shrink-0 sm:w-2/5 w-full h-full p-4 pt-5 pb-5 
            rounded-lg border border-gray-400 shadow-md 
            snap-normal snap-start"
    >
      <div className="flex flex-col gap-2">
        <Image
          src={event.thumbnail}
          alt={event.thumbnailAlt ?? event.header}
          layout="responsive"
          width={8}
          height={16}
        />
        <h3 className="font-golos md:text-lg text-sm font-medium">{event.header}</h3>
        <p className="font-manrope md:text-sm text-xs text-gray-400">{event.dateCreated}</p>
        <p className="font-golos md:text-sm text-xs font-light line-clamp-3">{event.body}</p>
      </div>

      <a href={event.learnMoreUrl} className="flex flex-row justify-end gap-2 w-full mt-6">
        <span className="font-manrope md:text-sm text-xs font-bold text-gray-400">LEARN MORE</span>
        <Image src={learnMoreIcon as StaticImport} alt="Learn more arrow" />
      </a>
    </div>
  );
};
