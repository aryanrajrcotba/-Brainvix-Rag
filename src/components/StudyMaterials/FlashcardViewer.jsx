import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaSyncAlt } from 'react-icons/fa';
import './StudyMaterials.css';

const FlashcardViewer = ({ flashcards }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    if (!flashcards || flashcards.length === 0) {
        return <div className="no-content">No flashcards available</div>;
    }

    const currentCard = flashcards[currentIndex];

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        if (currentIndex < flashcards.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setIsFlipped(false);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setIsFlipped(false);
        }
    };

    return (
        <div className="flashcard-viewer">
            <h3>Flashcards</h3>

            <div className="flashcard-progress">
                <p>{currentIndex + 1} / {flashcards.length}</p>
            </div>

            <div className="flashcard-container">
                <div
                    className={`flashcard ${isFlipped ? 'flipped' : ''}`}
                    onClick={handleFlip}
                >
                    <div className="flashcard-front">
                        <div className="flip-icon">
                            <FaSyncAlt />
                        </div>
                        <div className="card-content">
                            <p>{currentCard.front}</p>
                        </div>
                        <div className="flip-hint">Click to flip</div>
                    </div>
                    <div className="flashcard-back">
                        <div className="flip-icon">
                            <FaSyncAlt />
                        </div>
                        <div className="card-content">
                            <p>{currentCard.back}</p>
                        </div>
                        <div className="flip-hint">Click to flip</div>
                    </div>
                </div>
            </div>

            <div className="flashcard-nav">
                <button
                    className="nav-btn"
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                >
                    <FaChevronLeft /> Previous
                </button>
                <button
                    className="nav-btn"
                    onClick={handleNext}
                    disabled={currentIndex === flashcards.length - 1}
                >
                    Next <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default FlashcardViewer;
