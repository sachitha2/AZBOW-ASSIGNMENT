import request from "supertest";
import { app } from "../../index"; // Import the app
import Category from "../../models/Category"; // Mocked model

jest.mock("../../models/Category"); // Mock the Category model

describe("CategoryController - POST /api/categories", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("should create a new category when valid data is provided", async () => {
    const requestData = { category_name: "Electronics" };

    (Category.create as jest.Mock).mockResolvedValue({
      category_id: 1,
      category_name: "Electronics",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app)
      .post("/api/categories")
      .send(requestData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("category_id", 1);
    expect(response.body).toHaveProperty("category_name", "Electronics");
    expect(Category.create).toHaveBeenCalledWith(requestData);
  });

  it("should return 400 if category_name is missing", async () => {
    const requestData = {}; // Missing category_name

    const response = await request(app)
      .post("/api/categories")
      .send(requestData);

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Category name is required.",
          path: "category_name",
        }),
      ])
    );
    expect(Category.create).not.toHaveBeenCalled();
  });

  it("should return 500 if there is a server error", async () => {
    const requestData = { category_name: "Fashion" };

    (Category.create as jest.Mock).mockRejectedValue(new Error("Database error"));

    const response = await request(app)
      .post("/api/categories")
      .send(requestData);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "Database error");
    expect(Category.create).toHaveBeenCalledWith(requestData);
  });
});

describe("CategoryController - GET methods", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/categories", () => {
    it("should return all categories", async () => {
      const categories = [
        { category_id: 1, category_name: "Electronics" },
        { category_id: 2, category_name: "Fashion" },
      ];

      (Category.findAll as jest.Mock).mockResolvedValue(categories);

      const response = await request(app).get("/api/categories");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(categories);
      expect(Category.findAll).toHaveBeenCalledTimes(1);
    });

    it("should return 500 if there is a server error", async () => {
      (Category.findAll as jest.Mock).mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/api/categories");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Database error");
      expect(Category.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("GET /api/categories/:id", () => {
    it("should return a category by ID if it exists", async () => {
      const category = { category_id: 1, category_name: "Electronics" };

      (Category.findByPk as jest.Mock).mockResolvedValue(category);

      const response = await request(app).get("/api/categories/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(category);
      expect(Category.findByPk).toHaveBeenCalledWith(1);
    });

    it("should return 404 if the category does not exist", async () => {
      (Category.findByPk as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get("/api/categories/999");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Category not found.");
    });

    it("should return 500 if there is a server error", async () => {
      (Category.findByPk as jest.Mock).mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/api/categories/1");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Database error");
    });
  });
});

describe("CategoryController - DELETE /api/categories/:id", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a category when a valid ID is provided", async () => {
    const mockCategory = { destroy: jest.fn() };

    (Category.findByPk as jest.Mock).mockResolvedValue(mockCategory);

    const response = await request(app).delete("/api/categories/1");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Category deleted successfully.");
    expect(Category.findByPk).toHaveBeenCalledWith(1);
    expect(mockCategory.destroy).toHaveBeenCalledTimes(1);
  });

  it("should return 404 if the category does not exist", async () => {
    (Category.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app).delete("/api/categories/999");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Category not found.");
    expect(Category.findByPk).toHaveBeenCalledWith(999);
  });

  it("should return 500 if there is a server error", async () => {
    (Category.findByPk as jest.Mock).mockRejectedValue(new Error("Database error"));

    const response = await request(app).delete("/api/categories/1");

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "Database error");
  });
});

describe("CategoryController - PUT /api/categories/:id", () => {
    afterEach(() => {
      jest.clearAllMocks(); // Clear mocks after each test
    });
  
    it("should update a category when valid data is provided", async () => {
      const requestData = { category_name: "Updated Category" };
      const mockCategory = {
        category_id: 1,
        category_name: "Old Category",
        save: jest.fn().mockResolvedValue({ category_id: 1, ...requestData }),
      };
  
      // Mock the findByPk method to return the category
      (Category.findByPk as jest.Mock).mockResolvedValue(mockCategory);
  
      const response = await request(app)
        .put("/api/categories/1")
        .send(requestData);
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("category_id", 1);
      expect(response.body).toHaveProperty("category_name", "Updated Category");
      expect(Category.findByPk).toHaveBeenCalledWith(1);
      expect(mockCategory.save).toHaveBeenCalled();
    });
  
    it("should return 400 if category_name is missing", async () => {
      const requestData = {}; // Missing category_name
  
      const response = await request(app)
        .put("/api/categories/1")
        .send(requestData);
  
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            msg: "Category name is required.",
            path: "category_name",
          }),
        ])
      );
      expect(Category.findByPk).not.toHaveBeenCalled();
    });
  
    it("should return 404 if the category does not exist", async () => {
      const requestData = { category_name: "Updated Category" };
  
      // Mock the findByPk method to return null
      (Category.findByPk as jest.Mock).mockResolvedValue(null);
  
      const response = await request(app)
        .put("/api/categories/999")
        .send(requestData);
  
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Category not found.");
      expect(Category.findByPk).toHaveBeenCalledWith(999);
    });
  
    it("should return 500 if there is a server error", async () => {
      const requestData = { category_name: "Updated Category" };
  
      // Mock the findByPk method to throw an error
      (Category.findByPk as jest.Mock).mockRejectedValue(new Error("Database error"));
  
      const response = await request(app)
        .put("/api/categories/1")
        .send(requestData);
  
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Database error");
      expect(Category.findByPk).toHaveBeenCalledWith(1);
    });
  });
