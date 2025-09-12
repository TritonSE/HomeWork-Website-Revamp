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
import { useRedirectToLogin } from "@/hooks/useRedirect";
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
  useRedirectToLogin();
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

  const toggleAll = () => {
    const allSelected = filtered.every((_, idx) => rowSelection[idx]);
    const next: Record<number, boolean> = {};
    filtered.forEach((_, idx) => (next[idx] = !allSelected));
    setRowSelection(next);
  };

  const columns: ColumnDef<User>[] = [
    {
      id: "select",
      header: () => (
        <input
          type="checkbox"
          checked={filtered.length > 0 && filtered.every((_, idx) => rowSelection[idx])}
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
    {
      header: () => <span className="cursor-pointer">First Name</span>,
      accessorKey: "firstName",
    },
    {
      header: () => <span className="cursor-pointer">Last Name</span>,
      accessorKey: "lastName",
    },
    {
      header: () => <span className="cursor-pointer">Email</span>,
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
    {
      header: () => <span className="cursor-pointer">Join Date</span>,
      accessorKey: "joinDate",
    },
    {
      header: () => <span className="cursor-pointer">Membership</span>,
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
      header: () => <span className="cursor-pointer">Status</span>,
      accessorKey: "status",
      cell: ({ row }) => {
        const val: User["status"] = row.getValue("status");
        const classes =
          val === "Active" ? "bg-[#AFF4C6] text-[#1B1B1B]" : "bg-[#FCB3AD] text-[#1B1B1B]";
        return <span className={`px-2 py-1 rounded-sm text-sm ${classes}`}>{val}</span>;
      },
    },
  ];

  const selectedEmails = filtered
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
      ["First Name", "Last Name", "Email", "Join Date", "Membership", "Status"],
      ...data.map((u) => [u.firstName, u.lastName, u.emailAdd, u.joinDate, u.membership, u.status]),
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
    <div className="min-h-screen flex flex-col p-6">
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
      <h1
        className="font-golos-text font-normal mb-4"
        style={{ fontSize: "36px", lineHeight: "150%", letterSpacing: "0%" }}
      >
        Mailing List
      </h1>
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
            data={filtered}
            className="w-full tse-table group/row z-10"
            enablePagination={true}
            enableSorting={true}
            enableGlobalFiltering={false}
          />
        )}
      </div>
      <div className={`flex justify-end ${selectionCount === 0 ? "hidden" : ""}`}>
        <button
          onClick={() => {
            setShowConfirm(true);
          }}
          className="rounded-md max-h-12 border-[2px] -mt-16 border-[#B93B3B] text-xl text-[#B93B3B] px-6 py-2 flex items-center gap-2 hover:bg-gray-100"
        >
          {`Delete Contacts (${selectionCount})`}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.70711 0.292894C1.31658 -0.0976312 0.683417 -0.0976312 0.292893 0.292894C-0.0976311 0.683418 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711C14.0976 1.31658 14.0976 0.683419 13.7071 0.292895C13.3166 -0.0976297 12.6834 -0.0976297 12.2929 0.292895L7 5.58579L1.70711 0.292894Z"
              fill="#B93B3B"
            />
          </svg>
        </button>
      </div>
      {/* styles (unchanged + new checkbox rules) */}
      <style jsx>{`
        :global(._headerCell_1autq_27) {
          color: #ffffff !important;
          font-weight: 500 !important;
        }
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

        :global(.tse-table._container_1autq_1) {
          flex: 1 1 auto !important;
          min-height: 0 !important;
          display: flex !important;
          flex-direction: column !important;
        }

        :global(.tse-table [class*="paginationContainer"]) {
          display: flex !important;
          justify-content: center !important;
          margin-top: 24px !important;
          bottom: 0 !important;
          margin-bottom: 24px !important;
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
