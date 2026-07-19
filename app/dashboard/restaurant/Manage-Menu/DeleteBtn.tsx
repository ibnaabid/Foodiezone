// app/dashboard/restaurant/Manage-Menu/DeleteBtn.tsx
"use client";

import { useState } from "react";
import { Trash2, X, AlertTriangle } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
}

interface DeleteProductDialogProps {
  product: Product;
}

export default function DeleteProductDialog({ product }: DeleteProductDialogProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`https://foodie-zone-backend.vercel.app/menu/${product._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Dish deleted successfully!");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to delete dish");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors"
      >
        <Trash2 size={14} />
        Delete
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => !isDeleting && setIsOpen(false)}
          />

          <div className="relative w-full max-w-sm backdrop-blur-xl bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl p-6">
            <button
              onClick={() => setIsOpen(false)}
              disabled={isDeleting}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors disabled:opacity-50"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col items-center text-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <AlertTriangle size={22} className="text-red-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Delete this dish?</h2>
              <p className="text-sm text-neutral-400">
                Are you sure you want to delete{" "}
                <strong className="text-white">{product.name}</strong>?
                <br />
                This action cannot be undone.
              </p>
            </div>

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium bg-red-600 hover:bg-red-500 text-white transition-colors disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}