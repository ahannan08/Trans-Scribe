// controllers/translationController.js

import Translation from "../Schema/translationSchema.js";
// Controller to save a new translation
export const saveTranslation = async (req, res) => {
    const { originalText, translatedText, toLanguage } = req.body;
    console.log(req.body); // Log the received data


    if (!originalText || !translatedText || !toLanguage) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const newTranslation = new Translation({
            originalText,
            translatedText,
            toLanguage,
            timestamp: new Date(),
        });

        await newTranslation.save();
        res.status(201).json(newTranslation);
    } catch (error) {
        console.error("Error saving translation:", error);
        res.status(500).json({ message: 'Failed to save translation' });
    }
};

export const getTranslations = async (req, res) => {
    try {
        const translations = await Translation.find().sort({ timestamp: -1 }); // Sort by timestamp (most recent first)
        res.status(200).json(translations);
    } catch (error) {
        console.error("Error fetching translations:", error);
        res.status(500).json({ message: 'Failed to fetch translations' });
    }
};