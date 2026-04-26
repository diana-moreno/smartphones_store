import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LoadingProvider } from '../../app/model/LoadingProvider';
import { CartProvider } from '../../entities/cart';

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
