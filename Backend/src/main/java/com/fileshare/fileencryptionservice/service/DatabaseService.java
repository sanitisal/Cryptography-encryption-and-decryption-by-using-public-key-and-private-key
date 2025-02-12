package com.fileshare.fileencryptionservice.service;

import com.fileshare.fileencryptionservice.entity.EncryptionKey; 
import com.fileshare.fileencryptionservice.repository.EncryptionKeyRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class DatabaseService {
    private final EncryptionKeyRepository encryptionKeyRepository;

    public DatabaseService(EncryptionKeyRepository encryptionKeyRepository) {
        this.encryptionKeyRepository = encryptionKeyRepository;
    }

    public void storeEncryptedKey(String fileName, String encryptedKey) {
        encryptionKeyRepository.save(new EncryptionKey(fileName, encryptedKey));
    }

    public String getEncryptedKey(String fileName) {
        Optional<EncryptionKey> keyOpt = encryptionKeyRepository.findByFileName(fileName);
        return keyOpt.map(EncryptionKey::getEncryptedKey).orElse(null);
    }
    public String getFileName(String encryptedKey) {
        Optional<String> filename = encryptionKeyRepository.findByEncryptionKey(encryptedKey);
        return filename.orElse(null);
    }
}
