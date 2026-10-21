# SauceDemo Login Test Plan

**Application:** SauceDemo — https://www.saucedemo.com
**Feature under test:** User authentication (login)
**Related test file (existing):** `tests/login.spec.ts`
**Page object:** `pages/LoginPage.ts`
**Fixtures:** `fixtures/fixtures.ts`
**Plan generated:** 2026-10-20 (via Playwright Test Planner workflow; all behaviors below verified against the live application)

---

## 1. Application Overview

The SauceDemo login page (`/`) consists of:

| Element | Locator details |
|---|---|
| Username textbox | `getByPlaceholder('Username')` / `data-test="username"` |
| Password textbox | `getByPlaceholder('Password')` / `data-test="password"` |
| Login button | `getByRole('button', { name: 'Login' })` / `data-test="login-button"` |
| Error alert | `getByRole('alert')`, includes a **Dismiss error** button |

A credentials hint panel lists the accepted usernames and shared password:

- **Usernames:** `standard_user`, `locked_out_user`, `problem_user`, `performance_glitch_user`, `error_user`, `visual_user`
- **Password (all users):** `secret_sauce`

**Verified behavior (live exploration):**

| Scenario | Result |
|---|---|
| Valid credentials (`standard_user` / `secret_sauce`) | Redirect to `/inventory.html`; "Products" heading, cart button, burger menu, 6 products rendered |
| Both fields empty | Alert: `Epic sadface: Username is required` |
| Empty username, filled password | Alert: `Epic sadface: Username is required` |
| Filled username, empty password | Alert: `Epic sadface: Password is required` |
| Invalid username or invalid password | Alert: `Epic sadface: Username and password do not match any user in this service` |

In all failure cases the user remains on the login page.

---

## 2. Test Scenarios

### TC-LOGIN-01 — Successful login with valid credentials

| Field | Detail |
|---|---|
| **Priority** | High |
| **Objective** | Verify that a registered user can log in with valid credentials and is granted access to the application. |

**Preconditions**

- Browser is at a fresh, blank state (assumed for all scenarios).
- Navigate to the SauceDemo login page: `https://www.saucedemo.com/`.
- Valid credentials available: `standard_user` / `secret_sauce`.

**Test Steps**

1. Open the SauceDemo login page.
2. Type `standard_user` into the Username textbox.
3. Type `secret_sauce` into the Password textbox.
4. Click the **Login** button.

**Expected Results**

- The user is redirected away from the login page to `/inventory.html`.
- The "Products" heading is visible.
- No error alert is displayed.
- **Success criteria:** authenticated session established.
- **Failure condition:** any error alert appears, or the URL remains the login page.

---

### TC-LOGIN-02 — Navigation to the inventory page after successful login

| Field | Detail |
|---|---|
| **Priority** | High |
| **Objective** | Verify the user lands on a fully rendered inventory page after successful authentication. |

**Preconditions**

- Fresh, blank browser state.
- At the SauceDemo login page.
- Valid credentials available: `standard_user` / `secret_sauce`.

**Test Steps**

1. Open the SauceDemo login page.
2. Log in with `standard_user` / `secret_sauce`.
3. Wait for navigation to complete.
4. Inspect the resulting page structure.

**Expected Results**

- URL contains `/inventory.html`.
- Page title is "Swag Labs".
- The "Products" heading is visible.
- The cart button ("Cart, empty") is visible in the header.
- The burger menu button ("Open Menu") is visible and contains a **Logout** item.
- The product list renders with 6 products, each with an "Add to cart" button.
- **Success criteria:** inventory page fully loaded and interactive.
- **Failure condition:** redirect does not occur or key page elements are missing.

---

### TC-LOGIN-03 — Login attempt with invalid username

| Field | Detail |
|---|---|
| **Priority** | High |
| **Objective** | Verify the system rejects a login with an unregistered username and shows the credential-mismatch error. |

**Preconditions**

- Fresh, blank browser state.
- At the SauceDemo login page.

**Test Steps**

1. Open the SauceDemo login page.
2. Type `invalid_user` into the Username textbox.
3. Type `secret_sauce` into the Password textbox.
4. Click the **Login** button.

**Expected Results**

- An error alert appears with the exact text:
  `Epic sadface: Username and password do not match any user in this service`
- The user remains on the login page (URL is still the root login page, not `/inventory.html`).
- The entered values remain in the Username and Password fields.
- **Success criteria:** login denied with the mismatch message.
- **Failure condition:** user is redirected to `/inventory.html` or no alert is shown.

---

### TC-LOGIN-04 — Login attempt with invalid password

| Field | Detail |
|---|---|
| **Priority** | High |
| **Objective** | Verify the system rejects a valid username paired with an incorrect password. |

**Preconditions**

- Fresh, blank browser state.
- At the SauceDemo login page.

**Test Steps**

1. Open the SauceDemo login page.
2. Type `standard_user` into the Username textbox.
3. Type `wrong_password` into the Password textbox.
4. Click the **Login** button.

**Expected Results**

- An error alert appears with the exact text:
  `Epic sadface: Username and password do not match any user in this service`
- The user remains on the login page (no redirect to `/inventory.html`).
- **Success criteria:** login denied with the mismatch message.
- **Failure condition:** user is redirected to `/inventory.html` or no alert is shown.

---

### TC-LOGIN-05 — Login attempt with empty username and empty password

| Field | Detail |
|---|---|
| **Priority** | Medium |
| **Objective** | Verify client-side required-field validation when both fields are submitted empty. |

**Preconditions**

- Fresh, blank browser state.
- At the SauceDemo login page.
- Username and Password fields are empty.

**Test Steps**

1. Open the SauceDemo login page.
2. Leave the Username textbox empty.
3. Leave the Password textbox empty.
4. Click the **Login** button.

**Expected Results**

- An error alert appears with the exact text:
  `Epic sadface: Username is required`
- The user remains on the login page.
- **Success criteria:** "Username is required" validation message is shown.
- **Failure condition:** no alert, a different message, or navigation away from the login page.

---

### TC-LOGIN-06 — Login attempt with empty username and filled password

| Field | Detail |
|---|---|
| **Priority** | Medium |
| **Objective** | Verify the username-required validation when only the username field is empty. |

**Preconditions**

- Fresh, blank browser state.
- At the SauceDemo login page.

**Test Steps**

1. Open the SauceDemo login page.
2. Leave the Username textbox empty.
3. Type `secret_sauce` into the Password textbox.
4. Click the **Login** button.

**Expected Results**

- An error alert appears with the exact text:
  `Epic sadface: Username is required`
- The user remains on the login page.
- **Success criteria:** username emptiness is detected and reported.
- **Failure condition:** the mismatch message or "Password is required" is shown instead, or navigation occurs.

---

### TC-LOGIN-07 — Login attempt with filled username and empty password

| Field | Detail |
|---|---|
| **Priority** | Medium |
| **Objective** | Verify the password-required validation when only the password field is empty. |

**Preconditions**

- Fresh, blank browser state.
- At the SauceDemo login page.

**Test Steps**

1. Open the SauceDemo login page.
2. Type `standard_user` into the Username textbox.
3. Leave the Password textbox empty.
4. Click the **Login** button.

**Expected Results**

- An error alert appears with the exact text:
  `Epic sadface: Password is required`
- The user remains on the login page.
- **Success criteria:** password emptiness is detected and reported.
- **Failure condition:** "Username is required" or the mismatch message is shown, or navigation occurs.

---

### TC-LOGIN-08 — Appropriate error messages for unsuccessful login attempts

| Field | Detail |
|---|---|
| **Priority** | Medium |
| **Objective** | Verify the error alert UI behaves correctly across failure types, including accessibility and dismissal. |

**Preconditions**

- Fresh, blank browser state.
- At the SauceDemo login page.

**Test Steps**

1. Open the SauceDemo login page.
2. Submit invalid credentials (`invalid_user` / `wrong_password`) and observe the alert.
3. Verify the alert is exposed with role `alert` and contains a **Dismiss error** button.
4. Click the **Dismiss error** button.
5. Submit another failure case (both fields empty) to confirm the alert reappears with the field-specific message.

**Expected Results**

- Step 2: alert text is `Epic sadface: Username and password do not match any user in this service` for non-empty invalid credentials.
- Step 3: the alert region is accessible (`role="alert"`) and includes a **Dismiss error** control.
- Step 4: the alert is removed/hidden after clicking dismiss.
- Step 5: the alert reappears with `Epic sadface: Username is required` for empty-field submission.
- **Success criteria:** correct, dismissible, field-appropriate error messaging for every failure type.
- **Failure condition:** wrong message text, alert not dismissible, or alert fails to reappear.

---

## 3. Existing Test Coverage Analysis

Current suite: `tests/login.spec.ts` (6 tests, using `LoginPage` page object and custom fixtures).

| Existing test | Assertions | Maps to |
|---|---|---|
| Login with valid credentials | URL matches `/.*inventory.html/`; "Products" text visible | TC-LOGIN-01, partial TC-LOGIN-02 |
| Login with invalid password | Alert text = mismatch message | TC-LOGIN-04 |
| Login with invalid username | Alert text = mismatch message | TC-LOGIN-03 |
| Login with empty credentials | Alert text = "Username is required" | TC-LOGIN-05 |
| Login with empty username | Alert text = "Username is required" | TC-LOGIN-06 |
| Login with empty password | Alert text = "Password is required" | TC-LOGIN-07 |

Login is also exercised indirectly by `products.spec.ts`, `cart.spec.ts`, and the `checkoutReady` fixture in `fixtures/fixtures.ts` (all log in with `standard_user` / `secret_sauce`).

## 4. Coverage Gaps

1. **Failed-login URL assertion missing** — existing negative tests only assert alert text; none verify the user stays on the login page (no redirect to `/inventory.html`).
2. **Error alert dismissal not covered** — the **Dismiss error** button behavior (alert closes and can reappear) is untested (TC-LOGIN-08 addresses this).
3. **Post-login inventory validation is shallow** — only the "Products" text is asserted; cart button, Logout menu item, and product list rendering are unverified (TC-LOGIN-02 addresses this).
4. **Test code defect** — in `tests/login.spec.ts`, the "Login with empty password" test calls `loginPage.goto()` twice (lines 57–58); redundant but harmless. Should be cleaned up when test code is next generated.
5. **Optional future scenarios (out of scope for this plan)** — `locked_out_user` account-locked error; `problem_user` / `performance_glitch_user` behavioral anomalies; password-field masking (text obscured); error-message UI styling.

## 5. Scenario-to-Coverage Summary

| # | Scenario | ID | Priority | Existing coverage |
|---|---|---|---|---|
| 1 | Successful login | TC-LOGIN-01 | High | Covered |
| 2 | Navigation to inventory page after login | TC-LOGIN-02 | High | Partial (URL + "Products" only) |
| 3 | Invalid username | TC-LOGIN-03 | High | Covered (alert text only) |
| 4 | Invalid password | TC-LOGIN-04 | High | Covered (alert text only) |
| 5 | Empty username and password | TC-LOGIN-05 | Medium | Covered |
| 6 | Empty username | TC-LOGIN-06 | Medium | Covered |
| 7 | Empty password | TC-LOGIN-07 | Medium | Covered (has duplicate `goto()` defect) |
| 8 | Appropriate error messages for unsuccessful logins | TC-LOGIN-08 | Medium | Gap (alert dismiss + URL retention untested) |

**Scenarios are independent** — each starts from a fresh, blank state and can be executed in any order.
