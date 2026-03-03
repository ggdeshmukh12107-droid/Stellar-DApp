// Core TypeScript interfaces for the Stellar Crowdfunding DApp

export interface Campaign {
    id: string;
    title: string;
    description: string;
    creator: string; // Stellar public key
    goal: number; // in XLM
    raised: number; // in XLM
    deadline: number; // Unix timestamp
    createdAt: number; // Unix timestamp
    donations: Donation[];
}

export interface Donation {
    id: string;
    campaignId: string;
    donor: string; // Stellar public key
    amount: number; // in XLM
    timestamp: number; // Unix timestamp
    txHash?: string; // Stellar transaction hash
}

export interface WalletState {
    isConnected: boolean;
    publicKey: string | null;
    network: 'testnet' | 'mainnet' | null;
    isLoading: boolean;
    error: string | null;
}

export interface CacheEntry<T> {
    data: T;
    expiresAt: number; // Unix timestamp ms
}

export interface CreateCampaignInput {
    title: string;
    description: string;
    goal: number; // in XLM
    deadline: Date;
}

export interface DonateInput {
    campaignId: string;
    amount: number; // in XLM
}

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
}
