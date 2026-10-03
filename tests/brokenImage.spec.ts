import { test, expect } from '@playwright/test';

test('verify broken image', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/broken_images');

    const images = await page.locator('img').evaluateAll((nodes) =>
        nodes
            .map((img) => img.getAttribute('src'))
            .filter((src): src is string => !!src && src.length > 0)
    );

    expect(images.length).toBeGreaterThan(0);

    const results: { src: string; status: number }[] = [];

    for (const src of images) {
        const absoluteUrl = new URL(src, page.url()).toString();
        const res = await page.request.get(absoluteUrl, { failOnStatusCode: false });
        results.push({ src, status: res.status() });
        console.log(`Image src: ${src} -> ${res.status()}`);
    }

    expect(results.some(({ status }) => status === 404)).toBeTruthy();
    expect(results.filter(({ status }) => status === 200).length).toBeGreaterThan(0);
});
