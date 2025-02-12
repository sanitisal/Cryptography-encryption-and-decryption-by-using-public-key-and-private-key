package com.fileshare.fileencryptionservice.controller;

import com.fileshare.fileencryptionservice.model.DownloadResponse;
import com.fileshare.fileencryptionservice.model.EncryptionRequest;
import com.fileshare.fileencryptionservice.service.DatabaseService;
import com.fileshare.fileencryptionservice.util.CryptoUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Base64;

@RestController
@RequestMapping("/api/files")
@CrossOrigin
public class FileController {

    @Value("${file.upload-dir}")
    private String uploadDir;
    private final DatabaseService databaseService;

    public FileController(DatabaseService databaseService) {
        this.databaseService = databaseService;
    }

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) throws Exception {
        SecretKey aesKey = CryptoUtil.generateAESKey();
        byte[] encryptedData = CryptoUtil.encryptAES(file.getBytes(), aesKey);

        // Ensure upload directory exists
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            boolean created = dir.mkdirs();  // Creates the directories if they don't exist
            if (!created) {
                throw new IOException("Failed to create upload directory.");
            }
        }

        File targetFile = new File(uploadDir + File.separator + file.getOriginalFilename() + ".enc");
        try (FileOutputStream fos = new FileOutputStream(targetFile)) {
            fos.write(encryptedData);
        }

        String encryptedAesKey = Base64.getEncoder().encodeToString(CryptoUtil.encryptAESKeyWithRSA(aesKey));
        try {
            databaseService.storeEncryptedKey(file.getOriginalFilename(), encryptedAesKey);
        }catch(Exception ex)
        {
            throw new Exception("File already uploaded. Please upload by different name");
        }

        return encryptedAesKey;
    }

    @PostMapping("/getfilename")
    public String getFileName(@RequestBody EncryptionRequest req) {
        String fileName = databaseService.getFileName(req.getEncryptionKey());
        System.out.println("FileName: "+fileName);
        return fileName==null?"NA":fileName;
    }

        @PostMapping("/download")
    public ResponseEntity<byte[]> downloadFile(@RequestBody EncryptionRequest req) throws Exception {
        String fileName = databaseService.getFileName(req.getEncryptionKey());
        System.out.println(fileName);
        if (fileName == null) {
            throw new FileNotFoundException("No file exists for download.");
        }

        byte[] encryptedKeyBytes = Base64.getDecoder().decode(req.getEncryptionKey());
        SecretKey aesKey;
        try {
            aesKey = CryptoUtil.decryptAESKeyWithRSA(encryptedKeyBytes);
        } catch (Exception e) {
            throw new RuntimeException("Failed to decrypt AES key. Possible incorrect RSA key.", e);
        }

        File encryptedFile = new File(uploadDir + File.separator + fileName + ".enc");
        byte[] encryptedData = Files.readAllBytes(encryptedFile.toPath());

        byte[] decryptedData;
        try {
            decryptedData = CryptoUtil.decryptAES(encryptedData, aesKey);
        } catch (Exception e) {
            throw new RuntimeException("File decryption failed. Possible incorrect encryption key.", e);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        //headers.setContentDisposition(ContentDisposition.attachment().filename(fileName).build());
        // Ensure filename is correctly formatted with double quotes
        headers.add("Content-Disposition", "attachment; filename=\"" + fileName + "\"");

        return ResponseEntity.ok()
                .headers(headers)
                .body(decryptedData);
    }

}
