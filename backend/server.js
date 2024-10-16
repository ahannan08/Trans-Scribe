import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import transcriptionRouter from "./Routes/transcriptRoutes.js";
import translationRouter from "./Routes/translationRoutes.js";
import dotenv from "dotenv";  // Import dotenv

// Initialize dotenv
dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    methods: ['GET', 'POST'], // Allow specific methods
    credentials: true // Include credentials (if needed)
}));
app.use(bodyParser.json());

console.log('Mongo URI:', process.env.MONGO_URI);

// Connect to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use("/api/transcriptions", transcriptionRouter);  // Mount transcription routes
app.use("/api/translation", translationRouter);  // Mount translation routes

app.get("/", (req, res) => {
    res.send("Backend is running");
});

// Start server
const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
