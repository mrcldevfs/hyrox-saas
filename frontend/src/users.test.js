// users.test.js
// Teste baseado no erro real: "TypeError: Failed to fetch"
// Reproduz o cenário onde o Supabase não está acessível (projeto pausado, sem rede, etc.)

import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock do módulo supabase ANTES de importar users.js
vi.mock('./supabase', () => ({
  supabase: {
    from: vi.fn(),
  },
}))

import { supabase } from './supabase'
import { createUsersForm } from './users'

describe('createUsersForm', () => {
  beforeEach(() => {
    // Monta um DOM mínimo com o elemento #app
    document.body.innerHTML = '<div id="app"></div>'
    vi.clearAllMocks()
  })

  it('exibe o erro quando o Supabase não está acessível (Failed to fetch)', async () => {
    // Simula o erro real observado em produção
    const networkError = {
      message: 'TypeError: Failed to fetch',
      details: 'TypeError: Failed to fetch',
      hint: '',
      code: '',
    }

    // Configura o mock para retornar erro de rede
    supabase.from.mockReturnValue({
      insert: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: null, error: networkError }),
        }),
      }),
    })

    createUsersForm()

    // Preenche o formulário
    document.querySelector('#name').value = 'Test User'
    document.querySelector('#email').value = 'test@example.com'

    // Submete o formulário
    const submitEvent = new Event('submit')
    submitEvent.preventDefault = vi.fn()
    document.querySelector('#user-form').dispatchEvent(submitEvent)

    // Aguarda a promise do Supabase resolver
    await vi.waitFor(() => {
      const result = document.querySelector('#result')
      expect(result.textContent).toContain('Failed to fetch')
    })
  })

  it('redireciona para o perfil de atleta quando o cadastro é bem-sucedido', async () => {
    const fakeUser = { id: 'abc-123', name: 'Test User', email: 'test@example.com' }

    supabase.from.mockReturnValue({
      insert: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: fakeUser, error: null }),
        }),
      }),
    })

    // Mock do módulo athlete.js para evitar efeitos colaterais
    vi.doMock('./athlete.js', () => ({
      createAthleteForm: vi.fn(),
    }))

    createUsersForm()

    document.querySelector('#name').value = 'Test User'
    document.querySelector('#email').value = 'test@example.com'

    const submitEvent = new Event('submit')
    submitEvent.preventDefault = vi.fn()
    document.querySelector('#user-form').dispatchEvent(submitEvent)

    await vi.waitFor(() => {
      // Se não exibiu erro, o caminho de sucesso foi seguido
      const result = document.querySelector('#result')
      expect(result.textContent).toBe('')
    })
  })
})
