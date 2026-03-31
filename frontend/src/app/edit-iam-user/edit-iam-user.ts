import { Component, OnInit, signal, Inject, PLATFORM_ID } from '@angular/core';
import { API_BASE_URL } from '../config';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

interface IamUser {
    id: number;
    name: string;
    role: string;
    domain_name: string;
    rootUser_id: number;
}

@Component({
    selector: 'app-edit-iam-user',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './edit-iam-user.html',
    styleUrl: './edit-iam-user.scss'
})
export class EditIamUser implements OnInit {
    user: IamUser | null = null;
    originalRole: string = '';
    role: string = '';
    roleDisclaimer: string = '';

    // Password change fields
    showPasswordModal: boolean = false;
    newPassword: string = '';
    passwordRequirements = {
        length: false,
        upper: false,
        lower: false,
        number: false,
        symbol: false
    };

    errorMessage: string = '';
    successMessage: string = '';

    // Hidden context for back navigation
    domainId: string = '';
    rootUserId: string = '';
    domainName: string = '';

    // Deletion states
    showDeleteModal1: boolean = false;
    showDeleteModal2: boolean = false;
    deleteConfirmationInput: string = '';

    constructor(
        private http: HttpClient,
        private router: Router,
        private loadingService: LoadingService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    // ... existing methods ...

    toggleDeleteModal1() {
        this.showDeleteModal1 = !this.showDeleteModal1;
        this.errorMessage = '';
        this.successMessage = '';
    }

    onProceedToDelete() {
        this.showDeleteModal1 = false;
        this.showDeleteModal2 = true;
        this.deleteConfirmationInput = '';
    }

    toggleDeleteModal2() {
        this.showDeleteModal2 = !this.showDeleteModal2;
        this.deleteConfirmationInput = '';
    }

    onFinalDeleteUser() {
        if (!this.user || this.deleteConfirmationInput.toLowerCase() !== 'delete') return;

        this.loadingService.show();
        this.errorMessage = '';
        this.successMessage = '';

        const url = `${API_BASE_URL}/domain/iamUser?id=${this.user.id}`;

        this.http.delete(url, { responseType: 'text' }).subscribe({
            next: (response) => {
                this.loadingService.hide();
                const res = response && response.replace(/^"|"$/g, '').trim();
                if (res === 'IAM user deleted' || res.includes('successfully')) {
                    this.successMessage = 'IAM user deleted successfully';
                    setTimeout(() => {
                        this.showDeleteModal2 = false;
                        this.goBack();
                    }, 1500);
                } else {
                    this.errorMessage = res;
                }
            },
            error: (err) => {
                this.loadingService.hide();
                console.error('Delete user error:', err);
                this.errorMessage = 'An error occurred while deleting the user.';
            }
        });
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            const state = window.history.state;
            if (state && state.user) {
                this.user = state.user;
                this.role = state.user.role;
                this.originalRole = state.user.role;
                this.domainId = state.domain_id;
                this.rootUserId = state.rootUser_id;
                this.domainName = state.domain_name;
            } else {
                this.router.navigate(['/domain-explorer-v9z']);
            }
        }
    }

    validateRole() {
        if (this.role && !/^[A-Za-z0-9-]+$/.test(this.role)) {
            this.roleDisclaimer = 'Role can only contain letters, numbers, and hyphens';
        } else {
            this.roleDisclaimer = '';
        }
    }

    isRoleModified(): boolean {
        return this.role !== this.originalRole && !!this.role && !this.roleDisclaimer;
    }

    onUpdateRole() {
        if (!this.isRoleModified() || !this.user) return;

        this.loadingService.show();
        this.errorMessage = '';
        this.successMessage = '';

        const url = `${API_BASE_URL}/domain/iamUser?id=${this.user.id}&role=${encodeURIComponent(this.role)}`;

        this.http.put(url, {}, { responseType: 'text' }).subscribe({
            next: (response) => {
                this.loadingService.hide();
                const res = response && response.replace(/^"|"$/g, '').trim();
                if (res === 'IAM user edit successfully') {
                    this.successMessage = res;
                    setTimeout(() => this.goBack(), 1500);
                } else {
                    this.errorMessage = res;
                }
            },
            error: (err) => {
                this.loadingService.hide();
                console.error('Update role error:', err);
                this.errorMessage = 'An error occurred while updating the role.';
            }
        });
    }

    // Password Logic
    togglePasswordModal() {
        this.showPasswordModal = !this.showPasswordModal;
        this.errorMessage = '';
        this.successMessage = '';
        if (!this.showPasswordModal) {
            this.newPassword = '';
            this.resetRequirements();
        }
    }

    checkPasswordRequirements() {
        const p = this.newPassword;
        this.passwordRequirements.length = p.length >= 8 && p.length <= 16;
        this.passwordRequirements.upper = /[A-Z]/.test(p);
        this.passwordRequirements.lower = /[a-z]/.test(p);
        this.passwordRequirements.number = /[0-9]/.test(p);
        this.passwordRequirements.symbol = /[!@#$%^&*(),.?":{}|<>]/.test(p);
    }

    isPasswordValid(): boolean {
        return Object.values(this.passwordRequirements).every(v => v);
    }

    resetRequirements() {
        this.passwordRequirements = {
            length: false,
            upper: false,
            lower: false,
            number: false,
            symbol: false
        };
    }

    onUpdatePassword() {
        if (!this.isPasswordValid() || !this.user) return;

        this.loadingService.show();
        this.errorMessage = '';
        this.successMessage = '';

        const url = `${API_BASE_URL}/domain/iamUser?id=${this.user.id}&password=${encodeURIComponent(this.newPassword)}`;

        this.http.put(url, {}, { responseType: 'text' }).subscribe({
            next: (response) => {
                this.loadingService.hide();
                const res = response && response.replace(/^"|"$/g, '').trim();
                if (res === 'IAM user edit successfully') {
                    this.successMessage = res;
                    // Don't close modal immediately so user sees success message
                    setTimeout(() => {
                        this.showPasswordModal = false;
                        this.goBack();
                    }, 2000);
                } else {
                    this.errorMessage = res;
                }
            },
            error: (err) => {
                this.loadingService.hide();
                console.error('Update password error:', err);
                this.errorMessage = 'An error occurred while updating the password.';
            }
        });
    }

    goBack() {
        this.router.navigate(['/view-iam-z5x'], {
            state: {
                domain_id: this.domainId,
                rootUser_id: this.rootUserId,
                domain_name: this.domainName
            }
        });
    }
}
