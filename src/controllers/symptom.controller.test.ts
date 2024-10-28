process.env.OPENAI_API_KEY = "fake-api-key";

jest.mock("../services/symptom.service");

import { Request, Response } from "express";
import { symptomController } from "./symptom.controller";
import { symptomService } from "../services/symptom.service";

describe("SymptomController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    mockRequest = {
      body: {},
    };
    mockResponse = {
      status: mockStatus,
      json: mockJson,
    };
  });

  describe("analyzeSymptoms", () => {
    it("deve analisar sintomas e retornar resultado com sucesso", async () => {
      const mockSymptomAnalysis = {
        hasFever: true,
        feverDegree: 38.5,
        hasLossOfSmell: false,
        hasBodyPain: true,
      };

      mockRequest.body = {
        message: "Estou com febre e dores no corpo",
      };

      jest
        .spyOn(symptomService, "analyzeSymptoms")
        .mockResolvedValue(mockSymptomAnalysis);

      await symptomController.analyzeSymptoms(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockSymptomAnalysis);
    });

    it("deve retornar erro 500 quando o serviço falhar", async () => {
      mockRequest.body = {
        message: "Estou com febre",
      };

      jest
        .spyOn(symptomService, "analyzeSymptoms")
        .mockRejectedValue(new Error("Erro no serviço"));

      await symptomController.analyzeSymptoms(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" });
    });

    it("deve retornar erro 400 quando o body for inválido", async () => {
      mockRequest.body = {
        message: 123,
      };

      await symptomController.analyzeSymptoms(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid request body" });
    });
  });
});
