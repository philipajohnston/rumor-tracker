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

## Future Enhancements

### Web Search Capabilities

The application currently uses GPT-3.5-turbo with a knowledge cutoff date. Two potential options for adding real-time web search capabilities have been identified:

#### Option A: Custom Web Search API Integration

Pros:
- More control over search results and sources
- Can be more cost-effective for high volume usage
- Ability to customize search parameters and filters
- Can combine multiple search engines/sources
- No need to upgrade to GPT-4

Cons:
- More complex implementation (need to handle API integration, rate limits)
- Additional API costs for search services
- Need to manage multiple API keys
- May require more error handling and maintenance
- Need to carefully format search results for GPT consumption

#### Option B: GPT-4 with Web Browsing

Pros:
- Simpler implementation (single API integration)
- More natural integration of search and analysis
- Better handling of complex queries
- Built-in content summarization
- More reliable parsing of web content

Cons:
- Significantly higher cost per request (GPT-4 vs GPT-3.5)
- Less control over which sources are used
- Limited by OpenAI's browsing capabilities
- May have slower response times
- Knowledge cutoff still applies to model's base knowledge

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 