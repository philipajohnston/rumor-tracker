'use client';

import { RumorReference } from '../types';
import { format } from 'date-fns';

interface TimelineProps {
  references: RumorReference[];
}

export default function Timeline({ references }: TimelineProps) {
  const sortedReferences = [...references].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <h2 className="text-2xl font-semibold mb-6">Timeline of References</h2>
      <div className="space-y-8">
        {sortedReferences.map((reference) => (
          <div key={reference.id} className="relative pl-8 border-l-2 border-gray-200">
            <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-0" />
            <div className="mb-1 text-sm text-gray-500">
              {format(new Date(reference.date), 'MMMM d, yyyy')}
            </div>
            <h3 className="text-lg font-medium mb-2">
              <a
                href={reference.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {reference.title}
              </a>
            </h3>
            <p className="text-gray-600 mb-2">{reference.excerpt}</p>
            <div className="text-sm text-gray-500">
              Source: {reference.source}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 