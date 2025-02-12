package com.fileshare.fileencryptionservice.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "encryption_keys")
public class EncryptionKey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String fileName;

    @Lob
    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String encryptedKey;

    // Default constructor
    public EncryptionKey() {
    }

    // Constructor with parameters
    public EncryptionKey(String fileName, String encryptedKey) {
        this.fileName = fileName;
        this.encryptedKey = encryptedKey;
    }

    // Getter for id
    public Long getId() {
        return id;
    }

    // Setter for id
    public void setId(Long id) {
        this.id = id;
    }

    // Getter for fileName
    public String getFileName() {
        return fileName;
    }

    // Setter for fileName
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    // Getter for encryptedKey
    public String getEncryptedKey() {
        return encryptedKey;
    }

    // Setter for encryptedKey
    public void setEncryptedKey(String encryptedKey) {
        this.encryptedKey = encryptedKey;
    }

    // Optional: toString method for easier debugging
    @Override
    public String toString() {
        return "EncryptionKey{" +
                "id=" + id +
                ", fileName='" + fileName + '\'' +
                ", encryptedKey='" + encryptedKey + '\'' +
                '}';
    }
}
