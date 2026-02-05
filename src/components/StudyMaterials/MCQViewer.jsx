import { useState } from 'react';
import { FaCheck, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './StudyMaterials.css';

const MCQViewer = ({ mcqs }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

    if (!mcqs || mcqs.length === 0) {
        return <div className="no-content">No MCQs available</div>;
    }

    const currentMCQ = mcqs[currentIndex];

    const handleAnswerSelect = (index) => {
        if (!showResult) {
            setSelectedAnswer(index);
        }
    };

    const handleSubmit = () => {
        if (selectedAnswer === null) return;

        setShowResult(true);

        if (!answeredQuestions.has(currentIndex)) {
            if (selectedAnswer === currentMCQ.correctAnswer) {
                setScore(score + 1);
            }
            setAnsweredQuestions(new Set([...answeredQuestions, currentIndex]));
        }
    };

    const handleNext = () => {
        if (currentIndex < mcqs.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setSelectedAnswer(null);
            setShowResult(false);
        }
    };

    return (
        <div className="mcq-viewer">
            <div className="mcq-header">
                <h3>Multiple Choice Questions</h3>
                <div className="score-display">
                    Score: {score} / {mcqs.length}
                </div>
            </div>

            <div className="progress-indicator">
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${((currentIndex + 1) / mcqs.length) * 100}%` }}
                    ></div>
                </div>
                <p className="progress-text">
                    Question {currentIndex + 1} of {mcqs.length}
                </p>
            </div>

            <div className="mcq-content">
                <h4 className="question">{currentMCQ.question}</h4>

                <div className="options-list">
                    {currentMCQ.options.map((option, index) => (
                        <button
                            key={index}
                            className={`option-btn ${selectedAnswer === index ? 'selected' : ''
                                } ${showResult
                                    ? index === currentMCQ.correctAnswer
                                        ? 'correct'
                                        : selectedAnswer === index
                                            ? 'incorrect'
                                            : ''
                                    : ''
                                }`}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showResult}
                        >
                            <span className="option-letter">
                                {String.fromCharCode(65 + index)}
                            </span>
                            <span className="option-text">{option}</span>
                            {showResult && index === currentMCQ.correctAnswer && (
                                <FaCheck className="result-icon" />
                            )}
                            {showResult && selectedAnswer === index && index !== currentMCQ.correctAnswer && (
                                <FaTimes className="result-icon" />
                            )}
                        </button>
                    ))}
                </div>

                {showResult && currentMCQ.explanation && (
                    <div className="explanation">
                        <strong>Explanation:</strong> {currentMCQ.explanation}
                    </div>
                )}

                <div className="mcq-actions">
                    <button
                        className="nav-btn"
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                    >
                        <FaChevronLeft /> Previous
                    </button>

                    {!showResult ? (
                        <button
                            className="submit-answer-btn"
                            onClick={handleSubmit}
                            disabled={selectedAnswer === null}
                        >
                            Submit Answer
                        </button>
                    ) : (
                        <button
                            className="next-btn"
                            onClick={handleNext}
                            disabled={currentIndex === mcqs.length - 1}
                        >
                            Next <FaChevronRight />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MCQViewer;
