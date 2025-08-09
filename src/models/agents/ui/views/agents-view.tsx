"use client";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data, isLoading, isError } = useQuery(
    trpc.agents.getMany.queryOptions()
  );

  if (isLoading)
    return (
      <LoadingState
        title="Loading Agents"
        description="This may take a few seconds..."
      />
    );
  if (isError) return <div>Error</div>;
  return <div>{JSON.stringify(data, null, 2)}</div>;
};
