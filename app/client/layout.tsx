import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { user as userTable } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { ClientNav } from "@/components/client/client-nav"

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
    <div className="flex min-h-svh flex-col md:flex-row">
      <ClientNav user={session.user} />
      <main className="flex-1 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="mx-auto max-w-7xl p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}
