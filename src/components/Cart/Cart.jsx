import { useOutletContext } from 'react-router-dom';
import Item from '../Item/Item';
import styles from './Cart.module.css';

function Cart() {
  const [cartItems] = useOutletContext();

  const priceTotal = cartItems.reduce((accumulator, item) => {
    const price = Number(item.quantity) * Number(item.product.price);
    return accumulator + price;
  }, 0);

  const numOfItems = cartItems.reduce(
    (accumulator, item) => accumulator + Number(item.quantity),
    0,
  );

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartHeading}>Your Cart: </h1>
      <div className={styles.infoHeaderContainer}>
        <h2 className={styles.infoHeader}>Item</h2>
        <h2 className={styles.infoHeader}>Quantity</h2>
        <h2 className={styles.infoHeader}>Price</h2>
      </div>
      <div className={styles.itemListContainer}>
        {cartItems.map((cartItem) => {
          return <Item item={cartItem} key={cartItem.product.id} />;
        })}
      </div>
      <h1 data-testid="total-display" className={styles.totalDisplay}>
        Total({numOfItems} Item{numOfItems != 1 ? 's' : ''}): $
        {priceTotal.toFixed(2)}
      </h1>
    </div>
  );
}

export default Cart;
