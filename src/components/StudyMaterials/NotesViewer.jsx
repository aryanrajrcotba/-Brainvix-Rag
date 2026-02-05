import './StudyMaterials.css';

const NotesViewer = ({ notes }) => {
    if (!notes) {
        return <div className="no-content">No notes available</div>;
    }

    return (
        <div className="notes-viewer">
            <h3>Quick Revision Notes</h3>

            <div className="notes-content">
                {notes.title && (
                    <h2 className="notes-title">{notes.title}</h2>
                )}

                {notes.sections && notes.sections.length > 0 && (
                    <div className="notes-sections">
                        {notes.sections.map((section, index) => (
                            <div key={index} className="note-section">
                                <h4 className="section-heading">{section.heading}</h4>
                                <ul className="section-points">
                                    {section.points.map((point, pointIndex) => (
                                        <li key={pointIndex}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {notes.keyTerms && notes.keyTerms.length > 0 && (
                    <div className="key-terms">
                        <h4 className="terms-heading">Key Terms</h4>
                        <div className="terms-grid">
                            {notes.keyTerms.map((term, index) => (
                                <div key={index} className="term-card">
                                    <div className="term-word">{term.term}</div>
                                    <div className="term-definition">{term.definition}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotesViewer;
