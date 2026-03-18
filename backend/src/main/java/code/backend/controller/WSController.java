package code.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class WSController {
    @Autowired private SimpMessagingTemplate simpMessagingTemplate;
    @MessageMapping("/notification") public void sendNotification(String iamUserId, Principal principal) {
        simpMessagingTemplate.convertAndSendToUser(iamUserId,"/queue/notifications","New Message");
    }
    @MessageMapping("/group_notification") public void sendGroupNotification(String groupId, Principal principal) {
        simpMessagingTemplate.convertAndSendToUser(groupId,"/queue/groupNotification","New Message");
    }
}
