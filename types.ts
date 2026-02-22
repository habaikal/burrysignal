
export enum RiskLevel {
  STABLE = 'STABLE',
  WARNING = 'WARNING',
  CRISIS = 'CRISIS',
  CATASTROPHIC = 'CATASTROPHIC'
}

export type Language = 'en' | 'ko';

export interface RiskIndicator {
  id: string;
  title: Record<Language, string>;
  category: string;
  description: Record<Language, string>;
  simpleMeaning: Record<Language, string>;
  value: number; 
  trend: 'up' | 'down' | 'neutral';
  color: string;
  icon: string;
  logic: Record<Language, string>;
}

export interface AnalysisSummary {
  overallRisk: RiskLevel;
  score: number;
  simpleStatus: string; 
  executiveSummary: string;
  topThreats: string[];
  contrarianInsight: string;
  strategies: string[];
  simulationLog?: string[];
  fractureHeatmap?: { sector: string; risk: number; status: string }[];
}

export interface Scenario {
  id: string;
  label: Record<Language, string>;
  prompt: string;
}
