
# Full CRM System with Analytics Dashboard

This plan adds a complete CRM (Customer Relationship Management) system to your admin backend, including lead management, customer tracking, activity logging, analytics charts, and automated pipeline stages.

---

## What You Get

1. **CRM Contacts** -- Unified view of all customers and leads in one place, with source tracking (order, deck planner, contact form, manual entry)
2. **Lead Pipeline** -- Visual pipeline with stages: New, Contacted, Qualified, Proposal, Won, Lost
3. **Activity Log** -- Timeline of notes, calls, emails per contact for full interaction history
4. **Analytics Dashboard** -- Revenue over time, orders per status, leads per source, conversion funnel charts using Recharts
5. **Contact Detail Page** -- Full profile with order history, activity timeline, notes, and status management
6. **Deck Planner Leads Integration** -- Existing `deck_planner_leads` data pulled into the CRM automatically

---

## New Database Tables

### `crm_contacts`
Unified contact record merging customers and leads.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| email | text NOT NULL | |
| name | text | |
| phone | text | |
| company | text | |
| source | text | order, deck_planner, contact_form, manual, fence_planner |
| pipeline_stage | enum | new, contacted, qualified, proposal, won, lost |
| assigned_to | text | Admin name or email |
| tags | text[] | Flexible tagging |
| notes | text | General notes |
| total_revenue | numeric | Cached total from orders |
| last_contact_at | timestamptz | |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### `crm_activities`
Activity log per contact.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| contact_id | uuid FK -> crm_contacts | |
| type | enum | note, call, email, status_change, order |
| title | text | Short summary |
| description | text | Full details |
| metadata | jsonb | Extra data (old/new status, order_id, etc.) |
| created_by | uuid | Admin user who logged it |
| created_at | timestamptz | |

### New Enum Types
- `crm_pipeline_stage`: new, contacted, qualified, proposal, won, lost
- `crm_activity_type`: note, call, email, status_change, order

### RLS Policies
- Admins: full CRUD on both tables
- No public access (CRM is admin-only)

---

## New Admin Pages

### 1. `/admin/crm` -- CRM Contacts List
- Searchable, filterable table of all contacts
- Filter by pipeline stage, source, tags
- Quick-edit pipeline stage inline
- Sort by last contact, revenue, created date
- Button to add new contact manually

### 2. `/admin/crm/:id` -- Contact Detail
- Contact info card (name, email, phone, company, source)
- Pipeline stage selector with visual indicator
- Tags editor
- Order history section (linked from `cms_orders` by email)
- Activity timeline with ability to add notes, log calls/emails
- Revenue summary

### 3. `/admin/analytics` -- Analytics Dashboard (replaces basic dashboard)
Enhanced dashboard with Recharts charts:
- **Revenue over time** -- Line chart (daily/weekly/monthly)
- **Orders by status** -- Pie chart
- **Leads by source** -- Bar chart
- **Pipeline funnel** -- Funnel visualization showing conversion at each stage
- **Top products** -- Bar chart of best-selling products
- **Recent activity** -- Live feed of latest CRM activities
- **KPI cards** -- Total contacts, conversion rate, average order value, total revenue

---

## Updated Files

### Navigation
- `src/components/admin/AdminLayout.tsx` -- Add "CRM" and "Analytics" nav items

### Routes
- `src/App.tsx` -- Add routes for `/admin/crm`, `/admin/crm/:id`, `/admin/analytics`

---

## New Files

| File | Purpose |
|------|---------|
| `src/pages/admin/AdminCRMPage.tsx` | Contact list with search, filters, pipeline stage |
| `src/pages/admin/AdminContactDetailPage.tsx` | Single contact view with orders, activities, notes |
| `src/pages/admin/AdminAnalyticsPage.tsx` | Full analytics dashboard with charts |
| `src/components/admin/PipelineBadge.tsx` | Colored badge for pipeline stages |
| `src/components/admin/ActivityTimeline.tsx` | Activity log timeline component |
| `src/components/admin/AddActivityModal.tsx` | Modal to log a note/call/email |
| `src/components/admin/AnalyticsCharts.tsx` | Recharts chart components (revenue, orders, leads) |

---

## Data Sync Logic

- When a new order is created, auto-create or update a `crm_contacts` record by email
- Import existing `deck_planner_leads` into `crm_contacts` via a one-time sync button in the CRM page
- Activity entries auto-created on pipeline stage changes and order events

---

## Technical Details

### Database Migration
Single migration file that:
1. Creates `crm_pipeline_stage` and `crm_activity_type` enums
2. Creates `crm_contacts` table with indexes on email, pipeline_stage, source
3. Creates `crm_activities` table with index on contact_id
4. Enables RLS on both tables
5. Creates admin-only RLS policies using `has_role(auth.uid(), 'admin')`
6. Adds `updated_at` trigger on `crm_contacts`

### Charts Library
Uses `recharts` (already installed) for:
- `LineChart` for revenue trends
- `PieChart` for order status distribution
- `BarChart` for lead sources and top products
- Custom funnel using stacked bars

### Analytics Queries
All analytics queries run client-side against the database using the Supabase JS client, aggregating data in the frontend. For large datasets in the future, this can be moved to database views or Edge Functions.

### Implementation Order
1. Database migration (tables + RLS)
2. CRM contacts list page
3. Contact detail page with activity timeline
4. Analytics dashboard with charts
5. Auto-sync logic (orders -> contacts)
6. Navigation and routing updates
