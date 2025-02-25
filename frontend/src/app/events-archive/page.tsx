"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useContext } from "react";

import { ArticleContext } from "@/contexts/articleContext";
import { Article } from "@/hooks/useArticles";

const EVENTS_PER_PAGE = 8;

const EventCard: React.FC<{ article: Article }> = ({ article }) => {
  const textDate = new Date(article.dateCreated).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-row h-48 sm:h-64 border-2 border-gray-300 font-golos">
      <div className="flex flex-col gap-3 justify-center p-5 w-7/12">
        <h3 className="text-base sm:text-2xl">{article.header}</h3>
        <p className="text-xs sm:text-base text-orange-500 font-medium">{textDate}</p>
        <p className="hidden sm:line-clamp-2">{article.body}</p>
        <Link
          className="flex flex-row gap-2 w-fit text-gray-400 border border-transparent cursor-pointer hover:border-b-gray-400"
          href={{ pathname: "/article-viewer", query: { articleId: article._id } }} // id of selected article
        >
          <p className="text-xs sm:text-base">LEARN MORE</p>
          <Image src="/icons/learnMore.svg" width={20} height={20} alt="Learn more arrow"></Image>
        </Link>
      </div>
      <img src={article.thumbnail} alt="" className="w-5/12 h-auto object-cover" />
    </div>
  );
};

const Pagination: React.FC<{ current: number; totalPages: number }> = ({ current, totalPages }) => {
  const showPrevPage = current > 0;
  const showNextPage = current < totalPages - 1;

  return (
    <div className="flex flex-row gap-2 items-center">
      {showPrevPage && (
        <Link
          href={{ query: { page: current - 1 } }}
          className="flex flex-row justify-center items-center gap-2 w-fit h-min border border-transparent cursor-pointer hover:border-b-orange-500 text-orange-500"
        >
          <Image
            src="/icons/nextPage.svg"
            width={20}
            height={20}
            alt="Next page arrow"
            className="rotate-180"
          />
          <p className="hidden sm:block">PREVIOUS PAGE</p>
        </Link>
      )}

      {[...Array(totalPages).keys()].map((num) => {
        const isCurrentDot = num === current;
        return (
          <Link
            key={num}
            href={{ query: { page: num } }}
            className={isCurrentDot ? "pointer-events-none cursor-default" : ""}
          >
            <p
              className={`flex justify-center items-center rounded-full w-10 h-10 text-white font-golos font-medium ${isCurrentDot ? "bg-orange-600" : "bg-gray-400 cursor-pointer"}`}
            >
              {num + 1}
            </p>
          </Link>
        );
      })}

      {showNextPage && (
        <Link
          href={{ query: { page: current + 1 } }}
          className="flex flex-row justify-center items-center gap-2 w-fit h-min border border-transparent cursor-pointer hover:border-b-orange-500 text-orange-500"
        >
          <p className="hidden sm:block">NEXT PAGE</p>
          <Image src="/icons/nextPage.svg" width={20} height={20} alt="Next page arrow" />
        </Link>
      )}
    </div>
  );
};

const EventsArchive = () => {
  // Get articles with the hook
  const { articles, loading } = useContext(ArticleContext);

  const totalPages = Math.ceil(articles.length / EVENTS_PER_PAGE);

  const searchParams = useSearchParams();
  // Defaults to home page
  const pageParam = searchParams.get("page");
  const currPage =
    !Number.isNaN(Number(pageParam)) && 0 < Number(pageParam) && Number(pageParam) < totalPages
      ? Number(pageParam)
      : 0;

  const pageArticles = articles.slice(currPage * EVENTS_PER_PAGE, (currPage + 1) * EVENTS_PER_PAGE);

  return (
    <div className="p-5">
      <section className="flex flex-col gap-5 mb-5 font-golos">
        <h1 className="text-2xl sm:text-4xl font-medium">Events Archive</h1>
        <p className="text-sm sm:text-base">
          Our Past Events archive showcases a rich history of engagement and learning opportunities.
          From insightful workshops to vibrant community gatherings, explore the impactful
          activities that have brought people together.
        </p>
      </section>
      <section className="flex flex-col gap-5 mb-5">
        {loading ? (
          <p className="flex flow justify-center items-center w-full h-96 text-xl text-gray-400">
            Loading...
          </p>
        ) : (
          pageArticles.map((article, index) => <EventCard article={article} key={index} />)
        )}
      </section>
      <Pagination current={currPage} totalPages={totalPages} />
    </div>
  );
};

export default EventsArchive;
