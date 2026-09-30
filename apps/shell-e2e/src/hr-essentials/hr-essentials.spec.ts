import { expect, test } from '@playwright/test';
import { seedAuthenticatedSession } from '../support/seed-session';

test.describe('hr-essentials module', () => {
  test.beforeEach(async ({ page }) => {
    await seedAuthenticatedSession(page);
  });

  test('loads without a server error', async ({ page }) => {
    const response = await page.goto('/hr-essentials');
    expect(response?.ok() ?? false).toBeTruthy();
  });
});
