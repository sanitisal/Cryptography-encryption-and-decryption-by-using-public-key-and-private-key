package com.fileshare.fileencryptionservice.repository;
import com.fileshare.fileencryptionservice.entity.EncryptionKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EncryptionKeyRepository extends JpaRepository<EncryptionKey, Long> {
    Optional<EncryptionKey> findByFileName(String fileName);

    @Query("select c.fileName from EncryptionKey c where c.encryptedKey=:encryptionKey")
    Optional<String> findByEncryptionKey(String encryptionKey);
}
