import { asyncHandler } from "../../middleware/asyncHandler";

describe("asyncHandler Middleware", () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = {};
    res = {};
    next = jest.fn(); // Mock next function
  });

  it("should call the wrapped function successfully", async () => {
    const mockHandler = jest.fn().mockResolvedValue("Success");

    const wrappedHandler = asyncHandler(mockHandler);

    await wrappedHandler(req, res, next);

    expect(mockHandler).toHaveBeenCalledWith(req, res, next);
    expect(next).not.toHaveBeenCalled(); // next should not be called on success
  });

  it("should pass errors to next when the wrapped function throws", async () => {
    const error = new Error("Test Error");
    const mockHandler = jest.fn().mockRejectedValue(error);

    const wrappedHandler = asyncHandler(mockHandler);

    await wrappedHandler(req, res, next);

    expect(mockHandler).toHaveBeenCalledWith(req, res, next);
    expect(next).toHaveBeenCalledWith(error); // next should be called with the error
  });
});
