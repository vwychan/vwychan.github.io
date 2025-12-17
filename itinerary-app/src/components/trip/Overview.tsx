import { TripBooklet } from '@/types/itinerary';

interface OverviewProps {
    data: TripBooklet;
}

export function Overview({ data }: OverviewProps) {
    const highlights = data.days.map(day => ({
        dayLabel: `Day ${day.id.replace('day', '')} (${day.date})`,
        location: day.location,
        highlights: day.events.filter(e => e.isHighlight).map(e => e.title).join('、')
    }));

    const accommodationList = data.accommodations ? Object.values(data.accommodations).map(acc => {
        const loc = data.locations[acc.locationId];
        return {
            name: loc ? loc.name : acc.id,
            address: loc ? loc.address : '',
            notes: acc.notes
        }
    }) : [];

    return (
        <div className="page active" style={{ display: 'block' }}>
            <div className="day-page-header">
                <h2 className="day-location" style={{ fontSize: '2.5rem' }}>🗺️ 行程總覽</h2>
                <p style={{ color: 'var(--ink-medium)', marginTop: '0.5rem' }}>{data.meta.subtitle}</p>
            </div>

            <div className="route-map">
                <h3 style={{ color: 'var(--accent-blue)', marginBottom: '1rem' }}>旅行路線</h3>
                <div className="route-flow">
                    {/* Simple text based flow for now, can be enhanced to visualize graph */}
                    {data.days.map((day, idx) => (
                        <div key={day.id} className="flex items-center">
                            <div className="route-stop">
                                {day.location}<br />
                                <small>{day.date}</small>
                            </div>
                            {idx < data.days.length - 1 && <div className="route-arrow mx-2">→</div>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="itinerary-section">
                <h3>📅 每日亮點</h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {highlights.map((item, idx) => (
                        <div key={idx} style={{ padding: '1rem', background: 'var(--paper-light)', borderRadius: '6px' }}>
                            <strong style={{ color: 'var(--accent-red)' }}>{item.dayLabel}</strong> - {item.highlights || '自由活動 / 移動日'}
                        </div>
                    ))}
                </div>
            </div>

            <div className="itinerary-section">
                <h3>🏨 住宿資訊</h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {accommodationList.map((acc, idx) => (
                        <div key={idx} style={{ padding: '1rem', background: 'var(--paper-light)', borderRadius: '6px' }}>
                            <strong style={{ color: 'var(--accent-blue)' }}>{acc.name}</strong><br />
                            {acc.address && <small>{acc.address}</small>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
