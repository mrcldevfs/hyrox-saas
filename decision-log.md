# Architecture Decision Log (ADR)

This document records the major architectural and technical decisions for the HYROX Decision Alignment Platform.

The goal is to preserve reasoning, context and trade-offs behind each decision.

---

## ADR-001 — Modular Monolith Architecture

**Decision:**  
Use a layered modular monolith as the initial architecture.

**Context:**  
The product is in early stage, with evolving domain rules and limited team size. Business logic is tightly coupled around training, volume and competition alignment.

**Rationale:**  

- Reduces operational complexity
- Keeps business logic centralized
- Improves learning speed
- Avoids premature service boundaries
- Enables future service extraction

**Consequences:**  

- Single deployment unit
- Easier debugging
- Requires discipline in modular boundaries

---

## ADR-002 — Layered Architecture

**Decision:**  
Adopt layered separation: API, Application, Domain, Infrastructure.

**Rationale:**  

- Improves maintainability
- Enables clear ownership
- Protects domain logic from infrastructure changes
- Simplifies onboarding

---

## ADR-003 — Domain-Driven Design Language

**Decision:**  
Use domain language in APIs, data model and business rules.

Examples:  
WeeklyVolumeTarget, AlignmentResult, TrainingSession.

**Rationale:**  

- Improves communication between product and engineering
- Reduces translation errors
- Aligns system with real athlete mindset

---

## ADR-004 — Weekly Volume as Core Business Concept

**Decision:**  
Model weekly volume explicitly and deduct it per training session.

**Rationale:**  

HYROX performance depends on volume quality and distribution.  
Without explicit volume modeling, alignment logic would be subjective.

**Consequences:**  

- Enables objective evaluation
- Enables readiness scoring
- Enables education through data

---

## ADR-005 — Backend Owns Business Logic

**Decision:**  
All business rules remain in backend.

**Rationale:**  

- Ensures consistency
- Enables auditability
- Prevents divergence across clients
- Simplifies evolution

---

## ADR-006 — REST API

**Decision:**  
Use REST for API design.

**Rationale:**  

- Simplicity
- Tooling maturity
- Easy versioning
- Frontend independence

---

## ADR-007 — AI as Support Layer

**Decision:**  
AI is used only for pattern recognition and explanation.

**AI does NOT decide.**

**Rationale:**  

- Business decisions must be deterministic
- Trust and credibility depend on explainability
- AI output must be auditable

---

## ADR-008 — Explainability as Product Requirement

**Decision:**  
Every recommendation must include explanation.

**Rationale:**  

The product educates athletes, not only guides them.

---

## ADR-009 — Event-Oriented Thinking

**Decision:**  
Model domain actions as events internally.

Examples:  

- TrainingSessionLogged  
- WeeklyVolumeUpdated  
- AlignmentEvaluated  

**Rationale:**  

- Enables future event-driven evolution
- Improves system observability

---

## ADR-010 — Relational Database

**Decision:**  
Use relational data model aligned with domain.

**Rationale:**  

- Strong consistency
- Clear relationships
- Easier reasoning for domain queries

---

## ADR-011 — Future Microservice Readiness

**Decision:**  
Design boundaries for future extraction without implementing microservices.

**Rationale:**  

- Avoid premature complexity
- Preserve architectural evolution path

---

## ADR-012 — Product Over Technology

**Decision:**  
Product clarity always wins over technical fashion.

**Rationale:**  

The goal is athlete decision clarity, not engineering showcase.

---

## Final Statement

This architecture is intentionally conservative, explicit and product-driven.

It prioritizes:

- Learning
- Clarity
- Trust
- Maintainability
- Evolution

Over:

- Scalability theater
- Trend-driven design
- Premature optimization
