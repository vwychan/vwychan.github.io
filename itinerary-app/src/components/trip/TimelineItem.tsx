import { TimelineEvent, LocationDetails } from '@/types/itinerary';

interface TimelineItemProps {
    event: TimelineEvent;
    location?: LocationDetails;
    onTimeClick?: (time: string) => void;
    adjustedTime?: string;
}

export function TimelineItem({ event, location, onTimeClick, adjustedTime }: TimelineItemProps) {
    const displayTime = adjustedTime || event.time;
    const isAdjusted = !!adjustedTime && adjustedTime !== event.time;

    return (
        <div className="timeline-item">
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
    );
}
