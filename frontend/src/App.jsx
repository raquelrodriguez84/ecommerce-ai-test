import React, { useState, useEffect } from "react";
import "./App.css";
import allProducts from './data/products.json';



function Star({ filled }) {
  return (
    <svg
      className="star"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "#FFC107" : "none"}
      stroke="#FFC107"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ProductCard({ product }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(product.rating));

  return (
    <div className="card">
      <h2 className="name">{product.name}</h2>
      <p className="price">${product.price.toFixed(2)}</p>
      <div className="rating">
        {stars.map((filled, i) => (
          <Star key={i} filled={filled} />
        ))}
        <span className="ratingNumber">{product.rating.toFixed(1)}</span>
      </div>
      <p className="description">{product.description}</p>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("Todas");
  const [budget, setBudget] = useState("");

  const filterProducts = () => {
    // Si el usuario selecciona "Todas" y no ingresa un presupuesto, muestra todos los productos
    if (category === "Todas" && !budget) {
      setProducts(allProducts);
      return;
    }
  
    let filtered = allProducts;
  
    // Filtrar por categoría si no es "Todas"
    if (category !== "Todas") {
      filtered = filtered.filter((p) => p.category === category);
    }
  
    // Filtrar por presupuesto si se ha puesto uno
    if (budget) {
      filtered = filtered.filter((p) => p.price <= Number(budget));
    }
  
    // Limitar a entre 3 y 5 productos
    setProducts(filtered.slice(0, 5));
  };

  useEffect(() => {
    setProducts(allProducts); // Muestra todo al inicio
  }, []);

  return (
    <div className="app-container">
      <h1>Recomendador de productos</h1>

      <div className="filters">
        <label>
          Categoría:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Todas">Todas</option>
            <option value="electronica">Electrónica</option>
            <option value="deportes">Deportes</option>
            <option value="ropa">Ropa</option>
            <option value="accesorios">Accesorios</option>
          </select>
        </label>

        <label>
          Presupuesto máximo:
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </label>

        <button onClick={filterProducts}>Buscar</button>
      </div>

      <div className="products-list">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p>No se encontraron productos</p>
        )}
      </div>
    </div>
  );
}

export default App;
