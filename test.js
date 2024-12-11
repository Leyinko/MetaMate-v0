import puppeteer from 'puppeteer';

let browser;

try {
  browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process', '--no-sandbox', '--disable-setuid-sandbox', '--start-maximized'],
    ignoreHTTPSErrors: true,
  });

  let page = await browser.newPage();
  page.goto('http://www.google.com');

  await page.waitForSelector('lolilolol', { timeout: 30000 });
} catch (error) {
  console.error(`Asking your mate failed`, error);
}
