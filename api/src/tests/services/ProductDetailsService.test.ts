import ProductDetailsService from "../../services/ProductDetailsService";
import ProductDetails from "../../models/ProductDetails";
import Product from "../../models/Product";

jest.mock("../../models/ProductDetails");
jest.mock("../../models/Product");

describe("ProductDetailsService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllProductDetails", () => {
    it("should return all product details with associated products", async () => {
      const mockDetails = [
        {
          product_id: "P001",
          product_description: "Test description",
          directions: "Use once daily",
          product: { product_name: "Product 1", price: 100 },
        },
      ];

      (ProductDetails.findAll as jest.Mock).mockResolvedValue(mockDetails);

      const result = await ProductDetailsService.getAllProductDetails();

      expect(result).toEqual(mockDetails);
      expect(ProductDetails.findAll).toHaveBeenCalledWith({
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["product_name", "price"],
          },
        ],
      });
    });

    it("should return an empty array if no product details exist", async () => {
      (ProductDetails.findAll as jest.Mock).mockResolvedValue([]);

      const result = await ProductDetailsService.getAllProductDetails();

      expect(result).toEqual([]);
      expect(ProductDetails.findAll).toHaveBeenCalled();
    });
  });

  describe("getProductDetailsById", () => {
    it("should return product details for a given product ID", async () => {
      const mockDetail = {
        product_id: "P001",
        product_description: "Test description",
        directions: "Use once daily",
        product: { product_name: "Product 1", price: 100 },
      };

      (ProductDetails.findOne as jest.Mock).mockResolvedValue(mockDetail);

      const result = await ProductDetailsService.getProductDetailsById("P001");

      expect(result).toEqual(mockDetail);
      expect(ProductDetails.findOne).toHaveBeenCalledWith({
        where: { product_id: "P001" },
        include: [
          { model: Product, as: "product", attributes: ["product_name", "price"] },
        ],
      });
    });

    it("should return null if product details are not found", async () => {
      (ProductDetails.findOne as jest.Mock).mockResolvedValue(null);

      const result = await ProductDetailsService.getProductDetailsById("P999");

      expect(result).toBeNull();
      expect(ProductDetails.findOne).toHaveBeenCalled();
    });
  });

  describe("createProductDetails", () => {
    it("should create product details when the product exists", async () => {
      const mockProduct = { product_id: "P001" };
      const mockDetails = {
        product_id: "P001",
        product_description: "Test description",
        directions: "Use once daily",
      };

      (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);
      (ProductDetails.create as jest.Mock).mockResolvedValue(mockDetails);

      const result = await ProductDetailsService.createProductDetails({
        product_id: "P001",
        product_description: "Test description",
        directions: "Use once daily",
      });

      expect(result).toEqual(mockDetails);
      expect(Product.findByPk).toHaveBeenCalledWith("P001");
      expect(ProductDetails.create).toHaveBeenCalledWith({
        product_id: "P001",
        product_description: "Test description",
        directions: "Use once daily",
      });
    });

    it("should throw an error if the product does not exist", async () => {
      (Product.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(
        ProductDetailsService.createProductDetails({
          product_id: "P999",
          product_description: "Test description",
        })
      ).rejects.toThrow("Product not found.");

      expect(Product.findByPk).toHaveBeenCalledWith("P999");
      expect(ProductDetails.create).not.toHaveBeenCalled();
    });
  });

  describe("updateProductDetails", () => {
    it("should update product details when found", async () => {
      const mockDetail = {
        product_id: "P001",
        product_description: "Old description",
        directions: "Old directions",
        save: jest.fn().mockResolvedValue(true),
      };

      (ProductDetails.findOne as jest.Mock).mockResolvedValue(mockDetail);

      const result = await ProductDetailsService.updateProductDetails("P001", {
        product_description: "New description",
        directions: "New directions",
      });

      expect(result).toEqual(mockDetail);
      expect(mockDetail.product_description).toBe("New description");
      expect(mockDetail.directions).toBe("New directions");
      expect(mockDetail.save).toHaveBeenCalled();
    });

    it("should throw an error if product details are not found", async () => {
      (ProductDetails.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        ProductDetailsService.updateProductDetails("P999", {
          product_description: "New description",
        })
      ).rejects.toThrow("Product details not found.");

      expect(ProductDetails.findOne).toHaveBeenCalledWith({
        where: { product_id: "P999" },
      });
    });
  });

  describe("deleteProductDetails", () => {
    it("should delete product details when found", async () => {
      const mockDetail = {
        destroy: jest.fn().mockResolvedValue(true),
      };

      (ProductDetails.findOne as jest.Mock).mockResolvedValue(mockDetail);

      const result = await ProductDetailsService.deleteProductDetails("P001");

      expect(result).toBe(true);
      expect(ProductDetails.findOne).toHaveBeenCalledWith({
        where: { product_id: "P001" },
      });
      expect(mockDetail.destroy).toHaveBeenCalled();
    });

    it("should throw an error if product details are not found", async () => {
      (ProductDetails.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        ProductDetailsService.deleteProductDetails("P999")
      ).rejects.toThrow("Product details not found.");

      expect(ProductDetails.findOne).toHaveBeenCalledWith({
        where: { product_id: "P999" },
      });
    });
  });
});
