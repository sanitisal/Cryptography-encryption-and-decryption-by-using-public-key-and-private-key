import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const FileDownloadModal = ({ show, handleClose }) => {
  const [encryptionKey, setEncryptionKey] = useState("");
  const [error, setError] = useState("");
  const [filename, setFilename] = useState("");
  const [btntext, setBtntext] = useState("Get File Details");


  useEffect(() => {
        setError("");
        setBtntext("Get File Details");        
      }, []);
  const handleDownload = async () => {
    if (!encryptionKey.trim()) {
      setError("Please enter an encryption key.");
      return;
    }

    try {
      if(btntext==="Get File Details"){
        const response = await axios.post(
          `http://ec2-35-154-172-61.ap-south-1.compute.amazonaws.com:8080/api/files/getfilename`,
          { encryptionKey }
        );   
        const fname = response.data;     
      console.log("Fetched Filename:", fname);

      setFilename(fname); 
      setTimeout(() => {
        console.log("Updated Filename (after state update):", filename);
      }, 0);
    
        
        if(fname==="NA"){
          setError("Invalid Key...Please enter valid key");          
          setBtntext("Get File Details");
        }else{
          setError("");          
        setBtntext("Download");
        }

      }else{
      const response = await axios.post(
        `http://ec2-35-154-172-61.ap-south-1.compute.amazonaws.com:8080/api/files/download`,
        { encryptionKey },
        { responseType: "blob" } // Ensure response is treated as binary
      );
      
      // Create a downloadable link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setError("");
      setFilename("");
      setEncryptionKey("");
      setBtntext("Get File Details");
      handleClose();
    }
    } catch (error) {
      setError("Failed to download the file. Please check the encryption key.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Download Encrypted File</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Encryption Key</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter encryption key"
              value={encryptionKey}
              onChange={(e) => setEncryptionKey(e.target.value)}
            />
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
          {filename && <p className="text-success">File available for download: {filename}</p>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleDownload}>
          {btntext}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

FileDownloadModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default FileDownloadModal;
