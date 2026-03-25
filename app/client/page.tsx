import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { getOrdersByUser } from "@/lib/queries/orders"
import Link from "next/link"

export default async function ClientPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/login")

  const orders = await getOrdersByUser(session.user.id)
  const recentOrders = orders.slice(0, 3)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Bonjour, {session.user.name} 👋
        </h1>
        <p className="mt-1 text-muted-foreground">
          Bienvenue dans votre espace client Cadeau Chrono.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Commandes</p>
          <p className="mt-1 text-3xl font-bold">{orders.length}</p>
        </div>
        <Link
          href="/client/profil"
          className="rounded-lg border p-5 transition-colors hover:bg-muted/50"
        >
          <p className="text-sm text-muted-foreground">Mon profil</p>
          <p className="mt-1 text-sm font-medium">{session.user.email}</p>
        </Link>
        <Link
          href="/wishlist"
          className="rounded-lg border p-5 transition-colors hover:bg-muted/50"
        >
          <p className="text-sm text-muted-foreground">Liste de souhaits</p>
          <p className="mt-1 text-sm font-medium">Voir mes favoris →</p>
        </Link>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Commandes récentes</h2>
          {orders.length > 0 && (
            <Link
              href="/client/commandes"
              className="text-sm text-primary hover:underline"
            >
              Voir tout
            </Link>
          )}
        </div>
        {recentOrders.length === 0 ? (
          <div className="mt-4 rounded-lg border p-8 text-center">
            <span className="text-4xl">📦</span>
            <p className="mt-3 text-sm text-muted-foreground">
              Aucune commande pour le moment.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {recentOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <span className="font-medium">{o.orderNumber}</span>
                  <span className="ml-3 text-sm text-muted-foreground">
                    {new Date(o.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <span className="font-bold">
                  {Number(o.total).toLocaleString("fr-CD")} CDF
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
