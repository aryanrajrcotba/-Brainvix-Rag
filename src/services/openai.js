import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // For client-side use
});

// Generate MCQs from content
export const generateMCQs = async (content, count = 10) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are an expert educator creating multiple choice questions. Generate questions in valid JSON format."
                },
                {
                    role: "user",
                    content: `Create ${count} multiple choice questions based on this content. Return ONLY a valid JSON array with this exact structure:
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Brief explanation"
  }
]

Content:
${content.substring(0, 3000)}`
                }
            ],
            temperature: 0.7,
            max_tokens: 2000
        });

        const result = response.choices[0].message.content;
        return JSON.parse(result);
    } catch (error) {
        console.error('Error generating MCQs:', error);
        throw error;
    }
};

// Generate practice questions
export const generatePracticeQuestions = async (content, count = 10) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are an expert educator creating practice questions."
                },
                {
                    role: "user",
                    content: `Create ${count} practice questions based on this content. Return ONLY a valid JSON array:
[
  {
    "question": "Question text?",
    "answer": "Detailed answer",
    "difficulty": "easy/medium/hard"
  }
]

Content:
${content.substring(0, 3000)}`
                }
            ],
            temperature: 0.7,
            max_tokens: 2000
        });

        const result = response.choices[0].message.content;
        return JSON.parse(result);
    } catch (error) {
        console.error('Error generating practice questions:', error);
        throw error;
    }
};

// Generate quick revision notes
export const generateRevisionNotes = async (content) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are an expert at creating concise, well-structured revision notes."
                },
                {
                    role: "user",
                    content: `Create comprehensive revision notes from this content. Return ONLY a valid JSON object:
{
  "title": "Main topic",
  "sections": [
    {
      "heading": "Section heading",
      "points": ["Key point 1", "Key point 2", "Key point 3"]
    }
  ],
  "keyTerms": [
    {"term": "Term", "definition": "Definition"}
  ]
}

Content:
${content.substring(0, 3000)}`
                }
            ],
            temperature: 0.7,
            max_tokens: 2000
        });

        const result = response.choices[0].message.content;
        return JSON.parse(result);
    } catch (error) {
        console.error('Error generating revision notes:', error);
        throw error;
    }
};

// Generate flashcards
export const generateFlashcards = async (content, count = 15) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are an expert at creating effective flashcards for studying."
                },
                {
                    role: "user",
                    content: `Create ${count} flashcards based on this content. Return ONLY a valid JSON array:
[
  {
    "front": "Question or term",
    "back": "Answer or definition"
  }
]

Content:
${content.substring(0, 3000)}`
                }
            ],
            temperature: 0.7,
            max_tokens: 2000
        });

        const result = response.choices[0].message.content;
        return JSON.parse(result);
    } catch (error) {
        console.error('Error generating flashcards:', error);
        throw error;
    }
};
