import { screen, render } from '@testing-library/react';
import {
  createMemoryRouter,
  RouterProvider,
  useOutletContext,
} from 'react-router-dom';
import { vi } from 'vitest';
import routes from '../../routes';

vi.mock('react-router-dom', async () => {
  const reactRouterDom = await vi.importActual('react-router-dom');

  return { ...reactRouterDom, useOutletContext: vi.fn() };
});

vi.mock('../Item/Item', () => ({
  default: ({ item }) => (
    <div data-testid="cart-item">
      <p>id: {item.product.id}</p>
      <p>price: {item.product.price}</p>
      <p>quantity: {item.quantity}</p>
    </div>
  ),
}));

const cartItems1 = [
  { product: { id: 1, price: 10 }, quantity: 3 },
  { product: { id: 3, price: 19.99 }, quantity: 1 },
];

const cartItems2 = [{ product: { id: 2, price: 15 }, quantity: 1 }];

describe('Cart component', () => {
  describe('Cart content', () => {
    it('renders heading info', () => {
      vi.mocked(useOutletContext).mockReturnValue([[]]);
      const router = createMemoryRouter(routes, { initialEntries: ['/cart'] });
      render(<RouterProvider router={router} />);

      const mainHeading = screen.getByRole('heading', { name: 'Your Cart:' });
      const itemHeading = screen.getByRole('heading', { name: 'Item' });
      const qtyHeading = screen.getByRole('heading', { name: 'Quantity' });
      const priceHeading = screen.getByRole('heading', { name: 'Price' });

      expect(mainHeading).toBeInTheDocument();
      expect(itemHeading).toBeInTheDocument();
      expect(qtyHeading).toBeInTheDocument();
      expect(priceHeading).toBeInTheDocument();
    });

    it('renders all cart items', () => {
      vi.mocked(useOutletContext).mockReturnValue([cartItems1]);
      const router = createMemoryRouter(routes, { initialEntries: ['/cart'] });
      render(<RouterProvider router={router} />);

      const cartItems = screen.getAllByTestId('cart-item');

      expect(cartItems.length).toBe(2);
    });

    it('renders correctly when no items are in the cart', () => {
      vi.mocked(useOutletContext).mockReturnValue([[]]);
      const router = createMemoryRouter(routes, { initialEntries: ['/cart'] });
      render(<RouterProvider router={router} />);

      const cartItem = screen.queryByTestId('cart-item');

      expect(cartItem).not.toBeInTheDocument();
    });
  });

  describe('Cart component price total display', () => {
    it('renders the correct price total (1)', () => {
      vi.mocked(useOutletContext).mockReturnValue([cartItems1]);
      const router = createMemoryRouter(routes, { initialEntries: ['/cart'] });
      render(<RouterProvider router={router} />);

      const totalDisplay = screen.getByTestId('total-display');

      expect(totalDisplay.textContent).toBe('Total(4 Items): $49.99');
    });

    it('renders the correct price total (2)', () => {
      vi.mocked(useOutletContext).mockReturnValue([cartItems2]);
      const router = createMemoryRouter(routes, { initialEntries: ['/cart'] });
      render(<RouterProvider router={router} />);

      const totalDisplay = screen.getByTestId('total-display');

      expect(totalDisplay.textContent).toBe('Total(1 Item): $15.00');
    });

    it('renders the correct price total when no items are in the cart', () => {
      vi.mocked(useOutletContext).mockReturnValue([[]]);
      const router = createMemoryRouter(routes, { initialEntries: ['/cart'] });
      render(<RouterProvider router={router} />);

      const totalDisplay = screen.getByTestId('total-display');

      expect(totalDisplay.textContent).toBe('Total(0 Items): $0.00');
    });
  });
});
