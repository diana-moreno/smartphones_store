import { test, expect } from '@playwright/test';

test.describe('Product detail', () => {
  test('should complete the product configuration flow', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('listitem').first().getByRole('link').click();

    const addButton = page.getByRole('button', { name: 'Add' });
    await expect(addButton).toBeDisabled();

    await page
      .getByRole('group', { name: 'Storage' })
      .getByRole('button')
      .first()
      .click();
    await page
      .getByRole('group', { name: 'Color' })
      .getByRole('button')
      .first()
      .click();

    await expect(addButton).toBeEnabled();
    await expect(page.getByTestId('product-price')).toBeVisible();
  });

  test.describe('Header navigation from product detail', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await page.getByRole('listitem').first().getByRole('link').click();
      await expect(page).toHaveURL(/\/products\/.+/);
    });

    test('should navigate to home from the logo', async ({ page }) => {
      await page.getByRole('link', { name: 'Go to home' }).click();
      await expect(page).toHaveURL('/');
    });

    test('should navigate to home from the back link', async ({ page }) => {
      await page.getByRole('link', { name: 'Go back to home' }).click();
      await expect(page).toHaveURL('/');
    });

    test('should navigate to cart from the cart icon', async ({ page }) => {
      await page.getByRole('link', { name: 'Go to cart, 0 products' }).click();
      await expect(page).toHaveURL('/cart');
    });
  });
});
