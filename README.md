# nest-test

Overview

This project implements a REST API using NestJS and TypeScript, designed to manage company adhesions and retrieve companies that performed transfers within the last month.

The solution focuses on clean design, object-oriented programming, and clear separation of concerns, following a layered architecture inspired by Hexagonal Architecture.

Architecture & Design

The project is structured following a layered approach:

```bash
src/
├── companies/
│   ├── domain/          # Entities, Value Objects, Exceptions
│   ├── services/        # Application services (use cases)
│   ├── dtos/            # Transport-level DTOs
│   ├── infrastructure/ # Controllers and persistence adapters
│   └── companies.module.ts
├── shared/
│   └── utils/
└── main.ts

```

### Architectural Principles

- Domain-driven design: Business rules live in domain entities and value objects.
- Hexagonal-inspired architecture:
  - Application services depend on repository ports. 
  - Infrastructure provides adapters (HTTP controllers, in-memory persistence).
- DTOs are transport-only:
  - DTOs accept primitive values. 
  - Domain Value Objects (e.g. LocationId) are created inside application services.


### Persistence (Challenge Scope)

For the scope of this technical test, persistence is implemented using in-memory repositories only.
No external databases or storage systems are required to run the application.

This approach was chosen to simplify execution and evaluation, while keeping the persistence
layer abstracted and easily replaceable in a real-world scenario.

### Requirements

- Node.js >= 22.19.0
- npm (>= 9)

## Installation dependencies

```bash
npm install
```

---

### Run development

```bash
npm run start:dev
```

---

Testing

All tests are located in the /test directory and focus on application services and domain behavior, independently of the NestJS framework.

```bash
npm run test
```

---

### Curls

Get all companies type PYME

```bash
curl --location 'localhost:8081/companies/pyme'
```

Get all companies type CORPORATE

```bash
curl --location 'localhost:8081/companies/corporate'
```

Post new company

```bash
curl --location 'localhost:8081/companies/create' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "test 1",
    "taxId": "TAX-PYME-1-1",
    "email": "test+1@test.com",
    "phone": "123456",
    "locationId": "CHL",
    "type": "PYME",
    "employeesCount": 10,
    "address": "test av"
}'
```

```bash
curl --location 'localhost:8081/companies/create' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "test 2",
    "taxId": "TAX-CORP-1-2",
    "email": "test+2@test.com",
    "phone": "123456",
    "locationId": "CHL",
    "type": "CORPORATE",
    "employeesCount": 10,
    "address": "test av",
    "capital": 1000000
}'
```

Get transfers

```bash
curl --location 'http://localhost:8081/companies/transfers/last-month?days=30'
```

Delete a company

```bash
curl --location --request DELETE 'localhost:8081/companies/delete/2'
```

### Docker (optional)

A multi-stage Dockerfile is included as an optional setup for local execution or CI pipelines.
Docker is **not required** to run the application and is not used as part of the challenge execution.


```bash
docker build -t nest-test:local .
```

```bash
docker run --rm -p 8080:8080 nest-test:local
```

### Final Notes

This solution prioritizes:

- Clean and maintainable code 
- Clear separation of responsibilities 
- Explicit business rules 
- Testability and scalability

The architecture allows easy replacement of persistence or delivery mechanisms without impacting the core domain.