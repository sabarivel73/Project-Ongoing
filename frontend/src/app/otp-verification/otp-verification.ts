import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { API_BASE_URL } from '../config';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './otp-verification.html',
  styleUrl: './otp-verification.scss'
})
export class OtpVerification implements OnInit {
  otp: string[] = ['', '', '', ''];
  email: string = '';
  errorMessage: string = '';
  otpId: string | null = null;
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
        this.isInHome = flow === 'inhome';
      }

      const rootUserId = localStorage.getItem('rootUserId');
      const otpId = localStorage.getItem('otpId');

      if (rootUserId && !otpId && !this.isInHome) {
        this.router.navigate(['/root-home-v2b']);
        return;
      }

      this.email = localStorage.getItem('resetEmail') || '';
      this.otpId = otpId;
      if (!this.otpId) {
        this.router.navigate(['/reset-init-7a2']);
      }
    }

    this.route.queryParams.subscribe(params => {
      if (params['flow'] === 'inhome') {
        this.isInHome = true;
        if (isPlatformBrowser(this.platformId)) localStorage.setItem('flow', 'inhome');
      }
    });
  }

  onOtpChange(event: any, index: number) {
    const value = event.target.value;
    if (value && index < 3) {
      const nextInput = event.target.nextElementSibling;
      if (nextInput) nextInput.focus();
    }
  }

  onVerify() {
    const otpValue = this.otp.join('');
    if (otpValue.length < 4) return;

    if (!this.otpId) return;

    this.loadingService.show();
    const url = `${API_BASE_URL}/rootUser/validation?id=${this.otpId}&value=${otpValue}`;

    this.http.get(url, { responseType: 'text' }).subscribe({
      next: (response) => {
        this.loadingService.hide();
        const res = response && response.replace(/^"|"$/g, '').trim();
        if (res === 'OTP verified successfully') {
          this.router.navigate(['/upd-cred-3f4']);
        } else if (res === 'OTP was wrong') {
          this.errorMessage = 'OTP was wrong';
        } else if (res === 'OTP expired try again') {
          this.errorMessage = 'OTP expired try again';
          setTimeout(() => {
            this.router.navigate(['/reset-init-7a2']);
          }, 2000);
        } else {
          this.errorMessage = res;
        }
      },
      error: (error) => {
        this.loadingService.hide();
        console.error('OTP verification error', error);
        this.errorMessage = 'An error occurred. Please try again.';
      }
    });
  }
}
