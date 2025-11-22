import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getShops } from '../services/googleSheets';

export default function Home() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getShops().then(data => {
      setShops(data);
      setLoading(false);
    });
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="hero-section">
          <h1>Welcome to Shop Directory</h1>
          <p>Discover amazing products from our curated shops.</p>
        </div>

        {loading ? (
          <p>Loading shops...</p>
        ) : (
          <div className="shops-grid">
            {shops.map(shop => (
              <Link to={`/${shop.slug}`} key={shop.id} className="shop-card">
                <div className="shop-card-logo" style={{ backgroundColor: shop.theme_color }}>
                  <img src={shop.logo_url} alt={shop.name} />
                </div>
                <div className="shop-card-content">
                  <h3>{shop.name}</h3>
                  <p>{shop.contact_info}</p>
                  <span className="visit-link">
                    Visit Shop <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .hero-section {
          text-align: center;
          padding: 4rem 0;
        }

        .hero-section h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .hero-section p {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }

        .shops-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          padding-bottom: 4rem;
        }

        .shop-card {
          background: var(--surface);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 1.5rem;
          gap: 1.5rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .shop-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .shop-card-logo {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-md);
          overflow: hidden;
          flex-shrink: 0;
        }

        .shop-card-logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .shop-card-content {
          flex: 1;
        }

        .shop-card-content h3 {
          font-size: 1.2rem;
          margin-bottom: 0.25rem;
          color: var(--text-primary);
        }

        .shop-card-content p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .visit-link {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--primary);
        }
      `}</style>
    </Layout>
  );
}
