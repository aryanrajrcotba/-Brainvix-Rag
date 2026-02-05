# Brainvix - AI-Powered Study Assistant

A professional full-stack web application that helps students create study materials using AI. Upload PDFs or enter topics to automatically generate MCQs, practice questions, revision notes, and flashcards.

## Features

- ✅ **User Authentication** - Secure signup and login with Supabase
- 📄 **PDF Upload** - Extract text from PDF documents
- ✏️ **Topic Input** - Enter any topic for study material generation
- 🤖 **AI-Generated Content**:
  - Multiple Choice Questions (MCQs) with scoring
  - Practice Questions with detailed answers
  - Quick Revision Notes with key terms
  - Interactive Flashcards with flip animation
- 💾 **Data Persistence** - All content saved to Supabase database
- 🎨 **Modern UI** - Professional design with animations and responsive layout

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-3.5-turbo
- **Routing**: React Router DOM
- **Icons**: React Icons
- **Styling**: Custom CSS with modern design system

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- OpenAI API key

## Setup Instructions

### 1. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `database-setup.sql`
4. Run the script to create all tables and security policies

### 2. Environment Variables

The `.env` file is already configured with your credentials:

```env
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_SUPABASE_URL=https://vtwyhbbagpklkdhwlgxz.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
```

**⚠️ Important**: Never commit the `.env` file to version control!

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage Guide

### Getting Started

1. **Sign Up**: Create a new account with your email and password
2. **Login**: Sign in with your credentials
3. **Choose Input Method**: 
   - Upload a PDF document, OR
   - Enter a topic with optional details

### Generating Study Materials

1. After uploading/submitting content, the AI will automatically generate:
   - 10 Multiple Choice Questions
   - 10 Practice Questions
   - Comprehensive Revision Notes
   - 15 Flashcards

2. Use the material selector to switch between different types
3. All content is automatically saved to your account

### Study Features

- **MCQs**: Answer questions and get instant feedback with scoring
- **Questions**: Expandable cards with detailed answers and difficulty levels
- **Notes**: Structured notes with sections and key terms
- **Flashcards**: Interactive cards with flip animation

## Project Structure

```
brainvix-rag/
├── src/
│   ├── components/
│   │   ├── Auth/           # Login, Signup, ProtectedRoute
│   │   ├── Upload/         # PDFUploader, TopicInput, InputSelector
│   │   └── StudyMaterials/ # MCQViewer, QuestionViewer, etc.
│   ├── contexts/
│   │   └── AuthContext.jsx # Authentication state management
│   ├── pages/
│   │   └── Dashboard.jsx   # Main application page
│   ├── services/
│   │   ├── supabase.js     # Supabase client
│   │   ├── openai.js       # OpenAI API integration
│   │   ├── authService.js  # Authentication functions
│   │   ├── studyMaterialService.js  # Database operations
│   │   └── pdfExtractor.js # PDF processing
│   ├── App.jsx             # Main app component with routing
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── database-setup.sql      # Supabase database schema
├── .env                    # Environment variables
└── package.json
```

## Database Schema

### Tables

- **users**: User profiles (extends Supabase auth)
- **study_materials**: Uploaded PDFs and topics
- **generated_content**: AI-generated study materials

### Security

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Automatic user profile creation on signup

## API Integration

### OpenAI

The app uses GPT-3.5-turbo to generate:
- Structured MCQs with options and explanations
- Practice questions with difficulty levels
- Organized revision notes with key terms
- Concise flashcards for quick review

All responses are validated and parsed as JSON for consistent formatting.

### Supabase

- **Authentication**: Email/password authentication
- **Database**: PostgreSQL with real-time capabilities
- **Storage**: Row-level security for data protection

## Important Notes

### PDF Processing

The current implementation includes a placeholder for PDF text extraction. For production use, implement server-side PDF parsing using libraries like `pdf-parse` in a backend API to properly extract text from PDF files.

### API Costs

OpenAI API calls are made for each content generation. Monitor your usage to avoid unexpected costs. Consider implementing:
- Caching generated content
- Rate limiting
- Content reuse strategies

## Troubleshooting

### Common Issues

1. **Module not found errors**: Run `npm install` again
2. **API errors**: Check your environment variables are correct
3. **Database errors**: Ensure you've run the `database-setup.sql` script
4. **Authentication issues**: Verify Supabase URL and publishable key

### Development Tips

- Use browser DevTools to inspect errors
- Check the Network tab for API call failures
- Review Supabase dashboard for database issues
- Monitor OpenAI API usage limits

