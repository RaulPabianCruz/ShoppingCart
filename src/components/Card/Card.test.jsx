import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useOutletContext } from 'react-router-dom';
import { vi } from 'vitest';
import Card from './Card.jsx';

vi.mock('react-router-dom', async () => {
  const ReactRouterDom = await vi.importActual('react-router-dom');

  return { ...ReactRouterDom, useOutletContext: vi.fn() };
});

const mockItem = {
  id: 1,
  title: 'Product Title',
  price: 1,
  category: 'Product',
  description: 'Product Description.',
  image: 'imageSrcLink',
};

describe('Card Component', () => {
  describe('Card content', () => {
    it('renders card component content', () => {
      vi.mocked(useOutletContext).mockReturnValue([], null);
      render(<Card product={mockItem} />);

      const img = screen.getByTestId('product-img');
      const title = screen.getByRole('heading', { name: 'Product Title' });
      const desc = screen.getByText('Product Description.');
      const price = screen.getByRole('heading', { name: '$1' });

      expect(img.src).toBe('http://localhost:3000/imageSrcLink');
      expect(title).toBeInTheDocument();
      expect(desc).toBeInTheDocument();
      expect(price).toBeInTheDocument();
    });

    it("renders number input and 'Add to Cart' button", () => {
      vi.mocked(useOutletContext).mockReturnValue([], null);
      render(<Card product={mockItem} />);

      const quantity = screen.getByRole('spinbutton', { name: 'Quantity:' });
      const addButton = screen.getByRole('button', { name: 'Add to Cart' });

      expect(quantity).toBeInTheDocument();
      expect(quantity.value).toBe('1');
      expect(addButton).toBeInTheDocument();
    });
  });

  describe('Card functionality', () => {
    it("adds item to list of Cart items when 'Add to Cart' is clicked", async () => {
      const user = userEvent.setup();
      const setCartItems = vi.fn();
      vi.mocked(useOutletContext).mockReturnValue([[], setCartItems]);
      render(<Card product={mockItem} />);

      const addButton = screen.getByRole('button', { name: 'Add to Cart' });
      await user.click(addButton);

      expect(setCartItems).toHaveBeenCalledWith([
        { product: mockItem, quantity: 1 },
      ]);
    });

    it("adds item to list of Cart items when 'Add to Cart' is clicked, the quantity of the item is based on the quantity input", async () => {
      const user = userEvent.setup();
      const setCartItems = vi.fn();
      vi.mocked(useOutletContext).mockReturnValue([[], setCartItems]);
      render(<Card product={mockItem} />);

      const itemQty = screen.getByRole('spinbutton', { name: 'Quantity:' });
      const addButton = screen.getByRole('button', { name: 'Add to Cart' });
      await user.click(itemQty);
      await user.keyboard('[Backspace][Digit3]');
      await user.click(addButton);

      expect(setCartItems).toHaveBeenCalledWith([
        { product: mockItem, quantity: 3 },
      ]);
    });

    it("updates existing Cart item quantity correctly when 'Add to Cart' is clicked", async () => {
      const user = userEvent.setup();
      const setCartItems = vi.fn();
      vi.mocked(useOutletContext).mockReturnValue([
        [{ product: mockItem, quantity: 1 }],
        setCartItems,
      ]);
      render(<Card product={mockItem} />);

      const addButton = screen.getByRole('button', { name: 'Add to Cart' });
      await user.click(addButton);

      expect(setCartItems).toHaveBeenCalledWith([
        { product: mockItem, quantity: 2 },
      ]);
    });

    it("updates existing Cart item quantity correctly when 'Add to Cart' is clicked, updated quantity is based on the quantity input", async () => {
      const user = userEvent.setup();
      const setCartItems = vi.fn();
      vi.mocked(useOutletContext).mockReturnValue([
        [{ product: mockItem, quantity: 1 }],
        setCartItems,
      ]);
      render(<Card product={mockItem} />);

      const productQtty = screen.getByRole('spinbutton', { name: 'Quantity:' });
      const addButton = screen.getByRole('button', { name: 'Add to Cart' });
      await user.click(productQtty);
      await user.keyboard('[Backspace][Digit5]');
      await user.click(addButton);

      expect(setCartItems).toHaveBeenCalledWith([
        { product: mockItem, quantity: 6 },
      ]);
    });
  });
});
