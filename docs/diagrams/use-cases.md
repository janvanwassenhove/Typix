# Use Case Diagrams

## Overview
This document describes the use cases for the Typix personality assessment platform. The platform supports three types of personality assessments: DISC, Enneagram, and Typix Discovery (Insights).

## Actors
- **User**: End user who takes personality assessments and views reports
- **System**: The Typix web application

## Use Case 1: Take DISC Assessment

```
┌───────────────────────────────────────────────────┐
│                 DISC Assessment                   │
│                                                   │
│  ┌─────────┐                                      │
│  │  User   │                                      │
│  └────┬────┘                                      │
│       │                                           │
│       │ 1. Select DISC Assessment                 │
│       ├──────────────────────────►                │
│       │                                           │
│       │ 2. Enter Name                             │
│       ├──────────────────────────►                │
│       │                                           │
│       │ 3. Answer Questions                       │
│       │    (Rate statements on scale)             │
│       ├──────────────────────────►                │
│       │                                           │
│       │ 4. Submit Responses                       │
│       ├──────────────────────────►                │
│       │                                           │
│       │ 5. View DISC Profile                      │
│       │◄──────────────────────────                │
│       │    (D, I, S, C scores)                    │
│       │                                           │
│       │ 6. Download PDF Report                    │
│       ├──────────────────────────►                │
│       │                                           │
│       │ 7. View Behavioral Insights               │
│       │◄──────────────────────────                │
│       │                                           │
└───────────────────────────────────────────────────┘
```

**Primary Flow:**
1. User selects DISC assessment from home page
2. System displays name input screen
3. User enters their name and clicks start
4. System displays first question
5. User rates statements on a scale (1-5)
6. User navigates through questions using Next/Previous buttons
7. System tracks progress (e.g., "Question 5 of 24")
8. After last question, system calculates DISC scores
9. System displays comprehensive report with:
   - Primary style (D, I, S, or C)
   - Profile combination (e.g., D/I, S/C)
   - Behavioral strengths
   - Communication & work style tips
   - Team collaboration insights
10. User can download report as PDF
11. User can take another assessment

**Alternative Flows:**
- A1: User goes back to previous questions to change answers
- A2: User abandons assessment midway (progress is saved in localStorage)
- A3: User changes language, translations are applied to questions

---

## Use Case 2: Take Enneagram Assessment

```
┌───────────────────────────────────────────────────┐
│              Enneagram Assessment                 │
│                                                   │
│  ┌─────────┐                                      │
│  │  User   │                                      │
│  └────┬────┘                                      │
│       │                                           │
│       │ 1. Select Enneagram Assessment            │
│       ├──────────────────────────►                │
│       │                                           │
│       │ 2. Enter Name                             │
│       ├──────────────────────────►                │
│       │                                           │
│       │ 3. Answer Questions                       │
│       │    (Choose best description)              │
│       ├──────────────────────────►                │
│       │                                           │
│       │ 4. Submit Responses                       │
│       ├──────────────────────────►                │
│       │                                           │
│       │ 5. View Enneagram Type                    │
│       │◄──────────────────────────                │
│       │    (Type 1-9)                             │
│       │                                           │
│       │ 6. View Type Description                  │
│       │◄──────────────────────────                │
│       │                                           │
│       │ 7. Download PDF Report                    │
│       ├──────────────────────────►                │
│       │                                           │
└───────────────────────────────────────────────────┘
```

**Primary Flow:**
1. User selects Enneagram assessment from home page
2. System displays name input screen
3. User enters their name and clicks start
4. System displays first question with multiple choice options
5. User selects the option that best describes them
6. User navigates through questions
7. System tracks progress
8. After last question, system calculates Enneagram type scores
9. System displays report with:
   - Primary Enneagram type (1-9)
   - Type name (e.g., "The Achiever")
   - Core motivations and fears
   - Growth paths and stress responses
   - Enneagram diagram showing connections
10. User can download report as PDF
11. User can take another assessment

**Alternative Flows:**
- A1: User reviews previous questions
- A2: User changes language preference
- A3: User returns to home page

---

## Use Case 3: Take Typix Discovery (Insights) Assessment

```
┌───────────────────────────────────────────────────┐
│          Typix Discovery Assessment               │
│                                                   │
│  ┌─────────┐                                      │
│  │  User   │                                      │
│  └────┬────┘                                      │
│       │                                           │
│       │ 1. Select Insights Assessment             │
│       ├──────────────────────────►                │
│       │                                           │
│       │ 2. Enter Name                             │
│       ├──────────────────────────►                │
│       │                                           │
│       │ 3. Answer Questions                       │
│       │    (Rate behavioral traits)               │
│       ├──────────────────────────►                │
│       │                                           │
│       │ 4. Submit Responses                       │
│       ├──────────────────────────►                │
│       │                                           │
│       │ 5. View Color Profile                     │
│       │◄──────────────────────────                │
│       │    (Red/Blue/Yellow/Green)                │
│       │                                           │
│       │ 6. View Energy Dynamics                   │
│       │◄──────────────────────────                │
│       │                                           │
│       │ 7. View Pitfalls & Strengths              │
│       │◄──────────────────────────                │
│       │                                           │
│       │ 8. Download PDF Report                    │
│       ├──────────────────────────►                │
│       │                                           │
└───────────────────────────────────────────────────┘
```

**Primary Flow:**
1. User selects Typix Discovery assessment from home page
2. System displays name input screen
3. User enters their name and clicks start
4. System displays questions about behavioral traits
5. User rates how much each trait applies to them
6. User progresses through all questions
7. System calculates color energy scores
8. System displays comprehensive report with:
   - Color wheel showing dominant energies
   - Energy dynamics (Conscious/Less Conscious persona)
   - Preference flow percentages
   - "Your Pitfalls" insights
   - "Your Good Day" behaviors
   - "Your Strong Day" characteristics
9. User can download report as PDF
10. User can take another assessment

**Alternative Flows:**
- A1: User navigates back through questions
- A2: User switches language
- A3: Assessment saved if interrupted

---

## Use Case 4: Change Language

```
┌───────────────────────────────────────────────────┐
│              Change Language                      │
│                                                   │
│  ┌─────────┐                                      │
│  │  User   │                                      │
│  └────┬────┘                                      │
│       │                                           │
│       │ 1. Click Language Selector                │
│       ├──────────────────────────►                │
│       │                                           │
│       │ 2. Select Preferred Language              │
│       │    (EN/NL/DE/ES/FR)                       │
│       ├──────────────────────────►                │
│       │                                           │
│       │ 3. View Translated UI                     │
│       │◄──────────────────────────                │
│       │                                           │
└───────────────────────────────────────────────────┘
```

**Primary Flow:**
1. User clicks language selector (globe icon) in navigation
2. System displays language options: English, Dutch, German, Spanish, French
3. User selects desired language
4. System updates all UI text to selected language
5. Language preference is saved in localStorage
6. Questions and reports are displayed in selected language

---

## Use Case 5: Download PDF Report

```
┌───────────────────────────────────────────────────┐
│              Download PDF Report                  │
│                                                   │
│  ┌─────────┐                                      │
│  │  User   │                                      │
│  └────┬────┘                                      │
│       │                                           │
│       │ 1. View Assessment Report                 │
│       ├──────────────────────────►                │
│       │                                           │
│       │ 2. Click "Download PDF Report"            │
│       ├──────────────────────────►                │
│       │                                           │
│       │ 3. Generate PDF                           │
│       │    (with charts & insights)               │
│       │◄──────────────────────────                │
│       │                                           │
│       │ 4. Download PDF File                      │
│       │◄──────────────────────────                │
│       │                                           │
└───────────────────────────────────────────────────┘
```

**Primary Flow:**
1. User completes an assessment and views their report
2. User clicks "Download PDF Report" button
3. System shows "Generating PDF..." message
4. System captures report content including:
   - Charts and visualizations
   - Profile information
   - Behavioral insights
   - User's name
5. System generates PDF using jsPDF and html2canvas
6. Browser downloads PDF with filename format: `{ASSESSMENT}-Report-{PROFILE}.pdf`
7. User can open or save the PDF

**Alternative Flows:**
- A1: PDF generation fails, system shows error message
- A2: User cancels download

---

## System Features Summary

### Core Features
1. **Multi-Assessment Support**: Three distinct personality assessment types
2. **Progressive Question Flow**: Step-by-step questionnaire with progress tracking
3. **Real-time Scoring**: Automatic calculation of assessment results
4. **Visual Reports**: Charts, color wheels, and diagrams for results
5. **PDF Export**: High-quality PDF report generation
6. **Multi-language Support**: 5 languages (EN, NL, DE, ES, FR)
7. **Responsive Design**: Works on desktop, tablet, and mobile devices
8. **Local Storage**: Saves progress and preferences

### User Benefits
- Easy-to-use interface
- Comprehensive personality insights
- Professional-quality reports
- Shareable PDF reports
- No account required
- Free to use
- Privacy-focused (no data sent to servers)

