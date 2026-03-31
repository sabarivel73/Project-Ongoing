import { Component, OnInit, signal, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { API_BASE_URL } from '../config';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

interface Announcement {
    id: number;
    content: string | null;
    attachmentType: string | null;
    attachmentUrl: string | null;
    attachmentKey: string | null;
    domain_name: string;
    rootUser_id: number;
    timestamp: string;
}

@Component({
    selector: 'app-edit-announcement',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './edit-announcement.html',
    styleUrl: './edit-announcement.scss'
})
export class EditAnnouncement implements OnInit {
    domainId: string | null = null;
    rootUserId: string | null = null;
    domainName = signal('');
    announcement: Announcement | null = null;
    content = '';
    selectedFile: File | null = null;
    fileName = signal('');
    attachmentType = signal<string | null>(null);
    errorMessage = '';
    successMessage = '';
    showDeleteModal = false;
    confirmDeleteText = '';
    originalContent = '';
    hasFileRemoved = signal(false);

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
            if (currentState && currentState.announcement) {
                this.domainId = currentState.domain_id;
                this.rootUserId = currentState.rootUser_id;
                this.domainName.set(currentState.domain_name);
                this.announcement = currentState.announcement;
                this.content = this.announcement?.content || '';
                this.originalContent = this.content;
                this.attachmentType.set(this.announcement?.attachmentType || null);
                if (this.announcement?.attachmentType) {
                    this.fileName.set(this.announcement.attachmentType);
                }
            }

            if (!this.announcement) {
                this.router.navigate(['/post-announcement-v2x']);
            }
        }
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
            this.fileName.set(file.name);
            this.attachmentType.set(file.name); // Treat new filename as type for display
        }
    }

    removeFile() {
        if (!this.selectedFile && this.announcement?.attachmentType) {
            // Remove existing file via API
            this.loadingService.show();
            this.errorMessage = '';
            this.successMessage = '';

            this.http.put(`${API_BASE_URL}/announcement/remove_exist?id=${this.announcement.id}`, {}, { responseType: 'text' }).subscribe({
                next: (response) => {
                    this.loadingService.hide();
                    const res = (response || '').replace(/^"|"$/g, '').trim();

                    // Clear local state regardless of exact success message string as long as it's not an error response
                    this.selectedFile = null;
                    this.fileName.set('');
                    this.attachmentType.set(null);
                    if (this.announcement) {
                        this.announcement.attachmentType = null;
                        this.announcement.attachmentUrl = null;
                    }
                    this.hasFileRemoved.set(true);
                    this.cd.detectChanges();
                },
                error: (err) => {
                    this.loadingService.hide();
                    console.error('Error removing existing file:', err);
                    this.errorMessage = 'Network error. Failed to remove existing file.';
                    this.cd.detectChanges();
                }
            });
        } else {
            // Just clear local selection of a newly picked file
            this.selectedFile = null;
            this.fileName.set('');
            this.attachmentType.set(null);
        }
    }

    isFormValid(): boolean {
        // Must have either content or an attachment (either existing or newly selected)
        return (this.content.trim().length > 0 || this.attachmentType() !== null || this.selectedFile !== null);
    }

    hasChanges(): boolean {
        const contentChanged = this.content.trim() !== this.originalContent.trim();
        const fileSelected = this.selectedFile !== null;
        const fileRemoved = this.hasFileRemoved();

        return contentChanged || fileSelected || fileRemoved;
    }

    onUpdate() {
        if (!this.isFormValid()) {
            this.errorMessage = 'Either content or file any one must be fill to post announcement';
            return;
        }

        this.loadingService.show();
        this.errorMessage = '';
        this.successMessage = '';

        const formData = new FormData();
        formData.append('id', this.announcement?.id.toString() || '');
        formData.append('content', this.content.trim());

        if (this.selectedFile) {
            formData.append('attachment', this.selectedFile);
        }

        this.http.put(`${API_BASE_URL}/announcement`, formData, { responseType: 'text' }).subscribe({
            next: (response) => {
                this.loadingService.hide();
                const res = (response || '').replace(/^"|"$/g, '').trim();
                const successPrefixes = [
                    'Content successfully edited',
                    'attachment updated successfully',
                    'Content successfully edited and attachment updated successfully'
                ];

                if (successPrefixes.some(p => res.includes(p))) {
                    this.successMessage = res;
                    this.cd.detectChanges();
                    setTimeout(() => {
                        this.goBack();
                    }, 1500);
                } else {
                    this.errorMessage = res || 'Failed to update announcement';
                    this.cd.detectChanges();
                }
            },
            error: (err) => {
                this.loadingService.hide();
                console.error('Error updating announcement:', err);
                this.errorMessage = 'Network error. Please try again.';
                this.cd.detectChanges();
            }
        });
    }

    onDelete() {
        if (this.confirmDeleteText !== 'delete' || !this.announcement) return;

        this.loadingService.show();
        this.errorMessage = '';
        this.successMessage = '';
        this.showDeleteModal = false;

        this.http.delete(`${API_BASE_URL}/announcement?id=${this.announcement.id}`, { responseType: 'text' }).subscribe({
            next: (response) => {
                this.loadingService.hide();
                const res = (response || '').replace(/^"|"$/g, '').trim();
                if (res === 'Announcement deleted successfully') {
                    this.successMessage = res;
                    this.cd.detectChanges();
                    setTimeout(() => {
                        this.goBack();
                    }, 1500);
                } else {
                    this.errorMessage = res || 'Failed to delete announcement';
                    this.cd.detectChanges();
                }
            },
            error: (err) => {
                this.loadingService.hide();
                console.error('Error deleting announcement:', err);
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
