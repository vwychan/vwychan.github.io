import fs from 'fs';
import path from 'path';
import { TripBooklet } from '@/types/itinerary';

const ITINERARY_DIR = path.join(process.cwd(), 'itinerary');

export function getTripIds(): string[] {
    if (!fs.existsSync(ITINERARY_DIR)) {
        return [];
    }
    const files = fs.readdirSync(ITINERARY_DIR);
    return files
        .filter((file) => file.endsWith('.json'))
        .map((file) => file.replace('.json', ''));
}

export async function getTripData(id: string): Promise<TripBooklet | null> {
    const filePath = path.join(ITINERARY_DIR, `${id}.json`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent) as TripBooklet;
        return data;
    } catch (error) {
        console.error(`Error reading trip data for ${id}:`, error);
        return null;
    }
}

export function getAllTrips(): { id: string; data: TripBooklet }[] {
    const ids = getTripIds();
    const trips: { id: string; data: TripBooklet }[] = [];

    for (const id of ids) {
        const filePath = path.join(ITINERARY_DIR, `${id}.json`);
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const data = JSON.parse(fileContent) as TripBooklet;
            trips.push({ id, data });
        } catch (error) {
            console.error(`Error reading trip data for ${id}:`, error);
        }
    }

    return trips;
}
