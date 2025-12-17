"use client";

import { useState } from "react";
import { X, Send, Mail } from "lucide-react";
import { sendBulkMessage } from "@/app/actions";
import type { Customer } from "@/db/schema";

interface BulkMessageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCustomers: Customer[];
}

export default function BulkMessageDialog({
  isOpen,
  onClose,
  selectedCustomers,
}: BulkMessageDialogProps) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "success" | "error">("idle");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !message.trim()) {
      alert("Please fill in both subject and message");
      return;
    }

    setIsSending(true);
    setSendStatus("idle");

    try {
      const formData = new FormData();
      formData.append("subject", subject);
      formData.append("message", message);
      formData.append("customerIds", selectedCustomers.map(c => c.id).join(","));

      await sendBulkMessage(formData);
      
      setSendStatus("success");
      setSubject("");
      setMessage("");
      
      setTimeout(() => {
        onClose();
        setSendStatus("idle");
      }, 2000);
    } catch (error) {
      console.error("Failed to send bulk message:", error);
      setSendStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = () => {
    if (!isSending) {
      setSubject("");
      setMessage("");
      setSendStatus("idle");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Mail className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Send Bulk Message
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Sending to {selectedCustomers.length} customer{selectedCustomers.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isSending}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Recipients */}
        <div className="p-6 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Recipients:
          </h3>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {selectedCustomers.map((customer) => (
              <div
                key={customer.id}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
              >
                {customer.name} ({customer.email})
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter message subject"
              disabled={isSending}
              className="w-full px-4 py-2 border rounded-lg text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Message *
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message or offer details..."
              rows={8}
              disabled={isSending}
              className="w-full px-4 py-2 border rounded-lg text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 resize-none"
              required
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Tip: Personalize your message to increase engagement
            </p>
          </div>

          {/* Status Messages */}
          {sendStatus === "success" && (
            <div className="p-4 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200">
                ✓ Message sent successfully to {selectedCustomers.length} customer{selectedCustomers.length !== 1 ? "s" : ""}!
              </p>
            </div>
          )}

          {sendStatus === "error" && (
            <div className="p-4 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-200">
                ✗ Failed to send message. Please try again.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSending}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending}
              className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
