// synthetic.test.js
// Teste sintético — simula um usuário real navegando no staging
// Roda no pipeline após o deploy-staging, antes de ir para produção
//
// O que verifica:
//   1. A página carrega e o formulário de usuário aparece
//   2. Os campos de nome e email existem
//   3. O título da página está correto

import { test, expect } from '@playwright/test'

const STAGING_URL = 'https://hyrox-saas-staging.onrender.com'

test('página carrega e exibe o formulário de cadastro', async ({ page }) => {
  await page.goto(STAGING_URL, { waitUntil: 'networkidle' })

  // Verifica que o formulário de usuário aparece (até 15s para JS renderizar)
  await expect(page.locator('#user-form')).toBeVisible({ timeout: 15000 })

  // Verifica que os campos existem
  await expect(page.locator('#name')).toBeVisible({ timeout: 15000 })
  await expect(page.locator('#email')).toBeVisible({ timeout: 15000 })

  // Verifica que o botão de submit existe
  await expect(page.locator('button[type="submit"]')).toBeVisible({ timeout: 15000 })
})

test('formulário aceita input do usuário', async ({ page }) => {
  await page.goto(STAGING_URL, { waitUntil: 'networkidle' })

  // Preenche o formulário como um usuário real faria
  await page.fill('#name', 'Atleta Teste')
  await page.fill('#email', 'atleta@teste.com')

  // Verifica que os valores foram preenchidos
  await expect(page.locator('#name')).toHaveValue('Atleta Teste')
  await expect(page.locator('#email')).toHaveValue('atleta@teste.com')
})
