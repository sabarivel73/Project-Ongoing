import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loader-overlay" *ngIf="(loadingService.loading$ | async) === true">
      <div class="loader-container">
        <div class="spinner"></div>
        <div class="logo-glow"></div>
      </div>
    </div>
  `,
  styles: [`
    .loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(8px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      transition: all 0.3s ease;
    }

    .loader-container {
      position: relative;
      width: 80px;
      height: 80px;
    }

    .spinner {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 3px solid transparent;
      border-top-color: #ffffff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .spinner::before {
      content: '';
      position: absolute;
      top: 5px;
      left: 5px;
      right: 5px;
      bottom: 5px;
      border: 3px solid transparent;
      border-top-color: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      animation: spin 1.5s linear infinite reverse;
    }

    .spinner::after {
      content: '';
      position: absolute;
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      border: 3px solid transparent;
      border-top-color: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      animation: spin 2s linear infinite;
    }

    .logo-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      background: white;
      border-radius: 50%;
      box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.3);
      animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
      50% { opacity: 1; transform: translate(-50%, -50%) scale(1.5); }
    }
  `]
})
export class LoaderComponent {
  constructor(public loadingService: LoadingService) { }
}
