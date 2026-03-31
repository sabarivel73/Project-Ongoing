import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { API_BASE_URL } from '../config';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './register.html',
    styleUrl: './register.scss'
})
export class Register implements OnInit {
    name: string = '';
    email: string = '';
    password: string = '';
    confirmPassword: string = '';

    // Status messages for specific fields
    nameDisclaimer: string = '';
    emailDisclaimer: string = '';
    passwordDisclaimer: string = '';

    errorMessage: string = '';
    successMessage: string = '';

    requirements = {
        length: false,
        upper: false,
        lower: false,
        number: false,
        symbol: false
    };

    constructor(
        private http: HttpClient,
        private router: Router,
        private loadingService: LoadingService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            const rootUserId = localStorage.getItem('rootUserId');
            if (rootUserId) {
                this.router.navigate(['/root-home-v2b']);
                return;
            }

            const iamUserId = localStorage.getItem('iamUserId');
            if (iamUserId) {
                // this.router.navigate(['/iam-dashboard']);
            }
        }
    }

    checkRequirements() {
        this.requirements.length = this.password.length >= 8 && this.password.length <= 16;
        this.requirements.upper = /[A-Z]/.test(this.password);
        this.requirements.lower = /[a-z]/.test(this.password);
        this.requirements.number = /[0-9]/.test(this.password);
        this.requirements.symbol = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
    }

    isFormValid(): boolean {
        return this.name.length > 0 &&
            this.email.length > 0 &&
            this.requirements.length &&
            this.requirements.upper &&
            this.requirements.lower &&
            this.requirements.number &&
            this.requirements.symbol &&
            this.password === this.confirmPassword;
    }

    onRegister() {
        if (!this.isFormValid()) return;

        this.clearDisclaimers();
        this.loadingService.show();

        const payload = {
            name: this.name,
            password: this.password,
            email: this.email
        };

        this.http.post(`${API_BASE_URL}/rootUser`, payload, { responseType: 'text' }).subscribe({
            next: (response) => {
                this.loadingService.hide();
                const res = response && response.replace(/^"|"$/g, '').trim();

                if (res === 'User saved') {
                    this.successMessage = 'User registered successfully';
                    setTimeout(() => {
                        this.router.navigate(['/auth-v1']);
                    }, 2000);
                } else {
                    this.handleApiError(res);
                }
            },
            error: (error) => {
                this.loadingService.hide();
                console.error('Registration error', error);
                this.errorMessage = 'An error occurred. Please try again.';
            }
        });
    }

    private clearDisclaimers() {
        this.nameDisclaimer = '';
        this.emailDisclaimer = '';
        this.passwordDisclaimer = '';
        this.errorMessage = '';
        this.successMessage = '';
    }

    private handleApiError(res: string) {
        if (res.includes('Name field only accepts letters only')) {
            this.nameDisclaimer = res;
        } else if (res.includes('User name already exist')) {
            this.nameDisclaimer = res;
        } else if (res.includes('For now we only allow email end up with @gmail.com address')) {
            this.emailDisclaimer = res;
        } else if (res.includes('Email already exist')) {
            this.emailDisclaimer = res;
        } else {
            this.errorMessage = res;
        }
    }
}
