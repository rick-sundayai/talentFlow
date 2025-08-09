# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

TalentFlow is a comprehensive recruiting and sales management platform built with Next.js 15+. The application features dual dashboards for recruiting managers and sales managers, with shared dark mode theming and consistent design patterns.

## Technology Stack

- **Frontend**: Next.js 15.4.6 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS v4 with soft slate color palette
- **State Management**: React Context API for dark mode
- **Data**: JSON files with Supabase integration ready (new publishable key format)
- **Fonts**: Geist Sans and Geist Mono (optimized)
- **Build Tool**: Turbopack for fast development
- **Linting**: ESLint with Next.js configuration

## Development Commands

```bash
# Navigate to the project directory
cd tti/

# Development server with Turbopack
npm run dev

# Build production bundle
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## Architecture

### App Structure

The application follows Next.js 15+ App Router conventions:

- `app/layout.tsx`: Root layout with font configuration and metadata
- `app/page.tsx`: Landing page component
- `app/globals.css`: Global styles with Tailwind CSS v4 and CSS custom properties

### Font Configuration

Uses Geist font family with CSS variables:
- `--font-geist-sans`: Main sans-serif font
- `--font-geist-mono`: Monospace font for code

### Styling System

- **Tailwind CSS v4**: Latest version with inline theme configuration
- **Dark Mode**: Automatic dark mode support via `prefers-color-scheme`
- **CSS Custom Properties**: Theme colors defined with CSS variables
  - `--background`: Background color (white/dark)
  - `--foreground`: Text color (dark/light)

### TypeScript Configuration

- **Path Mapping**: `@/*` resolves to project root
- **Strict Mode**: Enabled with comprehensive type checking
- **Module Resolution**: Uses "bundler" for optimal Next.js compatibility

## Current Features

### Dual Dashboard Architecture
- **MainDashboard**: Navigation wrapper with tab switching between dashboards
- **RecruitingManagerDashboard**: Full recruiting metrics, pipeline, and team performance
- **SalesManagerDashboard**: Sales metrics, pipeline, and revenue tracking
- **Dark Mode**: Persistent theme switching across both dashboards

### Key Components
- `app/components/MainDashboard.tsx`: Navigation and dashboard switching
- `app/components/RecruitingManagerDashboard.tsx`: Recruiting-focused metrics
- `app/components/SalesManagerDashboard.tsx`: Sales-focused metrics  
- `app/contexts/DarkModeContext.tsx`: Shared dark mode state management
- `app/types/index.ts`: Comprehensive TypeScript interfaces

### Data Architecture
- `app/data/recruitingData.json`: Recruiting metrics, performance, activities
- `app/data/salesData.json`: Sales metrics, pipeline, deals
- **Future**: Ready for Supabase API integration

### Dashboard Features
- **Navigation Tabs**: Sticky navigation with theme-aware styling
- **Metrics Cards**: Key performance indicators with trend indicators
- **Pipeline Visualization**: Stage-based funnel with conversion rates
- **Team Performance**: Ranked performance with detailed metrics
- **Activity Feeds**: Real-time updates and recent activities
- **Responsive Design**: Mobile-first with consistent theming

## Data Models

### Sales Types
- `SalesMetrics`: Revenue, pipeline, conversion metrics
- `SalesRep`: Individual sales performance and quotas
- `Deal`: Client deals with stages and probabilities
- `PipelineStage`: Sales funnel visualization data

### Recruiting Types  
- `RecruitingMetrics`: Placement, conversion, satisfaction metrics
- `RecruiterPerformance`: Individual recruiter statistics
- `JobOpening`: Active positions with status and priority
- `CandidateActivity`: Real-time candidate actions
- `RecruitingStage`: Hiring funnel with conversion rates

### Shared Types
- `Candidate`: Candidate profiles and status
- `Client`: Client information and relationships
- `Placement`: Successful hiring records

## Development Workflow

### Component Patterns
1. Use React Context for shared state (see `DarkModeContext`)
2. Import data from JSON files (prepare for future Supabase integration)
3. Follow the dual-dashboard architecture pattern
4. Maintain consistent theming across both dashboards

### Design System
- **Colors**: Soft slate palette (slate-50 to slate-900)
- **Accents**: Emerald, sky, violet, amber for different metrics
- **Animations**: 300ms transitions for theme switching
- **Layout**: Max-width 7xl, consistent padding and spacing
- **Dark Mode**: Context-driven with localStorage persistence

### Code Standards
- TypeScript interfaces for all data structures
- Consistent component naming (Manager + Dashboard suffix)
- JSON data files for mock data (Supabase-ready structure)
- React hooks for state management
- Tailwind CSS classes with conditional dark mode

### Supabase Integration Status
- ✅ **Ready**: Supabase client configured with new publishable key format
- ✅ **Migration-Ready**: Updated for 2024-2025 API key changes  
- 🔄 **Database Setup**: Run `supabase/schema.sql` in Supabase dashboard to enable
- 🔄 **Toggle**: Set `NEXT_PUBLIC_USE_SUPABASE=true` to switch from JSON to database

### Future Enhancements
- Add authentication and user management  
- Implement real-time updates with Supabase subscriptions
- Add data export functionality
- Implement Row Level Security policies

## Common Tasks

### Adding New Metrics
1. Update relevant interface in `app/types/index.ts`
2. Add data to corresponding JSON file in `app/data/`
3. Create metric card in dashboard component
4. Ensure dark mode styling consistency

### Creating New Dashboard Views
1. Follow the `*ManagerDashboard.tsx` naming pattern
2. Import and use `useDarkMode()` hook
3. Use consistent layout structure and spacing
4. Add navigation tab in `MainDashboard.tsx`

### Styling Guidelines
- Use `slate-*` colors for neutral elements
- Use semantic colors (emerald for success, rose for errors)
- Always provide both light/dark mode variants
- Use `transition-colors duration-300` for theme switches
- Maintain consistent border radius (`rounded-xl` for cards)

## Troubleshooting

### Dark Mode Not Persisting
- Ensure component uses `useDarkMode()` hook
- Check that component is wrapped in `DarkModeProvider`
- Verify localStorage is not being blocked

### Data Not Loading
- Check JSON file imports are correct
- Ensure TypeScript interfaces match data structure
- Verify file paths are absolute from `app/` directory

### Linting Issues
- Run `npm run lint` to check for issues
- Follow ESLint Next.js configuration
- Remove unused imports and variables