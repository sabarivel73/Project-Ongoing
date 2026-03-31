import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { API_BASE_URL } from '../config';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss'
})
export class ChangePassword implements OnInit {
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isInHome: boolean = false;

  requirements = {
    length: false,
    upper: false,
    lower: false,
    number: false,
    symbol: false
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const state = window.history.state;
      if (state && state.flow === 'inhome') {
        this.isInHome = true;
        localStorage.setItem('flow', 'inhome');
      } else {
        const flow = localStorage.getItem('flow');
        this.isInHome = flow === 'inhome';
      }

      const rootUserId = localStorage.getItem('rootUserId');
      if (rootUserId && !localStorage.getItem('otpId') && !this.isInHome) {
        this.router.navigate(['/root-home-v2b']);
      }
    }

    this.route.queryParams.subscribe(params => {
      if (params['flow'] === 'inhome') {
        this.isInHome = true;
        if (isPlatformBrowser(this.platformId)) localStorage.setItem('flow', 'inhome');
      }
    });
  }

  checkRequirements() {
    this.requirements.length = this.newPassword.length >= 8 && this.newPassword.length <= 16;
    this.requirements.upper = /[A-Z]/.test(this.newPassword);
    this.requirements.lower = /[a-z]/.test(this.newPassword);
    this.requirements.number = /[0-9]/.test(this.newPassword);
    this.requirements.symbol = /[!@#$%^&*(),.?":{}|<>]/.test(this.newPassword);
  }

  isFormValid(): boolean {
    return this.requirements.length &&
      this.requirements.upper &&
      this.requirements.lower &&
      this.requirements.number &&
      this.requirements.symbol &&
      this.newPassword === this.confirmPassword;
  }

  onChangePassword() {
    if (!this.isFormValid()) return;

    let userId: string | null = null;
    if (isPlatformBrowser(this.platformId)) {
      userId = localStorage.getItem('tempResetUserId');
    }

    if (!userId) {
      this.errorMessage = 'Session error. Please try again from the beginning.';
      return;
    }

    this.loadingService.show();
    const url = `${API_BASE_URL}/rootUser/change?id=${userId}&password=${this.newPassword}`;

    this.http.put(url, {}, { responseType: 'text' }).subscribe({
      next: (response) => {
        this.loadingService.hide();
        const res = response && response.replace(/^"|"$/g, '').trim();
        if (res === 'Password changes successfully' || res === 'Password changed successfully') {
          this.successMessage = 'Password changed successfully';
          this.errorMessage = '';
          if (isPlatformBrowser(this.platformId)) {
            const flow = localStorage.getItem('flow');
            if (flow === 'inhome') {
              localStorage.removeItem('otpId');
              localStorage.removeItem('flow');
              localStorage.removeItem('resetEmail');
              localStorage.removeItem('tempResetUserId');
              setTimeout(() => {
                this.router.navigate(['/root-home-v2b']);
              }, 1500);
            } else {
              localStorage.clear();
              setTimeout(() => {
                this.router.navigate(['/auth-v1']);
              }, 1500);
            }
          }
        } else {
          this.errorMessage = res;
          this.successMessage = '';
        }
      },
      error: (error) => {
        this.loadingService.hide();
        console.error('Change password error', error);
        this.errorMessage = 'An error occurred. Please try again.';
      }
    });
  }
}
