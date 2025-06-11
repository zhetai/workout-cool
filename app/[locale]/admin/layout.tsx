import { ReactElement } from "react";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";

import { AuthenticatedHeader } from "@/features/layout/authenticated-header";
import { AdminSidebar } from "@/features/admin/layout/admin-sidebar/ui/admin-sidebar";
import { serverRequiredUser } from "@/entities/user/model/get-server-session-user";

interface AdminLayoutProps {
  params: Promise<{ locale: string }>;
  children: ReactElement;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const user = await serverRequiredUser();

  if (user.role !== UserRole.admin) {
    redirect("/");
  }

  return (
    <div className="main-content">
      <AuthenticatedHeader />
      <AdminSidebar />

      <div className="mt-[60px] p-4 px-2 transition-all sm:px-4 lg:ml-[260px]" id="main-content">
        {children}
      </div>
    </div>
  );
}
