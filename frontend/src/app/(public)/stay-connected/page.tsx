"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

import Header from "@/components/Header";
import Header from "@/components/Header";
import { ArticleContext } from "@/contexts/articleContext";
import { PageDataContext } from "@/contexts/pageDataContext";
import { Article } from "@/hooks/useArticles";

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  const textDate = new Date(article.dateCreated).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col sm:basis-[calc(50%-10px)] gap-3">
      <img className="w-full h-80 mb-3 object-cover" src={article.thumbnail} alt={article.header} />
      <h2 className="text-2xl font-medium">{article.header}</h2>
      <p className="font-medium text-orange-500">{textDate}</p>
      <p className="line-clamp-3">{article.body ?? ""}</p>
      <Link
        href={{ pathname: "/article-viewer", query: { articleId: article._id } }}
        className="flex flex-row gap-2 w-fit text-gray-400 border border-transparent cursor-pointer hover:border-b-gray-400"
      >
        <p>LEARN MORE</p>
        <Image src="/icons/learnMore.svg" width={20} height={20} alt="Learn more arrow" />
      </Link>
    </div>
  );
};

const StayConnectedPage: React.FC = () => {
  const { articles, loading } = useContext(ArticleContext);
  const pageContext = useContext(PageDataContext);
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
  const { pageData, loading: pageLoading } = pageContext;
  if (pageLoading) return null;

  const page = pageData.find((p) => p.pagename === "stay-connected");
  if (!page) return <div>No Stay Connected page data found.</div>;

  const headerField = page.fields.find((f) => f.name === "header");
  const descField = page.fields.find((f) => f.name === "description");

  const headerData = headerField?.data as {
    imageUrl: string;
    header: string;
    subheader: string;
    fancy?: boolean;
  };
  const descData = descField?.data as { title: string; description: string };

  return (
    <div
      className={`flex flex-col transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Header Section */}
      {headerField && (
        <>
          <Header
            imageUrl={headerData.imageUrl}
            header={headerData.header}
            subheader={headerData.subheader}
            fancy={headerData.fancy}
          />
          <div className="flex justify-end w-full mt-4 px-10">
            <Link
              href="/contact"
              className="w-[25%] border rounded-lg px-6 py-3 bg-transparent hover:bg-white/25"
            >
              Send us a Message
            </Link>
          </div>
        </>
      )}

      {/* Content Section */}
      <div className="p-10 font-golos">
        <h1 className="mb-5 text-3xl sm:text-5xl font-medium">{descData.title}</h1>
        <p>{descData.description}</p>

        {/* 4 article cards */}
        <div className="flex flex-row flex-wrap gap-5 gap-y-10 mt-10">
          {loading ? (
            <p className="flex justify-center items-center w-full h-96 text-xl text-gray-400">
              Loading...
            </p>
          ) : (
            articles
              .slice(0, 4)
              .map((article) => <ArticleCard key={article._id} article={article} />)
          )}
        </div>

        <div className="flex justify-start items-center w-full mt-10 mb-5">
          <Link
            href="/events-archive"
            className="p-3 border-transparent rounded bg-orange-500 hover:bg-orange-400 text-white font-golos"
          >
            See All Articles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StayConnectedPage;
