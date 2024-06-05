import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import routes from '../../routes';

describe('Shop Component', () => {
  describe('Shop content', () => {
    it('matches snapshot', () => {
      const router = createMemoryRouter(routes, { initialEntries: ['/shop'] });

      const { container } = render(<RouterProvider router={router} />);

      expect(container).toMatchSnapshot();
    });

    it('renders all 30 products', () => {
      const router = createMemoryRouter(routes, { initialEntries: ['/shop'] });
      render(<RouterProvider router={router} />);

      const productElements = screen.getAllByTestId('product-card');

      expect(productElements.length).toBe(30);
    });
  });
});

describe('Card Component', () => {
  describe('Card content', () => {
    it('renders all card component info', () => {
      const router = createMemoryRouter(routes, { initialEntries: ['/shop'] });
      render(<RouterProvider router={router} />);

      const productImages = screen.getAllByTestId('product-card-img');
      const productTitles = screen.getAllByTestId('product-card-title');
      const productDescriptions = screen.getAllByTestId('product-card-desc');
      const productPrices = screen.getAllByTestId('product-card-price');

      expect(productImages.length).toBe(30);
      expect(productTitles.length).toBe(30);
      expect(productDescriptions.length).toBe(30);
      expect(productPrices.length).toBe(30);
    });

    it("renders number input and 'Add to Cart' button", () => {
      const router = createMemoryRouter(routes, { initialEntries: ['/shop'] });
      render(<RouterProvider router={router} />);

      const productQuantities = screen.getAllByRole('input', { name: '1' });
      const addButtons = screen.getAllByRole('button', { name: 'Add to Cart' });

      expect(productQuantities.length).toBe(30);
      expect(addButtons.length).toBe(30);
    });
  });

  describe('Card Functionality', () => {
    it('updates item count display when an item is added', async () => {
      const user = userEvent.setup();
      const router = createMemoryRouter(routes, { initialEntries: ['/shop'] });
      render(<RouterProvider router={router} />);

      const addButtons = screen.getAllByRole('button', { name: 'Add to Cart' });
      await user.click(addButtons[0]);

      expect(screen.getByTestId('num-of-items').textContent).toBe('1');
    });

    it('updates item count display based on quantity of item added', async () => {
      const user = userEvent.setup();
      const router = createMemoryRouter(routes, { initialEntries: ['/shop'] });
      render(<RouterProvider router={router} />);

      const productQuantities = screen.getAllByRole('input', { name: '1' });
      const addButtons = screen.getAllByRole('button', { name: 'Add to Cart' });
      await user.click(productQuantities[0]);
      await user.keyboard('[Backspace][Digit5]');
      await user.click(addButtons[0]);

      expect(screen.getByTestId('num-of-items').textContent).toBe('5');
    });
  });
});
