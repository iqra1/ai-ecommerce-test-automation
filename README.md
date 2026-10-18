# AI E-Commerce Test Automation — SauceDemo

An end-to-end test automation framework built with **Playwright** and **TypeScript**. It validates
the full purchase flow of [SauceDemo](https://www.saucedemo.com) — an e-commerce demo application —
covering login, product browsing, cart, checkout, and receipt download, plus **REST API testing**
against both an external API and a **local mock API**. The project also demonstrates **CI/CD** with
GitHub Actions and **AI-assisted browser exploration** through the Playwright MCP server.

The goal is to mirror how a modern QA/SDET team structures reliable, maintainable, and debuggable
automation: reusable page objects, shared fixtures, isolated tests, and clear failure diagnostics.

## Key Features

- **Playwright UI automation** with TypeScript for the SauceDemo storefront.
- **Core user journeys**: login validation, product listing, cart operations, and checkout.
- **PDF receipt download and verification** — the generated receipt is parsed and asserted
  field-by-field (`pdf-parse`).
- **REST API testing** using Playwright's built-in `request` fixture with HTTP method coverage
  (GET, POST, PUT, DELETE) and response assertions.
- **Local mock API** powered by `json-server` for deterministic, offline API testing.
- **Data isolation pattern** — a create → verify → cleanup test that attempts to remove its data in
  a `finally` block.
- **Page Object Model (POM)** and reusable **custom fixtures** (`checkoutReady`) that compose
  multi-step preconditions.
- **Cross-browser execution** on Chromium, Firefox, and WebKit.
- **Parallel execution, retries, tracing, screenshots, and video** captured on failure.
- **GitHub Actions CI/CD** that installs browsers, starts the mock API, runs the suite, and uploads
  reports and results as artifacts.
- **OpenCode + Playwright MCP integration** for AI-assisted browser exploration.

## Tech Stack

| Technology | Role |
| --- | --- |
| TypeScript | Language for tests and page objects. Playwright compiles TypeScript out of the box, so no separate `typescript` dependency is declared. |
| Playwright Test (`@playwright/test` ^1.62.1) | Test runner, browser automation, and API testing |
| Node.js | JavaScript runtime that executes Playwright and the project tooling |
| `@types/node` (^26.6.3) | TypeScript type definitions for the Node.js standard library (dev dependency) |
| json-server (^0.17.4) | Local mock REST API (`mock-api/db.json`) |
| pdf-parse (^2.4.5) | Parsing and validating the downloaded PDF receipt |
| GitHub Actions | CI/CD pipeline |
| OpenCode + Playwright MCP | AI-assisted browser exploration |

> **Node version:** the CI workflow uses `node-version: lts/*`. No `engines` field is defined in
> `package.json`.

## Project Architecture

```
ai-ecommerce-test-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml        # CI: install, start mock API, run tests, upload artifacts
├── downloads/
│   └── order-receipt.pdf         # Downloaded PDF receipt (gitignored)
├── fixtures/
│   └── fixtures.ts               # Custom test fixtures wiring page objects
├── mock-api/
│   └── db.json                   # Seed data for the local json-server
├── pages/
│   ├── CartPage.ts               # Cart actions (open, remove, checkout)
│   ├── CheckoutPage.ts           # Checkout form, finish, PDF receipt download
│   ├── LoginPage.ts              # Login actions
│   └── ProductsPage.ts           # Product open / add-to-cart actions
├── test-data/                    # Reserved for test data (currently empty)
├── tests/
│   ├── api/
│   │   ├── mock-api.spec.ts      # Tests against local mock API
│   │   └── products.api.spec.ts  # Tests against external JSONPlaceholder API
│   ├── cart.spec.ts              # Cart scenarios (UI)
│   ├── checkout.spec.ts          # Checkout + PDF receipt (UI)
│   ├── isolation.spec.ts         # Create/verify/cleanup data isolation
│   ├── login.spec.ts             # Login scenarios (UI)
│   └── products.spec.ts          # Product listing/details (UI)
├── login-example.ts.txt          # Standalone reference snippet (not executed)
├── opencode.json                 # MCP server configuration
├── package.json
├── package-lock.json
└── playwright.config.ts          # Projects, base URLs, reporters, diagnostics
```

**Responsibilities**

- **`tests/`** — executable specs. UI specs target SauceDemo; `tests/api/` holds API specs.
- **`pages/`** — Page Object Model classes. Each encapsulates selectors and actions so tests read
  as intent, not raw selectors. Changes to the UI are absorbed in one place.
- **`fixtures/`** — a single extended `test` object. `loginPage`, `productsPage`, `cartPage`, and
  `checkoutPage` inject ready-made page objects; `checkoutReady` composes login → add product →
  open cart → checkout as a reusable precondition.
- **`mock-api/`** — deterministic backend data for offline API tests via `json-server`.
- **`test-data/`** — reserved directory for externalized test data (currently empty).
- **`.github/workflows/`** — the CI pipeline definition.

## Test Coverage

All scenarios below are defined in the current source files.

### UI Tests — SauceDemo

| Spec | Scenario |
| --- | --- |
| `login.spec.ts` | Login with valid credentials |
| `login.spec.ts` | Login with invalid password |
| `login.spec.ts` | Login with invalid username |
| `login.spec.ts` | Login with empty credentials |
| `login.spec.ts` | Login with empty username |
| `login.spec.ts` | Login with empty password |
| `products.spec.ts` | Products page displays products |
| `products.spec.ts` | User can view backpack product details |
| `cart.spec.ts` | User can add backpack product to cart |
| `cart.spec.ts` | User can remove backpack product from the cart |
| `checkout.spec.ts` | User can reach checkout |
| `checkout.spec.ts` | User can complete checkout information |
| `checkout.spec.ts` | Checkout requires first name |
| `checkout.spec.ts` | Checkout requires last name |
| `checkout.spec.ts` | Checkout requires postal code |
| `checkout.spec.ts` | User can complete the purchase |
| `checkout.spec.ts` | User can download the order receipt (PDF parse + assertions) |

### API Tests — External API (JSONPlaceholder)

| Spec | Scenario |
| --- | --- |
| `api/products.api.spec.ts` | GET post by id |
| `api/products.api.spec.ts` | POST create new post |
| `api/products.api.spec.ts` | POST handles missing title |
| `api/products.api.spec.ts` | PUT update an existing post |
| `api/products.api.spec.ts` | DELETE a post |

### API Tests — Local Mock API (json-server)

| Spec | Scenario |
| --- | --- |
| `api/mock-api.spec.ts` | Create product through API |
| `isolation.spec.ts` | Create, verify, and clean up a product |

> **Counts derived from the current source files:** 17 UI scenarios (`login` 6, `products` 2,
> `cart` 2, `checkout` 7) and 7 API scenarios (`products.api` 5, `mock-api` 1, `isolation` 1).
> UI scenarios are configured to run across three browsers via the `chromium`, `firefox`, and
> `webkit` projects. No pass/fail results or coverage percentages are claimed here.

## Prerequisites

- [Node.js](https://nodejs.org) (LTS recommended)
- npm
- Git

## Installation

```bash
# 1. Clone the repository
git clone <your-repository-url>
cd ai-ecommerce-test-automation

# 2. Install dependencies
npm ci          # or: npm install

# 3. Install the Playwright browsers
#    macOS / Windows (local development)
npx playwright install

#    Linux (and CI) — also installs OS-level browser dependencies
npx playwright install --with-deps
```

Use the plain `install` command for local macOS setup. Use `--with-deps` on Linux or in CI, where
the required system libraries may be missing; the flag installs those OS dependencies too.

## How to Run Tests

`package.json` defines a single script, `mock-api`. All test runs use the Playwright CLI.

### UI tests (SauceDemo)

```bash
# Run all tests (see the mock API note below before using this)
npx playwright test

# Run a single UI spec
npx playwright test tests/login.spec.ts
npx playwright test tests/checkout.spec.ts

# Run one browser project
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### API tests (external — JSONPlaceholder)

No local setup is required; these tests call a public API.

```bash
npx playwright test --project=api
```

### Mock API tests (json-server)

The Playwright configuration **does not start the mock API automatically** — the `webServer` option
in `playwright.config.ts` is present but commented out. The mock API specs
(`tests/api/mock-api.spec.ts` and `tests/isolation.spec.ts`) call `http://localhost:3001`, so the
server must be running first. Start it in a separate terminal:

```bash
# Terminal 1 — start the mock API (json-server on port 3001)
npm run mock-api

# Terminal 2 — run the mock API project
npx playwright test --project=mock-api
```

Because a plain `npx playwright test` runs **every** project — including the mock API specs — the
JSON Server must be running before a full-suite run, or those tests will fail.

### Reports

```bash
# Open the HTML report after a run
npx playwright show-report
```

## CI/CD

The workflow `.github/workflows/playwright.yml` runs on every **push** and **pull request** to
`main`/`master`:

1. Checks out the repo and sets up Node.js (`lts/*`).
2. Installs dependencies with `npm ci`.
3. Installs Playwright browsers with `npx playwright install --with-deps` (the Linux-appropriate
   command).
4. **Starts the mock API** in the background (`npm run mock-api &`).
5. Runs the full suite with `npx playwright test`.
6. Uploads the **`playwright-report/`** and **`test-results/`** folders as artifacts
   (30-day retention), guarded by `if: ${{ !cancelled() }}` so they are captured even on failures.

## AI-Assisted Testing with OpenCode and Playwright MCP

**What is MCP?** The Model Context Protocol (MCP) is an open standard that lets an AI assistant
connect to external tools through a well-defined interface. Here, a **Playwright MCP server**
exposes browser actions to the OpenCode assistant, enabling it to explore a live web page
interactively.

**Project configuration.** `opencode.json` registers a local Playwright MCP server:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "playwright": {
      "type": "local",
      "command": ["npx", "@playwright/mcp@latest"],
      "enabled": true
    }
  }
}
```

**Verifying the connection.** When the server is connected, Playwright browser tools become available
in the session — for example `navigate` and `snapshot` (the accessibility-tree capture). Navigating
to `https://www.saucedemo.com` and taking a snapshot confirms the connection: the response returns
the page URL, title, and an accessibility snapshot of the DOM.

**Example exploration performed.** Using the MCP browser tools, SauceDemo was opened and inspected
without logging in. The snapshot reported the page title **"Swag Labs"** and identified the login
form: a **Username** textbox, a **Password** textbox, and a **Login** button. The exploration
informed the locators used in `login-example.ts.txt`.

**MCP exploration vs. executable tests.** MCP exploration is an *interactive, human-in-the-loop*
workflow: the assistant drives a browser to understand a page and propose selectors. It is **not**
part of the automated test suite and does not run in CI. Executable Playwright tests are
*deterministic, repeatable, and version-controlled* — they run headlessly, across browsers, on every
push. MCP is a design-time aid; Playwright tests are the regression safety net.

**Implemented vs. planned.**

| Capability | Status |
| --- | --- |
| OpenCode + Playwright MCP browser exploration | Implemented (`opencode.json`) |
| Reference login snippet (`login-example.ts.txt`) | Present (reference only, not executed) |
| Playwright Agents (planner/generator/healer) | **Not implemented** — no evidence in the repo |

## Engineering Practices and Future Improvements

**What the framework gets right**

- **Maintainability** — the Page Object Model keeps selectors and actions in one place, so UI
  changes require edits in a single file rather than across every test.
- **Reusability** — custom fixtures inject page objects and compose preconditions
  (`checkoutReady`), removing duplication from specs.
- **Data isolation** — the isolation spec creates a product, verifies it, and attempts cleanup in a
  `finally` block. Cleanup runs even if earlier assertions fail; note that cleanup can itself fail
  (for example, if the API is unavailable), so this pattern reduces — but does not guarantee the
  absence of — leftover data.
- **Failure debugging** — `trace: 'on-first-retry'`, `screenshot: 'only-on-failure'`, and
  `video: 'retain-on-failure'` capture rich evidence exactly when a test fails, without inflating
  passing runs.
- **CI stability** — `forbidOnly` prevents a stray `test.only` from hiding tests in CI, and retries
  are enabled only on CI.

**Future work (not yet implemented)**

- Add dedicated `test` npm scripts (e.g. `test`, `test:ui`, `test:api`, `test:mock`) for convenience.
- Add a readiness check/wait for the mock API in CI instead of a fixed background start.
- Externalize test data into the empty `test-data/` directory and parameterize specs.
- Add a lint/format setup (ESLint + Prettier) and a `lint` script.
- Add API schema validation and negative-path API tests.
- Evaluate the Playwright Agents workflow once stable.

## Author

- **Iqra Luqman**
- GitHub: `https://github.com/iqra1`
- LinkedIn: `https://www.linkedin.com/in/iqra-luqman-072b1784/?isSelfProfile=true`

## License

No license is declared in `package.json`. Add one before distributing or reusing this project.
