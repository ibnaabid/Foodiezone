// app/reviews/page.tsx
import { Star, MessageSquareQuote, AlertTriangle, Sparkles } from "lucide-react";
import ReviewForm from "../dashboard/customer/reviews/page";


type Review = {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt?: string;
};

const Page = async () => {
  let reviews: Review[] = [];
  let fetchError = false;

  try {
    const res = await fetch("https://foodie-zone-backend.vercel.app/reviews", {
      cache: "no-store",
    });

    if (!res.ok) {
      fetchError = true;
    } else {
      reviews = await res.json();
    }
  } catch (error) {
    fetchError = true;
  }

  const total = reviews.length;
  const avgRating =
    total > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1)
      : "0.0";

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    percent: total > 0 ? (reviews.filter((r) => r.rating === star).length / total) * 100 : 0,
  }));

  const initials = (name: string) => name?.charAt(0)?.toUpperCase() || "U";

  const timeAgo = (dateStr?: string) => {
    if (!dateStr) return "";
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 30) return `${days} days ago`;
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/5 border border-amber-500/20 rounded-full mb-4 text-xs font-medium text-amber-400">
            <Sparkles size={13} /> Customer Reviews
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-3">
            What people are saying
          </h1>
          <p className="text-sm text-neutral-400">
            Real feedback from real customers who ordered through CravingByte
          </p>
        </div>

        {/* Rating summary */}
        {!fetchError && total > 0 && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 mb-8 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-8 items-center">
            <div className="flex flex-col items-center text-center sm:border-r sm:border-white/10 sm:pr-8">
              <span className="text-5xl font-bold text-white">{avgRating}</span>
              <div className="flex gap-0.5 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={
                      star <= Math.round(Number(avgRating))
                        ? "text-amber-400 fill-amber-400"
                        : "text-neutral-700"
                    }
                  />
                ))}
              </div>
              <span className="text-xs text-neutral-500 mt-1.5">
                Based on {total} review{total !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="space-y-2 w-full">
              {ratingBreakdown.map(({ star, count, percent }) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-xs text-neutral-400 w-8 shrink-0">{star} ★</span>
                  <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="text-xs text-neutral-500 w-6 text-right shrink-0">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Post review form */}
        <div className="mb-10">
          <ReviewForm />
        </div>

        {/* Error state */}
        {fetchError && (
          <div className="backdrop-blur-xl bg-white/5 border border-red-500/20 rounded-2xl p-10 text-center">
            <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7 text-red-400" />
            </div>
            <h3 className="text-white font-semibold">Couldn&apos;t load reviews</h3>
            <p className="text-neutral-500 text-sm mt-1">
              Make sure the backend server is running, then refresh.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!fetchError && total === 0 && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl py-16 text-center">
            <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquareQuote className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-white font-semibold">No reviews yet</h3>
            <p className="text-neutral-500 text-sm mt-1">Be the first to share your experience.</p>
          </div>
        )}

        {/* Reviews list */}
        {!fetchError && total > 0 && (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-amber-500 flex items-center justify-center text-sm font-semibold text-neutral-950 shrink-0">
                      {initials(review.name)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{review.name}</p>
                      <span className="text-xs text-neutral-500">{timeAgo(review.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex gap-0.5 shrink-0">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        className={
                          star <= review.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-neutral-700"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;