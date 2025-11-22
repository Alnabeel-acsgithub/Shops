import { MessageCircle, Package } from 'lucide-react';

export default function ProductCard({ product, shopPhone }) {
  const isInStock = product.stock && parseInt(product.stock) > 0;
  
  return (
    <div className="card product-card">
      <div className="product-image-wrapper">
        <div className="product-image">
          <img src={product.image_url} alt={product.name} loading="lazy" />
          <div className="product-overlay">
            <div className="overlay-content">
              <Package size={32} />
            </div>
          </div>
        </div>
        {!isInStock && (
          <div className="out-of-stock-badge">Out of Stock</div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-price-row">
          <p className="product-price">₹{product.price}</p>
          <div className={`stock-badge ${isInStock ? 'in-stock' : 'out-of-stock'}`}>
            <span className="stock-dot"></span>
            {isInStock ? `${product.stock} in stock` : 'Out of Stock'}
          </div>
        </div>
        
        <a 
          href={`https://wa.me/${shopPhone}?text=${encodeURIComponent(
            `Hello! I'm interested in:\n\nProduct ID: ${product.id}\nProduct: ${product.name}\nPrice: ₹${product.price}\nStock: ${product.stock > 0 ? product.stock : 'Out of Stock'}\n\nIs this available?`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
          title="Inquire on WhatsApp"
        >
          <MessageCircle size={18} />
          <span>WhatsApp Inquiry</span>
        </a>
      </div>

      <style>{`
        .product-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 0;
          gap: 0;
          background: var(--surface);
          position: relative;
        }

        .product-image-wrapper {
          position: relative;
          overflow: hidden;
        }

        .product-image {
          aspect-ratio: 1;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 0;
          overflow: hidden;
          position: relative;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .product-card:hover .product-image img {
          transform: scale(1.1);
        }

        .product-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .product-card:hover .product-overlay {
          opacity: 1;
        }

        .overlay-content {
          color: white;
          transform: translateY(20px);
          transition: transform 0.3s ease;
        }

        .product-card:hover .overlay-content {
          transform: translateY(0);
        }

        .out-of-stock-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(239, 68, 68, 0.95);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          backdrop-filter: blur(10px);
          box-shadow: var(--shadow-lg);
        }

        .product-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex: 1;
          padding: 1.5rem;
        }

        .product-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .product-price {
          font-size: 1.75rem;
          font-weight: 800;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stock-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.375rem 0.875rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .stock-badge.in-stock {
          background: rgba(34, 197, 94, 0.1);
          color: #16a34a;
          border: 1px solid rgba(34, 197, 94, 0.2);
        }

        .stock-badge.out-of-stock {
          background: rgba(239, 68, 68, 0.1);
          color: #dc2626;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .stock-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          animation: pulse 2s ease-in-out infinite;
        }

        .btn-whatsapp {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.625rem;
          padding: 0.875rem 1.25rem;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          color: white;
          border: none;
          border-radius: var(--radius-lg);
          font-size: 0.95rem;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
          margin-top: auto;
        }

        .btn-whatsapp:hover {
          background: linear-gradient(135deg, #128C7E 0%, #075E54 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(37, 211, 102, 0.4);
        }

        .btn-whatsapp:active {
          transform: translateY(0);
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .product-price {
            font-size: 1.5rem;
          }

          .product-title {
            font-size: 1rem;
          }

          .btn-whatsapp {
            font-size: 0.9rem;
            padding: 0.75rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}
