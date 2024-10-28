import { Router } from "express";
import { exampleController } from "../controllers";
import { symptomController } from "../controllers/symptom.controller";

export const router = Router();

router.get("/health", exampleController.healthCheck);
router.post("/symptom", symptomController.analyzeSymptoms);
