import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import routes from "./routes"; // Centralized route management
import dotenv from "dotenv";
import startServer from "./startServer"; // Import the startServer function
import errorHandler from "./middleware/errorHandler";

dotenv.config(); // Load environment variables

const app: Application = express();
const PORT = process.env.PORT || 3000;

/**
 * Middleware Configuration
 * - Enables Cross-Origin Resource Sharing (CORS)
 * - Parses incoming JSON payloads
 * - Serves static files from the "uploads" directory
 */
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/**
 * Routes Configuration
 * - All API routes are handled through the centralized `routes` file.
 */
app.use("/api", routes);

/**
 * Handle Unknown Routes
 * @function
 * @param {Request} req - The incoming request object
 * @param {Response} res - The outgoing response object
 * @param {NextFunction} next - The next middleware function
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Not Found" });
});

/**
 * Global Error Handler Middleware
 * - Handles all errors centrally
 */
app.use(errorHandler);

/**
 * Starts the server if the environment is not set to "test".
 * @param {Application} app - The Express application instance
 * @param {number|string} PORT - The port number where the server will listen
 */
if (process.env.NODE_ENV !== "test") {
  startServer(app, PORT);
}

export { app };
