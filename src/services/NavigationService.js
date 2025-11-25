/**
 * Service for managing page navigation
 */
export class NavigationService {
    constructor() {
        this.currentPage = 'overview';
    }

    /**
     * Navigate to a page
     * @param {string} pageId - Page ID to navigate to
     */
    navigate(pageId) {
        if (this.currentPage === pageId) return;

        this.currentPage = pageId;

        // Update active tab
        const tabs = document.querySelectorAll('.nav-tab');
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.page === pageId);
        });

        // Update active page
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.toggle('active', page.id === pageId);
        });

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

