"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

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
      <p className="line-clamp-3">{article?.body ?? ""}</p>
      <Link
        className="flex flex-row gap-2 w-fit text-gray-400 border border-transparent cursor-pointer hover:border-b-gray-400"
        href={{ pathname: "/article-viewer", query: { articleId: article._id } }}
      >
        <p>LEARN MORE</p>
        <Image src="/icons/learnMore.svg" width={20} height={20} alt="Learn more arrow" />
      </Link>
    </div>
  );
};

const StayConnectedPage = () => {
  const { articles, loading } = useContext(ArticleContext);
  const context = useContext(PageDataContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (context?.pageData && !context.loading) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [context]);

  if (!context) return <div>Error: Page data not available.</div>;
  const { pageData } = context;
  const page = pageData.find((entry) => entry.pagename === "stay-connected");
  if (!page) return <div>No Stay Connected page data found.</div>;

  const headerField = page.fields.find((field) => field.name === "header");
  const headerData = headerField?.data as { title: string; description: string };

  return (
    <div
      className={`p-10 font-golos transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <h1 className="mb-5 text-3xl sm:text-5xl font-golos font-medium">{headerData.title}</h1>
      <p>{headerData.description}</p>

      {/* 4 article cards */}
      <div className="flex flex-row flex-wrap gap-5 gap-y-10 mt-10">
        {loading ? (
          <p className="flex flow justify-center items-center w-full h-96 text-xl text-gray-400">
            Loading...
          </p>
        ) : (
          articles.slice(0, 4).map((article) => <ArticleCard key={article._id} article={article} />)
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
  );
};

export default StayConnectedPage;
