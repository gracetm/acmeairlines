import { test, expect } from '@playwright/test';

test('destination search, tabs, trip form, and FAQs work', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByLabel('Where do you want to fly?')).toBeVisible();
  await page.getByLabel('Where do you want to fly?').fill('spa');
  await expect(page.getByRole('button', { name: 'Space', exact: true })).not.toBeVisible();
  await page.getByLabel('Where do you want to fly?').fill('Space');
  await page.getByRole('button', { name: 'Space', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Explore Space' })).toBeVisible();
  await expect(page.getByRole('dialog').getByLabel('From')).toHaveValue('SIN');
  await page.getByRole('dialog').getByLabel('From').selectOption('DAC');
  await expect(page.getByRole('dialog').getByLabel('From')).toHaveValue('DAC');
  await page.getByLabel('Departure').fill('2027-05-20');
  await page.getByRole('button', { name: 'Explore this trip' }).click();
  await expect(page.getByRole('heading', { name: 'To infinity and beyond ~' })).toBeVisible();
  await expect(page.locator('.buzz-lightyear')).toBeVisible();
  await page.mouse.move(700, 500);
  await expect(page.locator('.space-cursor-sparkles .cursor-sparkle')).toBeVisible();
  await expect(page.locator('.hero')).toHaveClass(/space-mode/);
  await page.keyboard.press('Escape');
  await expect(page.locator('.hero')).not.toHaveClass(/space-mode/);
  await page.getByLabel('Where do you want to fly?').fill('zzzz');
  await expect(page.getByText('No destinations found')).toBeVisible();
  await page.getByLabel('Where do you want to fly?').fill('Toronto');
  await page.getByRole('button', { name: 'Toronto', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Let’s go to Toronto' })).toBeVisible();
  await page.getByLabel('Departure').fill('2027-05-20');
  await page.getByRole('button', { name: 'Explore this trip' }).click();
  await expect(page.getByText('Your trip is ready to explore')).toBeVisible();
  await page.getByRole('button', { name: 'Keep exploring' }).click();
  const domesticPhoto = await page.locator('.destination-card').first().locator('img').getAttribute('src');
  await page.getByRole('group', { name: 'Destination region' }).getByRole('button', { name: 'International' }).click();
  await expect(page.locator('.destination-card').first()).toHaveText('Singapore');
  await expect(page.locator('.destination-card').first().locator('img')).not.toHaveAttribute('src', domesticPhoto ?? '');
  await page.getByRole('group', { name: 'Flight region' }).getByRole('button', { name: 'International' }).click();
  await expect(page.locator('.flight-route').first()).toContainText('Singapore');
  await page.getByLabel('Departing from').selectOption('DXB');
  await expect(page.locator('.flight-route').first()).toContainText('Dubai');
  await page.getByText('Q. What is Acme Air Flight?').click();
  await expect(page.getByText('Acme Air brings destination inspiration')).toBeVisible();
  await page.getByText('Q. What is Acme Air Flight?').click();
  await expect(page.getByText('Acme Air brings destination inspiration')).not.toBeVisible();
});

test('account, support, partner, newsletter, and download demo states work', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Register', exact: true }).click();
  await page.getByLabel('Your name').fill('Demo Traveler');
  await page.getByLabel('Email address', { exact: true }).fill('demo@example.com');
  await page.getByLabel('Password').fill('demo-password');
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByText('You’re all set!')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await page.getByRole('button', { name: 'Let’s Chat Now' }).click();
  await expect(page.getByLabel('How can we help?')).toBeVisible();
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Become a partner' }).click();
  await expect(page.getByLabel('Business name')).toBeVisible();
  await page.keyboard.press('Escape');
  await page.getByLabel('Your email address', { exact: true }).fill('demo@example.com');
  await page.getByRole('button', { name: 'Subscribe to travel updates' }).click();
  await expect(page.getByText('Thanks! You’re on the demo list.')).toBeVisible();
  await page.getByRole('button', { name: 'Download on the App Store' }).click();
  await expect(page.getByText('App Store and Google Play releases are not yet available.', { exact: false })).toBeVisible();
});

test('mobile navigation and modal keyboard focus work', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'Destinations' }).click();
  await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveAttribute('aria-expanded', 'false');
  await page.getByRole('button', { name: 'Gopalpur', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Gopalpur', exact: true })).toBeFocused();
});

test('search placeholder and both scope states meet text contrast requirements', async ({ page }) => {
  await page.goto('/');
  const ratios = await page.evaluate(() => {
    function luminance(color: string) {
      const channels = color.match(/[\d.]+/g)!.slice(0, 3).map(Number).map(value => {
        const channel = value / 255;
        return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
      });
      return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
    }
    function contrast(foreground: string, background: string) {
      const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
      return (values[0] + .05) / (values[1] + .05);
    }
    const input = document.querySelector('#destination-search')!;
    return [
      contrast(getComputedStyle(input, '::placeholder').color, getComputedStyle(input.closest('form')!).backgroundColor),
      ...[...document.querySelectorAll('.scope-tab')].map(tab => contrast(getComputedStyle(tab).color, getComputedStyle(tab).backgroundColor)),
    ];
  });
  for (const ratio of ratios) expect(ratio).toBeGreaterThanOrEqual(4.5);
});

for (const [name, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844], ['user-1070', 1070, 900]] as const) {
  test(`${name} has loaded imagery, no overflow, and no runtime errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await page.evaluate(async () => {
      await document.fonts.ready;
      document.querySelectorAll('img').forEach(image => { image.loading = 'eager'; });
      await Promise.all([...document.images].map(image => image.decode()));
    });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(page.locator('h1')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
    await page.screenshot({ path: `.impeccable/review/${name}.png`, fullPage: true, animations: 'disabled' });
  });
}
