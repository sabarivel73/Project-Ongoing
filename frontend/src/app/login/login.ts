import { Component, ChangeDetectorRef, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { API_BASE_URL } from '../config';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  userType: 'root' | 'iam' = 'root';
  loginError = '';

  rootCredentials = {
    username: '',
    password: ''
  };

  iamCredentials = {
    domain: '',
    username: '',
    password: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private cd: ChangeDetectorRef,
    private loadingService: LoadingService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const rootUserId = localStorage.getItem('rootUserId');
      if (rootUserId) {
        this.router.navigate(['/root-home-v2b']);
      }

      const iamUserId = localStorage.getItem('iamUserId');
      if (iamUserId) {
        this.router.navigate(['/iam-user-home-v1x']);
      }
    }
  }

  toggleUserType(type: 'root' | 'iam') {
    this.userType = type;
    this.loginError = '';
  }

  onLogin() {
    this.loginError = '';
    this.loadingService.show();
    let url = '';

    if (this.userType === 'root') {
      const input = this.rootCredentials.username;

      if (input.includes('@')) {
        // Email login
        if (input.toLowerCase().endsWith('@gmail.com')) {
          const params = new URLSearchParams({
            email: input,
            password: this.rootCredentials.password
          });
          url = `${API_BASE_URL}/login/rootUser?${params.toString()}`;
        } else {
          this.loginError = 'Only @gmail.com emails are allowed';
          this.loadingService.hide();
          this.cd.detectChanges();
          return;
        }
      } else {
        // Username login
        const params = new URLSearchParams({
          user_name: input,
          password: this.rootCredentials.password
        });
        url = `${API_BASE_URL}/login/rootUser?${params.toString()}`;
      }
    } else {
      const params = new URLSearchParams({
        domain_name: this.iamCredentials.domain,
        user_name: this.iamCredentials.username,
        password: this.iamCredentials.password
      });
      url = `${API_BASE_URL}/login/iamUser?${params.toString()}`;
    }

    console.log('Logging in with URL:', url);

    this.http.get(url, { responseType: 'text' }).subscribe({
      next: (response) => {
        this.loadingService.hide();
        // Normalize response string
        const res = response && response.replace(/^"|"$/g, ''); // Remove surrounding quotes if they exist

        if (this.userType === 'root') {
          if (res.includes('User logged in successfully')) {
            // Extract Root User ID and Name
            const idMatch = res.match(/rootUser ID\s*:\s*(\d+)/i);
            const nameMatch = res.match(/rootUser name\s*:\s*([^\s]+)/i);

            if (idMatch) {
              const rootUserId = idMatch[1];
              // Use name from response if available, else use input (strip @ if email)
              let displayName = nameMatch ? nameMatch[1] : this.rootCredentials.username;
              if (!nameMatch && displayName.includes('@')) {
                displayName = displayName.split('@')[0];
              }

              if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem('rootUserId', rootUserId);
                localStorage.setItem('rootUserName', displayName);
              }
              this.router.navigate(['/root-home-v2b']);
            } else {
              // Backward compatibility for basic success message
              this.router.navigate(['/root-home-v2b']);
            }
          } else {
            this.loginError = res;
          }
        } else {
          if (res.includes('IAM User logged in successfully')) {
            const idMatch = res.match(/iamUser ID\s*:\s*(\d+)/i) || res.match(/id\s*:\s*(\d+)/i);

            if (idMatch) {
              if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem('iamUserId', idMatch[1]);
                localStorage.setItem('iamUserName', this.iamCredentials.username);
                localStorage.setItem('iamDomain', this.iamCredentials.domain);
                localStorage.removeItem('rootUserId'); // Clear old sessions

                this.router.navigate(['/iam-user-home-v1x']);
              } else {
                this.loginError = "Platform error - check environment";
              }
            } else {
              this.loginError = "Login failed: Server response missing User ID";
            }
          } else {
            this.loginError = res || "Invalid response from server";
          }
        }
        this.cd.detectChanges(); // Force view update
      },
      error: (error) => {
        this.loadingService.hide();
        if (this.userType === 'root') {
          this.loginError = 'Invalid Root user details';
        } else {
          this.loginError = 'Invalid IAM user';
        }
        this.cd.detectChanges(); // Force view update
      }
    });
  }
}
