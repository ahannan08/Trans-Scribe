import React from 'react';
import { LANGUAGES } from '../utils/presets';
import axios from 'axios'; // Import axios for making HTTP requests

const TRANSLATION_API_URL = process.env.REACT_APP_TRANSLATION_API_URL;

export default function Translation(props) {
    console.log('Received props:', props);

    const { textElement, toLanguage, translating, setToLanguage, generateTranslation, translation, originalText } = props; // Added originalText prop

    // Function to save the translation to the database
    const saveTranslation = async () => {
        if (!textElement || !toLanguage || toLanguage === 'Select language') {
            console.error('Translation or language not selected');
            return;
        }

        try {
            console.log("originalText to save:", originalText); // Ensure originalText is logged for debugging
            const response = await axios.post(`${TRANSLATION_API_URL}/post`, {
                originalText: originalText,
                translatedText: textElement, // Ensure this is the translated text
                toLanguage,
            });
            console.log('Translation saved:', response.data);
        } catch (error) {
            console.error('Error saving translation:', error);
        }
    };

    return (
        <>
            {(textElement && !translating) && (
                <p>{textElement}</p>
            )}
            {!translating && (
                <div className='flex flex-col gap-1 mb-4'>
                    <p className='text-xs sm:text-sm font-medium text-slate-500 mr-auto'>To language</p>
                    <div className='flex items-stretch gap-2 sm:gap-4'>
                        <select
                            value={toLanguage}
                            className='flex-1 outline-none w-full focus:outline-none bg-white duration-200 p-2 rounded'
                            onChange={(e) => setToLanguage(e.target.value)}
                        >
                            <option value={'Select language'}>Select language</option>
                            {Object.entries(LANGUAGES).map(([key, value]) => (
                                <option key={key} value={value}>{key}</option>
                            ))}
                        </select>
                        <button
                            onClick={generateTranslation}
                            className='specialBtn px-3 py-2 rounded-lg text-blue-400 hover:text-blue-600 duration-200'
                        >
                            Translate
                        </button>
                    </div>
                    {/* Button to save the translation */}

                <div>
                <button
                        onClick={saveTranslation}
                        className='specialBtn mt-2 px-3 py-2 rounded-lg text-blue-400 hover:text-blue-600 duration-200'
                    >
                        Save Translation
                    </button>
                    </div>   
                </div>
                
            )}
        </>
    );
}
