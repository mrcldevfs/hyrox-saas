# Data Model

This document defines the core domain entities for the HYROX Decision Alignment Platform.

The data model is built to support weekly volume tracking, competition alignment and long-term athlete evolution.

---

## Design Principles

- Domain-driven naming
- Business meaning over technical convenience
- Weekly volume is a first-class concept
- Competition is the main driver of decisions
- Data must support education and explanation

---

## Athlete

Represents the user.

| Field | Type |
|------|------|
| id | UUID |
| name | String |
| age | Integer |
| weight | Float |
| height | Float |
| category | String |
| experience_level | String |
| created_at | Timestamp |

---

## Competition

| Field | Type |
|------|------|
| id | UUID |
| athlete_id | UUID |
| event_name | String |
| event_date | Date |
| category | String |
| target_time | String |
| created_at | Timestamp |

Relationship:
- Athlete 1 → N Competition

---

## WeeklyVolumeTarget

Defines the expected training volume for a given week.

| Field | Type |
|------|------|
| id | UUID |
| athlete_id | UUID |
| week_start_date | Date |
| running_km_target | Float |
| strength_sessions_target | Integer |
| mixed_sessions_target | Integer |
| total_training_hours_target | Float |
| created_at | Timestamp |

---

## TrainingSession

Represents one completed training session.

| Field | Type |
|------|------|
| id | UUID |
| athlete_id | UUID |
| date | Date |
| duration_minutes | Integer |
| intensity | String |
| modality | String |
| perceived_effort | Integer |
| created_at | Timestamp |

---

## TrainingExercise

Optional breakdown of exercises inside a session.

| Field | Type |
|------|------|
| id | UUID |
| training_session_id | UUID |
| exercise_name | String |
| reps | Integer |
| weight | Float |
| distance_km | Float |

---

## VolumeContribution

Represents how a session deducts from weekly volume.

| Field | Type |
|------|------|
| id | UUID |
| training_session_id | UUID |
| running_km | Float |
| strength_score | Float |
| mixed_score | Float |
| training_hours | Float |

---

## WeeklyVolumeBalance

Calculated entity.

| Field | Type |
|------|------|
| id | UUID |
| athlete_id | UUID |
| week_start_date | Date |
| remaining_running_km | Float |
| remaining_strength_sessions | Integer |
| remaining_mixed_sessions | Integer |
| remaining_training_hours | Float |
| status | String |

Status examples:
- OnTrack
- UnderTarget
- OverTarget

---

## AlignmentResult

Stores weekly alignment evaluation.

| Field | Type |
|------|------|
| id | UUID |
| athlete_id | UUID |
| week_start_date | Date |
| score | Integer |
| created_at | Timestamp |

---

## AlignmentInsight

Detailed explanation of alignment.

| Field | Type |
|------|------|
| id | UUID |
| alignment_result_id | UUID |
| type | String |
| message | String |

Type examples:
- Strength
- Gap
- Risk

---

## Recommendation

| Field | Type |
|------|------|
| id | UUID |
| athlete_id | UUID |
| week_start_date | Date |
| priority | String |
| message | String |
| explanation | String |
| created_at | Timestamp |

---

## WeeklyPlan

| Field | Type |
|------|------|
| id | UUID |
| athlete_id | UUID |
| week_start_date | Date |
| focus | String |
| created_at | Timestamp |

---

## WeeklyPlanSession

| Field | Type |
|------|------|
| id | UUID |
| weekly_plan_id | UUID |
| session_description | String |

---

## AIInteractionLog

Tracks AI reasoning support.

| Field | Type |
|------|------|
| id | UUID |
| athlete_id | UUID |
| context | String |
| ai_response | Text |
| created_at | Timestamp |

---

## Key Relationships Summary

- Athlete → Competitions
- Athlete → WeeklyVolumeTarget
- Athlete → TrainingSessions
- TrainingSession → VolumeContribution
- Athlete → WeeklyVolumeBalance
- Athlete → AlignmentResult → AlignmentInsight
- Athlete → Recommendation
- Athlete → WeeklyPlan → WeeklyPlanSession

---

## Business Rules Supported

- Weekly volume is always finite and deducted
- Every training affects weekly balance
- Alignment depends on competition context
- Recommendations depend on alignment and volume
- Education depends on stored explanations
- AI does not replace domain data

---

## Architectural Value

This data model enables:

- Domain clarity
- Volume-driven coaching
- Weekly planning
- Competition-oriented decisions
- Future microservice extraction
- Explainable AI usage

---

## Product Alignment

This data model exists to help an amateur HYROX athlete train with clarity, focus and measurable progress toward competition.