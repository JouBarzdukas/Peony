"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Globe, Users, Menu, List } from "lucide-react"
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
                        <Globe className="h-6 w-6" />
                        <span className="hidden font-bold sm:inline-block">
                            Inclusive
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
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href="/"
                                    >
                                        <div className="mb-2 mt-4 text-lg font-medium">
                                            My Dashboard
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            See all of your data in one place!
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/your-industry/rate" title="Rate your workplace!">
                                Give an anonymous review of your workplace.
                            </ListItem>
                            <ListItem href="/analytics" title="Job analytics">
                                Analyze salary trends for demographics in your industry.
                            </ListItem>
                            <ListItem href="/docs/primitives/typography" title="Typography">
                                Styles for headings, paragraphs, lists...etc
                            </ListItem>
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>All Jobs</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            <ListItem href="/all-jobs" title="New Jobs">
                                Discover the latest job postings in your industry.
                            </ListItem>
                            <ListItem href="/all-jobs/analytics" title="Job Analytics">
                                Analyze job trends and opportunities in your field.
                            </ListItem>
                            <ListItem href="/all-jobs/company-search" title="Search other workplaces">
                                Access resources to help you in your job search.
                            </ListItem>
                            <ListItem href="/all-jobs/salaries" title = "New Salaries">
                                See the list of the newest anonymous salaries.
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
                    <Globe className="h-6 w-6" />
                    <span className="font-bold">Inclusive Insights</span>
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
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon">
                    <Users className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Contributions</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container flex flex-col items-center justify-between gap-4 py-10 px-4 md:h-24 md:flex-row md:py-0 md:px-8">
                <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
                    <Globe className="h-6 w-6" />
                    <p className="text-center text-sm leading-loose md:text-left">
                        Built for equality. Empowering fair compensation for all.
                    </p>
                </div>
                <p className="text-center text-sm md:text-left">
                    © 2024 Inclusive Insights. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
