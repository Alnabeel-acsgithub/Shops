import { Image as ImageIcon, MessageSquare } from 'lucide-react';

export default function ProductCard({ product }) {
  return (
    <div className="card product-card">
      <div className="product-image">
        <img src={product.image_url} alt={product.name} loading="lazy" />
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">${product.price}</p>
        
        <div className="stock-info">
          <span className="stock-label">Stock:</span>
          <span className={`stock-value ${parseInt(product.stock) > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stock > 0 ? product.stock : 'Out of Stock'}
          </span>
        </div>

        <div className="product-actions">
          <button className="btn-icon-sm action-btn" title="Chat">
            <MessageSquare size={16} className="text-success" />
          </button>
          <button className="btn-icon-sm action-btn" title="View Details">
            <ImageIcon size={16} className="text-primary" />
          </button>
        </div>
      </div>

      <style>{`
        .product-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 1rem;
          gap: 1rem;
        }

        .product-image {
          aspect-ratio: 1;
          background-color: #e2e8f0;
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-info {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex: 1;
        }

        .product-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .product-price {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--primary);
        }

        .stock-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          margin-top: auto;
        }

        .stock-label {
          color: var(--text-secondary);
        }

        .stock-value {
          font-weight: 600;
        }

        .in-stock { color: var(--success); }
        .out-of-stock { color: var(--danger); }

        .product-actions {
          display: flex;
          gap: 0.5rem;
          justify-content: flex-start;
          margin-top: 0.5rem;
        }

        .btn-icon-sm {
          padding: 0.4rem;
          border-radius: var(--radius-sm);
          border: none;
          background: #f1f5f9;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-icon-sm:hover {
          background: #e2e8f0;
        }

        .text-success { color: var(--success); }
        .text-primary { color: var(--primary); }
      `}</style>
    </div>
  );
}
