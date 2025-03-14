'use client';

import { useState } from 'react';

interface RumorFormProps {
  onSubmit: (rumorText: string) => Promise<void>;
  isLoading: boolean;
}

export default function RumorForm({ onSubmit, isLoading }: RumorFormProps) {
  const [rumorText, setRumorText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rumorText.trim()) return;
    await onSubmit(rumorText);
    setRumorText('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
      <div className="mb-4">
        <label htmlFor="rumor" className="block text-sm font-medium text-gray-700 mb-2">
          Enter a rumor or paste a URL
        </label>
        <textarea
          id="rumor"
          value={rumorText}
          onChange={(e) => setRumorText(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          rows={4}
          placeholder="Enter the rumor text or paste a URL to analyze..."
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !rumorText.trim()}
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Analyzing...' : 'Track Rumor'}
      </button>
    </form>
  );
} 