export interface TripBooklet {
    meta: TripMeta;
    theme?: TripTheme;
    locations: Record<string, LocationDetails>; // Shared location database
    accommodations: Record<string, Accommodation>;
    days: DayItinerary[];
    weatherSummary?: string; // Overall weather info for the trip
}

export interface TripTheme {
    backgroundImage?: string;
    tabIcon?: string;
}

export interface TripMeta {
    title: string;
    subtitle: string;
    dateRange: string;
    overviewDescription: string;
}

export interface DayItinerary {
    id: string;
    date: string;
    weekday: string;
    location: string;
    weather: WeatherInfo;
    tips: string[];
    events: TimelineEvent[];
    accommodationId?: string; // Reference to an ID in the accommodations map
}

export interface WeatherInfo {
    temperature: string;
    condition: string;
    clothing: string;
}

export interface TimelineEvent {
    time: string;
    title: string;
    description: string;
    notes?: string;

    locationId?: string; // Reference to shared location

    // Transport to NEXT location (or generally relevant transport info)
    transport?: TransportInfo;

    links?: Link[];
    isBooked?: boolean;
    isHighlight?: boolean;
}

export interface LocationDetails {
    id: string;
    name: string;
    address: string;
    googleMapLink?: string;
    phone?: string;
    mapCode?: string;
    website?: string;
    region?: string;
}

export interface TransportInfo {
    mode: 'drive' | 'train' | 'walk' | 'taxi' | 'flight' | 'boat' | 'bus';
    duration?: string;
    price?: string;
    notes?: string;
}

export interface Accommodation {
    id: string;
    locationId: string; // Reference to locations map
    checkIn?: string;
    checkOut?: string;
    notes?: string; // note about accommodation
    links?: Link[];
    transport?: TransportInfo; // Transport details (e.g. how to get there, shuttle info)
}

export interface Link {
    text: string;
    url: string;
}
