import { NavigationService } from './services/NavigationService.js';
import { TimeAdjustmentService } from './services/TimeAdjustmentService.js';

// Initialize services
const navigationService = new NavigationService();
const timeAdjustmentService = new TimeAdjustmentService();

// Initialize navigation
function initNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPage = tab.dataset.page;
            navigationService.navigate(targetPage);
        });
    });
}

// Initialize time adjustment feature
function initTimeAdjustment() {
    document.querySelectorAll('.page').forEach(page => {
        const pageId = page.id;
        const timeElements = page.querySelectorAll('.timeline-time');

        timeElements.forEach((timeEl, index) => {
            const originalTime = timeEl.textContent.trim();
            
            // Store original time
            timeAdjustmentService.storeOriginalTime(pageId, index, originalTime);
            
            // Skip "自由" times
            if (originalTime === '自由') return;

            // Apply saved adjustments
            const adjustedTime = timeAdjustmentService.getAdjustedTime(pageId, index);
            if (adjustedTime !== originalTime) {
                timeEl.textContent = adjustedTime;
                if (timeAdjustmentService.isAdjusted(pageId, index)) {
                    timeEl.classList.add('adjusted');
                }
            }

            // Add click handler
            timeEl.addEventListener('click', function(e) {
                e.stopPropagation();
                showTimeAdjuster(timeEl, pageId, index, timeElements);
            });
        });
    });
}

// Show time adjustment dialog
function showTimeAdjuster(timeEl, pageId, index, allTimes) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'time-adjuster-overlay';

    // Create adjuster dialog
    const adjuster = document.createElement('div');
    adjuster.className = 'time-adjuster';
    adjuster.innerHTML = `
        <h3>⏰ 調整時間</h3>
        <label>延遲分鐘數（輸入負數可提前）：</label>
        <input type="number" id="delay-input" value="0" min="-999" max="999" step="15" placeholder="例如：30（延遲30分鐘）">
        <div class="time-adjuster-buttons">
            <button class="btn-cancel">取消</button>
            <button class="btn-reset">重置為原時間</button>
            <button class="btn-apply">套用</button>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(adjuster);

    const input = document.getElementById('delay-input');
    input.focus();
    input.select();

    // Cancel button
    adjuster.querySelector('.btn-cancel').addEventListener('click', () => {
        cleanup();
    });

    // Overlay click to close
    overlay.addEventListener('click', () => {
        cleanup();
    });

    // Reset button
    adjuster.querySelector('.btn-reset').addEventListener('click', () => {
        resetTimesFromIndex(pageId, index, allTimes);
        cleanup();
    });

    // Apply button
    adjuster.querySelector('.btn-apply').addEventListener('click', () => {
        const delay = parseInt(input.value) || 0;
        if (delay !== 0) {
            adjustTimesFromIndex(pageId, index, delay, allTimes);
        }
        cleanup();
    });

    // Enter key to apply
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const delay = parseInt(input.value) || 0;
            if (delay !== 0) {
                adjustTimesFromIndex(pageId, index, delay, allTimes);
            }
            cleanup();
        }
    });

    // Escape key to cancel
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            cleanup();
        }
    };
    document.addEventListener('keydown', escapeHandler);

    function cleanup() {
        document.body.removeChild(overlay);
        document.body.removeChild(adjuster);
        document.removeEventListener('keydown', escapeHandler);
    }
}

// Adjust times from a specific index onwards
function adjustTimesFromIndex(pageId, startIndex, delayMinutes, allTimes) {
    // Store the adjustment
    timeAdjustmentService.adjustTimes(pageId, startIndex, delayMinutes);

    // Apply to all times from startIndex
    for (let i = startIndex; i < allTimes.length; i++) {
        const timeEl = allTimes[i];
        const originalTime = timeAdjustmentService.getOriginalTime(pageId, i);

        if (originalTime === '自由' || !originalTime) continue;

        const adjustedTime = timeAdjustmentService.getAdjustedTime(pageId, i);
        timeEl.textContent = adjustedTime;
        timeEl.classList.add('adjusted');
    }
}

// Reset times from a specific index onwards
function resetTimesFromIndex(pageId, startIndex, allTimes) {
    timeAdjustmentService.resetTimes(pageId, startIndex);

    for (let i = startIndex; i < allTimes.length; i++) {
        const timeEl = allTimes[i];
        const originalTime = timeAdjustmentService.getOriginalTime(pageId, i);

        if (!originalTime) continue;

        timeEl.textContent = originalTime;
        timeEl.classList.remove('adjusted');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTimeAdjustment();
});

// Export for potential use in other modules
export { navigationService, timeAdjustmentService };

