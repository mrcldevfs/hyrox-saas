import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://xrynrufldpqeiapszmqq.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_t231Vr1kZN4jIyNrucu28A_mair5qBe'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

