import { DayItinerary, LocationDetails, Accommodation } from '@/types/itinerary';
import { TimelineItem } from './TimelineItem';
import { InfoCard } from './InfoCard';

interface DaySectionProps {
    day: DayItinerary;
    locations: Record<string, LocationDetails>;
    accommodations: Record<string, Accommodation>;
}

export function DaySection({ day, locations, accommodations }: DaySectionProps) {
    const accommodation = (day.accommodationId && accommodations) ? accommodations[day.accommodationId] : undefined;
    const accLocation = accommodation ? locations[accommodation.locationId] : undefined;

    return (
        <div className="page active" style={{ display: 'block' }}> {/* Helper style for now */}
            <div className="day-page-header">
                <div className="day-number-large" data-weekday={day.weekday}>
                    {day.date}
                </div>
                <div className="day-location">{day.location}</div>
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
        </div>
    );
}
