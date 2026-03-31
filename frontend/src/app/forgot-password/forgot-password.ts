import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { API_BASE_URL } from '../config';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss'
})
export class ForgotPassword implements OnInit {
  email: string = '';
  message: string = '';
  isError: boolean = false;
  isInHome: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
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
        if (flow === 'inhome') this.isInHome = true;
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

  onSendOtp() {
    if (!this.email) return;

    this.loadingService.show();
    const url = `${API_BASE_URL}/rootUser/mail?mail=${this.email}`;

    this.http.get(url, { responseType: 'text' }).subscribe({
      next: (response) => {
        this.loadingService.hide();
        const res = response && response.replace(/^"|"$/g, '').trim();
        if (res === 'Email not found') {
          this.message = 'Email not found';
          this.isError = true;
        } else if (res === 'For now we only allow email end up with @gmail.com address') {
          this.message = res;
          this.isError = true;
        } else if (res && res.includes('Mail sent successfully and Id :')) {
          // Extract ID and user_id
          // Format expected: "Mail sent successfully and Id : 1 user_id : 5"
          const idMatch = res.match(/Id\s*:\s*(\d+)/i);
          const userIdMatch = res.match(/user_id\s*:\s*(\d+)/i);

          if (idMatch && userIdMatch) {
            const otpId = idMatch[1];
            const userId = userIdMatch[1];
            if (isPlatformBrowser(this.platformId)) {
              // SECURITY: Once OTP is sent, clear any existing logged-in session
              localStorage.removeItem('rootUserId');
              localStorage.removeItem('rootUserName');
              localStorage.removeItem('iamUserId');

              localStorage.setItem('otpId', otpId);
              localStorage.setItem('resetEmail', this.email);
              // Store the userId returned by the OTP API specifically for the reset
              localStorage.setItem('tempResetUserId', userId);
            }
            this.router.navigate(['/v-secure-9b1']);
          } else if (idMatch) {
            const otpId = idMatch[1];
            if (isPlatformBrowser(this.platformId)) {
              localStorage.removeItem('rootUserId');
              localStorage.removeItem('rootUserName');
              localStorage.removeItem('iamUserId');

              localStorage.setItem('otpId', otpId);
              localStorage.setItem('resetEmail', this.email);
            }
            this.router.navigate(['/v-secure-9b1']);
          }
        } else {
          this.message = 'Mail sent';
          this.isError = false;
        }
      },
      error: (error) => {
        this.loadingService.hide();
        console.error('Error sending OTP', error);
        this.message = 'Error sending OTP. Please try again.';
        this.isError = true;
      }
    });
  }

  goBack() {
    if (this.isInHome) {
      this.router.navigate(['/root-home-v2b']);
    } else {
      this.router.navigate(['/auth-v1']);
    }
  }
}
