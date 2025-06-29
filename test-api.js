// Test script to verify Gemini API key
const GEMINI_API_KEY = "AIzaSyBN6zknZt0C7Fxw3edp6_1DvT-HWANfb2w";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

async function testGeminiAPI() {
  try {
    console.log("Testing Gemini API...");

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: "Hello, this is a test message. Please respond with 'API is working' if you can see this.",
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 100,
        },
      }),
    });

    console.log("Response status:", response.status);
    console.log(
      "Response headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Error response:", errorData);
      throw new Error(
        `API request failed: ${response.status} - ${
          errorData.error?.message || "Unknown error"
        }`
      );
    }

    const data = await response.json();
    console.log("Success! API Response:", data);

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      console.log("Generated text:", data.candidates[0].content.parts[0].text);
    }
  } catch (error) {
    console.error("Test failed:", error.message);
  }
}

testGeminiAPI();
