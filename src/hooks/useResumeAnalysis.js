import { useState, useRef, useEffect } from "react";
import { analyzeResumeWithGemini } from "../services/geminiService";
import { loadSavedAnalyses, saveAnalysis } from "../utils/storageUtils";
import { extractTextFromPDF, isPDFFile } from "../utils/pdfUtils";

/**
 * Custom hook for managing resume analysis functionality
 * Handles all state management, API calls, and localStorage operations
 */
export const useResumeAnalysis = () => {
  // State management
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("input");
  const [showKeywordPreview, setShowKeywordPreview] = useState(false);
  const [savedAnalyses, setSavedAnalyses] = useState([]);
  const [currentFileName, setCurrentFileName] = useState("");

  // Refs
  const fileInputRef = useRef(null);

  // Load saved analyses from localStorage on mount
  useEffect(() => {
    const saved = loadSavedAnalyses();
    setSavedAnalyses(saved);
  }, []);

  /**
   * Analyzes resume using the Gemini API
   */
  const analyzeResume = async () => {
    if (!resume.trim() || !jobDescription.trim()) {
      setError("Please provide both resume and job description");
      return;
    }

    setIsLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await analyzeResumeWithGemini(resume, jobDescription);
      const newAnalysis = {
        ...response,
        timestamp: new Date().toISOString(),
        fileName: currentFileName || `Analysis ${savedAnalyses.length + 1}`,
      };

      setAnalysis(newAnalysis);
      setActiveSection("results");

      // Save to history
      const updatedAnalyses = saveAnalysis(newAnalysis, savedAnalyses);
      setSavedAnalyses(updatedAnalyses);
    } catch (err) {
      console.error("Analysis error:", err);
      setError(
        err.message ||
          "Failed to analyze resume. Please check your API key and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Resets all form data and state
   */
  const resetForm = () => {
    setResume("");
    setJobDescription("");
    setAnalysis(null);
    setError("");
    setActiveSection("input");
    setCurrentFileName("");
  };

  /**
   * Handles file upload for resume text (PDF or TXT)
   */
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setError("");

      if (isPDFFile(file)) {
        // Handle PDF file
        const extractedText = await extractTextFromPDF(file);
        setResume(extractedText);
        setCurrentFileName(file.name.replace(/\.[^/.]+$/, ""));
      } else if (file.type === "text/plain") {
        // Handle text file
        const reader = new FileReader();
        reader.onload = (e) => {
          setResume(e.target.result);
          setCurrentFileName(file.name.replace(/\.[^/.]+$/, ""));
        };
        reader.readAsText(file);
      } else {
        setError("Please upload a PDF file (.pdf) or text file (.txt)");
      }
    } catch (error) {
      console.error("File upload error:", error);
      setError(
        error.message ||
          "Failed to process the uploaded file. Please try again."
      );
    }
  };

  return {
    // State
    resume,
    setResume,
    jobDescription,
    setJobDescription,
    isLoading,
    analysis,
    setAnalysis,
    error,
    activeSection,
    setActiveSection,
    showKeywordPreview,
    setShowKeywordPreview,
    savedAnalyses,
    currentFileName,
    setCurrentFileName,

    // Refs
    fileInputRef,

    // Functions
    analyzeResume,
    resetForm,
    handleFileUpload,
  };
};
