# API Design

The API supports weekly decision intelligence for HYROX athletes.

---

## Athlete

POST /athletes  
GET /athletes/{id}

---

## Competition

POST /competitions  
GET /competitions/{athleteId}

---

## Weekly Volume Target

POST /weekly-volume-targets  
GET /weekly-volume-targets/{athleteId}/{week}

---

## Training Sessions

POST /training-sessions  
GET /training-sessions/{athleteId}/{week}

Example:

{
  "date": "2026-01-12",
  "modality": "run",
  "durationMinutes": 65,
  "z1z2Km": 5,
  "z3Km": 2,
  "z4z5Km": 1,
  "fatigueContext": "under_fatigue"
}

---

## Weekly Evaluation

GET /weekly-summary/{athleteId}/{week}

Returns:

{
  "alignmentScore": 82,
  "runningQualityScore": 78,
  "fatigueExposureScore": 65,
  "flags": ["low_fatigue_running"],
  "remainingVolume": {
    "z1z2Km": 3,
    "z3Km": 1,
    "z4z5Km": 2,
    "fatigueKm": 2
  }
}

---

## Weekly Recommendation

GET /weekly-recommendation/{athleteId}/{week}

Returns:

{
  "recommendations": [
    {
      "type": "add",
      "modality": "run",
      "reason": "Low fatigue exposure",
      "explanation": "HYROX requires running under fatigue. Add one 3km Z2 run after a strength session."
    }
  ]
}
