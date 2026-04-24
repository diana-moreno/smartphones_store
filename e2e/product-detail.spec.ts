import { test, expect } from '@playwright/test';

test.describe('Product detail', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('listitem').first().getByRole('link').click();
  });

  test('should display color and storage selectors', async ({ page }) => {
    await expect(
      page.getByRole('group', { name: /storage/i })
    ).toBeVisible();
    await expect(page.getByRole('group', { name: /color/i })).toBeVisible();
  });

  test('should have the add to cart button disabled before selecting options', async ({
    page,
  }) => {
    await expect(
      page.getByRole('button', { name: 'Añadir' })
    ).toBeDisabled();
  });

  test('should enable the add to cart button after selecting color and storage', async ({
    page,
  }) => {
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

    await expect(page.getByRole('button', { name: 'Añadir' })).toBeEnabled();
  });

  test('should update the price when selecting a storage option', async ({
    page,
  }) => {
    const storageButtons = page
      .getByRole('group', { name: /storage/i })
      .getByRole('button');

    await storageButtons.first().click();
    const colorButtons = page
      .getByRole('group', { name: /color/i })
      .getByRole('button');
    await colorButtons.first().click();

    await expect(page.locator('h1 ~ p', { hasText: /EUR/ })).toBeVisible();
  });

  test('should show product specifications', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Specifications' })
    ).toBeVisible();
  });
});
