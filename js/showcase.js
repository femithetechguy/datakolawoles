// JavaScript for Showcase section functionality

// Helper function to get more specific project icons
function getProjectIcon(projectTitle) {
    const title = projectTitle.toLowerCase();
    
    // Match project titles to appropriate Bootstrap icons
    if (title.includes('sales') || title.includes('revenue')) return 'bi-cash-coin';
    if (title.includes('customer') || title.includes('segmentation')) return 'bi-people-fill';
    if (title.includes('financial') || title.includes('finance')) return 'bi-currency-dollar';
    if (title.includes('market') || title.includes('trend')) return 'bi-graph-up-arrow';
    if (title.includes('supply') || title.includes('chain')) return 'bi-truck';
    if (title.includes('hr') || title.includes('employee')) return 'bi-person-workspace';
    if (title.includes('healthcare') || title.includes('medical')) return 'bi-heart-pulse-fill';
    if (title.includes('retail')) return 'bi-shop';
    if (title.includes('manufacturing')) return 'bi-gear-wide-connected';
    
    // Fallback icons if the more specific ones don't match
    if (title.includes('data')) return 'bi-database-fill';
    if (title.includes('chart') || title.includes('graph')) return 'bi-bar-chart-fill';
    if (title.includes('report')) return 'bi-file-earmark-text';
    if (title.includes('analytics')) return 'bi-graph-up';
    if (title.includes('dashboard')) return 'bi-speedometer2';
    
    // Default icon
    return 'bi-bar-chart-fill';
}

// Create the showcase section HTML
function createShowcaseSection(data) {
    let html = `
        <section class="showcase-section py-3">
            <div class="container">
                <div class="showcase-gallery">
                    <div class="row justify-content-center">
    `;
    
    data.forEach((project, index) => {
        html += `
            <div class="col-md-6 col-lg-3 mb-2">
                <div class="showcase-item animate-fade-in" style="animation-delay: ${(index + 1) * 100}ms;">
                    <div class="card shadow h-100" data-project-id="${project.id}">
                        <div class="card-img-top text-center px-3 py-2 bg-light" id="project-image-${index}">
                            <i class="bi ${getProjectIcon(project.title)} text-primary" style="font-size: 3.75rem;"></i>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title mb-1">${project.title}</h5>
                            <div class="privacy-notice mb-2">
                                <i class="bi bi-shield-lock text-muted"></i>
                                <small class="text-muted fst-italic">Note: For privacy and data security, certain project details have been redacted/ommitted.</small>
              </div>
              <p class="card-text mb-2">${project.description}</p>
              <div class="d-flex flex-wrap gap-2">
                <button class="btn btn-primary btn-sm view-details" data-project-id="${project.id}">View Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  
  html += `
          </div>
        </div>
      </div>
    </section>
  `;
  
  return html;
}


// Initialize showcase viewer
let showcaseViewer;

// Power BI configuration and initialization
class PowerBIManager {
    constructor() {
        this.currentReport = null;
        if (typeof powerbi === 'undefined') {
            throw new Error('Power BI SDK not loaded. Please ensure the SDK script is properly included.');
        }
    }

    async initializeReport(project) {
        try {
            // Get report configuration
            const config = await this.getReportConfig(project);
            if (!config) {
                throw new Error('Failed to get report configuration');
            }

            // Initialize Power BI report
            return await this.embedReport(config);
        } catch (error) {
            console.error('Error initializing Power BI report:', error);
            throw error;
        }
    }

    async getReportConfig(project) {
        try {
            if (!project.powerBI) {
                throw new Error('Power BI configuration not found for project');
            }

            const { embedUrl, reportId, accessToken } = project.powerBI;

            // Validate configuration
            if (!embedUrl || !reportId) {
                throw new Error('Incomplete Power BI configuration: Missing embedUrl or reportId');
            }

            // For now, use the token from config
            if (!accessToken) {
                console.warn('No access token provided in configuration');
            }

            return {
                type: 'report',
                tokenType: powerbi.models.TokenType.Embed,
                accessToken: accessToken || 'dummy-token', // Fallback for testing
                embedUrl,
                id: reportId,
                permissions: powerbi.models.Permissions.All,
                settings: {
                    filterPaneEnabled: true,
                    navContentPaneEnabled: true,
                    background: powerbi.models.BackgroundType.Transparent,
                    ...(project.powerBI.settings || {})
                }
            };
        } catch (error) {
            console.error('Error getting report configuration:', error);
            throw error;
        }
    }

    async embedReport(config) {
        try {
            const container = document.getElementById('powerbi-container');
            if (!container) {
                throw new Error('Report container not found');
            }

            // Embed the report
            const report = powerbi.embed(container, config);

            // Store report instance
            this.currentReport = report;

            // Return report instance
            return report;
        } catch (error) {
            console.error('Error embedding report:', error);
            throw error;
        }
    }

    cleanup() {
        try {
            powerbi.reset(document.getElementById('powerbi-container'));
            this.currentReport = null;
        } catch (error) {
            console.error('Error cleaning up Power BI report:', error);
        }
    }
}

// Handle showcase initialization
function initializeShowcase() {
    // Initialize the Power BI manager
    const powerBIManager = new PowerBIManager();

    // Initialize the showcase viewer with Power BI manager
    showcaseViewer = new ShowcaseViewer({
        onReportTabActivate: async (project) => {
            try {
                return await powerBIManager.initializeReport(project);
            } catch (error) {
                console.error('Failed to initialize report:', error);
                return null;
            }
        },
        onModalClose: () => {
            powerBIManager.cleanup();
        }
    });

    // No need for additional click handlers as they're handled in ShowcaseViewer
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeShowcase);

// Make functions available globally
window.createShowcaseSection = createShowcaseSection;
window.getProjectIcon = getProjectIcon;
window.initializeShowcase = initializeShowcase;
