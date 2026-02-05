import { useState } from 'react';
import { FaCloudUploadAlt, FaFilePdf, FaTimes } from 'react-icons/fa';
import { extractTextFromPDF, validatePDF } from '../../services/pdfExtractor';
import './Upload.css';

const PDFUploader = ({ onContentExtracted }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            await handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = async (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            await handleFile(e.target.files[0]);
        }
    };

    const handleFile = async (selectedFile) => {
        setError('');

        try {
            validatePDF(selectedFile);
            setFile(selectedFile);
            setUploading(true);

            const extractedText = await extractTextFromPDF(selectedFile);

            onContentExtracted({
                title: selectedFile.name,
                content: extractedText,
                contentType: 'pdf',
                file: selectedFile
            });

            setUploading(false);
        } catch (err) {
            setError(err.message);
            setFile(null);
            setUploading(false);
        }
    };

    const handleRemove = () => {
        setFile(null);
        setError('');
    };

    return (
        <div className="pdf-uploader">
            <h3>Upload PDF Document</h3>

            {!file ? (
                <div
                    className={`upload-area ${dragActive ? 'drag-active' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <FaCloudUploadAlt className="upload-icon" />
                    <p className="upload-text">Drag and drop your PDF here</p>
                    <p className="upload-subtext">or</p>
                    <label htmlFor="file-input" className="file-label">
                        Browse Files
                    </label>
                    <input
                        id="file-input"
                        type="file"
                        accept=".pdf"
                        onChange={handleChange}
                        style={{ display: 'none' }}
                    />
                    <p className="upload-hint">Maximum file size: 10MB</p>
                </div>
            ) : (
                <div className="file-preview">
                    <div className="file-info">
                        <FaFilePdf className="file-icon" />
                        <div className="file-details">
                            <p className="file-name">{file.name}</p>
                            <p className="file-size">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                    </div>
                    {uploading ? (
                        <div className="upload-progress">
                            <div className="progress-bar">
                                <div className="progress-fill"></div>
                            </div>
                            <p>Extracting text...</p>
                        </div>
                    ) : (
                        <button className="remove-btn" onClick={handleRemove}>
                            <FaTimes />
                        </button>
                    )}
                </div>
            )}

            {error && <div className="upload-error">{error}</div>}
        </div>
    );
};

export default PDFUploader;
