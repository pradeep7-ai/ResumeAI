import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

/**
 * Extracts text content from a PDF file
 * @param {File} file - The PDF file to extract text from
 * @returns {Promise<string>} - The extracted text content
 */
export const extractTextFromPDF = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
    });
    const pdf = await loadingTask.promise;

    let fullText = "";

    // Extract text from all pages
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      // Combine text items from the page
      const pageText = textContent.items.map((item) => item.str).join(" ");

      fullText += pageText + "\n";
    }

    return fullText.trim();
  } catch (error) {
    console.error("Error extracting text from PDF:", error);

    // Provide more specific error messages
    if (error.name === "InvalidPDFException") {
      throw new Error("The uploaded file is not a valid PDF or is corrupted.");
    } else if (error.name === "MissingPDFException") {
      throw new Error("The PDF file is missing or cannot be read.");
    } else if (error.name === "UnexpectedResponseException") {
      throw new Error("Failed to load the PDF file. Please try again.");
    } else {
      throw new Error(
        "Failed to extract text from PDF. Please ensure the file is not corrupted and try again."
      );
    }
  }
};

/**
 * Validates if a file is a PDF
 * @param {File} file - The file to validate
 * @returns {boolean} - True if the file is a PDF
 */
export const isPDFFile = (file) => {
  return (
    file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
  );
};
