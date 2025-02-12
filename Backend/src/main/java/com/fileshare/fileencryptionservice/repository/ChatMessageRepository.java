package com.fileshare.fileencryptionservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fileshare.fileencryptionservice.entity.ChatMessage;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByReceiverNameOrSenderName(String receiverName, String senderName);
}
