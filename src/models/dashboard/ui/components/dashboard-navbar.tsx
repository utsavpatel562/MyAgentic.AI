"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { DashboardCommand } from "./dashboard-command";
import { useEffect, useState } from "react";

const DashboardNavbar = () => {
  // Destructure sidebar state and functions from the custom hook
  const { state, toggleSidebar, isMobile } = useSidebar();

  // Local state to track whether the command menu is open
  const [commandOpen, setCommandOpen] = useState(false);

  // useEffect adds a keyboard shortcut listener for Cmd+K or Ctrl+K to toggle the command menu
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault(); // Prevent default browser behavior
        setCommandOpen((open) => !open); // Toggle command menu visibility
      }
    };
    document.addEventListener("keydown", down);

    // Clean up the event listener on component unmount
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
        <Button
          className="size-9 cursor-pointer"
          variant={"outline"}
          onClick={toggleSidebar}
        >
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>
        <Button
          className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
          variant={"outline"}
          size={"sm"}
          onClick={() => setCommandOpen((open) => !open)}
        >
          <SearchIcon />
          Search
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span>&#8984;</span>
          </kbd>
          K
        </Button>
      </nav>
    </>
  );
};

export default DashboardNavbar;
