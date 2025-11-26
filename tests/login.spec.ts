import { test, expect } from '@playwright/test';

const URL = 'https://www.institutoweb.com.ar/test/login.html';

test.describe('Página de login - InstitutoWeb', () => {
  test('carga y muestra formulario de login', async ({ page }) => {
    const resp = await page.goto(URL);
    expect(resp).not.toBeNull();
    expect(resp && resp.status()).toBeLessThan(400);

    const usuario = page.locator('#tuusuario');
    const clave = page.locator('#tuclave');
    const email = page.locator('#tumail');

    await expect(usuario).toBeVisible();
    await expect(clave).toBeVisible();
    await expect(email).toBeVisible();
  });

  test('completa el formulario y envía', async ({ page }) => {
    await page.goto(URL);

    const usuario = page.locator('#tuusuario');
    const clave = page.locator('#tuclave');
    const email = page.locator('#tumail');
    const submit = page.locator('button:has-text("Ingresar")');

    await usuario.fill('testuser');
    await clave.fill('testpass123');
    await email.fill('test@ejemplo.com');

    await submit.click();
    await page.waitForLoadState('networkidle');
  });

  test('verifica el título después de ingresar', async ({ page }) => {
    await page.goto(URL);

    const usuario = page.locator('#tuusuario');
    const clave = page.locator('#tuclave');
    const email = page.locator('#tumail');
    const submit = page.locator('button:has-text("Ingresar")');

    await usuario.fill('testuser');
    await clave.fill('testpass123');
    await email.fill('test@ejemplo.com');

    await submit.click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveTitle('Hola.');
  });
});

