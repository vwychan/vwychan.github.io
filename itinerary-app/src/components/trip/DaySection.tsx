import { DayItinerary, LocationDetails, Accommodation, TimelineEvent } from '@/types/itinerary';
import { TimelineItem } from './TimelineItem';
import { InfoCard } from './InfoCard';
import { useState } from 'react';
import { EventEditor } from './EventEditor';

interface DaySectionProps {
    day: DayItinerary;
    locations: Record<string, LocationDetails>;
    accommodations: Record<string, Accommodation>;
    tripId: string;
    onAddEvent: (tripId: string, dayId: string, newEvent: TimelineEvent) => Promise<void>;
    onUpdateEvent: (tripId: string, dayId: string, updatedEvent: TimelineEvent, originalEventTitle: string) => Promise<void>;
    onDeleteEvent: (tripId: string, dayId: string, eventTitle: string, eventTime: string) => Promise<void>;
    isEditable?: boolean;
}

export function DaySection({ day, locations, accommodations, tripId, onAddEvent, onUpdateEvent, onDeleteEvent, isEditable = false }: DaySectionProps) {
    const accommodation = (day.accommodationId && accommodations) ? accommodations[day.accommodationId] : undefined;
    const accLocation = accommodation ? locations[accommodation.locationId] : undefined;
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleSaveNewEvent = async (event: TimelineEvent) => {
        await onAddEvent(tripId, day.id, event);
        setIsAddModalOpen(false);
    };

    return (
        <div className="page active" style={{ display: 'block' }}> {/* Helper style for now */}
            <div className="day-page-header">
                <div className="day-number-large" data-weekday={day.weekday}>
                    {day.date}
                </div>
                <div className="day-location">{day.location}</div>
                {isEditable && (
                    <button onClick={() => setIsAddModalOpen(true)} className="bg-green-500 text-white text-xs px-2 py-1 rounded ml-4 hover:bg-green-600">
                        + Add Event
                    </button>
                )}
            </div>

            <div className="info-section">
                {day.weather && (
                    <InfoCard title="🌤️ 天氣預報">
                        <p><strong>氣溫：</strong>{day.weather.temperature}</p>
                        <p><strong>天氣：</strong>{day.weather.condition}</p>
                        <p><strong>穿著建議：</strong>{day.weather.clothing}</p>
                    </InfoCard>
                )}

                {day.tips && day.tips.length > 0 && (
                    <InfoCard title="💡 旅行貼士">
                        <ul>
                            {day.tips.map((tip, idx) => (
                                <li key={idx}>{tip}</li>
                            ))}
                        </ul>
                    </InfoCard>
                )}
            </div>

            <div className="itinerary-section">
                <h3>📍 今日行程</h3>
                {day.events.map((event, idx) => (
                    <TimelineItem
                        key={idx}
                        event={event}
                        location={event.locationId ? locations[event.locationId] : undefined}
                        tripId={tripId}
                        dayId={day.id}
                        onUpdateEvent={isEditable ? onUpdateEvent : undefined}
                        onDeleteEvent={isEditable ? onDeleteEvent : undefined}
                    />
                ))}
            </div>

            {accommodation && (
                <div className="accommodation">
                    <h5>🏨 住宿</h5>
                    <p><strong>{accLocation?.name || accommodation.id}</strong></p>
                    <p>{accLocation?.address}</p>
                    <p>
                        {accommodation.checkIn && `Check-in: ${accommodation.checkIn}`}
                        {accommodation.checkOut && ` | Check-out: ${accommodation.checkOut}`}
                    </p>
                    {accommodation.notes && <p>{accommodation.notes}</p>}
                </div>
            )}

            <EventEditor
                isOpen={isAddModalOpen}
                initialEvent={{ time: '09:00' }}
                onSave={handleSaveNewEvent}
                onCancel={() => setIsAddModalOpen(false)}
                title={`Add Event to ${day.date}`}
            />
        </div>
    );
}
