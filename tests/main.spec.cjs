// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://dev--solaro.netlify.app/');

  await expect(page).toHaveTitle("Solaro");
});

test('change mode', async ({ page }) => {
  await page.goto('https://dev--solaro.netlify.app/');

  // Get the initial background color
  const initialColor = await page.evaluate(() => {
    return getComputedStyle(document.body).backgroundColor;
  });

  // Click the mode switch
  await page.locator("#switch").click();

  // Wait for some time to allow the mode change to take effect
  await page.waitForTimeout(1000);

  // Get the new background color after the mode switch
  const newColor = await page.evaluate(() => {
    return getComputedStyle(document.body).backgroundColor;
  });

  // Expects the page to have a different color after the mode switch
  expect(newColor).not.toBe(initialColor);
});
