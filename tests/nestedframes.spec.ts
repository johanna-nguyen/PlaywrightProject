import {test, expect} from '@playwright/test';

// TC01: Nested Frames : Verify that the correct text is displayed in the nested frames
test('verify nested frames text', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/nested_frames');

    await page.frameLocator('frame[name="frame-top"]').frameLocator('frame[name="frame-left"]').getByText('LEFT').click();
    await expect(page.frameLocator('frame[name="frame-top"]').frameLocator('frame[name="frame-left"]').locator('body')).toHaveText('LEFT');

    await page.frameLocator('frame[name="frame-top"]').frameLocator('frame[name="frame-middle"]').getByText('MIDDLE').click();
    await expect(page.frameLocator('frame[name="frame-top"]').frameLocator('frame[name="frame-middle"]').locator('body')).toHaveText('MIDDLE');

    await page.frameLocator('frame[name="frame-top"]').frameLocator('frame[name="frame-right"]').getByText('RIGHT').click();
    await expect(page.frameLocator('frame[name="frame-top"]').frameLocator('frame[name="frame-right"]').locator('body')).toHaveText('RIGHT');

    await page.frameLocator('frame[name="frame-bottom"]').getByText('BOTTOM').click();
    await expect(page.frameLocator('frame[name="frame-bottom"]').locator('body')).toHaveText('BOTTOM');
})