'use client';

import { useState, useEffect, useRef } from 'react';
import { TripBooklet } from '@/types/itinerary';
import { Hero } from './Hero';
import { NavTabs } from './NavTabs';
import { DaySection } from './DaySection';
import { Overview } from './Overview';
import { Booklet } from '@/components/layout/Booklet';
import { subscribeToTrip, addEvent, updateEvent, deleteEvent } from '@/lib/data-service';
import { LoginButton } from '../auth/LoginButton';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Allowlist configuration
const ALLOWED_EMAILS = [
    "vchanwy5@gmail.com", // Replace with actual email
    "fifth.jpn@gmail.com",
    "pearl.lai085@gmail.com",
];

interface TripViewProps {
    data: TripBooklet;
    tripId: string;
}

export function TripView({ data: initialData, tripId }: TripViewProps) {
    const [data, setData] = useState<TripBooklet>(initialData);
    const [activeTab, setActiveTab] = useState('overview');
    const [user, setUser] = useState<User | null>(null);
    const isFirstRun = useRef(true);

    // Auth Subscription
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Check if user is allowed to edit
    const isEditable = user?.email && ALLOWED_EMAILS.includes(user.email);

    // Subscribe to real-time updates
    useEffect(() => {
        const unsubscribe = subscribeToTrip(tripId, (newData) => {
            if (newData) {
                setData(newData);
            }
        });
        return () => unsubscribe();
    }, [tripId]);

    const activeDay = data.days.find(d => d.id === activeTab);

    // Scroll content into view when tab changes
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        if (activeTab === 'overview') return;

        const navElement = document.querySelector('.nav-tabs') as HTMLElement;
        const contentAnchor = document.getElementById('trip-content-anchor');

        if (navElement && contentAnchor) {
            let contentTop = 0;
            let currentElement = contentAnchor as HTMLElement;
            while (currentElement) {
                contentTop += currentElement.offsetTop;
                currentElement = currentElement.offsetParent as HTMLElement;
            }
            const navHeight = navElement.offsetHeight;
            const targetScrollY = contentTop - navHeight;
            window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
        }
    }, [activeTab]);

    return (
        <Booklet backgroundImage={data.theme?.backgroundImage}>
            <NavTabs
                days={data.days}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <Hero meta={data.meta} />

            <div id="trip-content-anchor" className="scroll-mt-[100px] pb-20">
                {activeTab === 'overview' && <Overview data={data} />}

                {activeDay && (
                    <DaySection
                        day={activeDay}
                        locations={data.locations}
                        accommodations={data.accommodations}
                        tripId={tripId}
                        onAddEvent={addEvent}
                        onUpdateEvent={updateEvent}
                        onDeleteEvent={deleteEvent}
                        isEditable={!!isEditable}
                    />
                )}
            </div>

            {/* Sticky Bottom Bar for Auth */}
            <div className="fixed bottom-0 left-0 right-0 p-2 z-50 flex justify-end pointer-events-none">
                <div className="pointer-events-auto bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-white/50">
                    <LoginButton user={user} />
                </div>
            </div>
        </Booklet>
    );
}
