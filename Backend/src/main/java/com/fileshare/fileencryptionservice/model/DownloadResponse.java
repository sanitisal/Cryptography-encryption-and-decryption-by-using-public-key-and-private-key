package com.fileshare.fileencryptionservice.model;

public class DownloadResponse {

    private String fileName;
    private byte[] data;

    // Default constructor
    public DownloadResponse() {}

    // Constructor with parameters
    public DownloadResponse(String fileName, byte[] data) {
        this.fileName = fileName;
        this.data = data;
    }

    // Getter for fileName
    public String getFileName() {
        return fileName;
    }

    // Setter for fileName
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    // Getter for data
    public byte[] getData() {
        return data;
    }

    // Setter for data
    public void setData(byte[] data) {
        this.data = data;
    }

    // Optional: toString method for easier debugging
    @Override
    public String toString() {
        return "DownloadResponse{" +
                "fileName='" + fileName + '\'' +
                ", data=" + (data != null ? data.length : 0) + " bytes" +
                '}';
    }
}
