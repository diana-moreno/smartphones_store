import { test, expect } from '@playwright/test';

test.describe('Cart', () => {
  async function addFirstProductToCart(page: import('@playwright/test').Page) {
    await page.goto('/');
    await page.getByRole('listitem').first().getByRole('link').click();
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
    await page.getByRole('button', { name: 'Add' }).click();
  }

  test('should redirect to cart after adding a product', async ({ page }) => {
    await addFirstProductToCart(page);
    await expect(page).toHaveURL('/cart');
  });

  test('should display the added product in the cart', async ({ page }) => {
    await addFirstProductToCart(page);
    await expect(page.getByRole('heading', { name: 'Cart (1)' })).toBeVisible();
  });

  test('should persist the cart across navigations', async ({ page }) => {
    await addFirstProductToCart(page);
    await page.getByRole('link', { name: 'Continue shopping' }).click();
    await page.getByRole('link', { name: 'Cart, 1 products' }).click();
    await expect(page.getByRole('heading', { name: 'Cart (1)' })).toBeVisible();
  });

  test('should remove a product from the cart', async ({ page }) => {
    await addFirstProductToCart(page);
    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(page.getByRole('heading', { name: 'Cart (0)' })).toBeVisible();
  });

  test('should navigate back to home from the cart', async ({ page }) => {
    await addFirstProductToCart(page);
    await page.getByRole('link', { name: 'Continue shopping' }).click();
    await expect(page).toHaveURL('/');
  });

  test('should show an empty cart when accessing /cart directly', async ({
    page,
  }) => {
    await page.goto('/cart');
    await expect(page.getByRole('heading', { name: 'Cart (0)' })).toBeVisible();
  });

  test('should navigate to home from the header logo', async ({ page }) => {
    await page.goto('/cart');
    await page.getByRole('link', { name: 'home' }).click();
    await expect(page).toHaveURL('/');
  });
});
