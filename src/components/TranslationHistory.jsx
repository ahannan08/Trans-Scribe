import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TranslationHistory.css'; // Import the CSS file for styling

const API_URL = 'http://localhost:3001/api/translation'; // Adjust this based on your backend URL

export default function TranslationHistory() {
    const [translations, setTranslations] = useState([]);

    // Fetch translations on component mount
    useEffect(() => {
        const getTranslations = async () => {
            try {
                const response = await axios.get(`${API_URL}/get`); // Make sure your backend has this route
                setTranslations(response.data);
            } catch (error) {
                console.error("Error fetching translations:", error);
            }
        };

        getTranslations();
    }, []);

    return (
        <div className="translation-card">
            <h2 className="mt-8 text-2xl font-semibold">Translation History</h2>
            <ul className="translation-list">
                {translations.slice(-20).map((translation) => (
                    <li key={translation._id} className="translation-item">
                        <strong>Original Text:</strong> {translation.originalText}<br />
                        <strong>Translated Text:</strong> {translation.translatedText}<br />
                        <strong>To Language:</strong> {translation.toLanguage}<br />
                        <strong>Timestamp:</strong> {new Date(translation.timestamp).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}
