import React, { useState, useEffect, useRef } from 'react';
import { fetchTranscriptions } from '../../apiServices.js';
import './HomePage.css'; // Import the CSS file or use your CSS Module
import TranslationHistory from './TranslationHistory'; // Adjust the path based on your structure
import TranscriptionHistory from './TranscriptionHistory'; // Import the new component


export default function HomePage(props) {
    const { setAudioStream, setFile } = props;


    const [recordingStatus, setRecordingStatus] = useState('inactive');
    const [audioChunks, setAudioChunks] = useState([]);
    const [duration, setDuration] = useState(0);
    const [transcriptions, setTranscriptions] = useState([]);

    // Fetch transcriptions on component mount
    useEffect(() => {
        const getTranscriptions = async () => {
            try {
                const data = await fetchTranscriptions();
                setTranscriptions(data);
            } catch (error) {
                console.error("Error fetching transcriptions:", error);
            }
        };

        getTranscriptions();
    }, []);

    const mediaRecorder = useRef(null);
    const mimeType = 'audio/webm';

    async function startRecording() {
        let tempStream;
        console.log('Start recording');

        try {
            const streamData = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            });
            tempStream = streamData;
        } catch (err) {
            console.log(err.message);
            return;
        }
        setRecordingStatus('recording');

        // Create new Media recorder instance using the stream
        const media = new MediaRecorder(tempStream, { type: mimeType });
        mediaRecorder.current = media;

        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === 'undefined') { return; }
            if (event.data.size === 0) { return; }
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    }

    async function stopRecording() {
        setRecordingStatus('inactive');
        console.log('Stop recording');

        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            setAudioStream(audioBlob);
            setAudioChunks([]);
            setDuration(0);
            handleFormSubmission(audioBlob);  // This should handle transcription automatically
        };
    }

    useEffect(() => {
        if (recordingStatus === 'inactive') { return; }

        const interval = setInterval(() => {
            setDuration(curr => curr + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [recordingStatus]);

  
    return (
        <main className='flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20'>
            <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl'>Trans-<span className='text-blue-400 bold'>Scribe</span></h1>
            <h3 className='font-medium md:text-lg'>Record <span className='text-blue-400'>&rarr;</span> Transcribe <span className='text-blue-400'>&rarr;</span> Translate</h3>
            <button onClick={recordingStatus === 'recording' ? stopRecording : startRecording} className='flex specialBtn px-4 py-2 rounded-xl items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4'>
                <p className='text-blue-400'>{recordingStatus === 'inactive' ? 'Record' : `Stop recording`}</p>
                <div className='flex items-center gap-2'>
                    <i className={"fa-solid duration-200 fa-microphone " + (recordingStatus === 'recording' ? ' text-rose-300' : "")}></i>
                </div>
            </button>
            <p className='text-base'>Or <label className='text-blue-400 cursor-pointer hover:text-blue-600 duration-200'>upload <input onChange={(e) => {
                const tempFile = e.target.files[0];
                setFile(tempFile);
            }} className='hidden' type='file' accept='.mp3,.wave' /></label> a mp3 file</p>
            <p className='italic text-slate-400'>Free now free forever</p>
            <div className="history-container">
                {/* Display both histories in a row */}
                <TranscriptionHistory transcriptions={transcriptions} />
                <TranslationHistory /> {/* Assuming this component is also styled similarly */}
            </div>
        </main>
    );
}
