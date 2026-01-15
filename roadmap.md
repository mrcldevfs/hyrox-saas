# Technical Roadmap

This roadmap defines the evolutionary plan for the HYROX Decision Alignment Platform.

The roadmap is product-driven, domain-first and designed to validate business value before technical complexity.

---

## Roadmap Principles

- Validate learning before scaling
- Build clarity before automation
- Prefer correctness over performance
- Always keep athlete value visible
- Deliver in vertical slices

---

## Phase 1 — Foundation (MVP Domain)

Goal: Validate domain model and weekly volume logic.

### Features

- Athlete profile management
- Competition registration
- Weekly volume target definition
- Training session logging
- Volume deduction logic
- Weekly volume balance visualization

### Technical Focus

- Domain entities
- Volume calculation rules
- API stability
- Data persistence

### Success Criteria

- Athlete can see remaining weekly volume
- Athlete understands volume impact per session

---

## Phase 2 — Alignment Engine

Goal: Evaluate training against competition.

### Features

- Weekly alignment evaluation
- Alignment scoring
- Alignment insights (strengths, gaps, risks)

### Technical Focus

- Domain rules engine
- Scoring logic
- Explainability storage

### Success Criteria

- Athlete understands if week was aligned or not
- Athlete understands why

---

## Phase 3 — Recommendation Engine

Goal: Provide actionable guidance.

### Features

- Priority-based recommendations
- Explanation generation
- Weekly focus definition

### Technical Focus

- Rule-based prioritization
- AI explanation enrichment
- Education consistency

### Success Criteria

- Athlete trusts recommendations
- Athlete changes behavior

---

## Phase 4 — Weekly Planning

Goal: Convert guidance into plan.

### Features

- Weekly plan generation
- Session suggestions
- Focus areas

### Technical Focus

- Planning heuristics
- Constraint handling (time, fatigue)

### Success Criteria

- Athlete has clear next week direction

---

## Phase 5 — AI Enhancement

Goal: Improve intelligence without losing control.

### Features

- Pattern recognition
- Load trend detection
- Injury risk signals
- Natural language explanations

### Technical Focus

- AI prompt design
- AI safety boundaries
- AI explainability

---

## Phase 6 — External Integrations

Goal: Reduce manual input.

### Features

- Garmin integration
- Automatic session import
- Data normalization

---

## Phase 7 — Product Scaling

Goal: Prepare for growth.

### Features

- Performance optimization
- Observability
- Feature flags
- Service boundary extraction

---

## Out of Scope (For Now)

- Social features
- Community rankings
- Gamification
- Sponsorship integrations

---

## Risk Management

| Risk | Mitigation |
|------|-----------|
| Domain misinterpretation | Weekly validation with athlete feedback |
| Overengineering | Phase-gated roadmap |
| AI hallucination | Business rules dominance |
| Scope creep | Roadmap discipline |

---

## Product Validation Loop

Each phase must answer:

- Did athlete understand?
- Did athlete change behavior?
- Did athlete improve clarity?

If not, phase is revisited.

---

## Managerial Perspective

This roadmap is designed to:

- Protect learning velocity
- Minimize wasted engineering
- Keep product honest
- Preserve future scalability

---

## Final Statement

This roadmap is not about building software.

It is about building better training decisions.