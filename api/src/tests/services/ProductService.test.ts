import ProductService from "../../services/ProductService";
import Product from "../../models/Product";
import Category from "../../models/Category";
import ProductDetails from "../../models/ProductDetails";
import ProductImage from "../../models/ProductImage";

jest.mock("../../models/Product");
jest.mock("../../models/Category");
jest.mock("../../models/ProductDetails");
jest.mock("../../models/ProductImage");

describe("ProductService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // GET PRODUCT BY ID
  describe("getProductById", () => {
    it("should return a product with its details when it exists", async () => {
      const mockProduct = {
        product_id: "P001",
        product_name: "Laptop",
        categories: [{ category_name: "Electronics" }],
        details: { product_description: "A powerful laptop", directions: "Handle with care" },
        images: [{ image_url: "/uploads/image.jpg" }],
      };

      (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);

      const result = await ProductService.getProductById("P001");

      expect(result).toEqual(mockProduct);
      expect(Product.findByPk).toHaveBeenCalledWith("P001", expect.any(Object));
    });

    it("should return null if the product does not exist", async () => {
      (Product.findByPk as jest.Mock).mockResolvedValue(null);

      const result = await ProductService.getProductById("P999");

      expect(result).toBeNull();
      expect(Product.findByPk).toHaveBeenCalledWith("P999", expect.any(Object));
    });

    it("should throw an error if fetching fails", async () => {
      (Product.findByPk as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(ProductService.getProductById("P001")).rejects.toThrow("Database error");
    });
  });

  // GET ALL PRODUCTS
  describe("getAllProducts", () => {
    it("should return paginated products successfully", async () => {
      const mockProducts = {
        count: 2,
        rows: [
          {
            product_id: "P001",
            product_name: "Laptop",
            categories: [{ category_name: "Electronics" }],
            images: [{ image_url: "/uploads/image1.jpg" }],
          },
          {
            product_id: "P002",
            product_name: "Phone",
            categories: [{ category_name: "Electronics" }],
            images: [{ image_url: "/uploads/image2.jpg" }],
          },
        ],
      };

      (Product.findAndCountAll as jest.Mock).mockResolvedValue(mockProducts);

      const result = await ProductService.getAllProducts(1, 10);

      expect(result).toEqual(mockProducts);
      expect(Product.findAndCountAll).toHaveBeenCalledWith(expect.any(Object));
    });

    it("should throw an error if fetching products fails", async () => {
      (Product.findAndCountAll as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(ProductService.getAllProducts(1, 10)).rejects.toThrow("Database error");
    });
  });

  // CREATE PRODUCT
  describe("createProduct", () => {
    it("should create a new product and associate categories", async () => {
        const mockProduct = {
          product_id: "P001",
          product_name: "Laptop",
          addCategories: jest.fn(), // Mock the addCategories association method
        };
  
        const mockCategories = [
          { category_id: 1, category_name: "Electronics" },
          { category_id: 2, category_name: "Gadgets" },
        ];
  
        // Mock Product.create to return the product instance
        (Product.create as jest.Mock).mockResolvedValue(mockProduct);
  
        // Mock Category.findAll to return mock categories
        (Category.findAll as jest.Mock).mockResolvedValue(mockCategories);
  
        // Mock Product.findByPk to return the product with categories
        (Product.findByPk as jest.Mock).mockResolvedValue({
          ...mockProduct,
          categories: mockCategories,
        });
  
        const result = await ProductService.createProduct({
          product_name: "Laptop",
          price: 1000,
          in_stock: 10,
          category_ids: [1, 2],
        });
  
        expect(result).toEqual({
          ...mockProduct,
          categories: mockCategories,
        });
        expect(Product.create).toHaveBeenCalledWith({
          product_name: "Laptop",
          price: 1000,
          in_stock: 10,
        });
        expect(Category.findAll).toHaveBeenCalledWith({
          where: { category_id: [1, 2] },
        });
        expect(mockProduct.addCategories).toHaveBeenCalledWith(mockCategories);
      });

    it("should throw an error if creation fails", async () => {
      (Product.create as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(
        ProductService.createProduct({
          product_name: "Laptop",
          price: 1000,
          in_stock: 10,
          category_ids: [1],
        })
      ).rejects.toThrow("Database error");
    });
  });

  // UPDATE PRODUCT
  describe("updateProduct", () => {
    it("should update a product and its categories successfully", async () => {
      const mockProduct = {
        product_id: "P001",
        product_name: "Old Laptop",
        save: jest.fn(),
        setCategories: jest.fn(),
      };
      const mockCategories = [{ category_id: 1, category_name: "Electronics" }];

      (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);
      (Category.findAll as jest.Mock).mockResolvedValue(mockCategories);
      (Product.findByPk as jest.Mock).mockResolvedValue({
        ...mockProduct,
        product_name: "Updated Laptop",
        categories: mockCategories,
      });

      const result = await ProductService.updateProduct("P001", {
        product_name: "Updated Laptop",
        category_ids: [1],
      });

      expect(result).toEqual({
        ...mockProduct,
        product_name: "Updated Laptop",
        categories: mockCategories,
      });
      expect(mockProduct.save).toHaveBeenCalled();
      expect(mockProduct.setCategories).toHaveBeenCalledWith(mockCategories);
    });

    it("should return null if the product does not exist", async () => {
      (Product.findByPk as jest.Mock).mockResolvedValue(null);

      const result = await ProductService.updateProduct("P999", { product_name: "Updated Laptop" });

      expect(result).toBeNull();
    });

    it("should throw an error if updating fails", async () => {
      (Product.findByPk as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(
        ProductService.updateProduct("P001", { product_name: "Updated Laptop" })
      ).rejects.toThrow("Database error");
    });
  });

  // DELETE PRODUCT
  describe("deleteProduct", () => {
    it("should delete a product successfully", async () => {
      const mockProduct = { destroy: jest.fn() };

      (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);

      const result = await ProductService.deleteProduct("P001");

      expect(result).toBe(true);
      expect(mockProduct.destroy).toHaveBeenCalled();
    });

    it("should return false if the product does not exist", async () => {
      (Product.findByPk as jest.Mock).mockResolvedValue(null);

      const result = await ProductService.deleteProduct("P999");

      expect(result).toBe(false);
    });

    it("should throw an error if deletion fails", async () => {
      (Product.findByPk as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(ProductService.deleteProduct("P001")).rejects.toThrow("Database error");
    });
  });
});
