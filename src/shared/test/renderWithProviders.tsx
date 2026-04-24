import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../../entities/cart';
import { LoadingProvider } from '../../app/loading/LoadingProvider';

export function renderWithProviders(
  ui: React.ReactElement,
  { initialPath = '/' }: { initialPath?: string } = {}
) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <LoadingProvider>
        <CartProvider>{ui}</CartProvider>
      </LoadingProvider>
    </MemoryRouter>
  );
}
