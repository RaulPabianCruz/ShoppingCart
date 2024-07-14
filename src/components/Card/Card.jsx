import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

function Card({ product }) {
  const [itemQuantity, setItemQuantity] = useState(1);
  const [cartItems, setCartItems] = useOutletContext();

  function updateCartItems() {
    let oldItem = null;
    cartItems.forEach((item) => {
      if (item.product.id === product.id) oldItem = item;
    });

    if (oldItem !== null) {
      setCartItems(
        cartItems.map((item) => {
          if (item.product.id === product.id)
            return {
              ...oldItem,
              quantity: Number(oldItem.quantity) + Number(itemQuantity),
            };
          return item;
        }),
      );
    } else {
      setCartItems([
        ...cartItems,
        { product: product, quantity: itemQuantity },
      ]);
    }

    setItemQuantity(1);
  }

  return (
    <div data-testid="product-card" className={styles.cardContainer}>
      <img
        src={product.image}
        alt=""
        data-testid="product-img"
        className={styles.cardImg}
      />
      <h2 className={styles.cardTitle}>{product.title}</h2>
      <p className={styles.cardDesc}>{product.description}</p>
      <div className={styles.cardOptions}>
        <h3 className={styles.cardPrice}>${product.price}</h3>
        <div className={styles.qtyContainer}>
          <label>
            Quantity:
            <input
              type="number"
              min="1"
              max="15"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(Number(e.target.value))}
              className={styles.cardInput}
            />
          </label>
          <button onClick={updateCartItems} className={styles.cardButton}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default Card;
