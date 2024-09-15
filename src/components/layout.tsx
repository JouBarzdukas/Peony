"use client"
import type {AppProps} from 'next/app'
import {AuthProvider, useAuthInfo, useLogoutFunction} from "@propelauth/react";
import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Globe, Users, Menu, List } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const components = [
    { title: "Button", href: "/docs/components/button", description: "A customizable button component." },
    { title: "Input", href: "/docs/components/input", description: "A customizable input component." },
    // Add more components as needed
]

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => (
    <li>
        <NavigationMenuLink asChild>
            <a
                ref={ref}
                className={cn(
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    className
                )}
                {...props}
            >
                <div className="text-sm font-medium leading-none">{title}</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {children}
                </p>
            </a>
        </NavigationMenuLink>
    </li>
))
ListItem.displayName = "ListItem"

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <Header isActive={isActive} />
            <main className="flex-1 container mx-auto py-6">
                {children}
            </main>
            <Footer />
        </div>
    )
}

function Header({ isActive }: { isActive: (path: string) => boolean }) {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center px-2">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-4 flex items-center space-x-2">
                    <Image 
                            src="/logo.png" 
                            alt="Peony Logo" 
                            width={24} // Adjust the width and height to match the Globe icon size
                            height={24}
                            className="h-6 w-6" // These classes ensure consistent sizing
                        />
                        <span className="hidden font-bold sm:inline-block">
                            Peony
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-4 text-sm font-medium">
                        <NavigationMenuComponent />
                    </nav>
                </div>
                <MobileMenu isActive={isActive} />
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <Input
                            placeholder="Search salaries, companies..."
                            className="max-w-[500px]"
                        />
                    </div>
                    <UserMenu />
                </div>
            </div>
        </header>
    )
}

function NavLink({ href, isActive, label }: { href: string, isActive: (path: string) => boolean, label: string }) {
    return (
        <Link
            href={href}
            className={isActive(href) ? "text-foreground" : "text-foreground/60"}
        >
            {label}
        </Link>
    )
}

function NavigationMenuComponent() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Your Industry</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col items-center justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href="/dashboard"
                                    >
                                        <Image src="/logo.png" alt="Peony" width={180} height={60} className="h-24 w-auto" />
                                        <div className="mb-2 mt-4 text-lg font-medium text-center">
                                            My Dashboard
                                        </div>
                                        <p className="text-sm leading-tight text-center text-muted-foreground">
                                            See all of your data in one place!
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/your-industry/workplace" title="Your Workplace!">
                                See your workplace's data and reviews.
                            </ListItem>
                            <ListItem href="/your-industry/rate" title="Rate Your Workplace!">
                                Give an anonymous review of your workplace.
                            </ListItem>
                            <ListItem href="/your-industry/compare" title="Comparing Tool!">
                                Compare your own situation with others in a similar situation.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>All Jobs</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            <ListItem href="/all-jobs/company-search" title="Search Other Workplaces!">
                                Access other workplaces to help you in your job search.
                            </ListItem>
                            <ListItem href="/all-jobs/switch" title="Change Your Job!">
                                Changed where you worked? Use this tool to reorient your data to your new workplace.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/FAQ" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            FAQ
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

function MobileMenu({ isActive }: { isActive: (path: string) => boolean }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="mr-2 md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                <Link href="/" className="flex items-center space-x-2">
                <Image 
                        src="logo.png" 
                        alt="Peony Logo" 
                        width={24} 
                        height={24}
                        className="h-6 w-6"
                    />
                    <span className="font-bold">Peony</span>
                </Link>
                <nav className="mt-4 flex flex-col space-y-2">
                    <NavLink href="/" isActive={isActive} label="Home" />
                    <NavLink href="/salaries" isActive={isActive} label="Salaries" />
                    <NavLink href="/reviews" isActive={isActive} label="Reviews" />
                    <NavLink href="/resources" isActive={isActive} label="Resources" />
                </nav>
            </SheetContent>
        </Sheet>
    )
}

function UserMenu() {
    const { isLoggedIn, user } = useAuthInfo()
    const logoutFunction = useLogoutFunction()
    const router = useRouter()

    const handleLogout = async () => {
        await logoutFunction(true)
        router.push('/')
    }

    if (!isLoggedIn) {
        return (
            <Button variant="secondary" size="sm" asChild>
                <Link href="/login">Log In</Link>
            </Button>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm">
                    <Users className="h-5 w-5 mr-2" />
                    {user.email}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/contributions">Contributions</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container flex flex-col items-center justify-between gap-4 py-10 px-4 md:h-24 md:flex-row md:py-0 md:px-8">
                <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
                <Image 
                        src="/logo.png" 
                        alt="Peony Logo" 
                        width={24} 
                        height={24}
                        className="h-6 w-6"
                    />
                    <p className="text-center text-sm leading-loose md:text-left">
                        Built for equality. Empowering fair compensation for all.
                    </p>
                </div>
                <p className="text-center text-sm md:text-left">
                    © 2024 Peony. All rights reserved.
                </p>
            </div>
        </footer>
    )
};