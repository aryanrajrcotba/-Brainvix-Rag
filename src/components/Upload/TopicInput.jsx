import { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import './Upload.css';

const TopicInput = ({ onTopicSubmit }) => {
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!topic.trim()) {
            setError('Please enter a topic');
            return;
        }

        const content = description.trim()
            ? `${topic}\n\n${description}`
            : topic;

        onTopicSubmit({
            title: topic,
            content: content,
            contentType: 'topic'
        });

        // Reset form
        setTopic('');
        setDescription('');
    };

    return (
        <div className="topic-input">
            <h3>Enter a Topic</h3>

            <form onSubmit={handleSubmit} className="topic-form">
                <div className="form-group">
                    <label htmlFor="topic">
                        <FaPencilAlt /> Topic Name
                    </label>
                    <input
                        type="text"
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., Photosynthesis, World War II, Python Functions"
                        className="topic-title-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">
                        Additional Details (Optional)
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add any specific details or context about the topic you'd like to study..."
                        className="topic-description-input"
                        rows={6}
                    />
                </div>

                {error && <div className="upload-error">{error}</div>}

                <button type="submit" className="submit-topic-btn">
                    Generate Study Materials
                </button>
            </form>
        </div>
    );
};

export default TopicInput;
