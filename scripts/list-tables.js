const { createClient } = require('@supabase/supabase-js')

async function listTables() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials!')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  console.log('🔍 Checking what tables exist in your Supabase database...\n')

  try {
    // Method 1: Try to query system tables directly with RPC
    console.log('📋 Attempting to list all tables...')
    
    const { data: rpcResult, error: rpcError } = await supabase
      .rpc('exec', {
        sql: `
          SELECT schemaname, tablename, tableowner 
          FROM pg_catalog.pg_tables 
          WHERE schemaname IN ('public', 'auth', 'storage')
          ORDER BY schemaname, tablename;
        `
      })

    if (rpcResult) {
      console.log('✅ Found tables via RPC:')
      console.log(rpcResult)
    } else if (rpcError) {
      console.log('⚠️  RPC method failed:', rpcError.message)
    }

  } catch (error) {
    console.log('⚠️  RPC not available:', error.message)
  }

  // Method 2: Test specific tables we know should exist
  console.log('\n🧪 Testing for common Supabase tables...')
  
  const knownTables = [
    'auth.users',
    'auth.sessions', 
    'storage.objects',
    'storage.buckets'
  ]

  for (const table of knownTables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(0) // Just test if table exists, don't return data

      if (error) {
        console.log(`❌ ${table}: ${error.message}`)
      } else {
        console.log(`✅ ${table}: Table exists`)
      }
    } catch (err) {
      console.log(`❌ ${table}: ${err.message}`)
    }
  }

  // Method 3: Test our custom tables
  console.log('\n📊 Testing for TalentFlow custom tables...')
  
  const customTables = [
    'sales_metrics',
    'sales_reps', 
    'recruiting_metrics',
    'recruiters',
    'job_openings',
    'pipeline_stages',
    'recruiting_stages',
    'deals',
    'candidate_activities'
  ]

  let existingCustomTables = []
  let missingCustomTables = []

  for (const table of customTables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1)

      if (error) {
        if (error.message.includes('does not exist')) {
          missingCustomTables.push(table)
          console.log(`❌ ${table}: Not created yet`)
        } else {
          console.log(`⚠️  ${table}: ${error.message}`)
        }
      } else {
        existingCustomTables.push(table)
        console.log(`✅ ${table}: Exists with ${data.length} records`)
      }
    } catch (err) {
      missingCustomTables.push(table)
      console.log(`❌ ${table}: ${err.message}`)
    }
  }

  // Summary
  console.log('\n📊 SUMMARY:')
  console.log(`✅ Custom tables found: ${existingCustomTables.length}`)
  console.log(`❌ Custom tables missing: ${missingCustomTables.length}`)
  
  if (existingCustomTables.length > 0) {
    console.log('\n✅ Existing custom tables:', existingCustomTables.join(', '))
  }
  
  if (missingCustomTables.length > 0) {
    console.log('\n❌ Missing custom tables:', missingCustomTables.join(', '))
    console.log('\n📝 To create missing tables:')
    console.log('1. Go to https://supabase.com/dashboard/project/iewfpcivgvrnujgsarxa/sql')
    console.log('2. Copy and paste contents from supabase/schema.sql')
    console.log('3. Click "Run" to create all tables and sample data')
  }

  if (existingCustomTables.length === customTables.length) {
    console.log('\n🎉 All TalentFlow tables are set up! You can switch to database mode:')
    console.log('Set NEXT_PUBLIC_USE_SUPABASE=true in your .env.local')
  }
}

// Load environment variables
require('dotenv').config({ path: '.env.local' })
listTables().catch(console.error)