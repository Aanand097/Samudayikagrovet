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
  category: "Agricultural" | "Veterinary";
  image: string;
  description: string;
  varieties: Variety[];
  createdAt: number;
}

export type Category = "All" | "Agricultural" | "Veterinary";
