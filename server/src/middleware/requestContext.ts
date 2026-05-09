import { AsyncLocalStorage } from 'node:async_hooks';

export interface RequestStore {
  tenantId: string;
  userId: string;
  role: string;
  permissions: Set<string>;
}

/**
 * Request-scoped context using AsyncLocalStorage.
 * Each HTTP request runs inside its own async context,
 * preventing cross-request data leakage under concurrency.
 */
export const requestContext = new AsyncLocalStorage<RequestStore>();
