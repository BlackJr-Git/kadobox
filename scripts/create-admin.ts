import "dotenv/config"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "../lib/schema"
import { eq } from "drizzle-orm"

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle({ client: sql, schema })

async function createAdmin() {
  console.log("🔐 Création de l'admin via API...")

  const adminEmail = "admin@kdobox.com"
  const adminPassword = "Admin123!"

  try {
    // Appeler l'API Better Auth pour créer l'utilisateur
    const response = await fetch(
      "http://localhost:3000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: adminEmail,
          password: adminPassword,
          name: "Admin KDOBOX",
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      if (data.error?.message?.includes("already exists")) {
        console.log("⚠️  L'utilisateur existe déjà")
        console.log("\n📧 Email: admin@kdobox.com")
        console.log("🔑 Mot de passe: Admin123!")
        console.log(
          "\nSi vous avez oublié le mot de passe, supprimez l'utilisateur de la DB et relancez ce script."
        )

        // Mettre à jour le rôle en admin
        await db
          .update(schema.user)
          .set({ role: "admin", emailVerified: true })
          .where(eq(schema.user.email, adminEmail))

        console.log("✅ Rôle mis à jour en admin")
        return
      }
      throw new Error(
        `Erreur API: ${data.error?.message || response.statusText}`
      )
    }

    // Mettre à jour le rôle en admin et vérifier l'email
    await db
      .update(schema.user)
      .set({ role: "admin", emailVerified: true })
      .where(eq(schema.user.email, adminEmail))

    console.log("✅ Compte admin créé avec succès!")
    console.log("\n📧 Email: admin@kdobox.com")
    console.log("🔑 Mot de passe: Admin123!")
    console.log(
      "\n⚠️  IMPORTANT: Changez ce mot de passe après votre première connexion!"
    )
  } catch (error) {
    console.error("❌ Erreur:", error)
    console.log(
      "\n💡 Assurez-vous que le serveur Next.js est démarré (npm run dev)"
    )
    process.exit(1)
  }
}

createAdmin()
