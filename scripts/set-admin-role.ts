import "dotenv/config"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "../lib/schema"
import { eq } from "drizzle-orm"

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle({ client: sql, schema })

async function setAdminRole() {
  const email = process.argv[2]

  if (!email) {
    console.log("❌ Usage: npx tsx scripts/set-admin-role.ts <email>")
    console.log("Exemple: npx tsx scripts/set-admin-role.ts admin@kdobox.com")
    process.exit(1)
  }

  console.log(`🔧 Mise à jour du rôle pour ${email}...`)

  const result = await db
    .update(schema.user)
    .set({ role: "admin", emailVerified: true })
    .where(eq(schema.user.email, email))
    .returning()

  if (result.length === 0) {
    console.log(`❌ Utilisateur ${email} non trouvé`)
    console.log("\n💡 Créez d'abord le compte via /signup, puis relancez ce script")
    process.exit(1)
  }

  console.log(`✅ ${email} est maintenant admin!`)
  console.log("✅ Email vérifié")
}

setAdminRole().catch((err) => {
  console.error("❌ Erreur:", err)
  process.exit(1)
})
