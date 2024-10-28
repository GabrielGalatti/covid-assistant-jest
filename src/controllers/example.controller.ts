import { Request, Response } from "express";

import { HealthCheck } from "../schemas";
import { exampleService } from "../services";

export const exampleController = {
  healthCheck(req: Request, res: Response) {
    const status = exampleService.healthCheck();
    const data = HealthCheck.healthCheckOutput.parse({ message: status });
    res.status(200).json(data);
  },
};
