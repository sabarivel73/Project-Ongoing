import { Component, signal, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { API_BASE_URL } from './config';
import { isPlatformBrowser, CommonModule, PlatformLocation } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { LoaderComponent } from './components/loader/loader.component';
import { browserTransition } from './app.animations';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [browserTransition]
})
export class App implements OnInit {
  protected readonly title = signal('frontend');
  showBackDisclaimer = signal(false);
  private disclaimerTimeout: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cd: ChangeDetectorRef,
    private location: PlatformLocation
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (Capacitor.isNativePlatform()) {
        document.body.classList.add('plt-native');
      }

      // Initial call on load/refresh
      this.callDeleteApi();

      // Pages where browser back-button should be blocked (OTP and Change Password)
      const restrictedPages = ['/v-secure-9b1', '/upd-cred-3f4', '/secure-upd-v4k'];

      // Trap the user on the same page if they use the browser's back arrow on restricted pages
      this.location.onPopState(() => {
        const currentPath = window.location.pathname;
        if (restrictedPages.includes(currentPath)) {
          // Immediately push state back to overwrite the "pop"
          history.pushState(null, '', window.location.href);

          // Show disclaimer for these critical pages
          this.triggerDisclaimer();
          this.cd.detectChanges();
        }
      });

      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: any) => {
        const url = event.urlAfterRedirects;
        const path = url.split('?')[0];

        // Hide disclaimer on successful internal navigation
        this.showBackDisclaimer.set(false);

        // For restricted pages, initialize a deep history buffer to block browser-back
        if (restrictedPages.includes(path)) {
          for (let i = 0; i < 5; i++) {
            history.pushState(null, '', window.location.href);
          }
        }

        this.callDeleteApi();
        this.cd.detectChanges();
      });

      // Handle the initial state if the user refreshes on a restricted page
      const currentPath = window.location.pathname;
      if (restrictedPages.includes(currentPath)) {
        for (let i = 0; i < 5; i++) {
          history.pushState(null, '', window.location.href);
        }
      }
    }
  }

  private triggerDisclaimer() {
    this.showBackDisclaimer.set(true);
    if (this.disclaimerTimeout) clearTimeout(this.disclaimerTimeout);

    this.disclaimerTimeout = setTimeout(() => {
      this.showBackDisclaimer.set(false);
      this.cd.detectChanges();
    }, 4000);
    this.cd.detectChanges();
  }

  private callDeleteApi() {
    const url = `${API_BASE_URL}/rootUser/delete`;
    this.http.get(url, { responseType: 'text' }).subscribe({
      next: () => console.log('Cleanup successful'),
      error: (err) => console.log('Cleanup silent error (expected if CORS):', err)
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    if (!outlet?.isActivated) return '';
    return outlet.activatedRouteData['animation'] || '';
  }
}
