import { Component, OnInit, signal, ChangeDetectorRef, Inject, PLATFORM_ID, ViewChild, ElementRef, HostListener, effect, untracked } from '@angular/core';
import { API_BASE_URL } from '../config';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../services/loading.service';
import { WebsocketService } from '../services/websocket.service';
import { forkJoin, of, from } from 'rxjs';
import { catchError, concatMap, toArray } from 'rxjs/operators';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';

interface ChatItem {
    user_id: number;
    name: string;
    time: string;
    role?: string;
    readCount?: number;
}

interface Note {
    attachmentKey: string | null;
    attachmentType: string | null;
    attachmentUrl: string | null;
    content: string;
    iamUser_id?: number; // Optional as convo API might use sender/receiver instead
    id: number;
    timestamp: string;
    sender_id?: number;
    receiver_id?: number;
}

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

interface IamUserResult {
    id: number;
    name: string;
    password: null;
    domain_name: string;
    role: string;
    rootUser_id: number | null;
}

interface UserQuery {
    id: number;
    query: string;
    response: string | null;
    sender_id: number;
    domain_name: string;
    timestamp: string;
}

interface GroupItem {
    id: number;
    group_name: string;
    createdBy: number;
    domain_name: string;
    subscribers?: number[];
    readCount?: number;
}

interface GroupMessage {
    id: number;
    sender_id: number;
    sender_name: string;
    content: string;
    attachment_type: string | null;
    attachment_url: string | null;
    attachment_key: string | null;
    timestamp: string;
}

@Component({
    selector: 'app-iam-user-home',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './iam-user-home.html',
    styleUrl: './iam-user-home.scss'
})
export class IamUserHome implements OnInit {
    // View References
    @ViewChild('notesScrollContainer') notesScrollContainer!: ElementRef;
    @ViewChild('convoScrollContainer') convoScrollContainer!: ElementRef;
    @ViewChild('groupConvoScrollContainer') groupConvoScrollContainer!: ElementRef;

    currentView = signal<'welcome' | 'notes' | 'search' | 'groups' | 'group-convo' | 'convo' | 'announcements' | 'queries' | 'create-group' | 'group-details'>('welcome');

    // Create Group logic
    newGroupName = '';
    selectedSubscribers = signal<number[]>([]);
    isCreatingGroup = signal(false);
    originalGroupName = '';
    originalSubscribers: number[] = [];
    isEditingGroup = signal(false);
    sidebarVisibleMobile = signal(false);
    iamUserId: string | null = null;
    iamUserName = signal('');
    domainName = signal('');
    recentChats = signal<ChatItem[]>([]);
    showMenu = signal(false);
    sidebarWidth = signal(300); // Default placeholder
    isResizing = signal(false);

    // Notes logic
    notes = signal<Note[]>([]);
    noteText = '';
    selectedFile: File | null = null;
    isSending = signal(false);
    noteFeedback = signal<string | null>(null);

    // Search logic
    searchQuery = '';
    searchResults = signal<IamUserResult[]>([]);
    isSearching = signal(false);

    // Convo logic
    selectedConvoUser = signal<IamUserResult | null>(null);
    convoNotes = signal<Note[]>([]);
    convoNoteText = '';
    convoSelectedFile: File | null = null;
    isSendingConvo = signal(false);
    convoFeedback = signal<string | null>(null);

    // Announcement logic
    announcements = signal<Announcement[]>([]);
    selectedAnn = signal<Announcement | null>(null);
    showAnnDetailsModal = signal(false);

    // Query logic
    allQueries = signal<UserQuery[]>([]);
    queryFilter = signal<'all' | 'waiting' | 'responded'>('all');
    selectedQuery = signal<UserQuery | null>(null);
    showQueryDetailsModal = signal(false);
    queryText = ''; // For sending new query
    isSendingQuery = signal(false);
    queryFeedback = signal<string | null>(null);
    showCreateQueryModal = signal(false);

    // Group logic
    groups = signal<GroupItem[]>([]);
    selectedGroup = signal<GroupItem | null>(null);
    groupMessages = signal<GroupMessage[]>([]);
    groupMessageText = '';
    isSendingGroup = signal(false);
    groupFeedback = signal<string | null>(null);
    groupFeedbackType = signal<'success' | 'error' | 'info'>('info');
    groupSelectedFile: File | null = null;
    showMenuChoice = signal<'notes' | 'convo' | 'group-convo' | null>(null);
    isNative = Capacitor.isNativePlatform();

    // Audio recording logic
    isRecording = signal(false);
    recordingDuration = signal(0);
    private mediaRecorder: any = null; // Use any to avoid MediaRecorder type errors if libs missing
    private audioChunks: Blob[] = [];
    private timerInterval: any = null;


    showEditQueryModal = signal(false);
    editQueryText = '';
    originalQueryText = '';
    isEditingQuery = signal(false);
    private lastReadTimes = new Map<string, number>();
    private isRefreshing = false;

    showDeleteQueryConfirm = signal(false);
    deleteQueryConfirmText = '';
    isDeletingQuery = signal(false);
    showDeleteGroupConfirm = signal(false);
    deleteGroupConfirmInput = '';
    showLeaveGroupConfirm = signal(false);
    leaveGroupConfirmInput = '';

    // Edit/Delete logic
    selectedNoteId = signal<number | null>(null);
    editingNoteId = signal<number | null>(null);
    editingContent = '';
    originalContent = '';
    showDeleteConfirm = signal(false);
    noteToDeleteId = signal<number | null>(null);

    // Track downloading attachments
    downloadingKeys = signal<Set<string>>(new Set());

    // Manual double-tap detection for mobile
    private lastClickTime = 0;

    constructor(
        private http: HttpClient,
        private router: Router,
        private loadingService: LoadingService,
        private wsService: WebsocketService,
        private cd: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        if (isPlatformBrowser(this.platformId)) {
            // Signal listener for real-time notifications
            effect(() => {
                const msg = this.wsService.messageReceived();
                if (msg) {
                    untracked(() => {
                        this.handleSeamlessRefresh();
                        this.triggerPushNotification(msg);
                    });
                }
            });
        }
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            // Initialize width to 30%
            const initialWidth = Math.floor(window.innerWidth * 0.3);
            this.sidebarWidth.set(initialWidth);

            this.iamUserId = localStorage.getItem('iamUserId');
            this.iamUserName.set(localStorage.getItem('iamUserName') || '');
            this.domainName.set(localStorage.getItem('iamDomain') || '');

            if (!this.iamUserId) {
                this.router.navigate(['/auth-v1']);
                return;
            }

            try {
                // WebSocket Connection
                this.wsService.connect(this.iamUserId);
            } catch (wsErr) {
            }

            this.restoreState();

            this.checkAvailability();
            this.loadChats();

            // Load view-specific data after restoration
            const view = this.currentView();
            if (view === 'convo' && this.selectedConvoUser()) {
                this.loadConvoMessages(this.selectedConvoUser()!.id);
            } else if (view === 'group-convo' && this.selectedGroup()) {
                this.loadGroupMessages();
            } else if (view === 'notes') {
                this.loadNotes();
            } else if (view === 'announcements') {
                this.loadAnnouncements();
            } else if (view === 'queries') {
                this.loadQueries();
            } else if (view === 'groups') {
                this.loadGroups();
            }
            this.requestNotificationPermission();
        }
    }

    private handleSeamlessRefresh() {
        if (!isPlatformBrowser(this.platformId) || this.isRefreshing) return;
        this.isRefreshing = true;

        // Reset refreshing flag after 2 seconds to prevent infinite loops
        setTimeout(() => {
            this.isRefreshing = false;
        }, 2000);

        // Always refresh sidebar lists silently
        this.loadChats(true);
        this.loadGroups(true);

        const view = this.currentView();
        const now = Date.now();

        if (view === 'convo' && this.selectedConvoUser()) {
            const userId = this.selectedConvoUser()!.id;
            this.loadConvoMessages(userId);

            const key = `user_${userId}`;
            const lastRead = this.lastReadTimes.get(key) || 0;
            if (now - lastRead > 2000) {
                this.lastReadTimes.set(key, now);
                this.http.get(`${API_BASE_URL}/message/read?current_user_id=${this.iamUserId}&iam_user_id=${userId}`, { responseType: 'text' }).subscribe();
            }
        }
        else if (view === 'group-convo' && this.selectedGroup()) {
            const groupId = this.selectedGroup()!.id;
            this.loadGroupMessages(true);

            const key = `group_${groupId}`;
            const lastRead = this.lastReadTimes.get(key) || 0;
            if (now - lastRead > 2000) {
                this.lastReadTimes.set(key, now);
                this.http.get(`${API_BASE_URL}/group_message/read?id=${groupId}&userId=${this.iamUserId}`, { responseType: 'text' }).subscribe();
            }
        }

        // Background refresh for other views (all silent)
        if (view === 'notes') this.loadNotes(true);
        if (view === 'announcements') this.loadAnnouncements(true);
        if (view === 'queries') this.loadQueries(true);
    }

    // Attachment menu logic
    toggleAttachMenu(view: 'notes' | 'convo' | 'group-convo') {
        if (this.showMenuChoice() === view && !this.isRecording()) {
            this.showMenuChoice.set(null);
        } else {
            this.showMenuChoice.set(view);
        }
    }

    triggerFileInput(view: 'notes' | 'convo' | 'group-convo') {
        this.showMenuChoice.set(null);
        const inputId = `fileInput_${view}`;
        const el = document.getElementById(inputId) as HTMLInputElement;
        if (el) el.click();
    }

    // Recording Methods
    async startRecording(view: 'notes' | 'convo' | 'group-convo') {
        if (this.isRecording()) return;
        this.showMenuChoice.set(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new (window as any).MediaRecorder(stream);
            this.audioChunks = [];
            this.isRecording.set(true);
            this.recordingDuration.set(0);
            this.showMenuChoice.set(view); // Use to indicate active recording view

            this.mediaRecorder.ondataavailable = (event: any) => {
                this.audioChunks.push(event.data);
            };

            this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/mpeg' });
                const fileName = `audio_file_${Date.now()}.mp3`;
                const audioFile = new File([audioBlob], fileName, { type: 'audio/mpeg' });

                if (view === 'notes') this.selectedFile = audioFile;
                else if (view === 'convo') this.convoSelectedFile = audioFile;
                else if (view === 'group-convo') this.groupSelectedFile = audioFile;

                this.cleanupRecording();
            };

            this.mediaRecorder.start();
            this.startTimer();
        } catch (err) {
            console.error('Error starting recording:', err);
            this.isRecording.set(false);
        }
    }

    stopRecording() {
        if (this.mediaRecorder && this.isRecording()) {
            this.mediaRecorder.stop();
            this.mediaRecorder.stream.getTracks().forEach((t: any) => t.stop());
        }
    }

    cancelRecording() {
        if (this.mediaRecorder) {
            this.mediaRecorder.onstop = null;
            this.mediaRecorder.stop();
            this.mediaRecorder.stream.getTracks().forEach((t: any) => t.stop());
        }
        this.cleanupRecording();
    }

    private startTimer() {
        this.timerInterval = setInterval(() => {
            this.recordingDuration.update(d => d + 1);
        }, 1000);
    }

    private cleanupRecording() {
        clearInterval(this.timerInterval);
        this.isRecording.set(false);
        this.recordingDuration.set(0);
        this.showMenuChoice.set(null);
        this.mediaRecorder = null;
        this.audioChunks = [];
    }

    formatDuration(seconds: number): string {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }



    private saveState() {
        if (!isPlatformBrowser(this.platformId)) return;
        localStorage.setItem('currentView', this.currentView());
        const user = this.selectedConvoUser();
        if (user) localStorage.setItem('selectedConvoUser', JSON.stringify(user));
        const group = this.selectedGroup();
        if (group) localStorage.setItem('selectedGroup', JSON.stringify(group));
    }

    private restoreState() {
        if (!isPlatformBrowser(this.platformId)) return;
        try {
            const savedView = localStorage.getItem('currentView');

            if (savedView) {
                this.currentView.set(savedView as any);
                if (savedView === 'convo') {
                    const userStr = localStorage.getItem('selectedConvoUser');
                    if (userStr) this.selectedConvoUser.set(JSON.parse(userStr));
                } else if (savedView === 'group-convo') {
                    const groupStr = localStorage.getItem('selectedGroup');
                    if (groupStr) this.selectedGroup.set(JSON.parse(groupStr));
                }
            }
        } catch (err) {
        } finally {
            // Always clear state after restore attempt
            localStorage.removeItem('currentView');
            localStorage.removeItem('selectedConvoUser');
            localStorage.removeItem('selectedGroup');
        }
    }

    closeView() {
        const view = this.currentView();
        if (view === 'group-convo') {
            this.currentView.set('groups');
            this.selectedGroup.set(null);
        } else if (view === 'group-details') {
            this.currentView.set('group-convo');
        } else if (view === 'create-group') {
            this.currentView.set('groups');
        } else {
            this.currentView.set('welcome');
            this.selectedConvoUser.set(null);
        }
        this.loadChats();
        this.loadGroups();
    }

    checkAvailability() {
        if (!this.iamUserId) return;

        this.http.get(`${API_BASE_URL}/iamUser/check?id=${this.iamUserId}`, { responseType: 'text' }).subscribe({
            next: (response) => {
                const res = (response || '').replace(/^"|"$/g, '').trim();
                if (res === 'IAM user not available') {
                    this.logout();
                }
            },
            error: (err) => {
                console.error('Error checking availability:', err);
                // Optionally handle network error, but specifically looking for the text above
            }
        });
    }

    loadChats(silent = false) {
        if (!this.iamUserId) return;

        if (!silent) this.loadingService.show();
        this.http.get<ChatItem[]>(`${API_BASE_URL}/message/chat?id=${this.iamUserId}`).subscribe({
            next: (chats) => {
                if (!silent) this.loadingService.hide();
                this.recentChats.set(chats);
                this.cd.detectChanges();
            },
            error: (err) => {
                if (!silent) this.loadingService.hide();
                console.error('Error loading chats:', err);
                this.cd.detectChanges();
            }
        });
    }

    toggleMenu() {
        this.checkAvailability();
        this.showMenu.set(!this.showMenu());
    }

    onMenuAction(action: string) {
        this.checkAvailability();
        this.showMenu.set(false); // Close profile dropdown
        this.sidebarVisibleMobile.set(false); // Close mobile sidebar

        switch (action) {
            case 'logout':
                this.logout();
                break;
            case 'announcements':
                this.currentView.set('announcements');
                this.selectedConvoUser.set(null);
                this.selectedGroup.set(null);
                this.loadAnnouncements();
                break;
            case 'queries':
                this.currentView.set('queries');
                this.selectedConvoUser.set(null);
                this.selectedGroup.set(null);
                this.loadQueries();
                break;
            case 'notes':
                this.currentView.set('notes');
                this.selectedConvoUser.set(null);
                this.selectedGroup.set(null);
                this.loadNotes();
                break;
            case 'groups':
                this.currentView.set('groups');
                this.selectedConvoUser.set(null);
                this.loadGroups();
                break;
            case 'backToChat':
                this.currentView.set('welcome');
                this.selectedConvoUser.set(null);
                this.selectedGroup.set(null);
                this.loadChats();
                break;
            case 'create-group':
                this.checkAvailability();
                this.currentView.set('create-group');
                this.selectedConvoUser.set(null);
                this.selectedGroup.set(null);
                this.newGroupName = '';
                this.selectedSubscribers.set([]);
                this.searchQuery = '';
                this.loadDomainUsers();
                break;
        }
    }

    toggleSubscriber(userId: number) {
        // Permission check for editing existing group
        if (this.currentView() === 'group-details' && this.selectedGroup()?.createdBy?.toString() !== this.iamUserId) {
            return;
        }

        const current = this.selectedSubscribers();
        if (current.includes(userId)) {
            this.selectedSubscribers.set(current.filter(id => id !== userId));
        } else {
            this.selectedSubscribers.set([...current, userId]);
        }
    }

    isSubscriberSelected(userId: number): boolean {
        return this.selectedSubscribers().includes(userId);
    }

    submitCreateGroup() {
        if (!this.newGroupName.trim()) {
            this.groupFeedbackType.set('error');
            this.groupFeedback.set("Group name is required");
            setTimeout(() => this.groupFeedback.set(null), 3000);
            return;
        }

        if (this.selectedSubscribers().length === 0) {
            this.groupFeedbackType.set('error');
            this.groupFeedback.set("Please select at least one member");
            setTimeout(() => this.groupFeedback.set(null), 3000);
            return;
        }

        this.isCreatingGroup.set(true);
        const creatorId = this.iamUserId!;
        const gName = this.newGroupName.trim();
        const dName = this.domainName();

        // Step 1: Create Group with query params
        const createGroupUrl = `${API_BASE_URL}/group?createdBy=${creatorId}&group_name=${encodeURIComponent(gName)}&domain_name=${encodeURIComponent(dName)}`;

        this.http.post(createGroupUrl, {}, { responseType: 'text' }).subscribe({
            next: (res: string) => {
                const match = res.match(/group id is\s*:\s*(\d+)/i);
                if (match) {
                    const groupId = match[1];
                    const selectedIds = this.selectedSubscribers();
                    this.groupFeedbackType.set('info');
                    this.groupFeedback.set(`Adding ${selectedIds.length} members...`);

                    from(selectedIds).pipe(
                        concatMap(subId =>
                            this.http.post(`${API_BASE_URL}/group/subscriber?group_id=${groupId}&subscriber_id=${subId}`, {}, { responseType: 'text' })
                                .pipe(catchError(() => of(`Failed subscriber ${subId}`)))
                        ),
                        toArray()
                    ).subscribe({
                        next: () => this.finalizeGroupCreation(),
                        error: () => this.handleGroupError("Error adding subscribers")
                    });
                } else {
                    this.handleGroupError("Failed to extract group ID");
                }
            },
            error: (err) => this.handleGroupError("Error creating group")
        });
    }

    private finalizeGroupCreation() {
        this.isCreatingGroup.set(false);
        this.groupFeedbackType.set('success');
        this.groupFeedback.set("Group created successfully");
        this.loadGroups();
        setTimeout(() => {
            this.groupFeedback.set(null);
            this.currentView.set('groups');
        }, 2000);
    }

    private handleGroupError(msg: string) {
        this.isCreatingGroup.set(false);
        this.isEditingGroup.set(false);
        this.groupFeedbackType.set('error');
        this.groupFeedback.set(msg);
        setTimeout(() => this.groupFeedback.set(null), 3000);
    }

    viewGroupDetails() {
        const group = this.selectedGroup();
        if (!group) return;

        this.loadingService.show();
        this.http.get<GroupItem>(`${API_BASE_URL}/group/groupInfo?id=${group.id}`).subscribe({
            next: (data) => {
                this.loadingService.hide();
                if (data) {
                    this.newGroupName = data.group_name;
                    this.originalGroupName = data.group_name;
                    // Ensure we have numbers - subscribers might come as strings from some APIs
                    const subs = (data.subscribers || []).map(s => typeof s === 'string' ? parseInt(s) : s);
                    this.selectedSubscribers.set([...subs]);
                    this.originalSubscribers = [...subs];

                    this.currentView.set('group-details');
                    this.loadDomainUsers();
                }
            },
            error: (err) => {
                this.loadingService.hide();
                console.error("Error fetching group info:", err);
            }
        });
    }

    isGroupModified(): boolean {
        if (!this.selectedGroup()) return false;

        const nameChanged = this.newGroupName.trim() !== this.originalGroupName;

        const currentSubs = [...this.selectedSubscribers()].sort((a, b) => a - b);
        const origSubs = [...this.originalSubscribers].sort((a, b) => a - b);
        const subsChanged = JSON.stringify(currentSubs) !== JSON.stringify(origSubs);

        return nameChanged || subsChanged;
    }

    submitEditGroup() {
        const group = this.selectedGroup();
        if (!group) return;

        this.isEditingGroup.set(true);
        const groupId = group.id;
        const dName = this.domainName();
        const gName = this.newGroupName.trim();

        // Build URL based on changes as requested
        let url = `${API_BASE_URL}/group?group_id=${groupId}&domain_name=${encodeURIComponent(dName)}`;

        const nameChanged = gName !== this.originalGroupName;
        if (nameChanged) {
            url += `&group_name=${encodeURIComponent(gName)}`;
        }

        const currentSubs = this.selectedSubscribers();
        const addedUsers = currentSubs.filter(id => !this.originalSubscribers.includes(id));
        const removedUsers = this.originalSubscribers.filter(id => !currentSubs.includes(id));

        if (addedUsers.length > 0) {
            url += `&add_users=${addedUsers.join(',')}`;
        }

        if (removedUsers.length > 0) {
            url += `&remove_users=${removedUsers.join(',')}`;
        }

        this.http.put(url, {}, { responseType: 'text' }).subscribe({
            next: (res: string) => {
                if (res.includes("Group edited successfully")) {
                    this.isEditingGroup.set(false);
                    this.groupFeedbackType.set('success');
                    this.groupFeedback.set("Group edited successfully");

                    // Refresh groups and update local signal immediately
                    this.loadGroups();
                    this.selectedGroup.set({
                        ...group,
                        group_name: gName,
                        subscribers: [...currentSubs]
                    });
                    this.originalGroupName = gName;
                    this.originalSubscribers = [...currentSubs];

                    setTimeout(() => {
                        this.groupFeedback.set(null);
                        this.currentView.set('group-convo');
                    }, 2000);
                } else {
                    this.handleGroupError(res || "Failed to update group");
                }
            },
            error: () => this.handleGroupError("Error updating group details")
        });
    }

    leaveGroup() {
        const group = this.selectedGroup();
        if (!group || !this.iamUserId) return;

        const url = `${API_BASE_URL}/group/leave_group?group_id=${group.id}&subscriber_id=${this.iamUserId}`;
        this.http.delete(url, { responseType: 'text' }).subscribe({
            next: (res: string) => {
                if (res.includes("Successfully leaved from the group")) {
                    this.showLeaveGroupConfirm.set(false);
                    this.leaveGroupConfirmInput = '';
                    this.groupFeedbackType.set('success');
                    this.groupFeedback.set("Successfully leaved from the group");
                    this.loadGroups();
                    this.selectedGroup.set(null);
                    setTimeout(() => {
                        this.groupFeedback.set(null);
                        this.currentView.set('groups'); // Redirect to landing page
                    }, 2000);
                } else {
                    this.handleGroupError(res || "Failed to leave group");
                }
            },
            error: () => {
                this.showLeaveGroupConfirm.set(false);
                this.handleGroupError("Error leaving group");
            }
        });
    }

    deleteGroup() {
        const group = this.selectedGroup();
        if (!group) return;

        const url = `${API_BASE_URL}/group?domain_name=${this.domainName()}`;
        this.http.delete(url, { responseType: 'text' }).subscribe({
            next: (res: string) => {
                if (res.includes("Group deleted")) {
                    this.showDeleteGroupConfirm.set(false);
                    this.deleteGroupConfirmInput = '';
                    this.groupFeedbackType.set('success');
                    this.groupFeedback.set("Group deleted successfully");
                    this.loadGroups();
                    this.selectedGroup.set(null);
                    setTimeout(() => {
                        this.groupFeedback.set(null);
                        this.currentView.set('groups'); // Redirect to landing page
                    }, 2000);
                } else {
                    this.handleGroupError(res || "Failed to delete group");
                }
            },
            error: () => {
                this.showDeleteGroupConfirm.set(false);
                this.handleGroupError("Error deleting group");
            }
        });
    }

    toggleSearch() {
        this.checkAvailability();
        this.currentView.set('search');
        this.sidebarVisibleMobile.set(false);
        this.loadDomainUsers(); // Load all users in domain when search is opened
    }

    loadDomainUsers() {
        this.loadingService.show();
        this.isSearching.set(true);
        this.searchResults.set([]);

        // Using the reliable /be/iamUser endpoint with current user ID
        let url = `${API_BASE_URL}/iamUser?domain_name=${encodeURIComponent(this.domainName())}&id=${this.iamUserId}`;
        if (this.searchQuery.trim()) {
            url += `&search=${encodeURIComponent(this.searchQuery.trim())}`;
        }

        const handleResponse = (response: any) => {
            try {
                const cleaned = (response || '').toString().trim().replace(/^"|"$/g, '').trim();
                if (!cleaned) {
                    this.searchResults.set([]);
                    return;
                }

                let rawData: any;
                try {
                    rawData = JSON.parse(cleaned);
                } catch (e) {
                    // Fallback for non-standard formats like [ {id=1, name=x}, ... ]
                    if (cleaned.startsWith('[') && cleaned.endsWith(']')) {
                        rawData = cleaned.slice(1, -1).split(/,(?![^()]*\))/).map((s: string) => s.trim().replace(/^"|"$/g, ''));
                    } else {
                        rawData = [cleaned];
                    }
                }

                if (Array.isArray(rawData)) {
                    let parsed: IamUserResult[] = rawData.map((item: any) => {
                        if (typeof item === 'object' && item !== null) {
                            return {
                                id: item.id || 0,
                                name: item.name || 'Unknown',
                                role: item.role || 'User',
                                domain_name: item.domain_name || '',
                                password: null,
                                rootUser_id: item.rootUser_id || 0
                            };
                        }

                        // Regex parsing for stringified objects with = or :
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
                            password: null,
                            rootUser_id: 0
                        };
                    });

                    // Filter out the current user and apply search query filter
                    const currentIdValue = this.iamUserId ? parseInt(this.iamUserId) : null;
                    parsed = parsed.filter(u => u.id !== currentIdValue);

                    if (this.searchQuery.trim()) {
                        const q = this.searchQuery.toLowerCase();
                        parsed = parsed.filter(u =>
                            u.name.toLowerCase().includes(q) ||
                            u.domain_name.toLowerCase().includes(q)
                        );
                    }
                    this.searchResults.set(parsed);
                } else {
                    this.searchResults.set([]);
                }
            } catch (err) {
                console.error('Final Search Parse Error:', err, response);
                this.searchResults.set([]);
            }
            this.isSearching.set(false);
            this.cd.detectChanges();
        };

        this.http.get(url, { responseType: 'text' }).subscribe({
            next: (response) => {
                this.loadingService.hide();
                handleResponse(response);
            },
            error: (err) => {
                this.loadingService.hide();
                // Handle 302 redirects where data might be in the error body
                if (err.status === 302 && err.error) {
                    handleResponse(err.error);
                } else {
                    console.error('API Error:', err);
                    this.isSearching.set(false);
                    this.cd.detectChanges();
                }
            }
        });
    }

    performSearch() {
        this.loadDomainUsers();
    }

    onSearchResultClick(user: IamUserResult) {
        this.checkAvailability();
        this.openConvo(user.id, user.name, user.role);
    }

    onChatClick(chat: ChatItem) {
        this.checkAvailability();
        this.openConvo(chat.user_id, chat.name, chat.role);
    }

    openConvo(userId: number, initialName?: string, initialRole?: string) {
        // Switch view immediately and set initial data for responsiveness
        this.currentView.set('convo');
        this.sidebarVisibleMobile.set(false);
        this.convoNotes.set([]);
        this.cd.detectChanges();

        // 1. Mark as Read (if unread messages exist)
        const chat = this.recentChats().find(c => c.user_id === userId);
        if (chat && chat.readCount && chat.readCount > 0) {
            this.http.get(`${API_BASE_URL}/message/read?current_user_id=${this.iamUserId}&iam_user_id=${userId}`, { responseType: 'text' }).subscribe({
                next: () => {
                    this.loadChats(); // Refresh sidebar to clear unread badge immediately
                },
                error: (err) => console.error('Error marking as read:', err)
            });
        }

        // Set initial state while fetching the full profile
        this.selectedConvoUser.set({
            id: userId,
            name: initialName || 'Loading...',
            role: initialRole || 'IAM User',
            domain_name: '',
            password: null,
            rootUser_id: 0
        });

        this.loadingService.show();

        const processResponse = (response: any) => {
            try {
                const cleaned = (response || '').toString().trim().replace(/^"|"$/g, '').trim();
                if (!cleaned) return;

                let parsedName = initialName;
                let parsedRole = initialRole;

                // Robust parsing for JSON or String format
                let data: any = null;
                try {
                    data = JSON.parse(cleaned);
                    if (Array.isArray(data)) data = data[0];
                } catch (e) {
                    // Fallback regex parsing for formats like {id=1, name=x, role=y}
                    const nameM = cleaned.match(/name\s*[=:]\s*([^,)}]+)/i);
                    const roleM = cleaned.match(/role\s*[=:]\s*([^,)}]+)/i);
                    data = {
                        name: nameM ? nameM[1] : null,
                        role: roleM ? roleM[1] : null
                    };
                }

                if (data) {
                    parsedName = data.name || data.iamUserName || parsedName;
                    parsedRole = data.role || data.iamUserRole || data.userRole || parsedRole;
                }

                // Clean up string artifacts (quotes, brackets)
                const clean = (s: any) => s ? s.toString().trim().replace(/^['"\[]|['"\]]$/g, '').trim() : s;
                parsedName = clean(parsedName);
                parsedRole = clean(parsedRole);

                this.selectedConvoUser.set({
                    id: userId,
                    name: parsedName || 'Unknown',
                    role: parsedRole || 'User',
                    domain_name: '',
                    password: null,
                    rootUser_id: 0
                });

                // Load actual messages for this conversation
                this.loadConvoMessages(userId);
            } catch (e) {
                console.error('Error processing convo user details:', e);
            }
            this.cd.detectChanges();
        };

        this.http.get(`${API_BASE_URL}/iamUser/${userId}`, { responseType: 'text' }).subscribe({
            next: (response) => {
                this.loadingService.hide();
                processResponse(response);
            },
            error: (err) => {
                this.loadingService.hide();
                // Handle 302 redirects where data might be in the error body (common in this backend)
                if (err.status === 302 && err.error) {
                    processResponse(err.error);
                } else {
                    console.error('Error fetching user for convo:', err);
                }
            }
        });
    }


    loadConvoMessages(otherUserId: number) {
        if (!this.iamUserId) return;

        this.http.get<Note[]>(`${API_BASE_URL}/message?current_user_id=${this.iamUserId}&iam_user_id=${otherUserId}`).subscribe({
            next: (data) => {
                const sorted = (data || []).sort((a, b) =>
                    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
                );
                this.convoNotes.set(sorted);
                this.scrollToBottomConvo();

                // 2. After convo API, re-call chat API (sidebar list refresh)
                this.loadChats();
            },
            error: (err) => {
                console.error('Error loading convo messages:', err);
                this.loadChats(); // Fallback to refresh even on failure
            }
        });
    }

    sendConvoNote() {
        if (!this.selectedConvoUser() || !this.iamUserId) return;
        const receiverId = this.selectedConvoUser()!.id;

        if (!this.convoNoteText.trim() && !this.convoSelectedFile) return;

        this.isSendingConvo.set(true);
        const formData = new FormData();
        formData.append('sender_id', this.iamUserId);
        formData.append('receiver_id', receiverId.toString());
        formData.append('content', this.convoNoteText);

        if (this.convoSelectedFile) {
            formData.append('attachment', this.convoSelectedFile);
        }

        this.http.post(`${API_BASE_URL}/message`, formData, { responseType: 'text' }).subscribe({
            next: (res) => {
                this.isSendingConvo.set(false);
                this.convoNoteText = '';
                this.convoSelectedFile = null;
                this.convoFeedback.set(res || "Message sent successfully");

                // Refresh the chat history immediately
                this.loadConvoMessages(receiverId);
                this.loadChats(); // Refresh sidebar/recent chats

                // WebSocket Notification
                this.wsService.sendNotification(receiverId.toString());

                setTimeout(() => {
                    this.convoFeedback.set(null);
                    this.cd.detectChanges();
                }, 3000);
            },
            error: (err) => {
                this.isSendingConvo.set(false);
                this.convoFeedback.set("Error sending message");
                setTimeout(() => {
                    this.convoFeedback.set(null);
                    this.cd.detectChanges();
                }, 3000);
            }
        });
    }

    onFileSelectedConvo(event: any) {
        const file = event.target.files[0];
        if (file) {
            const maxSize = 50 * 1024 * 1024; // 50MB
            if (file.size > maxSize) {
                this.convoFeedback.set("File size exceeds 50MB limit");
                this.convoSelectedFile = null;
                // Clear feedback after 3s
                setTimeout(() => {
                    this.convoFeedback.set(null);
                    this.cd.detectChanges();
                }, 3000);
            } else {
                this.convoSelectedFile = file;
            }
        }
    }

    private scrollToBottomConvo() {
        setTimeout(() => {
            if (this.convoScrollContainer) {
                const element = this.convoScrollContainer.nativeElement;
                element.scrollTop = element.scrollHeight;
            }
        }, 100);
    }

    clearSearch() {
        this.searchQuery = '';
        this.searchResults.set([]);
        this.isSearching.set(false);
    }

    loadNotes(silent = false) {
        if (!this.iamUserId) return;
        if (!silent) this.loadingService.show();
        this.http.get<Note[]>(`${API_BASE_URL}/notes?iamUser_id=${this.iamUserId}`).subscribe({
            next: (data) => {
                if (!silent) this.loadingService.hide();
                // newest first: "last one at top"
                const sortedNotes = data.sort((a, b) =>
                    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
                );
                this.notes.set(sortedNotes);
                this.cd.detectChanges();
                this.scrollToBottom();
            },
            error: (err) => {
                if (!silent) this.loadingService.hide();
                console.error('Error loading notes:', err);
                this.cd.detectChanges();
            }
        });
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            const maxSize = 50 * 1024 * 1024; // 50MB
            if (file.size > maxSize) {
                this.noteFeedback.set("File size exceeds 50MB limit");
                this.selectedFile = null;
                // Clear feedback after 3s
                setTimeout(() => {
                    this.noteFeedback.set(null);
                    this.cd.detectChanges();
                }, 3000);
            } else {
                this.selectedFile = file;
            }
        }
    }

    sendNote() {
        if (!this.noteText.trim() && !this.selectedFile) return;
        if (!this.iamUserId) return;

        this.isSending.set(true);
        const formData = new FormData();
        formData.append('content', this.noteText);
        formData.append('iamUser_id', this.iamUserId);
        if (this.selectedFile) {
            formData.append('attachment', this.selectedFile);
        }

        this.http.post(`${API_BASE_URL}/notes`, formData, { responseType: 'text' }).subscribe({
            next: (response) => {
                this.isSending.set(false);
                this.noteFeedback.set(response || 'Note sent successfully');

                // Reset inputs
                const originalText = this.noteText;
                this.noteText = '';
                this.selectedFile = null;

                // Refresh notes list
                this.loadNotes();

                // Clear success message after 3 seconds and restore focus/placeholder
                setTimeout(() => {
                    this.noteFeedback.set(null);
                    this.cd.detectChanges();
                }, 3000);

                this.cd.detectChanges();
                this.scrollToBottom();
            },
            error: (err) => {
                this.isSending.set(false);
                this.noteFeedback.set('Failed to send note');
                console.error('Error sending note:', err);

                setTimeout(() => {
                    this.noteFeedback.set(null);
                    this.cd.detectChanges();
                }, 3000);

                this.cd.detectChanges();
            }
        });
    }

    isDownloading(key: string | null): boolean {
        if (!key) return false;
        return this.downloadingKeys().has(key);
    }

    downloadAttachment(key: string) {
        if (this.isDownloading(key)) return;

        // Add key to downloading set
        const current = new Set(this.downloadingKeys());
        current.add(key);
        this.downloadingKeys.set(current);

        this.http.get(`${API_BASE_URL}/notes/download?key=${key}`, {
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
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                }
            },
            error: (err) => {
                console.error('Download error:', err);
                const updated = new Set(this.downloadingKeys());
                updated.delete(key);
                this.downloadingKeys.set(updated);
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

    // NEW Edit/Delete Logic
    handleNoteClick(note: any) {
        // Toggle selection for any message to show dropdown
        const currentTime = new Date().getTime();
        const gap = currentTime - this.lastClickTime;

        if (gap > 0 && gap < 300) {
            if (this.selectedNoteId() === note.id) {
                this.selectedNoteId.set(null);
            } else {
                this.selectedNoteId.set(note.id);
            }
            this.lastClickTime = 0;
        } else {
            this.lastClickTime = currentTime;
        }
    }

    startEdit(note: any) {
        // Restrict to own messages
        if (note.sender_id && note.sender_id.toString() !== this.iamUserId) return;

        this.editingNoteId.set(note.id);
        this.editingContent = note.content;
        this.originalContent = note.content;
        this.selectedNoteId.set(null); // Hide dropdown
    }

    cancelEdit() {
        this.editingNoteId.set(null);
        this.editingContent = '';
        this.originalContent = '';
    }

    saveEdit() {
        if (!this.editingNoteId()) return;
        const id = this.editingNoteId();

        this.loadingService.show();
        let baseUrl = `${API_BASE_URL}/notes`;
        if (this.currentView() === 'convo') baseUrl = `${API_BASE_URL}/message`;
        if (this.currentView() === 'group-convo') baseUrl = `${API_BASE_URL}/group_message`;

        const url = `${baseUrl}?id=${id}&content=${encodeURIComponent(this.editingContent)}`;

        this.http.put(url, {}, { responseType: 'text' }).subscribe({
            next: () => {
                this.loadingService.hide();
                this.editingNoteId.set(null);

                if (this.currentView() === 'convo' && this.selectedConvoUser()) {
                    this.loadConvoMessages(this.selectedConvoUser()!.id);
                    this.loadChats();
                } else if (this.currentView() === 'group-convo') {
                    this.loadGroupMessages();
                } else {
                    this.loadNotes();
                }
                this.scrollToBottom();
            },
            error: (err) => {
                this.loadingService.hide();
                console.error('Error editing note:', err);
            }
        });
    }

    openDeleteConfirm(noteId: number) {
        // We might want to pass the whole note to check sender_id easily
        // but for now let's assume the UI handles visibility of the button
        this.noteToDeleteId.set(noteId);
        this.showDeleteConfirm.set(true);
        this.selectedNoteId.set(null);
    }

    deleteNote() {
        if (!this.noteToDeleteId()) return;
        const id = this.noteToDeleteId();

        this.loadingService.show();
        let baseUrl = `${API_BASE_URL}/notes`;
        if (this.currentView() === 'convo') baseUrl = `${API_BASE_URL}/message`;
        if (this.currentView() === 'group-convo') baseUrl = `${API_BASE_URL}/group_message`;

        this.http.delete(`${baseUrl}?id=${id}`, { responseType: 'text' }).subscribe({
            next: () => {
                this.loadingService.hide();
                this.showDeleteConfirm.set(false);
                this.noteToDeleteId.set(null);

                if (this.currentView() === 'convo' && this.selectedConvoUser()) {
                    this.loadConvoMessages(this.selectedConvoUser()!.id);
                    this.loadChats();
                } else if (this.currentView() === 'group-convo') {
                    this.loadGroupMessages();
                } else {
                    this.loadNotes();
                }
            },
            error: (err) => {
                this.loadingService.hide();
                console.error('Error deleting note:', err);
                this.showDeleteConfirm.set(false);
            }
        });
    }

    // Announcement methods
    loadAnnouncements(silent = false) {
        if (!this.domainName()) return;
        if (!silent) this.loadingService.show();
        this.http.get<Announcement[]>(`${API_BASE_URL}/announcement/domain?domain_name=${this.domainName()}`).subscribe({
            next: (data) => {
                if (!silent) this.loadingService.hide();
                this.announcements.set(data || []);
                this.cd.detectChanges();
            },
            error: (err) => {
                if (!silent) this.loadingService.hide();
                console.error('Error fetching announcements:', err);
                this.cd.detectChanges();
            }
        });
    }

    getAnnHeader(ann: Announcement): string {
        if (ann.content) {
            return ann.content;
        }
        return 'Announcement attached with file';
    }

    formatChatTime(timestamp: string | undefined): string {
        if (!timestamp) return '';
        try {
            // Fix for mobile WebViews that struggle with "YYYY-MM-DD HH:MM:SS"
            let t = timestamp;
            if (t.includes(' ')) {
                t = t.replace(' ', 'T');
            }
            const date = new Date(t);
            if (isNaN(date.getTime())) return timestamp;

            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        } catch (e) {
            return timestamp;
        }
    }

    formatAnnTimestamp(timestamp: string | undefined): string {
        if (!timestamp) return '';
        try {
            let t = timestamp;
            if (t.includes(' ')) t = t.replace(' ', 'T');
            const date = new Date(t);
            if (isNaN(date.getTime())) return timestamp;

            return date.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        } catch (e) {
            return timestamp;
        }
    }

    onViewAnnDetails(id: number) {
        this.loadingService.show();
        const url = `${API_BASE_URL}/announcement?id=${id}`;

        this.http.get<Announcement>(url).subscribe({
            next: (data) => {
                this.loadingService.hide();
                this.selectedAnn.set(data);
                this.showAnnDetailsModal.set(true);
                this.cd.detectChanges();
            },
            error: (err) => {
                this.loadingService.hide();
                console.error('Error fetching announcement details:', err);
                this.cd.detectChanges();
            }
        });
    }

    closeAnnModal() {
        this.showAnnDetailsModal.set(false);
        this.selectedAnn.set(null);
    }

    setQueryFilter(filter: 'all' | 'waiting' | 'responded') {
        this.queryFilter.set(filter);
        this.loadQueries();
    }

    loadQueries(silent = false) {
        if (!this.iamUserId) return;
        if (!silent) this.loadingService.show();

        let url = `${API_BASE_URL}/queries?iamUser_id=${this.iamUserId}`;
        const filter = this.queryFilter();
        if (filter === 'waiting') {
            url = `${API_BASE_URL}/queries/yet_to_response?iamUser_id=${this.iamUserId}`;
        } else if (filter === 'responded') {
            url = `${API_BASE_URL}/queries/responded?iamUser_id=${this.iamUserId}`;
        }

        this.http.get<UserQuery[]>(url).subscribe({
            next: (data) => {
                if (!silent) this.loadingService.hide();
                this.allQueries.set(data || []);
                this.cd.detectChanges();
            },
            error: (err) => {
                if (!silent) this.loadingService.hide();
                console.error('Error fetching queries:', err);
                this.cd.detectChanges();
            }
        });
    }

    filteredQueries() {
        return this.allQueries();
    }

    onViewQueryDetails(query: UserQuery) {
        this.selectedQuery.set(query);
        this.showQueryDetailsModal.set(true);
    }

    closeQueryModal() {
        this.showQueryDetailsModal.set(false);
        this.selectedQuery.set(null);
    }

    startCreateQuery() {
        this.queryText = '';
        this.showCreateQueryModal.set(true);
    }

    sendQuery() {
        if (!this.queryText.trim() || !this.iamUserId) return;

        this.isSendingQuery.set(true);
        // User requested query parameters in the POST URL
        const queryParam = encodeURIComponent(this.queryText);
        const domainParam = encodeURIComponent(this.domainName());
        const url = `${API_BASE_URL}/queries?sender_id=${this.iamUserId}&domain_name=${domainParam}&query=${queryParam}`;

        this.http.post(url, {}, { responseType: 'text' }).subscribe({
            next: (res) => {
                this.isSendingQuery.set(false);
                this.queryText = '';
                this.showCreateQueryModal.set(false);
                this.currentView.set('queries'); // Shift to queries view if not already there
                this.queryFeedback.set("Query sent successfully");
                this.loadQueries();

                setTimeout(() => {
                    this.queryFeedback.set(null);
                    this.cd.detectChanges();
                }, 3000);
            },
            error: (err) => {
                this.isSendingQuery.set(false);
                this.queryFeedback.set("Error sending query");
                setTimeout(() => {
                    this.queryFeedback.set(null);
                    this.cd.detectChanges();
                }, 3000);
            }
        });
    }

    startEditQuery(query: UserQuery) {
        this.selectedQuery.set(query);
        this.originalQueryText = query.query;
        this.editQueryText = query.query;
        this.showEditQueryModal.set(true);
    }

    submitEditQuery() {
        const query = this.selectedQuery();
        if (!query || this.editQueryText === this.originalQueryText) return;

        this.isEditingQuery.set(true);
        const queryParam = encodeURIComponent(this.editQueryText);
        const url = `${API_BASE_URL}/queries?id=${query.id}&query=${queryParam}`;

        this.http.put(url, {}, { responseType: 'text' }).subscribe({
            next: (res) => {
                this.isEditingQuery.set(false);
                this.showEditQueryModal.set(false);
                this.queryFeedback.set("Query edited successfully");
                this.setQueryFilter('all');
                setTimeout(() => {
                    this.queryFeedback.set(null);
                    this.cd.detectChanges();
                }, 3000);
            },
            error: (err) => {
                this.isEditingQuery.set(false);
                this.queryFeedback.set("Error editing query.");
                setTimeout(() => {
                    this.queryFeedback.set(null);
                    this.cd.detectChanges();
                }, 3000);
            }
        });
    }

    startDeleteQuery() {
        this.deleteQueryConfirmText = '';
        this.showEditQueryModal.set(false);
        this.showDeleteQueryConfirm.set(true);
    }

    submitDeleteQuery() {
        const query = this.selectedQuery();
        if (!query || this.deleteQueryConfirmText.toLowerCase() !== 'delete') return;

        this.isDeletingQuery.set(true);
        const url = `${API_BASE_URL}/queries?id=${query.id}`;

        this.http.delete(url, { responseType: 'text' }).subscribe({
            next: (res) => {
                this.isDeletingQuery.set(false);
                this.showDeleteQueryConfirm.set(false);
                this.queryFeedback.set("Query deleted successfully");
                this.setQueryFilter('all');
                setTimeout(() => {
                    this.queryFeedback.set(null);
                    this.cd.detectChanges();
                }, 3000);
            },
            error: (err) => {
                this.isDeletingQuery.set(false);
                this.queryFeedback.set("Error deleting query.");
                setTimeout(() => {
                    this.queryFeedback.set(null);
                    this.cd.detectChanges();
                }, 3000);
            }
        });
    }

    formatQueryTimestamp(timestamp: string | undefined): string {
        if (!timestamp) return '';
        try {
            let t = timestamp;
            if (t.includes(' ')) t = t.replace(' ', 'T');
            const date = new Date(t);
            if (isNaN(date.getTime())) return timestamp;

            return date.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        } catch (e) {
            return timestamp;
        }
    }

    loadGroups(silent = false) {
        if (!this.iamUserId) return;
        if (!silent) this.loadingService.show();
        const url = `${API_BASE_URL}/group/subscriber_group?subscriber_id=${this.iamUserId}&domain_name=${this.domainName()}`;

        this.http.get<GroupItem[]>(url).subscribe({
            next: (data) => {
                if (!silent) this.loadingService.hide();
                const items = data || [];
                this.groups.set(items);

                // For each group, establish a WebSocket connection
                items.forEach(g => this.wsService.connectToGroup(g.id));

                // Refresh the selected group reference if it exists
                const currentId = this.selectedGroup()?.id;
                if (currentId) {
                    const fresh = items.find(g => g.id === currentId);
                    if (fresh) {
                        this.selectedGroup.set(fresh);
                    }
                }

                this.cd.detectChanges();
            },
            error: (err) => {
                if (!silent) this.loadingService.hide();
                console.error('Error loading groups:', err);
                this.cd.detectChanges();
            }
        });
    }

    onGroupClick(group: GroupItem) {
        this.selectedGroup.set(group);
        this.currentView.set('group-convo');
        this.sidebarVisibleMobile.set(false);
        this.loadGroupMessages();

        // Mark as read if unread group messages exist
        if (group.readCount && group.readCount > 0) {
            const userId = this.iamUserId;
            this.http.get(`${API_BASE_URL}/group_message/read?id=${group.id}&userId=${userId}`, { responseType: 'text' }).subscribe({
                next: () => {
                    this.loadGroups(); // Ensure left side list updates after read status change
                },
                error: (err) => console.error('Error marking group as read:', err)
            });
        }
    }

    loadGroupMessages(silent = false) {
        if (!this.selectedGroup()) return;
        if (!silent) this.loadingService.show();
        const groupId = this.selectedGroup()?.id;
        const dName = this.domainName();
        const url = `${API_BASE_URL}/group_message?group_id=${groupId}&domain_name=${encodeURIComponent(dName)}`;

        this.http.get<GroupMessage[]>(url).subscribe({
            next: (data) => {
                if (!silent) this.loadingService.hide();
                const sorted = (data || []).sort((a, b) =>
                    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
                );
                this.groupMessages.set(sorted);
                this.cd.detectChanges();
                this.scrollToBottom();
            },
            error: (err) => {
                if (!silent) this.loadingService.hide();
                console.error('Error loading group messages:', err);
                this.loadGroups(true); // Fallback to refresh even on failure
                this.cd.detectChanges();
            }
        });
    }

    sendGroupMessage() {
        if (!this.groupMessageText.trim() && !this.groupSelectedFile) return;
        if (!this.selectedGroup()) return;

        this.isSendingGroup.set(true);
        const groupId = this.selectedGroup()?.id;
        const formData = new FormData();
        formData.append('group_id', groupId!.toString());
        formData.append('sender_id', this.iamUserId!);
        formData.append('content', this.groupMessageText);
        formData.append('domain_name', this.domainName());
        if (this.groupSelectedFile) {
            formData.append('file', this.groupSelectedFile);
        }

        this.http.post(`${API_BASE_URL}/group_message`, formData, { responseType: 'text' }).subscribe({
            next: (res) => {
                this.groupMessageText = '';
                this.groupSelectedFile = null;
                this.isSendingGroup.set(false);
                this.groupFeedback.set(res || "Message sent successfully");

                // WebSocket Notification for group
                if (groupId) {
                    this.wsService.sendGroupNotification(groupId.toString());
                }

                this.loadGroupMessages();
                this.loadGroups(); // Refresh sidebar to show recent activity at top
                setTimeout(() => this.groupFeedback.set(null), 3000);
            },
            error: (err) => {
                this.isSendingGroup.set(false);
                this.groupFeedback.set('Failed to send message');
                setTimeout(() => this.groupFeedback.set(null), 3000);
            }
        });
    }

    onFileSelectedGroup(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.groupSelectedFile = file;
        }
    }

    logout() {
        if (isPlatformBrowser(this.platformId)) {
            this.wsService.disconnect(); // Disconnect WS
            localStorage.removeItem('iamUserId');
            localStorage.removeItem('iamUserName');
            localStorage.removeItem('iamDomain');
        }
        this.router.navigate(['/auth-v1']);
    }


    startResize(event: MouseEvent) {
        event.preventDefault();
        this.isResizing.set(true);
    }

    onResize(event: MouseEvent) {
        if (!this.isResizing()) return;

        const minWidth = Math.floor(window.innerWidth * 0.3);
        const maxWidth = Math.floor(window.innerWidth * 0.4);
        let newWidth = event.clientX;

        if (newWidth < minWidth) newWidth = minWidth;
        if (newWidth > maxWidth) newWidth = maxWidth;

        this.sidebarWidth.set(newWidth);
    }

    stopResize() {
        this.isResizing.set(false);
    }

    private scrollToBottom() {
        setTimeout(() => {
            let element: HTMLElement | null = null;
            if (this.currentView() === 'notes' && this.notesScrollContainer) {
                element = this.notesScrollContainer.nativeElement;
            } else if (this.currentView() === 'convo' && this.convoScrollContainer) {
                element = this.convoScrollContainer.nativeElement;
            } else if (this.currentView() === 'group-convo' && this.groupConvoScrollContainer) {
                element = this.groupConvoScrollContainer.nativeElement;
            }

            if (element) {
                element.scrollTop = element.scrollHeight;
            }
        }, 100);
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        // If we have a selected note, check if click was outside the bubble
        if (this.selectedNoteId()) {
            const clickedInside = (event.target as HTMLElement).closest('.note-bubble');
            if (!clickedInside) {
                this.selectedNoteId.set(null);
            }
        }
    }

    private async requestNotificationPermission() {
        if (!isPlatformBrowser(this.platformId)) return;
        try {
            const perm = await LocalNotifications.checkPermissions();
            if (perm.display !== 'granted') {
                await LocalNotifications.requestPermissions();
            }
        } catch (e) {
            console.warn('Notifications permission error', e);
        }
    }

    private triggerPushNotification(msgRaw: string) {
        if (!isPlatformBrowser(this.platformId)) return;
        
        // Use untracked to prevent re-triggering when view changes
        const view = untracked(() => this.currentView());
        
        // Skip notification if user is already inside a conversation view
        if (view === 'convo' || view === 'group-convo') {
            return;
        }

        let title = "OfficeWing - New Message";
        let body = "You have received a new update.";

        if (msgRaw.includes('GROUP_')) {
            title = "OfficeWing - Group Chat";
            body = "New message in a group.";
        } else if (msgRaw.includes('ANNOUNCEMENT')) {
            title = "OfficeWing - Announcement";
            body = "A new announcement has been posted.";
        } else if (msgRaw.includes('QUERY')) {
            title = "OfficeWing - Query Update";
            body = "There's an update on your query.";
        } else {
            title = "OfficeWing - Direct Message";
            body = "You have a new private message.";
        }

        try {
            LocalNotifications.schedule({
                notifications: [{
                    title: title,
                    body: body,
                    id: Math.floor(Math.random() * 1000000),
                    schedule: { at: new Date(Date.now() + 500) },
                    sound: 'default'
                }]
            });
        } catch (e) {
            console.warn('Local notification failed', e);
        }
    }
}
