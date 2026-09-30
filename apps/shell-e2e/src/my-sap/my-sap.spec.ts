import { expect, test } from '@playwright/test';
import { seedAuthenticatedSession } from '../support/seed-session';

test.describe('my-sap module', () => {
  test.beforeEach(async ({ page }) => {
    await seedAuthenticatedSession(page);
  });

  test('loads without a server error', async ({ page }) => {
    const response = await page.goto('/my-sap');
    expect(response?.ok() ?? false).toBeTruthy();
  });
});
