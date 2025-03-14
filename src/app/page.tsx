'use client';

import { useState } from 'react';
import RumorForm from '../components/RumorForm';
import Timeline from '../components/Timeline';
import { RumorReference } from '../lib/types';

export default function Home() {
  const [references, setReferences] = useState<RumorReference[]>([]);
  const [loading, setLoading] = useState(false);

  const handleRumorSubmit = async (rumorText: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/analyze-rumor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rumor: rumorText }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze rumor');
      }

      const data = await response.json();
      setReferences(data.references);
    } catch (error) {
      console.error('Error analyzing rumor:', error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Rumor Tracker</h1>
      <RumorForm onSubmit={handleRumorSubmit} isLoading={loading} />
      {references.length > 0 && (
        <Timeline references={references} />
      )}
    </div>
  );
} 