// tRPC initialization - Type-safe API layer
// Based on official tRPC + Next.js 15 App Router patterns
import { initTRPC, TRPCError } from '@trpc/server';
import { cache } from 'react';
import superjson from 'superjson';
import { ZodError } from 'zod';

// Context creation - executes once per request
export const createTRPCContext = cache(async () => {
  return {
    // Add auth session here when ready
    // session: await getServerSession(),
    db: null, // Will inject Drizzle db instance
  };
});

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// tRPC instance with SuperJSON for Date/Map/Set support
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

// Export reusable router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;

// Protected procedure - requires authentication
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  // TODO: Add auth check
  // if (!ctx.session) {
  //   throw new TRPCError({ code: 'UNAUTHORIZED' });
  // }
  return next({
    ctx: {
      ...ctx,
      // session: ctx.session,
    },
  });
});
