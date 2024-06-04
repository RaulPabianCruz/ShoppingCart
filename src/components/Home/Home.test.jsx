import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../../routes';

describe('Home page content', () => {
  describe('snapshot', () => {
    it('matches snapshot', () => {
      const router = createMemoryRouter(routes, { initialEntries: ['/'] });
      const { container } = render(<RouterProvider router={router} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('Home Page link', () => {
    it("Renders 'Browse goodies' link", () => {
      const router = createMemoryRouter(routes, { initialEntries: ['/'] });
      render(<RouterProvider router={router} />);

      const BrowseLink = screen.getByRole('link', {
        name: 'Browse the Goodies',
      });

      expect(BrowseLink).toBeInTheDocument();
      expect(BrowseLink).toHaveAttribute('href', '/shop');
    });
  });
});
