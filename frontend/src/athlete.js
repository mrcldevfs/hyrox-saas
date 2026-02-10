// frontend/athlete.js
import { supabase } from './supabase'

export function createAthleteForm(userId) {
  const app = document.querySelector('#app')

  app.innerHTML = `
    <h1>Complete Athlete Profile</h1>

    <form id="athlete-form">
      <input type="date" id="birth_date" placeholder="Birth Date" required />
      <input type="number" id="height_cm" placeholder="Height (cm)" required />
      <input type="number" id="weight_kg" placeholder="Weight (kg)" required />
      <input type="text" id="category" placeholder="Category" />
      <input type="text" id="experience_level" placeholder="Experience Level" />
      <button type="submit">Save Profile</button>
    </form>

    <pre id="result"></pre>
  `

  const form = document.querySelector('#athlete-form')
  const result = document.querySelector('#result')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const birth_date = document.querySelector('#birth_date').value
    const height_cm = parseInt(document.querySelector('#height_cm').value)
    const weight_kg = parseInt(document.querySelector('#weight_kg').value)
    const category = document.querySelector('#category').value
    const experience_level = document.querySelector('#experience_level').value

    const { data, error } = await supabase
      .from('athlete_profiles') // tabela correta
      .insert([{
        user_id: userId,
        birth_date,
        height_cm,
        weight_kg,
        category,
        experience_level
      }])
      .select()
      .single()

    if (error) {
      result.textContent = JSON.stringify(error, null, 2)
    } else {
      result.textContent = "Profile saved:\n" + JSON.stringify(data, null, 2)
    }
  })
}
