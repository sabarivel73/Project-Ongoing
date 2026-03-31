import { Injectable, signal } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { WS_BASE_URL } from '../config';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private mainClient: Client | null = null;
    private groupClients: Map<number, Client> = new Map();
    public messageReceived = signal<string | null>(null);

    connect(iamUserId: string) {
        if (this.mainClient && this.mainClient.active) {
            return;
        }

        this.mainClient = new Client({
            webSocketFactory: () => {
                // Backend now expects ?id=ID format
                return new SockJS(`${WS_BASE_URL}?id=${iamUserId}`, null, {
                    transports: ['websocket']
                });
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        this.mainClient.onConnect = (frame) => {
            // Principal name is now "id=ID" based on determineUser logic
            this.mainClient?.subscribe('/user/queue/notifications', (message) => {
                if (message.body) {
                    this.messageReceived.set(message.body + '_' + Date.now());
                }
            });
        };

        this.mainClient.activate();
    }

    connectToGroup(groupId: number) {
        if (this.groupClients.has(groupId) && this.groupClients.get(groupId)?.active) {
            return;
        }

        const groupClient = new Client({
            webSocketFactory: () => {
                // Pass id=GROUP_ID for group-specific connection
                return new SockJS(`${WS_BASE_URL}?id=${groupId}`, null, {
                    transports: ['websocket']
                });
            },
            reconnectDelay: 5000,
        });

        groupClient.onConnect = (frame) => {
            // Using groupId as the principal name for convertAndSendToUser
            // Backend: simpMessagingTemplate.convertAndSendToUser(groupId, "/queue/groupNotification", "New Message");
            groupClient.subscribe('/user/queue/groupNotification', (message) => {
                if (message.body) {
                    this.messageReceived.set(`GROUP_${groupId}_` + message.body + '_' + Date.now());
                }
            });
        };

        groupClient.activate();
        this.groupClients.set(groupId, groupClient);
    }

    sendNotification(recipientId: string) {
        if (this.mainClient && this.mainClient.connected) {
            // Updated principal logic for individual notifications
            const target = `id=${recipientId}`;
            this.mainClient.publish({
                destination: '/be/notification',
                body: target
            });
        }
    }

    sendGroupNotification(groupId: string) {
        if (this.mainClient && this.mainClient.connected) {
            // Updated to match backend principal logic where Id = query
            const target = `id=${groupId}`;
            this.mainClient.publish({
                destination: '/be/group_notification',
                body: target
            });
        }
    }

    disconnect() {
        if (this.mainClient) {
            this.mainClient.deactivate();
        }
        this.groupClients.forEach(client => client.deactivate());
        this.groupClients.clear();
    }
}
