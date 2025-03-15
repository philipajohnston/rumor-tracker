export interface RumorResult {
  source: string;
  domain: string;
  date: string;
  excerpt: string;
  timePeriod: string;
}

export interface TimeGroup {
  period: string;
  results: RumorResult[];
}

export const MAX_DISPLAY_RESULTS = 7;
export const EARLIEST_RESULTS_COUNT = 2;
export const DISTRIBUTED_RESULTS_COUNT = 5;
export const MAX_API_RESULTS = 15; 