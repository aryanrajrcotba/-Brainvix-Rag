// PDF text extraction utility
// Note: pdf-parse requires Node.js environment, so we'll use a simpler approach for browser
// For production, you should use a backend API to handle PDF processing

export const extractTextFromPDF = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async (e) => {
            try {
                // For now, we'll use a simple approach
                // In production, send the file to a backend API for proper PDF parsing
                const arrayBuffer = e.target.result;

                // Simplified text extraction - in production use proper PDF parser
                const text = `PDF content from: ${file.name}\n\nThis is placeholder text. For production, implement server-side PDF parsing using pdf-parse or similar library.`;

                resolve(text);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = () => {
            reject(new Error('Error reading file'));
        };

        reader.readAsArrayBuffer(file);
    });
};

// Validate PDF file
export const validatePDF = (file) => {
    const validTypes = ['application/pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
        throw new Error('Please upload a PDF file');
    }

    if (file.size > maxSize) {
        throw new Error('File size must be less than 10MB');
    }

    return true;
};
