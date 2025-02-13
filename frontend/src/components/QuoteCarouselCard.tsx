"use client";

export interface QuoteCarouselCardProps {
  id: number;
  image: string;
  body: string;
  name: string;
}

const QuoteCarouselCard: React.FC<QuoteCarouselCardProps> = (testimonial) => {
  return (
    <div className="w-[492px] h-[600px] rounded-[10px] overflow-hidden shadow-lg flex flex-col items-center border border-black ml-6 pt-[40px] pb-[40px] pl-[32px] pr-[32px]">
      <img
        className="w-[428px] h-[307px] object-cover flex items-center justify-center mt-6"
        src={testimonial.image}
        alt="Sunset in the mountains"
      />
      <div className="w-[428px] mt-10">
        <p className="text-gray-700 text-base font-bold mb-5 text-[20px] leading-[26px]">
          {testimonial.body}
        </p>
        <p className="text-gray-700 text-base text-[20px] leading-[26px]">-- {testimonial.name}</p>
      </div>
    </div>
  );
};

export default QuoteCarouselCard;
