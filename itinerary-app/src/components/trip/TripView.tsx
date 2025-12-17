'use client';

import { useState, useEffect, useRef } from 'react';
import { TripBooklet } from '@/types/itinerary';
import { Hero } from './Hero';
import { NavTabs } from './NavTabs';
import { DaySection } from './DaySection';
import { Overview } from './Overview';
import { Booklet } from '@/components/layout/Booklet';

interface TripViewProps {
    data: TripBooklet;
}

export function TripView({ data }: TripViewProps) {
    const [activeTab, setActiveTab] = useState('overview');
    const isFirstRun = useRef(true);

    const activeDay = data.days.find(d => d.id === activeTab);

    // Scroll content into view when tab changes
    // Scroll content into view when tab changes
    useEffect(() => {
        // Skip scroll on first render
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        // Do not auto-scroll if switching to Overview
        if (activeTab === 'overview') {
            return;
        }

        const navElement = document.querySelector('.nav-tabs') as HTMLElement;
        const contentAnchor = document.getElementById('trip-content-anchor');

        if (navElement && contentAnchor) {
            // Calculate absolute position of content
            let contentTop = 0;
            let currentElement = contentAnchor as HTMLElement;
            while (currentElement) {
                contentTop += currentElement.offsetTop;
                currentElement = currentElement.offsetParent as HTMLElement;
            }

            // We want to scroll so that the content start is just below the nav bar
            // Target Scroll Y = Content Top - Nav Height
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

            <div id="trip-content-anchor" className="scroll-mt-[100px]">
                {activeTab === 'overview' && <Overview data={data} />}

                {activeDay && (
                    <DaySection
                        day={activeDay}
                        locations={data.locations}
                        accommodations={data.accommodations}
                    />
                )}
            </div>
        </Booklet>
    );
}
