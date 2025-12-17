// scripts/check-routes.ts
import fs from "fs";
import path from "path";

// Import des routes (ajuste le chemin selon ta structure)
// Si tu as src/config/routes.ts, utilise "../src/config/routes"
// Si tu as lib/routes.ts, utilise "../lib/routes"
// Si tu as config/routes.ts, utilise "../config/routes"

const routes = {
  // Copie ici les routes statiques de ton fichier routes.ts
  home: "/",
  pricing: "/pricing",
  terms: "/terms",
  privacy: "/privacy",
  about: "/about",
  app: "/app",
  settings: "/settings",
  settingsProfile: "/settings/profile",
  settingsAccount: "/settings/account",
  settingsBilling: "/settings/billing",
  settingsNotifications: "/settings/notifications",
  settingsAppearance: "/settings/appearance",
  settingsSecurity: "/settings/security",
  admin: "/admin",
  adminUsers: "/admin/users",
  adminSpaces: "/admin/spaces",
  adminAnalytics: "/admin/analytics",
  adminSettings: "/admin/settings",
  newThread: "/app/new/thread",
  newSpace: "/app/new/space",
};

const appDir = path.join(process.cwd(), "app");

function checkRouteExists(route: string): boolean {
  const cleanRoute = route.split("?")[0].split("#")[0];
  
  const routePath = cleanRoute === "/" 
    ? path.join(appDir, "page.tsx")
    : path.join(appDir, cleanRoute.slice(1), "page.tsx");

  return fs.existsSync(routePath);
}

function validateRoutes() {
  console.log("🔍 Checking all routes...\n");

  const results: { route: string; exists: boolean }[] = [];

  Object.entries(routes).forEach(([key, value]) => {
    if (typeof value === "string") {
      const exists = checkRouteExists(value);
      results.push({ route: `${key}: ${value}`, exists });
    }
  });

  const missing = results.filter(r => !r.exists);
  const existing = results.filter(r => r.exists);

  console.log(`✅ Existing routes (${existing.length}):`);
  existing.forEach(r => console.log(`   ${r.route}`));

  if (missing.length > 0) {
    console.log(`\n❌ Missing routes (${missing.length}):`);
    missing.forEach(r => console.log(`   ${r.route}`));
    console.log("\n💡 Create these pages to fix broken links!");
    process.exit(1);
  } else {
    console.log("\n✨ All routes are valid!");
  }
}

validateRoutes();
