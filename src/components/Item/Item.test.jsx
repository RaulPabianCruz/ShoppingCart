import { screen, render } from '@testing-library/react';
import { useOutletContext } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Item from './Item';

vi.mock('react-router-dom', async () => {
  const reactRouterDom = await vi.importActual('react-router-dom');

  return { ...reactRouterDom, useOutletContext: vi.fn() };
});

describe('Item component', () => {
  describe('Item content', () => {
    it('renders all item info', () => {
      const mockItem = {
        product: { id: 1, title: 'title', price: 10 },
        quantity: 2,
      };
      vi.mocked(useOutletContext).mockReturnValue([[mockItem], null]);
      render(<Item key="1" item={mockItem} />);

      const title = screen.getByText('Item: title');
      const qty = screen.getByRole('spinbutton', { name: 'Qty:' });

      expect(title).toBeInTheDocument();
      expect(qty).toBeInTheDocument();
      expect(qty.value).toBe('2');
    });

    it('renders delete button', () => {
      const mockItem = {
        product: { id: 1, title: 'title', price: 10 },
        quantity: 2,
      };
      vi.mocked(useOutletContext).mockReturnValue([[mockItem], null]);
      render(<Item key="1" item={mockItem} />);

      const button = screen.getByRole('button', { name: 'delete' });

      expect(button).toBeInTheDocument();
    });

    it('renders the correct price total for the individual item given its quantity', () => {
      const mockItem = {
        product: { id: 1, title: 'title', price: 10 },
        quantity: 2,
      };
      vi.mocked(useOutletContext).mockReturnValue([[mockItem], null]);
      render(<Item key="1" item={mockItem} />);

      const price = screen.getByText('Price: $20.00');

      expect(price).toBeInTheDocument();
    });

    it('renders the correct price total for the individual item given its quantity (2)', () => {
      const mockItem = {
        product: { id: 1, title: 'title', price: 19.99 },
        quantity: 4,
      };
      vi.mocked(useOutletContext).mockReturnValue([[mockItem], null]);
      render(<Item key="1" item={mockItem} />);

      const price = screen.getByText('Price: $79.96');

      expect(price).toBeInTheDocument();
    });
  });

  describe('Item functionality', () => {
    it('updates item quantity correctly when changed in the input element', async () => {
      const user = userEvent.setup();
      const mockItem = {
        product: { id: 1, title: 'title', price: 10 },
        quantity: 1,
      };
      const setCartItems = vi.fn();
      vi.mocked(useOutletContext).mockReturnValue([[mockItem], setCartItems]);
      render(<Item key="1" item={mockItem} />);

      const qty = screen.getByRole('spinbutton', { name: 'Qty:' });
      await user.click(qty);
      await user.keyboard('[Digit1]');

      expect(setCartItems).toHaveBeenCalledWith([
        { ...mockItem, quantity: 11 },
      ]);
    });

    it('deletes item from array when delete button is clicked', async () => {
      const user = userEvent.setup();
      const mockItem1 = {
        product: { id: 1, title: 'title', price: 10 },
        quantity: 1,
      };
      const mockItem2 = {
        product: { id: 2, title: 'title2', price: 20 },
        quantity: 3,
      };
      const setCartItems = vi.fn();
      vi.mocked(useOutletContext).mockReturnValue([
        [mockItem1, mockItem2],
        setCartItems,
      ]);
      render(<Item key="1" item={mockItem1} />);

      const deleteBttn = screen.getByRole('button', { name: 'delete' });
      await user.click(deleteBttn);

      expect(setCartItems).toHaveBeenCalledWith([mockItem2]);
    });
  });
});
