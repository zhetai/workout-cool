import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";

import { UsersTable } from "@/features/admin/users/list/ui/users-table";
import { getUsersAction } from "@/entities/user/model/get-users.actions";
import { serverRequiredUser } from "@/entities/user/model/get-server-session-user";

export default async function AdminDashboardPage() {
  const user = await serverRequiredUser();

  // Rediriger si l'utilisateur n'est pas admin
  if (user.role !== UserRole.admin) {
    redirect("/");
  }

  // Récupérer les données initiales des utilisateurs
  const initialUsers = await getUsersAction({
    page: 1,
    limit: 10,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tableau de bord administrateur</h1>
      <UsersTable initialUsers={initialUsers} />
    </div>
  );
}
