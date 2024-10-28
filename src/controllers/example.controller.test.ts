import { exampleController } from "./example.controller";
import { Request, Response } from "express";

describe("exampleController", () => {
  it("return 200 status in health check", () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as unknown as Response;

    exampleController.healthCheck(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "OK" });
  });
});
