import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import styles from './Card.module.css';

function Card({ product }) {
  const [itemQuantity, setItemQuantity] = useState(1);
  const [cartItems, setCartItems] = useOutletContext();

  function updateCartNumber() {
    let oldItem = null;
    cartItems.forEach((item) => {
      if (item.product.id === product.id) oldItem == item;
    });

    if (oldItem !== null) {
      let newItem = {
        ...oldItem,
        quantity: Number(oldItem.quantity) + Number(itemQuantity),
      };
      setCartItems(
        cartItems.map((item) => {
          if (item.product.id === newItem.product.id) return newItem;
          return item;
        }),
      );
    } else
      setCartItems([
        ...cartItems,
        { product: product, quantity: itemQuantity },
      ]);

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
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            min="1"
            max="15"
            id="quantity"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
            className={styles.cardInput}
          />
          <button onClick={updateCartNumber} className={styles.cardButton}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
