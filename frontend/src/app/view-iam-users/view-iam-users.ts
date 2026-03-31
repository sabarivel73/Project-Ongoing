import { Component, OnInit, signal, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
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
    selector: 'app-view-iam-users',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './view-iam-users.html',
    styleUrl: './view-iam-users.scss'
})
export class ViewIamUsers implements OnInit {
    rootUserId: string | null = null;
    domainId: string | null = null;
    domainName: string = '';

    searchQuery: string = '';
    iamUsers = signal<IamUser[]>([]);
    errorMessage: string = '';

    constructor(
        private http: HttpClient,
        private router: Router,
        private loadingService: LoadingService,
        private cd: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            const state = window.history.state;
            if (state && state.domain_name) {
                this.domainId = state.domain_id;
                this.rootUserId = state.rootUser_id;
                this.domainName = state.domain_name;
                this.fetchIamUsers();
            } else {
                this.router.navigate(['/domain-explorer-v9z']);
            }
        }
    }

    fetchIamUsers() {
        this.loadingService.show();
        this.errorMessage = '';

        let url = `${API_BASE_URL}/domain?domain_name=${encodeURIComponent(this.domainName)}`;
        if (this.searchQuery.trim()) {
            url += `&search=${encodeURIComponent(this.searchQuery.trim())}`;
        }

        const parseUserData = (response: any) => {
            try {
                const cleaned = (response || '').toString().replace(/^"|"$/g, '').trim();
                if (!cleaned) {
                    this.iamUsers.set([]);
                    return;
                }

                let rawData: any;
                try {
                    rawData = JSON.parse(cleaned);
                } catch (e) {
                    // Fallback: if it's a string starting with [, try to treat it as an array of strings
                    if (cleaned.startsWith('[') && cleaned.endsWith(']')) {
                        rawData = cleaned.slice(1, -1).split(/,(?![^()]*\))/).map((s: string) => s.trim().replace(/^"|"$/g, ''));
                    } else {
                        rawData = [cleaned];
                    }
                }

                if (Array.isArray(rawData)) {
                    const parsed = rawData.map((item: any) => {
                        // If it's already an object, return it (map common keys if needed)
                        if (typeof item === 'object' && item !== null) {
                            return {
                                id: item.id || 0,
                                name: item.name || 'Unknown',
                                role: item.role || 'User',
                                domain_name: item.domain_name || '',
                                rootUser_id: item.rootUser_id || 0
                            };
                        }

                        // If it's a string (e.g. "{id=3, name=us, role=SDE}"), use regex
                        const str = item.toString();
                        const idM = str.match(/id\s*[=:]\s*(\d+)/i);
                        const nameM = str.match(/name\s*[=:]\s*([^,)\s]+)/i);
                        const roleM = str.match(/role\s*[=:]\s*([^,)\s]+)/i);
                        const domainM = str.match(/domain_name\s*[=:]\s*([^,)\s]+)/i);

                        return {
                            id: idM ? parseInt(idM[1]) : 0,
                            name: nameM ? nameM[1].trim() : 'Unknown',
                            role: roleM ? roleM[1].trim() : 'User',
                            domain_name: domainM ? domainM[1].trim() : '',
                            rootUser_id: 0
                        };
                    });
                    this.iamUsers.set(parsed);
                } else {
                    this.iamUsers.set([]);
                }
            } catch (e) {
                console.error('Final Parse Error:', e, response);
                this.errorMessage = 'Failed to process user data format.';
            }
            this.cd.detectChanges();
        };

        this.http.get(url, { responseType: 'text' }).subscribe({
            next: (response) => {
                this.loadingService.hide();
                parseUserData(response);
            },
            error: (err) => {
                this.loadingService.hide();

                // Handle 302 redirects where data is in error body
                if (err.status === 302 && err.error) {
                    parseUserData(err.error);
                    return;
                }

                console.error('Error fetching IAM users:', err);
                this.errorMessage = 'Failed to load IAM users. Please try again.';
                this.cd.detectChanges();
            }
        });
    }

    onSearch() {
        this.fetchIamUsers();
    }

    onEditUser(user: IamUser) {
        this.router.navigate(['/edit-iam-c4k'], {
            state: {
                user: user,
                domain_id: this.domainId,
                rootUser_id: this.rootUserId,
                domain_name: this.domainName
            }
        });
    }

    goBack() {
        this.router.navigate(['/view-domain-k2m'], {
            state: {
                domain_id: this.domainId,
                rootUser_id: this.rootUserId,
                domain_name: this.domainName
            }
        });
    }
}
