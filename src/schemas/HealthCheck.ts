import { z } from "zod";

export namespace HealthCheck {
  export const healthCheckOutput = z.object({
    message: z.string(),
  });

  export type HealthCheckOutput = z.infer<typeof healthCheckOutput>;
}
