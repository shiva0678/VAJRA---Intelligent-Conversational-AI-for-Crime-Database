# Contributing to VAJRA – SCRB Crime Intelligence AI

Thank you for your interest in contributing to **VAJRA**! This project is an open-source, explainable conversational crime intelligence platform developed to demonstrate how modern AI, interactive data visualizations, and predictive analytics can support law enforcement decision-making.

As a forked open-source repository, contributions from the community are warmly welcomed and greatly appreciated.

---

## 📌 Featured Contribution: Issue - UI Responsiveness for All Type of Devices

**Issue Title**: `UI responsiveness for all type of devices`  
**Scope**: Full mobile & tablet responsiveness across device viewports ranging from **320px to 768px** (mobile portrait/landscape) and **1024px** (tablet), while preserving 100% of existing desktop layouts and functionality above 768px without horizontal scrolling.

### Key Solved Components in this Contribution:
1. **Collapsible Hamburger Menu**: Transformed header and sidebar into a mobile drawer (`.sidebar.open`) with backdrop overlay (`#navOverlay`). Auto-closes on view navigation (`goto(view)`).
2. **Dashboard Cards & KPI Grid**: Multi-column grids (`.grid-3`, `.grid-2`) stack vertically in 1 column on mobile screens ($\le 768\text{px}$).
3. **Chart.js Fluid Visualizations**: Dynamic scale tick font sizes ($8.5\text{px}$–$10\text{px}$) and legend repositioning on mobile portrait screens (`chartOpts()`).
4. **D3.js Network Graph**: Added `touch-action: none` for smooth touch drag/zoom, a **Fullscreen** toggle button (`toggleFullscreenGraph()`), and a mobile node detail bottom sheet (`.node-panel.mobile-open`).
5. **Conversational Chat Console**: Dynamic viewport height (`100dvh`), $44\times 44\text{px}$ touch targets for voice/send icons, swipable suggestion chips, and mobile **XAI** details panel drawer (`toggleXAIPanel()`).
6. **Audit Trail Data Table**: Wrapped in a `.table-responsive` touch-scroll container with minimum width safeguards.
7. **Breakpoints**: Media query breakpoints for `1024px` (tablet), `768px` (mobile landscape), `480px` (mobile portrait), and `320px` (narrow mobile) with **zero horizontal page scroll**.

---

## 📜 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Forking & Development Workflow](#forking--development-workflow)
3. [Local Development Setup](#local-development-setup)
4. [Branching Guidelines](#branching-guidelines)
5. [Code Style & Standards](#code-style--standards)
6. [Submitting a Pull Request (PR)](#submitting-a-pull-request-pr)
7. [License & Ethical Use](#license--ethical-use)

---

## 🤝 Code of Conduct

We aim to maintain a welcoming, inclusive, and collaborative environment. All contributors are expected to:
- Be respectful, courteous, and constructive in discussions and code reviews.
- Focus on maintaining data privacy awareness and responsible AI principles.
- Use synthetically generated / simulated crime datasets **only** (never upload sensitive, real-world law enforcement or personal records).

---

## 🔀 Forking & Development Workflow

Since this is a forked open-source repository, please follow the standard GitHub Fork & Pull Request workflow:

1. **Fork the Repository**  
   Click the **Fork** button at the top-right of the repository page to create a personal copy under your GitHub account.

2. **Clone Your Fork Locally**  
   ```bash
   git clone https://github.com/YOUR_USERNAME/VAJRA---Intelligent-Conversational-AI-for-Crime-Database.git
   cd VAJRA---Intelligent-Conversational-AI-for-Crime-Database
   ```

3. **Set Up Remote Upstream**  
   Keep your fork synchronized with the main repository:
   ```bash
   git remote add upstream https://github.com/shiva0678/VAJRA---Intelligent-Conversational-AI-for-Crime-Database.git
   git fetch upstream
   ```

---

## 💻 Local Development Setup

No complex build system or Node/npm compilation steps are required. VAJRA is built with clean Vanilla HTML5, CSS3, and modern ES6 JavaScript.

### Running a Local Server (Recommended)

Using **Python 3**:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

---

## 🌿 Branching Guidelines

Always create a dedicated feature or bugfix branch off `main` before making changes:

- **Feature Branch Name**: `fix/ui-responsiveness-all-devices`
- **Commit Message Format**: `Fix issue: UI responsiveness for all type of devices (320px-1024px)`

```bash
git checkout main
git pull upstream main
git checkout -b fix/ui-responsiveness-all-devices
```

---

## 📥 Submitting a Pull Request (PR)

1. **Commit Your Changes**  
   ```bash
   git add .
   git commit -m "Fix issue: UI responsiveness for all type of devices"
   ```

2. **Push to Your Fork**  
   ```bash
   git push origin fix/ui-responsiveness-all-devices
   ```

3. **Open a Pull Request**  
   - Navigate to the original repository and click **New Pull Request**.
   - Select your feature branch as the compare branch against the upstream `main` branch.
   - Attach screenshots demonstrating mobile viewport responsiveness (320px, 480px, 768px, 1024px).
