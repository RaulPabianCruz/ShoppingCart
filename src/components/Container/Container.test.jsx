import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../../routes';

describe('Container Component', () => {
  describe('Container content', () => {
    it('matches snapshot', () => {
      const router = createMemoryRouter(routes, { intialEntries: ['/'] });
      const { container } = render(<RouterProvider router={router} />);

      expect(container).toMatchSnapshot();
    });

    it('renders cart item counter', () => {
      const router = createMemoryRouter(routes, { intialEntries: ['/'] });
      render(<RouterProvider router={router} />);

      const itemCount = screen.getByTestId('num-of-items');

      expect(itemCount.textContent).toBe('0');
    });
  });

  describe('Container links', () => {
    it('renders Home link', () => {
      const router = createMemoryRouter(routes, { initialEntries: ['/'] });
      render(<RouterProvider router={router} />);

      const HomeLink = screen.getByRole('link', { name: 'Home' });

      expect(HomeLink).toBeInTheDocument();
      expect(HomeLink).toHaveAttribute('href', '/');
    });

    it('renders Shop link', () => {
      const router = createMemoryRouter(routes, { intialEntries: ['/'] });
      render(<RouterProvider router={router} />);

      const ShopLink = screen.getByRole('link', { name: 'Shop' });

      expect(ShopLink).toBeInTheDocument();
      expect(ShopLink).toHaveAttribute('href', '/shop');
    });

    it('renders Cart link', () => {
      const router = createMemoryRouter(routes, { intialEntries: ['/'] });
      render(<RouterProvider router={router} />);

      const CartLink = screen.getByRole('link', { name: 'Cart' });

      expect(CartLink).toBeInTheDocument();
      expect(CartLink).toHaveAttribute('href', '/cart');
    });
  });
});
