import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from '../services/authService';
import { saveStudyMaterial, saveGeneratedContent } from '../services/studyMaterialService';
import { generateMCQs, generatePracticeQuestions, generateRevisionNotes, generateFlashcards } from '../services/openai';

import InputSelector from '../components/Upload/InputSelector';
import PDFUploader from '../components/Upload/PDFUploader';
import TopicInput from '../components/Upload/TopicInput';
import MaterialSelector from '../components/StudyMaterials/MaterialSelector';
import MCQViewer from '../components/StudyMaterials/MCQViewer';
import QuestionViewer from '../components/StudyMaterials/QuestionViewer';
import NotesViewer from '../components/StudyMaterials/NotesViewer';
import FlashcardViewer from '../components/StudyMaterials/FlashcardViewer';

import { FaBrain, FaSignOutAlt, FaSpinner } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [inputMode, setInputMode] = useState('pdf');
    const [currentMaterial, setCurrentMaterial] = useState(null);
    const [materialType, setMaterialType] = useState('mcq');
    const [generatedContent, setGeneratedContent] = useState({
        mcq: null,
        question: null,
        note: null,
        flashcard: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleContentExtracted = async (materialData) => {
        setLoading(true);
        setError('');

        try {
            // Save study material to database
            const savedMaterial = await saveStudyMaterial(
                user.id,
                materialData.title,
                materialData.contentType,
                materialData.content
            );

            setCurrentMaterial(savedMaterial);

            // Generate all content types
            await generateAllContent(savedMaterial, materialData.content);

        } catch (err) {
            setError('Failed to process content. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const generateAllContent = async (material, content) => {
        try {
            setLoading(true);

            // Generate MCQs
            const mcqs = await generateMCQs(content);
            await saveGeneratedContent(user.id, material.id, 'mcq', mcqs);
            setGeneratedContent(prev => ({ ...prev, mcq: mcqs }));

            // Generate Practice Questions
            const questions = await generatePracticeQuestions(content);
            await saveGeneratedContent(user.id, material.id, 'question', questions);
            setGeneratedContent(prev => ({ ...prev, question: questions }));

            // Generate Revision Notes
            const notes = await generateRevisionNotes(content);
            await saveGeneratedContent(user.id, material.id, 'note', notes);
            setGeneratedContent(prev => ({ ...prev, note: notes }));

            // Generate Flashcards
            const flashcards = await generateFlashcards(content);
            await saveGeneratedContent(user.id, material.id, 'flashcard', flashcards);
            setGeneratedContent(prev => ({ ...prev, flashcard: flashcards }));

        } catch (err) {
            setError('Some content generation failed. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const renderMaterialViewer = () => {
        if (loading) {
            return (
                <div className="loading-state">
                    <FaSpinner className="loading-spinner" />
                    <h3>Generating your study materials...</h3>
                    <p>This may take a moment. We're creating MCQs, questions, notes, and flashcards for you!</p>
                </div>
            );
        }

        if (!currentMaterial) {
            return (
                <div className="empty-state">
                    <h3>No study materials yet</h3>
                    <p>Upload a PDF or enter a topic to get started!</p>
                </div>
            );
        }

        switch (materialType) {
            case 'mcq':
                return <MCQViewer mcqs={generatedContent.mcq} />;
            case 'question':
                return <QuestionViewer questions={generatedContent.question} />;
            case 'note':
                return <NotesViewer notes={generatedContent.note} />;
            case 'flashcard':
                return <FlashcardViewer flashcards={generatedContent.flashcard} />;
            default:
                return null;
        }
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="header-brand">
                    <FaBrain className="brand-icon" />
                    <h1>Brainvix</h1>
                </div>
                <div className="header-user">
                    <span>Welcome, {user?.email}</span>
                    <button onClick={handleSignOut} className="signout-btn">
                        <FaSignOutAlt /> Sign Out
                    </button>
                </div>
            </header>

            <div className="dashboard-content">
                <aside className="sidebar">
                    <div className="sidebar-section">
                        <h3>Input Source</h3>
                        <InputSelector activeMode={inputMode} onModeChange={setInputMode} />

                        {inputMode === 'pdf' ? (
                            <PDFUploader onContentExtracted={handleContentExtracted} />
                        ) : (
                            <TopicInput onTopicSubmit={handleContentExtracted} />
                        )}
                    </div>

                    {error && (
                        <div className="error-banner">
                            {error}
                        </div>
                    )}
                </aside>

                <main className="main-content">
                    {currentMaterial && (
                        <div className="material-header">
                            <h2>{currentMaterial.title}</h2>
                            <MaterialSelector
                                activeType={materialType}
                                onTypeChange={setMaterialType}
                                hasContent={{
                                    mcq: !!generatedContent.mcq,
                                    question: !!generatedContent.question,
                                    note: !!generatedContent.note,
                                    flashcard: !!generatedContent.flashcard
                                }}
                            />
                        </div>
                    )}

                    <div className="material-display">
                        {renderMaterialViewer()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
