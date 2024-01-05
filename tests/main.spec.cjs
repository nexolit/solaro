// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://dev--solaro.netlify.app/');

  await expect(page).toHaveTitle("Solaro");
});

test('change mode', async ({ page }) => {
  await page.goto('https://dev--solaro.netlify.app/');

  const color = await page.evaluate("getComputedStyle(document.body).background-color")

  // Click the mode switch
  await page.locator("#switch").click();

  page.waitForTimeout(1000);

  // Expects page to have a different color.
  await expect(page.evaluate("getComputedStyle(document.body).background-color")).not.toBe(color);
});
