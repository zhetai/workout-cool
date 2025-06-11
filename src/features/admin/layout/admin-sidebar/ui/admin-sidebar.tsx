"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Users, LayoutDashboard, Settings, BarChart3, X, Minus } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import NavLink from "@/features/layout/nav-link";
import { Card } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { LogoSvg } from "@/components/svg/LogoSvg";

export const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathName = usePathname();
  const activeClass = "rounded-lg border !border-gray-300 bg-gray-400 !text-black !font-semibold";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.style.marginLeft = isSidebarOpen ? "260px" : "60px";
    }
  };

  const toggleSidebarResponsive = () => {
    document.getElementById("adminSidebar")?.classList.remove("open");
    document.getElementById("adminOverlay")?.classList.toggle("open");
  };

  return (
    <>
      <div className="fixed inset-0 z-30 hidden bg-black/50" id="adminOverlay" onClick={toggleSidebarResponsive} />
      <Card
        className={`sidebar fixed top-0 z-40 flex h-screen w-[260px] flex-col rounded-none bg-white transition-all duration-300 lg:top-16 lg:h-[calc(100vh_-_64px)] ltr:-left-[260px] ltr:lg:left-0 rtl:-right-[260px] rtl:lg:right-0 dark:border-t dark:border-gray-300/10 ${isSidebarOpen ? "closed" : ""}`}
        id="adminSidebar"
      >
        <button
          className="absolute -top-3.5 hidden size-6 place-content-center rounded-full border border-gray-300 bg-white text-black lg:grid ltr:-right-2.5 rtl:-left-2.5 dark:border-gray-700 dark:bg-gray dark:text-white"
          onClick={toggleSidebar}
          type="button"
        >
          <ChevronDown className={`h-4 w-4 ltr:rotate-90 rtl:-rotate-90 ${isSidebarOpen ? "hidden" : ""}`} />
          <ChevronDown className={`hidden h-4 w-4 ltr:-rotate-90 rtl:rotate-90 ${isSidebarOpen ? "!block" : ""}`} />
        </button>
        <div className="flex items-start justify-between border-b border-gray-300 px-4 py-5 lg:hidden dark:border-gray-700/50">
          <Link className="inline-block" href="/">
            <LogoSvg className="w-24" />
          </Link>
          <button onClick={toggleSidebarResponsive} type="button">
            <X className="-mt-2 ml-auto size-4 hover:text-black ltr:-mr-2 rtl:-ml-2" />
          </button>
        </div>
        <Accordion className="sidemenu grow overflow-y-auto overflow-x-hidden px-2.5 pb-10 pt-2.5 transition-all" collapsible type="single">
          <h3 className="mb-1 mt-2.5 whitespace-nowrap rounded-lg bg-gray-400 px-5 py-2.5 text-xs/tight font-semibold uppercase text-black dark:bg-gray-400/[6%] dark:text-white">
            <span>Administration</span>
            <Minus className="hidden h-4 w-5 text-gray" />
          </h3>
          <NavLink
            className={cn("nav-link", {
              [activeClass]: pathName === "/admin/dashboard",
            })}
            href="/admin/dashboard"
          >
            <LayoutDashboard className="size-[18px] shrink-0" />
            <span>Tableau de bord</span>
          </NavLink>

          <NavLink
            className={cn("nav-link", {
              [activeClass]: pathName === "/admin/users",
            })}
            href="/admin/users"
          >
            <Users className="size-[18px] shrink-0" />
            <span>Utilisateurs</span>
          </NavLink>

          <NavLink
            className={cn("nav-link", {
              [activeClass]: pathName === "/admin/analytics",
            })}
            href="/admin/analytics"
          >
            <BarChart3 className="size-[18px] shrink-0" />
            <span>Analytiques</span>
          </NavLink>

          <h3 className="mb-1 mt-2.5 whitespace-nowrap rounded-lg bg-gray-400 px-5 py-2.5 text-xs/tight font-semibold uppercase text-black dark:bg-gray-400/[6%] dark:text-white">
            <span>Configuration</span>
            <Minus className="hidden h-4 w-5 text-gray" />
          </h3>
          <NavLink
            className={cn("nav-link", {
              [activeClass]: pathName === "/admin/settings",
            })}
            href="/admin/settings"
          >
            <Settings className="size-[18px] shrink-0" />
            <span>Paramètres</span>
          </NavLink>
        </Accordion>
      </Card>
    </>
  );
};
