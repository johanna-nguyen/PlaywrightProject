import { test, expect } from '@playwright/test';

// TC01: Dropdown : Verify that the dropdown is selected when clicked
test('verify dropdown selected', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dropdown');   

  await page.getByRole('combobox').selectOption('Option 1');
  await expect(page.getByRole('combobox')).toHaveValue('1');
})

