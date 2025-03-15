import { RumorResult, MAX_DISPLAY_RESULTS, EARLIEST_RESULTS_COUNT, DISTRIBUTED_RESULTS_COUNT } from '../types/rumor';
import { format } from 'date-fns';

export function processResults(results: RumorResult[]): RumorResult[] {
  // Sort chronologically
  const sorted = results.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Get earliest 2 results
  const earliest = sorted.slice(0, EARLIEST_RESULTS_COUNT);
  
  // Get remaining results for distribution
  const remaining = sorted.slice(EARLIEST_RESULTS_COUNT);
  
  // Calculate step size for even distribution
  const step = Math.floor(remaining.length / DISTRIBUTED_RESULTS_COUNT);
  
  // Select distributed results
  const distributed = Array.from({ length: DISTRIBUTED_RESULTS_COUNT }, (_, i) => 
    remaining[Math.min(i * step, remaining.length - 1)]
  );
  
  // Combine and filter by unique domains
  const combined = [...earliest, ...distributed];
  const uniqueDomains = new Set<string>();
  
  return combined.filter(result => {
    if (uniqueDomains.has(result.domain)) return false;
    uniqueDomains.add(result.domain);
    return true;
  }).slice(0, MAX_DISPLAY_RESULTS);
}

export function groupByTimePeriod(results: RumorResult[]): { [key: string]: RumorResult[] } {
  return results.reduce((groups, result) => {
    const date = new Date(result.date);
    const period = format(date, 'MMMM yyyy');
    
    if (!groups[period]) {
      groups[period] = [];
    }
    
    groups[period].push(result);
    return groups;
  }, {} as { [key: string]: RumorResult[] });
}

export function extractDomain(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return domain.startsWith('www.') ? domain.slice(4) : domain;
  } catch {
    return url; // Return original if not a valid URL
  }
} 