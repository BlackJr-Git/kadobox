import Link from "next/link"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { user as userTable } from "@/lib/schema"
import { eq } from "drizzle-orm"

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/login")

  const [dbUser] = await db
    .select({ role: userTable.role })
    .from(userTable)
    .where(eq(userTable.id, session.user.id))

  if (dbUser?.role === "admin") redirect("/dashboard")

  return (
    <div className="flex min-h-svh">
      <aside className="hidden w-56 shrink-0 border-r bg-muted/30 md:block">
        <div className="p-4">
          <Link href="/" className="text-lg font-bold tracking-tight">
            <span className="text-primary">KDOB</span>OX
          </Link>
        </div>
        <nav className="flex flex-col gap-1 px-2">
          <Link
            href="/client"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Mon compte
          </Link>
          <Link
            href="/client/commandes"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Mes commandes
          </Link>
          <Link
            href="/client/profil"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Mon profil
          </Link>
          <Link
            href="/client/cartes-cadeaux"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Cartes cadeaux
          </Link>
          <Link
            href="/wishlist"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Liste de souhaits
          </Link>
        </nav>
        <div className="mt-auto border-t p-4">
          <p className="truncate text-sm font-medium">{session.user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{session.user.email}</p>
        </div>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
