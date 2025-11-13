class LilkaRepository {
    constructor() {
        this.currentType = 'apps';
        this.currentPage = 0;
        this.totalPages = 0;
        this.manifests = [];
        this.currentScreenshots = [];
        this.currentLightboxIndex = 0;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupLightboxListeners();
        this.loadPage();
    }

    setupLightboxListeners() {
        const lightbox = document.getElementById('lightbox');
        const lightboxClose = document.getElementById('lightboxClose');
        const lightboxPrev = document.getElementById('lightboxPrev');
        const lightboxNext = document.getElementById('lightboxNext');
        
        lightboxClose.addEventListener('click', () => this.closeLightbox());
        lightboxPrev.addEventListener('click', () => this.prevLightboxImage());
        lightboxNext.addEventListener('click', () => this.nextLightboxImage());
        
        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'flex') {
                if (e.key === 'Escape') this.closeLightbox();
                if (e.key === 'ArrowLeft') this.prevLightboxImage();
                if (e.key === 'ArrowRight') this.nextLightboxImage();
            }
        });
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const type = e.target.dataset.type;
                this.switchType(type);
            });
        });

        // Pagination - top
        document.getElementById('prevPage').addEventListener('click', () => {
            if (this.currentPage > 0) {
                this.currentPage--;
                this.loadPage();
            }
        });

        document.getElementById('nextPage').addEventListener('click', () => {
            if (this.currentPage < this.totalPages - 1) {
                this.currentPage++;
                this.loadPage();
            }
        });

        // Pagination - bottom
        document.getElementById('prevPageBottom').addEventListener('click', () => {
            if (this.currentPage > 0) {
                this.currentPage--;
                this.loadPage();
            }
        });

        document.getElementById('nextPageBottom').addEventListener('click', () => {
            if (this.currentPage < this.totalPages - 1) {
                this.currentPage++;
                this.loadPage();
            }
        });

        // Modal
        const modal = document.getElementById('modal');
        const closeBtn = document.querySelector('.close');

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    switchType(type) {
        this.currentType = type;
        this.currentPage = 0;
        
        // Update active tab
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-type="${type}"]`).classList.add('active');
        
        this.loadPage();
    }

    async loadPage() {
        this.showLoading(true);
        this.hideError();

        try {
            const indexPath = `${this.currentType}/index_${this.currentPage}.json`;
            const response = await fetch(indexPath);
            
            if (!response.ok) {
                throw new Error(`Failed to load ${indexPath}: ${response.status}`);
            }

            const data = await response.json();
            this.totalPages = data.total_pages;
            // Remove trailing comma from manifests array
            this.manifests = data.manifests.filter(m => m && m.trim());
            
            this.loadManifests();
            this.updatePagination();
        } catch (error) {
            this.showError(`Error loading page: ${error.message}`);
            console.error(error);
        } finally {
            this.showLoading(false);
        }
    }

    loadManifests() {
        const itemsContainer = document.getElementById('items');
        itemsContainer.innerHTML = '';

        for (const manifestName of this.manifests) {
            try {
                const manifestPath = `${this.currentType}/${manifestName}/index.json`;
                fetch(manifestPath)
                    .then(response => {
                        if (!response.ok) {
                            console.warn(`Failed to load ${manifestPath}`);
                            return null;
                        }
                        return response.json();
                    })
                    .then(manifest => {
                        if (manifest) {
                            const card = this.createItemCard(manifest, manifestName);
                            itemsContainer.appendChild(card);
                        }
                    })
                    .catch(error => {
                        console.error(`Error loading manifest ${manifestName}:`, error);
                    });
            } catch (error) {
                console.error(`Error loading manifest ${manifestName}:`, error);
            }
        }
    }

    createItemCard(manifest, manifestName) {
        const card = document.createElement('div');
        card.className = 'item-card';
        
        const iconPath = `${this.currentType}/${manifestName}/static/${manifest.icon}`;
        
        card.innerHTML = `
            ${manifest.icon ? `<img src="${iconPath}" alt="${manifest.name}" class="icon" onerror="this.style.display='none'">` : ''}
            <h3>${this.escapeHtml(manifest.name)}</h3>
            <div class="author">${this.escapeHtml(manifest.author)}</div>
            <div class="short-desc">${this.escapeHtml(manifest.short_description)}</div>
        `;

        card.addEventListener('click', () => {
            this.showModal(manifest, manifestName);
        });

        return card;
    }

    showModal(manifest, manifestName) {
        console.log('Opening modal for:', manifestName, manifest);
        
        const modal = document.getElementById('modal');
        const modalBody = document.getElementById('modalBody');
        
        const iconPath = `${this.currentType}/${manifestName}/static/${manifest.icon}`;
        
        // Parse execution file or mod files
        let filesSection = '';
        try {
            if (this.currentType === 'apps' && manifest.executionfile) {
                const execFile = this.parseJsonString(manifest.executionfile);
                if (execFile && execFile.location) {
                    const downloadPath = `${this.currentType}/${manifestName}/static/${execFile.location}`;
                    filesSection = `
                        <div class="modal-section">
                            <h3>📦 Execution File</h3>
                            <p><strong>Type:</strong> ${this.escapeHtml(execFile.type || 'N/A')}</p>
                            <p><strong>File:</strong> ${this.escapeHtml(execFile.location || 'N/A')}</p>
                            <a href="${downloadPath}" download class="download-btn">⬇️ Download Execution File</a>
                        </div>
                    `;
                }
            } else if (this.currentType === 'mods' && manifest.modfiles) {
                const modFiles = this.parseJsonString(manifest.modfiles);
                if (Array.isArray(modFiles)) {
                    filesSection = `
                        <div class="modal-section">
                            <h3>📦 Mod Files</h3>
                            ${modFiles.map(file => {
                                const downloadPath = `${this.currentType}/${manifestName}/static/${file.location}`;
                                return `
                                    <div class="file-item">
                                        <p><strong>${this.escapeHtml(file.type || 'Unknown')}:</strong> ${this.escapeHtml(file.location || 'N/A')}</p>
                                        <a href="${downloadPath}" download class="download-btn-small">⬇️ Download</a>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    `;
                }
            }
        } catch (error) {
            console.error('Error parsing files section:', error);
            filesSection = `
                <div class="modal-section">
                    <h3>📦 Files</h3>
                    <p style="color: var(--error);">Error loading file information</p>
                </div>
            `;
        }

        // Parse sources
        const sources = this.parseJsonString(manifest.sources);
        const sourcesSection = sources ? `
            <div class="modal-section">
                <h3>🔗 Sources</h3>
                <p><strong>Type:</strong> ${this.escapeHtml(sources.type || 'N/A')}</p>
                ${sources.location && sources.location.origin ? 
                    `<p><strong>Repository:</strong> <a href="${this.escapeHtml(sources.location.origin)}" target="_blank" style="color: var(--primary-color);">${this.escapeHtml(sources.location.origin)}</a></p>` 
                    : ''}
            </div>
        ` : '';

        // Create screenshots gallery
        let screenshotsSection = '';
        if (manifest.screenshots && Array.isArray(manifest.screenshots) && manifest.screenshots.length > 0) {
            screenshotsSection = `
                <div class="modal-section">
                    <h3>📷 Screenshots</h3>
                    <div class="screenshots-gallery">
                        ${manifest.screenshots.map((screenshot, index) => {
                            const screenshotPath = `${this.currentType}/${manifestName}/static/${screenshot}`;
                            return `<img src="${screenshotPath}" alt="Screenshot" class="screenshot-thumb" data-index="${index}" onerror="this.style.display='none'">`;
                        }).join('')}
                    </div>
                </div>
            `;
        }
        
        // Store screenshots for lightbox
        this.currentScreenshots = manifest.screenshots ? manifest.screenshots.map(s => 
            `${this.currentType}/${manifestName}/static/${s}`
        ) : [];

        modalBody.innerHTML = `
            <div class="modal-header">
                <h2>${this.escapeHtml(manifest.name)}</h2>
                <div class="author">${this.escapeHtml(manifest.author)}</div>
            </div>
            ${manifest.icon ? `<img src="${iconPath}" alt="${manifest.name}" class="modal-icon" onerror="this.style.display='none'">` : ''}
            ${screenshotsSection}
            <div class="modal-section">
                <h3>📝 Description</h3>
                <pre>${this.escapeHtml(manifest.description)}</pre>
            </div>
            <div class="modal-section">
                <h3>📋 Changelog</h3>
                <pre>${this.escapeHtml(manifest.changelog)}</pre>
            </div>
            ${filesSection}
            ${sourcesSection}
        `;

        modal.style.display = 'block';
        console.log('Modal opened successfully');
        
        // Add click handlers for screenshots after modal is populated
        setTimeout(() => {
            document.querySelectorAll('.screenshot-thumb').forEach(thumb => {
                thumb.addEventListener('click', (e) => {
                    const index = parseInt(e.target.dataset.index);
                    this.openLightbox(index);
                });
            });
        }, 100);
    }

    openLightbox(index) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        
        this.currentLightboxIndex = index;
        lightboxImg.src = this.currentScreenshots[index];
        lightbox.style.display = 'flex';
        
        this.updateLightboxButtons();
    }

    closeLightbox() {
        document.getElementById('lightbox').style.display = 'none';
    }

    nextLightboxImage() {
        if (this.currentLightboxIndex < this.currentScreenshots.length - 1) {
            this.currentLightboxIndex++;
            document.getElementById('lightboxImg').src = this.currentScreenshots[this.currentLightboxIndex];
            this.updateLightboxButtons();
        }
    }

    prevLightboxImage() {
        if (this.currentLightboxIndex > 0) {
            this.currentLightboxIndex--;
            document.getElementById('lightboxImg').src = this.currentScreenshots[this.currentLightboxIndex];
            this.updateLightboxButtons();
        }
    }

    updateLightboxButtons() {
        const prevBtn = document.getElementById('lightboxPrev');
        const nextBtn = document.getElementById('lightboxNext');
        const counter = document.getElementById('lightboxCounter');
        
        prevBtn.style.display = this.currentLightboxIndex > 0 ? 'block' : 'none';
        nextBtn.style.display = this.currentLightboxIndex < this.currentScreenshots.length - 1 ? 'block' : 'none';
        counter.textContent = `${this.currentLightboxIndex + 1} / ${this.currentScreenshots.length}`;
    }

    parseJsonString(str) {
        try {
            // Handle Python dict-like strings
            if (typeof str === 'string') {
                // Replace single quotes with double quotes for JSON parsing
                const jsonStr = str.replace(/'/g, '"');
                return JSON.parse(jsonStr);
            }
            return str;
        } catch (e) {
            console.warn('Failed to parse:', str, e);
            return null;
        }
    }

    updatePagination() {
        // Update prev/next buttons
        const prevDisabled = this.currentPage === 0;
        const nextDisabled = this.currentPage >= this.totalPages - 1;

        document.getElementById('prevPage').disabled = prevDisabled;
        document.getElementById('prevPageBottom').disabled = prevDisabled;
        document.getElementById('nextPage').disabled = nextDisabled;
        document.getElementById('nextPageBottom').disabled = nextDisabled;
        
        // Render page numbers
        this.renderPageNumbers('pageNumbers');
        this.renderPageNumbers('pageNumbersBottom');
    }

    renderPageNumbers(containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        
        const maxButtons = 7; // Maximum number of page buttons to show
        let startPage = Math.max(0, this.currentPage - Math.floor(maxButtons / 2));
        let endPage = Math.min(this.totalPages - 1, startPage + maxButtons - 1);
        
        // Adjust startPage if we're near the end
        if (endPage - startPage < maxButtons - 1) {
            startPage = Math.max(0, endPage - maxButtons + 1);
        }
        
        // First page
        if (startPage > 0) {
            container.appendChild(this.createPageButton(0));
            if (startPage > 1) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'page-ellipsis';
                ellipsis.textContent = '...';
                container.appendChild(ellipsis);
            }
        }
        
        // Page buttons
        for (let i = startPage; i <= endPage; i++) {
            container.appendChild(this.createPageButton(i));
        }
        
        // Last page
        if (endPage < this.totalPages - 1) {
            if (endPage < this.totalPages - 2) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'page-ellipsis';
                ellipsis.textContent = '...';
                container.appendChild(ellipsis);
            }
            container.appendChild(this.createPageButton(this.totalPages - 1));
        }
    }

    createPageButton(pageIndex) {
        const button = document.createElement('button');
        button.className = 'page-btn';
        button.textContent = pageIndex + 1;
        
        if (pageIndex === this.currentPage) {
            button.classList.add('active');
        }
        
        button.addEventListener('click', () => {
            this.currentPage = pageIndex;
            this.loadPage();
        });
        
        return button;
    }

    showLoading(show) {
        document.getElementById('loading').style.display = show ? 'block' : 'none';
        document.getElementById('content').style.display = show ? 'none' : 'block';
    }

    showError(message) {
        const errorDiv = document.getElementById('error');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    hideError() {
        document.getElementById('error').style.display = 'none';
    }

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LilkaRepository();
});
