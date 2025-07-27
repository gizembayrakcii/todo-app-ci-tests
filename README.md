# Todo App CI Tests

End-to-end Test Automation for a simple **React + Node.js** Todo Application using **Playwright**, **Cucumber**, **REST-assured**, and **GitHub Actions**.

---

## Objective

This project demonstrates a complete automation testing solution for a full-stack web application. It tests both the **UI** (React frontend) and **API** (Node.js backend) using modern tools, covering functional, positive, and negative cases. The goal is to showcase strong automation skills with proper documentation and CI integration.

---

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js + Express
- **UI Automation:** Playwright + Cucumber
- **API Testing:** REST-assured (Java)
- **Test Runner:** Cucumber.js (UI), JUnit (API)
- **CI/CD:** GitHub Actions

---

## Directory Structure

```bash
.
├── backend
│   ├── src
│   └── tests             # REST-assured API test cases
├── frontend
│   ├── src
│   └── feature           # Cucumber feature files and step definitions
│       ├── support
│       └── step-definitions
├── .github
│   └── workflows
│       ├── backend-tests.yml
│       └── frontend-tests.yml
├── README.md
└── test-plan.md
```

---

## 🕹 UI Automation Scenarios (Playwright + Cucumber)

Each of the following is implemented as a scenario:

- Login with **valid** credentials
- Login with **invalid** credentials
- Create a new Todo item
- Edit a Todo item
- Delete a Todo item
- Assert updated list items after each action

**How to Run Locally:**
```bash
# Start the frontend app (required)
cd frontend
npm install
npm run dev     # http://localhost:5173

# Then, from the root directory (not inside frontend), run the UI tests:
npx cucumber-js
```

> Playwright and Cucumber run isolated browsers for each scenario to prevent state pollution.

---

## API Automation Scenarios (REST-assured)

API endpoints tested:
- `POST /login` (valid + invalid payloads)
- `GET /items`
- `POST /items`
- `PUT /items/:id`
- `DELETE /items/:id`

**How to Run Locally:**
```bash
cd backend
mvn test
```

> Java 17 and Maven must be installed.

---

## CI Integration (GitHub Actions)

Both backend and frontend have separate CI workflows:

### Frontend
- Triggered on every push to `main`
- Installs dependencies
- Starts frontend app
- Waits for readiness
- Runs Playwright + Cucumber tests

### Backend
- Triggered on push to `main` or `backend/`
- Sets up Java
- Runs all JUnit tests via Maven

CI Workflow files:
- `.github/workflows/frontend-tests.yml`
- `.github/workflows/backend-tests.yml`

---

## Setup Instructions
### 1. Clone and Install
```bash
git clone https://github.com/your-username/todo-app-ci-tests.git
cd todo-app-ci-tests
```

### 2. Start Backend
```bash
cd backend
npm install
npm run dev     # Runs on http://localhost:3001
```

### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev     # Runs on http://localhost:5173
```

### 4. Run UI Tests (from project root)
```bash
npx cucumber-js
```

### 5. Run API Tests
```bash
cd backend
mvn test
```

---

### 6. Test Report Link

https://drive.google.com/drive/folders/1Ibfz3BoCwmowvoYr7mUjVU7qDnGEPYuY?usp=sharing

## Author

**Gizem Öztürk**

This project was created for a technical interview assessment. Please reach out if you'd like to explore any part further or request improvements.

