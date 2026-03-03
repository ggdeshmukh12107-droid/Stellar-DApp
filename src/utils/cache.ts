import type { CacheEntry } from '../types';

// Default TTL: 30 seconds
const DEFAULT_TTL_MS = 30_000;

class Cache {
    private store = new Map<string, CacheEntry<unknown>>();

    set<T>(key: string, data: T, ttlMs: number = DEFAULT_TTL_MS): void {
        this.store.set(key, {
            data,
            expiresAt: Date.now() + ttlMs,
        });
    }

    get<T>(key: string): T | null {
        const entry = this.store.get(key) as CacheEntry<T> | undefined;
        if (!entry) return null;
        if (Date.now() > entry.expiresAt) {
            this.store.delete(key);
            return null;
        }
        return entry.data;
    }

    has(key: string): boolean {
        const entry = this.store.get(key);
        if (!entry) return false;
        if (Date.now() > entry.expiresAt) {
            this.store.delete(key);
            return false;
        }
        return true;
    }

    clear(key?: string): void {
        if (key) {
            this.store.delete(key);
        } else {
            this.store.clear();
        }
    }

    size(): number {
        // Prune expired entries and return count
        const now = Date.now();
        for (const [k, v] of this.store.entries()) {
            if (now > v.expiresAt) this.store.delete(k);
        }
        return this.store.size;
    }
}

// Singleton cache instance
export const cache = new Cache();
export { DEFAULT_TTL_MS };
export default cache;
