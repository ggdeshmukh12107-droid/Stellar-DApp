import { useState, useCallback } from 'react';
import {
    isConnected,
    isAllowed,
    requestAccess,
    getAddress,
    getNetwork,
    signTransaction as freighterSignTransaction,
} from '@stellar/freighter-api';
import type { WalletState } from '../types';

const TESTNET_PASSPHRASE = 'Test SDF Network ; September 2015';

const initialState: WalletState = {
    isConnected: false,
    publicKey: null,
    network: null,
    isLoading: false,
    error: null,
};

export function useWallet() {
    const [walletState, setWalletState] = useState<WalletState>(initialState);

    const connect = useCallback(async () => {
        setWalletState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            // 1. Check extension is present
            const connResult = await isConnected();
            if (!connResult.isConnected) {
                throw new Error(
                    'Freighter extension not detected. Make sure it is installed and enabled, then refresh the page.'
                );
            }

            // 2. Request site permission (opens Freighter popup) OR get address silently
            let address = '';

            const allowedResult = await isAllowed();
            if (!allowedResult.isAllowed) {
                // Not yet approved — open the Freighter popup
                const accessResult = await requestAccess();
                if (accessResult.error) {
                    throw new Error(
                        'Connection rejected in Freighter. Please approve this site and try again.'
                    );
                }
                address = accessResult.address;
            } else {
                // Already approved — silently get address
                const addrResult = await getAddress();
                if (addrResult.error) {
                    // If silent fetch fails, fall back to requestAccess for re-approval
                    const accessResult = await requestAccess();
                    if (accessResult.error) {
                        throw new Error('Could not get address from Freighter. Please try again.');
                    }
                    address = accessResult.address;
                } else {
                    address = addrResult.address;
                }
            }

            if (!address) {
                throw new Error('No address returned from Freighter. Is your wallet unlocked?');
            }

            // 3. Get network
            const netResult = await getNetwork();
            const networkPassphrase = netResult.networkPassphrase || '';
            const network = networkPassphrase === TESTNET_PASSPHRASE ? 'testnet' : 'mainnet';

            setWalletState({
                isConnected: true,
                publicKey: address,
                network,
                isLoading: false,
                error: null,
            });
        } catch (err) {
            const raw = err instanceof Error ? err.message : String(err);
            let message = raw;
            if (/reject|denied|cancel/i.test(raw)) {
                message = 'Connection rejected. Open Freighter, approve this site, then try again.';
            } else if (/locked|unlock/i.test(raw)) {
                message = 'Freighter is locked. Please open and unlock your wallet first.';
            }
            setWalletState(prev => ({
                ...prev,
                isConnected: false,
                publicKey: null,
                network: null,
                isLoading: false,
                error: message,
            }));
        }
    }, []);

    const disconnect = useCallback(() => {
        setWalletState(initialState);
    }, []);

    const signTransaction = useCallback(
        async (xdr: string): Promise<string> => {
            if (!walletState.isConnected) throw new Error('Wallet not connected');
            const result = await freighterSignTransaction(xdr, {
                networkPassphrase: TESTNET_PASSPHRASE,
            });
            if (result.error) throw new Error(String(result.error));
            return (result as unknown as { signedTxXdr: string }).signedTxXdr || '';
        },
        [walletState.isConnected]
    );

    return {
        ...walletState,
        connect,
        disconnect,
        signTransaction,
    };
}
