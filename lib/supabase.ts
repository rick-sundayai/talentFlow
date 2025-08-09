import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!supabaseKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

// Support both new publishable keys and legacy anon keys during migration
if (!supabaseKey.startsWith('sb_publishable_') && !supabaseKey.startsWith('eyJ')) {
  console.warn('Supabase key format not recognized. Expected sb_publishable_... or JWT format.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Type definitions for database tables
export type Database = {
  public: {
    Tables: {
      sales_metrics: {
        Row: {
          id: string
          total_revenue: number
          monthly_revenue: number
          quarterly_revenue: number
          year_over_year_growth: number
          avg_deal_size: number
          conversion_rate: number
          active_pipeline: number
          closed_deals: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['sales_metrics']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['sales_metrics']['Insert']>
      }
      sales_reps: {
        Row: {
          id: string
          name: string
          email: string
          revenue: number
          deals: number
          quota: number
          quota_attainment: number
          rank: number
          trend: 'up' | 'down' | 'stable'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['sales_reps']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['sales_reps']['Insert']>
      }
      recruiting_metrics: {
        Row: {
          id: string
          total_placements: number
          monthly_placements: number
          active_openings: number
          avg_time_to_fill: number
          candidate_conversion: number
          client_satisfaction: number
          active_candidates: number
          total_revenue: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['recruiting_metrics']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['recruiting_metrics']['Insert']>
      }
      recruiters: {
        Row: {
          id: string
          name: string
          email: string
          placements: number
          openings: number
          fill_rate: number
          avg_time_to_fill: number
          rank: number
          trend: 'up' | 'down' | 'stable'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['recruiters']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['recruiters']['Insert']>
      }
      job_openings: {
        Row: {
          id: string
          title: string
          client: string
          location: string
          salary_range: string
          status: 'open' | 'filled' | 'cancelled' | 'on-hold'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          posted_date: string
          days_open: number
          candidates_applied: number
          recruiter_id: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['job_openings']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['job_openings']['Insert']>
      }
    }
  }
}