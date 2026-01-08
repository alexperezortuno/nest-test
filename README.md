# nest-test

## Requirements

- Node.js >= 22.19.0

## Installation dependencies

```bash
npm install
```

---

## Compile and run the project

### development

```bash
npm run start
```

### watch mode

```bash
npm run start:dev
```

---

### production mode

```bash
npm run start:prod
```

## Run tests

### unit tests

```bash
npm run test
```

### e2e tests

```bash
npm run test:e2e
```

### test coverage

```bash
npm run test:cov
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

Add a new company

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
docker run --rm  -p 8080:8080 nest-test:local
```