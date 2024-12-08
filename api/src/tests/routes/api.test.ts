import request from "supertest";
import {app} from "../../index"; // Import the app

describe("API Endpoints", () => {
  it("should return 404 for unknown routes", async () => {
    const response = await request(app).get("/unknown-route");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Not Found");
  });

  it("should handle API routes correctly", async () => {
    const response = await request(app).get("/api/categories"); // Replace with an actual route
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
