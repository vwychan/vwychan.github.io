import { timeToMinutes, minutesToTime } from '../utils/timeUtils.js';
import { StorageService } from './StorageService.js';

/**
 * Service for managing time adjustments
 */
export class TimeAdjustmentService {
    constructor() {
        this.storage = new StorageService();
        this.adjustments = new Map();
        this.originalTimes = new Map();
        this.STORAGE_KEY = 'timeAdjustments';
        this.loadAdjustments();
    }

    /**
     * Load adjustments from storage
     */
    loadAdjustments() {
        const stored = this.storage.get(this.STORAGE_KEY, {});
        Object.entries(stored).forEach(([key, value]) => {
            this.adjustments.set(key, value);
        });
    }

    /**
     * Save adjustments to storage
     */
    saveAdjustments() {
        const data = {};
        this.adjustments.forEach((value, key) => {
            data[key] = value;
        });
        this.storage.set(this.STORAGE_KEY, data);
    }

    /**
     * Store original time for a timeline item
     * @param {string} pageId - Page ID
     * @param {number} index - Timeline item index
     * @param {string} originalTime - Original time string
     */
    storeOriginalTime(pageId, index, originalTime) {
        const key = `${pageId}-${index}`;
        if (!this.originalTimes.has(key)) {
            this.originalTimes.set(key, originalTime);
        }
    }

    /**
     * Get original time for a timeline item
     * @param {string} pageId - Page ID
     * @param {number} index - Timeline item index
     * @returns {string|null} Original time or null
     */
    getOriginalTime(pageId, index) {
        const key = `${pageId}-${index}`;
        return this.originalTimes.get(key) || null;
    }

    /**
     * Adjust times from a specific index onwards
     * @param {string} pageId - Page ID
     * @param {number} startIndex - Starting index
     * @param {number} delayMinutes - Minutes to delay (can be negative)
     */
    adjustTimes(pageId, startIndex, delayMinutes) {
        // Store adjustments
        const key = `${pageId}-${startIndex}`;
        this.adjustments.set(key, delayMinutes);
        this.saveAdjustments();
    }

    /**
     * Get adjusted time for a timeline item
     * @param {string} pageId - Page ID
     * @param {number} index - Timeline item index
     * @returns {string|null} Adjusted time or original time
     */
    getAdjustedTime(pageId, index) {
        // Find the most recent adjustment that applies to this index
        let adjustment = 0;
        for (let i = 0; i <= index; i++) {
            const key = `${pageId}-${i}`;
            if (this.adjustments.has(key)) {
                adjustment = this.adjustments.get(key);
            }
        }

        if (adjustment === 0) {
            return this.getOriginalTime(pageId, index);
        }

        const originalTime = this.getOriginalTime(pageId, index);
        if (!originalTime || originalTime === '自由') {
            return originalTime;
        }

        const originalMinutes = timeToMinutes(originalTime);
        if (originalMinutes === null) {
            return originalTime;
        }

        const newMinutes = originalMinutes + adjustment;
        return minutesToTime(newMinutes);
    }

    /**
     * Reset times from a specific index onwards
     * @param {string} pageId - Page ID
     * @param {number} startIndex - Starting index
     */
    resetTimes(pageId, startIndex) {
        // Remove all adjustments from startIndex onwards
        for (let i = startIndex; i < 100; i++) { // Assume max 100 items per page
            const key = `${pageId}-${i}`;
            if (this.adjustments.has(key)) {
                this.adjustments.delete(key);
            }
        }
        this.saveAdjustments();
    }

    /**
     * Check if a time has been adjusted
     * @param {string} pageId - Page ID
     * @param {number} index - Timeline item index
     * @returns {boolean} True if adjusted
     */
    isAdjusted(pageId, index) {
        for (let i = 0; i <= index; i++) {
            const key = `${pageId}-${i}`;
            if (this.adjustments.has(key)) {
                return true;
            }
        }
        return false;
    }
}

