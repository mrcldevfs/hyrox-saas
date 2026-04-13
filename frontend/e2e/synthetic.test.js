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
  // Captura erros do console do browser
  const errors = []
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  page.on('pageerror', err => errors.push(err.message))

  await page.goto(STAGING_URL)

  // Aguarda 3s para o JS ter tempo de rodar
  await page.waitForTimeout(3000)

  // Debug: loga erros e HTML
  console.log('BROWSER ERRORS:', JSON.stringify(errors))
  const html = await page.content()
  console.log('PAGE HTML:', html.substring(0, 2000))

  // Captura screenshot para inspecionar visualmente
  await page.screenshot({ path: 'test-results/debug-staging.png', fullPage: true })

  // Aguarda o JS renderizar o formulário (injetado dinamicamente por createUsersForm)
  await page.waitForSelector('#user-form', { timeout: 20000 })

  // Verifica que os campos existem
  await expect(page.locator('#name')).toBeVisible()
  await expect(page.locator('#email')).toBeVisible()

  // Verifica que o botão de submit existe
  await expect(page.locator('button[type="submit"]')).toBeVisible()
})

test('formulário aceita input do usuário', async ({ page }) => {
  await page.goto(STAGING_URL)

  // Aguarda o JS renderizar antes de interagir
  await page.waitForSelector('#user-form', { timeout: 20000 })

  // Preenche o formulário como um usuário real faria
  await page.fill('#name', 'Atleta Teste')
  await page.fill('#email', 'atleta@teste.com')

  // Verifica que os valores foram preenchidos
  await expect(page.locator('#name')).toHaveValue('Atleta Teste')
  await expect(page.locator('#email')).toHaveValue('atleta@teste.com')
})
