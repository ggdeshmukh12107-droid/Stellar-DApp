import { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import type { CreateCampaignInput } from '../types';

interface CreateCampaignProps {
    isOpen: boolean;
    isLoading: boolean;
    onClose: () => void;
    onSubmit: (input: CreateCampaignInput) => Promise<void>;
}

const getMinDeadline = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 16);
};

export function CreateCampaign({ isOpen, isLoading, onClose, onSubmit }: CreateCampaignProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [goal, setGoal] = useState('');
    const [deadline, setDeadline] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    if (!isOpen) return null;

    const validate = () => {
        const e: Record<string, string> = {};
        if (!title.trim() || title.length < 5) e.title = 'Title must be at least 5 characters.';
        if (!description.trim() || description.length < 20) e.description = 'Description must be at least 20 characters.';
        const goalNum = parseFloat(goal);
        if (isNaN(goalNum) || goalNum < 10) e.goal = 'Goal must be at least 10 XLM.';
        if (!deadline) e.deadline = 'Please select a deadline.';
        else if (new Date(deadline) <= new Date()) e.deadline = 'Deadline must be in the future.';
        return e;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setErrors({});
        await onSubmit({ title, description, goal: parseFloat(goal), deadline: new Date(deadline) });
        setTitle(''); setDescription(''); setGoal(''); setDeadline('');
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">🚀 Create Campaign</h2>
                    <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
                </div>
                <form className="modal-form" onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="campaign-title">Title</label>
                        <input
                            id="campaign-title"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="e.g. Open Source Stellar Tools"
                            disabled={isLoading}
                            maxLength={100}
                        />
                        {errors.title && <span className="field-error">{errors.title}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="campaign-desc">Description</label>
                        <textarea
                            id="campaign-desc"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Describe your campaign..."
                            rows={3}
                            disabled={isLoading}
                            maxLength={500}
                        />
                        {errors.description && <span className="field-error">{errors.description}</span>}
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="campaign-goal">Goal (XLM)</label>
                            <input
                                id="campaign-goal"
                                type="number"
                                value={goal}
                                onChange={e => setGoal(e.target.value)}
                                placeholder="e.g. 1000"
                                min="10"
                                step="0.01"
                                disabled={isLoading}
                            />
                            {errors.goal && <span className="field-error">{errors.goal}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="campaign-deadline">Deadline</label>
                            <input
                                id="campaign-deadline"
                                type="datetime-local"
                                value={deadline}
                                onChange={e => setDeadline(e.target.value)}
                                min={getMinDeadline()}
                                disabled={isLoading}
                            />
                            {errors.deadline && <span className="field-error">{errors.deadline}</span>}
                        </div>
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="btn btn-outline" onClick={onClose} disabled={isLoading}>Cancel</button>
                        <button type="submit" id="submit-campaign-btn" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? <LoadingSpinner size="sm" /> : 'Launch Campaign'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateCampaign;
