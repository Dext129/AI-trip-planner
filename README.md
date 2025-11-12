# AI Trip Planner 🌍✈️

An intelligent trip planning application powered by AI that helps users plan their perfect vacation through an interactive chatbot interface with real-time map integration.

## Features ✨

- **AI-Powered Chatbot**: Intelligent travel assistant using OpenAI GPT-3.5-turbo
- **Interactive Map**: Real-time location visualization with Google Maps
- **Smart Location Detection**: Automatically extracts destinations from natural language
- **Modern UI**: Clean, responsive design that works on all devices
- **Real-time Updates**: Chat and map sync seamlessly
- **User-Friendly**: Clear chat history, loading states, and helpful prompts

## Tech Stack 🛠️

- **Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS
- **AI**: OpenAI API (GPT-3.5-turbo)
- **Maps**: Google Maps Embed API
- **Authentication**: Clerk
- **Database**: Convex
- **Language**: TypeScript

## Getting Started 🚀

### Prerequisites

- Node.js 18+ installed
- OpenAI API key
- Google Maps API key (optional, for interactive maps)

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Configure your environment variables in `.env.local`:

```env
# OpenAI API Key (Required)
OPENAI_API_KEY=your_openai_api_key_here

# Google Maps API Key (Optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Convex (Already configured)
CONVEX_DEPLOYMENT=dev:watchful-gull-712
NEXT_PUBLIC_CONVEX_URL=https://watchful-gull-712.convex.cloud
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000/create-new-trip](http://localhost:3000/create-new-trip) in your browser

## How to Get API Keys 🔑

### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Create a new API key
4. Copy and paste it into `.env.local`

### Google Maps API Key (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "Maps Embed API"
4. Create credentials (API Key)
5. Copy and paste it into `.env.local`

## Usage 💬

1. Navigate to the trip planning page
2. Type your travel query (e.g., "Plan a 5-day trip to Paris")
3. The AI will provide recommendations
4. The map will automatically show your destination
5. Continue chatting to refine your trip plan

## Project Structure 📁

```
ai-trip-planner/
├── app/
│   ├── api/aimodel/          # OpenAI API endpoint
│   ├── create-new-trip/      # Main trip planning page
│   │   └── _components/      # Chatbox and Map components
│   └── page.tsx              # Home page
├── components/ui/            # Reusable UI components
└── .env.local               # Environment variables
```

## Features in Detail 🎯

### AI Chatbot
- Natural language understanding
- Context-aware responses
- Travel recommendations
- Cost estimation
- Activity suggestions

### Map Integration
- Automatic location detection
- Real-time updates
- Visual destination preview
- Quick info panel

### User Experience
- Message history with auto-scroll
- Loading indicators
- Clear chat functionality
- Keyboard shortcuts (Enter to send)
- Empty state guidance

## Learn More 📚

- [Next.js Documentation](https://nextjs.org/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Google Maps Platform](https://developers.google.com/maps)

## License

This project is for educational purposes.
