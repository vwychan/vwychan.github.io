import { TripMeta } from '@/types/itinerary';

interface HeroProps {
    meta: TripMeta;
}

export function Hero({ meta }: HeroProps) {
    return (
        <div className="cover">
            <div className="cover-content">
                <h1>{meta.title}</h1>
                <p className="subtitle">{meta.subtitle}</p>
                <div className="date-range">📅 {meta.dateRange}</div>
            </div>
        </div>
    );
}
