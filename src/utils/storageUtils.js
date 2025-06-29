/**
 * Utility functions for localStorage operations
 */

const STORAGE_KEY = "resumeAnalyses";
const MAX_ANALYSES = 10;

/**
 * Loads saved analyses from localStorage
 * @returns {Array} - Array of saved analyses
 */
export const loadSavedAnalyses = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error loading saved analyses:", error);
    return [];
  }
};

/**
 * Saves analysis to localStorage
 * @param {Object} analysis - The analysis object to save
 * @param {Array} currentAnalyses - Current array of saved analyses
 * @returns {Array} - Updated array of saved analyses
 */
export const saveAnalysis = (analysis, currentAnalyses) => {
  try {
    // Add new analysis to the beginning and keep only the last MAX_ANALYSES
    const updatedAnalyses = [
      analysis,
      ...currentAnalyses.slice(0, MAX_ANALYSES - 1),
    ];

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAnalyses));

    return updatedAnalyses;
  } catch (error) {
    console.error("Error saving analysis:", error);
    // If localStorage is full, try to remove oldest analysis
    try {
      const trimmedAnalyses = currentAnalyses.slice(0, MAX_ANALYSES - 2);
      const updatedAnalyses = [analysis, ...trimmedAnalyses];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAnalyses));
      return updatedAnalyses;
    } catch (retryError) {
      console.error("Error saving analysis after cleanup:", retryError);
      return currentAnalyses;
    }
  }
};

/**
 * Clears all saved analyses from localStorage
 */
export const clearAllAnalyses = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing analyses:", error);
  }
};

/**
 * Exports all saved analyses as a JSON file
 */
export const exportAnalyses = () => {
  try {
    const analyses = loadSavedAnalyses();
    if (analyses.length === 0) {
      alert("No analyses to export");
      return;
    }

    const dataStr = JSON.stringify(analyses, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `resume_analyses_${
      new Date().toISOString().split("T")[0]
    }.json`;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error exporting analyses:", error);
    alert("Error exporting analyses");
  }
};

/**
 * Imports analyses from a JSON file
 * @param {File} file - The JSON file to import
 * @returns {Promise<Array>} - Promise that resolves to the imported analyses
 */
export const importAnalyses = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const analyses = JSON.parse(e.target.result);
        if (Array.isArray(analyses)) {
          // Validate that each analysis has required fields
          const validAnalyses = analyses.filter(
            (analysis) =>
              analysis.atsScore &&
              analysis.overallScore &&
              analysis.strengths &&
              analysis.weaknesses
          );

          if (validAnalyses.length === 0) {
            reject(new Error("No valid analyses found in file"));
            return;
          }

          resolve(validAnalyses);
        } else {
          reject(new Error("Invalid file format"));
        }
      } catch (error) {
        reject(new Error("Error parsing JSON file"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };

    reader.readAsText(file);
  });
};
