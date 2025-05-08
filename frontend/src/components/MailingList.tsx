"use client";

import React, { useEffect, useState } from "react";
import { Icon, Table } from "@tritonse/tse-constellation";
import type { ColumnDef } from "@tanstack/react-table";
import ConfirmationModal from "./ConfirmationModal";

import { useSubscriptions } from "@/hooks/useSubscriptions";   // ← NEW

// -----------------------------------------------------------------------------
// Data model (same shape the table expects)
// -----------------------------------------------------------------------------
interface User {
  firstName: string;
  lastName: string;
  emailAdd: string;
  joinDate: string;
  status: "Active" | "Error" | "";          // blank allowed
  membership: "Community" | "Family" | "";  // blank allowed
}

const MailingList: React.FC = () => {
  /* -------------------------------------------------------------------------- */
  /* 1️⃣  Load data from backend                                                */
  /* -------------------------------------------------------------------------- */
  const [subs, loading] = useSubscriptions();      // NEW
  const [data, setData] = useState<User[]>([]);    // keep deletions local

  // Whenever the backend refetches, sync into local data
  useEffect(() => setData(subs as User[]), [subs]);

  /* -------------------------------------------------------------------------- */
  /* 2️⃣  UI state                                                              */
  /* -------------------------------------------------------------------------- */
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [rowSelection, setRowSelection] = useState<Record<number, boolean>>({});
  const [showConfirm, setShowConfirm] = useState(false);

  /* -------------------------------------------------------------------------- */
  /* 3️⃣  Derived rows (search / pagination)                                    */
  /* -------------------------------------------------------------------------- */
  const filtered = data.filter((u) =>
    [u.firstName, u.lastName, u.emailAdd].some((f) =>
      f.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  /* -------------------------------------------------------------------------- */
  /* 4️⃣  Helpers                                                               */
  /* -------------------------------------------------------------------------- */
  const toggleAll = () => {
    const allSelected = paginated.every((_, idx) => rowSelection[idx]);
    const newSel: Record<number, boolean> = {};
    paginated.forEach((_, idx) => (newSel[idx] = !allSelected));
    setRowSelection(newSel);
  };

  /* -------------------------------------------------------------------------- */
  /* 5️⃣  Column definitions (unchanged)                                        */
  /* -------------------------------------------------------------------------- */
  const columns: ColumnDef<User>[] = [
    {
      id: "select",
      header: () => (
        <input
          type="checkbox"
          checked={
            paginated.length > 0 &&
            paginated.every((_, idx) => rowSelection[idx])
          }
          onChange={toggleAll}
          className="appearance-none w-[21px] h-[21px] rounded-sm border-[3px] border-white bg-[#F05629] transition-colors accent-white checked:bg-white checked:border-[#F05629] checked:accent-[#F05629]"
        />
      ),
      cell: ({ row }) => {
        const idx = row.index;
        const sel = !!rowSelection[idx];
        return (
          <input
            type="checkbox"
            checked={sel}
            onChange={() =>
              setRowSelection((prev) => ({ ...prev, [idx]: !sel }))
            }
            className={`appearance-none w-[21px] h-[21px] rounded-sm border-[3px] border-[#F05629] ${
              sel ? "bg-[#F05629] accent-white" : "bg-white accent-white"
            }`}
          />
        );
      },
    },
    { header: "First Name", accessorKey: "firstName" },
    { header: "Last Name", accessorKey: "lastName" },
    {
      header: "Email",
      accessorKey: "emailAdd",
      cell: ({ row }) => {
        const email = row.getValue("emailAdd") as string;
        if (!email) return <span className="text-gray-400 italic">—</span>;

        const copy = (e: React.MouseEvent) => {
          e.stopPropagation();
          navigator.clipboard.writeText(email).catch(() => {});
        };
        return (
          <div
            onClick={copy}
            className="flex items-center gap-4 cursor-pointer"
            title="Click to copy"
          >
            <span className="truncate">{email}</span>
            <img
              src="/icons/ic_copyblack.svg"
              alt="copy"
              className="hover-icon w-5 h-5 opacity-0 transition-opacity"
            />
          </div>
        );
      },
    },
    { header: "Join Date", accessorKey: "joinDate" },
    { header: "Membership", accessorKey: "membership" },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const val = row.getValue("status");
        return (
          <span
            className={`px-2 py-1 rounded-sm text-sm ${
              val === "Active"
                ? "bg-[#AFF4C6] text-[#1B1B1B]"
                : val === "Error"
                ? "bg-[#FCB3AD] text-[#1B1B1B]"
                : "bg-[#D9D9D9] text-[#1B1B1B]"
            }`}
          >
            {val || "—"}
          </span>
        );
      },
    },
  ];

  /* selected emails, copy, delete, export ... (unchanged) ------------------- */
  const selectedEmails = paginated
    .map((u, idx) => (rowSelection[idx] ? u.emailAdd : null))
    .filter(Boolean) as string[];
  const hasSelection = selectedEmails.length > 0;

  const copyEmails = () =>
    navigator.clipboard.writeText(selectedEmails.join(", ")).catch(() => {});

  const deleteRows = () => {
    const next = data.filter(
      (_, idx) => !rowSelection[(currentPage - 1) * itemsPerPage + idx],
    );
    setRowSelection({});
    setData(next);
  };

  const exportCSV = () => {
    const csv = [
      ["First Name", "Last Name", "Email", "Join Date", "Status"],
      ...data.map((u) => [
        u.firstName,
        u.lastName,
        u.emailAdd,
        u.joinDate,
        u.status,
      ]),
    ]
      .map((r) => r.map((c) => `"${c}"`).join(","))
      .join("\n");

    const link = document.createElement("a");
    link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
    link.download = "mailing_list.csv";
    link.click();
  };

  /* -------------------------------------------------------------------------- */
  /* 6️⃣  Render                                                                */
  /* -------------------------------------------------------------------------- */
  if (loading) return <p className="p-6">Loading subscriptions…</p>; // NEW

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* --- header & search ------------------------------------------------ */}
      <h1 className="text-3xl font-bold mb-4">Mailing List</h1>
      <div className="flex justify-between items-center gap-4 mb-2">
        <div className="relative flex-1">
          <Icon
            name="ic_search"
            fill="black"
            className="absolute left-3 top-2.5 h-5 w-5"
          />
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 border border-[#e5e7eb] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={hasSelection ? copyEmails : () => console.log("Add Contact")}
            className="bg-[#f26522] text-white px-6 py-2 rounded-md flex items-center gap-2"
          >
            <span className="text-xl">
              {hasSelection ? "Copy Emails" : "Add Contact"}
            </span>
            <img
              src={hasSelection ? "/icons/ic_copy.svg" : "/icons/ic_add.svg"}
              alt=""
              className="w-5 h-5"
            />
          </button>
          <button
            onClick={exportCSV}
            className="bg-[#f26522] text-white px-6 py-2 rounded-md flex items-center gap-2"
          >
            <span className="text-xl">Export</span>
            <img src="/icons/ic_download.svg" alt="" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* --- table ---------------------------------------------------------- */}
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          data={paginated}
          className="w-full tse-table group/row"
          enablePagination={false}
          enableSorting={true}
          enableGlobalFiltering={false}
        />
      </div>

      {/* --- pagination & bulk delete -------------------------------------- */}
      <div className="flex items-center justify-between mt-6 relative">
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
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
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="text-gray-500 disabled:opacity-50"
          >
            <Icon name="ic_caretright" fill="black" />
          </button>
        </div>

        {hasSelection && (
          <div className="ml-auto">
            <button
              onClick={() => setShowConfirm(true)}
              style={{ width: 235 }}
              className="flex items-center justify-center px-6 h-[48px] rounded-md border-2 border-[#B93B3B] text-[#B93B3B]"
            >
              Delete Contacts ({selectedEmails.length})
            </button>
            <ConfirmationModal
              open={showConfirm}
              selectedCount={selectedEmails.length}
              onCancel={() => setShowConfirm(false)}
              onConfirm={() => {
                deleteRows();
                setShowConfirm(false);
              }}
            />
          </div>
        )}
      </div>

      {/* --- styles (unchanged) -------------------------------------------- */}
      <style jsx>{`
        :global(.tse-table th),
        :global(.tse-table th span),
        :global(.tse-table th div),
        :global(.tse-table th input) {
          color: #ffffff !important;
          fill: #ffffff !important;
        }
        :global(.tse-table th) {
          background-color: #f26522 !important;
        }
        :global(.tse-table tr:hover) {
          border: 3px solid #f7941c !important;
          background-color: #f8f8f8 !important;
        }
        :global(.tse-table tr[aria-selected='true']) {
          background-color: #fff3e3 !important;
        }
        :global(.tse-table tr) {
          background-color: #ffffff !important;
          border: 1px solid #f3f3f3 !important;
          transition: border 0.15s ease-in-out;
        }
        :global(.tse-table td) {
          border-bottom: 1px solid #e5e7eb !important;
        }
        :global(.tse-table tr:hover .hover-icon) {
          opacity: 1 !important;
        }
        :global(.tse-table tbody tr:has(input[type='checkbox']:checked)) {
          background-color: #fff3e3 !important;
          border: 3px solid transparent;
        }
        :global(.tse-table tbody tr:has(input[type='checkbox']:checked):hover) {
          border-color: #f7941c !important;
        }
      `}</style>
    </div>
  );
};

export default MailingList;
