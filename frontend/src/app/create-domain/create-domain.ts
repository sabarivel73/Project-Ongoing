import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { API_BASE_URL } from '../config';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
    selector: 'app-create-domain',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './create-domain.html',
    styleUrl: './create-domain.scss'
})
export class CreateDomain implements OnInit {
    domainName: string = '';
    errorMessage: string = '';
    successMessage: string = '';
    nameDisclaimer: string = '';
    rootUserId: string | null = null;

    constructor(
        private http: HttpClient,
        private router: Router,
        private loadingService: LoadingService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.rootUserId = localStorage.getItem('rootUserId');
            if (!this.rootUserId) {
                this.router.navigate(['/auth-v1']);
            }
        }
    }

    validateName() {
        if (this.domainName && !/^[A-Za-z0-9-]+$/.test(this.domainName)) {
            this.nameDisclaimer = 'Domain name can only contain letters, numbers, and hyphens';
        } else {
            this.nameDisclaimer = '';
        }
    }

    isFormValid(): boolean {
        return !!this.domainName && !this.nameDisclaimer;
    }

    goBack() {
        this.router.navigate(['/root-home-v2b']);
    }

    onCreateDomain() {
        if (!this.isFormValid() || !this.rootUserId) return;

        this.loadingService.show();
        this.errorMessage = '';
        this.successMessage = '';

        const url = `${API_BASE_URL}/rootUser/domain?name=${encodeURIComponent(this.domainName)}&id=${this.rootUserId}`;

        this.http.post(url, {}, { responseType: 'text' }).subscribe({
            next: (response) => {
                this.loadingService.hide();
                const res = response && response.replace(/^"|"$/g, '').trim();

                if (res === 'Domain created') {
                    this.successMessage = 'Domain created';
                    setTimeout(() => {
                        this.router.navigate(['/root-home-v2b']);
                    }, 1500);
                } else {
                    this.errorMessage = res || 'Failed to create domain';
                }
            },
            error: (error) => {
                this.loadingService.hide();
                console.error('Error creating domain', error);
                this.errorMessage = 'An error occurred. Please try again.';
            }
        });
    }
}
