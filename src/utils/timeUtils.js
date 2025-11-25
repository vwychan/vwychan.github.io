/**
 * Convert time string (HH:MM) to minutes
 * @param {string} timeStr - Time string in format "HH:MM" or "自由"
 * @returns {number|null} Minutes since midnight, or null for "自由"
 */
export function timeToMinutes(timeStr) {
    if (timeStr === '自由' || !timeStr) return null;
    
    const parts = timeStr.split(':');
    if (parts.length !== 2) {
        console.warn(`Invalid time format: ${timeStr}`);
        return null;
    }
    
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    
    if (isNaN(hours) || isNaN(minutes)) {
        console.warn(`Invalid time values: ${timeStr}`);
        return null;
    }
    
    return hours * 60 + minutes;
}

/**
 * Convert minutes to time string (HH:MM)
 * @param {number} minutes - Minutes since midnight
 * @returns {string} Time string in format "HH:MM"
 */
export function minutesToTime(minutes) {
    if (minutes === null || minutes === undefined || isNaN(minutes)) {
        console.warn(`Invalid minutes value: ${minutes}`);
        return '00:00';
    }
    
    // Handle negative values and values > 24 hours
    const totalMinutes = minutes % (24 * 60);
    const normalizedMinutes = totalMinutes < 0 ? totalMinutes + (24 * 60) : totalMinutes;
    
    const hours = Math.floor(normalizedMinutes / 60);
    const mins = normalizedMinutes % 60;
    
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

