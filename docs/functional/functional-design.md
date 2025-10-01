# Functional Design Document

## Overview
This document describes the functional requirements and design specifications for the Typix personality assessment platform.

---

## 1. System Functional Requirements

### 1.1 Core Functions

#### FR-1: Assessment Selection
**Description**: Users must be able to select from available personality assessments.

**Requirements**:
- Display three assessment cards: DISC, Enneagram, Typix Discovery
- Each card shows:
  - Assessment name
  - Brief description
  - Key features (3-4 bullet points)
  - Difficulty level
  - Start button
- Cards are responsive (grid layout on desktop, stack on mobile)
- Visual icons for each assessment type

**Success Criteria**:
- User can identify assessment differences
- All three assessments are accessible
- Responsive design works on mobile, tablet, desktop

---

#### FR-2: Language Selection
**Description**: Users must be able to select their preferred language.

**Requirements**:
- Language selector visible on all pages
- Supported languages: English, Dutch, German, Spanish, French
- Visual flags or language codes (EN, NL, DE, ES, FR)
- Language preference persists across sessions
- All UI text updates immediately on language change
- Assessment questions translate to selected language

**Success Criteria**:
- Language changes apply to entire UI
- Selection persists in localStorage
- No page reload required
- Questions and reports fully translated

---

#### FR-3: User Name Input
**Description**: Users must provide their name before taking an assessment.

**Requirements**:
- Name input screen appears before assessment questions
- Text input field with placeholder
- Validation: Name cannot be empty
- Start button disabled until valid name entered
- Name saved to localStorage
- Name appears on report

**Success Criteria**:
- Name validation prevents empty submissions
- Name persists for report generation
- Clear UX for name entry

---

#### FR-4: Question Presentation
**Description**: Present assessment questions in a clear, progressive format.

**Requirements**:
- One question per screen
- Progress indicator showing current question number and total
- Progress bar (visual representation)
- Question text clearly readable
- Answer options appropriate to assessment type:
  - DISC: 5-point rating scale
  - Enneagram: Multiple choice (4-5 options)
  - Insights: Rating scale or multiple choice
- Navigation buttons (Next, Previous)
- Previous button hidden on first question
- Next button appears after answer selected

**Success Criteria**:
- Questions easy to read and understand
- Progress clearly indicated
- Users can navigate forward and backward
- Answers are saved

---

#### FR-5: Answer Collection and Storage
**Description**: Collect and store user responses securely.

**Requirements**:
- Store each answer as user progresses
- Use browser localStorage for persistence
- Data structure: JSON object with question ID and answer
- Answers persist if user leaves and returns
- Answers can be modified by going back
- No server communication (all client-side)

**Data Structure**:
```json
{
  "userName": "John Doe",
  "assessmentType": "disc",
  "answers": {
    "0": 4,
    "1": 2,
    "2": 5,
    ...
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Success Criteria**:
- All answers saved to localStorage
- Data persists across sessions
- Data can be retrieved for report generation
- No data loss during navigation

---

#### FR-6: Score Calculation
**Description**: Calculate assessment scores based on user responses.

**DISC Calculation**:
- Each question maps to D, I, S, or C dimension
- Sum scores for each dimension
- Calculate percentages
- Determine primary style (highest score)
- Determine secondary style (second highest)
- Generate profile combination (e.g., "D/I")

**Enneagram Calculation**:
- Each answer contributes to one or more type scores
- Sum scores for each of 9 types
- Determine dominant type (highest score)
- Identify wing types (adjacent types)

**Insights Calculation**:
- Questions map to color energies: Red, Blue, Yellow, Green
- Calculate scores for each color
- Determine conscious vs. less conscious energies
- Calculate preference flow percentages

**Success Criteria**:
- Calculations are accurate and consistent
- Primary and secondary types identified
- Results reproducible with same answers

---

#### FR-7: Report Generation
**Description**: Generate comprehensive reports based on assessment results.

**Requirements**:
- Display results immediately after assessment completion
- Report includes:
  - User name
  - Assessment type
  - Primary profile/type
  - Visual representations (charts, diagrams)
  - Detailed descriptions
  - Behavioral insights
  - Strengths and potential pitfalls
  - Communication tips
  - Team collaboration suggestions
- Reports fully responsive
- Professional styling and layout

**DISC Report Components**:
- DISC bar chart showing percentages
- Primary style badge
- Profile combination (e.g., "D/I - INITIATOR")
- Key characteristics list
- Behavioral strengths
- Communication & work style tips
- Team collaboration insights

**Enneagram Report Components**:
- Enneagram diagram with highlighted type
- Type number and name
- Core motivations and fears
- Growth paths
- Stress responses
- Integration and disintegration arrows

**Insights Report Components**:
- Color wheel visualization
- Energy distribution chart
- Conscious vs. less conscious personas
- Preference flow analysis
- Pitfalls description
- Good day behaviors
- Strong day characteristics

**Success Criteria**:
- Report accurately reflects assessment results
- Visualizations render correctly
- Content is comprehensive and actionable
- Report is readable on all devices

---

#### FR-8: PDF Export
**Description**: Allow users to download reports as PDF files.

**Requirements**:
- "Download PDF Report" button on report page
- PDF includes all report content:
  - Charts and visualizations
  - Text descriptions
  - User name
  - Assessment type
- PDF filename format: `{AssessmentType}-Report-{ProfileType}.pdf`
- PDF generation shows loading indicator
- Error handling if generation fails

**Technical Requirements**:
- Use jsPDF library for PDF creation
- Use html2canvas for chart rendering
- Capture report DOM elements
- Convert to PDF with proper formatting
- Trigger browser download

**Success Criteria**:
- PDF accurately represents on-screen report
- Charts render clearly in PDF
- PDF is professionally formatted
- Download completes successfully
- Filename is descriptive

---

### 1.2 Navigation Functions

#### FR-9: Page Navigation
**Description**: Users must be able to navigate between pages.

**Requirements**:
- Home page (/)
- Survey wizard (/survey/:type)
- Report page (/report/:type)
- Navigation menu visible on all pages
- Back to home button on survey and report pages
- "Take Another Assessment" button on report page
- Browser back button supported

**Success Criteria**:
- All pages accessible via navigation
- URLs are bookmarkable
- Browser history works correctly
- No navigation errors

---

#### FR-10: Question Navigation
**Description**: Users must be able to navigate between questions within an assessment.

**Requirements**:
- "Next" button to advance to next question
- "Previous" button to go back (except on first question)
- Clicking "Next" on last question navigates to report
- Progress not lost when going back
- Answers can be changed by going back
- Disabled state for navigation when invalid

**Success Criteria**:
- Users can freely navigate questions
- Progress is saved
- Answers persist when navigating
- Last question leads to report

---

### 1.3 Data Persistence Functions

#### FR-11: Local Storage Management
**Description**: Manage data persistence using browser localStorage.

**Data Stored**:
- User name
- Language preference
- Assessment answers
- Assessment results
- Timestamps

**Requirements**:
- Data written to localStorage after each change
- Data retrieved on page load
- Data cleared when starting new assessment (optional)
- Data persists indefinitely (until browser clear)
- No server synchronization

**Storage Keys**:
- `typix_language`: User's language preference
- `typix_userName`: User's name
- `typix_{assessmentType}_answers`: Assessment answers
- `typix_{assessmentType}_results`: Calculated results

**Success Criteria**:
- Data persists across sessions
- Data retrieved correctly
- No data corruption
- Storage limits respected (~5MB)

---

## 2. User Interface Requirements

### 2.1 Visual Design

#### UI-1: Color Scheme
**Requirements**:
- Primary color: Green (#1A4731) - professional, growth-oriented
- Secondary colors: Assessment-specific (see below)
- Neutral colors: White, grays for backgrounds
- Text: Dark gray (#333) for readability

**Assessment Colors**:
- DISC: Red (#FF6B6B), Yellow (#FFD93D), Green (#6BCF7F), Blue (#4ECDC4)
- Enneagram: Purple (#6C63FF)
- Insights: Red, Blue, Yellow, Green (color psychology)

---

#### UI-2: Typography
**Requirements**:
- System fonts for fast loading
- Font family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- Heading sizes: 2.5rem (h1), 2rem (h2), 1.5rem (h3)
- Body text: 1rem (16px base)
- Line height: 1.6 for readability
- Font weight: 400 (normal), 600 (semi-bold), 700 (bold)

---

#### UI-3: Layout
**Requirements**:
- Responsive design: mobile-first approach
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- Maximum content width: 1200px
- Padding: 20px (mobile), 40px (desktop)
- Grid layout for cards (1 column mobile, 3 columns desktop)

---

#### UI-4: Interactive Elements
**Requirements**:
- Buttons:
  - Primary: Green background, white text, hover effect
  - Secondary: White background, green border, hover effect
  - Disabled: Gray, no hover
- Form inputs:
  - Clear borders
  - Focus state (blue outline)
  - Placeholder text
- Links:
  - Underlined on hover
  - Color: Primary green
- Loading states:
  - Spinners or progress indicators
  - Disabled interactions during loading

---

### 2.2 Accessibility

#### A11Y-1: Keyboard Navigation
**Requirements**:
- All interactive elements keyboard-accessible
- Tab order logical and intuitive
- Enter key activates buttons
- Escape key cancels modals (if applicable)
- Focus indicators visible

---

#### A11Y-2: Screen Reader Support
**Requirements**:
- Semantic HTML elements (header, nav, main, footer)
- ARIA labels where necessary
- Alt text for images and icons
- Meaningful page titles
- Form labels associated with inputs

---

#### A11Y-3: Visual Accessibility
**Requirements**:
- Color contrast ratio: 4.5:1 minimum (WCAG AA)
- Text resizable up to 200%
- No information conveyed by color alone
- Focus indicators visible
- Sufficient spacing between interactive elements (44px touch targets)

---

## 3. Performance Requirements

### 3.1 Loading Performance

#### PERF-1: Initial Page Load
**Requirements**:
- Time to First Byte (TTFB): < 500ms
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3s
- Total page size: < 500KB initial load

**Strategies**:
- Code splitting
- Lazy loading
- Minification
- Gzip compression
- CDN delivery

---

#### PERF-2: Runtime Performance
**Requirements**:
- 60 FPS for animations
- Instant response to user interactions (<100ms)
- Smooth scrolling
- No layout shifts (CLS < 0.1)
- Efficient memory usage

---

### 3.2 Browser Support

#### COMPAT-1: Supported Browsers
**Requirements**:
- Chrome 90+ (and Chromium-based browsers)
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

**Fallbacks**:
- Polyfills for older browsers (if needed)
- Graceful degradation
- Clear messaging for unsupported browsers

---

## 4. Security and Privacy

### 4.1 Data Privacy

#### PRIV-1: No Server-Side Data Storage
**Requirements**:
- No user data sent to servers
- No tracking cookies
- No analytics (or privacy-respecting analytics only)
- No third-party data sharing
- All processing client-side

---

#### PRIV-2: GDPR Compliance
**Requirements**:
- Privacy policy available
- No personal data collected beyond what user provides
- User controls their data (localStorage)
- Right to be forgotten (clear browser data)
- Transparent about data usage

---

### 4.2 Input Validation

#### SEC-1: Input Sanitization
**Requirements**:
- Sanitize all user inputs (name, answers)
- Prevent XSS attacks
- Validate data types
- Limit input lengths
- Escape HTML entities

---

## 5. Error Handling

### 5.1 User-Facing Errors

#### ERR-1: Error Messages
**Requirements**:
- Clear, user-friendly error messages
- Actionable guidance (what to do next)
- No technical jargon
- Appropriate tone (helpful, not blaming)

**Common Errors**:
- Name not provided
- Question not answered
- PDF generation failed
- Browser not supported
- localStorage quota exceeded

---

#### ERR-2: Graceful Degradation
**Requirements**:
- System remains usable if non-critical features fail
- PDF generation failure doesn't break report viewing
- Missing translations fall back to English
- Charts fail gracefully (show table instead)

---

## 6. Internationalization (i18n)

### 6.1 Language Support

#### I18N-1: Supported Languages
**Requirements**:
- English (EN) - default
- Dutch (NL)
- German (DE)
- Spanish (ES)
- French (FR)

---

#### I18N-2: Translation Coverage
**Requirements**:
- UI labels and buttons
- Navigation menus
- Assessment questions
- Report descriptions
- Error messages
- Help text

**Not Translated**:
- User-provided names
- Technical errors (for debugging)

---

#### I18N-3: Cultural Adaptation
**Requirements**:
- Date formats per locale
- Number formats per locale
- Text direction (LTR only for initial languages)
- Cultural appropriateness of content

---

## 7. Testing Requirements

### 7.1 Functional Testing

#### TEST-1: User Flow Testing
**Test Cases**:
1. Complete DISC assessment end-to-end
2. Complete Enneagram assessment end-to-end
3. Complete Insights assessment end-to-end
4. Change language mid-assessment
5. Navigate back through questions
6. Generate PDF report
7. Take multiple assessments in one session

---

#### TEST-2: Cross-Browser Testing
**Test Cases**:
- Test on Chrome, Firefox, Safari, Edge
- Test on mobile browsers (iOS, Android)
- Test on different screen sizes
- Test with different zoom levels

---

#### TEST-3: Accessibility Testing
**Test Cases**:
- Keyboard navigation only
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Color contrast verification
- Text resize testing
- Focus indicator visibility

---

## 8. Future Enhancements

### 8.1 Planned Features

#### FUT-1: Assessment History
- Store multiple assessment attempts
- Compare results over time
- Track personal growth

#### FUT-2: Team Comparisons
- Compare multiple users' profiles
- Team compatibility insights
- Collaboration recommendations

#### FUT-3: Advanced Reports
- More detailed behavioral insights
- Career recommendations
- Communication style matrix

#### FUT-4: Social Sharing
- Share results on social media
- Generate shareable images
- Anonymous comparison with population

#### FUT-5: Offline Support
- Service Worker implementation
- Work without internet after first load
- Sync when back online (optional)

---

## 9. Acceptance Criteria

### 9.1 Definition of Done

A feature is complete when:
- ✅ Code implemented and reviewed
- ✅ Unit tests passing (if applicable)
- ✅ Manual testing completed
- ✅ Cross-browser testing completed
- ✅ Accessibility tested
- ✅ Documentation updated
- ✅ No critical bugs
- ✅ Performance benchmarks met

### 9.2 Release Criteria

A release is ready when:
- ✅ All planned features complete
- ✅ No critical or high-priority bugs
- ✅ All tests passing
- ✅ Performance targets met
- ✅ Security review completed
- ✅ Documentation up-to-date
- ✅ Stakeholder approval

---

## 10. Appendix

### 10.1 Assessment Question Counts

| Assessment | Questions | Est. Time |
|-----------|-----------|-----------|
| DISC | 24 | 10 minutes |
| Enneagram | 36 | 12 minutes |
| Insights | 25 | 15 minutes |

### 10.2 localStorage Size Estimates

| Data Type | Size | Max Users |
|-----------|------|-----------|
| Language Pref | ~50 bytes | N/A |
| User Name | ~100 bytes | N/A |
| DISC Answers | ~500 bytes | N/A |
| Enneagram Answers | ~700 bytes | N/A |
| Insights Answers | ~600 bytes | N/A |
| Results Data | ~2KB per assessment | N/A |
| **Total per User** | **~5KB** | **~1000 assessments** |

### 10.3 Technical Stack Reference

| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | Vue | 3.5+ |
| Language | TypeScript | 5.5+ |
| Build Tool | Vite | 5.4+ |
| Routing | Vue Router | 4.2+ |
| Charts | Chart.js | 4.4+ |
| PDF | jsPDF | 2.5+ |
| Canvas | html2canvas | 1.4+ |

