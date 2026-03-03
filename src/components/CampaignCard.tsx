import type { Campaign } from '../types';
import { ProgressBar } from './ProgressBar';
import { LoadingSpinner } from './LoadingSpinner';
import { truncateAddress, formatTimeRemaining, formatXLM } from '../utils/stellar';

interface CampaignCardProps {
    campaign: Campaign;
    onDonate: (campaign: Campaign) => void;
    isConnected: boolean;
    isLoading?: boolean;
}

export function CampaignCard({ campaign, onDonate, isConnected, isLoading }: CampaignCardProps) {
    const { title, description, creator, goal, raised, deadline, donations } = campaign;
    const isEnded = deadline < Date.now();
    const isFunded = raised >= goal;

    return (
        <article className={`campaign-card ${isLoading ? 'card-loading' : ''}`}>
            {isLoading && (
                <div className="card-loading-overlay">
                    <LoadingSpinner size="md" label="Processing..." />
                </div>
            )}
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
                <span className={`card-badge ${isEnded ? 'badge-ended' : isFunded ? 'badge-funded' : 'badge-active'}`}>
                    {isEnded ? 'Ended' : isFunded ? 'Funded!' : 'Active'}
                </span>
            </div>
            <p className="card-description">{description}</p>
            <div className="card-meta">
                <span className="card-creator" title={creator}>
                    by {truncateAddress(creator, 5)}
                </span>
                <span className={`card-deadline ${isEnded ? 'deadline-over' : ''}`}>
                    🕐 {formatTimeRemaining(deadline)}
                </span>
            </div>
            <ProgressBar raised={raised} goal={goal} showMilestones animated />
            <div className="card-footer">
                <div className="card-stats">
                    <span className="stat">
                        <strong>{donations.length}</strong>
                        <small>donors</small>
                    </span>
                    <span className="stat">
                        <strong>{formatXLM(raised)}</strong>
                        <small>XLM raised</small>
                    </span>
                </div>
                <button
                    id={`donate-btn-${campaign.id}`}
                    className="btn btn-primary"
                    onClick={() => onDonate(campaign)}
                    disabled={!isConnected || isEnded}
                    title={!isConnected ? 'Connect wallet to donate' : isEnded ? 'Campaign ended' : `Donate to ${title}`}
                >
                    {!isConnected ? '🔒 Connect to Donate' : 'Donate XLM'}
                </button>
            </div>
        </article>
    );
}

export default CampaignCard;
