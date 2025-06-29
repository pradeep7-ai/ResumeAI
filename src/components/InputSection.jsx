import {
  Upload,
  FileText,
  Target,
  RefreshCw,
  Copy,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

/**
 * Input Section Component
 * Handles resume and job description input with file upload functionality
 */
const InputSection = ({
  resume,
  setResume,
  jobDescription,
  setJobDescription,
  currentFileName,
  setCurrentFileName,
  fileInputRef,
  handleFileUpload,
  analysis,
  showKeywordPreview,
  setShowKeywordPreview,
  highlightKeywords,
  copyToClipboard,
  error,
  isLoading,
  analyzeResume,
  resetForm,
}) => {
  return (
    <div className="space-y-8">
      {/* Quick Tips Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-start space-x-4">
          <div className="w-6 h-6 mt-1 flex-shrink-0">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">
              Pro Tips for Best Results
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm opacity-90">
              <div>• Copy text directly from your PDF resume</div>
              <div>• Include complete job posting description</div>
              <div>• Use specific job titles and company names</div>
              <div>• Include skills, requirements, and qualifications</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Input Area */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Resume Input */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-white" />
                <h2 className="text-xl font-semibold text-white">
                  Your Resume
                </h2>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
            {currentFileName && (
              <div className="mt-2 text-blue-100 text-sm">
                File: {currentFileName}
              </div>
            )}
          </div>

          <div className="p-6">
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste your resume content here... You can also upload a .txt file using the Upload button above."
              className="w-full h-80 p-4 border-2 border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-gray-50 transition-all placeholder-gray-400"
            />

            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>{resume.length} characters</span>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => copyToClipboard(resume)}
                  className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </button>
                <button
                  onClick={() => setResume("")}
                  className="flex items-center space-x-1 hover:text-red-600 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            {/* Keyword Preview */}
            {analysis && analysis.missingKeywords && resume && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                    <Target className="w-4 h-4" />
                    <span>Keyword Analysis</span>
                  </h3>
                  <button
                    onClick={() => setShowKeywordPreview(!showKeywordPreview)}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {showKeywordPreview ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                    <span>{showKeywordPreview ? "Hide" : "Show"} Preview</span>
                  </button>
                </div>

                {showKeywordPreview && (
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 max-h-60 overflow-y-auto">
                    <div
                      className="prose prose-sm max-w-none text-gray-800 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: highlightKeywords(
                          resume,
                          analysis.missingKeywords
                        ),
                      }}
                    />
                    <div className="mt-3 pt-3 border-t border-yellow-300">
                      <p className="text-xs text-yellow-700 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>
                          Highlighted words are missing keywords from the job
                          description
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                {analysis.missingKeywords.length === 0 && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                    <div className="flex items-center space-x-2 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">
                        Perfect keyword match!
                      </span>
                    </div>
                    <p className="text-green-600 text-sm mt-1">
                      Your resume contains all important keywords from the job
                      description.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Job Description Input */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <div className="flex items-center space-x-3">
              <Target className="w-5 h-5 text-white" />
              <h2 className="text-xl font-semibold text-white">
                Job Description
              </h2>
            </div>
          </div>

          <div className="p-6">
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the complete job description here... Include requirements, qualifications, and responsibilities for best analysis."
              className="w-full h-80 p-4 border-2 border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 bg-gray-50 transition-all placeholder-gray-400"
            />

            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>{jobDescription.length} characters</span>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => copyToClipboard(jobDescription)}
                  className="flex items-center space-x-1 hover:text-indigo-600 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </button>
                <button
                  onClick={() => setJobDescription("")}
                  className="flex items-center space-x-1 hover:text-red-600 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Clear</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={analyzeResume}
          disabled={isLoading || !resume.trim() || !jobDescription.trim()}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:hover:scale-100"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Analyzing Resume...</span>
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span>Analyze Resume</span>
            </>
          )}
        </button>

        <button
          onClick={resetForm}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <span className="text-red-700 font-medium">{error}</span>
        </div>
      )}
    </div>
  );
};

export default InputSection;
