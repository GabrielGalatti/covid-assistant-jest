import { SymptomAnalysis } from "../schemas/SymptomAnalysis";

export interface ISymptomService {
  analyzeSymptoms(userMessage: string): Promise<SymptomAnalysis.Output>;
}
