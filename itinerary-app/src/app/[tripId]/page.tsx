import { getAllTrips, getTripData } from '@/lib/itinerary';
import { Metadata } from 'next';
import { TripView } from '@/components/trip/TripView';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ tripId: string }>;
}

export async function generateStaticParams() {
    const trips = getAllTrips();
    return trips.map((trip) => ({
        tripId: trip.id,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { tripId } = await params;
    const data = await getTripData(tripId);

    if (!data) {
        return {
            title: 'Trip Not Found'
        };
    }

    return {
        title: data.meta.title,
        description: data.meta.subtitle,
        icons: { icon: data.theme?.tabIcon || '/img/Trippie_logo.jpg' },
    };
}

export default async function TripPage({ params }: PageProps) {
    const { tripId } = await params;
    const data = await getTripData(tripId);

    if (!data) {
        notFound();
    }

    return <TripView data={data} />;
}
