import React from 'react';

interface InfoCardProps {
    title: string; // includes icon if passed as string
    children: React.ReactNode;
}

export function InfoCard({ title, children }: InfoCardProps) {
    return (
        <div className="info-card">
            <h4>{title}</h4>
            {children}
        </div>
    );
}
