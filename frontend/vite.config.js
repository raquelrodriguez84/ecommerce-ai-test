import React, { useState, useEffect } from 'react';
import './App.css';

function Star({ filled }) {
  return (
    <svg
      className="star"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? '#FFC107' : 'none'}
      stroke="#FFC107"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
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
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');

  const fetchProducts = () => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error);
  };

  const getRecommendations = () => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        let filtered = data;

        const matchCategory = category ? p => p.category === category : () => true;
        const matchBudget = budget ? p => p.price <= parseFloat(budget) : () => true;

        filtered = filtered.filter(p => matchCategory(p) && matchBudget(p));

        if (category || budget) {
          setProducts(filtered.slice(0, 5));
        } else {
          setProducts(filtered); // Sin filtros, todo
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchProducts(); // carga todo al inicio
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    getRecommendations();
  };

  return (
    <div className="app-container">
      <h1>Catálogo de productos</h1>

      <form onSubmit={handleSearch} className="search-form">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Todas las categorías</option>
          <option value="Electrónica">Electrónica</option>
          <option value="Ropa">Ropa</option>
          <option value="Hogar">Hogar</option>
        </select>
        <input
          type="number"
          placeholder="Presupuesto máximo"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>

      <div className="products-list">
        {products.length > 0 ? (
          products.map(product => <ProductCard key={product.id} product={product} />)
        ) : (
          <p>No se encontraron productos</p>
        )}
      </div>
    </div>
  );
}

export default App;
