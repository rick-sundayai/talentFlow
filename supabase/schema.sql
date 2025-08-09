-- TalentFlow Database Schema for Supabase

-- Sales Metrics Table
CREATE TABLE sales_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  total_revenue BIGINT NOT NULL,
  monthly_revenue BIGINT NOT NULL,
  quarterly_revenue BIGINT NOT NULL,
  year_over_year_growth DECIMAL(5,2) NOT NULL,
  avg_deal_size BIGINT NOT NULL,
  conversion_rate DECIMAL(5,2) NOT NULL,
  active_pipeline BIGINT NOT NULL,
  closed_deals INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sales Representatives Table
CREATE TABLE sales_reps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  revenue BIGINT NOT NULL,
  deals INTEGER NOT NULL,
  quota BIGINT NOT NULL,
  quota_attainment DECIMAL(5,2) NOT NULL,
  rank INTEGER NOT NULL,
  trend TEXT CHECK (trend IN ('up', 'down', 'stable')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recruiting Metrics Table
CREATE TABLE recruiting_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  total_placements INTEGER NOT NULL,
  monthly_placements INTEGER NOT NULL,
  active_openings INTEGER NOT NULL,
  avg_time_to_fill INTEGER NOT NULL,
  candidate_conversion DECIMAL(5,2) NOT NULL,
  client_satisfaction DECIMAL(5,2) NOT NULL,
  active_candidates INTEGER NOT NULL,
  total_revenue BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recruiters Table
CREATE TABLE recruiters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  placements INTEGER NOT NULL,
  openings INTEGER NOT NULL,
  fill_rate DECIMAL(5,2) NOT NULL,
  avg_time_to_fill INTEGER NOT NULL,
  rank INTEGER NOT NULL,
  trend TEXT CHECK (trend IN ('up', 'down', 'stable')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job Openings Table
CREATE TABLE job_openings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  location TEXT NOT NULL,
  salary_range TEXT NOT NULL,
  status TEXT CHECK (status IN ('open', 'filled', 'cancelled', 'on-hold')) NOT NULL,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) NOT NULL,
  posted_date DATE NOT NULL,
  days_open INTEGER NOT NULL,
  candidates_applied INTEGER NOT NULL,
  recruiter_id UUID REFERENCES recruiters(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pipeline Stages Table (for sales)
CREATE TABLE pipeline_stages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  deals INTEGER NOT NULL,
  value BIGINT NOT NULL,
  color TEXT NOT NULL,
  stage_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recruiting Stages Table
CREATE TABLE recruiting_stages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  candidates INTEGER NOT NULL,
  conversion_rate DECIMAL(5,2) NOT NULL,
  color TEXT NOT NULL,
  stage_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Deals Table
CREATE TABLE deals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  value BIGINT NOT NULL,
  stage TEXT CHECK (stage IN ('prospect', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost')) NOT NULL,
  probability INTEGER CHECK (probability >= 0 AND probability <= 100) NOT NULL,
  close_date DATE NOT NULL,
  sales_rep_id UUID REFERENCES sales_reps(id),
  industry TEXT NOT NULL,
  source TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Candidate Activities Table
CREATE TABLE candidate_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_name TEXT NOT NULL,
  action TEXT CHECK (action IN ('applied', 'screened', 'interviewed', 'offered', 'hired', 'rejected')) NOT NULL,
  job_title TEXT NOT NULL,
  client TEXT NOT NULL,
  recruiter_id UUID REFERENCES recruiters(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data for sales metrics
INSERT INTO sales_metrics (total_revenue, monthly_revenue, quarterly_revenue, year_over_year_growth, avg_deal_size, conversion_rate, active_pipeline, closed_deals)
VALUES (2847000, 487000, 1456000, 23.5, 34500, 18.7, 1967000, 47);

-- Insert sample data for recruiting metrics
INSERT INTO recruiting_metrics (total_placements, monthly_placements, active_openings, avg_time_to_fill, candidate_conversion, client_satisfaction, active_candidates, total_revenue)
VALUES (147, 23, 45, 28, 12.4, 94.2, 892, 1847000);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE sales_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_reps ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruiting_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruiters ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_openings ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruiting_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_activities ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (adjust based on your security needs)
CREATE POLICY "Enable read access for all users" ON sales_metrics FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON sales_reps FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON recruiting_metrics FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON recruiters FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON job_openings FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON pipeline_stages FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON recruiting_stages FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON deals FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON candidate_activities FOR SELECT USING (true);