# SauceDemo Automation Tests

## 📌 Project Overview

This project contains automated end-to-end tests for the SauceDemo web application using WebdriverIO.

The goal of this project is to validate core user functionality including login, navigation, and cart features.

---

## 🛠️ Tech Stack

* JavaScript
* WebdriverIO
* Node.js

---

## 📂 Project Structure

```
test/
  ├── pageobjects/
  │     ├── login.page.js
  │     ├── inventory.page.js
  │     ├── cart.page.js
  │     ├── menu.page.js
  │     ├── page.js
  │     └── secure.page.js
  └── specs/
        └── test.e2e.js
```

---

## ▶️ How to Run Tests

1. Install dependencies:

```
npm install
```

2. Run tests:

```
npx wdio run wdio.conf.js
```

---

## ✅ Test Scenarios

* User can log in with valid credentials
* User can open the hamburger menu
* User can log out from the menu
* User can reset application state
* User can add an item to the cart
* User can open the cart page
* User can verify item appears in the cart

---

## 📌 Key Features

* Uses Page Object Model (POM)
* Clean test structure for scalability
* Async/Await for better readability
* Organized selectors and reusable methods

---

## 📌 Notes

* `node_modules` is excluded using `.gitignore`
* Tests are written for maintainability and clarity
* Designed as a beginner-friendly automation project

---

## 👤 Author

Dillon Fuller
