import { useEffect, useState } from 'react';

function useShopItems() {
  const [shopItems, setShopItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products', { mode: 'cors' })
      .then((response) => {
        if (!response.ok) throw new Error('Response status not ok.');
        return response.json();
      })
      .then((json) => setShopItems(json))
      .catch((error) => {
        setError(error);
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return { shopItems, error, loading };
}

export default useShopItems;
