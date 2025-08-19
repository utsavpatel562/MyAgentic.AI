"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MeetingGetMany } from "../../types";
import { format } from "date-fns";
import humanizeDuration from "humanize-duration";
import { LuCircleX, LuClockArrowUp } from "react-icons/lu";
import { GeneratedAvatar } from "@/components/generate-avatar";
import { Badge } from "@/components/ui/badge";
import { FiLoader } from "react-icons/fi";
import { TbCircleCheck } from "react-icons/tb";
import { ClockFadingIcon, CornerDownRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function formatDuration(seconds: number) {
  return humanizeDuration(seconds * 1000, {
    largest: 1,
    round: true,
    units: ["h", "m", "s"],
  });
}

const statusIconMap = {
  upcoming: LuClockArrowUp,
  active: FiLoader,
  completed: TbCircleCheck,
  processing: FiLoader,
  cancelled: LuCircleX,
};

const statusColorMap = {
  upcoming: "bg-yellow-300/20 text-yellow-800 border-yellow-800/5",
  active: "bg-blue-500/20 text-blue-800 border-blue-800/5",
  completed: "bg-emerald-500/20 text-emerald-800 border-emerald-800/5",
  processing: "bg-gray-300/20 text-gray-800 border-gray-800/5",
  cancelled: "bg-rose-500/20 text-rose-800 border-rose-800/5",
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <span className="font-semibold capitalize">{row.original.name}</span>
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <CornerDownRightIcon className="size-3 text-muted-foreground" />
            <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize">
              {row.original.agent.name}
            </span>
          </div>
          <GeneratedAvatar
            variant={"botttsNeutral"}
            seed={row.original.agent.name}
            className="size-4"
          />
          <span className="text-sm text-muted-foreground">
            {row.original.startedAt
              ? format(row.original.startedAt, "MM d")
              : ""}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const Icon =
        statusIconMap[row.original.status as keyof typeof statusIconMap];

      return (
        <Badge
          variant={"outline"}
          className={cn(
            "capitalize [&>svg]:size-4 text-muted-foreground",
            statusColorMap[row.original.status as keyof typeof statusColorMap]
          )}
        >
          <Icon
            className={cn(
              row.original.status === "processing" && "animate-spin"
            )}
          />
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "duration",
    cell: ({ row }) => (
      <Badge
        variant={"outline"}
        className="capitalize [&>svg]:size-4 flex items-center gap-x-2"
      >
        <ClockFadingIcon className="text-blue-700" />
        {row.original.duration
          ? formatDuration(row.original.duration)
          : "No duration"}
      </Badge>
    ),
  },
];
