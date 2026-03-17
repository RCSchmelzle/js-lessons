// Slideshow engine — LeetCode-style layout
// Each lesson defines: window.SLIDES, window.LESSON_INFO, optional window.HAS_CANVAS

let cSlide = 0;

// Theme toggle
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  const btn = document.querySelector(".theme-toggle");
  if (btn) btn.innerHTML = next === "light" ? "&#9788;" : "&#9790;";
}

// Apply saved theme on load
(function() {
  const saved = localStorage.getItem("theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);
})();

function buildLayout() {
  const info = window.LESSON_INFO || {};
  const hasCanvas = window.HAS_CANVAS || false;

  const container = document.querySelector("body > div");
  container.className = hasCanvas ? "has-canvas" : "";
  const lessons = [
    { file: "01-foundations.html", label: "1 — Foundations" },
    { file: "02-data.html", label: "2 — Working with Data" },
    { file: "03-dom.html", label: "3 — DOM & Interaction" },
    { file: "04-how-apps-work.html", label: "4 — How Apps Work" },
    { file: "05-events-forms.html", label: "5 — Events & Forms" },
    { file: "06-async-apis.html", label: "6 — Async & APIs" },
    { file: "07-scope-closures.html", label: "7 — Scope & Closures" },
    { file: "08-bootstrap.html", label: "8 — Bootstrap" },
    { file: "00-setup.html", label: "Setup Guide" },
    { file: "09-debugging.html", label: "Debugging" },
  ];
  const currentFile = location.pathname.split("/").pop();
  const lessonLinks = lessons.map(l =>
    `<a class="menu-item${l.file === currentFile ? ' active' : ''}" href="${l.file}">${l.label}</a>`
  ).join("");

  container.innerHTML = `
    <div class="lesson-bar">
      <div class="menu-wrapper">
        <button class="home-btn" onclick="document.querySelector('.menu-dropdown').classList.toggle('open')">&#9776;</button>
        <div class="menu-dropdown">
          <a class="menu-item menu-home" href="index.html">Home</a>
          <div class="menu-divider"></div>
          ${lessonLinks}
        </div>
      </div>
      <div class="lesson-bar-title">
        <span class="lesson-num">${info.num || ''}</span>
        <span class="lesson-name">${info.name || ''}</span>
      </div>
      <button class="theme-toggle" onclick="toggleTheme()" title="Toggle light/dark mode">&#9790;</button>
    </div>
    <div class="nav-bar">
      <button class="nav-btn" id="prevBtn" onclick="navigate(-1)">&larr; prev</button>
      <div class="dots" id="dots"></div>
      <button class="nav-btn" id="nextBtn" onclick="navigate(1)">next &rarr;</button>
    </div>
    <div class="main-area">
      <div class="split-pane">
        <div class="pane-left" id="pane-left">
          <div class="pane-section">
            <div class="slide-header">
              <span class="step-badge" id="badge">Step 1</span>
              <span class="slide-title" id="title"></span>
            </div>
            <span class="progress" id="progress"></span>
          </div>
          <div class="pane-section">
            <div class="concept" id="concept"></div>
          </div>
          <div class="pane-section try-it" id="tryit"></div>
          <details class="cheatsheet-details">
            <summary class="cheatsheet-summary">Cheatsheet</summary>
            <div class="cheatsheet-cols">
              <div class="cheatsheet-col">
                <div class="cheatsheet-heading">Variables</div>
                <code>let x = 5;</code>
                <code>const y = "hi";</code>
                <div class="cheatsheet-heading">Arrays</div>
                <code>[1,2,3].push(4)</code>
                <code>arr.length, arr[0]</code>
                <div class="cheatsheet-heading">Loops</div>
                <code>for (let x of arr) {}</code>
                <code>arr.forEach(x => {})</code>
              </div>
              <div class="cheatsheet-col">
                <div class="cheatsheet-heading">Objects</div>
                <code>{ key: "val" }</code>
                <code>obj.key</code>
                <div class="cheatsheet-heading">Functions</div>
                <code>function f(x) { return x; }</code>
                <code>const f = (x) => x;</code>
                <div class="cheatsheet-heading">Array Methods</div>
                <code>.map(x => x.name)</code>
                <code>.filter(x => x > 2)</code>
                <code>.find(x => x.id === 1)</code>
              </div>
              <div class="cheatsheet-col">
                <div class="cheatsheet-heading">DOM</div>
                <code>querySelector("#id")</code>
                <code>el.innerText = "..."</code>
                <code>classList.toggle("c")</code>
                <code>addEventListener("click", fn)</code>
                <div class="cheatsheet-heading">Async</div>
                <code>async function f() {</code>
                <code>  await fetch(url);</code>
                <code>  await r.json();</code>
                <code>}</code>
              </div>
            </div>
          </details>
        </div>
        <div class="pane-right">
          <div class="panel editor-panel">
            <div class="panel-head">
              <span class="panel-label">JavaScript</span>
              <button class="run-btn" onclick="runCode()">Run &#9654;</button>
            </div>
            <textarea class="code" id="editor" spellcheck="false"></textarea>
          </div>
          <details class="explain-toggle" id="explain-toggle">
            <summary>Line-by-line breakdown</summary>
            <div class="explain-box explain-scroll" id="explain"></div>
          </details>
          <div class="result-area">
            <div class="result-col actual" id="actual-col">
              <div class="result-label">Your Output</div>
              <div class="result-scroll" id="output"><span class="result-line neutral" style="opacity:0.4">click Run...</span></div>
            </div>
            <details class="expected-toggle" id="expected-toggle">
              <summary class="expected-summary">Expected Output</summary>
              <div class="result-col expected-col" id="expected-col">
                <div class="result-scroll" id="expected"></div>
              </div>
            </details>
          </div>
        </div>
      </div>
      ${hasCanvas ? '<div class="canvas-pane"><div class="dom-canvas" id="canvas"></div></div>' : ''}
    </div>
  `;

  // Editor keybindings
  document.getElementById("editor").addEventListener("keydown", e => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = e.target, s = ta.selectionStart, en = ta.selectionEnd;
      ta.value = ta.value.substring(0, s) + "  " + ta.value.substring(en);
      ta.selectionStart = ta.selectionEnd = s + 2;
    }
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      runCode();
    }
  });

  // Close menu on outside click
  document.addEventListener("click", e => {
    const menu = document.querySelector(".menu-dropdown");
    const btn = document.querySelector(".home-btn");
    if (menu && !menu.contains(e.target) && e.target !== btn) {
      menu.classList.remove("open");
    }
  });

  // Arrow key nav (not in editor/input)
  document.addEventListener("keydown", e => {
    if (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT") return;
    if (e.key === "ArrowLeft") navigate(-1);
    if (e.key === "ArrowRight") navigate(1);
  });
}

function navigate(d) {
  cSlide = Math.max(0, Math.min(window.SLIDES.length - 1, cSlide + d));
  render();
}

function render() {
  const s = window.SLIDES[cSlide];
  const total = window.SLIDES.length;

  document.getElementById("badge").textContent = `Step ${cSlide + 1}`;

  // Parse priority label from title and render as colored dot
  let titleText = s.title;
  let dotHTML = '';
  const priorityLabels = { '[MUST KNOW]': 'must-know', '[GOOD TO KNOW]': 'good-to-know', '[ADVANCED]': 'advanced', '[OPTIONAL]': 'optional' };
  for (const [label, cls] of Object.entries(priorityLabels)) {
    if (titleText.startsWith(label)) {
      titleText = titleText.slice(label.length).trim();
      dotHTML = `<span class="priority-dot ${cls}" title="${label.slice(1, -1)}"></span> `;
      break;
    }
  }
  document.getElementById("title").innerHTML = dotHTML + titleText;
  document.getElementById("progress").textContent = `${cSlide + 1} / ${total}`;
  document.getElementById("concept").innerHTML = s.concept;
  document.getElementById("editor").value = s.code;

  // Reset output
  document.getElementById("output").innerHTML = '<span class="result-line neutral" style="opacity:0.4">click Run...</span>';

  // Reset pass/fail badge
  const actualCol = document.getElementById("actual-col");
  const labelEl = actualCol.querySelector(".result-label");
  labelEl.innerHTML = 'Your Output';

  // Canvas — only reset if canvasHTML is defined, otherwise preserve
  const canvas = document.getElementById("canvas");
  if (canvas) {
    if (s.canvasHTML !== undefined) {
      canvas.innerHTML = s.canvasHTML;
    }
  }

  // Expected output
  const exp = document.getElementById("expected");
  exp.innerHTML = s.expected.map(e =>
    `<div class="result-line expected-text">${e.replace(/</g, "&lt;")}</div>`
  ).join("");

  // Close expected by default
  document.getElementById("expected-toggle").removeAttribute("open");

  // Annotations
  const expl = document.getElementById("explain");
  expl.innerHTML = s.lines.map(([c, d]) =>
    `<div class="explain-row"><span class="explain-code">${c.replace(/</g, "&lt;")}</span><span class="arrow">&rarr;</span><span class="explain-desc">${d}</span></div>`
  ).join("");

  // Close annotations by default
  document.getElementById("explain-toggle").removeAttribute("open");

  // Try it
  document.getElementById("tryit").innerHTML = "<strong>Try it:</strong> " + s.tryit;

  // Nav buttons
  document.getElementById("prevBtn").disabled = cSlide === 0;
  document.getElementById("nextBtn").disabled = cSlide === total - 1;

  // Dots
  const dots = document.getElementById("dots");
  dots.innerHTML = "";
  for (let i = 0; i < total; i++) {
    const d = document.createElement("div");
    d.className = "dot" + (i === cSlide ? " active" : "");
    d.onclick = () => { cSlide = i; render(); };
    dots.appendChild(d);
  }

  // Auto-run code on canvas slides so event listeners get attached
  if (s.canvasHTML !== undefined) {
    runCode();
  }
}

async function runCode() {
  const code = document.getElementById("editor").value;
  const outEl = document.getElementById("output");
  const lines = [];
  const orig = console.log;

  console.log = (...args) => {
    lines.push(args.map(a => {
      if (a instanceof HTMLElement) return '<' + a.tagName.toLowerCase() + '#' + (a.id || '') + '>';
      if (typeof a === "object" && a !== null) {
        try { return JSON.stringify(a).replace(/"([^"]+)":/g, "$1:"); }
        catch (e) { return String(a); }
      }
      return String(a);
    }).join(" "));
  };

  try {
    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    const fn = new AsyncFunction(code);
    await fn();
    if (!lines.length) lines.push("(no output)");
  } catch (e) {
    lines.push("Error: " + e.message);
  }

  console.log = orig;

  // Compare with expected
  const expected = window.SLIDES[cSlide].expected;
  const allMatch = lines.length === expected.length && lines.every((l, i) => l === expected[i]);

  // Render actual output with diff coloring
  outEl.innerHTML = lines.map((l, i) => {
    const isError = l.startsWith("Error:");
    let cls = "neutral";
    if (isError) cls = "mismatch";
    else if (i < expected.length && l === expected[i]) cls = "match";
    else if (i < expected.length && l !== expected[i]) cls = "mismatch";
    else cls = "neutral";
    return `<div class="result-line ${cls}">${l.replace(/</g, "&lt;")}</div>`;
  }).join("");

  // Update label with pass/fail badge
  const actualCol = document.getElementById("actual-col");
  const labelEl = actualCol.querySelector(".result-label");
  if (allMatch) {
    labelEl.innerHTML = 'Your Output <span class="result-badge pass">pass</span>';
  } else {
    labelEl.innerHTML = 'Your Output <span class="result-badge fail">mismatch</span>';
  }
}

// Init
buildLayout();
render();

// Set correct theme icon after layout is built
(function() {
  const saved = localStorage.getItem("theme");
  const btn = document.querySelector(".theme-toggle");
  if (btn && saved === "light") btn.innerHTML = "&#9788;";
})();
