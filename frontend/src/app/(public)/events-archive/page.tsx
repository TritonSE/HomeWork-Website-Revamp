"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useContext, useEffect, useState } from "react";

import Header from "@/components/Header";
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
          href={{ pathname: "/article-viewer", query: { articleId: article._id } }}
          className="flex flex-row gap-2 w-fit text-gray-400 border border-transparent hover:border-b-gray-400"
        >
          <p className="text-xs sm:text-base">LEARN MORE</p>
          <Image src="/icons/learnMore.svg" width={20} height={20} alt="Learn more" />
        </Link>
      </div>
      <img src={article.thumbnail} alt="" className="w-5/12 h-auto object-cover" />
    </div>
  );
};

const Pagination: React.FC<{ current: number; totalPages: number }> = ({ current, totalPages }) => {
  const showPrev = current > 0;
  const showNext = current < totalPages - 1;

  return (
    <div className="flex flex-row gap-2 items-center">
      {showPrev && (
        <Link
          href={{ query: { page: current - 1 } }}
          className="flex items-center gap-2 text-orange-500 hover:border-b-orange-500"
        >
          <Image
            src="/icons/nextPage.svg"
            width={20}
            height={20}
            alt="Previous page"
            className="rotate-180"
          />
          <span className="hidden sm:block">PREVIOUS PAGE</span>
        </Link>
      )}

      {[...Array(totalPages).keys()].map((num) => (
        <Link
          key={num}
          href={{ query: { page: num } }}
          className={num === current ? "pointer-events-none cursor-default" : ""}
        >
          <span
            className={`flex justify-center items-center rounded-full w-10 h-10 text-white font-golos font-medium ${
              num === current ? "bg-orange-600" : "bg-gray-400"
            }`}
          >
            {num + 1}
          </span>
        </Link>
      ))}

      {showNext && (
        <Link
          href={{ query: { page: current + 1 } }}
          className="flex items-center gap-2 text-orange-500 hover:border-b-orange-500"
        >
          <span className="hidden sm:block">NEXT PAGE</span>
          <Image src="/icons/nextPage.svg" width={20} height={20} alt="Next page" />
        </Link>
      )}
    </div>
  );
};

const EventsArchiveContent: React.FC = () => {
  const { articles, loading: articleLoading } = useContext(ArticleContext);
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!articleLoading) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [articleLoading]);

  if (articleLoading) {
    return (
      <p className="flex justify-center items-center w-full h-96 text-xl text-gray-400">
        Loading...
      </p>
    );
  }

  const totalPages = Math.ceil(articles.length / EVENTS_PER_PAGE);
  const pageParam = searchParams.get("page");
  const currPage =
    !isNaN(Number(pageParam)) && Number(pageParam) >= 0 && Number(pageParam) < totalPages
      ? Number(pageParam)
      : 0;
  const pageArticles = articles.slice(currPage * EVENTS_PER_PAGE, (currPage + 1) * EVENTS_PER_PAGE);

  return (
    <div className="p-5">
      <section
        className="flex flex-col gap-5 mb-5 transition-opacity duration-700 font-golos"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        {pageArticles.map((a, i) => (
          <EventCard article={a} key={i} />
        ))}
      </section>
      <Pagination current={currPage} totalPages={totalPages} />
    </div>
  );
};

const EventsArchivePage: React.FC = () => {
  const context = useContext(PageDataContext);
  if (!context) return <div>Error: Page data unavailable.</div>;

  const { pageData, loading: pageLoading } = context;
  if (pageLoading) return null;

  const page = pageData.find((p) => p.pagename === "events-archive");
  if (!page) return <div>No data for events-archive.</div>;

  const headerField = page.fields.find((f) => f.name === "header");
  const descriptionField = page.fields.find((f) => f.name === "description");

  const headerData = headerField?.data as {
    imageUrl: string;
    header: string;
    subheader?: string;
    fancy?: boolean;
  };
  const descData = descriptionField?.data as { title: string; description: string };

  return (
    <Suspense>
      {headerField && (
        <Header
          imageUrl={headerData.imageUrl}
          header={headerData.header}
          subheader={headerData.subheader ?? ""}
          fancy={headerData.fancy}
        />
      )}
      <div className="p-5">
        <section className="flex flex-col gap-5 mb-5 font-golos">
          <h1 className="text-2xl sm:text-4xl font-medium">{descData.title}</h1>
          <p className="text-sm sm:text-base pt-4">{descData.description}</p>
        </section>
        <EventsArchiveContent />
      </div>
    </Suspense>
  );
};

export default EventsArchivePage;
