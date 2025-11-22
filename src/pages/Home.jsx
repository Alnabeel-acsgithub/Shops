import { ArrowRight, Store } from 'lucide-react';
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
      <div className="home-page">
        <div className="hero-section">
          <div className="container">
            <div className="hero-content animate-fade-in">
              <div className="hero-badge">
                <Store size={20} />
                <span>Discover Amazing Shops</span>
              </div>
              <h1 className="hero-title">
                Welcome to <span className="gradient-text">Shop Directory</span>
              </h1>
              <p className="hero-description">
                Explore our curated collection of premium shops. Find the perfect products from trusted sellers.
              </p>
            </div>
          </div>
        </div>

        <div className="container">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading shops...</p>
            </div>
          ) : (
            <div className="shops-section">
              <div className="section-header">
                <h2>Featured Shops</h2>
                <p>{shops.length} shops available</p>
              </div>
              <div className="shops-grid">
                {shops.map((shop, index) => (
                  <Link 
                    to={`/${shop.slug}`} 
                    key={shop.id} 
                    className="shop-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="shop-card-header">
                      <div className="shop-card-logo" style={{ background: shop.theme_color }}>
                        <img src={shop.logo_url} alt={shop.name} />
                      </div>
                      <div className="shop-card-badge">
                        <span>Active</span>
                      </div>
                    </div>
                    <div className="shop-card-content">
                      <h3>{shop.name}</h3>
                      <p className="shop-contact">{shop.contact_info}</p>
                      {shop.phone_number && (
                        <p className="shop-phone">📞 {shop.phone_number}</p>
                      )}
                    </div>
                    <div className="shop-card-footer">
                      <span className="visit-link">
                        Visit Shop <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .home-page {
          min-height: 100vh;
        }

        .hero-section {
          background: var(--gradient-hero);
          padding: 5rem 0 6rem;
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.3;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.25rem;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: var(--radius-full);
          color: white;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 800;
          color: white;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .hero-title .gradient-text {
          background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        .shops-section {
          padding: 4rem 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .section-header p {
          color: var(--text-secondary);
          font-size: 1rem;
        }

        .shops-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 2rem;
          animation: fadeIn 0.6s ease-out;
        }

        @media (min-width: 640px) {
          .shops-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .shops-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .shop-card {
          background: var(--surface);
          border-radius: var(--radius-2xl);
          border: 1px solid var(--border);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeIn 0.6s ease-out both;
          position: relative;
        }

        .shop-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--gradient-primary);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .shop-card:hover::before {
          transform: scaleX(1);
        }

        .shop-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-2xl);
          border-color: transparent;
        }

        .shop-card-header {
          padding: 2rem 2rem 1rem;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .shop-card-logo {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-xl);
          overflow: hidden;
          flex-shrink: 0;
          box-shadow: var(--shadow-lg);
          border: 3px solid white;
        }

        .shop-card-logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .shop-card-badge {
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .shop-card-content {
          padding: 0 2rem 1.5rem;
          flex: 1;
        }

        .shop-card-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .shop-contact {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .shop-phone {
          font-size: 0.9rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .shop-card-footer {
          padding: 1.5rem 2rem;
          border-top: 1px solid var(--border);
          background: var(--background);
        }

        .visit-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: gap 0.3s ease;
        }

        .shop-card:hover .visit-link {
          gap: 0.75rem;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-description {
            font-size: 1rem;
          }

          .hero-section {
            padding: 3rem 0 4rem;
          }

          .shop-card-header,
          .shop-card-content,
          .shop-card-footer {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }
      `}</style>
    </Layout>
  );
}
