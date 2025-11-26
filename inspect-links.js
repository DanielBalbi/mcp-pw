const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.institutoweb.com.ar/test/login.html');

  const usuario = page.locator('#tuusuario');
  const clave = page.locator('#tuclave');
  const email = page.locator('#tumail');
  const submit = page.locator('button:has-text("Ingresar")');

  await usuario.fill('testuser');
  await clave.fill('testpass123');
  await email.fill('test@ejemplo.com');
  await submit.click();
  await page.waitForLoadState('networkidle');

  const links = await page.locator('a').all();
  console.log('=== LINKS ===');
  for (const link of links) {
    const text = await link.textContent();
    const id = await link.getAttribute('id');
    console.log(`TEXT: ${text?.trim()}, ID: ${id}`);
  }

  await browser.close();
})();
