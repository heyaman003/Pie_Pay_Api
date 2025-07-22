# PiePay Assignment Submission

## 1. Setup Instructions

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```
3. **Configure your database**
   - Set your PostgreSQL connection string in `.env` as `DATABASE_URL=...`
4. **Run migrations**
   ```bash
   npx prisma migrate dev --name init-offer
   ```
5. **Seed the database with dummy offers**
   ```bash
   npm run prisma:seed
   ```
6. **Start the server**
   ```bash
   npm run start
   ```
7. **Test the API in Swagger UI**
   - Open [http://localhost:3000/api](http://localhost:3000/api)

**Docker Compose:**
- To run everything (backend + Postgres) in Docker:
  ```bash
  docker-compose up --build
  ```
- For development mode (hot reload):
  ```bash
  MODE=dev docker-compose up --build
  ```

---

## 2. Assumptions
- The Flipkart offer API response structure is as shown in the provided example and images. If the real API differs, only the extraction logic in `OfferService` needs to be updated.
- Offers are uniquely identified by a combination of title, description, bank, discount type/value, and validity.
- Only the fields present in the example are required for discount calculation; additional fields (like min/max transaction) can be added if needed.
- The backend is not exposed to the public internet in production without proper security (e.g., authentication, HTTPS).

---

## 3. Design Choices
- **Framework:** Chose NestJS for its modularity, scalability, and TypeScript support.
- **ORM:** Prisma for type safety, easy migrations, and developer experience.
- **Database:** PostgreSQL for reliability and compatibility with Prisma.
- **API:** RESTful endpoints for simplicity and easy testing (Swagger UI included).
- **Schema:** The Offer model is normalized and deduplicated using a unique constraint.
- **Docker:** Multi-stage Dockerfile and Compose for easy local and production deployment.
- **Seeding:** Included a seed script for quick testing and onboarding.

---

## 4. Scaling GET /highest-discount to 1,000 RPS
- **Connection Pooling:** Prisma and Postgres both support connection pooling out of the box.
- **Database Indexing:** Index on `bankName` and `paymentInstruments` for fast lookups.
- **Caching:** Use Redis or in-memory cache for frequently accessed offers and discount calculations.
- **Horizontal Scaling:** Run multiple instances of the backend behind a load balancer.
- **Statelessness:** The API is stateless, so it can be scaled horizontally without session issues.
- **Async Processing:** For more complex discount logic, offload heavy calculations to background workers or use async queues.

---

## 5. Improvements with More Time
- Add authentication and authorization for offer management endpoints.
- Add more robust validation and error handling (DTOs, class-validator).
- Add unit and integration tests for all modules.
- Add logging, monitoring, and alerting (e.g., with Prometheus, Grafana).
- Support for more payment parameters (card type, network, min/max transaction, etc.).
- Add pagination and filtering to offer listing endpoints.
- Auto-seed database on container start for easier onboarding.
- Add CI/CD pipeline for automated testing and deployment.

---

**Thank you for reviewing my submission!** 