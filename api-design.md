# API Design

This document defines the public and internal API contracts of the HYROX Decision Alignment Platform.
The API is designed based on the Domain Model and supports evolutionary architecture.

---

## API Principles

* Domain-driven naming
* Resource-oriented design
* Context over convenience
* Explicit relationships
* Versioned from day one

---

## Core Resources

* Athlete
* Competition
* TrainingSession
* WeeklyPlan
* WeeklyVolumeTarget
* WeeklyVolumeBalance
* AlignmentResult
* Recommendation

---

## Athlete

### Create Athlete

POST /api/v1/athletes

Request:
{
"name": "John",
"age": 35,
"weight": 80,
"height": 178,
"category": "Men Open",
"experienceLevel": "Intermediate"
}

---

## Competition

### Create Competition

POST /api/v1/athletes/{athleteId}/competitions

Request:
{
"eventName": "HYROX Berlin",
"eventDate": "2026-05-10",
"category": "Men Open",
"targetTime": "01:05:00"
}

---

## Training Session

### Log Training Session

POST /api/v1/athletes/{athleteId}/training-sessions

Request:
{
"date": "2026-01-15",
"duration": 75,
"intensity": "High",
"modality": "Mixed",
"exercises": ["Wall Balls", "Running", "Sled Push"],
"perceivedEffort": 8,
"volumeContribution": {
"running": 5,
"strength": 4,
"mixed": 3
}
}

Behavior:

* Deducts volume from WeeklyVolumeTarget
* Recalculates WeeklyVolumeBalance

---

## Weekly Plan

### Get Weekly Plan

GET /api/v1/athletes/{athleteId}/weekly-plan?week=2026-01-12

---

## Volume Balance

### Get Weekly Volume Balance

GET /api/v1/athletes/{athleteId}/weekly-volume-balance?week=2026-01-12

---

## Alignment

### Evaluate Weekly Alignment

POST /api/v1/athletes/{athleteId}/alignment

Request:
{
"week": "2026-01-12",
"competitionId": "123"
}

Response:
{
"score": 82,
"strengths": ["Running volume is well distributed"],
"gaps": ["Low sled exposure"],
"risks": ["Strength fatigue risk"]
}

---

## Recommendation

### Get Recommendations

GET /api/v1/athletes/{athleteId}/recommendations?week=2026-01-12

---

## AI Integration

The AI layer is invoked internally by the backend for:

* Alignment interpretation
* Recommendation generation
* Explanation generation

The AI is not directly exposed to clients.

---

## Error Handling

Standard error format:
{
"errorCode": "INVALID_INPUT",
"message": "Running volume cannot be negative"
}

---

## Versioning Strategy

* /api/v1/ is mandatory
* Breaking changes require new version

---

## Engineering Manager Perspective

This API design:

* Follows domain language
* Supports evolutionary architecture
* Protects business rules
* Enables service extraction
