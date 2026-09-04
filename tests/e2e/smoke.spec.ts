import { expect, test } from '@playwright/test';

test('the document entry point responds successfully with a title', async ({ page }) => {
  const response = await page.goto('/');

  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/.+/);
});
