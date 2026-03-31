import { Component, OnInit, signal, Inject, PLATFORM_ID } from '@angular/core';
import { API_BASE_URL } from '../config';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { LoadingService } from '../services/loading.service';

interface DomainRecord {
    id: string;
    name: string;
    iamCount: string;
}

@Component({
    selector: 'app-domain-list',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    templateUrl: './domain-list.html',
    styleUrl: './domain-list.scss'
})
export class DomainList implements OnInit {
    rootUserId: string | null = null;
    rootUserName: string | null = null;
    domains = signal<DomainRecord[]>([]);
    searchQuery: string = '';
    errorMessage: string = '';

    constructor(
        private http: HttpClient,
        private router: Router,
        private loadingService: LoadingService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.rootUserId = localStorage.getItem('rootUserId');
            this.rootUserName = localStorage.getItem('rootUserName');

            if (!this.rootUserId) {
                this.router.navigate(['/auth-v1']);
                return;
            }
            this.fetchDomains();
        }
    }

    onSearch() {
        this.fetchDomains(this.searchQuery);
    }

    fetchDomains(query: string = '') {
        this.loadingService.show();
        this.errorMessage = '';
        let url = `${API_BASE_URL}/rootUser?id=${this.rootUserId}`;
        if (query) {
            url += `&search=${encodeURIComponent(query)}`;
        }

        const parseData = (data: string) => {
            const cleaned = (data || '').trim();
            if (!cleaned) {
                this.domains.set([]);
                return;
            }

            let domainStrings: string[] = [];
            if (cleaned.startsWith('[') && cleaned.endsWith(']')) {
                try {
                    domainStrings = JSON.parse(cleaned);
                } catch (e) {
                    domainStrings = cleaned.slice(1, -1).split(/,(?![^()]*\))/).map(s => s.trim().replace(/^"|"$/g, ''));
                }
            } else {
                domainStrings = [cleaned];
            }

            const parsed = domainStrings.map(str => {
                const idM = str.match(/id\s*[=:]\s*(\d+)/i);
                const nameM = str.match(/domain_name\s*[=:]\s*([^,)\s]+)/i);
                const countM = str.match(/IAM User Count\s*[:]\s*(\d+)/i);

                return {
                    id: idM ? idM[1] : '?',
                    name: nameM ? nameM[1].trim() : 'Unknown Domain',
                    iamCount: countM ? countM[1] : '0'
                };
            });
            this.domains.set(parsed);
        };

        this.http.get(url, { responseType: 'text' }).subscribe({
            next: (response: string) => {
                this.loadingService.hide();
                parseData(response);
            },
            error: (err) => {
                this.loadingService.hide();

                // CRITICAL FIX: If status is 302, the data might be in err.error
                if (err.status === 302 && err.error) {
                    console.log('Handling 302 with data in body:', err.error);
                    try {
                        parseData(err.error);
                        return; // Successfully parsed from 302 error body
                    } catch (e) {
                        console.error('Failed to parse 302 body', e);
                    }
                }

                console.error('Domain Fetch Error:', err);
                this.errorMessage = `HTTP ${err.status}: ${err.message || 'Connection failed'}.`;
            }
        });
    }

    onViewDomain(domain: DomainRecord) {
        this.router.navigate(['/view-domain-k2m'], {
            state: {
                domain_id: domain.id,
                rootUser_id: this.rootUserId,
                domain_name: domain.name
            }
        });
    }

    goBack() {
        this.router.navigate(['/root-home-v2b']);
    }
}
