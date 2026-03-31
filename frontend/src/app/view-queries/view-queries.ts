import { Component, OnInit, signal, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { API_BASE_URL } from '../config';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService } from '../services/loading.service';

interface Query {
    id: number;
    sender_name: string;
    query: string;
    response: string | null;
    timestamp: string;
}

@Component({
    selector: 'app-view-queries',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './view-queries.html',
    styleUrl: './view-queries.scss'
})
export class ViewQueries implements OnInit {
    domainName: string = '';
    domainId: string = '';
    rootUserId: string = '';

    queries = signal<Query[]>([]);
    filterMode: 'all' | 'pending' | 'responded' = 'all';

    showResponseModal = false;
    showConfirmModal = false;
    selectedQuery: Query | null = null;
    responseText: string = '';

    errorMessage = '';
    successMessage = '';

    constructor(
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute,
        private loadingService: LoadingService,
        private cd: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            const state = window.history.state;
            if (state && state.domain_name) {
                this.domainName = state.domain_name;
                this.domainId = state.domain_id;
                this.rootUserId = state.rootUser_id;

                // Backup to localStorage
                localStorage.setItem('storedDomainName', this.domainName);
                if (this.domainId) localStorage.setItem('storedDomainId', this.domainId);
                if (this.rootUserId) localStorage.setItem('storedRootUserId', this.rootUserId);
            } else {
                // Fallback to localStorage
                this.domainName = localStorage.getItem('storedDomainName') || '';
                this.domainId = localStorage.getItem('storedDomainId') || '';
                this.rootUserId = localStorage.getItem('storedRootUserId') || '';
            }

            if (!this.domainName) {
                this.router.navigate(['/domain-explorer-v9z']);
                return;
            }

            // Listen to query params for filter
            this.route.queryParams.subscribe(params => {
                const type = params['type'];
                if (type === 'pending' || type === 'responded') {
                    this.filterMode = type;
                } else {
                    this.filterMode = 'all';
                }
                this.loadQueries();
            });
        }
    }

    setFilter(mode: 'all' | 'pending' | 'responded') {
        const state = {
            domain_id: this.domainId,
            rootUser_id: this.rootUserId,
            domain_name: this.domainName
        };
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { type: mode === 'all' ? null : mode },
            queryParamsHandling: 'merge',
            state: state
        });
    }

    loadQueries() {
        this.loadingService.show();
        this.errorMessage = '';
        this.successMessage = '';

        let url = '';
        if (this.filterMode === 'all') {
            url = `${API_BASE_URL}/queries/rootUser?domain_name=${this.domainName}`;
        } else if (this.filterMode === 'pending') {
            url = `${API_BASE_URL}/queries/rootUser/yet_to_response?domain_name=${this.domainName}`;
        } else if (this.filterMode === 'responded') {
            url = `${API_BASE_URL}/queries/rootUser/responded?domain_name=${this.domainName}`;
        }

        this.http.get<Query[]>(url).subscribe({
            next: (data) => {
                this.loadingService.hide();
                this.queries.set(data);
                this.cd.detectChanges();
            },
            error: (err) => {
                this.loadingService.hide();
                console.error('Error loading queries:', err);
                this.errorMessage = 'Failed to load queries.';
                this.cd.detectChanges();
            }
        });
    }

    onResponse(query: Query) {
        this.selectedQuery = query;
        this.responseText = '';
        this.showResponseModal = true;
        this.errorMessage = '';
        this.successMessage = '';
    }

    onConfirmResponse() {
        if (!this.responseText.trim()) return;
        this.showConfirmModal = true;
    }

    closeModals() {
        this.showResponseModal = false;
        this.showConfirmModal = false;
        this.selectedQuery = null;
        this.responseText = '';
    }

    closeConfirm() {
        this.showConfirmModal = false;
    }

    onSendResponse() {
        if (!this.selectedQuery || !this.responseText.trim()) return;

        this.loadingService.show();
        this.errorMessage = '';

        // Send only id and response — no domain_name (causes 400)
        // Using HttpParams so Angular handles encoding properly
        const params = new HttpParams()
            .set('id', this.selectedQuery.id.toString())
            .set('response', this.responseText.trim());

        this.http.put(`${API_BASE_URL}/queries/rootUser`,
            params,
            { responseType: 'text' }
        ).subscribe({
            next: (response) => {
                this.loadingService.hide();
                const res = (response || '').replace(/^"|"$/g, '').trim();

                if (res === 'Response updated') {
                    this.successMessage = res;
                    this.showConfirmModal = false;
                    this.showResponseModal = false;
                    this.cd.detectChanges();

                    setTimeout(() => {
                        this.loadQueries();
                    }, 1500);
                } else {
                    this.errorMessage = res;
                    this.showConfirmModal = false;
                    this.cd.detectChanges();
                }
            },
            error: (err) => {
                this.loadingService.hide();
                console.error('API Error:', err);
                this.errorMessage = 'Failed to send response.';
                this.showConfirmModal = false;
                this.cd.detectChanges();
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

    formatTimestamp(ts: string): string {
        try {
            const date = new Date(ts);
            return date.toLocaleString();
        } catch (e) {
            return ts;
        }
    }
}
