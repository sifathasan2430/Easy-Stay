"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const links = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header className="w-full shadow-sm bg-primary dark:bg-gray-900 text-gray-900 dark:text-white">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold">
                    EasyStay
                </Link>

                {/* Desktop links */}
                <nav className="hidden md:flex space-x-6">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="hover:text-button-primary transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Right side buttons */}
                <div className="flex items-center gap-4">
                    <ModeToggle />

                    <Button
                        className="bg-button-primary text-white border border-button-primary hover:bg-button-primary/80  
             transform hover:scale-105 transition-all duration-200"
                    >
                        <Link href="/login">Login</Link>
                    </Button>


                    {/* Mobile menu button */}
                    <Button
                        variant="ghost"
                        className="md:hidden p-2"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <Menu className="w-6 h-6" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <nav className="md:hidden bg-primary dark:bg-gray-900 border-t border-border">
                    <ul className="flex flex-col p-4 space-y-3">
                        {links.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="block hover:text-button-primary transition-colors"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    );
}
