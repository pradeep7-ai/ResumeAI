import { BarChart3, FileText } from "lucide-react";

/**
 * History Section Component
 * Displays the user's previous resume analyses with the ability to view details
 */
const HistorySection = ({ savedAnalyses, setAnalysis, setActiveSection }) => {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Analysis History
        </h2>
        <p className="text-gray-600">Review your previous resume analyses</p>
      </div>

      {/* Empty State */}
      {savedAnalyses.length === 0 ? (
        <div className="text-center py-12">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No analyses yet
          </h3>
          <p className="text-gray-500 mb-6">
            Start by analyzing your first resume
          </p>
          <button
            onClick={() => setActiveSection("input")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors cursor-pointer"
          >
            Get Started
          </button>
        </div>
      ) : (
        /* Analysis History List */
        <div className="grid gap-6">
          {savedAnalyses.map((savedAnalysis, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow"
            >
              {/* Analysis Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {savedAnalysis.fileName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(savedAnalysis.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Score Display */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <span className="text-2xl font-bold text-green-600">
                        {savedAnalysis.atsScore}%
                      </span>
                      <p className="text-xs text-gray-500">ATS</p>
                    </div>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-blue-600">
                        {savedAnalysis.overallScore}%
                      </span>
                      <p className="text-xs text-gray-500">Match</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setAnalysis(savedAnalysis);
                      setActiveSection("results");
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Analysis Summary */}
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">
                    Missing Keywords:{" "}
                  </span>
                  <span className="text-gray-600">
                    {savedAnalysis.missingKeywords.length}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Recommendations:{" "}
                  </span>
                  <span className="text-gray-600">
                    {savedAnalysis.recommendations.length}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistorySection;
