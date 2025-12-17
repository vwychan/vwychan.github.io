import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { getAllTrips } from './itinerary'; // importing from the file-based source

export async function migrateData() {
    console.log("Starting migration...");
    const trips = getAllTrips();
    console.log(`Found ${trips.length} trips to migrate.`);

    for (const trip of trips) {
        try {
            console.log(`Migrating trip: ${trip.id}`);
            await setDoc(doc(db, 'trips', trip.id), trip.data);
            console.log(`Successfully migrated ${trip.id}`);
        } catch (error) {
            console.error(`Failed to migrate ${trip.id}:`, error);
        }
    }
    console.log("Migration complete.");
}

// Allow running this script if called directly (this part is tricky in Next.js env,
// usually better to have a temporary page or API route to trigger it.
// For now, I'll export it and we can make a temporary button in the UI or a script.)
