import { Component, OnInit, signal, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { API_BASE_URL } from '../config';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
    selector: 'app-root-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './root-dashboard.html',
    styleUrl: './root-dashboard.scss'
})
export class RootDashboard implements OnInit {
    rootUserId: string | null = null;
    rootUserName = signal('');
    dashboardData = signal({
        domains: 0,
        iamUsers: 0
    });
    isMenuOpen = signal(false);

    constructor(
        private http: HttpClient,
        private router: Router,
        private loadingService: LoadingService,
        private cd: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.rootUserId = localStorage.getItem('rootUserId');
            const storedName = localStorage.getItem('rootUserName');
            if (storedName) this.rootUserName.set(storedName);

            if (!this.rootUserId) {
                this.router.navigate(['/auth-v1']);
                return;
            }
            this.fetchDashboardData();
        }
    }

    fetchDashboardData() {
        this.loadingService.show();
        const url = `${API_BASE_URL}/rootUser/dashboard?rootUser_id=${this.rootUserId}`;

        this.http.get(url, { responseType: 'text' }).subscribe({
            next: (response) => {
                this.loadingService.hide();
                // Parse response: "Number of domains : 1 and number of IAM users all domain : 2"
                const domainsMatch = response.match(/Number of domains\s*:\s*(\d+)/i);
                const iamMatch = response.match(/number of IAM users\s*all\s*domain\s*:\s*(\d+)/i);

                if (domainsMatch || iamMatch) {
                    this.dashboardData.set({
                        domains: domainsMatch ? parseInt(domainsMatch[1], 10) : 0,
                        iamUsers: iamMatch ? parseInt(iamMatch[1], 10) : 0
                    });
                }
                this.cd.detectChanges();
            },
            error: (error) => {
                this.loadingService.hide();
                console.error('Error fetching dashboard data', error);
                this.cd.detectChanges();
            }
        });
    }

    toggleMenu() {
        this.isMenuOpen.set(!this.isMenuOpen());
    }

    onLogout() {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.clear();
        }
        // Force a full reload to clear the history buffer and trapped states
        window.location.href = '/auth-v1';
    }

    onEditProfile() {
        this.router.navigate(['/edit-profile-v7y']);
    }

    onCreateDomain() {
        this.router.navigate(['/new-domain-v8x']);
    }

    onViewAllDomains() {
        this.router.navigate(['/domain-explorer-v9z']);
    }
}
