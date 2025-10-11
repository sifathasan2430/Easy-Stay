"use client";
import LinkBtn from "@/app/Components/customButton/CustomButton";
import SignOutBtn from "@/app/Components/customButton/SignoutBtn";
import { ThemeToggleButton } from "@/app/Components/ThemeToggleButton/ThemeToggleButton";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  console.log(session?.user);
  const userNotExits = (
    <>
      <div className="flex items-center gap-4">
        <NavbarButton href={"/login"}>Login</NavbarButton>
        {/* custom btn */}
        <LinkBtn href="/signup">Signup</LinkBtn>
      </div>
    </>
  );
  const userExits = (
    <>
      <div className="flex justify-center items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>PF</AvatarFallback>
        </Avatar>
        <SignOutBtn onClick={() => signOut()} href="#">
          Logout
        </SignOutBtn>
      </div>
    </>
  );

  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Stays",
      link: "/stays",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody className={""}>
          <NavbarLogo />
          <NavItems className="text-xl" items={navItems} />

          {session ? userExits : userNotExits}
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              {/* custom btn and links */}
              {session ? userExits : userNotExits}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}
