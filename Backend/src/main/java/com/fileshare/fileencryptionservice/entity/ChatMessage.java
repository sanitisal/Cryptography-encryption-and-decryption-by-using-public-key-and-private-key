package com.fileshare.fileencryptionservice.entity;

import com.fileshare.fileencryptionservice.model.Status; 
import jakarta.persistence.*;

@Entity
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String senderName;
    private String receiverName;
    private String message;

    @Lob
    private String media;

    private String mediaType;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(nullable = false)
    private Long timestamp;

    // Default constructor
    public ChatMessage() {}

    // Constructor with parameters
    public ChatMessage(String senderName, String receiverName, String message, String media, String mediaType, Status status, Long timestamp) {
        this.senderName = senderName;
        this.receiverName = receiverName;
        this.message = message;
        this.media = media;
        this.mediaType = mediaType;
        this.status = status;
        this.timestamp = timestamp;
    }

    // Getter and Setter for id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getter and Setter for senderName
    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    // Getter and Setter for receiverName
    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    // Getter and Setter for message
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    // Getter and Setter for media
    public String getMedia() {
        return media;
    }

    public void setMedia(String media) {
        this.media = media;
    }

    // Getter and Setter for mediaType
    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }

    // Getter and Setter for status
    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    // Getter and Setter for timestamp
    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    // Optional: toString method for easier debugging
    @Override
    public String toString() {
        return "ChatMessage{" +
                "id=" + id +
                ", senderName='" + senderName + '\'' +
                ", receiverName='" + receiverName + '\'' +
                ", message='" + message + '\'' +
                ", media='" + media + '\'' +
                ", mediaType='" + mediaType + '\'' +
                ", status=" + status +
                ", timestamp=" + timestamp +
                '}';
    }
}
