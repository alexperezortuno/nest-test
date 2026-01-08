# Changelog

All notable changes to this project are documented in this file.

The format follows a simplified version of **Keep a Changelog** and adheres to **Semantic Versioning** principles.

---

## [1.0.0] – Initial Technical Challenge Submission

### Added
- Company adhesion endpoint supporting multiple company types (PYME and CORPORATE).
- Business rules encapsulated in domain entities using object-oriented design.
- In-memory persistence layer implemented via repository interfaces.
- Endpoint to retrieve companies that performed transfers in the last month.
- Transfer entity and in-memory transfer repository with seeded data.
- Centralized validation using DTOs and domain value objects.
- Unit tests for application services and core business logic.
- Optional multi-stage Dockerfile using Node.js >= 22.19.0.
- Comprehensive README documenting architecture, assumptions, and usage.
- CHANGELOG file to track project evolution.

### Design Decisions
- Persistence is intentionally implemented in memory for the scope of this technical test.
- DTOs are treated strictly as transport-layer contracts and accept only primitive values.
- Domain value objects are instantiated within application services to enforce invariants.
- Architecture follows a layered approach inspired by Hexagonal Architecture.

---

## [Unreleased]

### Planned
- Replace in-memory repositories with database adapters.
- Add end-to-end tests using Supertest.
- Add authentication and authorization.
- Improve observability with logging and metrics.
- Support pagination and filtering for transfer queries.
