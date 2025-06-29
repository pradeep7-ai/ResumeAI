// Gemini API Service for Resume Analysis
import { GEMINI_API_KEY, GEMINI_API_URL, API_CONFIG } from "../config/api.js";

export const analyzeResumeWithGemini = async (resumeText, jobDescription) => {
  try {
    console.log("Starting resume analysis...");
    console.log(
      "API Key (first 10 chars):",
      GEMINI_API_KEY.substring(0, 10) + "..."
    );
    console.log("API URL:", GEMINI_API_URL);

    const prompt = `
You are an expert resume analyzer and career coach. Analyze the provided resume against the job description and provide detailed feedback.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Please provide a comprehensive analysis in the following JSON format:

{
  "atsScore": number (0-100, based on keyword matching and ATS optimization),
  "overallScore": number (0-100, overall match quality),
  "strengths": ["strength1", "strength2", "strength3"],
  "weaknesses": ["weakness1", "weakness2", "weakness3"],
  "recommendations": ["recommendation1", "recommendation2", "recommendation3", "recommendation4"],
  "missingKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "suggestedAdditions": ["suggestion1", "suggestion2", "suggestion3", "suggestion4"]
}

Guidelines for analysis:
1. ATS Score: Focus on keyword matching, formatting, and industry-standard terms
2. Overall Score: Consider experience relevance, skills alignment, and potential fit
3. Strengths: Identify what the candidate does well that matches the job
4. Weaknesses: Point out gaps, missing skills, or areas that need improvement
5. Recommendations: Provide specific, actionable advice for improvement
6. Missing Keywords: Extract important terms from job description not found in resume
7. Suggested Additions: Recommend specific content to add to the resume

Be specific, actionable, and professional in your analysis.
`;

    console.log("Making API request...");
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
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: API_CONFIG,
      }),
    });

    console.log("Response received. Status:", response.status);
    console.log(
      "Response headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error Response:", errorData);

      if (response.status === 400) {
        if (
          errorData.error?.message?.includes("API key") ||
          errorData.error?.message?.includes("invalid")
        ) {
          throw new Error(
            "Invalid API key. Please check your Gemini API key configuration."
          );
        } else {
          throw new Error(
            `Bad request: ${
              errorData.error?.message || "Invalid request format"
            }`
          );
        }
      } else if (response.status === 401) {
        throw new Error("Unauthorized. Please check your API key.");
      } else if (response.status === 403) {
        throw new Error(
          "API key not authorized. Please check your Gemini API key permissions."
        );
      } else if (response.status === 429) {
        throw new Error("API rate limit exceeded. Please try again later.");
      } else if (response.status === 500) {
        throw new Error("Internal server error. Please try again later.");
      } else {
        throw new Error(
          `API request failed: ${response.status} - ${
            errorData.error?.message || "Unknown error"
          }`
        );
      }
    }

    const data = await response.json();
    console.log("API Response data:", data);

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const responseText = data.candidates[0].content.parts[0].text;
      console.log("Raw response text:", responseText);

      // Extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedData = JSON.parse(jsonMatch[0]);
        console.log("Parsed analysis data:", parsedData);
        return parsedData;
      } else {
        console.error("No JSON found in response:", responseText);
        throw new Error(
          "Invalid response format from Gemini API - no JSON found"
        );
      }
    } else {
      console.error("Invalid response structure:", data);
      throw new Error(
        "No valid response from Gemini API - missing candidates or content"
      );
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    throw error;
  }
};

// Alternative function for keyword extraction
export const extractKeywordsFromJobDescription = async (jobDescription) => {
  try {
    const prompt = `
Extract the most important technical skills, tools, and keywords from this job description. Focus on:
- Programming languages
- Frameworks and libraries
- Tools and technologies
- Certifications
- Industry-specific terms

Job Description:
${jobDescription}

Return only a JSON array of keywords:
["keyword1", "keyword2", "keyword3", ...]
`;

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
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const responseText = data.candidates[0].content.parts[0].text;
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    }

    return [];
  } catch (error) {
    console.error("Keyword extraction error:", error);
    return [];
  }
};

// Function to generate improved resume sections
export const generateImprovedResumeSection = async (
  currentSection,
  jobDescription,
  sectionType
) => {
  try {
    const prompt = `
You are an expert resume writer. Improve the following ${sectionType} section to better match the job description.

Current ${sectionType}:
${currentSection}

Job Description:
${jobDescription}

Provide an improved version that:
1. Uses relevant keywords from the job description
2. Quantifies achievements where possible
3. Focuses on relevant experience
4. Uses strong action verbs
5. Is concise and impactful

Return only the improved text without any explanations.
`;

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
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text.trim();
    }

    return currentSection; // Return original if API fails
  } catch (error) {
    console.error("Resume improvement error:", error);
    return currentSection; // Return original if API fails
  }
};
