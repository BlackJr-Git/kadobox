import "dotenv/config"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "../lib/schema"
import { eq } from "drizzle-orm"

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle({ client: sql, schema })

async function resetAdmin() {
  console.log("🔄 Réinitialisation de l'admin...")

  const adminEmail = "admin@kdobox.com"
  const adminPassword = "Admin123!"

  // Supprimer l'ancien admin
  await db.delete(schema.user).where(eq(schema.user.email, adminEmail))
  console.log("✅ Ancien admin supprimé")

  // Attendre un peu
  await new Promise(resolve => setTimeout(resolve, 1000))

  try {
    // Créer le nouvel admin via l'API
    const response = await fetch("http://localhost:3000/api/auth/sign-up/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: adminEmail,
        password: adminPassword,
        name: "Admin KDOBOX",
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Erreur API: ${JSON.stringify(data)}`)
    }

    console.log("✅ Nouvel admin créé via API")

    // Mettre à jour le rôle en admin
    await db
      .update(schema.user)
      .set({ role: "admin", emailVerified: true })
      .where(eq(schema.user.email, adminEmail))

    console.log("✅ Rôle mis à jour en admin")
    console.log("\n📧 Email: admin@kdobox.com")
    console.log("🔑 Mot de passe: Admin123!")
    console.log("\n✨ Vous pouvez maintenant vous connecter!")
  } catch (error) {
    console.error("❌ Erreur:", error)
    console.log("\n💡 Assurez-vous que le serveur Next.js est démarré (npm run dev)")
    process.exit(1)
  }
}

resetAdmin()
