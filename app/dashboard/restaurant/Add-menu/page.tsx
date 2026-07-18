// app/dashboard/restaurant/menu/add/page.tsx
"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  UtensilsCrossed,
  DollarSign,
  Tag,
  ImagePlus,
  Loader2,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type CategoryOption =
  | "Biryani & Rice"
  | "Fast Food"
  | "Chinese"
  | "Street Food"
  | "Pizza"
  | "Desserts"
  | "Beverages"
  | "Healthy"
  | "BBQ & Grill"
  | "Bakery";

const categories: CategoryOption[] = [
  "Biryani & Rice",
  "Fast Food",
  "Chinese",
  "Street Food",
  "Pizza",
  "Desserts",
  "Beverages",
  "Healthy",
  "BBQ & Grill",
  "Bakery",
];

interface MenuFormData {
  name: string;
  description: string;
  price: string;
  category: CategoryOption | "";
  image: string;
  available: boolean;
}

export default function AddMenuItemPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<MenuFormData>({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    available: true,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    setFormData((prev) => ({ ...prev, image: objectUrl }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name || !formData.price || !formData.category) {
      setErrorMsg("Please fill in name, price, and category");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);

      // page redirect na kore, ei page e thakbe — form reset + data refresh
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          image: "",
          available: true,
        });
        setImagePreview(null);
        router.refresh(); // shudhu cached data revalidate hobe, page change hobe na
      }, 2000);
    } catch (err) {
      setErrorMsg("Network error — please try again");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-900/10 rounded-full blur-3xl" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <Link
            href="/dashboard/restaurant/menu"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={15} />
            Back to menu
          </Link>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white">Add a new dish</h1>
          <p className="text-neutral-400 text-sm mt-1">
            Fill in the details below to add this item to your menu
          </p>
        </div>

        {success ? (
          <div className="backdrop-blur-xl bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 flex flex-col items-center text-center">
            <CheckCircle2 size={40} className="text-emerald-400 mb-3" />
            <p className="text-white font-medium">Menu item added successfully</p>
            <p className="text-neutral-400 text-sm mt-1">You can add another item now</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5"
          >
            {errorMsg && (
              <div className="text-sm bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-2.5">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Dish photo
              </label>
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center gap-3 h-40 rounded-xl border-2 border-dashed border-white/15 hover:border-emerald-500/40 bg-white/[0.02] cursor-pointer transition-colors overflow-hidden relative"
              >
                {imagePreview ? (
                  <Image
                    height={300}
                    width={300}
                    src={imagePreview}
                    alt="Preview"
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-neutral-500">
                    <ImagePlus size={28} />
                    <span className="text-sm">Click to upload a photo</span>
                  </div>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Dish name
              </label>
              <div className="relative">
                <UtensilsCrossed size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  placeholder="e.g. Chicken Biryani"
                  required
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none rounded-lg pl-10 pr-4 py-3 text-sm transition-colors"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Description
              </label>
              <textarea
                placeholder="Short description of the dish, ingredients, spice level, etc."
                rows={3}
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none rounded-lg px-4 py-3 text-sm transition-colors resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Price (৳)
                </label>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="number"
                    placeholder="450"
                    min="0"
                    step="0.01"
                    required
                    className="w-full bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none rounded-lg pl-10 pr-4 py-3 text-sm transition-colors"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Category
                </label>
                <div className="relative">
                  <Tag size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                  <select
                    required
                    className="w-full appearance-none bg-white/5 border border-white/10 text-white focus:border-emerald-500 focus:outline-none rounded-lg pl-10 pr-4 py-3 text-sm transition-colors"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as CategoryOption })
                    }
                  >
                    <option value="" disabled className="bg-neutral-900">
                      Select category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-neutral-900">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.03] border border-white/10">
              <div>
                <p className="text-sm font-medium text-white">Available for order</p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Turn off if this item is temporarily out of stock
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, available: !formData.available })}
                className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
                  formData.available ? "bg-emerald-600" : "bg-neutral-700"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    formData.available ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 rounded-3xl disabled:opacity-60 text-white font-medium py-3.5 transition-colors"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? "Adding item..." : "Add to menu"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}