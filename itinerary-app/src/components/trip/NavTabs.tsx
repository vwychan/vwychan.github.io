import { DayItinerary } from '@/types/itinerary';

interface NavTabsProps {
    days: DayItinerary[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export function NavTabs({ days, activeTab, onTabChange }: NavTabsProps) {
    return (
        <div className="nav-tabs">
            <button
                className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => onTabChange('overview')}
            >
                總覽
            </button>
            {days.map((day) => {
                // Format date to MM/DD, assume date string is YYYY-MM-DD or similar
                // Actually the JSON has "date": "11/29" or similar based on sample
                // Let's use the date field directly
                return (
                    <button
                        key={day.id}
                        className={`nav-tab ${activeTab === day.id ? 'active' : ''}`}
                        onClick={() => onTabChange(day.id)}
                    >
                        {day.date}
                    </button>
                );
            })}
        </div>
    );
}
