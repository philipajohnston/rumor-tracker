# Rumor Tracker

A web application that helps track the origin and spread of internet rumors. This tool allows users to input rumors or URLs and analyzes them to find their origins and related references across the internet.

## Features

- Input rumors via text or URL
- Analyze rumors using AI to find their origins
- Display references in a chronological timeline
- Show source credibility and relevance scores
- Modern, responsive UI

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- OpenAI API key

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/rumor-tracker.git
cd rumor-tracker
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Technology Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- OpenAI API
- date-fns

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 