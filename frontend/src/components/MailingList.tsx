"use client";

import { Icon, Table } from "@tritonse/tse-constellation";
import React, { useCallback, useEffect, useState } from "react";

import AddContactModal from "./AddContactModal";
import ConfirmationModal from "./ConfirmationModal";
import EditContactModal from "./EditContactModal";
import { NotificationCard } from "./Notifications/NotificationCard";

import type { ColumnDef } from "@tanstack/react-table";

import { del } from "@/api/requests";
import { useAuthState } from "@/contexts/userContext";
import { useSubscriptions } from "@/hooks/useSubscriptions";

type User = {
  firstName: string;
  lastName: string;
  emailAdd: string;
  joinDate: string;
  status: "Active" | "Error";
  membership: "Community" | "Family" | "";
};

const useAuthHeader = () => {
  const { firebaseUser } = useAuthState();
  return useCallback(async () => {
    if (!firebaseUser) throw new Error("User not authenticated");
    const token = await firebaseUser.getIdToken(/* forceRefresh */ true);
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }, [firebaseUser]);
};

const MailingList: React.FC = () => {
  const [subs, loading] = useSubscriptions();
  const [data, setData] = useState<User[]>([]);
  const buildAuthHeader = useAuthHeader();

  useEffect(() => {
    if (typeof window === "undefined") return; // avoid SSR mismatch

    const pstFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const rows: User[] = subs.map((s) => ({
      firstName: s.firstname ?? "",
      lastName: s.lastname ?? "",
      emailAdd: s.email,
      joinDate: pstFormatter.format(new Date(s.joined)),
      status: s.status === "active" ? "Active" : "Error",
      membership: s.membership === "family" ? "Family" : "Community",
    }));

    setData(rows);
  }, [subs]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [rowSelection, setRowSelection] = useState<Record<number, boolean>>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingContact, setEditingContact] =
    useState<Parameters<typeof EditContactModal>[0]["contact"]>(null);

  type Note = { id: string; text: string; type: "success" | "error" | "info" | "warning" };
  const [notifications, setNotifications] = useState<Note[]>([]);
  const pushSuccess = (t: string) => {
    setNotifications((n) => [...n, { id: crypto.randomUUID(), text: t, type: "success" }]);
  };
  const dismiss = (id: string) => {
    setNotifications((n) => n.filter((m) => m.id !== id));
  };
  const filtered = data.filter((u) =>
    [u.firstName, u.lastName, u.emailAdd].some((f) =>
      (f ?? "").toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleAll = () => {
    const allSelected = paginated.every((_, idx) => rowSelection[idx]);
    const next: Record<number, boolean> = {};
    paginated.forEach((_, idx) => (next[idx] = !allSelected));
    setRowSelection(next);
  };

  const columns: ColumnDef<User>[] = [
    {
      id: "select",
      header: () => (
        <input
          type="checkbox"
          checked={paginated.length > 0 && paginated.every((_, idx) => rowSelection[idx])}
          onChange={toggleAll}
          className="orange-checkbox"
        />
      ),
      cell: ({ row }) => {
        const idx = row.index;
        const sel = !!rowSelection[idx];
        return (
          <input
            type="checkbox"
            checked={sel}
            onChange={() => {
              setRowSelection((prev) => ({ ...prev, [idx]: !sel }));
            }}
            className="orange-checkbox"
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
        const email = String(row.getValue("emailAdd") ?? "");
        if (!email) return <span className="text-gray-400 italic">—</span>;

        const copy = (e: React.MouseEvent) => {
          e.stopPropagation();
          void navigator.clipboard.writeText(email).then(() => {
            pushSuccess("Email address copied successfully.");
          });
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
    {
      header: "Membership",
      accessorKey: "membership",
      cell: ({ row }) => {
        const val = String(row.getValue("membership") ?? "");
        const classes =
          val === "Family" ? "bg-[#FAE1FA] text-[#8A226F]" : "bg-[#FFE8A3] text-[#975102]";
        return (
          <span className={`px-2 py-1 rounded-sm text-sm ${classes}`}>
            {val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()}
          </span>
        );
      },
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const val: User["status"] = row.getValue("status");
        const classes =
          val === "Active" ? "bg-[#AFF4C6] text-[#1B1B1B]" : "bg-[#FCB3AD] text-[#1B1B1B]";
        return <span className={`px-2 py-1 rounded-sm text-sm ${classes}`}>{val}</span>;
      },
    },
  ];

  const selectedEmails = paginated
    .map((u, idx) => (rowSelection[idx] ? u.emailAdd : null))
    .filter(Boolean) as string[];

  const selectionCount = selectedEmails.length;

  const primaryLabel =
    selectionCount === 0 ? "Add Contact" : selectionCount === 1 ? "Edit Contact" : "Copy Emails";

  const primaryIcon =
    selectionCount === 0
      ? "/icons/ic_add.svg"
      : selectionCount === 1
        ? "/icons/ic_edit.svg"
        : "/icons/ic_copy.svg";

  const handlePrimaryClick = () => {
    if (selectionCount === 0) {
      setShowAddContactModal(true);
    } else if (selectionCount === 1) {
      const email = selectedEmails[0];
      const row = data.find((u) => u.emailAdd === email);
      if (!row) return;

      setEditingContact({
        firstName: row.firstName,
        lastName: row.lastName,
        emailAdd: row.emailAdd,
        membership: row.membership === "Family" ? "family" : "community",
        status: row.status === "Active" ? "active" : "error",
      });
      setShowEditModal(true);
    } else {
      void navigator.clipboard.writeText(selectedEmails.join(", ")).then(() => {
        pushSuccess(`Contacts copied successfully (${String(selectedEmails.length)})`);
      });
    }
  };

  const deleteSelected = async () => {
    try {
      const headers = await buildAuthHeader();
      await del(
        "/subscriptions",
        {
          ...headers,
          "Content-Type": "application/json",
        },
        { emails: selectedEmails },
      );

      setData((prev) => prev.filter((u) => !selectedEmails.includes(u.emailAdd)));
      setRowSelection({});
      pushSuccess("Contact deleted successfully");
    } catch (err) {
      console.error(err);
    } finally {
      setShowConfirm(false);
    }
  };

  const exportCSV = () => {
    const csv = [
      ["First Name", "Last Name", "Email", "Join Date", "Status"],
      ...data.map((u) => [u.firstName, u.lastName, u.emailAdd, u.joinDate, u.status]),
    ]
      .map((r) => r.map((c) => `"${c}"`).join(","))
      .join("\n");

    const link = document.createElement("a");
    link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
    link.download = "mailing_list.csv";
    link.click();
  };

  if (loading) return <p className="p-6">Loading subscriptions…</p>;

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="fixed top-4 left-1/2 -translate-x-1/2 flex flex-col gap-3 items-center z-[100]">
        {notifications.map((n) => (
          <NotificationCard
            key={n.id}
            id={n.id}
            text={n.text}
            type={n.type}
            onClose={() => {
              dismiss(n.id);
            }}
          />
        ))}
      </div>
      <h1 className="text-3xl font-bold mb-4">Mailing List</h1>
      <div className="flex justify-between items-center gap-4 mb-2">
        <div className="relative flex-1">
          <Icon name="ic_search" fill="black" className="absolute left-3 top-2.5 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="w-full h-11 pl-10 pr-4 border border-[#e5e7eb] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handlePrimaryClick}
            className="bg-[#f26522] text-white px-6 py-2 rounded-md flex items-center gap-2"
          >
            <span className="text-xl">{primaryLabel}</span>
            <img src={primaryIcon} alt="" className="w-5 h-5" />
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

      <div className="overflow-x-auto">
        {filtered.length === 0 ? (
          <div className="w-full h-[400px] flex flex-col items-center justify-center">
            <img src="/icons/ic_noResultSearch.svg" alt="No results" className="w-12 h-12 mb-6" />
            <h2
              className="font-golos-text font-medium text-[32px] leading-[150%] tracking-[0%]"
              style={{ verticalAlign: "bottom" }}
            >
              No Results Found
            </h2>
            <p className="font-golos-text font-normal text-[16px] leading-[24px] text-center mt-4 max-w-xl">
              We can’t find any names that match your search. Please double check your selection and
              try again.
            </p>
          </div>
        ) : (
          <Table
            columns={columns}
            data={paginated}
            className="w-full tse-table group/row"
            enablePagination={false}
            enableSorting={true}
            enableGlobalFiltering={false}
          />
        )}
      </div>

      <div className="flex items-center justify-between mt-6 relative">
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={() => {
              setCurrentPage((p) => Math.max(p - 1, 1));
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
              setCurrentPage((p) => Math.min(p + 1, totalPages));
            }}
            disabled={currentPage === totalPages}
            className="text-gray-500 disabled:opacity-50"
          >
            <Icon name="ic_caretright" fill="black" />
          </button>
        </div>

        {selectionCount > 0 && (
          <div className="ml-auto">
            <button
              onClick={() => {
                setShowConfirm(true);
              }}
              style={{ width: 235 }}
              className="flex items-center justify-center px-6 h-[48px] rounded-md border-2 border-[#B93B3B] text-[#B93B3B]"
            >
              Delete Contacts ({selectionCount})
            </button>
          </div>
        )}
      </div>

      {/* styles (unchanged + new checkbox rules) */}
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
        :global(.tse-table tr[aria-selected="true"]) {
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
        :global(.tse-table tbody tr:has(input[type="checkbox"]:checked)) {
          background-color: #fff3e3 !important;
          border: 3px solid transparent;
        }
        :global(.tse-table tbody tr:has(input[type="checkbox"]:checked):hover) {
          border-color: #f7941c !important;
        }

        /* new checkbox styles */
        :global(input.orange-checkbox) {
          appearance: none;
          width: 21px;
          height: 21px;
          border: 3px solid #f05629;
          border-radius: 0.25rem;
          background-color: #ffffff;
          cursor: pointer;
          transition: all 0.15s ease-in-out;
        }

        :global(input.orange-checkbox:checked) {
          background: url("/icons/ic_checkbox.svg") center center no-repeat;
          background-size: 16px 16px;
          background-color: #ffffff;
          border-color: #f05629;
        }
      `}</style>

      <ConfirmationModal
        open={showConfirm}
        count={selectionCount}
        onCancel={() => {
          setShowConfirm(false);
        }}
        onConfirm={() => {
          void deleteSelected();
        }}
      />

      <AddContactModal
        isOpen={showAddContactModal}
        onClose={() => {
          setShowAddContactModal(false);
        }}
        onSaved={(msg) => {
          pushSuccess(msg);
        }}
      />
      <EditContactModal
        isOpen={showEditModal}
        contact={editingContact}
        onClose={() => {
          setShowEditModal(false);
          setEditingContact(null);
        }}
        onSaved={(msg) => {
          pushSuccess(msg);
        }}
      />
    </div>
  );
};

export default MailingList;
