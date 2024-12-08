import request from "supertest";
import { app } from "../../index"; // Import the app
import Product from "../../models/Product";
import Category from "../../models/Category";
import ProductImage from "../../models/ProductImage";

jest.mock("../../models/Product");
jest.mock("../../models/Category");
jest.mock("../../models/ProductImage");

describe("ProductController - POST /api/products", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new product and associate categories", async () => {
    const requestData = {
      product_name: "Hair Repair Shampoo",
      price: 1899,
      in_stock: 310,
      category_ids: [21],
    };

    // Mock product instance with `addCategories` method
    const createdProduct = {
      product_id: "P001",
      product_name: "Hair Repair Shampoo",
      price: 1899,
      in_stock: 310,
      createdAt: new Date("2024-12-07T10:11:24.000Z"),
      updatedAt: new Date("2024-12-07T10:11:24.000Z"),
      addCategories: jest.fn(), // Mock the addCategories method
    };

    const mockCategories = [{ category_id: 21, category_name: "Hair" }];

    // Mock `Product.create` to resolve with the created product instance
    (Product.create as jest.Mock).mockResolvedValue(createdProduct);

    // Mock `Category.findAll` to resolve with categories
    (Category.findAll as jest.Mock).mockResolvedValue(mockCategories);

    // Mock `Product.findByPk` to include the categories in the response
    (Product.findByPk as jest.Mock).mockResolvedValue({
      ...createdProduct,
      categories: mockCategories,
    });

    const response = await request(app).post("/api/products").send(requestData);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      product_id: "P001",
      product_name: "Hair Repair Shampoo",
      price: 1899,
      in_stock: 310,
      createdAt: "2024-12-07T10:11:24.000Z",
      updatedAt: "2024-12-07T10:11:24.000Z",
      categories: mockCategories,
    });

    // Verify mocks
    expect(Product.create).toHaveBeenCalledWith({
      product_name: "Hair Repair Shampoo",
      price: 1899,
      in_stock: 310,
    });
    expect(Category.findAll).toHaveBeenCalledWith({
      where: { category_id: requestData.category_ids },
    });
    expect(createdProduct.addCategories).toHaveBeenCalledWith(mockCategories);
  });

  it("should return 400 if required fields are missing", async () => {
    const response = await request(app).post("/api/products").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Missing required fields.");
    expect(Product.create).not.toHaveBeenCalled();
  });

  it("should return 500 if there is a server error", async () => {
    (Product.create as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    const response = await request(app).post("/api/products").send({
      product_name: "Hair Repair Shampoo",
      price: 1899,
      in_stock: 310,
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Database error");
  });
});

describe("ProductController - GET /api/products", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all products with pagination", async () => {
    const products = [
      { product_id: "P001", product_name: "Laptop", price: 1500, in_stock: 10 },
      { product_id: "P002", product_name: "Phone", price: 800, in_stock: 20 },
    ];

    (Product.findAndCountAll as jest.Mock).mockResolvedValue({
      count: 2,
      rows: products,
    });

    const response = await request(app).get("/api/products?page=1&limit=10");

    expect(response.status).toBe(200);
    expect(response.body.products).toEqual(products);
    expect(Product.findAndCountAll).toHaveBeenCalled();
  });

  it("should return 500 if there is a server error", async () => {
    (Product.findAndCountAll as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    const response = await request(app).get("/api/products");

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Database error");
  });
});

describe("ProductController - GET /api/products/:id/details", () => {
  it("should return product details by ID", async () => {
    const productDetails = {
      product_id: "P001",
      product_name: "Laptop",
      price: 1500,
      in_stock: 10,
      categories: [{ category_name: "Electronics" }],
      images: [{ image_url: "/uploads/images/laptop.jpg" }],
    };

    (Product.findByPk as jest.Mock).mockResolvedValue(productDetails);

    const response = await request(app).get("/api/products/P001/details");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(productDetails);
  });

  it("should return 404 if the product does not exist", async () => {
    (Product.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get("/api/products/P999/details");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Product not found.");
  });
});

describe("ProductController - PUT /api/products/:id", () => {
  it("should update a product", async () => {
    const requestData = { product_name: "Updated Laptop", price: 1700 };
    const mockProduct = {
      product_id: "P001",
      product_name: "Old Laptop",
      save: jest.fn().mockResolvedValue({ product_id: "P001", ...requestData }),
    };

    (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);

    const response = await request(app)
      .put("/api/products/P001")
      .send(requestData);

    expect(response.status).toBe(200);
    expect(response.body.product_name).toBe("Updated Laptop");
    expect(mockProduct.save).toHaveBeenCalled();
  });

  it("should return 404 if the product does not exist", async () => {
    (Product.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app).put("/api/products/P999");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Product not found.");
  });
});

describe("ProductController - DELETE /api/products/:id", () => {
  it("should delete a product", async () => {
    const mockProduct = { destroy: jest.fn() };

    (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);

    const response = await request(app).delete("/api/products/P001");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Product deleted successfully.");
    expect(mockProduct.destroy).toHaveBeenCalled();
  });

  it("should return 404 if the product does not exist", async () => {
    (Product.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app).delete("/api/products/P999");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Product not found.");
  });
});
