import React from 'react';
import './TranscriptionHistory.css'; // Import your CSS file for styling

const TranscriptionHistory = ({ transcriptions }) => {
    return (
        <div className="transcription-card">
            <h2 className="mt-8 text-2xl font-semibold">Transcription History</h2>
            <ul className="transcription-list">
                {transcriptions.slice(-20).map((transcription) => (
                    <li key={transcription._id} className="transcription-item">
                        <strong>Original Audio:</strong> {transcription.original_audio}<br />
                        <strong>Transcribed Text:</strong> {transcription.transcribed_text}<br />
                        <strong>Timestamp:</strong> {new Date(transcription.timestamp).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TranscriptionHistory;
