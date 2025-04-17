// app/events-archive/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useContext, useEffect, useState } from "react";

import { ArticleContext } from "@/contexts/articleContext";
import { PageDataContext } from "@/contexts/pageDataContext";
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
      <div className="flex flex-col gap-2 sm:gap-3 justify-center p-5 w-7/12">
        <h3 className="text-base sm:text-2xl">{article.header}</h3>
        <p className="text-xs sm:text-base text-orange-500 font-medium">{textDate}</p>
        <p className="hidden sm:line-clamp-2">{article.body}</p>
        <Link
          className="flex flex-row gap-2 w-fit text-gray-400 border border-transparent cursor-pointer hover:border-b-gray-400"
          href={{ pathname: "/article-viewer", query: { articleId: article._id } }}
        >
          <p className="text-xs sm:text-base">LEARN MORE</p>
          <Image src="/icons/learnMore.svg" width={20} height={20} alt="Learn more arrow" />
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
            alt="Previous page arrow"
            className="rotate-180"
          />
          <p className="hidden sm:block">PREVIOUS PAGE</p>
        </Link>
      )}

      {[...Array(totalPages).keys()].map((num) => (
        <Link
          key={num}
          href={{ query: { page: num } }}
          className={num === current ? "pointer-events-none cursor-default" : ""}
        >
          <p
            className={`flex justify-center items-center rounded-full w-10 h-10 text-white font-golos font-medium ${
              num === current ? "bg-orange-600" : "bg-gray-400 cursor-pointer"
            }`}
          >
            {num + 1}
          </p>
        </Link>
      ))}

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

const EventsArchiveContent = () => {
  const searchParams = useSearchParams();
  const pageContext = useContext(PageDataContext);
  const articleContext = useContext(ArticleContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (pageContext?.pageData && !pageContext.loading) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [pageContext]);

  if (!pageContext) return <div>Error: Page data not available.</div>;
  const { pageData, loading } = pageContext;
  if (loading) return null;

  const eventPageData = pageData.find((data) => data.pagename === "events-archive");
  if (!eventPageData) return <div>No event archive data found.</div>;

  const headerField = eventPageData.fields.find((field) => field.name === "header");
  const descriptionField = eventPageData.fields.find((field) => field.name === "description");

  const headerData = headerField?.data as {
    imageUrl: string;
    header: string;
  };
  const descriptionData = descriptionField?.data as { title: string; description: string };

  const { articles } = articleContext;
  const totalPages = Math.ceil(articles.length / EVENTS_PER_PAGE);

  const pageParam = searchParams.get("page");
  const currPage =
    !Number.isNaN(Number(pageParam)) && 0 < Number(pageParam) && Number(pageParam) < totalPages
      ? Number(pageParam)
      : 0;

  const pageArticles = articles.slice(currPage * EVENTS_PER_PAGE, (currPage + 1) * EVENTS_PER_PAGE);

  return (
    <div className="p-5">
      <section className="flex flex-col gap-5 mb-5 font-golos">
        <h1 className="text-2xl sm:text-4xl font-medium">{headerData.header}</h1>
        <p className="text-sm sm:text-base pt-4">{descriptionData.description}</p>
      </section>

      <section
        className="flex flex-col gap-5 mb-5 transition-opacity duration-700"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        {pageArticles.map((article, index) => (
          <EventCard article={article} key={index} />
        ))}
      </section>

      <Pagination current={currPage} totalPages={totalPages} />
    </div>
  );
};

const EventsArchivePage = () => {
  return (
    <Suspense>
      <EventsArchiveContent />
    </Suspense>
  );
};

export default EventsArchivePage;
