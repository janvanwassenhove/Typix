# Typix Documentation

Welcome to the comprehensive documentation for the Typix personality assessment platform.

## Table of Contents

### 📋 Overview
- [Main README](../README.md) - Project overview and getting started

### 🎯 Use Cases
- [Use Case Diagrams](diagrams/use-cases.md) - Detailed use cases for all assessment types

### 🏗️ Architecture
- [4+1 Architectural Model](architecture/4+1-model.md) - Complete architectural documentation including:
  - **Logical View**: Component structure and relationships
  - **Process View**: Runtime behavior and user flows
  - **Development View**: Code organization and build system
  - **Physical View**: Deployment architecture
  - **Scenarios**: Key use cases tying architecture together

### 💼 Business Design
- [Business Design Document](business/business-design.md) - Business context and strategy including:
  - Business purpose and value proposition
  - Target market and competitive analysis
  - Business model and monetization options
  - Stakeholder analysis
  - Success metrics (KPIs)
  - Risk analysis and mitigation
  - Roadmap and future plans

### ⚙️ Functional Design
- [Functional Design Document](functional/functional-design.md) - Detailed functional specifications including:
  - System functional requirements
  - User interface requirements
  - Performance requirements
  - Security and privacy
  - Error handling
  - Internationalization
  - Testing requirements
  - Future enhancements

## Quick Links

### For Users
- [Live Demo](https://janvanwassenhove.github.io/Typix)
- [Getting Started Guide](../README.md#getting-started-locally)

### For Developers
- [Architecture Overview](architecture/4+1-model.md)
- [Development View](architecture/4+1-model.md#3-development-view-code-organization)
- [Project Structure](architecture/4+1-model.md#project-structure)

### For Business Stakeholders
- [Business Context](business/business-design.md#1-business-context)
- [Value Proposition](business/business-design.md#2-value-proposition)
- [Business Model](business/business-design.md#3-business-model)
- [Roadmap](business/business-design.md#7-roadmap)

### For Product Managers
- [Use Cases](diagrams/use-cases.md)
- [Functional Requirements](functional/functional-design.md#1-system-functional-requirements)
- [Success Metrics](business/business-design.md#5-success-metrics-kpis)

## Documentation Overview

### Use Case Diagrams
The [Use Case Diagrams](diagrams/use-cases.md) document provides:
- Visual and textual descriptions of all major use cases
- Primary and alternative flows
- Actor interactions
- System features summary

**Covered Use Cases:**
1. Take DISC Assessment
2. Take Enneagram Assessment
3. Take Typix Discovery Assessment
4. Change Language
5. Download PDF Report

### 4+1 Architectural Model
The [4+1 Architectural Model](architecture/4+1-model.md) provides comprehensive architectural documentation from five viewpoints:

1. **Logical View** - Shows the component structure
   - Presentation Layer (Views, Components)
   - Business Layer (Composables, Routing)
   - Data Layer (JSON data, i18n, localStorage)

2. **Process View** - Describes runtime behavior
   - User journey flows
   - State transitions
   - Concurrent processes

3. **Development View** - Code organization
   - Project structure
   - Technology stack
   - Build pipeline
   - Development workflow

4. **Physical View** - Deployment architecture
   - GitHub Pages hosting
   - Client-side SPA architecture
   - Storage mechanisms
   - Performance optimization

5. **Scenarios** - Ties architecture together with real use cases
   - Example: User takes DISC assessment
   - Example: Multilingual user experience
   - Example: PDF report generation

### Business Design
The [Business Design Document](business/business-design.md) covers:

1. **Business Context**
   - Purpose and target market
   - Market opportunity and trends
   - Competitive landscape
   - Competitive advantages

2. **Value Proposition**
   - User value and benefits
   - Assessment types and differentiation
   - Unique selling points

3. **Business Model**
   - Current model (free & open source)
   - Future monetization options
   - Growth strategy (3-phase plan)

4. **Stakeholder Analysis**
   - Internal and external stakeholders
   - Interests and influence
   - Engagement strategies

5. **Success Metrics**
   - User engagement metrics
   - Technical metrics
   - Business metrics

6. **Risk Analysis**
   - Business, technical, and legal risks
   - Probability and impact assessment
   - Mitigation strategies

7. **Roadmap**
   - Q1-Q4 2024 plans
   - Feature priorities
   - Milestones

### Functional Design
The [Functional Design Document](functional/functional-design.md) provides:

1. **System Functional Requirements**
   - Core functions (FR-1 to FR-11)
   - Navigation functions
   - Data persistence

2. **User Interface Requirements**
   - Visual design specifications
   - Typography and layout
   - Interactive elements
   - Accessibility (A11Y)

3. **Performance Requirements**
   - Loading performance targets
   - Runtime performance
   - Browser support

4. **Security and Privacy**
   - Data privacy (GDPR)
   - Input validation
   - Security measures

5. **Error Handling**
   - User-facing errors
   - Graceful degradation

6. **Internationalization**
   - Language support (5 languages)
   - Translation coverage
   - Cultural adaptation

7. **Testing Requirements**
   - Functional testing
   - Cross-browser testing
   - Accessibility testing

8. **Future Enhancements**
   - Assessment history
   - Team comparisons
   - Advanced reports
   - Social sharing
   - Offline support

## Assessment Types

### DISC Assessment
Measures four personality traits:
- **D**ominance - Direct, results-oriented
- **I**nfluence - Social, persuasive
- **S**teadiness - Patient, supportive
- **C**onscientiousness - Accurate, analytical

**Time**: ~10 minutes | **Questions**: 24

### Enneagram Assessment
Identifies which of nine personality types best describes the user:
- Type 1: The Reformer
- Type 2: The Helper
- Type 3: The Achiever
- Type 4: The Individualist
- Type 5: The Investigator
- Type 6: The Loyalist
- Type 7: The Enthusiast
- Type 8: The Challenger
- Type 9: The Peacemaker

**Time**: ~12 minutes | **Questions**: 36

### Typix Discovery (Insights) Assessment
Color-based personality model:
- **Red** - Director energy
- **Blue** - Observer energy
- **Yellow** - Motivator energy
- **Green** - Supporter energy

**Time**: ~15 minutes | **Questions**: 25

## Technologies Used

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Frontend Framework | Vue 3 | Reactive UI components |
| Language | TypeScript | Type safety |
| Build Tool | Vite | Fast development & builds |
| Routing | Vue Router 4 | SPA navigation |
| Charts | Chart.js | Data visualization |
| PDF Generation | jsPDF + html2canvas | Report export |
| Hosting | GitHub Pages | Static site hosting |
| State Management | localStorage | Client-side persistence |
| i18n | Custom solution | Multi-language support |

## Contributing

We welcome contributions! Please see the main [README](../README.md) for contribution guidelines.

## License

This project is open source. See the main repository for license details.

## Contact

- GitHub: [https://github.com/janvanwassenhove/Typix](https://github.com/janvanwassenhove/Typix)
- Live Demo: [https://janvanwassenhove.github.io/Typix](https://janvanwassenhove.github.io/Typix)

---

*Last Updated: January 2024*

