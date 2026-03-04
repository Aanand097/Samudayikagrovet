export interface Variety {
  id: string;
  name: string;
  price: number;
  stock: "In Stock" | "Out of Stock";
  sku?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export type Category = "All" | "Agricultural" | "Veterinary";
