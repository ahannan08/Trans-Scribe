import mongoose from "mongoose";

// Define transcription schema
const transcriptionSchema = new mongoose.Schema({
  original_audio: {
    type: String,
    required: true,
  },
  transcribed_text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create and export transcription model
const Transcription = mongoose.model("Transcription", transcriptionSchema);
export default Transcription;
