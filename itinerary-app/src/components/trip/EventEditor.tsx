'use client';

import { useState, useEffect } from 'react';
import { TimelineEvent, Link, TransportInfo } from '@/types/itinerary';

interface EventEditorProps {
    isOpen: boolean;
    initialEvent: Partial<TimelineEvent>;
    onSave: (event: TimelineEvent) => void;
    onCancel: () => void;
    title?: string;
}

export function EventEditor({ isOpen, initialEvent, onSave, onCancel, title = "Edit Event" }: EventEditorProps) {
    // Local state for all fields
    const [formData, setFormData] = useState<Partial<TimelineEvent>>({
        time: '12:00',
        title: '',
        description: '',
        notes: '',
        isBooked: false,
        isHighlight: false,
        links: [],
        transport: { mode: 'walk' }, // Default
        ...initialEvent
    });

    // Reset form when opening with new event
    useEffect(() => {
        if (isOpen) {
            setFormData({
                time: '12:00',
                title: '',
                description: '',
                notes: '',
                isBooked: false,
                isHighlight: false,
                links: [],
                transport: undefined,
                ...initialEvent
            });
        }
    }, [isOpen, initialEvent]);

    const handleChange = (field: keyof TimelineEvent, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleTransportChange = (field: keyof TransportInfo, value: any) => {
        setFormData(prev => ({
            ...prev,
            transport: { ...prev.transport, [field]: value } as TransportInfo
        }));
    };

    const handleAddLink = () => {
        setFormData(prev => ({
            ...prev,
            links: [...(prev.links || []), { text: '', url: '' }]
        }));
    };

    const handleLinkChange = (index: number, field: keyof Link, value: string) => {
        const newLinks = [...(formData.links || [])];
        newLinks[index] = { ...newLinks[index], [field]: value };
        setFormData(prev => ({ ...prev, links: newLinks }));
    };

    const handleRemoveLink = (index: number) => {
        const newLinks = [...(formData.links || [])];
        newLinks.splice(index, 1);
        setFormData(prev => ({ ...prev, links: newLinks }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validation could go here
        onSave(formData as TimelineEvent);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <header className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">✕</button>
                </header>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Time</label>
                            <input
                                type="time"
                                value={formData.time}
                                onChange={e => handleChange('time', e.target.value)}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={e => handleChange('title', e.target.value)}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description (HTML allowed)</label>
                        <textarea
                            value={formData.description}
                            onChange={e => handleChange('description', e.target.value)}
                            className="w-full border rounded p-2 h-20 font-mono text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Notes</label>
                        <textarea
                            value={formData.notes || ''}
                            onChange={e => handleChange('notes', e.target.value)}
                            className="w-full border rounded p-2 h-16"
                        />
                    </div>

                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isBooked || false}
                                onChange={e => handleChange('isBooked', e.target.checked)}
                            />
                            Is Booked (📌)
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isHighlight || false}
                                onChange={e => handleChange('isHighlight', e.target.checked)}
                            />
                            Is Highlight (✨)
                        </label>
                    </div>

                    {/* Links Section */}
                    <div className="border p-3 rounded bg-gray-50">
                        <h4 className="text-sm font-bold mb-2">Links</h4>
                        {formData.links?.map((link, idx) => (
                            <div key={idx} className="flex gap-2 mb-2">
                                <input
                                    placeholder="Text"
                                    value={link.text}
                                    onChange={e => handleLinkChange(idx, 'text', e.target.value)}
                                    className="border rounded p-1 flex-1 text-sm"
                                />
                                <input
                                    placeholder="URL"
                                    value={link.url}
                                    onChange={e => handleLinkChange(idx, 'url', e.target.value)}
                                    className="border rounded p-1 flex-1 text-sm"
                                />
                                <button type="button" onClick={() => handleRemoveLink(idx)} className="text-red-500">🗑</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddLink} className="text-sm text-blue-600 underline">+ Add Link</button>
                    </div>

                    {/* Transport Section (Optional) */}
                    <div className="border p-3 rounded bg-gray-50">
                        <h4 className="text-sm font-bold mb-2">Target Transport (Optional)</h4>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <select
                                value={formData.transport?.mode || 'walk'}
                                onChange={e => handleTransportChange('mode', e.target.value)}
                                className="border rounded p-1"
                            >
                                <option value="walk">Walk</option>
                                <option value="drive">Drive</option>
                                <option value="train">Train</option>
                                <option value="taxi">Taxi</option>
                                <option value="flight">Flight</option>
                                <option value="boat">Boat</option>
                                <option value="bus">Bus</option>
                            </select>
                            <input
                                placeholder="Duration (e.g. 15m)"
                                value={formData.transport?.duration || ''}
                                onChange={e => handleTransportChange('duration', e.target.value)}
                                className="border rounded p-1"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
