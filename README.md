SCRB Crime AI
================

Short description
-----------------
VAJRA is a conversational AI prototype for law enforcement, enabling investigators to query crime data in English and Kannada, explore criminal networks, analyze trends, identify hotspots, and receive predictive alerts with explainable AI and audit trails. It runs on a limited, simulated dataset for demonstration purposes only and is not connected to any live database.
SCRB Crime AI is a small client-side web app for exploring crime-related data and analytics. It provides a UI (single HTML page), charts, a network graph, chat/voice hooks, and PDF export utilities. The app is front-end only and runs in a browser.

Contents
--------

- **Project root**: `index.html`, `styles.css`
- **JavaScript**: `js/` directory contains application modules:
  - `audit.js` — auditing utilities
  - `auth.js` — authentication helpers
  - `charts.js` — chart rendering and helpers
  - `chat.js` — chat UI and logic
  - `i18n.js` — translations / i18n support
  - `main.js` — app bootstrap and initialization
  - `network-graph.js` — network graph rendering
  - `pdf-export.js` — PDF export helpers
  - `session.js` — session storage and state
  - `voice.js` — voice input / TTS integration

Quick start
-----------

1. Open `index.html` in a modern browser (double-click or drag into browser).
2. For CORS or local file limitations, serve the directory using a simple static server. Example using Python 3:

```bash
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

Development notes
-----------------

- No build step required — this is plain HTML/CSS/JS.
- If you edit modules in `js/`, reload the page in your browser.
- If you add third-party libraries, consider adding a `vendor/` folder or use an npm toolchain and update this README accordingly.

Contributing
------------

- Open an issue to discuss features or bugs.
- Make small, focused pull requests and describe changes in the PR description.

License
-------

This project is provided without an explicit license. Add a `LICENSE` file (for example, MIT) if you want to allow reuse.

Contact
-------

If you want help improving the README or adding a contribution guide, tell me which sections you'd like expanded.
