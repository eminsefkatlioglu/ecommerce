import React, { useState } from 'react';
import productsData from './data/products-list.json';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const App = () => {
  const groupedProducts = {};
  productsData.forEach((product) => {
    if (!groupedProducts[product.category]) {
      groupedProducts[product.category] = product;
    }
  });
  const uniqueProducts = Object.values(groupedProducts);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const CategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const SearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const AddToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
  };

  const [isCartOpen, setIsCartOpen] = useState(false);

  const CartClick = () => {
    setIsCartOpen(true);
  };

  const CloseCart = () => {
    setIsCartOpen(false);
  };

  const RemoveFromCart = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  return (
    <div>
      <header>
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" placeholder="Search.." value={searchKeyword} onChange={SearchChange} />
        </div>
        <div className="cart" onClick={CartClick}>
          <span className="cart-count">{cartItems.length}</span>
          <FontAwesomeIcon icon={faShoppingCart} />
        </div>
      </header>

      <div className="container">
        <aside className="sidebar">
          <h3>Kategoriler</h3>
          <ul>
            {uniqueProducts.map((product) => (
              <li key={product.id} onClick={() => CategoryClick(product.category)}>
                {product.category}
              </li>
            ))}
          </ul>
        </aside>
        <div className="content">
          <div className="products">
            {productsData.map((product) => {
              if ((!selectedCategory || product.category === selectedCategory) &&
                product.title.toLowerCase().includes(searchKeyword.toLowerCase())
              ) {
                return (
                  <div className="product" key={product.id}>
                    <div className="product-image img-hover-zoom">
                      <img src={product.image} alt={product.title} />
                    </div>
                    <div className="product-title">{product.title}</div>
                    <div className="product-price">{product.price} $</div>
                    <button className="add-to-cart" onClick={() => AddToCart(product)}>
                      Sepete Ekle
                    </button>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
      <div className={`cart-dropdown ${isCartOpen ? 'open' : ''}`}>
        <div className="close-cart" onClick={CloseCart}>
          X
        </div>
        <h3>Sepet</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <span>{item.title}</span>
              <span className='price'>{item.price} $</span>
              <div className="remove-from-cart" onClick={() => RemoveFromCart(item.id)}>
                X
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
