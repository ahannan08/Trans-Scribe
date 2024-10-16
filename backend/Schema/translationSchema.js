// models/Translation.js


import mongoose from "mongoose"

const TranslationSchema = new mongoose.Schema({
    originalText: {
        type: String,
        required: true,
    },
    translatedText: {
        type: String,
        required: true,
    },
    toLanguage: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Translation = mongoose.model('Translation', TranslationSchema);
export default Translation