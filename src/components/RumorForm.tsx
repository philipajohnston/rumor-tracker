'use client';

import { useState } from 'react';
import { RumorResult } from '../types/rumor';
import { processResults } from '../utils/rumorProcessing';
import RumorResults from './RumorResults';

interface RumorFormProps {
  onSubmit: (rumorText: string) => Promise<RumorResult[]>;
  isLoading: boolean;
}

export default function RumorForm({ onSubmit, isLoading }: RumorFormProps) {
  const [rumorText, setRumorText] = useState('');
  const [results, setResults] = useState<RumorResult[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rumorText.trim()) return;

    try {
      setError('');
      const apiResults = await onSubmit(rumorText);
      const processedResults = processResults(apiResults);
      setResults(processedResults);
    } catch (err) {
      setError('Failed to analyze rumor. Please try again.');
      console.error('Error processing rumor:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="rumorText"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Enter a rumor to analyze
          </label>
          <textarea
            id="rumorText"
            value={rumorText}
            onChange={(e) => setRumorText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Enter the rumor text or URL..."
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !rumorText.trim()}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-medium 
            ${isLoading || !rumorText.trim() 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Rumor'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error}
        </div>
      )}

      <RumorResults results={results} />
    </div>
  );
} 