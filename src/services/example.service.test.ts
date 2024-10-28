import { exampleService } from "./example.service";

describe("exampleService", () => {
  it("validate health check", () => {
    const result = exampleService.healthCheck();
    expect(result).toEqual("OK");
  });
});
