import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';

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
    <div data-testid="product-card">
      <img src={product.image} alt="" data-testid="product-img" />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <div>
        <h3>${product.price}</h3>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          min="1"
          max="15"
          id="quantity"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
        />
        <button onClick={updateCartNumber}>Add to Cart</button>
      </div>
    </div>
  );
}

export default Card;
