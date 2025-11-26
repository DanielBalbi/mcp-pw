import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const URL = 'https://www.institutoweb.com.ar/test/login.html';
const LOG_FILE = path.join(__dirname, '../test-execution.log');

function writeLog(message: string) {
  const timestamp = new Date().toLocaleString('es-AR');
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(LOG_FILE, logMessage);
}

test.describe('Link de Cerrar Sesión', () => {
 

  test('verifica que existe y está visible el link "Cerrar Sesión" después de ingresar', async ({ page }) => {
    try {
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

      const logoutLink = page.locator('#volver');
      await expect(logoutLink).toBeVisible();

      writeLog('✓ Test ejecutado exitosamente - Link "Cerrar Sesión" encontrado y visible');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      writeLog(`✗ Error en el test: ${errorMessage}`);
      throw error;
    }
  });

  test('verifica que el elemento #volver contiene el texto "Cerrar Sesión"', async ({ page }) => {
    try {
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

      const logoutLink = page.locator('#volver');
      await expect(logoutLink).toBeVisible();
      await expect(logoutLink).toContainText('Cerrar Sesión');

      writeLog('✓ Test ejecutado exitosamente - Elemento #volver está visible y contiene "Cerrar Sesión"');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      writeLog(`✗ Error en el test: ${errorMessage}`);
      throw error;
    }
  });
});
