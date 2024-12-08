export interface ProductImage {
    image_url: string;
  }
  
  export interface ProductDetails {
    product_description: string;
    directions: string;
  }
  
  export interface Product {
    id: string;
    product_name: string;
    price: number;
    in_stock: number;
    category: { category_name: string };
    images: ProductImage[];
    details: ProductDetails;
  }