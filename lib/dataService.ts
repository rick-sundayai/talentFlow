import { supabase } from './supabase'
import salesData from '../app/data/salesData.json'
import recruitingData from '../app/data/recruitingData.json'

// Environment flag to switch between JSON and Supabase
const USE_SUPABASE = process.env.NEXT_PUBLIC_USE_SUPABASE === 'true'

// Sales Data Functions
export async function getSalesMetrics() {
  if (USE_SUPABASE) {
    const { data, error } = await supabase
      .from('sales_metrics')
      .select('*')
      .single()
    
    if (error) {
      console.error('Error fetching sales metrics:', error)
      return salesData.salesMetrics
    }
    
    return {
      totalRevenue: data.total_revenue,
      monthlyRevenue: data.monthly_revenue,
      quarterlyRevenue: data.quarterly_revenue,
      yearOverYearGrowth: data.year_over_year_growth,
      avgDealSize: data.avg_deal_size,
      conversionRate: data.conversion_rate,
      activePipeline: data.active_pipeline,
      closedDeals: data.closed_deals
    }
  }
  
  return salesData.salesMetrics
}

export async function getSalesReps() {
  if (USE_SUPABASE) {
    const { data, error } = await supabase
      .from('sales_reps')
      .select('*')
      .order('rank', { ascending: true })
    
    if (error) {
      console.error('Error fetching sales reps:', error)
      return salesData.salesReps
    }
    
    return data.map(rep => ({
      id: rep.id,
      name: rep.name,
      email: rep.email,
      revenue: rep.revenue,
      deals: rep.deals,
      quota: rep.quota,
      quotaAttainment: rep.quota_attainment,
      rank: rep.rank,
      trend: rep.trend
    }))
  }
  
  return salesData.salesReps
}

export async function getPipelineStages() {
  if (USE_SUPABASE) {
    // For now, return JSON data - implement pipeline_stages table later
    return salesData.pipelineStages
  }
  
  return salesData.pipelineStages
}

export async function getRecentDeals() {
  if (USE_SUPABASE) {
    // For now, return JSON data - implement deals table later
    return salesData.recentDeals
  }
  
  return salesData.recentDeals
}

// Recruiting Data Functions
export async function getRecruitingMetrics() {
  if (USE_SUPABASE) {
    const { data, error } = await supabase
      .from('recruiting_metrics')
      .select('*')
      .single()
    
    if (error) {
      console.error('Error fetching recruiting metrics:', error)
      return recruitingData.recruitingMetrics
    }
    
    return {
      totalPlacements: data.total_placements,
      monthlyPlacements: data.monthly_placements,
      activeOpenings: data.active_openings,
      avgTimeToFill: data.avg_time_to_fill,
      candidateConversion: data.candidate_conversion,
      clientSatisfaction: data.client_satisfaction,
      activeCandidates: data.active_candidates,
      totalRevenue: data.total_revenue
    }
  }
  
  return recruitingData.recruitingMetrics
}

export async function getRecruiterPerformance() {
  if (USE_SUPABASE) {
    const { data, error } = await supabase
      .from('recruiters')
      .select('*')
      .order('rank', { ascending: true })
    
    if (error) {
      console.error('Error fetching recruiter performance:', error)
      return recruitingData.recruiterPerformance
    }
    
    return data.map(recruiter => ({
      id: recruiter.id,
      name: recruiter.name,
      email: recruiter.email,
      placements: recruiter.placements,
      openings: recruiter.openings,
      fillRate: recruiter.fill_rate,
      avgTimeToFill: recruiter.avg_time_to_fill,
      rank: recruiter.rank,
      trend: recruiter.trend
    }))
  }
  
  return recruitingData.recruiterPerformance
}

export async function getRecruitingStages() {
  if (USE_SUPABASE) {
    // For now, return JSON data - implement recruiting_stages table later
    return recruitingData.recruitingStages
  }
  
  return recruitingData.recruitingStages
}

export async function getActiveOpenings() {
  if (USE_SUPABASE) {
    const { data, error } = await supabase
      .from('job_openings')
      .select('*')
      .order('posted_date', { ascending: false })
    
    if (error) {
      console.error('Error fetching job openings:', error)
      return recruitingData.activeOpenings
    }
    
    return data.map(job => ({
      id: job.id,
      title: job.title,
      client: job.client,
      location: job.location,
      salaryRange: job.salary_range,
      status: job.status,
      priority: job.priority,
      postedDate: job.posted_date,
      daysOpen: job.days_open,
      candidatesApplied: job.candidates_applied,
      recruiterId: job.recruiter_id
    }))
  }
  
  return recruitingData.activeOpenings
}

export async function getRecentActivity() {
  if (USE_SUPABASE) {
    // For now, return JSON data - implement candidate_activities table later
    return recruitingData.recentActivity
  }
  
  return recruitingData.recentActivity
}