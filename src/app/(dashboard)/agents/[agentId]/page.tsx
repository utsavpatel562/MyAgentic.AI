import {
  AgentIdView,
  AgentIdViewError,
  AgentsIdViewLoading,
} from "@/models/agents/ui/views/agent-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{ agentId: string }>;
}
const Page = async ({ params }: Props) => {
  // Extract agentId from route params
  const { agentId } = await params;

  // Initialize query client (used for SSR data prefetching)
  const queryClient = getQueryClient();
  // Prefetch agent data on the server so it’s ready before hydration
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsIdViewLoading />}>
          <ErrorBoundary fallback={<AgentIdViewError />}>
            <AgentIdView agentId={agentId} />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};
export default Page;
