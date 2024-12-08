import { Application } from "express";
import { sequelize } from "./models";
import { initializeAssociations } from "./models/associations";

/**
 * Function to start the server.
 * @param app - Express application instance
 * @param port - Port number for the server
 */
const startServer = async (app: Application, port: number | string): Promise<void> => {
  try {
    // Initialize database associations
    initializeAssociations();

    // Sync database
    await sequelize.sync({ alter: false }); // Avoid alter:true in production. Use migrations instead.
    console.log("Database synced successfully!");

    // Start the server
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error initializing the application:", error);
    process.exit(1); // Exit the process in case of a critical failure
  }
};

export default startServer;