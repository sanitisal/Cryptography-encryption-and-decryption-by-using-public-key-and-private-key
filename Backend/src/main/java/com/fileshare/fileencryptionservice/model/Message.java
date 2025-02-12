package com.fileshare.fileencryptionservice.model;

import com.fileshare.fileencryptionservice.model.Status;

public class Message {

    private String senderName;
    private String receiverName;
    private String message;
    private String media;
    private Status status;
    private String mediaType;

    // Default constructor
    public Message() {}

    // Constructor with parameters
    public Message(String senderName, String receiverName, String message, String media, Status status, String mediaType) {
        this.senderName = senderName;
        this.receiverName = receiverName;
        this.message = message;
        this.media = media;
        this.status = status;
        this.mediaType = mediaType;
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

    // Getter and Setter for status
    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    // Getter and Setter for mediaType
    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }

    // Optional: toString method for easier debugging
    @Override
    public String toString() {
        return "Message{" +
                "senderName='" + senderName + '\'' +
                ", receiverName='" + receiverName + '\'' +
                ", message='" + message + '\'' +
                ", media='" + media + '\'' +
                ", status=" + status +
                ", mediaType='" + mediaType + '\'' +
                '}';
    }
}
