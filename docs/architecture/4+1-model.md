# 4+1 Architectural Model

## Overview
The Typix personality assessment platform follows the 4+1 architectural view model, which describes the system from multiple viewpoints to address concerns of different stakeholders.

---

## 1. Logical View (Component Structure)

### Purpose
Describes the system's functionality and structure from an object-oriented perspective.

### Component Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Typix Application                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌────────────────┐  ┌────────────────┐  ┌─────────────────┐  │
│  │  Presentation  │  │   Business     │  │     Data        │  │
│  │     Layer      │  │     Layer      │  │     Layer       │  │
│  └────────────────┘  └────────────────┘  └─────────────────┘  │
│         │                    │                    │            │
│         │                    │                    │            │
│  ┌──────▼────────────────────▼────────────────────▼─────────┐  │
│  │                    Vue 3 Core                            │  │
│  │          (Composition API, Reactivity System)            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Layer Breakdown

#### Presentation Layer
**Views** (`src/views/`)
- `HomePage.vue`: Landing page with assessment selection
- `SurveyWizard.vue`: Assessment question flow
- `SurveyReport.vue`: Results display page

**Components** (`src/components/`)
- Navigation Components:
  - `NavigationMenu.vue`: Main navigation
  - `LanguageSelector.vue`: Language switcher
  - `AppFooter.vue`: Application footer

- Survey Components (`surveys/`):
  - `EnneagramSurvey.vue`: Enneagram questionnaire
  - `DiscSurvey.vue`: DISC questionnaire
  - `InsightsSurvey.vue`: Insights questionnaire

- Report Components (`reports/`):
  - `EnneagramReport.vue`: Enneagram results visualization
  - `DiscReport.vue`: DISC results visualization
  - `InsightsReport.vue`: Insights results visualization

- Icon Components (`icons/`):
  - `EnneagramIcon.vue`
  - `DiscIcon.vue`
  - `InsightsIcon.vue`

#### Business Layer
**Composables** (`src/composables/`)
- `useTranslations.ts`: i18n logic and translation management
- `usePdfExport.ts`: PDF generation logic using jsPDF and html2canvas

**Routing** (`src/main.ts`)
- Vue Router configuration
- Route definitions and navigation guards

#### Data Layer
**Data Files** (`src/data/`)
- `enneagram-questions.json`: Enneagram assessment questions
- `disc-questions.json`: DISC assessment questions
- `insights-questions.json`: Insights assessment questions

**i18n Resources** (`src/i18n/`)
- `translations.ts`: Multi-language translations (EN, NL, DE, ES, FR)

**State Management**
- Local Storage: Browser localStorage for persistence
  - User name
  - Assessment answers
  - Language preference
  - Assessment results

### Component Dependencies

```
HomePage
  ├─→ NavigationMenu
  ├─→ LanguageSelector
  ├─→ EnneagramIcon
  ├─→ DiscIcon
  ├─→ InsightsIcon
  └─→ useTranslations

SurveyWizard
  ├─→ NavigationMenu
  ├─→ EnneagramSurvey
  ├─→ DiscSurvey
  ├─→ InsightsSurvey
  ├─→ useTranslations
  └─→ Question Data (JSON)

SurveyReport
  ├─→ NavigationMenu
  ├─→ EnneagramReport
  │     └─→ usePdfExport
  ├─→ DiscReport
  │     └─→ usePdfExport
  ├─→ InsightsReport
  │     └─→ usePdfExport
  └─→ useTranslations
```

---

## 2. Process View (Dynamic Behavior)

### Purpose
Describes the system's runtime behavior, concurrency, and communication between components.

### User Journey: Complete Assessment Flow

```
┌────────┐     ┌──────────┐     ┌─────────────┐     ┌──────────┐
│  User  │     │ HomePage │     │SurveyWizard │     │  Report  │
└───┬────┘     └────┬─────┘     └──────┬──────┘     └────┬─────┘
    │               │                   │                 │
    │  1. Visit     │                   │                 │
    ├──────────────►│                   │                 │
    │               │                   │                 │
    │  2. Select    │                   │                 │
    │   Assessment  │                   │                 │
    ├──────────────►│                   │                 │
    │               │                   │                 │
    │               │  3. Navigate to   │                 │
    │               │   /survey/:type   │                 │
    │               ├──────────────────►│                 │
    │               │                   │                 │
    │               │  4. Load Survey   │                 │
    │               │     Component     │                 │
    │               │◄──────────────────┤                 │
    │               │                   │                 │
    │  5. Enter Name│                   │                 │
    ├───────────────┼──────────────────►│                 │
    │               │                   │                 │
    │               │  6. Save to       │                 │
    │               │   localStorage    │                 │
    │               │◄──────────────────┤                 │
    │               │                   │                 │
    │  7. Answer Q1 │                   │                 │
    ├───────────────┼──────────────────►│                 │
    │               │                   │                 │
    │  8. Next      │                   │                 │
    ├───────────────┼──────────────────►│                 │
    │               │                   │                 │
    │  ... repeat for all questions ... │                 │
    │               │                   │                 │
    │  9. Complete  │                   │                 │
    ├───────────────┼──────────────────►│                 │
    │               │                   │                 │
    │               │ 10. Save answers  │                 │
    │               │     Calculate     │                 │
    │               │     results       │                 │
    │               │◄──────────────────┤                 │
    │               │                   │                 │
    │               │ 11. Navigate to   │                 │
    │               │   /report/:type   │                 │
    │               ├──────────────────►┼────────────────►│
    │               │                   │                 │
    │               │ 12. Load results  │                 │
    │               │   from storage    │                 │
    │               │◄────────────────────────────────────┤
    │               │                   │                 │
    │ 13. View      │                   │                 │
    │    Report     │                   │                 │
    │◄──────────────┼──────────────────────────────────────┤
    │               │                   │                 │
    │ 14. Download  │                   │                 │
    │     PDF       │                   │                 │
    ├───────────────┼──────────────────────────────────────►│
    │               │                   │                 │
    │               │ 15. Generate PDF  │                 │
    │               │     (jsPDF)       │                 │
    │               │◄────────────────────────────────────┤
    │               │                   │                 │
    │ 16. Download  │                   │                 │
    │     Complete  │                   │                 │
    │◄──────────────┼──────────────────────────────────────┤
    │               │                   │                 │
```

### State Transitions

```
[Home Page]
    │
    │ Select Assessment
    ▼
[Name Input]
    │
    │ Enter Name & Start
    ▼
[Question 1/N]
    │
    │ Answer & Next
    ▼
[Question 2/N]
    │
    │ ... (can go back)
    ▼
[Question N/N]
    │
    │ Complete Assessment
    ▼
[Calculate Results]
    │
    │ Processing
    ▼
[Display Report]
    │
    ├─► Download PDF
    │
    └─► Take Another Assessment → [Home Page]
```

### Concurrent Processes

1. **UI Rendering Thread**
   - Vue reactivity system
   - DOM updates
   - Animation rendering

2. **Storage Operations**
   - localStorage read/write
   - Non-blocking async operations

3. **PDF Generation**
   - Canvas rendering (html2canvas)
   - PDF compilation (jsPDF)
   - File download trigger

4. **Language Loading**
   - Translation retrieval
   - UI text updates

---

## 3. Development View (Code Organization)

### Purpose
Describes the system from a programmer's perspective, including code organization and build system.

### Project Structure

```
Typix/
│
├── src/                          # Source code
│   ├── main.ts                   # Application entry point
│   ├── App.vue                   # Root component
│   ├── style.css                 # Global styles
│   │
│   ├── views/                    # Page-level components
│   │   ├── HomePage.vue
│   │   ├── SurveyWizard.vue
│   │   └── SurveyReport.vue
│   │
│   ├── components/               # Reusable components
│   │   ├── NavigationMenu.vue
│   │   ├── LanguageSelector.vue
│   │   ├── AppFooter.vue
│   │   ├── surveys/              # Survey-specific components
│   │   │   ├── EnneagramSurvey.vue
│   │   │   ├── DiscSurvey.vue
│   │   │   └── InsightsSurvey.vue
│   │   ├── reports/              # Report-specific components
│   │   │   ├── EnneagramReport.vue
│   │   │   ├── DiscReport.vue
│   │   │   └── InsightsReport.vue
│   │   └── icons/                # Icon components
│   │       ├── EnneagramIcon.vue
│   │       ├── DiscIcon.vue
│   │       └── InsightsIcon.vue
│   │
│   ├── composables/              # Reusable logic (Composition API)
│   │   ├── useTranslations.ts
│   │   └── usePdfExport.ts
│   │
│   ├── i18n/                     # Internationalization
│   │   └── translations.ts
│   │
│   ├── data/                     # Static data files
│   │   ├── enneagram-questions.json
│   │   ├── disc-questions.json
│   │   └── insights-questions.json
│   │
│   └── assets/                   # Static assets
│       └── vue.svg
│
├── docs/                         # Documentation
│   ├── architecture/             # Architecture docs
│   │   └── 4+1-model.md
│   ├── business/                 # Business docs
│   ├── functional/               # Functional specs
│   ├── diagrams/                 # Diagrams
│   │   └── use-cases.md
│   └── assets/                   # Documentation images
│       ├── disc-profile-sample.png
│       ├── enneagram.png
│       └── discovery.png
│
├── public/                       # Public static files
│   └── vite.svg
│
├── index.html                    # HTML entry point
├── package.json                  # Dependencies & scripts
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
├── tsconfig.app.json             # App-specific TS config
├── tsconfig.node.json            # Node-specific TS config
└── README.md                     # Project documentation
```

### Technology Stack

**Core Framework**
- Vue 3 (Composition API)
- TypeScript
- Vite (Build tool)

**Routing**
- Vue Router 4

**UI/Styling**
- CSS3 (Scoped styles)
- Responsive design (mobile-first)

**Charts & Visualization**
- Chart.js (for graphs)
- SVG (for custom visualizations)

**PDF Generation**
- jsPDF
- html2canvas

**State Management**
- Browser localStorage
- Vue 3 reactivity system

**Development Tools**
- TypeScript compiler (vue-tsc)
- Vite dev server
- npm scripts

### Build Pipeline

```
┌────────────────┐
│  Source Code   │
│   (TypeScript, │
│     Vue SFC)   │
└───────┬────────┘
        │
        ▼
┌────────────────┐
│  TypeScript    │
│   Compilation  │
│   (vue-tsc)    │
└───────┬────────┘
        │
        ▼
┌────────────────┐
│  Vue SFC       │
│  Compilation   │
│  (@vitejs/     │
│   plugin-vue)  │
└───────┬────────┘
        │
        ▼
┌────────────────┐
│  Module        │
│  Bundling      │
│  (Vite/        │
│   Rollup)      │
└───────┬────────┘
        │
        ▼
┌────────────────┐
│  Code          │
│  Minification  │
│  & Tree        │
│  Shaking       │
└───────┬────────┘
        │
        ▼
┌────────────────┐
│  Asset         │
│  Optimization  │
│  (Images, CSS) │
└───────┬────────┘
        │
        ▼
┌────────────────┐
│  Production    │
│  Build         │
│  (dist/)       │
└────────────────┘
```

### Development Workflow

1. **Development**
   ```bash
   npm install        # Install dependencies
   npm run dev        # Start dev server
   ```

2. **Building**
   ```bash
   npm run build      # Production build
   ```

3. **Deployment**
   ```bash
   npm run deploy     # Deploy to GitHub Pages
   ```

### Code Conventions

**TypeScript**
- Strict type checking enabled
- Interface definitions for props
- Type inference where possible

**Vue Components**
- Single File Components (SFC)
- Composition API with `<script setup>`
- Scoped styles
- Props validation with TypeScript

**Naming Conventions**
- Components: PascalCase (e.g., `HomePage.vue`)
- Composables: camelCase with "use" prefix (e.g., `useTranslations.ts`)
- Files: kebab-case for data files (e.g., `disc-questions.json`)

---

## 4. Physical View (Deployment Architecture)

### Purpose
Describes how the software is deployed on hardware/infrastructure.

### Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         GitHub Pages                            │
│                    (Static Hosting - CDN)                       │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                   Production Build                         │ │
│  │                      (dist/)                               │ │
│  │                                                            │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │ │
│  │  │index.html│  │   CSS    │  │    JS    │  │  Assets  │ │ │
│  │  │          │  │(minified)│  │(bundled) │  │  (SVG,   │ │ │
│  │  │          │  │          │  │          │  │   PNG)   │ │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │ │
│  │                                                            │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      User's Browser                             │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                    Client-Side Application                 │ │
│  │                                                            │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐ │ │
│  │  │ Vue Runtime  │  │  localStorage│  │   IndexedDB     │ │ │
│  │  │   (SPA)      │  │   (5-10MB)   │  │   (Future)      │ │ │
│  │  └──────────────┘  └──────────────┘  └─────────────────┘ │ │
│  │                                                            │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Deployment Characteristics

**Hosting Platform**: GitHub Pages
- Static file hosting
- HTTPS enabled
- Global CDN distribution
- Automatic deployments via GitHub Actions (gh-pages)

**URL Structure**
- Production: `https://janvanwassenhove.github.io/Typix`
- Base path: `/Typix/` (configured in vite.config.ts)

**Client-Side Architecture**
- Single Page Application (SPA)
- Hash-based routing (for GitHub Pages compatibility)
- All logic runs in browser
- No backend server required

**Storage**
- Browser localStorage:
  - User preferences (language)
  - Assessment answers
  - Results data
  - User name
- Capacity: ~5-10MB per domain

**Performance Optimization**
- Code splitting (dynamic imports)
- Tree shaking (unused code removal)
- Minification (CSS and JS)
- Gzip compression
- Lazy loading of images

### Network Communication

```
User Browser ←──HTTPS──→ GitHub Pages CDN
     │
     └─→ No backend API calls
     └─→ All data stored locally
     └─→ No external services (except GitHub Pages)
```

**Key Characteristics**:
- **Zero Backend**: No server-side processing
- **Privacy-First**: No data leaves the browser
- **Offline-Ready**: Can work offline after initial load (with service worker in future)
- **Fast Load**: Static assets served from CDN
- **Low Cost**: Free hosting on GitHub Pages

### Scalability

**Current Scale**
- Unlimited concurrent users (static hosting)
- No database or server constraints
- CDN handles global traffic

**Limitations**
- localStorage size (~5-10MB per user)
- No server-side data persistence
- No user accounts or authentication

**Future Enhancements**
- Service Worker for offline support
- IndexedDB for larger data storage
- Progressive Web App (PWA) capabilities

---

## 5. Scenarios (Use Cases)

### Purpose
Illustrates the architecture with key use cases, tying together the other four views.

### Scenario 1: User Takes DISC Assessment

**Architectural Impact**:

1. **Logical View**:
   - `HomePage` → `SurveyWizard` → `DiscSurvey` → `SurveyReport` → `DiscReport`
   - Uses `useTranslations` composable
   - Uses `usePdfExport` composable

2. **Process View**:
   - User navigates to homepage
   - Router loads `SurveyWizard` with type="disc"
   - Component loads `disc-questions.json`
   - Each answer updates reactive state
   - On completion, results saved to localStorage
   - Router navigates to report page
   - Report calculates DISC profile from stored answers

3. **Development View**:
   - Code location: `src/views/SurveyWizard.vue`
   - Survey component: `src/components/surveys/DiscSurvey.vue`
   - Report component: `src/components/reports/DiscReport.vue`
   - Questions: `src/data/disc-questions.json`

4. **Physical View**:
   - All assets loaded from GitHub Pages CDN
   - Answers stored in browser localStorage
   - PDF generated client-side and downloaded

### Scenario 2: Multilingual User Experience

**Architectural Impact**:

1. **Logical View**:
   - `LanguageSelector` component updates global language state
   - `useTranslations` composable provides reactive translations
   - All components re-render with new language

2. **Process View**:
   - User clicks language selector
   - Language preference saved to localStorage
   - Reactive state updates trigger re-render
   - All text updated to new language

3. **Development View**:
   - Translations defined in `src/i18n/translations.ts`
   - 5 languages: EN, NL, DE, ES, FR
   - Components access via `useTranslations` composable

4. **Physical View**:
   - All translations bundled in initial load
   - No additional network requests
   - Language preference persists in localStorage

### Scenario 3: PDF Report Generation

**Architectural Impact**:

1. **Logical View**:
   - Report component uses `usePdfExport` composable
   - jsPDF and html2canvas libraries invoked
   - DOM elements captured and converted

2. **Process View**:
   - User clicks "Download PDF" button
   - Report HTML rendered to canvas (html2canvas)
   - Canvas converted to PDF (jsPDF)
   - Browser triggers download

3. **Development View**:
   - PDF logic in `src/composables/usePdfExport.ts`
   - Dependencies: jspdf, html2canvas
   - Used by all report components

4. **Physical View**:
   - All processing done client-side
   - No server involved
   - PDF file downloaded directly to user's device

---

## Summary

The Typix architecture is designed as a **modern, client-side SPA** with the following key characteristics:

### Strengths
- ✅ Zero backend infrastructure (cost-effective)
- ✅ Privacy-first (no data leaves browser)
- ✅ Fast and responsive (CDN-served)
- ✅ Multi-language support
- ✅ Offline-capable (localStorage)
- ✅ Easy to deploy (GitHub Pages)
- ✅ Scalable (static hosting)

### Architectural Decisions
1. **Vue 3 with Composition API**: Modern, reactive framework
2. **TypeScript**: Type safety and better developer experience
3. **Vite**: Fast build tool and dev server
4. **Hash Router**: Compatibility with GitHub Pages
5. **localStorage**: Client-side persistence
6. **jsPDF**: Client-side PDF generation
7. **Static Hosting**: No server required

### Future Considerations
- Progressive Web App (PWA) features
- Service Worker for offline support
- IndexedDB for larger data sets
- User accounts (optional backend)
- Assessment history tracking
- Social sharing features

