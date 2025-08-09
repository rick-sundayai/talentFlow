// Core types for the TalentFlow recruiting platform

export interface Recruiter {
  id: string;
  name: string;
  placements: number;
  clients: number;
  successRate: number;
  revenue: string;
  email?: string;
  avatar?: string;
  department?: string;
  joinDate?: string;
}

export interface Reward {
  id: string;
  icon: string;
  title: string;
  description: string;
  progress: number;
  active: boolean;
  locked: boolean;
  category?: 'placement' | 'client' | 'commission' | 'membership' | 'scheduling';
  requiredPlacements?: number;
  requiredRevenue?: number;
}

export interface Client {
  id: string;
  name: string;
  industry: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'potential';
  tier: 'standard' | 'premium' | 'enterprise';
  assignedRecruiter?: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: number;
  skills: string[];
  status: 'active' | 'placed' | 'interviewed' | 'screening';
  resume?: string;
  linkedIn?: string;
  notes?: string;
}

export interface Placement {
  id: string;
  candidateId: string;
  clientId: string;
  recruiterId: string;
  position: string;
  salary: number;
  commission: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  startDate: string;
  placementDate: string;
}

export interface Interview {
  id: string;
  candidateId: string;
  clientId: string;
  recruiterId: string;
  scheduledDate: string;
  duration: number;
  type: 'phone' | 'video' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
  outcome?: 'hired' | 'rejected' | 'pending';
}

export interface Stats {
  totalPlacements: number;
  activeClients: number;
  successRate: number;
  revenue: string;
  monthlyGrowth: number;
  averageTime: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedDate: string;
  points: number;
}

// Sales Manager Dashboard Types
export interface SalesMetrics {
  totalRevenue: number;
  monthlyRevenue: number;
  quarterlyRevenue: number;
  yearOverYearGrowth: number;
  avgDealSize: number;
  conversionRate: number;
  activePipeline: number;
  closedDeals: number;
}

export interface SalesRep {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  revenue: number;
  deals: number;
  quota: number;
  quotaAttainment: number;
  rank: number;
  trend: 'up' | 'down' | 'stable';
}

export interface Deal {
  id: string;
  clientName: string;
  value: number;
  stage: 'prospect' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  closeDate: string;
  salesRepId: string;
  industry: string;
  source: string;
}

export interface PipelineStage {
  name: string;
  deals: number;
  value: number;
  color: string;
}

// Recruiting Manager Dashboard Types
export interface RecruitingMetrics {
  totalPlacements: number;
  monthlyPlacements: number;
  activeOpenings: number;
  avgTimeToFill: number;
  candidateConversion: number;
  clientSatisfaction: number;
  activeCandidates: number;
  totalRevenue: number;
}

export interface RecruiterPerformance {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  placements: number;
  openings: number;
  fillRate: number;
  avgTimeToFill: number;
  rank: number;
  trend: 'up' | 'down' | 'stable';
}

export interface JobOpening {
  id: string;
  title: string;
  client: string;
  location: string;
  salaryRange: string;
  status: 'open' | 'filled' | 'cancelled' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  postedDate: string;
  daysOpen: number;
  candidatesApplied: number;
  recruiterId: string;
}

export interface CandidateActivity {
  id: string;
  candidateName: string;
  action: 'applied' | 'screened' | 'interviewed' | 'offered' | 'hired' | 'rejected';
  jobTitle: string;
  client: string;
  timestamp: string;
  recruiterId: string;
}

export interface RecruitingStage {
  name: string;
  candidates: number;
  conversionRate: number;
  color: string;
}