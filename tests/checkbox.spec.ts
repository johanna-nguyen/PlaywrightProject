import {test, expect} from '@playwright/test';

// TC01: Checkbox : Verify that the checkbox is checked when clicked
test('checkbox checked', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');

  await page.getByRole('checkbox').first().check();
  await expect(page.getByRole('checkbox').first()).toBeChecked();

  await page.getByRole('checkbox').last().check();
  await expect(page.getByRole('checkbox').last()).toBeChecked();


})

// TC02: Checkbox : Verify that the checkbox is unchecked when clicked
test('checkbox unchecked', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');

  await page.getByRole('checkbox').first().uncheck();
  await expect(page.getByRole('checkbox').first()).not.toBeChecked();

  await page.getByRole('checkbox').last().uncheck();
  await expect(page.getByRole('checkbox').last()).not.toBeChecked();


})

