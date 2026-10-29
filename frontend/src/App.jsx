
import { useEffect, useMemo, useState } from "react";
import { getProducts } from "./services/api";
import "./App.css";


const productImages = {
  "Laptop Lenovo IdeaPad": "/products/laptop-lenovo.jpg",
  "Mouse Logitech M185": "/products/mouse-logitech.jpg",
  "Teclado Redragon Kumara": "/products/teclado-redragon.jpg",
  "Monitor Samsung 24": "/products/monitor-samsung.jpg",
  "Audifonos JBL Tune 520BT": "/products/audifonos-jbl.jpg",
  "SSD Kingston 1TB": "/products/ssd-kingston.jpg",
  "Webcam Logitech C920": "/products/webcam-logitech.jpg",
  "Mouse Pad XL": "/products/mousepad-xl.jpg",
  "Hub USB-C 6 en 1": "/products/hub-usbc.jpg",
  "Parlante Bluetooth Sony": "/products/parlante-sony.jpg",
};


function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cloudshop-cart");
      const parsed = savedCart ? JSON.parse(savedCart) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

    function removeFromCart(id) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  function updateQuantity(id, change) {
    setCart((current) =>
      current
        .map((item) => {
          if (item.id !== id) return item;

          const quantity = Math.max(
            0,
            Math.min(item.quantity + change, Number(item.stock))
          );

          return { ...item, quantity };
        })
        .filter((item) => item.quantity > 0)
    );
  }
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const term = search.toLowerCase().trim();
      const price = Number(product.price);

      const matchesSearch =
        product.name.toLowerCase().includes(term) ||
        (product.description || "").toLowerCase().includes(term);

      let matchesPrice = true;

      if (priceFilter === "low") {
        matchesPrice = price < 100;
      } else if (priceFilter === "medium") {
        matchesPrice = price >= 100 && price <= 500;
      } else if (priceFilter === "high") {
        matchesPrice = price > 500;
      }

      return matchesSearch && matchesPrice;
    });
  }, [products, search, priceFilter]);


  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, item.stock),
              }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(Number(price));

  return (
    <div className="store">
      <div className="announcement">
        Tecnología para cada momento de tu día
      </div>

      <header className="navbar">
        <a className="brand" href="/">
          <span className="brand-icon">C</span>
          CloudShop <span className="brand-ai">AI</span>
        </a>

        <nav className="nav-links">
          <a href="#inicio">Inicio</a>
          <a href="#productos">Productos</a>
          <a href="#nosotros">Nosotros</a>
        </nav>

        <div className="nav-actions">
          <button
            className="cart-button"
            onClick={() => setShowCart(true)}
            aria-label="Abrir carrito"
          >
            🛒 Carrito <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero-section" id="inicio">
          <div className="hero-content">
            <span className="eyebrow">TU TIENDA DE TECNOLOGÍA</span>
            <h1>
              Descubre tecnología para
              <span> mejorar tu mundo.</span>
            </h1>
            <p>
              Explora dispositivos y accesorios tecnológicos en una
              experiencia de compra simple, moderna e inteligente.
            </p>
            <a href="#productos" className="primary-button">
              Explorar productos →
            </a>
          </div>

          <div className="hero-visual">
            <div className="hero-orb">
              <span>CloudShop</span>
              <strong>AI</strong>
              <small>TECH STORE</small>
            </div>
          </div>
        </section>

        <section className="benefits">
          <div>
            <span className="benefit-icon">✦</span>
            <strong>Selección tecnológica</strong>
            <small>Encuentra productos para tu día a día</small>
          </div>
          <div>
            <span className="benefit-icon">◈</span>
            <strong>Compra sencilla</strong>
            <small>Explora y compara fácilmente</small>
          </div>
          <div>
            <span className="benefit-icon">◎</span>
            <strong>Experiencia inteligente</strong>
            <small>Construida para evolucionar con IA</small>
          </div>
        </section>

        <section className="products-section" id="productos">
          <div className="section-heading">
            <div>
              <span className="eyebrow">NUESTRO CATÁLOGO</span>
              <h2>Productos destacados</h2>
              <p>Explora nuestra selección de tecnología.</p>
            </div>
            <span className="product-counter">
              {filteredProducts.length} productos
            </span>
          </div>

          <div className="search-bar">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Buscar productos..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          
          <div className="price-filters">
            <button
              className={priceFilter === "all" ? "active" : ""}
              onClick={() => setPriceFilter("all")}
            >
              Todos
            </button>

            <button
              className={priceFilter === "low" ? "active" : ""}
              onClick={() => setPriceFilter("low")}
            >
              Menos de S/ 100
            </button>

            <button
              className={priceFilter === "medium" ? "active" : ""}
              onClick={() => setPriceFilter("medium")}
            >
              S/ 100 - S/ 500
            </button>

            <button
              className={priceFilter === "high" ? "active" : ""}
              onClick={() => setPriceFilter("high")}
            >
              Más de S/ 500
            </button>
          </div>


          {loading && <p className="state-message">Cargando productos...</p>}

          {error && (
            <p className="state-message error">
              No pudimos cargar los productos: {error}
            </p>
          )}

          {!loading && !error && filteredProducts.length === 0 && (
            <p className="state-message">
              No encontramos productos con esa búsqueda.
            </p>
          )}

          {!loading && !error && (
            <div className="product-grid">
              {filteredProducts.map((product) => {
                const inCart = cart.find((item) => item.id === product.id);
                const available = Number(product.stock) > 0;
                const maxReached =
                  inCart && inCart.quantity >= Number(product.stock);

                return (
                  <article
                    className="product-card"
                    key={product.id}
                  >
                    
                    <div className="product-image">
                      {productImages[product.name] ? (
                        <img
                          src={productImages[product.name]}
                          alt={product.name}
                          className="product-photo"
                          loading="lazy"
                        />
                      ) : (
                        <span className="product-placeholder">⌘</span>
                      )}

                      <span className="product-label">TECH</span>
                    </div>
                    
                    <button
                      type="button"
                      className="product-view-button"
                      onClick={() => setSelectedProduct(product)}
                    >
                      Ver detalles
                    </button>  
                      
                    <div className="product-details">
                      <span className="product-category">Tecnología</span>
                      <h3>{product.name}</h3>
                      <p className="product-description">
                        {product.description || "Producto tecnológico"}
                      </p>

                      <div className="product-meta">
                        <strong>{formatPrice(product.price)}</strong>
                        <span>
                          {available
                            ? `${product.stock} disponibles`
                            : "Agotado"}
                        </span>
                      </div>

                      <button
                        className="add-button"
                        disabled={!available || maxReached}
                        onClick={() => addToCart(product)}
                      >
                        {!available
                          ? "Agotado"
                          : maxReached
                          ? "Stock máximo"
                          : "Agregar al carrito +"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className="about-section" id="nosotros">
          <div>
            <span className="eyebrow">SOBRE CLOUDSHOP AI</span>
            <h2>Compras más simples. Tecnología más cerca.</h2>
          </div>
          <p>
            CloudShop AI es una plataforma e-commerce que integra
            tecnologías modernas y está preparada para incorporar
            experiencias de inteligencia artificial.
          </p>
        </section>
      </main>

      <footer className="footer">
        <strong>CloudShop AI</strong>
        <span>© {new Date().getFullYear()} CloudShop AI.</span>
        <span>Construido con React, FastAPI y AWS.</span>
      </footer>

      
      {selectedProduct && (
        <div
          className="product-modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Detalles de ${selectedProduct.name}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="product-modal-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Cerrar detalles"
            >
              ✕
            </button>

            <div className="product-modal-image">
              {productImages[selectedProduct.name] ? (
                <img
                  src={productImages[selectedProduct.name]}
                  alt={selectedProduct.name}
                />
              ) : (
                <span className="product-placeholder">⌘</span>
              )}
            </div>

            <div className="product-modal-info">
              <span className="eyebrow">CLOUDSHOP AI · TECNOLOGÍA</span>

              <h2>{selectedProduct.name}</h2>

              <p>{selectedProduct.description}</p>

              <strong className="product-modal-price">
                {formatPrice(selectedProduct.price)}
              </strong>

              <p>
                {selectedProduct.stock > 0
                  ? `${selectedProduct.stock} unidades disponibles`
                  : "Producto agotado"}
              </p>

              <button
                type="button"
                className="primary-button"
                disabled={
                  Number(selectedProduct.stock) <= 0 ||
                  cart.find((item) => item.id === selectedProduct.id)
                    ?.quantity >= Number(selectedProduct.stock)
                }
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                  setShowCart(true);
                }}
              >
                Agregar al carrito +
              </button>
            </div>
          </div>
        </div>
      )}


      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <aside
            className="cart-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-header">
              <h2>Mi carrito ({cartCount})</h2>
              <button
                className="close-cart"
                onClick={() => setShowCart(false)}
                aria-label="Cerrar carrito"
              >
                ✕
              </button>
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                <p>Tu carrito está vacío.</p>
              ) : (
                cart.map((item) => (
                  
                  <div className="cart-item" key={item.id}>
                    <div className="cart-item-info">
                      <strong>{item.name}</strong>
                      <p>{formatPrice(item.price)} por unidad</p>

                      <div className="quantity-controls">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label={`Disminuir cantidad de ${item.name}`}
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          disabled={item.quantity >= Number(item.stock)}
                          aria-label={`Aumentar cantidad de ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-actions">
                      <strong>{formatPrice(Number(item.price) * item.quantity)}</strong>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>

                ))
              )}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total estimado</span>
                <strong>{formatPrice(cartTotal)}</strong>
              </div>
              <p>El proceso de pago estará disponible próximamente.</p>
              <button
                className="primary-button"
                onClick={() => setShowCart(false)}
              >
                Seguir comprando
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
