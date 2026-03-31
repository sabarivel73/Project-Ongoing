import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { API_BASE_URL } from '../config';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
    selector: 'app-edit-profile',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './edit-profile.html',
    styleUrl: './edit-profile.scss'
})
export class EditProfile implements OnInit {
    rootUserId: string | null = null;
    originalName: string = '';
    originalEmail: string = '';
    name: string = '';
    email: string = '';

    nameDisclaimer: string = '';
    emailDisclaimer: string = '';
    errorMessage: string = '';
    successMessage: string = '';

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
                return;
            }
            this.fetchUserDetails();
        }
    }

    fetchUserDetails() {
        this.loadingService.show();
        const url = `${API_BASE_URL}/rootUser/details?id=${this.rootUserId}`;
        this.http.get<any>(url).subscribe({
            next: (data) => {
                this.loadingService.hide();
                this.name = data.name;
                this.email = data.email;
                this.originalName = data.name;
                this.originalEmail = data.email;
            },
            error: (err) => {
                this.loadingService.hide();
                this.errorMessage = 'Failed to load user details';
                console.error(err);
            }
        });
    }

    validateName() {
        if (this.name && !/^[A-Za-z\s]+$/.test(this.name)) {
            this.nameDisclaimer = 'Name field only accepts letters only';
        } else {
            this.nameDisclaimer = '';
        }
    }

    validateEmail() {
        if (this.email && !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(this.email)) {
            this.emailDisclaimer = 'For now we only allow email end up with @gmail.com address';
        } else {
            this.emailDisclaimer = '';
        }
    }

    isModified(): boolean {
        return this.name !== this.originalName || this.email !== this.originalEmail;
    }

    isFormValid(): boolean {
        const nameValid = /^[A-Za-z\s]+$/.test(this.name) && this.name.length > 0;
        const emailValid = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(this.email);
        return nameValid && emailValid && this.isModified();
    }

    onUpdate() {
        if (!this.isFormValid()) return;

        this.loadingService.show();
        this.errorMessage = '';
        this.successMessage = '';

        let url = `${API_BASE_URL}/rootUser?id=${this.rootUserId}`;
        if (this.name !== this.originalName) url += `&name=${encodeURIComponent(this.name)}`;
        if (this.email !== this.originalEmail) url += `&mail=${encodeURIComponent(this.email)}`;

        this.http.put(url, {}, { responseType: 'text' }).subscribe({
            next: (response) => {
                this.loadingService.hide();
                const res = response && response.replace(/^"|"$/g, '').trim();
                if (res === 'Profile edited successfully') {
                    this.successMessage = res;
                    // Update stored name if it changed
                    if (isPlatformBrowser(this.platformId)) {
                        localStorage.setItem('rootUserName', this.name);
                    }
                    setTimeout(() => {
                        this.router.navigate(['/root-home-v2b']);
                    }, 2000);
                } else {
                    this.errorMessage = res;
                }
            },
            error: (err) => {
                this.loadingService.hide();
                this.errorMessage = 'An error occurred. Please try again.';
                console.error(err);
            }
        });
    }

    goBack() {
        this.router.navigate(['/root-home-v2b']);
    }
}
