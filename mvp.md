# MVP Definition

This document defines the Minimum Viable Product (MVP) for the HYROX Decision Alignment Platform.

The MVP validates the core product value:  
Helping amateur HYROX athletes optimize weekly training decisions for a future competition.

---

## MVP Product Goal

Enable an athlete to:

- Understand weekly training volume and distribution
- Understand running quality, not only quantity
- See alignment with HYROX race demands
- Receive clear guidance on what to improve next

---

## MVP Scope

The MVP focuses on weekly training decision clarity.

It explicitly respects HYROX race structure:
Running combined with functional fatigue.

---

## Core MVP Features

### 1. Athlete Profile

Fields:

- Name
- Category
- Weight
- Height
- Experience level
- Future competition
- Target competition time

---

### 2. Weekly Volume Target

The athlete defines weekly expectations:

- Total running kilometers
- Running distribution by zone:
  - Zone 1–2 (easy aerobic)
  - Zone 3 (tempo)
  - Zone 4–5 (intensity)
- Strength sessions
- Mixed HYROX-style sessions
- Total training hours

---

### 3. Training Session Logging

For each session:

- Date
- Duration
- Modality:
  - Run
  - Strength
  - Mixed
- Running zone distribution (if run)
- Fatigue context:
  - Fresh run
  - Run under fatigue
- Intensity perception (1–10)

---

### 4. Weekly Volume Balance

The system tracks remaining:

- Running km by zone
- Strength sessions
- Mixed sessions
- Total training hours

And displays weekly status:

- OnTrack
- UnderTarget
- OverTarget

---

### 5. Weekly Alignment Evaluation

The system evaluates:

- Running distribution vs HYROX demand
- Presence of fatigue runs
- Balance between strength and running
- Weekly volume quality

Outputs:

- Alignment score (0–100)
- Strengths
- Gaps
- Risks

---

### 6. Weekly Recommendation

One recommendation per week:

Example:

"Your week had good total running volume, but only 10% under fatigue. Increase one mixed run to improve race readiness."

Includes:

- Action
- Explanation
- Expected race impact

---

## MVP User Flow

1. Athlete creates profile
2. Athlete sets weekly volume targets
3. Athlete logs training sessions
4. System updates volume balance
5. Athlete requests weekly alignment
6. System returns alignment and recommendation

---

## MVP Success Criteria

The MVP is successful if:

- Athlete understands not only volume, but quality
- Athlete adjusts at least one training decision
- Athlete feels more prepared for HYROX race reality

---

## MVP Out of Scope

- Garmin integration
- Automatic zone detection
- Social features
- Rankings
- Advanced AI planning
- Full race simulation

---

## MVP Architectural Principles

- Weekly volume is finite and structured
- Running quality matters more than distance
- Fatigue context is mandatory
- Backend owns logic
- Explanations are required

---

## MVP Validation Questions

After two weeks:

- Did the athlete balance running zones better?
- Did the athlete add fatigue runs?
- Did the athlete reduce irrelevant sessions?
- Did the athlete feel closer to race reality?

If not, the MVP has failed.

---

## Final Statement

This MVP does not train runners.

It trains HYROX athletes.
