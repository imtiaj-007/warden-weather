# AI Usage Report

This document provides transparency on how AI was used during the development of the **Warden Assignment – Weather to Stay or Not** project.

---

## 🎯 Purpose of AI Assistance

AI (ChatGPT) + Cursor (IDE) was used primarily as a **collaborative assistant** to:

* Speed up boilerplate writing (README, documentation, type interfaces, utility functions).
* Brainstorm efficient approaches for caching and filtering.
* Clarify API usage (Open-Meteo).
* Structure project setup instructions.
* Generate troubleshooting and best-practice notes.

All final design, logic, and coding decisions were reviewed and implemented manually.

---

## 🤝 Interaction with AI

### Discussions & Prompts

Some key prompts/conversations included:

1. **Backend README Drafting**

   * Prompt: *"write me a backend readme, with these details..."*
   * Outcome: Structured backend-only documentation with setup, features, API reference, and data flow.

2. **Parent README**

   * Prompt: *"now time to write the parent readme with project details and use the context of frontend and backend readme files..."*
   * Outcome: A comprehensive full-stack README, including backend + frontend setup, repo structure, troubleshooting.

3. **Improving Repo Tree View**

   * Prompt: *"fix the tree view, and add comments"*
   * Outcome: AI improved folder structure visualization with inline comments.

4. **Design Discussions**

   * Talked through:

     * Using **NodeCache** vs file persistence.
     * Deciding how to precompute **historical summaries** into `data/weather.json`.
     * Efficient filtering logic in `filterHelpers.ts`.

5. **Frontend Integration**

   * Prompt: *"write me a frontend readme with filters, property cards, API usage..."*
   * Outcome: Well-structured documentation for React Query usage and Chakra UI components.

---

## 🧑‍💻 Examples of AI Suggestions Incorporated

* **Documentation formatting** → Generated consistent README sections (`Quick Start`, `Scripts`, `Key Files`).
* **Project structure tree** → Clear breakdown of backend/frontend with comments.
* **Troubleshooting notes** → Added common pitfalls (CORS, missing data file).
* **Env variable examples** → Standardized `.env` and `.env.local`.

---

## 📝 What AI Did *Not* Do

* AI was **not used** to generate core backend or frontend code logic.
* AI did **not design algorithms** for weather fetching or filtering.
* All **API integration**, **business logic**, and **Prisma queries** were manually written.

AI acted only as a **documentation accelerator** and a **sounding board** for design/structural clarity.

---

## 📌 Summary

AI was used responsibly as a **productivity aid** for:

* Boilerplate code generation
* Clarification of design choices
* Repo organization
* Documentation

All technical implementation, testing, and validation were performed independently.