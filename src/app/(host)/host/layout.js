"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconMenu2,
} from "@tabler/icons-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import SessionProviderWrapper from "@/app/Components/SessionProvider/SessionProviderWrapper";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Analytics", href: "/host", icon: IconBrandTabler },
    { label: "Property Management", href: "/host/property/management", icon: IconUserBolt },
    { label: "Bookings", href: "/host/bookings", icon: IconSettings },
    { label: "Logout", href: "/logout", icon: IconArrowLeft },
  ];

  const SidebarLinks = () => (
    <nav className="flex flex-col gap-2 px-4 py-4">
      {links.map(({ label, href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
            pathname === href
              ? "bg-gray-200 font-medium "
              : "text-neutral-700 hover:bg-gray-200 dark:text-neutral-300 dark:hover:bg-neutral-700"
          )}
          onClick={() => setOpen(false)}
        >
          <Icon className="h-5 w-5 shrink-0" />
          {label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-neutral-200 bg-gray-100  md:block">
        <div className="p-6 font-bold text-lg">EasyStay</div>
        <SidebarLinks />
      </aside>

      {/* Mobile Top Navbar + Sheet Menu */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b bg-white px-4 py-3 dark:bg-neutral-900 md:hidden">
        <div className="font-bold text-lg">EasyStay</div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <IconMenu2 className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader>
              <SheetTitle className="px-4 pt-4 text-lg font-bold">EasyStay</SheetTitle>
            </SheetHeader>
            <SidebarLinks />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
       
      <main className="flex-1 overflow-y-auto p-6 pt-16 md:pt-6">{children}</main>

    </div>
  );
}
