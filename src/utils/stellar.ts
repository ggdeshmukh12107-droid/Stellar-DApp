// Stellar utility functions

const STROOPS_PER_XLM = 10_000_000;

/**
 * Format XLM amount with up to 7 decimal places, removing trailing zeros.
 */
export function formatXLM(xlm: number, decimals = 2): string {
    return xlm.toFixed(decimals);
}

/**
 * Truncate Stellar public key: GABCD...WXYZ
 */
export function truncateAddress(address: string, chars = 4): string {
    if (!address || address.length < chars * 2 + 3) return address;
    return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

/**
 * Validate a Stellar public key (G-key, 56 chars, base32 charset).
 */
export function validateStellarAddress(address: string): boolean {
    if (!address) return false;
    if (!address.startsWith('G')) return false;
    if (address.length !== 56) return false;
    // Base32 characters A-Z and 2-7
    const base32Regex = /^[A-Z2-7]+$/;
    return base32Regex.test(address);
}

/**
 * Convert XLM to stroops (1 XLM = 10,000,000 stroops).
 */
export function xlmToStroops(xlm: number): number {
    return Math.round(xlm * STROOPS_PER_XLM);
}

/**
 * Convert stroops to XLM.
 */
export function stroopsToXlm(stroops: number): number {
    return stroops / STROOPS_PER_XLM;
}

/**
 * Get time remaining as a human-readable string.
 */
export function formatTimeRemaining(deadline: number): string {
    const now = Date.now();
    const diff = deadline - now;

    if (diff <= 0) return 'Ended';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
}

/**
 * Calculate campaign progress percentage (0-100).
 */
export function calcProgress(raised: number, goal: number): number {
    if (goal <= 0) return 0;
    return Math.min(100, Math.round((raised / goal) * 100));
}

/**
 * Generate a random ID.
 */
export function generateId(): string {
    return Math.random().toString(36).substring(2, 11);
}
