// components/navigation.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { Home, Settings, Users, BarChart, Layers } from "lucide-react";

const navItems = [
  {
    label: "Home",
    href: routes.app,
    icon: Home,
  },
  {
    label: "Spaces",
    href: routes.app, // ou routes.spaces si tu le définis
    icon: Layers,
  },
  {
    label: "Settings",
    href: routes.settings,
    icon: Settings,
  },
  {
    label: "Admin",
    href: routes.admin,
    icon: Users,
    adminOnly: true,
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
              isActive
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <Icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
