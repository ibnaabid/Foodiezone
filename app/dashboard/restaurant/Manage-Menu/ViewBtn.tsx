// app/dashboard/restaurant/Manage-Menu/EditBtn.tsx
"use client";

import { useState, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Pencil, X } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  available: boolean;
}

interface EditBtnProps {
  product: Product;
}

interface FormState {
  name: string;
  description: string;
  price: string | number;
  category: string;
  available: boolean;
}

const categories = [
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

const EditBtn: React.FC<EditBtnProps> = ({ product }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [form, setForm] = useState<FormState>({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price ?? "",
    category: product?.category || "",
    available: product?.available ?? true,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleUpdate = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`https://foodie-zone-backend.vercel.app/menu/${product._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: Number(form.price),
          category: form.category,
          available: form.available,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Dish updated successfully!");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(data.message || "Failed to update");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors"
      >
        <Pencil size={14} />
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => !isSaving && setIsOpen(false)}
          />

          {/* Dialog */}
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              disabled={isSaving}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors disabled:opacity-50"
            >
              <X size={18} />
            </button>

            <div className="p-6 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">Edit Dish</h2>
              <p className="text-xs text-neutral-500 mt-1">
                Update your dish details
              </p>
            </div>

            <form
              className="p-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  Dish name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Chicken Biryani"
                  required
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none rounded-lg px-4 py-2.5 text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  Description
                </label>
                <input
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Short description"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none rounded-lg px-4 py-2.5 text-sm transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                    Price (৳)
                  </label>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="450"
                    required
                    className="w-full bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none rounded-lg px-4 py-2.5 text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                    Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleCategoryChange}
                    required
                    className="w-full bg-white/5 border border-white/10 text-white focus:border-emerald-500 focus:outline-none rounded-lg px-4 py-2.5 text-sm transition-colors appearance-none"
                  >
                    <option value="" disabled className="bg-neutral-900">
                      Select
                    </option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-neutral-900">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/10">
                <span className="text-xs font-medium text-neutral-300">
                  Available for order
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, available: !prev.available }))
                  }
                  className={`relative w-10 h-5.5 rounded-full transition-colors shrink-0 ${
                    form.available ? "bg-emerald-600" : "bg-neutral-700"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                      form.available ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={isSaving}
                  className="px-4 py-2.5 rounded-lg text-sm text-neutral-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors disabled:opacity-60"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditBtn;