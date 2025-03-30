
# Transcribe Application

## Overview
The Transcribe Application allows users to transcribe and translate audio into over 140 languages using OpenAI's Whisper and Google API. The application is built with React.js for the frontend, Python for the backend, and PostgreSQL for data storage.

![image](https://github.com/user-attachments/assets/10bc3aed-321e-4548-96c5-4611603f54c4)

## Features
- **Audio Transcription:** Converts speech to text using Whisper.
- **Multi-language Translation:** Supports translation into 140+ languages using Google API.
- **Database Storage:** Stores transcription and translation data in PostgreSQL.

## Tech Stack
- **Frontend:** React.js (files in the root directory)
- **Backend:** Python (located in the `backend/` folder)
- **Database:** PostgreSQL
- **APIs:** OpenAI Whisper API, Google Translate API

## Setup & Installation
### Prerequisites
- Node.js & npm (for React frontend)
- Python (for backend)
- PostgreSQL (for database management)

### Backend Setup
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd transcribe-app/backend
   ```
2. Create a virtual environment and install dependencies:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Start the backend server:
   ```sh
   python app.py  # Adjust filename if necessary
   ```

### Frontend Setup
1. Navigate to the project root directory.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React development server:
   ```sh
   npm start
   ```

### Database Setup
1. Create a PostgreSQL database and update connection details in the backend configuration.
2. Run migrations (if applicable) to set up the necessary tables.

## Usage
1. Upload an audio file through the UI.
2. The app transcribes the speech to text using Whisper.
3. The transcribed text is translated into the selected language using Google API.
4. The results are displayed and stored in the database for reference.

## Future Enhancements
- Support for additional file formats.
- Improve accuracy with AI-based context correction.
- Implement user authentication for personalized transcriptions.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss the proposed updates.

## License
This project is licensed under the MIT License.

