# Typix

Typix is a web application for taking and generating reports for three popular personality assessments: DISC, Enneagram, and Insights. The project is built with Vue 3 and Vite, providing a fast and modern development experience.

## Assessments Overview

### 1. DISC Assessment
- **Purpose:** Measures four personality traits: Dominance, Influence, Steadiness, and Conscientiousness.
- **How it works:** Each of the 50 questions describes a real situation and offers one response per style, written for that situation. Your picks are counted, converted to percentages that sum to 100, and the two strongest styles form your profile combination — one of twelve, such as `D/I` or `S/C`.

![DISC question](docs/assets/reports/disc-question.png)

![Sample Typix DISC report](docs/assets/disc-profile-sample.png)

The wheel splits each style's quadrant between its two neighbours. The highlighted segment is your combination; the marker is placed from your actual score distribution, so a balanced profile sits near the centre and a concentrated one sits near the rim.

![DISC wheel](docs/assets/reports/disc-wheel.png)

Reports are written in all five supported languages, not just their headings — the same report in Dutch:

![DISC report in Dutch](docs/assets/reports/disc-report-nl.png)

Every report also names the style behind your second-highest score, because on most profiles the runner-up is only a few points back.

![DISC secondary style](docs/assets/reports/disc-secondary-style.png)

### 2. Enneagram Assessment
- **Purpose:** Identifies which of the nine Enneagram types best describes the user.
- **How it works:** Every statement belongs to one type and is answered on a 0–6 agreement scale. Each type scores the agreement it collected as a share of the agreement it could have collected, which keeps types comparable even though they are covered by different numbers of questions.

![Sample Typix Enneagram report](docs/assets/enneagram.png)

Each bar carries the agreement it collected alongside the percentage, so it is visible that the types are covered by different numbers of questions and that the percentage is a normalised share rather than a raw count.

![Enneagram type scores](docs/assets/reports/enneagram-raw-scores.png)

The symbol uses the standard layout — 9 at the top, 1 to 8 clockwise, the 3–6–9 triangle and the 1–4–2–8–5–7 hexad. Your type is highlighted with its wing, its growth (integration) line and its stress (disintegration) line.

![Enneagram symbol](docs/assets/reports/enneagram-symbol.png)

The report also names your type's centre of intelligence — the group of three types that meets the world the same way and carries the same underlying tension.

![Enneagram centre of intelligence](docs/assets/reports/enneagram-centre.png)

### 3. Typix Discovery Assessment
- **Purpose:** Typix Discovery model, this assessment helps users understand their communication and working styles.
- **How it works:** Each option carries a colour energy (Red, Yellow, Blue, Green). Your picks are counted and plotted on the colour wheel, where opposing energies cancel out.

![Sample Typix Discovery report](docs/assets/discovery.png)

![Discovery wheel](docs/assets/reports/insights-wheel.png)

The chart labels follow the selected language too — the same wheel in Dutch:

![Discovery wheel in Dutch](docs/assets/reports/insights-wheel-nl.png)

The colour energy profile restates your percentages on the 0–6 preference scale and shows how far each colour sits from an even 25% split.

![Discovery colour energy profile](docs/assets/reports/insights-energy-profile.png)

## How firm is the result?

A ranked result invites you to read the top entry as *the* answer. Every report says how much
weight that top entry can actually carry, from two numbers it already reports: the gap between
the leader and the runner-up, and how concentrated the profile is overall.

![Result confidence](docs/assets/reports/result-confidence.png)

The gap is judged against an even split rather than in absolute points — five points means
something different when the average key holds 25% (DISC, Discovery) than when it holds 11%
(Enneagram). The Enneagram report adds a note when the answering pattern itself compressed the
differences: agreeing with almost every statement lifts all nine types at once, and the ranking
that survives rests on very little.

None of this is norm-referenced. Typix has no norm group, so the reports carry no percentiles,
no role recommendations and no compatibility scores — every number shown is a share of your own
answers.

## The PDF report

Every report exports as a typeset PDF rather than a screenshot of the page: the text is
selectable and searchable, sections are never split across a page break, and a full report is a
few hundred kilobytes.

| Cover | Content page |
|---|---|
| ![PDF cover](docs/assets/reports/pdf-cover.png) | ![PDF content page](docs/assets/reports/pdf-page.png) |

The document is assembled by `src/pdf/`: a small layout engine over jsPDF with a vertical cursor,
measured blocks and automatic page breaks. Charts are embedded from the live canvas at twice
display resolution. Every string is written in the language the report is being read in, and the
file carries proper PDF metadata.

The PDF carries the same sections as the on-screen report — the confidence block, the secondary
profile, the Enneagram centre and runner-up, and the raw counts under each bar. The strings are
passed in from the component that rendered them, so the two cannot drift apart.

## Project Structure
- `src/components/surveys/`: Survey components for each assessment.
- `src/components/reports/`: Report components for each assessment.
- `src/scoring/`: Pure scoring logic for each assessment, plus its unit tests.
- `src/pdf/`: PDF layout engine, cover page and the per-assessment document builders.
- `src/data/`: Question sets in five languages. Every option carries the dimension it scores.
- `src/i18n/`: UI strings, plus the report body copy under `src/i18n/content/`.
- `src/views/`: Main views, including the homepage, survey wizard, and report page.
- `src/composables/`: Reusable logic, such as PDF export and translations.

Scoring lives in `src/scoring/` rather than in the report components, so it can be tested
without a browser and so every part of a report reads the same numbers.

## Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/janvanwassenhove/typix.git
   cd typix
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. Open your browser and navigate to `http://localhost:5174` (or the port shown in your terminal).

### Running the tests

```sh
npm test
```

The suite covers the scoring modules — percentages summing to 100, every Enneagram type and
every DISC combination being reachable, consistent tie-breaking, wheel geometry, and no `NaN`
for an unanswered assessment — and the content: every language defines the same keys, every
profile is written in every language, and no two questions share the same answer options.

CI runs the same tests and a production build on every pull request.

Layout and chart rendering are not covered by the suite; they are checked by driving the app in
a browser. See the Verified section of the release notes for what that pass covers.

## Release notes

See [docs/RELEASE_NOTES.md](docs/RELEASE_NOTES.md) for what changed in each release, including
screenshots of every report.

## Accessing on GitHub

You can find the source code and contribute to Typix on GitHub:

[https://github.com/janvanwassenhove/typix](https://github.com/janvanwassenhove/typix)

## Live Demo

You can try Typix live at:  
[https://janvanwassenhove.github.io/Typix](https://janvanwassenhove.github.io/Typix)
