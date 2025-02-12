package com.fileshare.fileencryptionservice.util;

import javax.crypto.*; 
import javax.crypto.spec.SecretKeySpec;
import java.io.*;
import java.security.*;
import java.util.Base64;

public class CryptoUtil {
    private static final String AES_ALGORITHM = "AES/ECB/PKCS5Padding";
    private static final String RSA_ALGORITHM = "RSA";
    private static KeyPair rsaKeyPair = loadOrGenerateRSAKeyPair();

    public static SecretKey generateAESKey() throws NoSuchAlgorithmException {
        KeyGenerator keyGen = KeyGenerator.getInstance("AES");
        keyGen.init(128);
        return keyGen.generateKey();
    }

    public static byte[] encryptAES(byte[] data, SecretKey secretKey) throws Exception {
        Cipher cipher = Cipher.getInstance(AES_ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        return cipher.doFinal(data);
    }

    public static byte[] decryptAES(byte[] data, SecretKey secretKey) throws Exception {
        Cipher cipher = Cipher.getInstance(AES_ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        return cipher.doFinal(data);
    }

    public static byte[] encryptAESKeyWithRSA(SecretKey aesKey) throws Exception {
        Cipher cipher = Cipher.getInstance(RSA_ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, rsaKeyPair.getPublic());
        return cipher.doFinal(aesKey.getEncoded());
    }

    public static SecretKey decryptAESKeyWithRSA(byte[] encryptedKey) throws Exception {
        Cipher cipher = Cipher.getInstance(RSA_ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, rsaKeyPair.getPrivate());
        byte[] decryptedKeyBytes = cipher.doFinal(encryptedKey);
        return new SecretKeySpec(decryptedKeyBytes, "AES");
    }

    private static KeyPair loadOrGenerateRSAKeyPair() {
        try {
            File keyFile = new File("rsa_keypair.dat");
            if (keyFile.exists()) {
                try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(keyFile))) {
                    return (KeyPair) ois.readObject();
                }
            } else {
                KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(RSA_ALGORITHM);
                keyPairGenerator.initialize(2048);
                KeyPair keyPair = keyPairGenerator.generateKeyPair();
                try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(keyFile))) {
                    oos.writeObject(keyPair);
                }
                return keyPair;
            }
        } catch (Exception e) {
            throw new RuntimeException("Error loading/generating RSA key pair", e);
        }
    }
}