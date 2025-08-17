"use client";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoVideocam } from "react-icons/io5";
import { RiRobot3Fill } from "react-icons/ri";
import { TbPremiumRights, TbUserCode } from "react-icons/tb";
import { DashboardUserComponent } from "./dashboard-user-button";

const firstSection = [
  { icon: IoVideocam, label: "Meetings", href: "/meetings" },
  { icon: RiRobot3Fill, label: "Agents", href: "/agents" },
];

const secondSection = [
  { icon: TbPremiumRights, label: "Premium", href: "/upgrade" },
  { icon: TbUserCode, label: "Developer", href: "/developer" },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<string | null>(null);

  // Ensure pathname is only applied after hydration
  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const renderMenu = (items: typeof firstSection) =>
    items.map((item) => {
      const isActive = activePath === item.href;

      return (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            className={cn(
              "h-10 hover:bg-pink-950 border border-transparent cursor-pointer hover:border-[#b65d79]/10 from-sidebar-accent from-100% via-80% via-sidebar/50 to-sidebar/50",
              isActive && "bg-linear-to-r/oklch border-[#b65d79]/10"
            )}
          >
            <Link href={item.href}>
              <item.icon className="size-5 text-slate-200" />
              <span className="text-md text-slate-200 font-medium tracking-tight">
                {item.label}
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });

  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href={"/"} className="flex items-center gap-2 px-2 pt-2">
          <Image src={"/logo.png"} alt="logo" height={36} width={36} />
          <p className="text-2xl font-semibold">MYAGENTIC.AI</p>
        </Link>
      </SidebarHeader>

      <div className="px-4 py-2">
        <Separator className="opacity-10 text-[#5D6B68]" />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenu(firstSection)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="px-4 py-2">
          <Separator className="opacity-10 text-[#becfcb]" />
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenu(secondSection)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="text-white">
        <DashboardUserComponent />
      </SidebarFooter>
    </Sidebar>
  );
};
