import { IExampleService } from "../interfaces/Example";

export const exampleService: IExampleService = {
  healthCheck(): string {
    return "OK";
  },
};
