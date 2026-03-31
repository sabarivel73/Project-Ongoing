import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { API_BASE_URL } from '../config';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
    selector: 'app-create-iam-user',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './create-iam-user.html',
    styleUrl: './create-iam-user.scss'
})
export class CreateIamUser implements OnInit {
    rootUserId: string | null = null;
    domainId: string | null = null;
    domainName: string = '';

    name: string = '';
    password: string = '';
    confirmPassword: string = '';
    role: string = '';

    nameDisclaimer: string = '';
    passwordDisclaimer: string = '';
    roleDisclaimer: string = '';
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
            const state = window.history.state;
            if (state && state.domain_id) {
                this.domainId = state.domain_id;
                this.rootUserId = state.rootUser_id;
                this.domainName = state.domain_name;
            } else {
                // If accessed directly without state, we can't really proceed securely if we want hidden params
                this.router.navigate(['/domain-explorer-v9z']);
            }
        }
    }

    requirements = {
        length: false,
        upper: false,
        lower: false,
        number: false,
        symbol: false
    };

    validateName() {
        if (this.name && !/^[A-Za-z\s]+$/.test(this.name)) {
            this.nameDisclaimer = 'Name can only contain letters and spaces';
        } else if (this.name && this.name.length < 3) {
            this.nameDisclaimer = 'Name must be at least 3 characters long';
        } else {
            this.nameDisclaimer = '';
        }
    }

    validatePassword() {
        this.requirements.length = this.password.length >= 8 && this.password.length <= 16;
        this.requirements.upper = /[A-Z]/.test(this.password);
        this.requirements.lower = /[a-z]/.test(this.password);
        this.requirements.number = /[0-9]/.test(this.password);
        this.requirements.symbol = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
    }

    validateRole() {
        if (this.role && !/^[A-Za-z0-9-]+$/.test(this.role)) {
            this.roleDisclaimer = 'Role can only contain letters, numbers, and hyphens';
        } else {
            this.roleDisclaimer = '';
        }
    }

    isFormValid(): boolean {
        return !!this.name &&
            !!this.password &&
            !!this.confirmPassword &&
            this.password === this.confirmPassword &&
            !!this.role &&
            !this.nameDisclaimer &&
            !this.roleDisclaimer &&
            this.requirements.length &&
            this.requirements.upper &&
            this.requirements.lower &&
            this.requirements.number &&
            this.requirements.symbol;
    }

    goBack() {
        this.router.navigate(['/view-domain-k2m'], {
            state: {
                domain_id: this.domainId,
                rootUser_id: this.rootUserId,
                domain_name: this.domainName
            }
        });
    }

    onCreateIamUser() {
        if (!this.isFormValid()) return;

        this.loadingService.show();
        this.errorMessage = '';
        this.successMessage = '';

        const url = `${API_BASE_URL}/domain/iamUser?id=${this.rootUserId}&domain_name=${encodeURIComponent(this.domainName)}`;
        const body = {
            name: this.name,
            password: this.password,
            role: this.role
        };

        this.http.post(url, body, { responseType: 'text' }).subscribe({
            next: (response) => {
                this.loadingService.hide();
                const res = (response || '').replace(/^"|"$/g, '').trim();

                if (res === `IAM user created under this domain - ${this.domainName}`) {
                    this.successMessage = res;
                    setTimeout(() => {
                        this.goBack();
                    }, 2000);
                } else {
                    this.errorMessage = res || 'Failed to create IAM user';
                }
            },
            error: (error) => {
                this.loadingService.hide();
                this.errorMessage = 'An error occurred. Please try again.';
            }
        });
    }
}
