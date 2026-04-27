# Nhà Tiếng Trung — CLAUDE.md

## Project Overview

**Nhà Tiếng Trung** is a web application for a Chinese language learning center offering both online and offline classes in Vietnam. It connects students and teachers in a structured learning environment covering lesson delivery, exercises, submissions, grading, and progress tracking.

**Current Phase:** Phase 1 — Frontend UI + Routing only (no backend — use mock data)

**Stack:** React 18 + TypeScript + Vite · shadcn/ui · Tailwind CSS · React Router DOM v6 · TanStack Query v5 · Zustand

---

## User Roles

| Role | Description |
|---|---|
| **Student** | Views lessons, does exercises, practices vocabulary, tracks progress |
| **Teacher** | Creates lessons/exercises, grades submissions, tracks students |
| **Admin** | Manages users, classes, enrollment, payments, analytics |

---

## Project Structure

```
src/
├── assets/                   # Logo, icons, static files
├── components/
│   ├── ui/                   # shadcn/ui primitives — do not edit
│   ├── layout/               # Layout shells per role
│   │   ├── PublicLayout.tsx          # Login / Register wrapper
│   │   ├── StudentLayout.tsx         # Student sidebar + topbar shell
│   │   ├── TeacherLayout.tsx         # Teacher sidebar + topbar shell
│   │   └── AdminLayout.tsx           # Admin sidebar + topbar shell
│   └── shared/               # Reusable domain-agnostic components
├── features/
│   ├── auth/
│   │   ├── pages/            # LoginPage, RegisterPage, ForgotPasswordPage
│   │   ├── components/       # AuthGuard, LoginForm, RegisterForm
│   │   └── index.ts
│   ├── student/
│   │   ├── dashboard/
│   │   ├── lessons/
│   │   ├── exercises/
│   │   ├── vocabulary/
│   │   ├── progress/
│   │   └── schedule/
│   ├── teacher/
│   │   ├── dashboard/
│   │   ├── lessons/
│   │   ├── exercises/
│   │   ├── submissions/
│   │   ├── students/
│   │   └── announcements/
│   └── admin/
│       ├── dashboard/
│       ├── users/
│       ├── classes/
│       ├── enrollment/
│       ├── payments/
│       └── analytics/
├── hooks/                    # Shared custom hooks
├── lib/
│   ├── mock/                 # Mock data fixtures (Phase 1 only)
│   │   ├── auth.ts           # Mock login logic
│   │   ├── lessons.ts
│   │   ├── exercises.ts
│   │   ├── submissions.ts
│   │   ├── students.ts
│   │   └── users.ts
│   ├── utils.ts              # cn(), formatDate(), formatScore()
│   └── queryClient.ts        # TanStack QueryClient singleton
├── router/
│   └── index.tsx             # createBrowserRouter — all routes defined here
├── store/
│   ├── auth.store.ts         # Mock user session + role
│   ├── ui.store.ts           # Sidebar collapsed, active modals
│   └── notification.store.ts # Toast queue
├── types/                    # Shared TypeScript types
└── main.tsx
```

Each feature module internal structure:

```
features/<role>/<name>/
├── components/       # Feature-specific UI components
├── hooks/            # useQuery / useMutation hooks (mock data in Phase 1)
├── pages/            # Route-level page components
└── types.ts          # Feature-specific types (if needed)
```

---

## Layouts

### PublicLayout
- Full-screen centered card, no navigation
- Subtle background: light warm gray or soft pattern
- Used for: `/login`, `/register`, `/forgot-password`
- Brand logo + app name centered at top of card

### StudentLayout
- **Desktop:** Fixed left sidebar (240px) + top bar + main content area
- **Mobile:** Bottom tab navigation (5 tabs max)
- Sidebar items: Dashboard, Lessons, Exercises, Vocabulary, Progress, Schedule
- Top bar: app logo, greeting ("Xin chào, [name]"), notification bell, avatar dropdown
- Sidebar collapsible to icon-only mode (64px)

### TeacherLayout
- **Desktop:** Fixed left sidebar (240px) + top bar + main content area
- **Mobile:** Hamburger menu (teachers primarily use desktop)
- Sidebar items: Dashboard, Lessons, Exercises, Submissions, Students, Announcements
- Top bar: notification bell (pending submissions count badge), avatar dropdown

### AdminLayout
- **Desktop:** Fixed left sidebar (240px) + top bar + main content area
- Sidebar items: Dashboard, Users, Classes, Enrollment, Payments, Analytics
- Top bar: notification bell, avatar dropdown

---

## Routing

```
/                              → redirect based on role (/student | /teacher | /admin)
/login                         → LoginPage
/register                      → RegisterPage
/forgot-password               → ForgotPasswordPage

# Student (AuthGuard: role = student)
/student                       → redirect → /student/dashboard
/student/dashboard             → StudentDashboardPage
/student/lessons               → LessonListPage
/student/lessons/:id           → LessonDetailPage
/student/exercises             → ExerciseListPage
/student/exercises/:id         → ExerciseDetailPage
/student/vocabulary            → VocabularyPage
/student/progress              → ProgressPage
/student/schedule              → SchedulePage

# Teacher (AuthGuard: role = teacher)
/teacher                       → redirect → /teacher/dashboard
/teacher/dashboard             → TeacherDashboardPage
/teacher/lessons               → LessonManagementPage
/teacher/lessons/new           → CreateLessonPage
/teacher/lessons/:id/edit      → EditLessonPage
/teacher/exercises             → ExerciseManagementPage
/teacher/exercises/new         → CreateExercisePage
/teacher/exercises/:id/edit    → EditExercisePage
/teacher/submissions           → SubmissionsInboxPage
/teacher/submissions/:id       → SubmissionDetailPage
/teacher/students              → StudentListPage
/teacher/students/:id          → StudentProgressPage
/teacher/announcements         → AnnouncementsPage

# Admin (AuthGuard: role = admin)
/admin                         → redirect → /admin/dashboard
/admin/dashboard               → AdminDashboardPage
/admin/users                   → UserManagementPage
/admin/classes                 → ClassManagementPage
/admin/enrollment              → EnrollmentPage
/admin/payments                → PaymentStatusPage
/admin/analytics               → AnalyticsPage
```

- `AuthGuard` reads role from Zustand auth store; redirects to `/login` if unauthenticated
- Role mismatch redirects to the correct role's dashboard (e.g., teacher accessing `/student/*` → `/teacher/dashboard`)

---

## Design System

### Brand Identity
- **Name:** Nhà Tiếng Trung
- **Spirit:** Warm, structured, approachable. Chinese cultural aesthetic meets Vietnamese friendliness.
- **Reference:** Clean editorial — generous white space, warm red accents, purposeful Chinese character display.

### Color Palette
```
--color-red:        #C0392B   /* NTC red — primary CTAs, logo, brand only */
--color-dark:       #1A1A1A   /* near-black — text, headers */
--color-bg:         #FFFFFF   /* main canvas */
--color-surface:    #FAFAFA   /* cards, panels, sidebar */
--color-border:     #EBEBEB   /* subtle dividers */

--color-text-primary:   #1A1A1A
--color-text-secondary: #6B6B6B
--color-text-muted:     #A3A3A3

--color-success:    #16A34A   /* submitted, correct, present */
--color-warning:    #F59E0B   /* pending, due soon */
--color-danger:     #C0392B   /* overdue, incorrect, absent */
--color-info:       #2563EB   /* informational badges */
```

### Typography
- **Headings:** Inter Bold, `tracking-tight`
- **Body:** Inter Regular
- **Chinese characters (Hanzi in content):** Noto Sans SC — use `font-noto` class
- **Scores / Numbers / Dates in tables:** JetBrains Mono — `font-mono`, right-aligned

### Spacing & Shape
- **Border radius:** `rounded` (4px) maximum — no bubbly shapes
- **Shadows:** `shadow-sm` maximum; prefer borders over shadows
- **Icons:** Lucide React — `size={16}` default, `size={20}` for nav items

### Design Rules
1. **Red is precious** — `#C0392B` only for primary action buttons, logo, brand marks
2. **Bold whitespace** — never fill every pixel; empty space is intentional
3. **Sharp, not soft** — 4px radius everywhere; `rounded-full` is forbidden
4. **Numbers matter** — `font-mono` for all scores, dates in tables; right-align
5. **Hanzi rendering** — always wrap Chinese character display in `font-noto`
6. **Status is color** — use semantic colors consistently (green=done, amber=pending, red=overdue)

---

## Tailwind Configuration

Extend `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      ntc: {
        red: '#C0392B',
        dark: '#1A1A1A',
      },
      surface: '#FAFAFA',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
      noto: ['Noto Sans SC', 'sans-serif'],
    },
    borderRadius: {
      DEFAULT: '4px',
      sm: '2px',
      md: '4px',
      lg: '4px',   // cap at 4px — never use rounded-xl or rounded-full
    },
  },
}
```

---

## shadcn/ui Usage

- Init: `style: default`, `baseColor: neutral`, `cssVariables: true`
- Override defaults in `components/ui/` to match NTC style (4px radius, neutral palette)
- Primary button: `bg-ntc-red hover:bg-ntc-red/90 text-white rounded`
- Secondary: `variant="outline"`
- Icon-only: `variant="ghost"`
- Do not use `rounded-full` in any shadcn override

---

## State Management (Zustand)

```
store/
├── auth.store.ts         # mock user session: id, name, email, role
├── ui.store.ts           # sidebar collapsed state, active modals
└── notification.store.ts # toast queue, badge counts
```

### Rules
- Zustand: client UI state only (auth session, sidebar, toasts)
- Never cache server/mock data in Zustand — use React Query
- Persist `auth` store to localStorage via `zustand/middleware/persist`
- `auth.store.ts` exposes `setMockRole(role)` for dev role-switching

---

## Mock Data (Phase 1)

All data lives in `lib/mock/`. No real API calls.

```ts
// lib/mock/auth.ts
// Login logic: email prefix determines role
// student@... → role: 'student'
// teacher@... → role: 'teacher'
// admin@...   → role: 'admin'
// Any password accepted
```

React Query hooks wrap mock data with `Promise` + `setTimeout` (300–600ms delay) to simulate network latency.

---

## Feature Details

### Auth
- **LoginPage:** Email + password form. Mock login sets role from email prefix. Show error on wrong format.
- **RegisterPage:** Name, email, password, confirm password, role select (Student / Teacher). Mock only — no real registration.
- **ForgotPasswordPage:** Email input + submit. Show success message UI only.
- **AuthGuard:** HOC wrapping protected route groups. Reads Zustand auth store.

---

### Student — Dashboard (`/student/dashboard`)
- Greeting card: "Xin chào, [name]! 你好！" + current streak (days)
- Today's lesson card: lesson title, subject badge, time, "Vào học" button
- Pending exercises card: count + nearest deadline
- Recent score card: last graded exercise + score badge
- Quick action buttons: Go to Lesson, Do Exercise, Review Vocabulary

### Student — Lesson List (`/student/lessons`)
- Grid of lesson cards: title, subject, date, status badge (New / Viewed / Completed)
- Filter tabs: All / This Week / Completed

### Student — Lesson Detail (`/student/lessons/:id`)
- Lesson title + subject badge + date
- Video embed section (YouTube iframe placeholder in Phase 1)
- Teacher notes section (rich text display)
- Vocabulary list for this lesson: Hanzi | Pinyin | Vietnamese meaning (table)
- "Làm bài tập" button → navigates to linked exercise
- Previous / Next lesson navigation

### Student — Exercise List (`/student/exercises`)
- Table: Exercise title, linked lesson, deadline, status (Pending / Submitted / Graded)
- Status color: amber=Pending, blue=Submitted, green=Graded
- Row click → ExerciseDetailPage

### Student — Exercise Detail (`/student/exercises/:id`)
- Exercise title + deadline countdown
- Question types:
  - `MultipleChoiceQuestion` — radio buttons, 4 options
  - `FillBlankQuestion` — inline text input within sentence
  - `MatchingQuestion` — two columns, click to pair
  - `EssayQuestion` — textarea, min 50 chars
  - `FileUploadQuestion` — upload button UI only (no actual upload in Phase 1)
- Auto-save draft to localStorage on input change
- Submit button → confirmation Dialog → submitted state (read-only view)
- If graded: show score + teacher feedback per question

### Student — Vocabulary (`/student/vocabulary`)
- Deck selector: "All vocabulary" or per-lesson deck
- Flashcard: Hanzi front (large, `font-noto`) → flip → Pinyin + Vietnamese meaning
- Self-rate buttons: "Nhớ rồi" (Know) / "Chưa chắc" (Unsure) / "Chưa nhớ" (Don't know)
- Progress bar: cards reviewed / total in deck
- Session summary screen at end

### Student — Progress (`/student/progress`)
- Overall stats row: Total lessons viewed, exercises submitted, avg score, current streak
- Score history table: Lesson | Exercise | Score | Date | Status
- Weekly score bar chart (mock chart using divs or recharts)
- HSK level progress bar (static UI, e.g., "HSK 2 — 60% mastered")

### Student — Schedule (`/student/schedule`)
- Monthly calendar view (basic grid)
- Lesson events shown on dates (colored dot)
- Exercise deadline events (amber dot)
- Selected day panel: list of events for that day

---

### Teacher — Dashboard (`/teacher/dashboard`)
- Pending submissions counter (badge)
- Today's classes list
- Recent student activity feed (mock)
- Quick links: Create Lesson, Create Exercise, View Submissions

### Teacher — Lesson Management (`/teacher/lessons`)
- Table: Title, Subject, Class, Publish Date, Status (Draft / Published)
- "Tạo bài học mới" button → CreateLessonPage
- Row actions: Edit, Duplicate, Delete (confirmation dialog)

### Teacher — Create / Edit Lesson
- Form fields: Title, Subject (select), Class (select), Publish Date (date picker)
- Video URL input (YouTube link)
- Teacher notes (textarea — rich text in later phase)
- Vocabulary builder: add Hanzi | Pinyin | Vietnamese rows (dynamic list)
- Save as Draft / Publish buttons

### Teacher — Exercise Management (`/teacher/exercises`)
- Table: Title, Linked Lesson, Deadline, Total Questions, Submissions Count
- "Tạo bài tập mới" button → CreateExercisePage

### Teacher — Create / Edit Exercise
- Title + linked lesson select + deadline date picker
- Question builder (dynamic list):
  - Add question → select type → fill content
  - Supported types: Multiple Choice, Fill in Blank, Matching, Essay, File Upload
  - Drag to reorder questions
- Save as Draft / Publish

### Teacher — Submissions Inbox (`/teacher/submissions`)
- Table: Student Name, Class, Exercise Title, Submitted At, Status (Pending / Graded)
- Filter: by class, by exercise, by status
- Pending submissions highlighted

### Teacher — Submission Detail (`/teacher/submissions/:id`)
- Student info header (name, class, submitted at)
- Each question shown with: question text → student answer → correct answer (if objective)
- Score input per question (number field, max shown)
- Text feedback input per question
- Overall score (auto-summed) + overall feedback textarea
- "Lưu & Trả bài" (Save & Release) button → changes status to Graded

### Teacher — Student List (`/teacher/students`)
- Table: Name, Class, Exercises Submitted, Avg Score, Last Active
- Row click → StudentProgressPage

### Teacher — Student Progress (`/teacher/students/:id`)
- Student info card (name, class, enrollment date)
- Score history table
- Exercises: submitted / total ratio
- Vocabulary: total learned count
- Attendance table (mock: present / absent / late)
- Notes textarea (teacher's private notes on this student)

### Teacher — Announcements (`/teacher/announcements`)
- List of past announcements (title, date, target class)
- "Đăng thông báo" button → Dialog form: title, body, target class select, publish

---

### Admin — Dashboard (`/admin/dashboard`)
- Stats cards: Total Students, Total Teachers, Active Classes, Monthly Revenue
- Recent enrollments table
- Quick links: Add User, Create Class

### Admin — User Management (`/admin/users`)
- Tab switch: Students | Teachers
- Table: Name, Email, Class/Subject, Status (Active / Inactive), Joined Date
- Invite user button (email input dialog)
- Deactivate / Reactivate action per row

### Admin — Class Management (`/admin/classes`)
- Table: Class Name, Teacher, Student Count, Schedule, Status
- Create Class button → Dialog: name, teacher select, schedule description
- Edit / Archive per row

### Admin — Enrollment (`/admin/enrollment`)
- Table: Student Name, Class, Enrolled Date, Status (Active / Pending / Dropped)
- Enroll Student button → select student + class dialog

### Admin — Payments (`/admin/payments`)
- Table: Student Name, Class, Month, Amount, Status (Paid / Unpaid / Overdue)
- Manual status toggle per row (Paid / Unpaid)
- Filter by month, class, status

### Admin — Analytics (`/admin/analytics`)
- Monthly active students chart (bar)
- Exercise completion rate chart (line)
- Average score by class (horizontal bar)
- All charts use mock data (recharts or simple div-based in Phase 1)

---

## Component Conventions

```tsx
// Page components — named export, no default export
export function StudentDashboardPage() { ... }

// cn() for conditional classes
import { cn } from '@/lib/utils'

// Chinese character display
<span className="font-noto text-2xl">你好</span>

// Score / number display in tables
<span className="font-mono tabular-nums text-right">{score}/100</span>

// Status badges — rectangular, not pill
<Badge className="rounded font-medium">Đã nộp</Badge>

// Primary action button
<Button className="bg-ntc-red hover:bg-ntc-red/90 text-white rounded">
  Nộp bài
</Button>

// Section headers
<h1 className="text-xl font-bold tracking-tight text-ntc-dark">Bài học hôm nay</h1>
```

---

## Key Shared Components to Build

```
components/shared/
├── PageHeader.tsx            # Title + breadcrumb + optional action button
├── StatCard.tsx              # Stats display card (icon + number + label)
├── StatusBadge.tsx           # Semantic status badge (pending/submitted/graded)
├── DataTable.tsx             # @tanstack/react-table wrapper (reusable)
├── ConfirmDialog.tsx         # Reusable confirmation dialog
├── EmptyState.tsx            # Empty list/no data illustration
└── LoadingSpinner.tsx        # Centered spinner for Suspense fallback
```

---

## Platforms

- **Primary:** Web desktop 1280×900+
- **Secondary:** Mobile 375×812 for students (bottom tab nav, touch-friendly exercise inputs)

Use `md:` Tailwind prefix for desktop-first layouts.

---

## Scripts

```bash
npm run dev          # Vite dev server
npm run build        # TypeScript check + Vite build
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
```

- Path alias: `@/` → `src/`
- ESLint: `@typescript-eslint/recommended`

---

## Phase 1 Implementation Order

1. Project scaffold (Vite + TS + Tailwind + shadcn init)
2. Tailwind config with NTC tokens
3. Mock data fixtures (`lib/mock/`)
4. Zustand stores (auth, ui)
5. Router setup with all route definitions
6. Layout components (Public, Student, Teacher, Admin)
7. Auth pages (Login, Register, ForgotPassword) + AuthGuard
8. Student pages (Dashboard → Lessons → Exercises → Vocabulary → Progress → Schedule)
9. Teacher pages (Dashboard → Lessons → Exercises → Submissions → Students → Announcements)
10. Admin pages (Dashboard → Users → Classes → Enrollment → Payments → Analytics)
11. Shared components (DataTable, StatCard, StatusBadge, etc.)

---

## Do Not

- Do not connect to any real backend in Phase 1 — mock data only
- Do not use `rounded-xl`, `rounded-2xl`, or `rounded-full` anywhere
- Do not use `#C0392B` as decorative color — only primary CTAs and brand
- Do not use `any` in TypeScript — `strict: true`
- Do not create default exports for page or feature components
- Do not add features beyond what is specified per phase
- Do not put server/mock data in Zustand — use React Query
- Do not call axios/fetch directly from components — use React Query hooks
