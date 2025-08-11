import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createTRPCContext } from '@/trpc/init';
import { appRouter } from '@/trpc/routers/_app';
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc', // The API route path this handler is responsible for.
    req, // Incoming request object.
    router: appRouter, // The main tRPC router containing all procedures.
    createContext: createTRPCContext, // Function to create context for each request.
  });

// Export the same handler for both GET and POST methods.
// This ensures tRPC can handle requests regardless of HTTP method.
export { handler as GET, handler as POST };