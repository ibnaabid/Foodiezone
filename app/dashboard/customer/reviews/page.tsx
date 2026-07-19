// app/reviews/ReviewForm.tsx
"use client";

import { useState, FormEvent } from "react";
import { Star, Send, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

export default function ReviewForm() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a short review");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: session?.user?.name || "Anonymous",
          rating,
          comment: comment.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Thanks for your review!");
        setRating(0);
        setComment("");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to submit review");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8"
    >
      <h2 className="text-lg font-semibold text-white mb-1">Share your experience</h2>
      <p className="text-sm text-neutral-500 mb-6">
        Your feedback helps others find great food
      </p>

      {/* Star rating */}
      <div className="mb-5">
        <label className="block text-xs font-medium text-neutral-400 mb-2">
          Your rating
        </label>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                size={28}
                className={
                  star <= (hoverRating || rating)
                    ? "text-amber-400 fill-amber-400"
                    : "text-neutral-700"
                }
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-2 text-sm text-neutral-400">{rating}.0 / 5.0</span>
          )}
        </div>
      </div>

      {/* Comment */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-neutral-400 mb-2">
          Your review
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Tell us about the food, delivery time, or your overall experience..."
          className="w-full bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none rounded-lg px-4 py-3 text-sm transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-medium rounded-lg px-6 py-3 text-sm transition-colors w-full sm:w-auto"
      >
        {isSubmitting ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Send size={16} />
        )}
        {isSubmitting ? "Submitting..." : "Post review"}
      </button>
    </form>
  );
}