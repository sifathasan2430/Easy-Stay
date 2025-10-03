// "use client";

// import * as React from "react";
// import {
//   IconFolder,
//   IconHelp,
//   IconCalendarEvent,
//   IconSettings,
//   IconUsers,
//   IconHistory,
//   IconHeart,
//   IconCreditCard,
//   IconInnerShadowTop,
//   IconDashboard,
// } from "@tabler/icons-react";

// import { NavUser } from "@/components/nav-user";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import { useSession } from "next-auth/react";

// const navItems = [
//   { title: "Dashboard", key: "dashboard", icon: IconDashboard },
//   { title: "Profile", key: "profile", icon: IconUsers },
//   { title: "Past Stays", key: "past", icon: IconHistory },
//   { title: "Upcoming Stays", key: "upcoming", icon: IconCalendarEvent },
//   { title: "Payments", key: "payments", icon: IconCreditCard },
//   { title: "Favorites", key: "favorites", icon: IconHeart },
//   { title: "Cancel Booking", key: "cancel", icon: IconFolder },
// ];

// export function AppSidebar({ activePage, setActivePage }) {
//   const { data: session } = useSession();
//   const user = session?.user || {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   };

//   return (
//     <Sidebar collapsible="offcanvas">
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
//               <button className="flex items-center gap-2">
//                 <IconInnerShadowTop className="!size-5" />
//                 <span className="text-base font-semibold">EasyStay</span>
//               </button>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>

//       <SidebarContent>
//         <SidebarMenu>
//           {navItems.map((item) => (
//             <SidebarMenuItem key={item.key}>
//               <SidebarMenuButton
//                 onClick={() => setActivePage(item.key)}
//                 className={activePage === item.key ? "bg-gray-200" : ""}
//               >
//                 <div className="flex items-center gap-2">
//                   <item.icon className="!size-4" />
//                   <span>{item.title}</span>
//                 </div>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           ))}
//         </SidebarMenu>
//       </SidebarContent>

//       <SidebarFooter>
//         <NavUser user={user} />
//       </SidebarFooter>
//     </Sidebar>
//   );
// }



"use client";

import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  IconDashboard,
  IconUsers,
  IconHistory,
  IconCalendarEvent,
  IconCreditCard,
  IconHeart,
  IconFolder,
  IconInnerShadowTop
} from "@tabler/icons-react";

const navItems = [
  { title: "Dashboard", href: "/dashboard/guest", icon: IconDashboard },
  { title: "Profile", href: "/dashboard/guest/profile", icon: IconUsers },
  { title: "Past Stays", href: "/dashboard/guest/past", icon: IconHistory },
  { title: "Upcoming Stays", href: "/dashboard/guest/upcoming", icon: IconCalendarEvent },
  { title: "Payments", href: "/dashboard/guest/payments", icon: IconCreditCard },
  { title: "Favorites", href: "/dashboard/guest/favorites", icon: IconHeart },
  { title: "Cancel Booking", href: "/dashboard/guest/cancel", icon: IconFolder },
];

export function AppSidebar() {
  const { data: session } = useSession();
  const user = session?.user || { name: "Guest", email: "guest@example.com", avatar: "/avatars/shadcn.jpg" };

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/" className="flex items-center gap-2">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">EasyStay</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.href} className="flex items-center gap-2">
                  <item.icon className="!size-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
