import type * as React from "react"
import { Home, Settings, User, Mail, Calendar, Search, Menu } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/authOptions"

// Sample navigation items
const navItems = [
  { icon: Home, label: "Dashboard", href: "#" },
  { icon: Mail, label: "Messages", href: "#" },
  { icon: Calendar, label: "Calendar", href: "#" },
  { icon: User, label: "Profile", href: "#" },
  { icon: Search, label: "Search", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
]

export async function GlassSidebar({ ...props }: React.ComponentProps<typeof Sidebar>)    {
const session=await getServerSession(authOptions)
console.log(session)
  return (
    <Sidebar className="border-none shadow-none" {...props}>
      <div className="absolute inset-0 bg-background/30 backdrop-blur-xl backdrop-filter border-r border-white/10 rounded-r-2xl" />
      <SidebarHeader className="relative z-10 flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session?.user?.image} alt="Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="font-medium">{session?.user?.name}</div>
        </div>
       
      </SidebarHeader>
      <SidebarContent className="relative z-10 p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild className="hover:bg-white/10 data-[active=true]:bg-white/20">
                <a href={item.href} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="relative z-10 mt-auto p-4 border-t border-white/10">
        <div className="text-xs text-foreground/60">© 2024 Glass UI</div>
      </SidebarFooter>
      <SidebarRail /> 
    </Sidebar>
  )
}

