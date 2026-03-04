import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Leaf, Stethoscope, MessageCircle, ShoppingBag, ChevronDown, Menu, X, Shield,
  ChevronLeft, ChevronRight, MapPin, Phone, Mail, Clock, Users, Award, Truck, Heart
} from "lucide-react";
import { Link } from "react-router-dom";
import { getProducts, buildWhatsAppUrl } from "@/lib/store";
import { Product, Category, Variety } from "@/lib/types";
import heroBg from "@/assets/hero-bg.jpg";
import heroVet from "@/assets/hero-vet.jpg";
import heroSeeds from "@/assets/hero-seeds.jpg";

/* ─── Navbar ─── */
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", href: "#home" },
    { label: "Products", href: "#products" },
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-card/95 backdrop-blur-lg shadow-md border-b border-border" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className={`text-xl font-display font-bold transition-colors ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
            Samudayik<span className="text-primary">agrovet</span>
          </span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={`font-medium transition-colors hover:text-primary ${scrolled ? "text-muted-foreground" : "text-primary-foreground/80 hover:text-primary-foreground"}`}>
              {l.label}
            </a>
          ))}
          <Link to="/admin" className={`flex items-center gap-1.5 font-medium transition-colors hover:text-primary ${scrolled ? "text-muted-foreground" : "text-primary-foreground/80"}`}>
            <Shield className="w-4 h-4" /> Admin
          </Link>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className={`md:hidden ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden bg-card border-b border-border overflow-hidden">
            <div className="px-4 py-3 flex flex-col gap-3">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-foreground hover:text-primary">{l.label}</a>
              ))}
              <Link to="/admin" onClick={() => setMobileOpen(false)} className="text-foreground hover:text-primary flex items-center gap-1.5">
                <Shield className="w-4 h-4" /> Admin Panel
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* ─── Hero Slider ─── */
const slides = [
  {
    image: heroBg,
    badge: "🌱 Your Trusted AgroVet Partner",
    title: "Quality Farm & Vet Supplies",
    subtitle: "Browse our wide range of agricultural and veterinary products. Select your preferred variety and chat to buy!",
    cta: "Browse Products",
    ctaHref: "#products",
  },
  {
    image: heroVet,
    badge: "🐄 Veterinary Excellence",
    title: "Premium Animal Healthcare",
    subtitle: "Dewormers, vitamins, sprays and more — everything your livestock and pets need to stay healthy and productive.",
    cta: "View Vet Products",
    ctaHref: "#products",
  },
  {
    image: heroSeeds,
    badge: "🌾 Grow Better, Harvest More",
    title: "Seeds, Fertilizers & More",
    subtitle: "High-yield hybrid seeds and organic fertilizers to maximize your farm's potential every season.",
    cta: "Shop Now",
    ctaHref: "#products",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="home" className="relative h-[520px] md:h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img src={slides[current].image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-foreground/20" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xl"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium mb-4 border border-primary/30">
              {slides[current].badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-4">
              {slides[current].title}
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-6 max-w-md">
              {slides[current].subtitle}
            </p>
            <a href={slides[current].ctaHref} className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
              <ShoppingBag className="w-5 h-5" /> {slides[current].cta}
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav arrows */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-card/30 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-card/50 transition-colors">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-card/30 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-card/50 transition-colors">
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-primary" : "w-2 bg-primary-foreground/40"}`}
          />
        ))}
      </div>
    </section>
  );
};

/* ─── Product Card (no price shown) ─── */
interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const [selectedVariety, setSelectedVariety] = useState<Variety>(product.varieties[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectVariety = (v: Variety) => {
    setSelectedVariety(v);
    setDropdownOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 bg-muted overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
            {product.category === "Agricultural" ? <Leaf className="w-16 h-16 text-primary/30" /> : <Stethoscope className="w-16 h-16 text-primary/30" />}
          </div>
        )}
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${product.category === "Agricultural" ? "bg-primary/90 text-primary-foreground" : "bg-accent/90 text-accent-foreground"}`}>
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-lg text-card-foreground mb-1">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2 flex-1">{product.description}</p>

        {/* Variety Selector */}
        <div className="relative mb-3">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between px-3 py-2.5 bg-muted rounded-lg text-sm font-medium text-foreground hover:bg-muted/80 transition-colors"
          >
            <span>{selectedVariety.name}</span>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${selectedVariety.stock === "In Stock" ? "bg-success" : "bg-destructive"}`} />
              <motion.div animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </div>
          </button>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5, scaleY: 0.95 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -5, scaleY: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute z-20 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg overflow-hidden"
              >
                {product.varieties.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => selectVariety(v)}
                    className={`w-full text-left px-3 py-2.5 text-sm hover:bg-muted transition-colors flex justify-between items-center ${v.id === selectedVariety.id ? "bg-primary/10 text-primary font-semibold" : "text-popover-foreground"}`}
                  >
                    <span>{v.name}</span>
                    <span className={`w-2 h-2 rounded-full ${v.stock === "In Stock" ? "bg-success" : "bg-destructive"}`} />
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stock status */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${selectedVariety.stock === "In Stock" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
            {selectedVariety.stock}
          </span>
          {selectedVariety.sku && <span className="text-xs text-muted-foreground">SKU: {selectedVariety.sku}</span>}
        </div>

        {/* WhatsApp Button */}
        <a
          href={buildWhatsAppUrl(product.name, selectedVariety.name, selectedVariety.price)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm"
        >
          <MessageCircle className="" /> Chat to Buy
        </a>
      </div>
    </motion.div>
  );
};

/* ─── About Us ─── */
const AboutSection = () => {
  const features = [
    { icon: <Award className="w-6 h-6" />, title: "10+ Years Experience", desc: "Serving farmers and animal owners with trusted, high-quality products." },
    { icon: <Truck className="w-6 h-6" />, title: "Good Quality", desc: "Authorized " },
    { icon: <Users className="w-6 h-6" />, title: "Expert Advice", desc: "Our trained staff provides guidance on product usage and dosage." },
    { icon: <Heart className="w-6 h-6" />, title: "Customer First", desc: "Your satisfaction and your animals' health are our top priorities." },
  ];

  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">About Us</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Why Choose AgroVet Shop?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We are a leading agricultural and veterinary supply store committed to empowering farmers, ranchers, and pet owners with premium products and expert knowledge.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                {f.icon}
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Developer Team */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-20 mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">Our Team</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Meet Our Developers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">The talented team behind AgroVet Shop — building modern solutions for agriculture and veterinary commerce.</p>
        </motion.div>
        <div className="flex justify-center gap-8">
          {[
  {
    name: "Aanand Kumar Mandal",
    role: "Lead Developer, UI/UX Designer, Backend Developer",
    image: "/images/aanand.jpg"
  },
  {
    name: "Reejon Baruwal",
    role: "Frontend Developer",
    image: "/images/reejon.jpeg"
  },
]
          .map((dev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="w-72 md:w-80 bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary group-hover:scale-110 transition-transform duration-300">
  <img
    src={dev.image}
    alt={dev.name}
    className="w-full h-full object-cover"
  />
</div>
              <h3 className="font-display font-semibold text-foreground text-lg">{dev.name}</h3>
              <p className="text-primary text-sm font-medium mt-1">{dev.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Contact Us ─── */
const ContactSection = () => {
  const info = [
    { icon: <MapPin className="w-5 h-5" />, label: "Address", value: "R597+6M2 Barahakshetra" },
    { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+977 9807387193, +977 9842026310" },
    { icon: <Mail className="w-5 h-5" />, label: "Email", value: "rameshbaruwal02@gmail.com" },
    { icon: <Clock className="w-5 h-5" />, label: "Hours", value: "Sun-Sat 6AM-6PM" },
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">Contact Us</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Have questions about our products? Need advice for your farm or animals? Reach out to us!</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-4">
            {info.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{item.label}</p>
                  <p className="text-muted-foreground text-sm">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={(e) => { e.preventDefault(); alert("Message sent! We'll get back to you soon."); }}
            className="bg-card border border-border rounded-xl p-6 space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
              <input type="text" required className="w-full px-3 py-2.5 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input type="email" required className="w-full px-3 py-2.5 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea required rows={4} className="w-full px-3 py-2.5 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm resize-none" placeholder="How can we help you?" />
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm">
              <Mail className="w-4 h-4" /> Send Message
            </button>
          </motion.form>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mt-10"
        >
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold text-foreground">Our Location</h3>
            </div>
            <iframe
  title="Barahakshetra AgroVet"
  src="https://www.google.com/maps?q=R597+6M2+Barahakshetra&output=embed"
  width="100%"
  height="350"
  style={{ border: 0 }}
  loading="lazy"
  className="w-full"
/>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Main Page ─── */
const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category>("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(getProducts());
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filtered = products.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const categories: { label: string; value: Category; icon: React.ReactNode }[] = [
    { label: "All Products", value: "All", icon: <ShoppingBag className="w-4 h-4" /> },
    { label: "Agricultural", value: "Agricultural", icon: <Leaf className="w-4 h-4" /> },
    { label: "Veterinary", value: "Veterinary", icon: <Stethoscope className="w-4 h-4" /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSlider />

      {/* Products */}
      <section id="products" className="container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">Our Products</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Browse Our Collection</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Find the right products for your farm and animals. Select a variety and chat with us to place your order.</p>
        </motion.div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button key={cat.value} onClick={() => setCategory(cat.value)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${category === cat.value ? "bg-primary text-primary-foreground shadow-md" : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"}`}>
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-6">Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}</p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </section>

      <AboutSection />
      <ContactSection />

      {/* Footer */}
      <footer className="bg-card border-t border-border py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-display font-bold text-foreground text-lg">Samudayikagrovet</span>
              </div>
              <p className="text-muted-foreground text-sm">Your one-stop shop for agricultural and veterinary products. Quality supplies for healthier farms and animals.</p>
            </div>
            <div>
              <h4 className="font-display font-semibold text-foreground mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2">
                <a href="#home" className="text-muted-foreground text-sm hover:text-primary transition-colors">Home</a>
                <a href="#products" className="text-muted-foreground text-sm hover:text-primary transition-colors">Products</a>
                <a href="#about" className="text-muted-foreground text-sm hover:text-primary transition-colors">About Us</a>
                <a href="#contact" className="text-muted-foreground text-sm hover:text-primary transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <h4 className="font-display font-semibold text-foreground mb-3">Contact Info</h4>
              <div className="flex flex-col gap-2 text-muted-foreground text-sm">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> R597+6M2 Barahakshetra</span>
                <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +977 9807387193, +977 9842026310</span>
                <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> rameshbaruwal02@gmail.com</span>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-6 text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} AgroVet Shop. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
