"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useContext } from "react";

import backArrow from "@/../public/icons/backArrow.svg";
import { ArticleContext } from "@/contexts/articleContext";
import { Article } from "@/hooks/useArticles";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const convertDateToMonthDayYear = (date: string): string => {
  const textDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return textDate;
};

/**
 * Element to display the selected article in the viewer.
 *
 * @param param0
 * @returns
 */
const SelectedArticle: React.FC<{ article: Article }> = ({ article }) => {
  const formattedDate = convertDateToMonthDayYear(article.dateCreated);

  return (
    <div>
      {/* Desktop View */}
      <div className="hidden md:flex md:flex-row w-full gap-10">
        <img src={article.thumbnail} alt={article.header} className="w-5/12 h-auto object-cover" />
        <div className="flex flex-col w-7/12 justify-center gap-5">
          <h1 className="mb-2 font-baskerville text-5xl font-bold leading-relaxed">
            {article.header}
          </h1>
          <p className="font-golos text-lg text-orange-500 font-semibold">{formattedDate}</p>
          <p className="font-golos text-lg leading-8">{article.body}</p>
        </div>
      </div>

      {/* Tablet/Mobile View */}
      <div className="flex md:hidden flex-col w-full gap-7">
        <h1 className="font-baskerville text-4xl sm:text-5xl font-bold leading-snug">
          {article.header}
        </h1>
        <p className="font-golos sm:text-lg text-orange-500 font-normal">{formattedDate}</p>
        <img src={article.thumbnail} alt={article.header} className="w-full h-auto object-cover" />
        <p className="font-golos sm:text-lg leading-8">{article.body}</p>
      </div>
    </div>
  );
};

const ArticleCard: React.FC<{ article: Article; index: number }> = ({ article, index }) => {
  const numCardLimit = 2;
  return (
    // Removes the third card in mobile screen
    <div
      className={`flex flex-col w-full h-full gap-2 cursor-pointer font-golos ${index >= numCardLimit ? "hidden md:flex" : ""}`}
    >
      <img src={article.thumbnail} alt={article.header} className="w-full h-80 mb-3 object-cover" />
      <h3 className="mb-2 text-2xl line-clamp-1">{article.header}</h3>
      <p className="sm:text-base text-orange-500">
        {convertDateToMonthDayYear(article.dateCreated)}
      </p>
      <p className="sm:text-base line-clamp-4 leading-8">{article.body}</p>
    </div>
  );
};

const RelatedArticles: React.FC<{ sortedArticles: Article[] }> = ({ sortedArticles }) => {
  const hasArticles = sortedArticles.length > 0;

  return (
    <div>
      <h2 className="mt-5 mb-16 text-orange-500 font-semibold text-4xl md:text-5xl">
        Related Articles
      </h2>
      <div className="flex flex-col md:flex-row gap-10 h-full">
        {hasArticles ? (
          sortedArticles
            .slice(0, 3)
            .map((article, index) => <ArticleCard key={index} article={article} index={index} />)
        ) : (
          <p className="flex flow justify-center items-center text-3xl text-gray-400">
            No related articles found.
          </p>
        )}
      </div>
    </div>
  );
};

/**
 *
 * @param props Takes a Article as a prop to highlight the article in the viewer.
 * @returns
 */
const ArticleViewerPage: React.FC = () => {
  const { articles, loading } = useContext(ArticleContext);

  const searchParams = useSearchParams();
  const id = searchParams.get("articleId");

  // Get sorted articles by recent
  const sortedArticles = articles.sort((a, b) => {
    const dateA = new Date(a.dateCreated);
    const dateB = new Date(b.dateCreated);
    return dateA.getTime() - dateB.getTime();
  });

  const filteredArticles = articles.filter((article) => article._id === id);
  const selectedArticle: Article = filteredArticles[0];

  // 404 Page
  if (selectedArticle === undefined && !loading) {
    return (
      <div className="flex flow justify-center items-center h-96 w-full text-2xl text-gray-400">
        <Link
          className="flex flex-row items-center gap-2 mb-10 w-fit border border-transparent hover:border-b-gray-400"
          href={{ pathname: "/stay-connected" }}
        >
          <Image src={backArrow as StaticImport} alt="back arrow icon" />
          <p className="text-lg sm:text-xl text-gray-400">Back to all articles</p>
        </Link>
        <p>404 - Article Not Found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 w-full h-full">
      <div className="p-10 pb-5">
        <Link
          className="flex flex-row items-center gap-2 mb-10 w-fit border border-transparent hover:border-b-gray-400"
          href={{ pathname: "/stay-connected" }}
        >
          <Image src={backArrow as StaticImport} alt="back arrow icon" />
          <p className="text-lg sm:text-xl text-gray-400">Back to all articles</p>
        </Link>
        {loading ? (
          <p className="flex flow justify-center items-center h-96 text-3xl text-gray-400">
            Loading article...
          </p>
        ) : (
          <SelectedArticle article={selectedArticle} />
        )}
      </div>
      <div className="p-10 bg-gray-100">
        {loading ? (
          <p className="flex flow justify-center items-center h-96 text-3xl text-gray-400">
            Loading related articles...
          </p>
        ) : (
          <RelatedArticles sortedArticles={sortedArticles} />
        )}
        <div className="flex justify-center items-center w-full mt-10 mb-5">
          <button className="p-3 border-transparent rounded bg-orange-500 hover:bg-orange-400 text-white font-golos">
            See All Articles
          </button>
        </div>
      </div>
    </div>
  );
};
export default ArticleViewerPage;
