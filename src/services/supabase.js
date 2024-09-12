import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://cwaiddzadqxbuxfbhfvi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YWlkZHphZHF4YnV4ZmJoZnZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4MTYxODcsImV4cCI6MjA0MDM5MjE4N30.rQJYYDUShbef_pyeMvWO3RQ6CsdaCGwxdI3RbhLQupg'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase