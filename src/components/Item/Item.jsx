import { useOutletContext } from 'react-router-dom';
import DeleteIcon from '../../assets/delete.svg';
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
        <label htmlFor="quantity">Qty:</label>
        <input
          type="number"
          min="1"
          max="15"
          id="quantity"
          value={item.quantity}
          onChange={(e) => updateQuantity(Number(e.target.value))}
          className={styles.qtyInput}
        />
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

export default Item;
