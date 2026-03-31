import { Component, OnInit, signal, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { API_BASE_URL } from '../config';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
    selector: 'app-view-domain',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './view-domain.html',
    styleUrl: './view-domain.scss'
})
export class ViewDomain implements OnInit {
    rootUserId: string | null = null;
    domainId: string | null = null;
    domainName = signal('');

    dashboardData = signal({
        iamUsers: 0,
        announcements: 0,
        pendingQueries: 0
    });

    successMessage = '';
    errorMessage = '';
    showConfirmModal = false;
    showWarningModal = false;
    isMenuOpen = signal(false);
    deleteConfirmInput = '';

    constructor(
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute,
        private loadingService: LoadingService,
        private cd: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    toggleMenu() {
        this.isMenuOpen.set(!this.isMenuOpen());
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            // Read from history state for cleaner URLs
            const currentState = window.history.state;
            if (currentState && currentState.domain_id) {
                this.domainId = currentState.domain_id;
                this.rootUserId = currentState.rootUser_id;
                this.domainName.set(currentState.domain_name || '');
            } else {
                // Fallback to queryParams if state is empty
                this.route.queryParams.subscribe(params => {
                    this.domainId = params['domain_id'];
                    this.rootUserId = params['rootUser_id'];
                    this.domainName.set(params['domain_name'] || '');
                });
            }

            if (!this.rootUserId || !this.domainName()) {
                this.router.navigate(['/root-home-v2b']);
                return;
            }

            // Store domain name for other pages
            localStorage.setItem('storedDomainName', this.domainName());

            this.fetchDomainDashboard();
        }
    }

    fetchDomainDashboard() {
        this.loadingService.show();
        const url = `${API_BASE_URL}/domain/dashboard?rootUser_id=${this.rootUserId}&domain_name=${this.domainName()}`;

        this.http.get(url, { responseType: 'text' }).subscribe({
            next: (response) => {
                this.loadingService.hide();
                // Parse response: "Number of IAM users : 2 and Number of announcement in this domain : 1 and Number of queries yet to response in this domain : 0"
                const iamMatch = response.match(/Number of IAM users\s*:\s*(\d+)/i);
                const announceMatch = response.match(/Number of announcement in this domain\s*:\s*(\d+)/i);
                const queriesMatch = response.match(/Number of queries yet to response in this domain\s*:\s*(\d+)/i);

                this.dashboardData.set({
                    iamUsers: iamMatch ? parseInt(iamMatch[1], 10) : 0,
                    announcements: announceMatch ? parseInt(announceMatch[1], 10) : 0,
                    pendingQueries: queriesMatch ? parseInt(queriesMatch[1], 10) : 0
                });
                this.cd.detectChanges();
            },
            error: (error) => {
                this.loadingService.hide();
                console.error('Error fetching domain dashboard', error);
                this.cd.detectChanges();
            }
        });
    }

    goBack() {
        this.router.navigate(['/domain-explorer-v9z']);
    }

    // Modal sequence for deletion
    openConfirmModal() {
        this.showConfirmModal = true;
    }

    closeModals() {
        this.showConfirmModal = false;
        this.showWarningModal = false;
        this.deleteConfirmInput = '';
    }

    proceedToWarning() {
        this.showConfirmModal = false;
        this.showWarningModal = true;
        this.deleteConfirmInput = '';
    }

    onFinalDelete() {
        if (this.deleteConfirmInput.toLowerCase() !== 'delete') return;

        this.loadingService.show();
        this.errorMessage = '';
        this.successMessage = '';
        this.closeModals();

        const url = `${API_BASE_URL}/domain?id=${this.domainId}`;

        this.http.delete(url, { responseType: 'text' }).subscribe({
            next: (response) => {
                this.loadingService.hide();
                const res = (response || '').replace(/^"|"$/g, '').trim();

                if (res === 'Domain deleted' || res.includes('successfully')) {
                    this.successMessage = 'Domain deleted';
                    this.cd.detectChanges();
                    setTimeout(() => {
                        this.router.navigate(['/domain-explorer-v9z']);
                    }, 1500);
                } else {
                    this.errorMessage = res || 'Failed to delete domain';
                    this.cd.detectChanges();
                }
            },
            error: (error) => {
                this.loadingService.hide();
                console.error('Delete Error:', error);
                this.errorMessage = 'Failed to delete domain. Please try again.';
                this.cd.detectChanges();
            }
        });
    }

    onCreateIAM() {
        this.router.navigate(['/reg-iam-f3n'], {
            state: {
                domain_id: this.domainId,
                rootUser_id: this.rootUserId,
                domain_name: this.domainName()
            }
        });
    }

    onViewIAM() {
        this.router.navigate(['/view-iam-z5x'], {
            state: {
                domain_id: this.domainId,
                rootUser_id: this.rootUserId,
                domain_name: this.domainName()
            }
        });
    }

    onSeeQueries() {
        this.router.navigate(['/queries-v5t'], {
            state: {
                domain_id: this.domainId,
                rootUser_id: this.rootUserId,
                domain_name: this.domainName()
            }
        });
    }

    onPostAnnouncement() {
        this.router.navigate(['/post-announcement-v2x'], {
            state: {
                domain_id: this.domainId,
                rootUser_id: this.rootUserId,
                domain_name: this.domainName()
            }
        });
    }
}
