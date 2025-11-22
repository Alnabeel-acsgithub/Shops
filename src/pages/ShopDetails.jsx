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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0);

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
      } catch (err) {
        console.error(err);
        setError('Failed to load shop data');
      } finally {
        setLoading(false);
      }
    };

    loadShopData();
  }, [slug]);

  const handleAddToCart = (product, quantity) => {
    console.log('Added to cart:', product.name, quantity);
    setCartCount(prev => prev + quantity);
    // TODO: Implement actual cart state
  };

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

      <div className="container main-section">
        <div className="toolbar">
          <h2>Our Products</h2>
          <div className="filters">
            <button className="filter-btn">
              Sort by Price <ChevronDown size={16} />
            </button>
            <button className="filter-btn">
              Sort by Date <ChevronDown size={16} />
            </button>
          </div>
        </div>

        <div className="product-grid">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      <style>{`
        .shop-header {
          background: var(--surface);
          padding: 1rem 0;
          border-bottom: 1px solid var(--border);
          margin-bottom: 2rem;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }

        .shop-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .shop-logo {
          width: 60px;
          height: 60px;
          border-radius: var(--radius-md);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .shop-logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .shop-details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .shop-details h1 {
          font-size: 1.25rem;
          margin: 0;
          color: var(--text-primary);
          font-weight: 700;
        }

        .shop-contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .contact-item .label {
          font-weight: 500;
          color: var(--text-primary);
        }

        .contact-item a {
          color: var(--primary);
          text-decoration: none;
        }

        .contact-item a:hover {
          text-decoration: underline;
        }

        .shop-meta {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .meta-btn {
          background: none;
          border: none;
          padding: 0;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          position: relative;
        }

        .meta-btn:hover, .meta-btn.active {
          color: var(--primary);
        }

        .meta-btn.active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--primary);
          border-radius: 2px;
        }

        .toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .toolbar h2 {
          font-size: 1.25rem;
          color: var(--text-primary);
        }

        .filters {
          display: flex;
          gap: 1rem;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 2rem;
        }

        @media (min-width: 640px) {
          .product-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (min-width: 768px) {
          .product-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (min-width: 1024px) {
          .product-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </Layout>
  );
}
