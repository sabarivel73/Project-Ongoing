import { Component, OnInit, signal, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { API_BASE_URL } from '../config';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';

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
    selector: 'app-post-announcement',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './post-announcement.html',
    styleUrl: './post-announcement.scss'
})
export class PostAnnouncement implements OnInit {
    domainId: string | null = null;
    rootUserId: string | null = null;
    domainName = signal('');
    announcements = signal<Announcement[]>([]);
    selectedAnn = signal<Announcement | null>(null);
    showDetailsModal = signal(false);
    errorMessage = '';

    isNative = Capacitor.isNativePlatform();
    // Track downloading attachments
    downloadingKeys = signal<Set<string>>(new Set());

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
            } else {
                const stored = localStorage.getItem('storedDomainName');
                if (stored) {
                    this.domainName.set(stored);
                }
            }

            if (!this.domainName()) {
                this.router.navigate(['/root-home-v2b']);
                return;
            }

            this.fetchAllAnnouncements();
        }
    }

    fetchAllAnnouncements() {
        this.loadingService.show();
        const url = `${API_BASE_URL}/announcement/get_all?domain_name=${this.domainName()}`;

        this.http.get<Announcement[]>(url).subscribe({
            next: (data) => {
                this.loadingService.hide();
                this.announcements.set(data || []);
                this.cd.detectChanges();
            },
            error: (err) => {
                this.loadingService.hide();
                console.error('Error fetching announcements:', err);
                this.errorMessage = 'Failed to load announcements.';
                this.cd.detectChanges();
            }
        });
    }

    getHeader(ann: Announcement): string {
        if (ann.content) {
            return ann.content;
        }
        return 'Announcement attached with file';
    }

    formatTimestamp(timestamp: string | undefined): string {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    onViewDetails(id: number) {
        this.loadingService.show();
        const url = `${API_BASE_URL}/announcement?id=${id}`;

        this.http.get<Announcement>(url).subscribe({
            next: (data) => {
                this.loadingService.hide();
                this.selectedAnn.set(data);
                this.showDetailsModal.set(true);
                this.cd.detectChanges();
            },
            error: (err) => {
                this.loadingService.hide();
                console.error('Error fetching announcement details:', err);
                this.errorMessage = 'Could not load announcement details.';
                this.cd.detectChanges();
            }
        });
    }

    onCreateNew() {
        this.router.navigate(['/create-announcement-n3y'], {
            state: {
                domain_id: this.domainId,
                rootUser_id: this.rootUserId,
                domain_name: this.domainName()
            }
        });
    }

    onEdit(ann: Announcement) {
        this.router.navigate(['/edit-announcement-m5z'], {
            state: {
                domain_id: this.domainId,
                rootUser_id: this.rootUserId,
                domain_name: this.domainName(),
                announcement: ann
            }
        });
    }

    isDownloading(key: string | null | undefined): boolean {
        if (!key) return false;
        return this.downloadingKeys().has(key);
    }

    onDownload(key: string | null | undefined) {
        if (!key) return;
        if (this.isDownloading(key)) return;

        // Add key to downloading set
        const current = new Set(this.downloadingKeys());
        current.add(key);
        this.downloadingKeys.set(current);

        const url = `${API_BASE_URL}/announcement/download?key=${key}`;

        this.http.get(url, {
            responseType: 'blob',
            observe: 'response'
        }).subscribe({
            next: async (response) => {
                // Remove key from downloading set
                const updated = new Set(this.downloadingKeys());
                updated.delete(key);
                this.downloadingKeys.set(updated);

                // Get filename from header if possible, or fallback to key
                const contentDisposition = response.headers.get('content-disposition');
                let fileName = this.getCleanFileName(key);
                
                if (contentDisposition) {
                    const match = contentDisposition.match(/filename="?([^";]+)"?/); // Improved regex
                    if (match && match[1] && match[1] !== 'file') {
                        fileName = match[1];
                    }
                }

                // Final check: if still lacks extension, try to restore from key
                if (!fileName.includes('.') && key.includes('.')) {
                    fileName = key; 
                }

                const blob = response.body as Blob;

                // Check for Capacitor Native Platform
                if (Capacitor.isNativePlatform()) {
                    try {
                        const base64Data = await this.blobToBase64(blob);
                        
                        // Write to the temporary directory
                        const savedFile = await Filesystem.writeFile({
                            path: fileName,
                            data: base64Data,
                            directory: Directory.Cache
                        });

                        // Share the file (this triggers the "Open With" menu in APK)
                        await Share.share({
                            title: 'Download Complete',
                            text: 'Open the file you just downloaded.',
                            url: savedFile.uri,
                            dialogTitle: 'Open File'
                        });
                    } catch (e) {
                        console.error('Mobile download/share error:', e);
                    }
                } else {
                    // Standard Web Browser logic
                    const objUrl = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = objUrl;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(objUrl);
                    document.body.removeChild(a);
                }
                this.cd.detectChanges();
            },
            error: (err) => {
                console.error('Download error:', err);
                const updated = new Set(this.downloadingKeys());
                updated.delete(key);
                this.downloadingKeys.set(updated);
                this.cd.detectChanges();
            }
        });
    }

    private getCleanFileName(key: string): string {
        if (!key) return 'file_from_OfficeWing';
        const parts = key.split('_');
        // If it starts with a UUID/timestamp then clean it up, e.g. "uuid_my-cat.png" -> "my-cat.png"
        if (parts.length > 1 && parts[0].length >= 10) {
            return parts.slice(1).join('_');
        }
        return key;
    }

    private async blobToBase64(blob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = (reader.result as string).split(',')[1];
                resolve(base64data);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    closeModal() {
        this.showDetailsModal.set(false);
        this.selectedAnn.set(null);
    }

    goBack() {
        this.router.navigate(['/view-domain-k2m'], {
            state: {
                domain_id: this.domainId,
                rootUser_id: this.rootUserId,
                domain_name: this.domainName()
            }
        });
    }
}
