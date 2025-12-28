
export interface Solution {
  problemSummary: string;
  steps: string[];
  finalResult: string;
  csPerspective: {
    title: string;
    description: string;
    aiApplications: string[];
    algorithms: string[];
  };
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  image: string;
  prompt: string;
  solution: Solution;
}

export enum View {
  HOME = 'HOME',
  SOLVER = 'SOLVER',
  HISTORY = 'HISTORY',
  DETAIL = 'DETAIL'
}
