const generateId = () => crypto.randomUUID();
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Edit2, Trash2, LogOut, Package, Leaf, Stethoscope,
  X, Save, ImagePlus, ChevronDown, Search, LayoutDashboard,
  ShoppingBag, Tag
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/supabase";
import { Product, Variety } from "@/lib/types";
import AdminLogin from "@/components/AdminLogin";

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<"products" | "dashboard">("dashboard");
  const [search, setSearch] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

 useEffect(() => {
  if (loggedIn) {
    refresh();
  }
}, [loggedIn]);
const refresh = async () => {
  const { data } = await supabase.from("products").select("*");
  setProducts(data || []);
};
const handleLogout = () => {
  setLoggedIn(false);
  setUsername("");
  setPassword("");
};
const handleLogin = () => {
  if (
    username === "reejonbaruwal" &&
    password === "reejonbaruwal12345"
  ) {
    setLoggedIn(true);
  } else {
    alert("Invalid Username or Password");
  }
};

  const handleNew = () => {
    setEditing({
      id: "",
      name: "",
      category: "Agricultural",
      image: "",
      description: "",
      varieties: [{ id: generateId(), name: "", price: 0, stock: "In Stock" }],
      createdAt: 0,
    });
    setIsNew(true);
  };

  const handleEdit = (p: Product) => {
    setEditing({ ...p, varieties: p.varieties.map((v) => ({ ...v })) });
    setIsNew(false);
  };

  const handleDelete = async (id: string) => {
  if (confirm("Delete this product?")) {
    await supabase.from("products").delete().eq("id", id);
    refresh();
  }
};

  const handleSave = async (product: Product) => {
  if (isNew) {
    await supabase.from("products").insert([product]);
  } else {
    await supabase.from("products").update(product).eq("id", product.id);
  }

  setEditing(null);
  setIsNew(false);
  refresh();
};


  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: products.length,
    agri: products.filter((p) => p.category === "Agricultural").length,
    vet: products.filter((p) => p.category === "Veterinary").length,
    inStock: products.reduce((acc, p) => acc + p.varieties.filter((v) => v.stock === "In Stock").length, 0),
    outOfStock: products.reduce((acc, p) => acc + p.varieties.filter((v) => v.stock === "Out of Stock").length, 0),
  };

if (!loggedIn) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-80">
        <h2 className="text-xl font-bold text-center mb-4">
          Admin Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white py-2 rounded hover:opacity-90"
        >
          Login
        </button>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border hidden md:flex flex-col">
        <div className="p-5 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <span className="font-display font-bold text-sidebar-foreground text-lg">AgroVet</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          <button
            onClick={() => setSidebarTab("dashboard")}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              sidebarTab === "dashboard"
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </button>
          <button
            onClick={() => setSidebarTab("products")}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              sidebarTab === "products"
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
            }`}
          >
            <Package className="w-4 h-4" /> Products
          </button>
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="font-display font-bold">Admin</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setSidebarTab("dashboard")} className={`p-2 rounded-lg ${sidebarTab === "dashboard" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
              <LayoutDashboard className="w-4 h-4" />
            </button>
            <button onClick={() => setSidebarTab("products")} className={`p-2 rounded-lg ${sidebarTab === "products" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
              <Package className="w-4 h-4" />
            </button>
            <button onClick={handleLogout} className="p-2 rounded-lg bg-muted">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {sidebarTab === "dashboard" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-2xl font-display font-bold text-foreground mb-6">Dashboard</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard icon={<ShoppingBag />} label="Total Products" value={stats.total} color="primary" />
                <StatCard icon={<Leaf />} label="Agricultural" value={stats.agri} color="primary" />
                <StatCard icon={<Stethoscope />} label="Veterinary" value={stats.vet} color="accent" />
                <StatCard icon={<Tag />} label="In Stock Varieties" value={stats.inStock} color="primary" />
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <h2 className="font-display font-semibold text-lg mb-4">Recent Products</h2>
                <div className="space-y-3">
                  {products.slice(0, 5).map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.category} · {p.varieties.length} varieties</p>
                      </div>
                      <button onClick={() => { handleEdit(p); setSidebarTab("products"); }} className="text-primary text-sm font-medium hover:underline">
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {sidebarTab === "products" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h1 className="text-2xl font-display font-bold text-foreground">Products</h1>
                <button
                  onClick={handleNew}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm"
                >
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </div>

              {/* Search */}
              <div className="relative max-w-sm mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Products Table */}
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="text-left px-4 py-3 font-semibold text-foreground">Product</th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground hidden sm:table-cell">Category</th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground hidden md:table-cell">Varieties</th>
                        <th className="text-right px-4 py-3 font-semibold text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((p) => (
                        <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                                {p.image ? (
                                  <img src={p.image} alt="" className="w-full h-full object-cover" />
                                ) : p.category === "Agricultural" ? (
                                  <Leaf className="w-5 h-5 text-primary/50" />
                                ) : (
                                  <Stethoscope className="w-5 h-5 text-accent/70" />
                                )}
                              </div>
                              <span className="font-medium text-foreground">{p.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden sm:table-cell">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              p.category === "Agricultural" ? "bg-primary/10 text-primary" : "bg-accent/20 text-accent-foreground"
                            }`}>
                              {p.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{p.varieties.length}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <button onClick={() => handleEdit(p)} className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filtered.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">No products found</div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Edit Modal */}
      <AnimatePresence>
        {editing && (
          <ProductFormModal
            product={editing}
            isNew={isNew}
            onSave={handleSave}
            onClose={() => { setEditing(null); setIsNew(false); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) => (
  <div className="bg-card border border-border rounded-xl p-5">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
      color === "primary" ? "bg-primary/10 text-primary" : "bg-accent/20 text-accent-foreground"
    }`}>
      {icon}
    </div>
    <p className="text-2xl font-display font-bold text-foreground">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

interface ProductFormModalProps {
  product: Product;
  isNew: boolean;
  onSave: (p: Product) => void;
  onClose: () => void;
}

const ProductFormModal = ({ product, isNew, onSave, onClose }: ProductFormModalProps) => {
  const [form, setForm] = useState<Product>({ ...product });
  const fileRef = useRef<HTMLInputElement>(null);

  const updateField = (field: keyof Product, value: any) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => updateField("image", ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const addVariety = () => {
    setForm((f) => ({
      ...f,
      varieties: [...f.varieties, { id: generateId(), name: "", price: 0, stock: "In Stock" }],
    }));
  };

  const updateVariety = (index: number, field: keyof Variety, value: any) => {
    setForm((f) => {
      const v = [...f.varieties];
      v[index] = { ...v[index], [field]: value };
      return { ...f, varieties: v };
    });
  };

  const removeVariety = (index: number) => {
    if (form.varieties.length <= 1) return;
    setForm((f) => ({ ...f, varieties: f.varieties.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (form.varieties.some((v) => !v.name.trim())) return;
    onSave(form);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-foreground/50 flex items-start justify-center p-4 pt-12 overflow-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border border-border rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-auto"
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-xl font-display font-bold text-card-foreground">
            {isNew ? "Add Product" : "Edit Product"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Image */}
          <div className="flex items-start gap-4">
            <div
              onClick={() => fileRef.current?.click()}
              className="w-24 h-24 rounded-xl bg-muted border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors overflow-hidden shrink-0"
            >
              {form.image ? (
                <img src={form.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <ImagePlus className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <div className="flex-1 space-y-3">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-1">Product Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="e.g. Urea Fertilizer"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="Agricultural">Agricultural</option>
                  <option value="Veterinary">Veterinary</option>
                </select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              placeholder="Product description..."
            />
          </div>

          {/* Varieties */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-card-foreground">Varieties</label>
              <button type="button" onClick={addVariety} className="flex items-center gap-1 text-primary text-sm font-medium hover:underline">
                <Plus className="w-3 h-3" /> Add Variety
              </button>
            </div>
            <div className="space-y-3">
              {form.varieties.map((v, i) => (
                <div key={v.id} className="flex flex-wrap items-end gap-2 p-3 bg-muted/50 rounded-lg border border-border/50">
                  <div className="flex-1 min-w-[120px]">
                    <label className="block text-xs text-muted-foreground mb-1">Name</label>
                    <input
                      type="text"
                      value={v.name}
                      onChange={(e) => updateVariety(i, "name", e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-card border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="e.g. 5kg Pack"
                      required
                    />
                  </div>
                  <div className="w-24">
                    <label className="block text-xs text-muted-foreground mb-1">Price ($)</label>
                    <input
                      type="number"
                      min="0"
                      value={v.price}
                      onChange={(e) => updateVariety(i, "price", Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 bg-card border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      required
                    />
                  </div>
                  <div className="w-28">
                    <label className="block text-xs text-muted-foreground mb-1">Stock</label>
                    <select
                      value={v.stock}
                      onChange={(e) => updateVariety(i, "stock", e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-card border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>
                  <div className="w-24">
                    <label className="block text-xs text-muted-foreground mb-1">SKU</label>
                    <input
                      type="text"
                      value={v.sku || ""}
                      onChange={(e) => updateVariety(i, "sku", e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-card border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="Optional"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeVariety(i)}
                    disabled={form.varieties.length <= 1}
                    className="p-1.5 hover:bg-destructive/10 rounded-md transition-colors text-destructive disabled:opacity-30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-muted text-foreground font-medium rounded-lg hover:bg-muted/80 transition-colors text-sm">
              Cancel
            </button>
            <button type="submit" className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm">
              <Save className="w-4 h-4" /> {isNew ? "Add Product" : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
