import fs from "fs/promises";
import path from "path";
import ProductImageService from "../../services/ProductImageService";
import ProductImage from "../../models/ProductImage";
import Product from "../../models/Product";

jest.mock("fs/promises");
jest.mock("../../models/ProductImage");
jest.mock("../../models/Product");

describe("ProductImageService", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe("uploadImage", () => {
    it("should upload an image and save to database", async () => {
      const product_id = "P001";
      const filePath = "/tmp/test-image.jpg";
      const mockImage = {
        product_id,
        image_url: "/uploads/images/test-image.jpg",
      };

      (ProductImage.create as jest.Mock).mockResolvedValue(mockImage);

      const result = await ProductImageService.uploadImage(product_id, filePath);

      expect(result).toEqual(mockImage);
      expect(ProductImage.create).toHaveBeenCalledWith({
        product_id,
        image_url: "/uploads/images/test-image.jpg",
      });
    });
  });

  describe("getImageById", () => {
    it("should return an image by ID with product details", async () => {
      const mockImage = {
        id: "1",
        product_id: "P001",
        image_url: "/uploads/images/test-image.jpg",
        product: { product_name: "Sample Product", product_id: "P001" },
      };

      (ProductImage.findByPk as jest.Mock).mockResolvedValue(mockImage);

      const result = await ProductImageService.getImageById("1");

      expect(result).toEqual(mockImage);
      expect(ProductImage.findByPk).toHaveBeenCalledWith("1", {
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["product_name", "product_id"],
          },
        ],
      });
    });

    it("should return null if image is not found", async () => {
      (ProductImage.findByPk as jest.Mock).mockResolvedValue(null);

      const result = await ProductImageService.getImageById("999");

      expect(result).toBeNull();
      expect(ProductImage.findByPk).toHaveBeenCalledWith("999", {
        include: [
          { model: Product, as: "product", attributes: ["product_name", "product_id"] },
        ],
      });
    });
  });

  describe("getAllImages", () => {
    it("should return paginated images with associated product data", async () => {
      const mockPaginatedData = {
        count: 2,
        rows: [
          {
            id: "1",
            product_id: "P001",
            image_url: "/uploads/images/image1.jpg",
            product: { product_name: "Product 1" },
          },
          {
            id: "2",
            product_id: "P002",
            image_url: "/uploads/images/image2.jpg",
            product: { product_name: "Product 2" },
          },
        ],
      };

      (ProductImage.findAndCountAll as jest.Mock).mockResolvedValue(mockPaginatedData);

      const result = await ProductImageService.getAllImages(1, 2);

      expect(result).toEqual(mockPaginatedData);
      expect(ProductImage.findAndCountAll).toHaveBeenCalledWith({
        limit: 2,
        offset: 0,
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["product_name"],
          },
        ],
      });
    });
  });

  describe("deleteImage", () => {
    it("should delete an image file and remove record from database", async () => {
      const mockImage = {
        id: "1",
        image_url: "/uploads/images/test-image.jpg",
        destroy: jest.fn().mockResolvedValue(true),
      };

      (ProductImage.findByPk as jest.Mock).mockResolvedValue(mockImage);
      (fs.unlink as jest.Mock).mockResolvedValue(true);

      const result = await ProductImageService.deleteImage("1");

      expect(result).toBe(true);
      expect(ProductImage.findByPk).toHaveBeenCalledWith("1");
      expect(fs.unlink).toHaveBeenCalledWith(
        "/uploads/images/test-image.jpg"
      );
      expect(mockImage.destroy).toHaveBeenCalled();
    });

    it("should throw an error if image is not found", async () => {
      (ProductImage.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(ProductImageService.deleteImage("999")).rejects.toThrow(
        "Image not found."
      );

      expect(ProductImage.findByPk).toHaveBeenCalledWith("999");
      expect(fs.unlink).not.toHaveBeenCalled();
    });

    it("should throw an error if file deletion fails", async () => {
        const mockImage = {
          id: "1",
          image_url: "/uploads/images/test-image.jpg",
          destroy: jest.fn(),
        };
  
        // Mock findByPk to return the image
        (ProductImage.findByPk as jest.Mock).mockResolvedValue(mockImage);
  
        // Mock fs.unlink to throw an error
        (fs.unlink as jest.Mock).mockRejectedValue(new Error("Failed to delete file"));
  
        // Assert that the service throws an error
        await expect(ProductImageService.deleteImage("1")).rejects.toThrow(
          "Failed to delete image file."
        );
  
        // Verify that fs.unlink was called with the correct path
        expect(fs.unlink).toHaveBeenCalledWith("/uploads/images/test-image.jpg");
  
        // Verify destroy was not called
        expect(mockImage.destroy).not.toHaveBeenCalled();
  
        // Verify findByPk was called with the correct ID
        expect(ProductImage.findByPk).toHaveBeenCalledWith("1");
      });
  });
});
