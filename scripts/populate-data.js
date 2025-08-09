const { createClient } = require('@supabase/supabase-js')

async function populateData() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials!')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  console.log('🚀 Populating TalentFlow database with sample data...\n')

  try {
    // Populate Sales Representatives
    console.log('👥 Adding sales representatives...')
    const { data: salesReps, error: salesRepsError } = await supabase
      .from('sales_reps')
      .insert([
        {
          name: 'Sarah Johnson',
          email: 'sarah.johnson@talentflow.com',
          revenue: 547000,
          deals: 12,
          quota: 500000,
          quota_attainment: 109.4,
          rank: 1,
          trend: 'up'
        },
        {
          name: 'Michael Chen',
          email: 'michael.chen@talentflow.com',
          revenue: 423000,
          deals: 9,
          quota: 450000,
          quota_attainment: 94.0,
          rank: 2,
          trend: 'up'
        },
        {
          name: 'Emma Rodriguez',
          email: 'emma.rodriguez@talentflow.com',
          revenue: 398000,
          deals: 11,
          quota: 480000,
          quota_attainment: 82.9,
          rank: 3,
          trend: 'stable'
        },
        {
          name: 'David Kim',
          email: 'david.kim@talentflow.com',
          revenue: 367000,
          deals: 8,
          quota: 420000,
          quota_attainment: 87.4,
          rank: 4,
          trend: 'down'
        }
      ])
      .select()

    if (salesRepsError) {
      console.error('❌ Error adding sales reps:', salesRepsError.message)
    } else {
      console.log(`✅ Added ${salesReps.length} sales representatives`)
    }

    // Populate Recruiters
    console.log('🎯 Adding recruiters...')
    const { data: recruiters, error: recruitersError } = await supabase
      .from('recruiters')
      .insert([
        {
          name: 'Sarah Johnson',
          email: 'sarah.johnson@talentflow.com',
          placements: 47,
          openings: 12,
          fill_rate: 89.2,
          avg_time_to_fill: 24,
          rank: 1,
          trend: 'up'
        },
        {
          name: 'Michael Chen',
          email: 'michael.chen@talentflow.com',
          placements: 32,
          openings: 8,
          fill_rate: 92.1,
          avg_time_to_fill: 21,
          rank: 2,
          trend: 'up'
        },
        {
          name: 'Emma Rodriguez',
          email: 'emma.rodriguez@talentflow.com',
          placements: 38,
          openings: 15,
          fill_rate: 76.8,
          avg_time_to_fill: 32,
          rank: 3,
          trend: 'stable'
        },
        {
          name: 'David Kim',
          email: 'david.kim@talentflow.com',
          placements: 30,
          openings: 10,
          fill_rate: 85.4,
          avg_time_to_fill: 29,
          rank: 4,
          trend: 'down'
        }
      ])
      .select()

    if (recruitersError) {
      console.error('❌ Error adding recruiters:', recruitersError.message)
    } else {
      console.log(`✅ Added ${recruiters.length} recruiters`)
    }

    // Populate Pipeline Stages
    console.log('📊 Adding pipeline stages...')
    const { data: pipelineStages, error: pipelineError } = await supabase
      .from('pipeline_stages')
      .insert([
        { name: 'Prospects', deals: 24, value: 832000, color: 'bg-slate-400', stage_order: 1 },
        { name: 'Qualified', deals: 18, value: 645000, color: 'bg-sky-400', stage_order: 2 },
        { name: 'Proposal', deals: 12, value: 423000, color: 'bg-amber-400', stage_order: 3 },
        { name: 'Negotiation', deals: 8, value: 287000, color: 'bg-orange-400', stage_order: 4 },
        { name: 'Closed Won', deals: 5, value: 178000, color: 'bg-emerald-400', stage_order: 5 }
      ])
      .select()

    if (pipelineError) {
      console.error('❌ Error adding pipeline stages:', pipelineError.message)
    } else {
      console.log(`✅ Added ${pipelineStages.length} pipeline stages`)
    }

    // Populate Recruiting Stages
    console.log('🎯 Adding recruiting stages...')
    const { data: recruitingStages, error: recruitingError } = await supabase
      .from('recruiting_stages')
      .insert([
        { name: 'Applied', candidates: 892, conversion_rate: 45.2, color: 'bg-slate-400', stage_order: 1 },
        { name: 'Screening', candidates: 403, conversion_rate: 68.4, color: 'bg-sky-400', stage_order: 2 },
        { name: 'Interview', candidates: 276, conversion_rate: 42.1, color: 'bg-amber-400', stage_order: 3 },
        { name: 'Offer', candidates: 116, conversion_rate: 78.4, color: 'bg-orange-400', stage_order: 4 },
        { name: 'Hired', candidates: 91, conversion_rate: 100, color: 'bg-emerald-400', stage_order: 5 }
      ])
      .select()

    if (recruitingError) {
      console.error('❌ Error adding recruiting stages:', recruitingError.message)
    } else {
      console.log(`✅ Added ${recruitingStages.length} recruiting stages`)
    }

    // Get recruiter IDs for job openings
    const { data: recruiterIds } = await supabase
      .from('recruiters')
      .select('id')
      .limit(4)

    if (recruiterIds && recruiterIds.length > 0) {
      // Populate Job Openings
      console.log('💼 Adding job openings...')
      const { data: jobOpenings, error: jobError } = await supabase
        .from('job_openings')
        .insert([
          {
            title: 'Senior Software Engineer',
            client: 'TechCorp Solutions',
            location: 'San Francisco, CA',
            salary_range: '$120k - $180k',
            status: 'open',
            priority: 'high',
            posted_date: '2024-01-10',
            days_open: 15,
            candidates_applied: 47,
            recruiter_id: recruiterIds[0].id
          },
          {
            title: 'Data Scientist',
            client: 'FinanceFirst Inc.',
            location: 'New York, NY',
            salary_range: '$110k - $160k',
            status: 'open',
            priority: 'urgent',
            posted_date: '2024-01-08',
            days_open: 17,
            candidates_applied: 32,
            recruiter_id: recruiterIds[1].id
          },
          {
            title: 'Product Manager',
            client: 'MedTech Innovations',
            location: 'Remote',
            salary_range: '$130k - $170k',
            status: 'open',
            priority: 'medium',
            posted_date: '2024-01-12',
            days_open: 13,
            candidates_applied: 28,
            recruiter_id: recruiterIds[2].id
          },
          {
            title: 'Marketing Director',
            client: 'GrowthCo',
            location: 'Austin, TX',
            salary_range: '$95k - $140k',
            status: 'filled',
            priority: 'high',
            posted_date: '2024-01-05',
            days_open: 20,
            candidates_applied: 56,
            recruiter_id: recruiterIds[0].id
          }
        ])
        .select()

      if (jobError) {
        console.error('❌ Error adding job openings:', jobError.message)
      } else {
        console.log(`✅ Added ${jobOpenings.length} job openings`)
      }

      // Populate Candidate Activities
      console.log('📋 Adding candidate activities...')
      const { data: activities, error: activitiesError } = await supabase
        .from('candidate_activities')
        .insert([
          {
            candidate_name: 'Alex Thompson',
            action: 'hired',
            job_title: 'Senior Software Engineer',
            client: 'TechCorp Solutions',
            recruiter_id: recruiterIds[0].id
          },
          {
            candidate_name: 'Maria Garcia',
            action: 'interviewed',
            job_title: 'Data Scientist',
            client: 'FinanceFirst Inc.',
            recruiter_id: recruiterIds[1].id
          },
          {
            candidate_name: 'James Wilson',
            action: 'offered',
            job_title: 'Product Manager',
            client: 'MedTech Innovations',
            recruiter_id: recruiterIds[2].id
          },
          {
            candidate_name: 'Sarah Lee',
            action: 'screened',
            job_title: 'Marketing Director',
            client: 'GrowthCo',
            recruiter_id: recruiterIds[0].id
          }
        ])
        .select()

      if (activitiesError) {
        console.error('❌ Error adding candidate activities:', activitiesError.message)
      } else {
        console.log(`✅ Added ${activities.length} candidate activities`)
      }
    }

    // Get sales rep IDs for deals
    const { data: salesRepIds } = await supabase
      .from('sales_reps')
      .select('id')
      .limit(3)

    if (salesRepIds && salesRepIds.length > 0) {
      // Populate Deals
      console.log('💰 Adding deals...')
      const { data: deals, error: dealsError } = await supabase
        .from('deals')
        .insert([
          {
            client_name: 'TechCorp Solutions',
            value: 85000,
            stage: 'closed-won',
            probability: 100,
            close_date: '2024-01-15',
            sales_rep_id: salesRepIds[0].id,
            industry: 'Technology',
            source: 'Referral'
          },
          {
            client_name: 'FinanceFirst Inc.',
            value: 67000,
            stage: 'negotiation',
            probability: 75,
            close_date: '2024-01-25',
            sales_rep_id: salesRepIds[1].id,
            industry: 'Finance',
            source: 'Inbound'
          },
          {
            client_name: 'MedTech Innovations',
            value: 92000,
            stage: 'proposal',
            probability: 60,
            close_date: '2024-02-01',
            sales_rep_id: salesRepIds[2].id,
            industry: 'Healthcare',
            source: 'Cold Outreach'
          }
        ])
        .select()

      if (dealsError) {
        console.error('❌ Error adding deals:', dealsError.message)
      } else {
        console.log(`✅ Added ${deals.length} deals`)
      }
    }

    console.log('\n🎉 Database population complete!')
    console.log('🚀 Your dashboards now have live Supabase data!')
    console.log('💡 Visit http://localhost:3001 to see your data in action!')

  } catch (error) {
    console.error('❌ Population failed:', error.message)
    process.exit(1)
  }
}

// Load environment variables
require('dotenv').config({ path: '.env.local' })
populateData()