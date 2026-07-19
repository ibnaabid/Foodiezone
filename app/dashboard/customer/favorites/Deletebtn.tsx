// app/favorites/DeleteFavoriteBtn.tsx
"use client";

import { useState } from "react";
import { Trash2, Check, X, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface FavoriteRef {
  _id: string;
  name: string;
}

interface DeleteFavoriteBtnProps {
  item: FavoriteRef;
  full?: boolean;
}

export default function DeleteFavoriteBtn({ item, full }: DeleteFavoriteBtnProps) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`https://foodie-zone-backend.vercel.app/favorite/${item._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok && (data.deletedCount > 0 || data.success)) {
        toast.success("Removed from favorites!");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to remove favorite");
        setIsDeleting(false);
        setConfirming(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
      setIsDeleting(false);
      setConfirming(false);
    }
  };

  // ✅ Inline confirmation state — row/card er bhitorei dekhabe, kono popup na
  if (confirming) {
    return (
      <div
        className={`flex items-center gap-2 ${full ? "w-full" : ""}`}
      >
        <span className="text-xs text-neutral-400 truncate hidden sm:inline">
          Remove?
        </span>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors ${
            full ? "flex-1" : ""
          }`}
        >
          {isDeleting ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Check size={14} />
          )}
          {isDeleting ? "Removing..." : "Yes"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={isDeleting}
          className={`flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-50 text-neutral-300 text-xs font-medium px-3 py-2 rounded-lg transition-colors ${
            full ? "flex-1" : ""
          }`}
        >
          <X size={14} />
          Cancel
        </button>
      </div>
    );
  }

  // Default state — শুধু "Remove" বাটন
  return (
    <button
      onClick={() => setConfirming(true)}
      className={`flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors ${
        full ? "w-full" : ""
      }`}
    >
      <Trash2 size={14} />
      Remove
    </button>
  );
}