package com.fileshare.fileencryptionservice.model;

public class EncryptionRequest {

    private String encryptionKey;

    // Default constructor
    public EncryptionRequest() {}

    // Constructor with parameters
    public EncryptionRequest(String encryptionKey) {
        this.encryptionKey = encryptionKey;
    }

    // Getter for encryptionKey
    public String getEncryptionKey() {
        return encryptionKey;
    }

    // Setter for encryptionKey
    public void setEncryptionKey(String encryptionKey) {
        this.encryptionKey = encryptionKey;
    }

    // Optional: toString method for easier debugging
    @Override
    public String toString() {
        return "EncryptionRequest{" +
                "encryptionKey='" + encryptionKey + '\'' +
                '}';
    }
}
