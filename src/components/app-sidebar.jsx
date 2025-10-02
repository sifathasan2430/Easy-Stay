"use client"

import * as React from "react"
import {
  IconCalendarTime,
  IconCalendarEvent,
  IconBan,
  IconHeart,
  IconInnerShadowTop,
  IconUser,
  IconDashboard,
} from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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
import { useSession } from "next-auth/react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/guest",
      icon: IconDashboard,
    },
    {
      title: "Profile",
      url: "/dashboard/guest/profile",
      icon: IconUser,
    },
    {
      title: "Past Stays",
      url: "/dashboard/guest/past",
      icon: IconCalendarTime,
    },
    {
      title: "Upcoming Stays",
      url: "/dashboard/guest/upcoming",
      icon: IconCalendarEvent,
    },
    {
      title: "Cancel Bookings",
      url: "/dashboard/guest/cancel",
      icon: IconBan,
    },
    {
      title: "Saved Favorites",
      url: "/dashboard/guest/favorites",
      icon: IconHeart,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconInnerShadowTop,
    },
  ],
}

export function AppSidebar({ ...props }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/dashboard/guest">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">EasyStay</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} currentPath={pathname} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={session?.user||data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}