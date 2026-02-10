// frontend/users.js
import { supabase } from './supabase'

export function createUsersForm() {
  const app = document.querySelector('#app')

  app.innerHTML = `
    <h1>Create User</h1>

    <form id="user-form">
      <input type="text" id="name" placeholder="Name" />
      <input type="email" id="email" placeholder="Email" required />
      <button type="submit">Create User</button>
    </form>

    <pre id="result"></pre>
  `

  const form = document.querySelector('#user-form')
  const result = document.querySelector('#result')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value

    // Inserir usuário
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email }])
      .select()
      .single()

    if (error) {
      result.textContent = JSON.stringify(error, null, 2)
    } else {
      // Redireciona para a segunda página de registro (perfil de atleta)
      import('./athlete.js').then(module => {
        module.createAthleteForm(data.id)
      })
    }
  })
}
