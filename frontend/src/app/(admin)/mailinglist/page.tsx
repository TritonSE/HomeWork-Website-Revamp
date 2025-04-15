"use client";

import { Icon, Table } from "@tritonse/tse-constellation";
import React, { useState } from "react";

import type { RowSelectionState } from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table"; // ADD THIS

type User = {
  firstName: string;
  lastName: string;
  emailAdd: string;
  joinDate: string;
  status: "Active" | "Error";
};

const MailingList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const [users, setUsers] = useState<User[]>([
    {
      lastName: "Zuckerberg",
      firstName: "Mark",
      emailAdd: "mark@meta.com",
      joinDate: "9/9/2022",
      status: "Active",
    },
    {
      lastName: "Musk",
      firstName: "Elon",
      emailAdd: "elon@meta.com",
      joinDate: "9/9/2025",
      status: "Error",
    },
    {
      lastName: "Jassy",
      firstName: "Andy",
      emailAdd: "andy@amazon.com",
      joinDate: "9/2/2025",
      status: "Active",
    },
    {
      lastName: "Bezos",
      firstName: "Jeff",
      emailAdd: "jeff@amazon.com",
      joinDate: "9/2/2025",
      status: "Active",
    },
    {
      lastName: "Cook",
      firstName: "Tim",
      emailAdd: "tim@apple.com",
      joinDate: "9/2/2024",
      status: "Active",
    },
    {
      lastName: "Zuckerberg1",
      firstName: "Mark",
      emailAdd: "mark@meta.com",
      joinDate: "9/9/2022",
      status: "Active",
    },
    {
      lastName: "Musk1",
      firstName: "Elon",
      emailAdd: "elon@meta.com",
      joinDate: "9/9/2025",
      status: "Error",
    },
    {
      lastName: "Jassy1",
      firstName: "Andy",
      emailAdd: "andy@amazon.com",
      joinDate: "9/2/2025",
      status: "Active",
    },
    {
      lastName: "Bezos1",
      firstName: "Jeff",
      emailAdd: "jeff@amazon.com",
      joinDate: "9/2/2025",
      status: "Active",
    },
    {
      lastName: "Cook1",
      firstName: "Tim",
      emailAdd: "tim@apple.com",
      joinDate: "9/2/2024",
      status: "Active",
    },
    {
      lastName: "Zuckerberg2",
      firstName: "Mark",
      emailAdd: "mark@meta.com",
      joinDate: "9/9/2022",
      status: "Active",
    },
    {
      lastName: "Musk2",
      firstName: "Elon",
      emailAdd: "elon@meta.com",
      joinDate: "9/9/2025",
      status: "Error",
    },
    {
      lastName: "Jassy2",
      firstName: "Andy",
      emailAdd: "andy@amazon.com",
      joinDate: "9/2/2025",
      status: "Active",
    },
    {
      lastName: "Bezos2",
      firstName: "Jeff",
      emailAdd: "jeff@amazon.com",
      joinDate: "9/2/2025",
      status: "Active",
    },
    {
      lastName: "Cook2",
      firstName: "Tim",
      emailAdd: "tim@apple.com",
      joinDate: "9/2/2024",
      status: "Active",
    },
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const addNewContact = () => {
    const newContact: User = {
      firstName: "",
      lastName: "",
      emailAdd: "",
      joinDate: "",
      status: "Active",
    };
    setUsers((prev) => [...prev, newContact]);
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "emailAdd",
      header: "Email Address",
    },
    {
      accessorKey: "joinDate",
      header: "Join Date",
      cell: ({ row }) => {
        const date = row.getValue("joinDate");
        return date ? new Date(date as string).toLocaleDateString() : "-";
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <span
            className={`px-2 py-1 rounded-sm text-sm ${
              status === "Active" ? "bg-[#AFF4C6] text-[#1B1B1B]" : "bg-[#FCB3AD] text-[#1B1B1B]"
            }`}
          >
            {status}
          </span>
        );
      },
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

          :global(.tse-table tr[aria-selected="true"]) {
            border: 2px solid black !important;
          }

          :global(.tse-table td) {
            border-bottom: 1px solid #e5e7eb !important;
            background-color: white !important;
          }

          /*  All checkboxes get black border */
          :global(.tse-table input[type="checkbox"]) {
            border: 4px solid black !important;
            border-radius: 4px;
            width: 21px !important;
            height: 21px !important;
          }

          :global(.tse-table th:first-child),
          :global(.tse-table td:first-child) {
            width: 65px !important;
            max-width: 605x !important;
            text-align: center !important;
          }

          /* Header checkbox gets white border */
          :global(.tse-table th input[type="checkbox"]) {
            border: 4px solid white !important;
          }
        `}</style>

        <h1 className="text-4xl font-medium mb-8">Mailing List</h1>

        <div className="flex items-center gap-5 mb-2">
          <div className="relative flex-1">
            <Icon
              name="ic_search"
              fill="black"
              className="absolute left-3 top-2.5 h-5 w-4.5 text-black"
            />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              className="w-full h-11 pl-10 pr-4 py-2 border border-[#e5e7eb] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={addNewContact}
              className="bg-[#f26522] text-white px-6 py-2 rounded-md flex items-center gap-2 whitespace-nowrap"
            >
              <>
                <span className="text-xl">Add Contact</span>
                <img src="/icons/ic_add.svg" alt="Add icon" className="w-5 h-5" />
              </>
            </button>
            <button className="bg-[#f26522] text-white px-6 py-2 rounded-md flex items-center gap-2 whitespace-nowrap">
              <>
                <span className="text-xl">Export</span>
                <img src="/icons/ic_download.svg" alt="Download icon" className="w-5 h-5" />
              </>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table
            columns={columns}
            data={paginatedUsers}
            className="w-full tse-table"
            enablePagination={false}
            enableSorting={true}
            enableGlobalFiltering={false}
            enableRowSelection={true}
            rowSelection={rowSelection}
            onRowSelectionChange={setRowSelection}
          />
        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => {
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
            onClick={() => {
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

export default MailingList;
