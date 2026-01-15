# Domain Model

This document defines the core business concepts of the HYROX Decision Alignment Platform.  
The goal is to establish a shared language between product, engineering and AI.

---

## Core Domain Concepts

### Athlete
Represents the user of the system.

Attributes:
- id
- name
- age
- weight
- height
- category
- experienceLevel
- runningPaces (3k, 5k, 10k)
- availabilityPerWeek

Responsibilities:
- Owns training history
- Prepares for competitions
- Receives recommendations

---

### Competition
Represents a target HYROX event.

Attributes:
- id
- eventName
- eventDate
- category
- targetTime

Responsibilities:
- Defines the preparation context
- Constrains training alignment

---

### TrainingSession
Represents a single workout session.

Attributes:
- id
- date
- duration
- intensity
- modality
- exercises
- perceivedEffort
- externalMetrics
- volumeContribution

Responsibilities:
- Captures training reality
- Feeds alignment evaluation
- Deducts volume from weekly targets

---

### WeeklyPlan
Represents a logical grouping of training sessions.

Attributes:
- weekStartDate
- weekEndDate
- trainingSessions

Responsibilities:
- Organizes training over time
- Provides weekly context
- Supports volume tracking and balance

---

### WeeklyVolumeTarget
Represents the expected weekly training volume required for HYROX preparation.

Attributes:
- targetRunningVolume
- targetStrengthVolume
- targetMixedVolume
- totalTargetVolume

Responsibilities:
- Defines weekly training expectations
- Provides objective preparation benchmarks

---

### WeeklyVolumeBalance
Represents how much of the weekly target has been consumed.

Attributes:
- runningCompleted
- strengthCompleted
- mixedCompleted
- totalCompleted
- remainingVolume

Responsibilities:
- Track volume deduction after each TrainingSession
- Indicate overuse or underuse risk

---

### AlignmentResult
Represents the evaluation of how aligned a week is with the competition goal.

Attributes:
- score
- strengths
- gaps
- risks

Responsibilities:
- Translate training and volume into decision insight

---

### Recommendation
Represents an actionable suggestion.

Attributes:
- type
- description
- rationale
- priority

Responsibilities:
- Guide athlete decisions
- Educate the athlete

---

## Relationships

- Athlete prepares for Competition
- Athlete performs TrainingSessions
- TrainingSessions are grouped into WeeklyPlan
- WeeklyPlan uses WeeklyVolumeTarget
- WeeklyPlan produces WeeklyVolumeBalance
- WeeklyVolumeBalance influences AlignmentResult
- AlignmentResult produces Recommendations

---

## Business Rules

- A TrainingSession always belongs to one Athlete
- An Athlete can have multiple Competitions
- Alignment is always evaluated in the context of one Competition
- Recommendations must always explain their rationale
- WeeklyPlan is the primary decision evaluation unit

### Volume Rules

- Each TrainingSession deducts volume from WeeklyVolumeTarget
- WeeklyVolumeBalance must always be recalculated after a session
- Over-volume generates fatigue risk
- Under-volume generates preparation risk
- Volume balance directly influences AlignmentResult

---

## Domain Principles

- Decisions are based on context, not isolated workouts
- Alignment is more important than raw volume
- Volume must be controlled, not only accumulated
- Education is as important as performance
- Simplicity is preferred over technical complexity

---

## Out of Scope

- Coach management
- Nutrition planning
- Injury diagnosis

---

## Engineering Manager Perspective

This domain model:
- Protects business language
- Reduces coupling between modules
- Enables future service extraction
- Guides API and data design
- Anchors architecture in real HYROX preparation logic