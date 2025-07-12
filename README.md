# ResumeEnhancer

An AI-powered resume analysis and enhancement tool built with React, Tailwind CSS, and Google's Gemini API.

## 🚀 Features

- **AI-Powered Analysis**: Uses Google's Gemini API for intelligent resume analysis
- **ATS Optimization**: Analyzes resume compatibility with Applicant Tracking Systems
- **Keyword Matching**: Identifies missing keywords from job descriptions
- **Smart Recommendations**: Provides actionable improvement suggestions
- **History Management**: Saves and manages previous analyses
- **File Upload**: Support for .txt and .pdf file uploads
- **Responsive Design**: Beautiful, modern UI that works on all devices

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header.jsx       # Application header with navigation
│   ├── InputSection.jsx # Resume and job description input forms
│   ├── HistorySection.jsx # Analysis history display
│   ├── ResultsSection.jsx # Analysis results and recommendations
│   └── Footer.jsx       # Application footer
├── hooks/               # Custom React hooks
│   └── useResumeAnalysis.js # Main application logic and state management
├── services/            # API and external service integrations
│   └── geminiService.js # Google Gemini API integration
├── utils/               # Utility functions
│   ├── analysisUtils.js # Analysis-related utilities (highlighting, scoring)
│   └── storageUtils.js  # localStorage operations for history management
├── config/              # Configuration files
│   └── api.js          # API configuration and constants
└── App.jsx             # Main application component
```

## 🏗️ Architecture Overview

### **Component Structure**

- **Header**: Navigation and app branding
- **InputSection**: Resume and job description input with file upload
- **HistorySection**: Displays saved analyses with quick access
- **ResultsSection**: Comprehensive analysis results with actionable insights
- **Footer**: Copyright and branding information

### **Custom Hook (useResumeAnalysis)**

Centralizes all application logic including:

- State management for forms and analysis data
- API integration with Gemini service
- localStorage operations for history persistence
- File upload handling
- Error management

### **Utility Functions**

- **analysisUtils.js**: Keyword highlighting, score calculations, report generation
- **storageUtils.js**: localStorage operations, data import/export functionality

### **Service Layer**

- **geminiService.js**: Handles all Gemini API interactions with proper error handling

## 🛠️ Key Features Explained

### **1. AI Analysis Pipeline**

```javascript
// The analysis process follows this flow:
1. User inputs resume and job description
2. Data validation and preprocessing
3. Gemini API call with structured prompt
4. Response parsing and data extraction
5. Score calculation and keyword analysis
6. Results display with actionable recommendations
```

### **2. History Management**

- **Storage**: Uses localStorage with automatic cleanup
- **Limit**: Maximum 10 saved analyses per user
- **Persistence**: Survives browser sessions and page refreshes
- **Export**: Users can export analysis data as JSON

### **3. Keyword Analysis**

- **Extraction**: Identifies important keywords from job descriptions
- **Matching**: Compares resume content against required keywords
- **Highlighting**: Visual indication of missing keywords in resume
- **Suggestions**: Provides specific keywords to add

### **4. Score Calculation**

- **ATS Score**: Measures compatibility with Applicant Tracking Systems
- **Overall Match**: Comprehensive job fit assessment
- **Visual Indicators**: Color-coded scores with progress bars

## 🎨 UI/UX Features

### **Modern Design**

- Gradient backgrounds and smooth animations
- Card-based layout with proper spacing
- Responsive design for all screen sizes
- Intuitive navigation between sections

### **Interactive Elements**

- Hover effects and transitions
- Loading states with spinners
- Error handling with user-friendly messages
- Copy-to-clipboard functionality with toast notifications
- Modern gradient buttons with consistent styling

### **Accessibility**

- Proper ARIA labels
- Keyboard navigation support
- High contrast color schemes
- Screen reader friendly

## 🔧 Technical Implementation

### **State Management**

- Uses React hooks for local state
- Custom hook pattern for complex logic
- Proper state updates and side effects

### **Error Handling**

- Comprehensive try-catch blocks
- User-friendly error messages
- Graceful degradation for API failures

### **Performance Optimization**

- Component memoization where appropriate
- Efficient re-rendering patterns
- Optimized localStorage operations

### **Code Quality**

- Comprehensive JSDoc comments
- Consistent code formatting
- Modular component architecture
- Separation of concerns

### **PDF Processing**

- PDF.js integration for .pdf file parsing
- Text extraction from PDF documents
- Support for multi-page PDF files
- Proper worker configuration for Vite compatibility

## 🚀 Getting Started

1. **Clone the Repository**

   ```bash
   git clone <your-repository-url>
   cd my-react-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   **Option A: Use the setup script (Recommended)**

   ```bash
   npm run setup
   ```

   Follow the prompts to enter your API key.

   **Option B: Manual setup**

   - Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and add your Google Gemini API key:
     ```
     VITE_GEMINI_API_KEY=your_actual_api_key_here
     ```
   - Get your API key from: https://makersuite.google.com/app/apikey

4. **Start Development Server**

   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## 🔐 Environment Variables

This project uses environment variables to keep sensitive information secure:

- **`.env`**: Contains your actual API key (not committed to git)
- **`.env.example`**: Template showing required variables (committed to git)

**Important**: Never commit your `.env` file to version control. The `.gitignore` file is configured to exclude it automatically.

## 📝 Usage Instructions

1. **Input Resume**: Paste your resume text or upload a .txt or .pdf file
2. **Add Job Description**: Paste the complete job posting description
3. **Analyze**: Click "Analyze Resume" to get AI-powered insights
4. **Review Results**: Check scores, missing keywords, and recommendations
5. **Take Action**: Follow the suggested improvements and add missing keywords
6. **Save Progress**: Analysis is automatically saved to your history

## 🔒 Privacy & Security

- **Local Storage**: All data is stored locally in the user's browser
- **No Server Storage**: No personal data is sent to external servers
- **API Security**: Only resume and job description text is sent to Gemini API
- **Data Retention**: Users control their own data through browser storage
- **Environment Variables**: API keys are stored securely in environment files

## 🛠️ Customization

### **Styling**

- Modify Tailwind classes in components
- Update color schemes in `tailwind.config.js`
- Customize gradients and animations

### **Functionality**

- Add new analysis metrics in `analysisUtils.js`
- Extend storage capabilities in `storageUtils.js`
- Modify API prompts in `geminiService.js`

### **Components**

- Create new components in the `components/` directory
- Follow the established patterns for props and state management
- Add proper JSDoc comments for documentation

## 📊 Performance Metrics

- **Bundle Size**: Optimized with Vite for fast loading
- **API Response Time**: Typically 2-5 seconds for analysis
- **Storage Efficiency**: Compressed localStorage usage
- **Memory Usage**: Minimal memory footprint

## 🤝 Contributing

1. Follow the established code structure
2. Add comprehensive comments for new functions
3. Maintain consistent formatting
4. Test thoroughly before submitting changes
5. Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ using React, Tailwind CSS, and Google Gemini API**
