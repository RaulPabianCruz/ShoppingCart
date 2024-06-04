import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import CartIcon from '../../assets/cart.svg';
import Logo from '../../assets/store.svg';
import styles from './Container.module.css';

function Container() {
  const [cartItems, setCartItems] = useState([]);

  const numOfItems = cartItems.reduce(
    (accumulator, item) => accumulator + item.quantity,
    0,
  );

  return (
    <div className={styles.mainContainer}>
      <header className={styles.header}>
        <img
          src={Logo}
          alt="The e-Mart Logo"
          className={`${styles.logo} ${styles.headerItem}`}
        />
        <h1 className={`${styles.titleName} ${styles.headerItem}`}>
          The e-Mart!
        </h1>
        <Link to="/" className={`${styles.links} ${styles.headerItem}`}>
          Home
        </Link>
        <Link to="shop" className={`${styles.links} ${styles.headerItem}`}>
          Shop
        </Link>
        <p
          data-testid="num-of-items"
          className={`${styles.itemCount} ${styles.headerItem}`}
        >
          {numOfItems}
        </p>
        <Link
          to="cart"
          data-testid="cart-link"
          className={`${styles.links} ${styles.headerItem} ${styles.iconLink}`}
        >
          <img src={CartIcon} alt="Cart" className={styles.icon} />
        </Link>
      </header>
      <Outlet context={[cartItems, setCartItems, numOfItems]} />
    </div>
  );
}

export default Container;
