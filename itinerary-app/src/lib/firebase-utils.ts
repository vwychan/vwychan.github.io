import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { TripBooklet } from '@/types/itinerary';

/**
 * Fetch a trip by ID from Firestore.
 * @param tripId The ID of the trip (e.g., '202512_Taipei')
 */
export async function getTripFromFirestore(tripId: string): Promise<TripBooklet | null> {
    try {
        const docRef = doc(db, 'trips', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as TripBooklet;
        } else {
            console.log("No such document in Firestore!");
            return null;
        }
    } catch (error) {
        console.error("Error getting document from Firestore:", error);
        return null;
    }
}
