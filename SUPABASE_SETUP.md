# 🗄️ Supabase Setup Guide

This guide explains how to connect your TalentFlow application to Supabase.

## 🚀 Quick Setup

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create an account
2. Click "New Project" and create a project called "talentflow"
3. Wait for the project to initialize

### 2. Get Your Credentials
1. In your Supabase dashboard, go to **Settings > API**
2. Copy your **Project URL** and **publishable** key (starts with `sb_publishable_`)

⚠️ **Important**: Supabase has migrated to new publishable keys in 2024-2025. Use the **publishable key** (not the legacy anon key) for better security.

### 3. Configure Environment Variables
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_your-publishable-key-here
   NEXT_PUBLIC_USE_SUPABASE=true
   ```

### 4. Set Up Database Schema
1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `supabase/schema.sql`
3. Click **Run** to create all tables and sample data

### 5. Test Connection
1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Check browser console for any connection errors
3. Data should now load from Supabase instead of JSON files!

## 🔧 Data Service Architecture

The application uses a flexible data service layer (`lib/dataService.ts`) that can switch between:

- **JSON files** (default, for development)
- **Supabase** (when `NEXT_PUBLIC_USE_SUPABASE=true`)

### Switching Data Sources

**Use JSON files:**
```env
# .env.local
NEXT_PUBLIC_USE_SUPABASE=false
# or just omit the variable
```

**Use Supabase:**
```env
# .env.local
NEXT_PUBLIC_USE_SUPABASE=true
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_your-publishable-key
```

## 📊 Database Schema

The application includes these main tables:

### Sales Tables
- `sales_metrics` - Overall sales performance data
- `sales_reps` - Individual sales representative performance
- `deals` - Individual deals and opportunities
- `pipeline_stages` - Sales funnel stages

### Recruiting Tables
- `recruiting_metrics` - Overall recruiting performance data
- `recruiters` - Individual recruiter performance
- `job_openings` - Active job positions
- `recruiting_stages` - Hiring funnel stages
- `candidate_activities` - Recent candidate actions

## 🔒 Security Configuration

The schema includes:
- **Row Level Security (RLS)** enabled on all tables
- **Public read access** policies (adjust for your needs)
- **UUID primary keys** for all records
- **Data validation** with CHECK constraints

### Customizing Security
To restrict access, modify the policies in `supabase/schema.sql`:

```sql
-- Example: Restrict to authenticated users only
CREATE POLICY "Authenticated users only" ON sales_metrics 
FOR SELECT USING (auth.role() = 'authenticated');
```

## 🔐 Supabase API Key Migration (2024-2025)

Supabase has updated their API key system for improved security:

### New Key Types
- **Publishable Keys** (`sb_publishable_...`) - Replace legacy `anon` keys for client-side use
- **Secret Keys** (`sb_secret_...`) - Replace legacy `service_role` keys for server-side use

### Migration Benefits
- Better security with asymmetric JWT support
- Independent key rotation without downtime
- Improved developer experience

### Timeline
- **Now**: Publishable keys available and recommended
- **October 2025**: Legacy keys will be deprecated
- **November 2025**: Migration becomes mandatory

### For This Application
This TalentFlow app is already updated to support the new publishable key format. Just use your `sb_publishable_...` key in the environment variables.

## 🛠️ MCP Server Connection (Alternative)

If you have a Supabase MCP server available, you can connect using MCP tools instead:

1. Check for MCP Supabase tools in your environment
2. Configure MCP connection in your Claude Code settings
3. Use MCP tools for direct database operations

## 📝 Adding New Data

### Adding Sample Data
1. Use the SQL Editor in Supabase dashboard
2. Insert data using standard SQL:

```sql
INSERT INTO sales_reps (name, email, revenue, deals, quota, quota_attainment, rank, trend)
VALUES ('John Doe', 'john@company.com', 450000, 15, 400000, 112.5, 1, 'up');
```

### Updating Data Service
When adding new tables:
1. Update `lib/supabase.ts` with new table types
2. Add functions to `lib/dataService.ts`
3. Import and use in your components

## 🚨 Troubleshooting

### Common Issues

**Environment variables not loaded:**
- Ensure `.env.local` is in project root
- Restart development server after changes
- Check variables start with `NEXT_PUBLIC_`

**Database connection errors:**
- Verify Supabase URL and key are correct
- Check your Supabase project is active
- Ensure RLS policies allow access

**Data not updating:**
- Check browser console for errors
- Verify `NEXT_PUBLIC_USE_SUPABASE=true`
- Confirm SQL schema was executed successfully

### Getting Help
- Supabase docs: [supabase.com/docs](https://supabase.com/docs)
- Check browser developer tools console
- Review network requests in developer tools