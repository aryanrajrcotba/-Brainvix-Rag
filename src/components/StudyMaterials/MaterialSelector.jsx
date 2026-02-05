import { FaClipboardList, FaQuestionCircle, FaStickyNote, FaLayerGroup } from 'react-icons/fa';
import './StudyMaterials.css';

const MaterialSelector = ({ activeType, onTypeChange, hasContent }) => {
    const materials = [
        { type: 'mcq', label: 'MCQs', icon: <FaClipboardList /> },
        { type: 'question', label: 'Questions', icon: <FaQuestionCircle /> },
        { type: 'note', label: 'Notes', icon: <FaStickyNote /> },
        { type: 'flashcard', label: 'Flashcards', icon: <FaLayerGroup /> }
    ];

    return (
        <div className="material-selector">
            {materials.map((material) => (
                <button
                    key={material.type}
                    className={`material-btn ${activeType === material.type ? 'active' : ''} ${hasContent[material.type] ? 'has-content' : ''
                        }`}
                    onClick={() => onTypeChange(material.type)}
                >
                    <span className="material-icon">{material.icon}</span>
                    <span className="material-label">{material.label}</span>
                    {hasContent[material.type] && <span className="content-indicator"></span>}
                </button>
            ))}
        </div>
    );
};

export default MaterialSelector;
