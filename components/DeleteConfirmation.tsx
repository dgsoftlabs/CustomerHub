"use client";

import { useState } from "react";
import Dialog from "./Dialog";
import { deleteCustomer } from "@/app/actions";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  customerId: number;
  customerName: string;
}

export default function DeleteConfirmation({ 
  isOpen, 
  onClose, 
  customerId, 
  customerName 
}: DeleteConfirmationProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    
    try {
      await deleteCustomer(customerId);
      onClose();
      window.location.reload(); // Refresh to show updated data
    } catch (error) {
      console.error("Failed to delete customer:", error);
      alert("Failed to delete customer. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Delete Customer">
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-300">
          Are you sure you want to delete <strong>{customerName}</strong>?
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          This action cannot be undone.
        </p>

        <div className="flex gap-2 justify-end mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Dialog>
  );
}
