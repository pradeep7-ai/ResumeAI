import { FileText } from "lucide-react";

/**
 * Header component for the ResumeAI Pro application
 * Contains the app title, logo, and navigation tabs
 */
const Header = ({
  activeSection,
  setActiveSection,
  savedAnalyses,
  analysis,
}) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* App Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                ResumeEnhancer
              </h1>
              <p className="text-sm text-gray-600">
                AI-Powered Resume Enhancement
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveSection("input")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                  activeSection === "input"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Input
              </button>
              <button
                onClick={() => setActiveSection("history")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                  activeSection === "history"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                History ({savedAnalyses.length})
              </button>
              {analysis && (
                <button
                  onClick={() => setActiveSection("results")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                    activeSection === "results"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Results
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
