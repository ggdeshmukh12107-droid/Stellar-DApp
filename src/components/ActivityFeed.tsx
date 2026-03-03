import { truncateAddress, formatXLM } from '../utils/stellar';

interface Donation {
    id: string;
    campaignId: string;
    donor: string;
    amount: number;
    timestamp: number;
    txHash?: string;
    campaignTitle: string;
}

interface ActivityFeedProps {
    donations: Donation[];
}

function timeAgo(timestamp: number): string {
    const diff = Date.now() - timestamp;
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
}

function donorColor(donor: string): string {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];
    const idx = donor.charCodeAt(0) % colors.length;
    return colors[idx];
}

export function ActivityFeed({ donations }: ActivityFeedProps) {
    return (
        <section className="activity-feed" id="activity">
            <h2 className="section-title">📡 Live Activity</h2>
            {donations.length === 0 ? (
                <div className="empty-feed">No donations yet. Be the first!</div>
            ) : (
                <ul className="feed-list">
                    {donations.map((d, i) => (
                        <li
                            key={d.id}
                            className="feed-item"
                            style={{ animationDelay: `${i * 60}ms` }}
                        >
                            <div
                                className="feed-avatar"
                                style={{ background: `linear-gradient(135deg, ${donorColor(d.donor)}, ${donorColor(d.donor + '1')})` }}
                                aria-hidden="true"
                            >
                                {d.donor.charAt(0)}
                            </div>
                            <div className="feed-content">
                                <div className="feed-donor">
                                    <span className="donor-name">{truncateAddress(d.donor, 4)}</span>
                                    <span className="feed-amount">+{formatXLM(d.amount)} XLM</span>
                                </div>
                                <div className="feed-campaign">→ {d.campaignTitle}</div>
                                {d.txHash && (
                                    <div className="feed-tx" title={d.txHash}>
                                        TX: {truncateAddress(d.txHash, 6)}
                                    </div>
                                )}
                            </div>
                            <time className="feed-time" dateTime={new Date(d.timestamp).toISOString()}>
                                {timeAgo(d.timestamp)}
                            </time>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default ActivityFeed;
