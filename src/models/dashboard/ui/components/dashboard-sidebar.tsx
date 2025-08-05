"use client";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { IoVideocam } from "react-icons/io5";
import { RiRobot3Fill } from "react-icons/ri";
import { TbPremiumRights } from "react-icons/tb";
const firstSection = [
  {
    icon: IoVideocam,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: RiRobot3Fill,
    label: "Agents",
    href: "/agents",
  },
];
const secondSection = [
  {
    icon: TbPremiumRights,
    label: "Premium",
    href: "/upgrade",
  },
];

export const DashboardSidebar = () => {
  return (
    <>
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
      </Sidebar>
    </>
  );
};
