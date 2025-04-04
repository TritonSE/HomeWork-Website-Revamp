"use client";
import { Table } from "@tritonse/tse-constellation";
import React from "react";

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

  const articlesWithStatus: ArticleWithStatus[] = articles.map((article) => ({
    ...article,
    status: "Published" as const,
  }));

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
          :global(.tse-pagination button.active) {
            background-color: #f26522 !important;
            color: white !important;
          }
          :global(.tse-pagination button:hover:not(.active)) {
            background-color: #ffdfd3 !important;
          }
          :global(.tse-search) {
            margin-bottom: 1rem !important;
            width: 100% !important;
          }
          :global(.tse-search input) {
            padding: 0.5rem !important;
            border: 1px solid #e5e7eb !important;
            border-radius: 0.375rem !important;
            width: 100% !important;
          }
          :global(._paginationContainer_1autq_54) {
            align-items: center !important;
          }
        `}</style>
        <h1 className="text-4xl">Event Manager</h1>
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            data={articlesWithStatus}
            className="w-full tse-table"
            searchFieldProps={{
              placeholder: "Search events...",
            }}
            enablePagination={true}
            enableSorting={true}
            enableGlobalFiltering={true}
          />
        </div>
      </div>
    </div>
  );
};

export default EventsTable;
