import { Link } from 'react-router-dom';
import HomeImg from '../../assets/ShoppingImg.jpg';
import styles from './Home.module.css';

function Home() {
  return (
    <main className={styles.homeContainer}>
      <div className={styles.infoContainer}>
        <h1 className={styles.homeHeader}>
          The Catalog With Drip No Cap (Ong frfr)
        </h1>
        <p className={styles.homeMsg}>
          The e-Mart contains some of the most 'swag' pieces you could ever hope
          to find. But we are not just about the drip, our catalog also has a
          wide selection of the 'useless junk/gag gift' items those Temu
          shoppers seem to love. This isn't your regular dropshipping site, its
          worse.
        </p>
        <Link to="/shop" className={styles.homeLink}>
          Browse the Goodies
        </Link>
      </div>
      <img src={HomeImg} alt="" className={styles.homeImg} />
    </main>
  );
}

export default Home;
