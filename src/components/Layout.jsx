import { Link } from 'react-router-dom';

export default function Layout({ children, cartCount = 0, pageTitle }) {
  return (
    <div className="app-layout">
        <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-links">
            <Link to="#">About</Link>
            <Link to="#">Contact</Link>
            <Link to="#">FAQ</Link>
            <Link to="#">Terms of Service</Link>
          </div>
          <p className="copyright">© 2024 Shop Details. All Rights Reserved.</p>
        </div>
      </footer>

      <style>{`
        .app-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        
        .header {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--text-primary);
        }

        .text-primary { color: var(--primary); }

        .nav-links {
          display: flex;
          gap: 2rem;
          display: none; /* Hidden on mobile by default */
        }

        @media (min-width: 768px) {
          .nav-links { display: flex; }
        }

        .nav-links a {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: color 0.2s;
        }

        .nav-links a:hover {
          color: var(--primary);
        }

        .header-actions {
          display: flex;
          gap: 0.75rem;
        }

        .relative { position: relative; }

        .badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: var(--primary);
          color: white;
          font-size: 0.7rem;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .main-content {
          flex: 1;
          background: var(--background);
        }

        .footer {
          background: var(--background);
          padding: 3rem 0;
          text-align: center;
          border-top: 1px solid var(--border);
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 1.5rem;
        }

        .footer-links a {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .copyright {
          color: var(--text-secondary);
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
}
