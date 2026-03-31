import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { API_BASE_URL } from '../config';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
    selector: 'app-in-home-change-password',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './in-home-change-password.html',
    styleUrl: './in-home-change-password.scss'
})
export class InHomeChangePassword implements OnInit {
    rootUserId: string | null = null;
    oldPassword: string = '';
    newPassword: string = '';
    confirmPassword: string = '';

    errorMessage: string = '';
    successMessage: string = '';

    oldPasswordDisclaimer: string = '';
    confirmPasswordDisclaimer: string = '';

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
            this.rootUserId = localStorage.getItem('rootUserId');
            if (!this.rootUserId) {
                this.router.navigate(['/auth-v1']);
                return;
            }
        }
    }

    checkRequirements() {
        this.requirements.length = this.newPassword.length >= 8 && this.newPassword.length <= 16;
        this.requirements.upper = /[A-Z]/.test(this.newPassword);
        this.requirements.lower = /[a-z]/.test(this.newPassword);
        this.requirements.number = /[0-9]/.test(this.newPassword);
        this.requirements.symbol = /[!@#$%^&*(),.?":{}|<>]/.test(this.newPassword);
    }

    validateOldPassword() {
        this.oldPasswordDisclaimer = this.oldPassword ? '' : 'Old password is required';
    }

    validateNewPassword() {
        this.checkRequirements();
    }

    validateConfirmPassword() {
        if (this.confirmPassword && this.newPassword !== this.confirmPassword) {
            this.confirmPasswordDisclaimer = 'Passwords do not match';
        } else {
            this.confirmPasswordDisclaimer = '';
        }
    }

    isFormValid(): boolean {
        const allMet = Object.values(this.requirements).every(v => v);
        return this.oldPassword.length > 0 &&
            allMet &&
            this.newPassword === this.confirmPassword;
    }

    onChangePassword() {
        if (!this.isFormValid()) return;

        this.loadingService.show();
        this.errorMessage = '';
        this.successMessage = '';

        const url = `${API_BASE_URL}/rootUser/inline_change?id=${this.rootUserId}&old_password=${encodeURIComponent(this.oldPassword)}&password=${encodeURIComponent(this.newPassword)}`;

        this.http.put(url, {}, { responseType: 'text' }).subscribe({
            next: (response) => {
                this.loadingService.hide();
                const res = response && response.replace(/^"|"$/g, '').trim();
                if (res === 'Password changed successfully') {
                    this.successMessage = res;
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

    onForgot() {
        this.router.navigate(['/reset-init-7a2'], {
            state: { flow: 'inhome' }
        });
    }

    goBack() {
        this.router.navigate(['/edit-profile-v7y']);
    }
}
