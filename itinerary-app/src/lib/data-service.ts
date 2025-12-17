import { db } from './firebase';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { TripBooklet, DayItinerary, TimelineEvent } from '@/types/itinerary';

const TRIPS_COLLECTION = 'trips';

export async function getTrip(id: string): Promise<TripBooklet | null> {
    try {
        const docRef = doc(db, TRIPS_COLLECTION, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as TripBooklet;
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting trip:", error);
        return null;
    }
}

export function subscribeToTrip(id: string, callback: (data: TripBooklet | null) => void): () => void {
    const docRef = doc(db, TRIPS_COLLECTION, id);

    // Returns the unsubscribe function
    return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            callback(docSnap.data() as TripBooklet);
        } else {
            console.log("No such document!");
            callback(null);
        }
    }, (error) => {
        console.error("Error listening to trip:", error);
        callback(null);
    });
}

export async function getAllTrips(): Promise<{ id: string; data: TripBooklet }[]> {
    try {
        const querySnapshot = await getDocs(collection(db, TRIPS_COLLECTION));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data() as TripBooklet
        }));
    } catch (error) {
        console.error("Error getting all trips:", error);
        return [];
    }
}

// Helper to remove undefined fields recursively
function cleanUndefined(obj: any): any {
    if (obj && typeof obj === 'object') {
        // Prepare a new object or array
        const cleaned: any = Array.isArray(obj) ? [] : {};

        Object.keys(obj).forEach(key => {
            const value = obj[key];
            if (value !== undefined) {
                cleaned[key] = cleanUndefined(value);
            }
        });
        return cleaned;
    }
    return obj;
}

export async function saveTrip(id: string, data: TripBooklet): Promise<void> {
    try {
        const cleanedData = cleanUndefined(data);
        await setDoc(doc(db, TRIPS_COLLECTION, id), cleanedData);
    } catch (error) {
        console.error("Error saving trip:", error);
        throw error;
    }
}

export async function updateEvent(tripId: string, dayId: string, updatedEvent: TimelineEvent, originalEventTitle: string, originalEventTime?: string): Promise<void> {
    const tripRef = doc(db, TRIPS_COLLECTION, tripId);

    try {
        const tripSnap = await getDoc(tripRef);
        if (!tripSnap.exists()) throw new Error("Trip not found");

        const tripData = tripSnap.data() as TripBooklet;
        const days = [...tripData.days];
        const dayIndex = days.findIndex(d => d.id === dayId);

        if (dayIndex === -1) throw new Error("Day not found");

        const day = { ...days[dayIndex] };
        const events = [...day.events];

        // Try to find by title AND time if provided (more robust), or just title
        let eventIndex = -1;
        if (originalEventTime) {
            eventIndex = events.findIndex(e => e.title === originalEventTitle && e.time === originalEventTime);
        }

        // Fallback to just title if not found (e.g. legacy calls or time mismatch)
        if (eventIndex === -1) {
            eventIndex = events.findIndex(e => e.title === originalEventTitle);
        }

        if (eventIndex !== -1) {
            events[eventIndex] = updatedEvent;
        } else {
            throw new Error("Event to update not found");
        }

        day.events = events;
        // Re-sort if time changed
        day.events.sort((a, b) => a.time.localeCompare(b.time));

        days[dayIndex] = day;

        await updateDoc(tripRef, { days: cleanUndefined(days) });
    } catch (error) {
        console.error("Error updating event:", error);
        throw error;
    }
}

export async function addEvent(tripId: string, dayId: string, newEvent: TimelineEvent): Promise<void> {
    const tripRef = doc(db, TRIPS_COLLECTION, tripId);

    try {
        const tripSnap = await getDoc(tripRef);
        if (!tripSnap.exists()) throw new Error("Trip not found");

        const tripData = tripSnap.data() as TripBooklet;
        const days = [...tripData.days];
        const dayIndex = days.findIndex(d => d.id === dayId);

        if (dayIndex === -1) throw new Error("Day not found");

        const day = { ...days[dayIndex] };
        day.events = [...day.events, newEvent];
        // optional: sort events by time?
        day.events.sort((a, b) => a.time.localeCompare(b.time));

        days[dayIndex] = day;

        await updateDoc(tripRef, { days: cleanUndefined(days) });
    } catch (error) {
        console.error("Error adding event:", error);
        throw error;
    }
}

export async function deleteEvent(tripId: string, dayId: string, eventTitle: string, eventTime: string): Promise<void> {
    const tripRef = doc(db, TRIPS_COLLECTION, tripId);

    try {
        const tripSnap = await getDoc(tripRef);
        if (!tripSnap.exists()) throw new Error("Trip not found");

        const tripData = tripSnap.data() as TripBooklet;
        const days = [...tripData.days];
        const dayIndex = days.findIndex(d => d.id === dayId);

        if (dayIndex === -1) throw new Error("Day not found");

        const day = { ...days[dayIndex] };
        day.events = day.events.filter(e => !(e.title === eventTitle && e.time === eventTime));

        days[dayIndex] = day;
        await updateDoc(tripRef, { days: cleanUndefined(days) });
    } catch (error) {
        console.error("Error deleting event:", error);
        throw error;
    }
}
