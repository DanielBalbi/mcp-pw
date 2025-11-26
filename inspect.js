const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.institutoweb.com.ar/test/login.html');

  const inputs = await page.locator('input').all();
  console.log('=== INPUTS ===');
  for (const input of inputs) {
    const id = await input.getAttribute('id');
    const name = await input.getAttribute('name');
    const type = await input.getAttribute('type');
    console.log(`ID: ${id}, NAME: ${name}, TYPE: ${type}`);
  }

  const buttons = await page.locator('button').all();
  console.log('\n=== BUTTONS ===');
  for (const button of buttons) {
    const id = await button.getAttribute('id');
    const text = await button.textContent();
    console.log(`ID: ${id}, TEXT: ${text}`);
  }

  await browser.close();
})();
