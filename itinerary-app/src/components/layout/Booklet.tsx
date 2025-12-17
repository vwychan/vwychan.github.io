import React from 'react';

interface BookletProps {
    children: React.ReactNode;
    backgroundImage?: string;
}

export function Booklet({ children, backgroundImage }: BookletProps) {
    return (
        <>
            <div
                className="fixed-background"
                style={backgroundImage ? { backgroundImage: `url('${backgroundImage}')` } : undefined}
            />
            <div className="booklet-container">
                {children}
            </div>
        </>
    );
}
