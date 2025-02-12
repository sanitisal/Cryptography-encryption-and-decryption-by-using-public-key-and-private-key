package com.fileshare.fileencryptionservice.controller;

import com.fileshare.fileencryptionservice.entity.ChatMessage; 
import com.fileshare.fileencryptionservice.model.Message;
import com.fileshare.fileencryptionservice.repository.ChatMessageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin
public class ChatController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatMessageRepository chatMessageRepository;

    // Constructor
    public ChatController(SimpMessagingTemplate simpMessagingTemplate, ChatMessageRepository chatMessageRepository) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.chatMessageRepository = chatMessageRepository;
    }

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public Message receiveMessage(Message message) throws InterruptedException {
        // Save to the database
        chatMessageRepository.save(new ChatMessage(
                message.getSenderName(),
                message.getReceiverName(),
                message.getMessage(),
                message.getMedia(),
                message.getMediaType(),
                message.getStatus(),
                System.currentTimeMillis()  // Current timestamp
        ));

        // Simulate delay for demonstration (optional)
        Thread.sleep(1000);

        return message;
    }

    @MessageMapping("/private-message")
    public void privateMessage(Message message) {
        String receiver = message.getReceiverName();
        simpMessagingTemplate.convertAndSendToUser(receiver, "/private", message);

        // Save private message to the database
        chatMessageRepository.save(new ChatMessage(
                message.getSenderName(),
                message.getReceiverName(),
                message.getMessage(),
                message.getMedia(),
                message.getMediaType(),
                message.getStatus(),
                System.currentTimeMillis()  // Current timestamp
        ));
    }

    @GetMapping("/messages/history/{user1}/{user2}")
    public ResponseEntity<List<ChatMessage>> getChatHistory(
            @PathVariable String user1,
            @PathVariable String user2
    ) {
        // List of messages between user1 and user2
        List<ChatMessage> messages = chatMessageRepository.findByReceiverNameOrSenderName(user1, user2)
                .stream()
                .filter(msg -> (msg.getMessage() != null && !msg.getMessage().trim().isEmpty()) ||
                        (msg.getMedia() != null && !msg.getMedia().trim().isEmpty()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(messages);
    }
}
