import CategoryService from "../../services/CategoryService";
import Category from "../../models/Category";

jest.mock("../../models/Category");

describe("CategoryService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // CREATE CATEGORY
  describe("createCategory", () => {
    it("should create a category successfully", async () => {
      const mockCategory = { category_id: 1, category_name: "Electronics" };

      (Category.create as jest.Mock).mockResolvedValue(mockCategory);

      const result = await CategoryService.createCategory("Electronics");

      expect(result).toEqual(mockCategory);
      expect(Category.create).toHaveBeenCalledWith({ category_name: "Electronics" });
    });

    it("should throw an error if creation fails", async () => {
      (Category.create as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(CategoryService.createCategory("Electronics")).rejects.toThrow("Database error");
    });
  });

  // GET ALL CATEGORIES
  describe("getAllCategories", () => {
    it("should return all categories", async () => {
      const mockCategories = [
        { category_id: 1, category_name: "Electronics" },
        { category_id: 2, category_name: "Fashion" },
      ];

      (Category.findAll as jest.Mock).mockResolvedValue(mockCategories);

      const result = await CategoryService.getAllCategories();

      expect(result).toEqual(mockCategories);
      expect(Category.findAll).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if fetching categories fails", async () => {
      (Category.findAll as jest.Mock).mockRejectedValue(new Error("Service error"));

      await expect(CategoryService.getAllCategories()).rejects.toThrow("Service error");
    });
  });

  // GET CATEGORY BY ID
  describe("getCategoryById", () => {
    it("should return a category by ID", async () => {
      const mockCategory = { category_id: 1, category_name: "Electronics" };

      (Category.findByPk as jest.Mock).mockResolvedValue(mockCategory);

      const result = await CategoryService.getCategoryById("1");

      expect(result).toEqual(mockCategory);
      expect(Category.findByPk).toHaveBeenCalledWith("1");
    });

    it("should return null if the category does not exist", async () => {
      (Category.findByPk as jest.Mock).mockResolvedValue(null);

      const result = await CategoryService.getCategoryById("999");

      expect(result).toBeNull();
      expect(Category.findByPk).toHaveBeenCalledWith("999");
    });

    it("should throw an error if fetching by ID fails", async () => {
      (Category.findByPk as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(CategoryService.getCategoryById("1")).rejects.toThrow("Database error");
    });
  });

  // UPDATE CATEGORY
  describe("updateCategory", () => {
    it("should update a category successfully", async () => {
      const mockCategory = {
        category_id: 1,
        category_name: "Old Name",
        save: jest.fn().mockResolvedValue(true),
      };

      (Category.findByPk as jest.Mock).mockResolvedValue(mockCategory);

      const result = await CategoryService.updateCategory("1", "Updated Name");

      expect(result).toEqual({ ...mockCategory, category_name: "Updated Name" });
      expect(mockCategory.save).toHaveBeenCalled();
      expect(Category.findByPk).toHaveBeenCalledWith("1");
    });

    it("should return null if the category does not exist", async () => {
      (Category.findByPk as jest.Mock).mockResolvedValue(null);

      const result = await CategoryService.updateCategory("999", "Updated Name");

      expect(result).toBeNull();
      expect(Category.findByPk).toHaveBeenCalledWith("999");
    });

    it("should throw an error if updating fails", async () => {
      (Category.findByPk as jest.Mock).mockRejectedValue(new Error("Service error"));

      await expect(CategoryService.updateCategory("1", "Updated Name")).rejects.toThrow("Service error");
    });
  });

  // DELETE CATEGORY
  describe("deleteCategory", () => {
    it("should delete a category successfully", async () => {
      const mockCategory = { destroy: jest.fn() };

      (Category.findByPk as jest.Mock).mockResolvedValue(mockCategory);

      const result = await CategoryService.deleteCategory("1");

      expect(result).toBe(true);
      expect(mockCategory.destroy).toHaveBeenCalled();
      expect(Category.findByPk).toHaveBeenCalledWith("1");
    });

    it("should return false if the category does not exist", async () => {
      (Category.findByPk as jest.Mock).mockResolvedValue(null);

      const result = await CategoryService.deleteCategory("999");

      expect(result).toBe(false);
      expect(Category.findByPk).toHaveBeenCalledWith("999");
    });

    it("should throw an error if deleting fails", async () => {
      (Category.findByPk as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(CategoryService.deleteCategory("1")).rejects.toThrow("Database error");
    });
  });
});
