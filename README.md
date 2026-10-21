# E-Commerce Test Automation with AI

A **Playwright + TypeScript test automation framework** for [SauceDemo](https://www.saucedemo.com), demonstrating end-to-end UI testing, REST API testing, reusable test architecture, CI/CD, and AI-assisted test automation workflows.

The project showcases practical SDET skills, including maintainable automation, test-data management, cross-browser testing, failure debugging, and AI-assisted test development.

## Key Features

- **End-to-end UI testing:** Login, product details, cart operations, checkout, and order confirmation.
- **Page Object Model (POM):** Reusable page classes that encapsulate locators and user actions.
- **Custom fixtures:** Shared page objects and a `checkoutReady` fixture for reusable test preconditions.
- **REST API testing:** GET, POST, PUT, and DELETE requests with response validation.
- **Local mock API:** JSON Server for testing product operations against a local REST API.
- **PDF receipt verification:** Download and validate receipt contents using `pdf-parse`.
- **Cross-browser testing:** Chromium, Firefox, and WebKit.
- **Failure diagnostics:** Traces, screenshots, videos, and CI retries.
- **CI/CD:** GitHub Actions executes the test suite and uploads reports and test results.
- **AI-assisted testing:** Hands-on practice with Planner, Generator, and Healer agent workflows using OpenCode prompts, alongside Playwright MCP browser exploration.

## Tech Stack

| Technology | Purpose |
|---|---|
| TypeScript | Test implementation and page objects |
| Playwright Test | UI automation, API testing, assertions, and reporting |
| JSON Server | Local mock REST API |
| `pdf-parse` | PDF receipt content verification |
| GitHub Actions | Continuous integration |
| OpenCode | AI-assisted development and agent workflows |
| Playwright MCP | Browser exploration through AI-accessible tools |

## Project Structure

```text
├── .github/workflows/       # GitHub Actions CI/CD
├── .opencode/prompts/       # AI testing prompts
│   ├── playwright-test-planner.md
│   ├── playwright-test-generator.md
│   └── playwright-test-healer.md
├── fixtures/                # Custom Playwright fixtures
├── mock-api/                # Local API and seed data
├── pages/                   # Page Object Model classes
├── tests/
│   ├── api/                 # External and mock API tests
│   ├── login.spec.ts        # Login scenarios
│   ├── products.spec.ts     # Product scenarios
│   ├── cart.spec.ts         # Cart scenarios
│   ├── checkout.spec.ts     # Checkout and PDF receipt
│   └── isolation.spec.ts    # Test-data lifecycle
├── opencode.json            # Playwright MCP configuration
├── playwright.config.ts     # Playwright configuration
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/iqra1/ai-ecommerce-test-automation.git
cd ai-ecommerce-test-automation
```

### 2. Install dependencies and browsers

```bash
npm ci
npx playwright install
```

On Linux or CI environments, install browser system dependencies if required:

```bash
npx playwright install --with-deps
```

## Running Tests

### UI tests

Run individual test suites:

```bash
npx playwright test tests/login.spec.ts
npx playwright test tests/products.spec.ts
npx playwright test tests/cart.spec.ts
npx playwright test tests/checkout.spec.ts
```

Run tests in a specific browser:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### External API tests

The external API tests use JSONPlaceholder.

```bash
npx playwright test --project=api
```

### Local mock API tests

The local JSON Server must be running on port `3001`.

Start the mock API in a separate terminal:

```bash
npm run mock-api
```

Then run the mock API tests:

```bash
npx playwright test --project=mock-api
```

### HTML report

After a test run, open the Playwright HTML report:

```bash
npx playwright show-report
```

## AI-Assisted Test Automation

This project explores how AI can support the test automation lifecycle through **OpenCode, Playwright MCP, and Planner, Generator, and Healer agent workflows**.

- **Planner Agent:** Practiced using prompts to plan test scenarios from application requirements and user journeys.
- **Generator Agent:** Practiced generating Playwright test code from testing requirements.
- **Healer Agent:** Practiced investigating test failures, identifying potential root causes, and improving existing automation.
- **Playwright MCP:** Explored application pages through browser interactions and accessibility snapshots to inform locator selection and test design.

Reusable prompts for planning, generation, and healing are maintained in `.opencode/prompts/`.

These hands-on exercises demonstrate practical experience with AI-assisted test design, code generation, and debugging. The agent workflows have been practiced using prompts; they are not presented as an autonomous test-healing pipeline integrated into CI/CD.

## CI/CD

The GitHub Actions workflow in `.github/workflows/playwright.yml` automates test execution on configured pushes and pull requests.

The workflow installs dependencies and browsers, starts the local mock API, runs the test suite, and uploads Playwright reports and test results as artifacts.

## Engineering Practices

- Reusable page objects and fixtures to reduce duplication.
- Explicit assertions for UI behavior and API responses.
- API test-data cleanup patterns using resource IDs and `finally` blocks.
- Cross-browser execution and failure-focused diagnostics.
- Version-controlled automation and AI prompt assets.

## Author

**Iqra Luqman**

- GitHub: [iqra1](https://github.com/iqra1)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/iqra-luqman-072b1784/)
