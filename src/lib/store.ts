import { Product, Variety } from "./types";

const PRODUCTS_KEY = "agrovet_products";
const ADMIN_KEY = "agrovet_admin";

// Default admin credentials
const DEFAULT_ADMIN = { username: "admin", password: "admin123" };

// Seed data
const SEED_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Urea Fertilizer",
    category: "Agricultural",
    image: "",
    description: "High-quality nitrogen fertilizer for enhanced crop growth and yield. Ideal for all soil types and major crops.",
    varieties: [
      { id: "v1", name: "1kg Pack", price: 150, stock: "In Stock", sku: "UF-1KG" },
      { id: "v2", name: "5kg Pack", price: 650, stock: "In Stock", sku: "UF-5KG" },
      { id: "v3", name: "10kg Bag", price: 1200, stock: "In Stock", sku: "UF-10KG" },
      { id: "v4", name: "50kg Bag", price: 5500, stock: "Out of Stock", sku: "UF-50KG" },
    ],
    createdAt: Date.now(),
  },
  {
    id: "p2",
    name: "Organic Compost",
    category: "Agricultural",
    image: "",
    description: "100% organic compost made from decomposed plant matter. Enriches soil with essential nutrients naturally.",
    varieties: [
      { id: "v5", name: "5kg Bag", price: 300, stock: "In Stock" },
      { id: "v6", name: "25kg Bag", price: 1200, stock: "In Stock" },
      { id: "v7", name: "50kg Bag", price: 2000, stock: "In Stock" },
    ],
    createdAt: Date.now() - 1000,
  },
  {
    id: "p3",
    name: "Cattle Dewormer",
    category: "Veterinary",
    image: "",
    description: "Broad-spectrum deworming solution for cattle. Effective against all major internal parasites.",
    varieties: [
      { id: "v8", name: "100ml Bottle", price: 450, stock: "In Stock", sku: "CD-100" },
      { id: "v9", name: "500ml Bottle", price: 1800, stock: "In Stock", sku: "CD-500" },
      { id: "v10", name: "1 Liter", price: 3200, stock: "Out of Stock", sku: "CD-1L" },
    ],
    createdAt: Date.now() - 2000,
  },
  {
    id: "p4",
    name: "Poultry Vitamins",
    category: "Veterinary",
    image: "",
    description: "Complete vitamin supplement for poultry health. Boosts egg production and improves immunity.",
    varieties: [
      { id: "v11", name: "100g Sachet", price: 250, stock: "In Stock" },
      { id: "v12", name: "500g Pack", price: 1000, stock: "In Stock" },
      { id: "v13", name: "1kg Pack", price: 1800, stock: "In Stock" },
    ],
    createdAt: Date.now() - 3000,
  },
  {
    id: "p5",
    name: "Hybrid Maize Seeds",
    category: "Agricultural",
    image: "",
    description: "High-yield hybrid maize seeds resistant to common diseases. Suitable for all agro-ecological zones.",
    varieties: [
      { id: "v14", name: "1kg Pack", price: 350, stock: "In Stock" },
      { id: "v15", name: "2kg Pack", price: 650, stock: "In Stock" },
      { id: "v16", name: "10kg Bag", price: 3000, stock: "In Stock" },
    ],
    createdAt: Date.now() - 4000,
  },
  {
    id: "p6",
    name: "Tick & Flea Spray",
    category: "Veterinary",
    image: "",
    description: "Fast-acting spray for ticks and fleas. Safe for use on cattle, goats, sheep, and dogs.",
    varieties: [
      { id: "v17", name: "250ml Spray", price: 500, stock: "In Stock" },
      { id: "v18", name: "1 Liter Refill", price: 1500, stock: "In Stock" },
    ],
    createdAt: Date.now() - 5000,
  },
];

export function getProducts(): Product[] {
  const data = localStorage.getItem(PRODUCTS_KEY);
  if (!data) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(SEED_PRODUCTS));
    return SEED_PRODUCTS;
  }
  return JSON.parse(data);
}

export function saveProducts(products: Product[]) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function addProduct(product: Omit<Product, "id" | "createdAt">): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: "p" + Date.now(),
    createdAt: Date.now(),
  };
  products.unshift(newProduct);
  saveProducts(products);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...updates };
  saveProducts(products);
  return products[index];
}

export function deleteProduct(id: string) {
  const products = getProducts().filter((p) => p.id !== id);
  saveProducts(products);
}

export function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

// Admin auth
export function adminLogin(username: string, password: string): boolean {
  return username === DEFAULT_ADMIN.username && password === DEFAULT_ADMIN.password;
}

export function isAdminLoggedIn(): boolean {
  return localStorage.getItem(ADMIN_KEY) === "true";
}

export function setAdminLoggedIn(value: boolean) {
  if (value) localStorage.setItem(ADMIN_KEY, "true");
  else localStorage.removeItem(ADMIN_KEY);
}

// WhatsApp contact number (use country code without +, e.g. "9779807387193")
// change this value to match your own WhatsApp phone number.
const WHATSAPP_NUMBER = "9842026310";

export function buildWhatsAppUrl(productName: string, varietyName: string, price: number): string {
  const message = encodeURIComponent(
    `Hello, I want to buy ${productName} (${varietyName}). Price: $${price}. Please tell me availability.`
  );
  // when a number is provided the url format is: https://wa.me/<number>?text=<message>
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}
