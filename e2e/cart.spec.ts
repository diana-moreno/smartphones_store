import { test, expect } from '@playwright/test';

test.describe('Cart', () => {
  async function addFirstProductToCart(page: import('@playwright/test').Page) {
    await page.goto('/');
    await page.getByRole('listitem').first().getByRole('link').click();
    await page
      .getByRole('group', { name: /storage/i })
      .getByRole('button')
      .first()
      .click();
    await page
      .getByRole('group', { name: /color/i })
      .getByRole('button')
      .first()
      .click();
    await page.getByRole('button', { name: 'Añadir' }).click();
  }

  test('should redirect to cart after adding a product', async ({ page }) => {
    await addFirstProductToCart(page);
    await expect(page).toHaveURL('/cart');
  });

  test('should display the added product in the cart', async ({ page }) => {
    await addFirstProductToCart(page);
    await expect(
      page.getByRole('heading', { name: /cart \(1\)/i })
    ).toBeVisible();
  });

  test('should show total price', async ({ page }) => {
    await addFirstProductToCart(page);
    await expect(page.locator('footer').getByText(/\d+ EUR/).last()).toBeVisible();
  });

  test('should remove a product from the cart', async ({ page }) => {
    await addFirstProductToCart(page);
    await page.getByRole('button', { name: 'Eliminar' }).click();
    await expect(
      page.getByRole('heading', { name: /cart \(0\)/i })
    ).toBeVisible();
  });

  test('should navigate back to home from the cart', async ({ page }) => {
    await addFirstProductToCart(page);
    await page.getByRole('link', { name: /continue shopping/i }).click();
    await expect(page).toHaveURL('/');
  });

  test('should show an empty cart when accessing /cart directly', async ({
    page,
  }) => {
    await page.goto('/cart');
    await expect(
      page.getByRole('heading', { name: /cart \(0\)/i })
    ).toBeVisible();
  });
});
