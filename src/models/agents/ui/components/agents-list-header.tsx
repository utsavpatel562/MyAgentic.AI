"use client";
import { Button } from "@/components/ui/button";
import { HiPlusSm } from "react-icons/hi";
import { NewAgentDialog } from "./new-agent-dialog";
import { useState } from "react";
export const AgentsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
      </div>
    </>
  );
};
