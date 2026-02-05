import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './StudyMaterials.css';

const QuestionViewer = ({ questions }) => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    if (!questions || questions.length === 0) {
        return <div className="no-content">No questions available</div>;
    }

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'easy':
                return '#48bb78';
            case 'medium':
                return '#ed8936';
            case 'hard':
                return '#f56565';
            default:
                return '#667eea';
        }
    };

    return (
        <div className="question-viewer">
            <h3>Practice Questions</h3>

            <div className="questions-list">
                {questions.map((q, index) => (
                    <div key={index} className="question-card">
                        <div
                            className="question-header"
                            onClick={() => toggleExpand(index)}
                        >
                            <div className="question-title">
                                <span className="question-number">Q{index + 1}</span>
                                <span className="question-text">{q.question}</span>
                            </div>
                            <div className="question-meta">
                                {q.difficulty && (
                                    <span
                                        className="difficulty-badge"
                                        style={{ backgroundColor: getDifficultyColor(q.difficulty) }}
                                    >
                                        {q.difficulty}
                                    </span>
                                )}
                                {expandedIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                        </div>

                        {expandedIndex === index && (
                            <div className="question-answer">
                                <strong>Answer:</strong>
                                <p>{q.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionViewer;
