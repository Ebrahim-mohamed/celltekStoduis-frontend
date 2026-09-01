"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Contact = {
  _id: string;

  name: string;

  email: string;

  country: string;

  phone: string;

  industry?: string;

  budget?: string;

  message?: string;

  seen: boolean;

  createdAt: string;
};

export default function ContactsTab() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH CONTACTS ================= */

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(
          "http://localhost:4002/api/contacts",
        );

        if (!res.ok) {
          throw new Error("Failed to fetch contacts");
        }

        const data: Contact[] = await res.json();

        setContacts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  /* ================= MARK AS SEEN ================= */

  const markAsSeen = async (id: string) => {
    try {
      const res = await fetch(
        `http://localhost:4002/api/contacts/${id}/seen`,
        {
          method: "PATCH",
        },
      );

      if (!res.ok) {
        throw new Error("Failed to mark as seen");
      }

      const updatedContact: Contact = await res.json();

      setContacts((prev) =>
        prev.map((contact) =>
          contact._id === id
            ? updatedContact
            : contact,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= DELETE ================= */

  const deleteContact = async (id: string) => {
    try {
      const res = await fetch(
        `http://localhost:4002/api/contacts/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        throw new Error("Failed to delete contact");
      }

      setContacts((prev) =>
        prev.filter(
          (contact) => contact._id !== id,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <p className="text-gray-500">
        Loading contacts...
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Contacts
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {
            contacts.filter(
              (contact) => !contact.seen,
            ).length
          }{" "}
          unread · {contacts.length} total
        </p>
      </div>

      {/* ================= EMPTY ================= */}

      {contacts.length === 0 && (
        <p className="text-gray-500">
          No contact messages found
        </p>
      )}

      {/* ================= LIST ================= */}

      <div className="space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact._id}
            className={`border rounded-lg shadow-sm p-5 transition-colors ${
              contact.seen
                ? "bg-white dark:bg-gray-800 border-red-400 dark:border-red-500 opacity-75"
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            }`}
          >
            {/* ================= TOP ================= */}

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {contact.name}
                  </h3>

                  {contact.seen && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-500 text-white uppercase tracking-wide">
                      Seen
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                  {contact.email}
                </p>

                
              </div>

              <span className="text-xs text-gray-400 dark:text-gray-300 whitespace-nowrap shrink-0">
                {new Date(
                  contact.createdAt,
                ).toLocaleDateString()}
              </span>
            </div>

            {/* ================= CONTACT INFORMATION ================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              {/* PHONE */}

              <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Phone
                </p>

                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                  {contact.phone}
                </p>
              </div>

              {/* COUNTRY */}

              <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Country
                </p>

                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                  {contact.country}
                </p>
              </div>

              {/* INDUSTRY */}

              <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Industry
                </p>

                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                  {contact.industry?.trim() ||
                    "Not provided"}
                </p>
              </div>

              {/* BUDGET */}

              <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Budget Range
                </p>

                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                  {contact.budget?.trim() ||
                    "Not provided"}
                </p>
              </div>
            </div>

            {/* ================= PROJECT MESSAGE ================= */}

            <div className="mt-5">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Tell us about your project
              </p>

              <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                  {contact.message?.trim() ||
                    "No project details provided"}
                </p>
              </div>
            </div>

            {/* ================= ACTIONS ================= */}

            <div className="flex justify-end gap-2 mt-5">
              {!contact.seen && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    markAsSeen(contact._id)
                  }
                  className="border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950 dark:text-green-400"
                >
                  Mark as Seen
                </Button>
              )}

              <Button
                variant="destructive"
                size="sm"
                onClick={() =>
                  deleteContact(contact._id)
                }
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}