"use client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const AgentsView = () => {
  const trpc = useTRPC();
  // Get the TRPC client instance to make API calls.
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  // Call the `agents.getMany` API using React Query's Suspense-enabled fetching.
  // The `queryOptions()` method provides the required configuration for React Query.

  return <div>{JSON.stringify(data, null, 2)}</div>;
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
