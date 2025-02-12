import axios from "axios";
import { useEffect, useState } from "react";

const FileShareModal = ({ showModal, setShowModal }) => {
  const [file, setFile] = useState(null);
  const [encryptionKey, setEncryptionKey] = useState("");
  const [error, setError] = useState("");

   useEffect(() => {
      setError("");
      setEncryptionKey("");
    }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setEncryptionKey("");
    }
  };

  const shareFile = async () => {
    if (!file) {
      alert("Please upload a file first!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

  try {
    const response = await axios.post(
      "http://ec2-35-154-172-61.ap-south-1.compute.amazonaws.com:8080/api/files/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setEncryptionKey(response.data); 
    setError("");   
  } catch (err) {
    console.error("Error uploading file:", err);
    setError(err.message +" - might be file already exists or Internal error");
  }
  };

  return (
    <>
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload & Share File</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="file"
                  className="form-control mb-3"
                  onChange={handleFileChange}
                />
                {encryptionKey && (
                  <div>
                  <label>Encrypted Key:</label>
                  <textarea className="form-control" defaultValue={encryptionKey}></textarea>
                </div>
                )}
                <button
                  className="btn btn-success me-2"
                  onClick={() => shareFile()}
                >
                  Upload and Get Key
                </button>

                <div className="badge bg-primary mt-3">
                  Once obtain key, share with intended user(s) via mail or chat for download. 
                </div>

                {error && <p className="text-danger">{error}</p>}
                
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default FileShareModal;
