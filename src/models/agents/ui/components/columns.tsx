"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AgentGetOne } from "../../types";
import { GeneratedAvatar } from "@/components/generate-avatar";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => {
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <GeneratedAvatar
            variant={"botttsNeutral"}
            seed={row.original.name}
            className="size-6"
          />
        </div>
      </div>;
    },
  },
];
