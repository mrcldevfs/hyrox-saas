// athlete.test.js
//
// O que estamos testando: a função createAthleteForm()
//
// Ela faz 3 coisas:
//   1. Renderiza um formulário no DOM
//   2. Ao submeter, chama o Supabase para salvar o perfil
//   3. Exibe "Registro concluído!" ou mostra o erro na tela
//
// Vamos testar cada um desses comportamentos de forma isolada.

import { describe, it, expect, vi, beforeEach } from 'vitest'

// ---------------------------------------------------------------------------
// MOCK DO SUPABASE
//
// O Supabase é uma dependência externa — ele faz chamadas de rede reais.
// Em testes, NÃO queremos depender de rede. Queremos controlar o que o
// Supabase "retorna" para simular cenários diferentes (sucesso, erro, etc.)
//
// vi.mock() intercepta o import './supabase' e substitui por um objeto falso
// que controlamos dentro de cada teste.
// ---------------------------------------------------------------------------
vi.mock('./supabase', () => ({
  supabase: {
    from: vi.fn(),
  },
}))

import { supabase } from './supabase'
import { createAthleteForm } from './athlete'

// ---------------------------------------------------------------------------
// HELPER: submitFormulario()
//
// Evita repetição — todo teste precisa preencher e submeter o form.
// Extrai isso numa função reutilizável.
// ---------------------------------------------------------------------------
function submitFormulario() {
  document.querySelector('#birth_date').value = '1990-05-15'
  document.querySelector('#height_cm').value = '180'
  document.querySelector('#weight_kg').value = '80'
  document.querySelector('#category').value = 'Open'
  document.querySelector('#experience_level').value = 'Beginner'

  const evento = new Event('submit')
  evento.preventDefault = vi.fn()
  document.querySelector('#athlete-form').dispatchEvent(evento)
}

// ---------------------------------------------------------------------------
// HELPER: mockSupabaseComSucesso() / mockSupabaseComErro()
//
// O Supabase usa uma cadeia de chamadas:
//   supabase.from('athlete_profiles').insert([...]).select().single()
//
// Precisamos "mockar" cada elo dessa cadeia para simular o resultado.
// ---------------------------------------------------------------------------
function mockSupabaseComSucesso() {
  supabase.from.mockReturnValue({
    insert: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({ error: null }),
      }),
    }),
  })
}

function mockSupabaseComErro(erro) {
  supabase.from.mockReturnValue({
    insert: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({ error: erro }),
      }),
    }),
  })
}

// ---------------------------------------------------------------------------
// SUITE DE TESTES
// ---------------------------------------------------------------------------
describe('createAthleteForm', () => {

  // Antes de cada teste: reseta o DOM e limpa todos os mocks.
  // Isso garante que um teste não influencia o próximo.
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    vi.clearAllMocks()
  })

  // -------------------------------------------------------------------------
  // TESTE 1: Renderização do formulário
  //
  // Verifica se a função monta o HTML correto no DOM.
  // É o teste mais simples — não envolve Supabase.
  // -------------------------------------------------------------------------
  it('renderiza o formulário de perfil na tela', () => {
    createAthleteForm('usuario-id-qualquer')

    // O formulário deve existir no DOM
    expect(document.querySelector('#athlete-form')).not.toBeNull()

    // Todos os campos obrigatórios devem estar presentes
    expect(document.querySelector('#birth_date')).not.toBeNull()
    expect(document.querySelector('#height_cm')).not.toBeNull()
    expect(document.querySelector('#weight_kg')).not.toBeNull()
    expect(document.querySelector('#category')).not.toBeNull()
    expect(document.querySelector('#experience_level')).not.toBeNull()
  })

  // -------------------------------------------------------------------------
  // TESTE 2: Sucesso ao salvar perfil
  //
  // Cenário: Supabase aceita o insert sem erro.
  // Esperado: tela exibe "Registro concluído!" e remove o formulário.
  // -------------------------------------------------------------------------
  it('exibe "Registro concluído!" quando o perfil é salvo com sucesso', async () => {
    mockSupabaseComSucesso()

    createAthleteForm('usuario-id-qualquer')
    submitFormulario()

    await vi.waitFor(() => {
      // O formulário não deve mais existir
      expect(document.querySelector('#athlete-form')).toBeNull()

      // A mensagem de sucesso deve estar visível
      expect(document.querySelector('#app').innerHTML).toContain('Registro concluído!')
    })
  })

  // -------------------------------------------------------------------------
  // TESTE 3: Erro de rede (Failed to fetch)
  //
  // Cenário real que aconteceu em produção — Supabase estava pausado.
  // Esperado: exibe o JSON do erro na tela, formulário permanece visível.
  // -------------------------------------------------------------------------
  it('exibe o erro quando o Supabase não está acessível', async () => {
    const erroDeRede = {
      message: 'TypeError: Failed to fetch',
      details: 'TypeError: Failed to fetch',
      hint: '',
      code: '',
    }

    mockSupabaseComErro(erroDeRede)

    createAthleteForm('usuario-id-qualquer')
    submitFormulario()

    await vi.waitFor(() => {
      const result = document.querySelector('#result')
      expect(result.textContent).toContain('Failed to fetch')
    })
  })

  // -------------------------------------------------------------------------
  // TESTE 4: Erro de tabela não encontrada (PGRST205)
  //
  // Cenário real: tabela 'athlete_profiles' não existe no banco.
  // Esperado: exibe o código de erro na tela.
  // -------------------------------------------------------------------------
  it('exibe o erro quando a tabela não existe no banco (PGRST205)', async () => {
    const erroTabela = {
      message: "Could not find the table 'public.athlete_profiles' in the schema cache",
      details: null,
      hint: null,
      code: 'PGRST205',
    }

    mockSupabaseComErro(erroTabela)

    createAthleteForm('usuario-id-qualquer')
    submitFormulario()

    await vi.waitFor(() => {
      const result = document.querySelector('#result')
      expect(result.textContent).toContain('PGRST205')
    })
  })

  // -------------------------------------------------------------------------
  // TESTE 5: userId é passado corretamente ao Supabase
  //
  // Verifica que o user_id recebido como parâmetro é enviado para o banco.
  // Importante: garante que o perfil é vinculado ao usuário correto.
  // -------------------------------------------------------------------------
  it('envia o userId correto para o Supabase ao salvar', async () => {
    mockSupabaseComSucesso()

    const userId = 'b80f0ea1-336e-4e0a-aeb9-722f1cc4f391'
    createAthleteForm(userId)
    submitFormulario()

    await vi.waitFor(() => {
      // Verifica que supabase.from() foi chamado com a tabela correta
      expect(supabase.from).toHaveBeenCalledWith('athlete_profiles')

      // Verifica que o insert recebeu o userId correto
      const insertMock = supabase.from.mock.results[0].value.insert
      const dadosInseridos = insertMock.mock.calls[0][0][0]
      expect(dadosInseridos.user_id).toBe(userId)
    })
  })

  // -------------------------------------------------------------------------
  // TESTE 6: Campos numéricos vazios (bug NaN)
  //
  // Ciclo TDD:
  //   → este teste foi escrito ANTES da correção no código
  //   → roda agora: FALHA (vermelho)
  //   → corrigimos o athlete.js
  //   → roda de novo: PASSA (verde)
  //
  // Cenário: usuário submete o formulário sem preencher altura e peso.
  // Esperado: exibir mensagem de validação, NÃO chamar o Supabase.
  // -------------------------------------------------------------------------
  it('exibe erro de validação e não chama o Supabase quando altura ou peso estão vazios', async () => {
    createAthleteForm('usuario-id-qualquer')

    // Preenche tudo EXCETO altura e peso
    document.querySelector('#birth_date').value = '1990-05-15'
    document.querySelector('#height_cm').value = ''
    document.querySelector('#weight_kg').value = ''
    document.querySelector('#category').value = 'Open'
    document.querySelector('#experience_level').value = 'Beginner'

    const evento = new Event('submit')
    evento.preventDefault = vi.fn()
    document.querySelector('#athlete-form').dispatchEvent(evento)

    await vi.waitFor(() => {
      // Deve exibir mensagem de erro de validação
      const result = document.querySelector('#result')
      expect(result.textContent).toContain('Altura e peso são obrigatórios')

      // O Supabase NÃO deve ter sido chamado
      expect(supabase.from).not.toHaveBeenCalled()
    })
  })
})
