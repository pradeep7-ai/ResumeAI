import {
  Award,
  BarChart3,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Target,
  Users,
  Download,
  RefreshCw,
  Copy,
} from "lucide-react";
import { formatAnalysisForCopy } from "../utils/analysisUtils";
import { useState } from "react";

/**
 * Results Section Component
 * Displays comprehensive analysis results with scores, recommendations, and actions
 */
const ResultsSection = ({
  analysis,
  downloadReport,
  setActiveSection,
  copyToClipboard,
  getScoreColor,
  getScoreLabel,
}) => {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = () => {
    copyToClipboard(formatAnalysisForCopy(analysis));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-2 duration-300">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">
              Analysis data copied to clipboard!
            </span>
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <Award className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900">
            Analysis Complete
          </h2>
        </div>
        <p className="text-gray-600 text-lg">{analysis.fileName}</p>
        <p className="text-gray-500 text-sm">
          {new Date(analysis.timestamp).toLocaleString()}
        </p>
      </div>

      {/* Score Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div
          className={`${getScoreColor(
            analysis.atsScore
          )} rounded-2xl p-8 text-center shadow-lg`}
        >
          <div className="flex items-center justify-center mb-4">
            <BarChart3 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            ATS Compatibility Score
          </h3>
          <div className="text-5xl font-bold mb-2">{analysis.atsScore}%</div>
          <p className="text-lg font-medium">
            {getScoreLabel(analysis.atsScore)}
          </p>
          <div className="mt-4 bg-white/30 rounded-full h-2">
            <div
              className="bg-current h-2 rounded-full transition-all duration-1000"
              style={{ width: `${analysis.atsScore}%` }}
            ></div>
          </div>
        </div>

        <div
          className={`${getScoreColor(
            analysis.overallScore
          )} rounded-2xl p-8 text-center shadow-lg`}
        >
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Overall Job Match</h3>
          <div className="text-5xl font-bold mb-2">
            {analysis.overallScore}%
          </div>
          <p className="text-lg font-medium">
            {getScoreLabel(analysis.overallScore)}
          </p>
          <div className="mt-4 bg-white/30 rounded-full h-2">
            <div
              className="bg-current h-2 rounded-full transition-all duration-1000"
              style={{ width: `${analysis.overallScore}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Strengths and Weaknesses */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-white" />
              <h3 className="text-xl font-semibold text-white">Strengths</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analysis.strengths.map((strength, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-green-800 font-medium">{strength}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-white" />
              <h3 className="text-xl font-semibold text-white">
                Areas for Improvement
              </h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analysis.weaknesses.map((weakness, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200"
                >
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-orange-800 font-medium">
                    {weakness}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Keywords and Recommendations */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <div className="flex items-center space-x-3">
            <Lightbulb className="w-6 h-6 text-white" />
            <h3 className="text-xl font-semibold text-white">
              AI Recommendations
            </h3>
          </div>
        </div>
        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span>
                  Add These Keywords ({analysis.missingKeywords.length})
                </span>
              </h4>
              {analysis.missingKeywords.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {analysis.missingKeywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium border border-blue-200 hover:bg-blue-200 transition-colors cursor-pointer"
                      onClick={() => copyToClipboard(keyword)}
                      title="Click to copy"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-green-600 font-medium flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>All keywords present!</span>
                </div>
              )}
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <span>Suggested Additions</span>
              </h4>
              <div className="space-y-3">
                {analysis.suggestedAdditions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200"
                  >
                    <div className="bg-indigo-200 text-indigo-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-indigo-800 text-sm">
                      {suggestion}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Steps */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
          <div className="flex items-center space-x-3">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-white">Next Steps</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {analysis.recommendations.map((recommendation, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg border border-purple-200"
              >
                <div className="bg-purple-200 text-purple-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mt-1">
                  {index + 1}
                </div>
                <span className="text-purple-800 font-medium flex-1">
                  {recommendation}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={downloadReport}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl cursor-pointer"
        >
          <Download className="w-5 h-5" />
          <span>Download Full Report</span>
        </button>

        <button
          onClick={() => setActiveSection("input")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl cursor-pointer"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Analyze Another Resume</span>
        </button>

        <button
          onClick={handleCopy}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl cursor-pointer"
        >
          <Copy className="w-5 h-5" />
          <span>Copy Analysis Data</span>
        </button>
      </div>
    </div>
  );
};

export default ResultsSection;
