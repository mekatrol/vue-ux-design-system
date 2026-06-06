import { test, expect } from '@playwright/test';

test('fills the key-backed application form controls', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Application', exact: true })).toBeVisible();

  await page.getByLabel('Renewal').check();

  const selects = page.locator('select');
  await expect(selects).toHaveCount(5);
  await selects.nth(0).selectOption('x');
  await selects.nth(1).selectOption('marriage-certificate');
  await selects.nth(2).selectOption('australian-citizenship-certificate');
  await selects.nth(3).selectOption('two-compliant-photos-ready');
  await selects.nth(4).selectOption('1-to-2-years');

  await page.getByLabel('Identity document with photo and signature').check();
  await page.getByRole('button', { name: 'Mark ready for review' }).click();

  await expect(selects.nth(0)).toHaveValue('x');
  await expect(selects.nth(1)).toHaveValue('marriage-certificate');
  await expect(page.getByText('Renewal').last()).toBeVisible();
  await expect(page.getByText('2 of 5')).toBeVisible();
  await expect(page.getByText('Dummy review marked. No data has been sent or saved.')).toBeVisible();
});
