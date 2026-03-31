import { Component, OnInit, signal, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { API_BASE_URL } from '../config';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
    selector: 'app-create-announcement',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './create-announcement.html',
    styleUrl: './create-announcement.scss'
})
export class CreateAnnouncement implements OnInit {
    domainId: string | null = null;
    rootUserId: string | null = null;
    domainName = signal('');
    content = '';
    selectedFile: File | null = null;
    fileName = signal('');
    errorMessage = '';
    successMessage = '';

    constructor(
        private http: HttpClient,
        private router: Router,
        private loadingService: LoadingService,
        private cd: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            const currentState = window.history.state;
            if (currentState && currentState.domain_name) {
                this.domainId = currentState.domain_id;
                this.rootUserId = currentState.rootUser_id;
                this.domainName.set(currentState.domain_name);
            }

            if (!this.domainName()) {
                this.router.navigate(['/root-home-v2b']);
            }
        }
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
            this.fileName.set(file.name);
        }
    }

    removeFile() {
        this.selectedFile = null;
        this.fileName.set('');
    }

    isFormValid(): boolean {
        return (this.content.trim().length > 0 || this.selectedFile !== null);
    }

    onPost() {
        if (!this.isFormValid()) {
            this.errorMessage = 'Either content or file any one must be fill to post announcement';
            return;
        }

        this.loadingService.show();
        this.errorMessage = '';
        this.successMessage = '';

        const formData = new FormData();
        formData.append('rootUser_id', this.rootUserId || '1');
        formData.append('domain_name', this.domainName());
        if (this.content.trim()) {
            formData.append('content', this.content.trim());
        }
        if (this.selectedFile) {
            formData.append('attachment', this.selectedFile);
        }

        this.http.post(`${API_BASE_URL}/announcement`, formData, { responseType: 'text' }).subscribe({
            next: (response) => {
                this.loadingService.hide();
                const res = (response || '').replace(/^"|"$/g, '').trim();
                if (res === 'Announcement posted successfully') {
                    this.successMessage = res;
                    this.cd.detectChanges();
                    setTimeout(() => {
                        this.goBack();
                    }, 1500);
                } else {
                    this.errorMessage = res || 'Failed to post announcement';
                    this.cd.detectChanges();
                }
            },
            error: (err) => {
                this.loadingService.hide();
                console.error('Error posting announcement:', err);
                this.errorMessage = 'Network error. Please try again.';
                this.cd.detectChanges();
            }
        });
    }

    goBack() {
        this.router.navigate(['/post-announcement-v2x'], {
            state: {
                domain_id: this.domainId,
                rootUser_id: this.rootUserId,
                domain_name: this.domainName()
            }
        });
    }
}
