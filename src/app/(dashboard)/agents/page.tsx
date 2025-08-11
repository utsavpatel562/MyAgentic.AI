import { AgentsListHeader } from "@/models/agents/ui/components/agents-list-header";
import {
  AgentsView,
  AgentsViewLoading,
  ErrorViewLoading,
} from "@/models/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = async () => {
  // Get a QueryClient instance (used by React Query to manage cached data)
  const queryClient = getQueryClient();

  // Prefetch the "agents.getMany" query so that data is available before rendering
  // Using `void` here ignores the promise return value
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  return (
    <>
      <AgentsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewLoading />}>
          <ErrorBoundary fallback={<ErrorViewLoading />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;
