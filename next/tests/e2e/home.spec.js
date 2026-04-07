const { test, expect } = require('@playwright/test');

test('home page loads and renders main content', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/127\.0\.0\.1:3000/);
  await expect(page.locator('body')).toContainText(
    /Load More Blogs|Error Loading Blogs|No blogs found/i
  );
});
