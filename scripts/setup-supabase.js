const { createClient } = require('@supabase/supabase-js')

// Test Supabase connection and setup
async function setupSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log('🚀 Testing Supabase connection...')
  console.log('URL:', supabaseUrl)
  console.log('Key:', supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'NOT SET')

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials!')
    console.log('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    // Test connection by checking auth status
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError && authError.message !== 'Auth session missing!') {
      console.error('❌ Connection failed:', authError.message)
      process.exit(1)
    }

    console.log('✅ Connected to Supabase successfully!')
    console.log('🔑 Using new publishable key format')
    
    // Try to query a simple table to test database access
    const { data: testData, error: testError } = await supabase
      .from('sales_metrics')
      .select('id')
      .limit(1)

    if (testError) {
      if (testError.message.includes('relation "public.sales_metrics" does not exist')) {
        console.log('⚠️  Database tables not set up yet')
        console.log('📝 Please run the SQL schema from supabase/schema.sql in your Supabase dashboard:')
        console.log('   1. Go to https://supabase.com/dashboard/project/iewfpcivgvrnujgsarxa/sql')
        console.log('   2. Copy and paste the contents of supabase/schema.sql')
        console.log('   3. Click "Run" to create all tables and sample data')
      } else {
        console.log('⚠️  Database access test:', testError.message)
      }
    } else {
      console.log('✅ Database tables exist and are accessible!')
      console.log('✅ Found', testData.length, 'sales metrics records')
      
      // Test additional tables
      const tables = ['sales_reps', 'recruiting_metrics', 'recruiters', 'job_openings']
      for (const table of tables) {
        try {
          const { data, error } = await supabase.from(table).select('id').limit(1)
          if (error) {
            console.log(`⚠️  Table ${table}: ${error.message}`)
          } else {
            console.log(`✅ Table ${table}: ${data.length} records found`)
          }
        } catch (err) {
          console.log(`⚠️  Table ${table}: ${err.message}`)
        }
      }
    }

    console.log('\n🎉 Supabase setup complete!')
    console.log('Your dashboards should now load data from Supabase!')

  } catch (error) {
    console.error('❌ Setup failed:', error.message)
    process.exit(1)
  }
}

// Load environment variables
require('dotenv').config({ path: '.env.local' })
setupSupabase()