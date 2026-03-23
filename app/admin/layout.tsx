import Link from "next/link"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/login")
  return (
    <div className="flex min-h-svh">
      <aside className="hidden w-56 shrink-0 border-r bg-muted/30 md:block">
        <div className="p-4">
          <Link href="/admin" className="text-lg font-bold tracking-tight">
            <span className="text-primary">KDOB</span>OX Admin
          </Link>
        </div>
        <nav className="flex flex-col gap-1 px-2">
          <Link
            href="/admin"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/produits"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Produits
          </Link>
          <Link
            href="/admin/commandes"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Commandes
          </Link>
          <Link
            href="/admin/clients"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Clients
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
