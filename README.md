# Election Process Education Assistant

A production-grade, highly scalable web application designed to educate users about the election process. Built with Next.js 14, Tailwind CSS, shadcn/ui, Framer Motion, and the Google Gemini API.

## Features

- **🗺️ Interactive Election Timeline**: Dynamic, Framer Motion-powered timeline explaining the steps of the election.
- **🤖 Smart AI Assistant**: Floating chat widget powered by Google Gemini for contextual election queries.
- **🎮 Gamified Learning**: Scenario-based quizzes to test user knowledge.
- **🧾 Guided Voting Walkthrough**: Step-by-step interactive guide for first-time voters.
- **🌍 Localization**: Content tailored based on region (currently supporting India).

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: Zustand
- **Animations**: Framer Motion
- **AI Integration**: `@google/generative-ai`

## Getting Started Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Google Cloud Platform (GCP) Deployment

This app is optimized to run as a Docker container on Google Cloud Run.

### Prerequisites

- Google Cloud SDK (`gcloud` CLI) installed and authenticated.
- A Google Cloud Project with Billing enabled.
- Cloud Run and Artifact Registry APIs enabled.

### Deployment Steps

1. **Build the Docker Image** (Local or via Cloud Build):
   ```bash
   gcloud builds submit --tag gcr.io/[YOUR_PROJECT_ID]/election-app
   ```
   *(Replace `[YOUR_PROJECT_ID]` with your actual GCP Project ID)*

2. **Deploy to Cloud Run**:
   ```bash
   gcloud run deploy election-app \
     --image gcr.io/[YOUR_PROJECT_ID]/election-app \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars="GEMINI_API_KEY=your_api_key_here"
   ```

3. **Secure Secrets (Optional but Recommended)**:
   Instead of passing the API key as a plain environment variable, you should use GCP Secret Manager:
   ```bash
   gcloud run deploy election-app \
     --image gcr.io/[YOUR_PROJECT_ID]/election-app \
     --update-secrets=GEMINI_API_KEY=gemini-api-key:latest
   ```

## Architecture

- The frontend is served via a lightweight Node.js Alpine Docker container.
- `next.config.ts` uses `output: 'standalone'` to drastically reduce the image size.
- API Routes (`app/api/chat/route.ts`) securely proxy requests to the Gemini API, ensuring the API key is never exposed to the client bundle.
