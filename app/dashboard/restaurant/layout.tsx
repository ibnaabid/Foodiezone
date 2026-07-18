// app/dashboard/layout.tsx
import { auth } from "../../lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardSidebar from "../DashbaoradSidebar/page";
import DashboardTopbar from "../DashboardTop/page";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const role = (session.user as { role?: string }).role;

  // customer ba restaurant chara onno kono role hole login e pathiye dao
  if (role !== "customer" && role !== "restaurant") {
    redirect("/login");
  }

  const userName = session.user.name || "User";

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <DashboardSidebar role={role} />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopbar userName={userName} role={role} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}