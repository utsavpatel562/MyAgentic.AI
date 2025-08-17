"use client";
import { Button } from "@/components/ui/button";
import { HiPlusSm } from "react-icons/hi";
import { NewAgentDialog } from "./new-agent-dialog";
import { useState } from "react";
import { useAgentFilters } from "../../hooks/use-agents-filter";
import AgentsSearchFilter from "./agents-search-filter";
import { DEFAULT_PAGE } from "@/constants";
import { MdOutlineCancel } from "react-icons/md";

// Header component for the agents list page
export const AgentsListHeader = () => {
  // Using custom filter hook that returns [filters, setFilters]
  const [filters, setFilters] = useAgentFilters();
  // State to control whether the "New Agent" dialog is open or closed
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Check if any filter has been applied (currently only checks "search")
  const isAnyFilterModified = !!filters.search;
  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };
  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button className="gap-1" onClick={() => setIsDialogOpen(true)}>
            <HiPlusSm className="size-5" />
            New Agent
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          <AgentsSearchFilter />
          {isAnyFilterModified && (
            <Button onClick={onClearFilters} variant={"outline"}>
              <MdOutlineCancel />
              Clear
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
