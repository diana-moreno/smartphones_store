import { test, expect } from '@playwright/test';

test.describe('Products list', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display a list of products', async ({ page }) => {
    const products = page.getByRole('list').getByRole('listitem');
    await expect(products.first()).toBeVisible();
  });

  test('should navigate to product detail when clicking a product', async ({
    page,
  }) => {
    await page.getByRole('listitem').first().getByRole('link').click();
    await expect(page).toHaveURL(/\/products\/.+/);
  });

  test('should filter products when typing in the search box', async ({
    page,
  }) => {
    const input = page.getByRole('searchbox');
    await input.fill('samsung');

    await expect(page.getByText('results')).toBeVisible();
  });

  test('should show 0 results for a search with no matches', async ({
    page,
  }) => {
    const input = page.getByRole('searchbox');
    await input.fill('xyznotaproduct123');

    await expect(page.getByText('0 results')).toBeVisible();
  });

  test('should navigate to cart from the header cart icon', async ({
    page,
  }) => {
    await page.getByRole('link', { name: 'Cart, 0 products' }).click();
    await expect(page).toHaveURL('/cart');
  });
});
