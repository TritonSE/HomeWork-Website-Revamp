"use client";
import { Icon, Table } from "@tritonse/tse-constellation";
import React, { useState } from "react";

import type { Article } from "@/hooks/useArticles";

import { useArticles } from "@/hooks/useArticles";

type ArticleWithStatus = Article & {
  status: "Published";
};

type Row = {
  getValue: (key: keyof ArticleWithStatus) => string;
};

type Column = {
  header: string;
  accessorKey: keyof ArticleWithStatus;
  cell?: ({ row }: { row: Row }) => React.ReactNode;
};

const EventsTable: React.FC = () => {
  const [articles] = useArticles();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const articlesWithStatus: ArticleWithStatus[] = articles.map((article) => ({
    ...article,
    status: "Published" as const,
  }));

  const filteredArticles = articlesWithStatus.filter((article) =>
    article.header.toLowerCase().startsWith(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const columns: Column[] = [
    {
      header: "Event Name",
      accessorKey: "header",
    },
    {
      header: "Posting Date",
      accessorKey: "dateCreated",
      cell: ({ row }) => new Date(row.getValue("dateCreated")).toLocaleDateString(),
    },
    {
      header: "Author",
      accessorKey: "author",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-sm text-sm ${
            row.getValue("status") === "Published"
              ? "bg-[#AFF4C6] text-[#1B1B1B]"
              : "bg-[#D9D9D9] text-[#1B1B1B]"
          }`}
        >
          {row.getValue("status")}
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-lg p-6">
        <style jsx>{`
          :global(._headerCell_1autq_27) {
            color: #ffffff !important;
            font-weight: 500 !important;
          }
          :global(.tse-table th) {
            background-color: #f26522 !important;
          }
          :global(.tse-table tr:hover) {
            background-color: #f8f8f8 !important;
          }
          :global(.tse-table tr) {
            background-color: #ffffff !important;
            border: 1px solid #f3f3f3 !important;
          }
          :global(.tse-table td) {
            border-bottom: 1px solid #e5e7eb !important;
          }
          :global(._sortToggleContainer_1autq_41 svg) {
            fill: #ffffff !important;
          }
        `}</style>

        <h1 className="text-4xl font-medium mb-8">Event Manager</h1>
        <div className="flex justify-between items-center gap-4 mb-2">
          <div className="relative flex-1">
            <Icon
              name="ic_search"
              fill="black"
              className="absolute left-3 top-2.5 h-5 w-5 text-black"
            />
            <input
              type="text"
              placeholder="Search by event name and author"
              value={searchQuery}
              onChange={(e): void => {
                setSearchQuery(e.target.value);
              }}
              className="w-[95%] h-11 pl-10 pr-4 py-2 border border-[#e5e7eb] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
            />
          </div>
          <button className="bg-[#f26522] text-white px-6 py-2 rounded-md flex items-center gap-2 whitespace-nowrap">
            <span className="text-xl">+</span> NEW
          </button>
        </div>

        <div className="overflow-x-auto">
          <Table
            columns={columns}
            data={paginatedArticles}
            className="w-full tse-table"
            enablePagination={false}
            enableSorting={true}
            enableGlobalFiltering={false}
          />
        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={(): void => {
              setCurrentPage((prev) => Math.max(prev - 1, 1));
            }}
            disabled={currentPage === 1}
            className="text-gray-500 disabled:opacity-50"
          >
            <Icon name="ic_caretleft" fill="black" />
          </button>
          <div className="flex items-center gap-2 text-gray-500">
            <span>page</span>
            <div className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded">
              {currentPage}
            </div>
            <span>of</span>
            <span>{totalPages}</span>
          </div>
          <button
            onClick={(): void => {
              setCurrentPage((prev) => Math.min(prev + 1, totalPages));
            }}
            disabled={currentPage === totalPages}
            className="text-gray-500 disabled:opacity-50"
          >
            <Icon name="ic_caretright" fill="black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsTable;
