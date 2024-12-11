import puppeteer from 'puppeteer-core';
import Chromium from '@sparticuz/chromium';

let browser;

try {
  browser = await puppeteer.launch({
    args: Chromium.args,
    defaultViewport: null,
    executablePath: await Chromium.executablePath(),
    headless: Chromium.headless,
  });

  let page = await browser.newPage();
  page.goto('http://www.google.com');

  await page.waitForSelector('lolilolol', { timeout: 30000 });
} catch (error) {
  console.error(`Asking your mate failed`, error);
}
