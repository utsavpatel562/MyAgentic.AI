"use client";
import { Button } from "@/components/ui/button";
import { HiPlusSm } from "react-icons/hi";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";

// Header component for the meetings list page
export const MeetingsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Meetings</h5>
          <Button className="gap-1" onClick={() => setIsDialogOpen(true)}>
            <HiPlusSm className="size-5" />
            New Meetings
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">Filters to Build</div>
      </div>
    </>
  );
};
