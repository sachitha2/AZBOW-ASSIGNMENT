import request from "supertest";
import { app } from "../../index"; // Your Express app entry point
import ProductDetailsService from "../../services/ProductDetailsService";

jest.mock("../../services/ProductDetailsService");

describe("ProductDetailsController", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  // GET ALL PRODUCT DETAILS
  describe("GET /api/product-details - getAllProductDetails", () => {
    it("should return all product details successfully", async () => {
      const mockDetails = [
        { product_id: "P001", product_description: "Description 1", directions: "Use daily" },
        { product_id: "P002", product_description: "Description 2", directions: "Use weekly" },
      ];

      (ProductDetailsService.getAllProductDetails as jest.Mock).mockResolvedValue(mockDetails);

      const response = await request(app).get("/api/product-details");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockDetails);
      expect(ProductDetailsService.getAllProductDetails).toHaveBeenCalledTimes(1);
    });

    it("should return 500 if the service fails", async () => {
      (ProductDetailsService.getAllProductDetails as jest.Mock).mockRejectedValue(
        new Error("Service error")
      );

      const response = await request(app).get("/api/product-details");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Service error");
    });
  });

  // GET PRODUCT DETAILS BY ID
  describe("GET /api/product-details/:id - getProductDetailsById", () => {
    it("should return product details for a valid ID", async () => {
      const mockDetail = { product_id: "P001", product_description: "Description 1", directions: "Use daily" };

      (ProductDetailsService.getProductDetailsById as jest.Mock).mockResolvedValue(mockDetail);

      const response = await request(app).get("/api/product-details/P001");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockDetail);
      expect(ProductDetailsService.getProductDetailsById).toHaveBeenCalledWith("P001");
    });

    it("should return 404 if product details are not found", async () => {
      (ProductDetailsService.getProductDetailsById as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get("/api/product-details/P999");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Product details not found.");
    });

    it("should return 500 if the service fails", async () => {
      (ProductDetailsService.getProductDetailsById as jest.Mock).mockRejectedValue(
        new Error("Service error")
      );

      const response = await request(app).get("/api/product-details/P001");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Service error");
    });
  });

  // CREATE PRODUCT DETAILS
  describe("POST /api/product-details - createProductDetails", () => {
    it("should create new product details successfully", async () => {
      const requestData = {
        product_id: "P001",
        product_description: "Description 1",
        directions: "Use daily",
      };
      const mockResponse = { id: 1, ...requestData };

      (ProductDetailsService.createProductDetails as jest.Mock).mockResolvedValue(mockResponse);

      const response = await request(app).post("/api/product-details").send(requestData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResponse);
      expect(ProductDetailsService.createProductDetails).toHaveBeenCalledWith(requestData);
    });

    it("should return 400 if required fields are missing", async () => {
      const requestData = { product_id: "", product_description: "" }; // Missing fields

      const response = await request(app).post("/api/product-details").send(requestData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Missing required fields.");
      expect(ProductDetailsService.createProductDetails).not.toHaveBeenCalled();
    });

    it("should return 500 if the service fails", async () => {
      const requestData = {
        product_id: "P001",
        product_description: "Description 1",
        directions: "Use daily",
      };

      (ProductDetailsService.createProductDetails as jest.Mock).mockRejectedValue(
        new Error("Service error")
      );

      const response = await request(app).post("/api/product-details").send(requestData);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Service error");
    });
  });

  // UPDATE PRODUCT DETAILS
  describe("PUT /api/product-details/:id - updateProductDetails", () => {
    it("should update product details successfully", async () => {
      const requestData = {
        product_description: "Updated description",
        directions: "Use twice daily",
      };
      const mockResponse = {
        product_id: "P001",
        ...requestData,
      };

      (ProductDetailsService.updateProductDetails as jest.Mock).mockResolvedValue(mockResponse);

      const response = await request(app).put("/api/product-details/P001").send(requestData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(ProductDetailsService.updateProductDetails).toHaveBeenCalledWith("P001", requestData);
    });

    it("should return 500 if the service fails", async () => {
      const requestData = {
        product_description: "Updated description",
        directions: "Use twice daily",
      };

      (ProductDetailsService.updateProductDetails as jest.Mock).mockRejectedValue(
        new Error("Service error")
      );

      const response = await request(app).put("/api/product-details/P001").send(requestData);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Service error");
    });
  });

  // DELETE PRODUCT DETAILS
  describe("DELETE /api/product-details/:id - deleteProductDetails", () => {
    it("should delete product details successfully", async () => {
      (ProductDetailsService.deleteProductDetails as jest.Mock).mockResolvedValue(true);

      const response = await request(app).delete("/api/product-details/P001");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Product details deleted successfully.");
      expect(ProductDetailsService.deleteProductDetails).toHaveBeenCalledWith("P001");
    });

    it("should return 500 if the service fails", async () => {
      (ProductDetailsService.deleteProductDetails as jest.Mock).mockRejectedValue(
        new Error("Service error")
      );

      const response = await request(app).delete("/api/product-details/P001");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Service error");
    });
  });
});
