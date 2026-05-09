import { PrismaClient } from '@prisma/client';

/**
 * Singleton Prisma client WITHOUT middleware.
 *
 * Used exclusively for audit logging to prevent:
 * - Infinite recursion (audit middleware triggering itself)
 * - Connection pool explosion from multiple PrismaClient instances
 *
 * Cached on globalThis in development to survive hot-reloads.
 */

declare global {
  // eslint-disable-next-line no-var
  var __rawPrisma: PrismaClient | undefined;
}

export const rawPrisma: PrismaClient =
  globalThis.__rawPrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__rawPrisma = rawPrisma;
}
