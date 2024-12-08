import request from "supertest";
import { app } from "../../index";
import ProductImageService from "../../services/ProductImageService";

jest.mock("../../services/ProductImageService");
// Mock the multer middleware
jest.mock("../../middleware/multerConfig", () => {
    return {
      single: () => (req: any, res: any, next: any) => {
        req.file = {
          filename: "mock-image.jpg",
          path: "/uploads/images/mock-image.jpg",
        };
        next();
      },
    };
  });

describe("ProductImageController", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe("ProductImageController - POST /api/product-images", () => {
  
    it("should return 400 if product_id is missing", async () => {
      const response = await request(app)
        .post("/api/product-images")
        .attach("image", Buffer.from("mock file content"), "mock-image.jpg");
  
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Missing required fields.");
      expect(ProductImageService.uploadImage).not.toHaveBeenCalled();
    });
  
    it("should return 400 if the image file is missing", async () => {
      const response = await request(app).post("/api/product-images").field("product_id", "P001");
  
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Missing required fields.");
      expect(ProductImageService.uploadImage).not.toHaveBeenCalled();
    });
  });

  describe("GET /api/product-images/:id - getImageById", () => {
    it("should return an image by ID successfully", async () => {
      const mockImage = {
        id: 1,
        product_id: "P001",
        image_url: "/uploads/images/mock-image.jpg",
      };

      (ProductImageService.getImageById as jest.Mock).mockResolvedValue(
        mockImage
      );

      const response = await request(app).get("/api/product-images/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockImage);
      expect(ProductImageService.getImageById).toHaveBeenCalledWith("1");
    });

    it("should return 404 if the image is not found", async () => {
      (ProductImageService.getImageById as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get("/api/product-images/999");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Image not found.");
      expect(ProductImageService.getImageById).toHaveBeenCalledWith("999");
    });

    it("should return 500 if the service fails", async () => {
      (ProductImageService.getImageById as jest.Mock).mockRejectedValue(
        new Error("Service error")
      );

      const response = await request(app).get("/api/product-images/1");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Service error");
    });
  });

  describe("GET /api/product-images - getAllImages", () => {
    it("should return paginated images successfully", async () => {
      const mockPaginatedData = {
        count: 2,
        rows: [
          {
            id: 1,
            product_id: "P001",
            image_url: "/uploads/images/image1.jpg",
          },
          {
            id: 2,
            product_id: "P002",
            image_url: "/uploads/images/image2.jpg",
          },
        ],
      };

      (ProductImageService.getAllImages as jest.Mock).mockResolvedValue(
        mockPaginatedData
      );

      const response = await request(app).get(
        "/api/product-images?page=1&limit=2"
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("currentPage", 1);
      expect(response.body).toHaveProperty("totalPages", 1);
      expect(response.body).toHaveProperty("totalItems", 2);
      expect(response.body.images).toEqual(mockPaginatedData.rows);
      expect(ProductImageService.getAllImages).toHaveBeenCalledWith(1, 2);
    });

    it("should return 500 if the service fails", async () => {
      (ProductImageService.getAllImages as jest.Mock).mockRejectedValue(
        new Error("Service error")
      );

      const response = await request(app).get("/api/product-images");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Service error");
    });
  });

  describe("DELETE /api/product-images/:id - deleteImage", () => {
    it("should delete an image successfully", async () => {
      (ProductImageService.deleteImage as jest.Mock).mockResolvedValue(true);

      const response = await request(app).delete("/api/product-images/1");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Image deleted successfully."
      );
      expect(ProductImageService.deleteImage).toHaveBeenCalledWith("1");
    });

    it("should return 404 if the image is not found", async () => {
      (ProductImageService.deleteImage as jest.Mock).mockRejectedValue(
        new Error("Image not found.")
      );

      const response = await request(app).delete("/api/product-images/999");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Image not found.");
    });

    it("should return 500 if the service fails", async () => {
      (ProductImageService.deleteImage as jest.Mock).mockRejectedValue(
        new Error("Service error")
      );

      const response = await request(app).delete("/api/product-images/1");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Service error");
    });
  });
});
