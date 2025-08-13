"use client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns, Payment } from "../components/columns";

const MockData: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
];

export const AgentsView = () => {
  const trpc = useTRPC();
  // Get the TRPC client instance to make API calls.
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  // Call the `agents.getMany` API using React Query's Suspense-enabled fetching.
  // The `queryOptions()` method provides the required configuration for React Query.

  return (
    <div>
      <DataTable data={MockData} columns={columns} />
    </div>
  );
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState title="Loading Agents" description="This may take a moment" />
  );
};

export const ErrorViewLoading = () => {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="Something went wrong"
    />
  );
};
