import { TimelineEvent, LocationDetails } from '@/types/itinerary';
import { useState } from 'react';
import { EventEditor } from './EventEditor';

interface TimelineItemProps {
    event: TimelineEvent;
    location?: LocationDetails;
    onTimeClick?: (time: string) => void;
    adjustedTime?: string;
    tripId?: string;
    dayId?: string;
    onUpdateEvent?: (tripId: string, dayId: string, updatedEvent: TimelineEvent, originalEventTitle: string, originalEventTime: string) => Promise<void>;
    onDeleteEvent?: (tripId: string, dayId: string, eventTitle: string, eventTime: string) => Promise<void>;
}

export function TimelineItem({ event, location, onTimeClick, adjustedTime, tripId, dayId, onUpdateEvent, onDeleteEvent }: TimelineItemProps) {
    const displayTime = adjustedTime || event.time;
    const isAdjusted = !!adjustedTime && adjustedTime !== event.time;
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleEditSave = async (updatedEvent: TimelineEvent) => {
        if (!tripId || !dayId || !onUpdateEvent) return;
        try {
            await onUpdateEvent(tripId, dayId, updatedEvent, event.title, event.time);
            setIsEditModalOpen(false);
        } catch (e) {
            alert("Failed to update: " + e);
        }
    };

    const handleDelete = async () => {
        if (!tripId || !dayId || !onDeleteEvent) return;
        if (!confirm(`Are you sure you want to delete "${event.title}"?`)) return;

        try {
            await onDeleteEvent(tripId, dayId, event.title, event.time);
        } catch (e) {
            alert("Failed to delete: " + e);
        }
    };

    return (
        <>
            <div className="timeline-item group relative">
                {/* Edit Controls */}
                {(tripId && dayId && onUpdateEvent) && (
                    <div className="absolute right-0 top-0 hidden group-hover:flex gap-1 bg-white/80 p-1 rounded z-10">
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-1 rounded"
                            title="Edit"
                        >
                            ✎
                        </button>
                        {!event.isBooked ? (
                            <button onClick={handleDelete} className="text-xs bg-red-100 hover:bg-red-200 text-red-800 px-1 rounded" title="Delete">
                                ✖
                            </button>
                        ) : (
                            <span className="text-xs text-gray-400 px-1 cursor-not-allowed" title="Cannot delete booked event">
                                🔒
                            </span>
                        )}
                    </div>
                )}

                <div
                    className={`timeline-time ${isAdjusted ? 'adjusted' : ''}`}
                    onClick={() => onTimeClick?.(displayTime)}
                >
                    {displayTime}
                </div>
                <div className="timeline-content relative">
                    <div className="absolute right-0 top-0 flex gap-2">
                        {event.isBooked && <span title="Fixed / Booked">📌</span>}
                        {event.isHighlight && <span title="Highlight">✨</span>}
                    </div>
                    <h4 className="pr-16">{event.title}</h4>
                    <div dangerouslySetInnerHTML={{ __html: event.description }} />
                    {event.notes && (
                        <p className="note" dangerouslySetInnerHTML={{ __html: event.notes }} />
                    )}
                    {location && (
                        <p className="note">
                            <strong>地點：</strong>
                            {location.googleMapLink ? (
                                <a href={location.googleMapLink} target="_blank" rel="noopener noreferrer" className="text-accent-blue underline">
                                    {location.name}
                                </a>
                            ) : (
                                location.name
                            )}
                            <br />
                            {location.address}
                        </p>
                    )}
                </div>
            </div>

            <EventEditor
                isOpen={isEditModalOpen}
                initialEvent={event}
                onSave={handleEditSave}
                onCancel={() => setIsEditModalOpen(false)}
                title="Edit Event"
            />
        </>
    );
}
