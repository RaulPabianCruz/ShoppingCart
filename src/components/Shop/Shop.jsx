import useShopItems from './hooks/useShopItems';
import Card from '../Card/Card';

function Shop() {
  const { shopItems, error, loading } = useShopItems();

  if (error) return <p>There was an error U_U</p>;

  if (loading) return <p>Loading up the selection!</p>;

  return (
    <div>
      <h1>The e-Mart's Top Selection</h1>
      <div>
        {shopItems.map((item) => {
          return <Card product={item} key={item.id} />;
        })}
      </div>
    </div>
  );
}

export default Shop;
