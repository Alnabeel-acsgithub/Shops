import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { getShopProducts, getShops } from '../services/googleSheets';

export default function ShopDetails() {
  const { slug } = useParams();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortType, setSortType] = useState('price-low-high'); // 'price-low-high', 'price-high-low', 'alphabetical-a-z', 'alphabetical-z-a'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  // Handle sorting
  const handleSort = (type, productsToSort = null) => {
    setSortType(type);
    const productsList = productsToSort || products;
    const sorted = [...productsList].sort((a, b) => {
      if (type === 'price-low-high') {
        // Sort by price (low to high)
        const priceA = parseFloat(a.price) || 0;
        const priceB = parseFloat(b.price) || 0;
        if (priceA !== priceB) {
          return priceA - priceB;
        }
        // If prices are equal, sort alphabetically
        return (a.name || '').localeCompare(b.name || '');
      } else if (type === 'price-high-low') {
        // Sort by price (high to low)
        const priceA = parseFloat(a.price) || 0;
        const priceB = parseFloat(b.price) || 0;
        if (priceA !== priceB) {
          return priceB - priceA;
        }
        // If prices are equal, sort alphabetically
        return (a.name || '').localeCompare(b.name || '');
      } else if (type === 'alphabetical-a-z') {
        // Sort alphabetically by name (A-Z)
        return (a.name || '').localeCompare(b.name || '');
      } else if (type === 'alphabetical-z-a') {
        // Sort alphabetically by name (Z-A)
        return (b.name || '').localeCompare(a.name || '');
      }
      return 0;
    });
    setSortedProducts(sorted);
  };

  const handleAddToCart = (product, quantity) => {
    console.log('Added to cart:', product.name, quantity);
    setCartCount(prev => prev + quantity);
    // TODO: Implement actual cart state
  };

  useEffect(() => {
    const loadShopData = async () => {
      try {
        setLoading(true);
        // 1. Fetch all shops to find the current one by slug
        const shops = await getShops();
        const currentShop = shops.find(s => s.slug === slug);
        
        if (!currentShop) {
          setError('Shop not found');
          return;
        }
        
        setShop(currentShop);

        // 2. Fetch products for this shop
        const shopProducts = await getShopProducts(currentShop.product_sheet_id);
        setProducts(shopProducts);
        // Apply default sort (by price low to high)
        handleSort('price-low-high', shopProducts);
      } catch (err) {
        console.error(err);
        setError('Failed to load shop data');
      } finally {
        setLoading(false);
      }
    };

    loadShopData();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="container loading-state">
          <div className="spinner"></div>
          <p>Loading shop details...</p>
        </div>
        <style>{`
          .loading-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 50vh;
            gap: 1rem;
            color: var(--text-secondary);
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid var(--border);
            border-top-color: var(--primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </Layout>
    );
  }

  if (error || !shop) {
    return (
      <Layout>
        <div className="container error-state">
          <h2>Oops!</h2>
          <p>{error || 'Shop not found'}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout cartCount={cartCount} pageTitle={shop?.name}>
      <div className="shop-header">
        <div className="container">
          <div className="shop-info">
            <div className="shop-logo" style={{ backgroundColor: shop.theme_color }}>
              <img src={shop.logo_url} alt={shop.name} />
            </div>
            <div className="shop-details">
              <h1>{shop.name}</h1>
              <div className="shop-contact-info">
                <div className="contact-item">
                  <span className="label">Email:</span>
                  <a href={`mailto:${shop.contact_info}`}>{shop.contact_info}</a>
                </div>
                {shop.phone_number && (
                  <div className="contact-item">
                    <span className="label">Contact:</span>
                    <span>{shop.phone_number}</span> 
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-wrapper">
        {/* Decorative Background Elements */}
        <div className="decorative-bg">
          <div className="decoration-left">
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
          </div>
          <div className="decoration-right">
            <div className="floating-shape shape-4"></div>
            <div className="floating-shape shape-5"></div>
            <div className="floating-shape shape-6"></div>
          </div>
        </div>

        <div className="container main-section">
          <div className="toolbar">
            <h2>Our Products</h2>
            <div className="filters">
              <div className="sort-dropdown">
                <select 
                  className="sort-select"
                  value={sortType}
                  onChange={(e) => handleSort(e.target.value)}
                >
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="alphabetical-a-z">Alphabetical: A-Z</option>
                  <option value="alphabetical-z-a">Alphabetical: Z-A</option>
                </select>
                <ChevronDown size={16} className="sort-icon" />
              </div>
            </div>
          </div>

          <div className="product-grid">
            {sortedProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                shopPhone={shop.phone_number}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .page-wrapper {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
        }

        .decorative-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 0;
        }

        .decoration-left,
        .decoration-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 20%;
          max-width: 300px;
        }

        .decoration-left {
          left: 0;
          background: linear-gradient(to right, rgba(102, 126, 234, 0.03) 0%, transparent 100%);
        }

        .decoration-right {
          right: 0;
          background: linear-gradient(to left, rgba(118, 75, 162, 0.03) 0%, transparent 100%);
        }

        .floating-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.4;
          animation: float 20s ease-in-out infinite;
        }

        /* Left side shapes */
        .shape-1 {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          top: 10%;
          left: 5%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          top: 50%;
          left: 10%;
          animation-delay: 5s;
        }

        .shape-3 {
          width: 180px;
          height: 180px;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          top: 80%;
          left: 3%;
          animation-delay: 10s;
        }

        /* Right side shapes */
        .shape-4 {
          width: 220px;
          height: 220px;
          background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
          top: 15%;
          right: 5%;
          animation-delay: 2s;
        }

        .shape-5 {
          width: 160px;
          height: 160px;
          background: linear-gradient(135deg, #30cfd0 0%, #330867 100%);
          top: 55%;
          right: 8%;
          animation-delay: 7s;
        }

        .shape-6 {
          width: 190px;
          height: 190px;
          background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
          top: 85%;
          right: 4%;
          animation-delay: 12s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-30px) rotate(5deg);
          }
          50% {
            transform: translateY(-60px) rotate(-5deg);
          }
          75% {
            transform: translateY(-30px) rotate(3deg);
          }
        }

        .main-section {
          position: relative;
          z-index: 1;
        }

        .shop-header {
          background: var(--gradient-hero);
          padding: 2rem 0;
          border-bottom: none;
          margin-bottom: 0;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: var(--shadow-xl);
        }

        .shop-info {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .shop-logo {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-xl);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-2xl);
          border: 4px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .shop-logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .shop-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        .shop-details h1 {
          font-size: 1.75rem;
          margin: 0;
          color: white;
          font-weight: 800;
          letter-spacing: -0.01em;
        }

        .shop-contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }

        .contact-item .label {
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
        }

        .contact-item a {
          color: white;
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .contact-item a:hover {
          opacity: 0.8;
        }

        .main-section {
          padding: 3rem 0;
        }

        .toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .toolbar h2 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .filters {
          display: flex;
          gap: 1rem;
        }

        .sort-dropdown {
          position: relative;
          display: inline-block;
        }

        .sort-select {
          appearance: none;
          padding: 0.75rem 3rem 0.75rem 1.25rem;
          background: var(--surface);
          border: 2px solid var(--border);
          border-radius: var(--radius-lg);
          color: var(--text-primary);
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          min-width: 200px;
          box-shadow: var(--shadow-sm);
        }

        .sort-select:hover {
          background: var(--surface);
          border-color: var(--primary);
          box-shadow: var(--shadow-md);
        }

        .sort-select:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
        }

        .sort-icon {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: var(--text-secondary);
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 2.5rem;
          animation: fadeIn 0.6s ease-out;
        }

        @media (min-width: 640px) {
          .product-grid { 
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }

        @media (min-width: 768px) {
          .product-grid { 
            grid-template-columns: repeat(3, 1fr); 
          }
        }

        @media (min-width: 1024px) {
          .product-grid { 
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (min-width: 1280px) {
          .product-grid { 
            grid-template-columns: repeat(4, 1fr);
            gap: 2.5rem;
          }
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .shop-header {
            padding: 1.5rem 0;
          }

          .shop-logo {
            width: 60px;
            height: 60px;
          }

          .shop-details h1 {
            font-size: 1.25rem;
          }

          .shop-contact-info {
            font-size: 0.85rem;
          }

          .toolbar {
            flex-direction: column;
            align-items: flex-start;
          }

          .toolbar h2 {
            font-size: 1.5rem;
          }

          .sort-select {
            width: 100%;
            min-width: auto;
          }

          /* Hide decorative elements on mobile */
          .decorative-bg {
            display: none;
          }
        }

        /* Hide decorative elements on tablets too */
        @media (max-width: 1024px) {
          .decoration-left,
          .decoration-right {
            opacity: 0.3;
          }

          .floating-shape {
            filter: blur(60px);
          }
        }
      `}</style>
    </Layout>
  );
}
