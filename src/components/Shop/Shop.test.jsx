import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../../routes';
import { vi } from 'vitest';
import useShopItems from './hooks/useShopItems';

vi.mock('./hooks/useShopItems', () => ({
  default: vi.fn(),
}));

vi.mock('../Card/Card.jsx', () => ({
  default: ({ product }) => <div data-testid="product-card">{product.id}</div>,
}));

const mockItems = new Array(30);
for (let i = 0; i < 30; i += 1) mockItems[i] = { id: i + 1 };

describe('Shop Component', () => {
  describe('Shop component content', () => {
    it('renders the heading on successful fetch', () => {
      vi.mocked(useShopItems).mockReturnValue({
        shopItems: mockItems,
        error: null,
        loading: false,
      });
      const router = createMemoryRouter(routes, { initialEntries: ['/shop'] });
      render(<RouterProvider router={router} />);

      let header = screen.getByRole('heading', {
        name: "The e-Mart's Top Selection",
      });

      expect(header).toBeInTheDocument();
    });

    it('renders all 30 products on successful fetch', () => {
      vi.mocked(useShopItems).mockReturnValue({
        shopItems: mockItems,
        error: null,
        loading: false,
      });
      const router = createMemoryRouter(routes, { initialEntries: ['/shop'] });
      render(<RouterProvider router={router} />);

      let productElements = screen.getAllByTestId('product-card');

      expect(productElements.length).toBe(30);
    });
  });

  describe('Shop component render logic', () => {
    it('renders error message when fetch fails', () => {
      vi.mocked(useShopItems).mockReturnValue({
        shopItems: mockItems,
        error: new Error('Error mang.'),
        loading: true,
      });
      const router = createMemoryRouter(routes, { initialEntries: ['/shop'] });
      render(<RouterProvider router={router} />);

      const errorMsg = screen.getByText('There was an error U_U');
      const header = screen.queryByRole('heading', {
        name: "The e-Mart's Top Selection",
      });

      expect(errorMsg).toBeInTheDocument();
      expect(header).not.toBeInTheDocument();
    });

    it('renders loading message while fetch is still in progress', () => {
      vi.mocked(useShopItems).mockReturnValue({
        shopItems: mockItems,
        error: null,
        loading: true,
      });
      const router = createMemoryRouter(routes, { initialEntries: ['/shop'] });
      render(<RouterProvider router={router} />);

      const loadMsg = screen.getByText('Loading up the selection!');
      const header = screen.queryByRole('heading', {
        name: "The e-Mart's Top Selection",
      });

      expect(loadMsg).toBeInTheDocument();
      expect(header).not.toBeInTheDocument();
    });
  });
});
