import { test, expect } from '@playwright/test';

test.describe('Not found', () => {
  test('should show not found page for an unknown route', async ({ page }) => {
    await page.goto('/this-route-does-not-exist');
    await expect(page.getByText('Not found')).toBeVisible();
  });

  test('should show error message for a non-existent product id', async ({
    page,
  }) => {
    await page.goto('/products/this-id-does-not-exist');
    await expect(page.getByRole('alert')).toBeVisible();
  });

  test('should navigate to home through logo link', async ({ page }) => {
    await page.goto('/this-route-doesNotExist');
    await page.getByLabel('Go to home').click();
    await expect(page).toHaveURL('/');
  });
});
