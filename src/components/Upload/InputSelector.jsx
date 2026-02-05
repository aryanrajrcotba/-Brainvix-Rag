import { useState } from 'react';
import { FaFileUpload, FaPencilAlt } from 'react-icons/fa';
import './Upload.css';

const InputSelector = ({ activeMode, onModeChange }) => {
    return (
        <div className="input-selector">
            <button
                className={`mode-btn ${activeMode === 'pdf' ? 'active' : ''}`}
                onClick={() => onModeChange('pdf')}
            >
                <FaFileUpload />
                <span>Upload PDF</span>
            </button>
            <button
                className={`mode-btn ${activeMode === 'topic' ? 'active' : ''}`}
                onClick={() => onModeChange('topic')}
            >
                <FaPencilAlt />
                <span>Enter Topic</span>
            </button>
        </div>
    );
};

export default InputSelector;
