import { useResumeAnalysis } from "./hooks/useResumeAnalysis";
import {
  highlightKeywords,
  getScoreColor,
  getScoreLabel,
  copyToClipboard,
  downloadReport,
} from "./utils/analysisUtils";

// Import components
import Header from "./components/Header";
import InputSection from "./components/InputSection";
import HistorySection from "./components/HistorySection";
import ResultsSection from "./components/ResultsSection";
import Footer from "./components/Footer";

// PDF utilities are imported in InputSection component

/**
 * Main App Component
 *
 * This is the root component that orchestrates the entire ResumeAI Pro application.
 * It uses a custom hook for state management and renders different sections based on
 * the active section state.
 *
 * Features:
 * - Resume and job description input
 * - AI-powered analysis using Gemini API
 * - Analysis history with localStorage persistence
 * - Comprehensive results display
 * - File upload support for .txt files
 * - Keyword highlighting and recommendations
 */
function App() {
  // Use custom hook for all analysis logic
  const {
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
    fileInputRef,
    analyzeResume,
    resetForm,
    handleFileUpload,
  } = useResumeAnalysis();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header with navigation */}
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        savedAnalyses={savedAnalyses}
        analysis={analysis}
      />

      {/* Main content area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Input Section - Resume and Job Description forms */}
        {activeSection === "input" && (
          <InputSection
            resume={resume}
            setResume={setResume}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            currentFileName={currentFileName}
            fileInputRef={fileInputRef}
            handleFileUpload={handleFileUpload}
            analysis={analysis}
            showKeywordPreview={showKeywordPreview}
            setShowKeywordPreview={setShowKeywordPreview}
            highlightKeywords={highlightKeywords}
            copyToClipboard={copyToClipboard}
            error={error}
            isLoading={isLoading}
            analyzeResume={analyzeResume}
            resetForm={resetForm}
          />
        )}

        {/* History Section - Previous analyses */}
        {activeSection === "history" && (
          <HistorySection
            savedAnalyses={savedAnalyses || []}
            setAnalysis={setAnalysis}
            setActiveSection={setActiveSection}
          />
        )}

        {/* Results Section - Analysis results and recommendations */}
        {activeSection === "results" && analysis && (
          <ResultsSection
            analysis={analysis}
            downloadReport={() => downloadReport(analysis)}
            setActiveSection={setActiveSection}
            copyToClipboard={copyToClipboard}
            getScoreColor={getScoreColor}
            getScoreLabel={getScoreLabel}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
