const mockParse = jest.fn();

jest.mock("openai", () => ({
  OpenAI: jest.fn(() => ({
    beta: {
      chat: {
        completions: {
          parse: mockParse,
        },
      },
    },
  })),
}));

import { symptomService } from "./symptom.service";
import { SymptomAnalysis } from "../schemas/SymptomAnalysis";

describe("SymptomService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("analyzeSymptoms", () => {
    it("deve retornar a análise dos sintomas corretamente", async () => {
      const mockResponse: SymptomAnalysis.Output = {
        hasFever: true,
        feverDegree: 38.5,
        hasLossOfSmell: false,
        hasBodyPain: true,
      };

      mockParse.mockResolvedValueOnce({
        choices: [
          {
            message: {
              parsed: mockResponse,
            },
          },
        ],
      });

      const result = await symptomService.analyzeSymptoms(
        "Estou com febre e dores no corpo"
      );

      expect(result).toEqual(mockResponse);
      expect(mockParse).toHaveBeenCalledWith({
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: "Estou com febre e dores no corpo" },
        ],
        response_format: expect.any(Object),
      });
    });
  });
});
