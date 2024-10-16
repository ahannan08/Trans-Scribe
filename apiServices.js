
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/transcriptions'; // Adjust based on your backend URL

export const fetchTranscriptions = async () => {
    try {
        const response = await axios.get(`${API_URL}/get`);
        return response.data;
    } catch (error) {
        console.error("Error fetching transcriptions:", error);
        throw error;
    }
};

export const postTranscription = async (original_audio, transcribed_text) => {
    try {
        const response = await axios.post(`${API_URL}/post`, { 
            original_audio, 
            transcribed_text,
            timestamp: new Date(),
         });
        return response.data;
    } catch (error) {
        console.error("Error saving transcription:", error);
        throw error;
    }
};
