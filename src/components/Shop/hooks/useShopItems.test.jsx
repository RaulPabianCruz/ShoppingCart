import { vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useShopItems from './useShopItems';

global.fetch = vi.fn();

const mockItems = new Array(30);
for (let i = 0; i < mockItems.length; i += 1) {
  mockItems[i] = {
    id: i,
    title: 'item',
    price: 20,
    category: 'product',
    description: 'item/product',
    image: 'someURL',
  };
}

describe('useShopItems hook', () => {
  describe('useShopItems fetch response processing', () => {
    it('indicates load state while fetch is still in progress', () => {
      fetch.mockReturnValue(
        Promise.resolve({ ok: true, json: () => mockItems }),
      );

      const { result } = renderHook(() => useShopItems());

      expect(result.current.loading).toBe(true);
    });

    it('processes a successful fetch response correctly', async () => {
      fetch.mockReturnValue(
        Promise.resolve({ ok: true, json: () => mockItems }),
      );

      const { result } = renderHook(() => useShopItems());
      await vi.waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.shopItems).toEqual(mockItems);
      expect(result.current.error).toBe(null);
    });

    it('processes an invalid status response correctly', async () => {
      fetch.mockReturnValue(Promise.resolve({ ok: false, json: () => [] }));

      const { result } = renderHook(() => useShopItems());
      await vi.waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toEqual(Error('Response status not ok.'));
    });

    it('processes an error from fetch correctly', async () => {
      fetch.mockReturnValue(Promise.reject(new Error('Fetch Error')));

      const { result } = renderHook(() => useShopItems());
      await vi.waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toEqual(Error('Fetch Error'));
    });
  });
});
