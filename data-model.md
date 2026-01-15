# Data Model

This data model represents an amateur HYROX athlete preparing for a future competition through weekly training alignment.

---

## Athlete

Represents the user.

- id
- name
- age
- weight
- height
- category (Men Open, Pro, etc)
- experienceLevel (Beginner, Intermediate, Advanced)
- weeklyAvailableHours

---

## Competition

Represents a future race.

- id
- athleteId
- eventName
- eventDate
- category
- targetTime

---

## WeeklyVolumeTarget

Defines expected weekly training distribution.

- id
- athleteId
- weekStartDate

Running:
- runningZ1Z2Km
- runningZ3Km
- runningZ4Z5Km
- fatigueRunningKm

Strength:
- strengthSessions
- strengthMinutes

Mixed:
- mixedSessions
- mixedMinutes

Total:
- totalWeeklyHours

---

## TrainingSession

Represents one training session.

- id
- athleteId
- date
- modality (run, strength, mixed, hyrox)
- durationMinutes

Running data:
- z1z2Km
- z3Km
- z4z5Km
- fatigueContext (fresh, under_fatigue)

Strength data:
- mainFocus (legs, upper, full)
- intensity (low, moderate, high)

Mixed data:
- hyroxStations (optional list)

---

## WeeklySummary

Generated entity.

- athleteId
- weekStartDate

Volume:
- remainingZ1Z2Km
- remainingZ3Km
- remainingZ4Z5Km
- remainingFatigueKm
- remainingStrengthMinutes
- remainingMixedMinutes

Scores:
- alignmentScore
- runningQualityScore
- fatigueExposureScore

Flags:
- underTraining
- overTraining
- poorDistribution

---

## Recommendation

Generated entity.

- type (add, remove, replace)
- modality
- reason
- explanation
- impactOnRace
 