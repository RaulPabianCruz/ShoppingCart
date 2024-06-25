import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import CartIcon from '../../assets/cart.svg';
import Logo from '../../assets/store.svg';
import styles from './Container.module.css';

function Container() {
  const [cartItems, setCartItems] = useState([]);

  const numOfItems = cartItems.reduce(
    (accumulator, item) => accumulator + Number(item.quantity),
    0,
  );

  return (
    <div className={styles.mainContainer}>
      <nav className={styles.nav}>
        <img
          src={Logo}
          alt="The e-Mart Logo"
          className={`${styles.logo} ${styles.navItem}`}
        />
        <h1 className={`${styles.titleName} ${styles.navItem}`}>The e-Mart!</h1>
        <Link to="/" className={`${styles.links} ${styles.navItem}`}>
          Home
        </Link>
        <Link to="shop" className={`${styles.links} ${styles.navItem}`}>
          Shop
        </Link>
        <p
          data-testid="num-of-items"
          className={`${styles.itemCount} ${styles.navItem}`}
        >
          {numOfItems}
        </p>
        <Link
          to="cart"
          data-testid="cart-link"
          className={`${styles.links} ${styles.navItem} ${styles.iconLink}`}
        >
          <img src={CartIcon} alt="Cart" className={styles.icon} />
        </Link>
      </nav>
      <Outlet context={[cartItems, setCartItems]} />
    </div>
  );
}

export default Container;
