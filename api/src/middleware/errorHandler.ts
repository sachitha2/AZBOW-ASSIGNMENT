import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: "Missing required fields.",
      errors: errors.array(),
    });
    return; // Explicitly return to avoid falling through to `next`
  }
  next(); // Pass control to the next middleware
};

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.error(err.message); // Log the error for debugging
  res
    .status(500)
    .json({ message: err.message || "An unexpected error occurred." });
};

export default errorHandler;
