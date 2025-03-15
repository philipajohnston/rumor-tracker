'use client';

import { RumorResult } from '../types/rumor';
import { format } from 'date-fns';

interface RumorResultsProps {
  results: RumorResult[];
}

export default function RumorResults({ results }: RumorResultsProps) {
  if (!results.length) {
    return null;
  }

  return (
    <div className="space-y-8 my-8">
      {results.map((result, index) => (
        <div 
          key={`${result.domain}-${index}`}
          className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {result.source}
            </h3>
            <span className="text-sm text-gray-500">
              {format(new Date(result.date), 'MMM d, yyyy')}
            </span>
          </div>
          
          <p className="text-gray-600 mb-4">
            {result.excerpt}
          </p>
          
          <div className="text-sm text-gray-400">
            {result.domain}
          </div>
        </div>
      ))}
    </div>
  );
} 