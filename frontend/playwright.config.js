import { defineConfig } from '@playwright/test'

export default defineConfig({
  testMatch: '**/synthetic.test.js',
  use: {
    headless: true,
    timeout: 30000,
  },
})
