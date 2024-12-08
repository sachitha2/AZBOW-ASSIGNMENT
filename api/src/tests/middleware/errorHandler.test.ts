import errorHandler from "../../middleware/errorHandler";
import { Request, Response, NextFunction } from "express";

describe("errorHandler Middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return 500 and the error message", () => {
    const error = new Error("Something went wrong");

    errorHandler(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Something went wrong",
    });
  });

  it("should handle unexpected errors with a default message", () => {
    const error = {} as Error; // Empty error object

    errorHandler(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "An unexpected error occurred.",
    });
  });
});
