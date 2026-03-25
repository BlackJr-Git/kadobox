"use client"

import * as React from "react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  DashboardSquare01Icon,
  Menu01Icon,
  ChartHistogramIcon,
  UserGroupIcon,
  Camera01Icon,
  File01Icon,
  Settings05Icon,
  HelpCircleIcon,
  SearchIcon,
  Database01Icon,
  Analytics01Icon,
  CommandIcon,
} from "@hugeicons/core-free-icons"

const data = {
  user: {
    name: "Admin KDOBOX",
    email: "admin@kdobox.com",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />,
    },
    {
      title: "Commandes",
      url: "/dashboard/commandes",
      icon: <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} />,
    },
    {
      title: "Produits",
      url: "/dashboard/produits",
      icon: <HugeiconsIcon icon={Database01Icon} strokeWidth={2} />,
    },
    {
      title: "Clients",
      url: "/dashboard/clients",
      icon: <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} />,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: <HugeiconsIcon icon={ChartHistogramIcon} strokeWidth={2} />,
    },
  ],
  navClouds: [
    {
      title: "Boutique",
      icon: <HugeiconsIcon icon={Camera01Icon} strokeWidth={2} />,
      isActive: true,
      url: "/",
      items: [
        {
          title: "Produits",
          url: "/produits",
        },
        {
          title: "Coffrets",
          url: "/coffrets",
        },
      ],
    },
    {
      title: "Gestion",
      icon: <HugeiconsIcon icon={File01Icon} strokeWidth={2} />,
      url: "#",
      items: [
        {
          title: "Commandes",
          url: "/dashboard/commandes",
        },
        {
          title: "Clients",
          url: "/dashboard/clients",
        },
      ],
    },
    {
      title: "Paramètres",
      icon: <HugeiconsIcon icon={Settings05Icon} strokeWidth={2} />,
      url: "#",
      items: [
        {
          title: "Profil",
          url: "/client/profil",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: <HugeiconsIcon icon={Settings05Icon} strokeWidth={2} />,
    },
    {
      title: "Get Help",
      url: "/help",
      icon: <HugeiconsIcon icon={HelpCircleIcon} strokeWidth={2} />,
    },
    {
      title: "Search",
      url: "/search",
      icon: <HugeiconsIcon icon={SearchIcon} strokeWidth={2} />,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "/dashboard/data",
      icon: <HugeiconsIcon icon={Database01Icon} strokeWidth={2} />,
    },
    {
      name: "Reports",
      url: "/dashboard/reports",
      icon: <HugeiconsIcon icon={Analytics01Icon} strokeWidth={2} />,
    },
    {
      name: "Word Assistant",
      url: "/dashboard/assistant",
      icon: <HugeiconsIcon icon={File01Icon} strokeWidth={2} />,
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<Link href="/dashboard" />}
            >
              <HugeiconsIcon
                icon={CommandIcon}
                strokeWidth={2}
                className="size-5!"
              />
              <span className="text-base font-semibold">Acme Inc.</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
