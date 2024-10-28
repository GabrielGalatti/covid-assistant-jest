import { Request, Response } from "express";

import { SymptomAnalysis } from "../schemas/SymptomAnalysis";
import { symptomService } from "../services/symptom.service";
import { ZodError } from "zod";

export const symptomController = {
  async analyzeSymptoms(req: Request, res: Response) {
    try {
      const { message } = SymptomAnalysis.input.parse(req.body);

      const result = await symptomService.analyzeSymptoms(message);

      res.status(200).json(result);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ error: "Invalid request body" });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  },
};
