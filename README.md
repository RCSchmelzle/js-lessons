# JavaScript Crash Course

An interactive, self-contained JavaScript course for complete beginners. 10 lessons from setup through debugging, with built-in code editors and live DOM previews.

## Quick Start

1. Open `index.html` in Chrome (or any browser)
2. Click any lesson card to start
3. No installs or build tools needed

## Lessons

| # | File | Topic | Features |
|---|------|-------|----------|
| 0 | `00-setup.html` | Setup | VS Code, Chrome, Live Server, DevTools |
| 1 | `01-foundations.html` | Foundations | Variables, types, arrays, objects, classes, functions, loops |
| 2 | `02-data.html` | Working with Data | .forEach(), .map(), .filter(), .find(), destructuring, spread |
| 3 | `03-dom.html` | DOM & Interaction | querySelector, innerText, classList, events — **live DOM canvas** |
| 4 | `04-how-apps-work.html` | How Apps Work | Event-Logic-UI pattern, state, debugging the flow |
| 5 | `05-events-forms.html` | Events & Forms | Input, Enter key, delete, toggle — **live DOM canvas** |
| 6 | `06-async-apis.html` | Async & APIs | setTimeout, JSON, fetch, async/await, try/catch |
| 7 | `07-scope-closures.html` | Scope & Closures | Scope, closures, `this`, arrow functions, factories |
| 8 | `08-bootstrap.html` | Bootstrap | Containers, buttons, inputs, lists, grid layout |
| 9 | `09-debugging.html` | Debugging | Mindset, tracing flow, common bugs, the checklist |

## How Each Lesson Works

Each lesson is a slideshow of steps. Every step has:

- **Concept** — short explanation
- **Scratchpad** — editable code editor (click Run or Ctrl+Enter)
- **Annotations** — line-by-line breakdown
- **Expected output** — what you should see
- **Try it** — a challenge to test understanding
- **Live DOM canvas** (lessons 3 & 5) — real HTML elements your code manipulates

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Ctrl+Enter` / `Cmd+Enter` | Run code |
| `Tab` | Insert spaces in editor |
| `Left/Right arrows` | Navigate slides (when not in editor) |

## Running Your Code in the Browser

This project runs entirely in the browser. No server needed for most lessons.

### Option 1: Open directly (simplest)

Double-click any `.html` file. It opens in your default browser.

### Option 2: Live Server (recommended)

1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. Page auto-refreshes when you save

Live Server is better because:
- Auto-refreshes on save
- Works properly with API lessons (lesson 6)
- Closer to real development

### Using the Console

Open Chrome DevTools to see `console.log` output:

- **Mac**: `Cmd + Option + J`
- **Windows**: `Ctrl + Shift + J`
- Or: Right-click → Inspect → Console tab

## Debugging Guide

When something breaks, follow this checklist:

1. **Did the code run?** — Add `console.log("here")` at the top
2. **What values do I have?** — Log your variables: `console.log(data)`
3. **Where does it break?** — Add logs between steps
4. **What does the error say?** — Read the red text in the Console
5. **Did I save?** — `Cmd+S` / `Ctrl+S`
6. **Did I refresh?** — `Cmd+R` or use Live Server

### Common Error Messages

| Error | Meaning | Fix |
|-------|---------|-----|
| `Cannot read properties of null` | Element not found | Check your selector (#id, .class) |
| `is not a function` | Method name wrong | Check spelling (e.g., toUpperCase not toUppercase) |
| `is not defined` | Variable doesn't exist | Check for typos or scope issues |
| `Unexpected token` | Syntax error | Check for missing brackets, quotes, semicolons |

### The Golden Rule

> If you don't know what your code is doing, add a `console.log`.

## Project Structure

```
intro_js/
  index.html          # Landing page with links to all lessons
  theme.css           # Shared dark theme
  engine.js           # Shared slideshow engine
  00-setup.html       # Lesson 0: Setup
  01-foundations.html  # Lesson 1: JS basics
  02-data.html        # Lesson 2: Array methods
  03-dom.html         # Lesson 3: DOM (live canvas)
  04-how-apps-work.html  # Lesson 4: Mental model
  05-events-forms.html   # Lesson 5: Forms (live canvas)
  06-async-apis.html     # Lesson 6: Fetch & async
  07-scope-closures.html # Lesson 7: Scope & closures
  08-bootstrap.html      # Lesson 8: Bootstrap
  09-debugging.html      # Lesson 9: Debugging
  README.md
```

## For Instructors

- Lesson 0 handles full setup (VS Code, Chrome, Live Server, DevTools)
- Lessons 3 and 5 have live DOM canvases where students see real HTML change
- Lesson 4 teaches the Event-Logic-UI mental model — reference it in later lessons
- Lesson 9 teaches systematic debugging — assign it early if students get stuck
- Each lesson is self-contained and can be done independently

## How to Clone This Repo

If you've never used Git before:

1. Click the green **Code** button at the top of this page
2. Click **Download ZIP**
3. Unzip and open the folder in VS Code

Or use Terminal:

```bash
git clone <repo-url>
cd intro_js
code .
```

## Goal

By the end, students can:

- Write JavaScript from scratch
- Manipulate the DOM and handle events
- Build interactive apps (to-do list, etc.)
- Fetch and display external data
- Debug their own code systematically
