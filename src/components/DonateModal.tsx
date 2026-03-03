import { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { formatXLM } from '../utils/stellar';
import type { Campaign } from '../types';

interface DonateModalProps {
    campaign: Campaign | null;
    isOpen: boolean;
    isLoading: boolean;
    onClose: () => void;
    onDonate: (amount: number) => Promise<void>;
}

export function DonateModal({ campaign, isOpen, isLoading, onClose, onDonate }: DonateModalProps) {
    const [amount, setAmount] = useState('');
    const [step, setStep] = useState<'input' | 'confirm' | 'success'>('input');
    const [error, setError] = useState('');

    if (!isOpen || !campaign) return null;

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        const val = parseFloat(amount);
        if (isNaN(val) || val < 1) { setError('Minimum donation is 1 XLM.'); return; }
        setError('');
        setStep('confirm');
    };

    const handleConfirm = async () => {
        try {
            await onDonate(parseFloat(amount));
            setStep('success');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Donation failed.');
            setStep('input');
        }
    };

    const handleClose = () => {
        setAmount('');
        setStep('input');
        setError('');
        onClose();
    };

    const QUICK_AMOUNTS = [10, 50, 100, 500];

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-box modal-sm" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">💫 Donate XLM</h2>
                    <button className="modal-close" onClick={handleClose} aria-label="Close">✕</button>
                </div>

                {step === 'success' ? (
                    <div className="donate-success">
                        <div className="success-icon">🎉</div>
                        <h3>Thank you!</h3>
                        <p>Your donation of <strong>{formatXLM(parseFloat(amount))} XLM</strong> to <em>{campaign.title}</em> was successful!</p>
                        <button className="btn btn-primary" onClick={handleClose}>Done</button>
                    </div>
                ) : step === 'confirm' ? (
                    <div className="donate-confirm">
                        <p className="confirm-text">
                            You are about to donate <strong>{formatXLM(parseFloat(amount))} XLM</strong> to:
                        </p>
                        <div className="confirm-campaign">{campaign.title}</div>
                        {error && <p className="field-error">{error}</p>}
                        <div className="modal-actions">
                            <button className="btn btn-outline" onClick={() => setStep('input')} disabled={isLoading}>Back</button>
                            <button
                                id="confirm-donate-btn"
                                className="btn btn-primary"
                                onClick={handleConfirm}
                                disabled={isLoading}
                            >
                                {isLoading ? <LoadingSpinner size="sm" /> : 'Confirm Donation'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <form className="modal-form donate-form" onSubmit={handleNext}>
                        <div className="donate-campaign-info">
                            <span className="donate-label">Campaign:</span>
                            <span className="donate-campaign-name">{campaign.title}</span>
                        </div>
                        <div className="quick-amounts">
                            {QUICK_AMOUNTS.map(q => (
                                <button
                                    key={q}
                                    type="button"
                                    className={`quick-amount-btn ${amount === String(q) ? 'selected' : ''}`}
                                    onClick={() => setAmount(String(q))}
                                >
                                    {q} XLM
                                </button>
                            ))}
                        </div>
                        <div className="form-group">
                            <label htmlFor="donate-amount">Custom Amount (XLM)</label>
                            <input
                                id="donate-amount"
                                type="number"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                placeholder="Enter amount..."
                                min="1"
                                step="0.01"
                                disabled={isLoading}
                            />
                            {error && <span className="field-error">{error}</span>}
                        </div>
                        <div className="modal-actions">
                            <button type="button" className="btn btn-outline" onClick={handleClose}>Cancel</button>
                            <button type="submit" id="next-donate-btn" className="btn btn-primary" disabled={isLoading}>
                                Next →
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default DonateModal;
