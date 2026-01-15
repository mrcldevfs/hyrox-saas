# System Architecture

This document describes the system architecture for the HYROX Decision Alignment Platform.

The system is designed to help amateur HYROX athletes optimize limited training time through weekly volume control, competition alignment and explainable guidance.

---

## Architectural Principles

- Domain-driven design
- Weekly volume is the core business driver
- Competition-oriented planning
- Backend owns business logic
- AI supports reasoning, never replaces rules
- Simplicity over premature scalability
- Monolithic first, modular by design

---

## High Level Architecture

The system follows a layered monolithic architecture:

Frontend (Web / Mobile)
↓
API Layer (REST)
↓
Application Layer (Use Cases)
↓
Domain Layer (Business Rules)
↓
Infrastructure Layer (Database, AI, External APIs)

---

## System Components

### Frontend

Responsibilities:

- Collect athlete input
- Display weekly volume balance
- Display alignment results
- Display recommendations
- Educate the athlete through explanations

No business rules exist in frontend.

---

### API Layer

Responsibilities:

- Input validation
- Authentication
- Request routing
- Response formatting
- Versioning

The API reflects domain language directly.

---

### Application Layer

Responsibilities:

- Orchestrate use cases
- Coordinate domain objects
- Control transactions
- Trigger evaluations
- Trigger AI support

Examples:

- LogTrainingSession
- EvaluateWeeklyAlignment
- GenerateRecommendations
- BuildWeeklyPlan

---

### Domain Layer

This is the heart of the system.

Contains:

- WeeklyVolumeTarget
- WeeklyVolumeBalance
- Alignment rules
- Competition context logic
- Training relevance rules

Example responsibilities:

- Deduct volume
- Detect overtraining
- Detect underexposure
- Score alignment
- Prioritize corrections

No external dependencies exist in this layer.

---

### Infrastructure Layer

Includes:

- Database
- AI provider
- Garmin integration
- Logging
- Monitoring

This layer adapts technology to the domain.

---

## Weekly Volume Flow

1. Athlete defines WeeklyVolumeTarget
2. Athlete logs TrainingSession
3. VolumeContribution is calculated
4. WeeklyVolumeBalance is updated
5. Status is recalculated (OnTrack, UnderTarget, OverTarget)

Weekly volume is always finite and deducted.

---

## Alignment Flow

1. System loads competition context
2. Loads weekly balance
3. Loads training history
4. Applies alignment rules
5. Generates AlignmentResult
6. Generates AlignmentInsights

---

## Recommendation Flow

1. System reads alignment gaps
2. Reads volume imbalance
3. Reads time availability
4. Generates Recommendation
5. Generates explanation

AI is used only to enrich language and pattern recognition.

---

## Education Flow

Each recommendation must answer:

- What to do
- Why it matters
- What happens if ignored

This is mandatory.

---

## AI Role

AI is responsible for:

- Pattern recognition
- Text generation
- Effort interpretation
- Explanation clarity

AI is never responsible for:

- Business decisions
- Volume logic
- Alignment scoring

---

## Data Persistence

The architecture uses a relational model aligned with the domain:

- Athlete
- Competition
- WeeklyVolumeTarget
- TrainingSession
- VolumeContribution
- WeeklyVolumeBalance
- AlignmentResult
- AlignmentInsight
- Recommendation
- WeeklyPlan

---

## Event Perspective

Key domain events:

- TrainingSessionLogged
- WeeklyVolumeUpdated
- AlignmentEvaluated
- RecommendationGenerated

These events allow future event-driven extraction.

---

## Monolith Decision

The system is implemented as a modular monolith because:

- Domain is still evolving
- Team is small
- Complexity is moderate
- Business logic is tightly coupled
- Premature microservices would add risk

The monolith is structured to allow future extraction.

---

## Future Scalability

Possible future services:

- Training Service
- Volume Service
- Alignment Service
- Recommendation Service

The current architecture anticipates this without enforcing it.

---

## Non-Functional Requirements

- High clarity over high performance
- Explainability over automation
- Consistency over speed
- Reliability over innovation

---

## Product Alignment

This architecture exists to serve:

An amateur HYROX athlete with limited time who wants brutal clarity, honest guidance and measurable progress toward competition readiness.

---

## Managerial Perspective

This architecture prioritizes:

- Product clarity
- Domain ownership
- Team maintainability
- Decision traceability
- Learning velocity

Over technical fashion.

---

## Final Statement

This system is not designed to impress engineers.

It is designed to help an amateur athlete make better training decisions every week.