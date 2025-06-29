// API Configuration
// Use environment variable for API key (more secure)
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Validate API key
if (!GEMINI_API_KEY) {
  console.warn(
    "⚠️ GEMINI_API_KEY not found in environment variables. " +
      "Please create a .env file with VITE_GEMINI_API_KEY=your_api_key_here"
  );
}

// Updated API URL with correct model name
export const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

// API Configuration
export const API_CONFIG = {
  temperature: 0.3,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 2048,
};
