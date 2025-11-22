import { Home, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <div className="not-found-page">
        <div className="container">
          <div className="not-found-content">
            <div className="icon-wrapper">
              <Store size={80} strokeWidth={1.5} />
            </div>
            <h1>Shop Not Found</h1>
            <p className="message">
              The page you're looking for doesn't exist or the shop URL is invalid.
            </p>
            <p className="hint">
              Please make sure you have the correct shop link.
            </p>
            <Link to="/admin" className="home-button">
              <Home size={20} />
              <span>Go to Admin Dashboard</span>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .not-found-page {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 0;
        }

        .not-found-content {
          text-align: center;
          max-width: 500px;
          margin: 0 auto;
        }

        .icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 150px;
          height: 150px;
          background: var(--gradient-primary);
          border-radius: 50%;
          margin-bottom: 2rem;
          color: white;
          box-shadow: var(--shadow-2xl);
        }

        .not-found-content h1 {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .message {
          font-size: 1.125rem;
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
          line-height: 1.6;
        }

        .hint {
          font-size: 1rem;
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
          opacity: 0.8;
        }

        .home-button {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: var(--gradient-primary);
          color: white;
          text-decoration: none;
          border-radius: var(--radius-lg);
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: var(--shadow-lg);
        }

        .home-button:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-2xl);
        }

        .home-button:active {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .icon-wrapper {
            width: 120px;
            height: 120px;
          }

          .icon-wrapper svg {
            width: 60px;
            height: 60px;
          }

          .not-found-content h1 {
            font-size: 2rem;
          }

          .message {
            font-size: 1rem;
          }

          .hint {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </Layout>
  );
}
