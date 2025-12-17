'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import taipeiTrip from '../../../../itinerary/202512_Taipei.json';

export default function MigratePage() {
    const [status, setStatus] = useState('Ready');

    const handleMigrate = async () => {
        setStatus('Migrating...');
        try {
            // 1. Upload Taipei Trip
            await setDoc(doc(db, 'trips', '202512_Taipei'), taipeiTrip);

            setStatus('Success! Data uploaded to Firestore.');
        } catch (error) {
            console.error(error);
            setStatus('Error: ' + (error as Error).message);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Data Migration</h1>
            <p className="mb-4">Current Status: {status}</p>
            <button
                onClick={handleMigrate}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Upload Taipei Trip to Firebase
            </button>
        </div>
    );
}
