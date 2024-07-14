import { useOutletContext } from 'react-router-dom';
import DeleteIcon from '../../assets/delete.svg';
import PropTypes from 'prop-types';
import styles from './Item.module.css';

function Item({ item }) {
  const [cartItems, setCartItems] = useOutletContext();
  const itemTotalPrice = Number(item.product.price) * Number(item.quantity);

  function deleteItem() {
    const newCartItems = cartItems.filter(
      (cartItem) => cartItem.product.id !== item.product.id,
    );
    setCartItems(newCartItems);
  }

  function updateQuantity(newQuantity) {
    setCartItems(
      cartItems.map((cartItem) => {
        if (cartItem.product.id === item.product.id)
          return { ...cartItem, quantity: newQuantity };
        return cartItem;
      }),
    );
  }

  return (
    <div className={styles.itemContainer}>
      <p className={styles.itemSection}>Item: {item.product.title}</p>
      <div className={styles.itemSection}>
        <label>
          Qty:
          <input
            type="number"
            min="1"
            max="15"
            value={item.quantity}
            onChange={(e) => updateQuantity(Number(e.target.value))}
            className={styles.qtyInput}
          />
        </label>
      </div>
      <div className={styles.priceSection}>
        <p>Price: ${itemTotalPrice.toFixed(2)}</p>
        <button
          type="button"
          data-testid="delete-bttn"
          onClick={deleteItem}
          className={styles.itemButton}
        >
          <img src={DeleteIcon} alt="delete" className={styles.deleteImg} />
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    product: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      category: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
    }),
    quantity: PropTypes.number,
  }).isRequired,
};

export default Item;
