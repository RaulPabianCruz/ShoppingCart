import { screen, render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import routes from '../../routes';

const { mockItems } = vi.hoisted(() => ({
  mockItems: [
    {
      id: 1,
      title: 'Product Title',
      price: 1,
      category: 'Product',
      description: 'Product Description.',
      image: 'imageSrcLink',
    },
  ],
}));

vi.mock('../Shop/hooks/useShopItems', () => ({
  default: () => ({ shopItems: mockItems, error: null, loading: false }),
}));

describe('Card Component', () => {
  describe('Card content', () => {
    it('renders card component content', () => {
      const router = createMemoryRouter(routes, { initialEntries: ['/shop'] });
      render(<RouterProvider router={router} />);

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
      const router = createMemoryRouter(routes, { initialEntries: ['/shop'] });
      render(<RouterProvider router={router} />);

      const quantity = screen.getByRole('spinbutton', { name: 'Quantity:' });
      const addButton = screen.getByRole('button', { name: 'Add to Cart' });

      expect(quantity).toBeInTheDocument();
      expect(addButton).toBeInTheDocument();
      screen.debug();
    });
  });

  describe('Card functionality', () => {
    it('updates item count display when an item is added', async () => {
      const user = userEvent.setup();
      const router = createMemoryRouter(routes, { initialEntries: ['/shop'] });
      render(<RouterProvider router={router} />);

      const addButton = screen.getByRole('button', { name: 'Add to Cart' });
      const itemCount = screen.getByTestId('num-of-items');
      await user.click(addButton);

      expect(itemCount.textContent).toBe('1');
    });

    it('updates item count display based on quantity of item added', async () => {
      const user = userEvent.setup();
      const router = createMemoryRouter(routes, { initialEntries: ['/shop'] });
      render(<RouterProvider router={router} />);

      const productQtty = screen.getByRole('spinbutton', { name: 'Quantity:' });
      const addButton = screen.getByRole('button', { name: 'Add to Cart' });
      const itemCount = screen.getByTestId('num-of-items');
      await user.click(productQtty);
      await user.keyboard('[Backspace][Digit5]');
      await user.click(addButton);

      expect(itemCount.textContent).toBe('5');
    });
  });
});
