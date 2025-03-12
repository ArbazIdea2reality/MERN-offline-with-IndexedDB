"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  CreditCard,
  DollarSign,
  LayoutDashboard,
  RefreshCw,
  Settings,
  ChevronRight,
  HelpCircle,
  User,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar" // Sidebar component from shadcn/ui

export function AppSidebar() {
  const pathname = usePathname()

  const mainRoutes = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      description: "Overview of your finances",
    },
    {
      title: "Transactions",
      href: "/transactions",
      icon: CreditCard,
      description: "Manage your transactions",
    },
    {
      title: "Sync",
      href: "/sync",
      icon: RefreshCw,
      description: "Sync your data",
    },
  ]

  const utilityRoutes = [
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      description: "Configure your account",
    },
    {
      title: "Help",
      href: "/help",
      icon: HelpCircle,
      description: "Get assistance",
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <DollarSign className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">Finance App</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainRoutes.map((route) => (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === route.href}
                    tooltip={route.description}
                    className="group flex h-10 items-center gap-3 rounded-md px-3 py-2 hover:bg-accent"
                  >
                    <Link href={route.href}>
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-md ${pathname === route.href ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"}`}
                      >
                        <route.icon className="h-4 w-4" />
                      </div>
                      <span className="flex-1">{route.title}</span>
                      {pathname === route.href && <ChevronRight className="h-4 w-4 text-primary" />}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-2" />

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Utilities
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {utilityRoutes.map((route) => (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === route.href}
                    tooltip={route.description}
                    className="group flex h-10 items-center gap-3 rounded-md px-3 py-2 hover:bg-accent"
                  >
                    <Link href={route.href}>
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-md ${pathname === route.href ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"}`}
                      >
                        <route.icon className="h-4 w-4" />
                      </div>
                      <span className="flex-1">{route.title}</span>
                      {pathname === route.href && <ChevronRight className="h-4 w-4 text-primary" />}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3 rounded-md p-2 hover:bg-accent">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">john@example.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

