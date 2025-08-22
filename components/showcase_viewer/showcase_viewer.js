// Showcase Viewer Component
class ShowcaseViewer {
    static TABS = {
        REQUIREMENTS: 'requirements',
        IMPLEMENTATION: 'implementation',
        REPORT: 'report'
    };

    static FADE_DURATION = 200; // milliseconds

    constructor(options = {}) {
        this.currentProjectId = null;
        this.activeTab = ShowcaseViewer.TABS.REQUIREMENTS;
        this.modal = null;
        this.contentArea = null;
        this.modalElement = null;
        this.reportConfig = options.reportConfig || null; // PowerBI report configuration
        this.onModalClose = options.onModalClose || null;
        this.initialize();
    }

    initialize() {
        // Create modal structure only once
        this.createModal();
        this.setupEventListeners();
    }

    createModal() {
        // Create modal structure if it doesn't exist
        if (!document.getElementById('showcase-viewer-modal')) {
            const modalHTML = `
                <div class="modal fade" id="showcase-viewer-modal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <div>
                                    <h5 class="modal-title mb-1"></h5>
                                    <div class="privacy-notice">
                                        <i class="bi bi-shield-lock text-muted"></i>
                                        <small class="text-muted fst-italic">Note: For privacy and data security, certain project details have been redacted/omitted.</small>
                                    </div>
                                </div>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <ul class="nav nav-tabs" id="showcase-tabs">
                                    <li class="nav-item">
                                        <button class="nav-link active" data-tab="requirements">
                                            <i class="bi bi-clipboard-check"></i> Requirements
                                        </button>
                                    </li>
                                    <li class="nav-item">
                                        <button class="nav-link" data-tab="implementation">
                                            <i class="bi bi-gear"></i> Implementation
                                        </button>
                                    </li>
                                    <li class="nav-item">
                                        <button class="nav-link" data-tab="report">
                                            <i class="bi bi-file-earmark-bar-graph"></i> Report
                                        </button>
                                    </li>
                                </ul>
                                <div class="tab-content mt-3" id="showcase-content">
                                    <!-- Content will be loaded here -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
        
        // Always get fresh references to modal elements
        this.modalElement = document.getElementById('showcase-viewer-modal');
        this.modal = new bootstrap.Modal(this.modalElement);
        this.contentArea = document.getElementById('showcase-content');
        
        // Add modal hidden event listener
        this.modalElement.addEventListener('hidden.bs.modal', () => {
            this.currentProjectId = null;
            this.activeTab = 'requirements';
            
            // Call onModalClose callback if provided
            if (this.onModalClose) {
                this.onModalClose();
            }
            
            // Clean up modal backdrop and restore page state
            document.body.classList.remove('modal-open');
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
                backdrop.remove();
            }
            document.body.style.removeProperty('padding-right');
            document.body.style.removeProperty('overflow');
        });
    }

    setupEventListeners() {
        // Tab click handlers
        document.getElementById('showcase-tabs').addEventListener('click', (e) => {
            const tabButton = e.target.closest('[data-tab]');
            if (tabButton) {
                this.switchTab(tabButton.dataset.tab);
            }
        });

        // Setup project card and view details click listeners
        document.addEventListener('click', (e) => {
            const projectCard = e.target.closest('[data-project-id]');
            const viewDetailsBtn = e.target.closest('.view-details');
            
            if (viewDetailsBtn) {
                e.preventDefault();
                const projectId = viewDetailsBtn.dataset.projectId;
                if (projectId) {
                    this.showProject(projectId);
                }
            } else if (projectCard && !e.target.closest('.view-details')) {
                e.preventDefault();
                this.showProject(projectCard.dataset.projectId);
            }
        });
    }

    async showProject(projectId) {
        try {
            // Ensure modal is initialized
            if (!this.modal) {
                this.createModal();
            }
            
            // Force home button hide
            document.body.classList.add('modal-open');
            const homeBtn = document.querySelector('.floating-home-btn');
            if (homeBtn) {
                homeBtn.style.visibility = 'hidden';
                homeBtn.style.opacity = '0';
                homeBtn.style.pointerEvents = 'none';
            }

            // Get project data
            const response = await fetch('json/showcase.json');
            if (!response.ok) {
                throw new Error(`Failed to fetch project data (${response.status})`);
            }
            const projects = await response.json();
            const project = projects.find(p => p.id === projectId);

            if (!project) {
                throw new Error(`Project with ID "${projectId}" not found`);
            }

            // Update modal title
            document.querySelector('#showcase-viewer-modal .modal-title').textContent = project.title;
            
            // Store current project
            this.currentProjectId = projectId;

            // Reset to requirements tab
            document.querySelectorAll('#showcase-tabs .nav-link').forEach(link => {
                link.classList.toggle('active', link.dataset.tab === 'requirements');
            });

            // Load initial tab content (requirements by default)
            await this.loadTabContent('requirements', project);

            // Show modal
            this.modal.show();
        } catch (error) {
            console.error('Error showing project:', error);
        }
    }

    async switchTab(tabId) {
        if (!this.currentProjectId) return;

        // Update active tab state
        document.querySelectorAll('#showcase-tabs .nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.tab === tabId);
        });

        try {
            // Get current project data
            const response = await fetch('/json/showcase.json');
            const projects = await response.json();
            const project = projects.find(p => p.id === this.currentProjectId);

            if (!project) return;

            // Load new tab content with transition
            const contentArea = document.getElementById('showcase-content');
            contentArea.style.opacity = '0';
            
            await this.loadTabContent(tabId, project);
            
            // Fade in new content
            setTimeout(() => {
                contentArea.style.opacity = '1';
            }, ShowcaseViewer.FADE_DURATION);
        } catch (error) {
            console.error('Error switching tab:', error);
        }
    }

    showLoadingState() {
        return `
            <div class="content-area p-3 text-center">
                <div class="loading-spinner mb-2">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <p class="text-muted">Loading content...</p>
            </div>
        `;
    }

    showErrorState(error) {
        return `
            <div class="content-area p-3">
                <div class="alert alert-danger mb-0">
                    <div class="d-flex align-items-center">
                        <i class="bi bi-exclamation-triangle-fill me-2"></i>
                        <div>
                            <h6 class="alert-heading mb-1">Error Loading Content</h6>
                            <p class="mb-0">${error}</p>
                        </div>
                    </div>
                    <button class="btn btn-outline-danger btn-sm mt-2" onclick="window.showcaseViewer.retryLoad()">
                        <i class="bi bi-arrow-clockwise me-1"></i> Retry
                    </button>
                </div>
            </div>
        `;
    }

    async retryLoad() {
        if (this.currentProjectId && this.activeTab) {
            const response = await fetch('json/showcase.json');
            const projects = await response.json();
            const project = projects.find(p => p.id === this.currentProjectId);
            if (project) {
                await this.loadTabContent(this.activeTab, project);
            }
        }
    }

    async loadTabContent(tabId, project) {
        // Store current tab
        this.activeTab = tabId;

        // Handle Power BI report tab separately
        if (tabId === ShowcaseViewer.TABS.REPORT) {
            this.contentArea.style.opacity = '0';
            setTimeout(() => {
                this.contentArea.innerHTML = `
                    <div class="report-container">
                        <div id="powerbi-container"></div>
                    </div>
                `;
                this.contentArea.style.opacity = '1';
                
                // Call the dedicated Power BI embedding function
                this.embedPowerBIReport(project);
            }, ShowcaseViewer.FADE_DURATION);
            return;
        }

        // Show loading state with fade for other tabs
        this.contentArea.style.opacity = '0';
        setTimeout(() => {
            this.contentArea.innerHTML = this.showLoadingState();
            this.contentArea.style.opacity = '1';
        }, ShowcaseViewer.FADE_DURATION);

        try {
            // Get the markdown content
            const markdownPath = project.contentPaths[tabId];
            const response = await fetch(markdownPath);
            
            if (!response.ok) {
                throw new Error(`Failed to load content (${response.status})`);
            }

            const content = await response.text();

            // Fade out current content
            this.contentArea.style.opacity = '0';
            
            // Update content after fade out
            setTimeout(() => {
                // Process markdown
                const processedContent = content
                    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/`([^`]+)`/g, '<code>$1</code>')
                    .replace(/^- (.*$)/gm, '<li>$1</li>')
                    .replace(/<\/li>\n<li>/g, '</li><li>')
                    .replace(/^(?:<li>.*<\/li>\n?)+$/gm, '<ul>$&</ul>')
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/^(.+)$/gm, '<p>$1</p>');

                this.contentArea.innerHTML = `
                    <div class="content-area">
                        <div class="content-text">${processedContent}</div>
                    </div>
                `;
                // Fade in new content
                this.contentArea.style.opacity = '1';
            }, ShowcaseViewer.FADE_DURATION);

        } catch (error) {
            console.error('Error loading tab content:', error);
            
            // Fade out current content
            this.contentArea.style.opacity = '0';
            
            // Show error state after fade
            setTimeout(() => {
                this.contentArea.innerHTML = this.showErrorState(
                    error.message || 'Failed to load content. Please try again.'
                );
                this.contentArea.style.opacity = '1';
            }, 200);
        }
    }

    async embedPowerBIReport(project) {
        try {
            // Show loading state in the container
            const container = document.getElementById('powerbi-container');
            container.innerHTML = `
                <div class="loading">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div>Loading report...</div>
                </div>
            `;

            if (!project.powerBI || !project.powerBI.embedUrl) {
                throw new Error('No PowerBI configuration found for this project');
            }

            // Create iframe for playground embed
            const iframe = document.createElement('iframe');
            iframe.className = 'powerbi-report-frame';
            iframe.title = 'Power BI Report';
            iframe.allowFullscreen = true;

            // Construct embed URL with settings
            const settings = project.powerBI.settings || {};
            const queryParams = new URLSearchParams({
                navContentPaneEnabled: settings.navContentPaneEnabled ?? true,
                filterPaneEnabled: settings.filterPaneEnabled ?? true,
                background: settings.background ?? 'transparent',
                layoutType: settings.layoutType ?? 'master',
                zoomLevel: settings.zoomLevel ?? 1.0
            });

            iframe.src = `${project.powerBI.embedUrl}&${queryParams.toString()}`;

            // Clear container and add iframe
            container.innerHTML = '';
            container.appendChild(iframe);

            // Set up event listener for iframe load
            iframe.addEventListener('load', () => {
                console.log('Report loaded successfully');
            });

        } catch (error) {
            this.showReportError(error.message || 'Failed to load report');
        }
    }

    showReportError(message) {
        const container = document.getElementById('powerbi-container');
        container.innerHTML = `
            <div class="loading">
                <div class="alert alert-danger mb-0">
                    <div class="d-flex align-items-center">
                        <i class="bi bi-exclamation-triangle-fill me-2"></i>
                        <div>
                            <h6 class="alert-heading mb-1">Error Loading Report</h6>
                            <p class="mb-0">${message}</p>
                        </div>
                    </div>
                    <button class="btn btn-outline-danger btn-sm mt-2" onclick="window.showcaseViewer.retryLoad()">
                        <i class="bi bi-arrow-clockwise me-1"></i> Retry
                    </button>
                </div>
            </div>
        `;
    }
}

// Styles are now loaded from showcase_viewer.css

// Export component
window.ShowcaseViewer = ShowcaseViewer;

// Initialize component
document.addEventListener('DOMContentLoaded', () => {
    window.showcaseViewer = new ShowcaseViewer();
});
