#!/usr/bin/env node

/**
 * Environment Setup Script for ResumeAI Pro
 * This script helps users set up their environment variables
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("🚀 ResumeAI Pro - Environment Setup\n");

// Check if .env already exists
const envPath = path.join(__dirname, ".env");
const envExamplePath = path.join(__dirname, ".env.example");

if (fs.existsSync(envPath)) {
  console.log("⚠️  .env file already exists!");
  rl.question("Do you want to overwrite it? (y/N): ", (answer) => {
    if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
      setupEnvironment();
    } else {
      console.log("Setup cancelled. Your existing .env file is preserved.");
      rl.close();
    }
  });
} else {
  setupEnvironment();
}

function setupEnvironment() {
  console.log("\n📝 Setting up environment variables...\n");

  rl.question(
    "Enter your Gemini API key (or press Enter to skip): ",
    (apiKey) => {
      if (!apiKey.trim()) {
        console.log(
          "\n⚠️  No API key provided. You can add it later by editing the .env file."
        );
        createEnvFile("");
      } else {
        createEnvFile(apiKey.trim());
      }
    }
  );
}

function createEnvFile(apiKey) {
  const envContent = `# Gemini API Configuration
# Get your API key from: https://makersuite.google.com/app/apikey
VITE_GEMINI_API_KEY=${apiKey}
`;

  try {
    fs.writeFileSync(envPath, envContent);
    console.log("✅ .env file created successfully!");

    if (apiKey) {
      console.log("✅ API key configured!");
    } else {
      console.log(
        "📝 Please edit .env file and add your API key before running the app."
      );
    }

    console.log("\n🎉 Environment setup complete!");
    console.log("\nNext steps:");
    console.log("1. Run: npm install");
    console.log("2. Run: npm run dev");
    console.log("3. Open your browser to the URL shown");
  } catch (error) {
    console.error("❌ Error creating .env file:", error.message);
  }

  rl.close();
}
