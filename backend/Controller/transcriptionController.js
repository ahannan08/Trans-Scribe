import Transcription from "../Schema/transcriptionSchema.js";

// Controller to get all transcriptions
export const getTranscripts = async (req, res) => {
  try {
    const transcriptions = await Transcription.find();
    res.status(200).json(transcriptions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transcriptions", error });
  }
};

// Controller to post a new transcription
export const postTranscripts = async (req, res) => {
  try {
    const { original_audio, transcribed_text } = req.body;
    if (!original_audio || !transcribed_text) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTranscript = new Transcription({
      original_audio,
      transcribed_text
    });

    await newTranscript.save();
    res.status(201).json(newTranscript);
    console.log("Transcript saved");
  } catch (error) {
    res.status(500).json({ message: "Error saving transcript", error });
  }
};
