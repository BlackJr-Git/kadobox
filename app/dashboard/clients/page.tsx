import { db } from "@/lib/db"
import { user } from "@/lib/schema"
import { desc } from "drizzle-orm"
import { Badge } from "@/components/ui/badge"

export default async function DashboardClientsPage() {
  const users = await db.query.user.findMany({
    orderBy: [desc(user.createdAt)],
  })

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Clients ({users.length})</h1>

      {users.length === 0 ? (
        <div className="rounded-lg border p-8 text-center text-muted-foreground">
          Aucun client inscrit pour le moment.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Nom</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Rôle</th>
                <th className="px-4 py-3 text-left font-medium">Vérifié</th>
                <th className="px-4 py-3 text-left font-medium">Inscrit le</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={u.role === "admin" ? "default" : "secondary"}
                    >
                      {u.role === "admin" ? "Admin" : "Client"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">{u.emailVerified ? "✅" : "❌"}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(u.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
