# VAJRA – SCRB Crime AI

## An Explainable Conversational Crime Intelligence Platform for Law Enforcement

VAJRA is an AI-powered prototype developed for the Karnataka State Crime Records Bureau (SCRB) Crime AI Challenge. It enables investigators to interact with crime intelligence using natural language in English and Kannada, visualize criminal networks, analyze crime trends, identify hotspots, and receive predictive insights through an intuitive web-based dashboard.

**Disclaimer:** VAJRA is a demonstration prototype built for the SCRB Crime AI Challenge. It operates on a **limited, simulated dataset** designed to showcase platform capabilities and is **not connected to any live SCRB, CCTNS, ICJS, or police database.**

---

# Features

### Conversational Crime Intelligence
- Natural-language crime data queries
- English and Kannada support
- Intelligent response suggestions
- Context-aware responses

### Explainable AI
- Confidence score for every response
- Step-by-step reasoning trail
- Data source references
- Transparent decision-making

### Criminal Network Analysis
- Interactive D3.js force-directed graph
- Suspect-to-suspect relationships
- Gang affiliations
- Crime-location connections
- Drag, zoom, and inspect nodes

### Crime Analytics Dashboard
- Monthly crime trends
- District-wise crime comparison
- Crime distribution charts
- Ranked hotspot analysis
- Interactive visualizations powered by Chart.js

### Predictive Intelligence
- Crime forecasting
- Early-warning alerts
- Risk assessment
- Trend prediction
- Confidence indicators

### Voice Interaction
- Speech-to-Text query input
- Text-to-Speech responses
- English and Kannada voice support
- Hands-free interaction

### Reports and Audit
- PDF export of conversations
- Audit trail logging
- User activity tracking
- Explainable response history

### Role-Based Access Control
- Investigator
- Crime Analyst
- Administrator

Dynamic permissions demonstrate how different user roles access different platform capabilities.

---

# Technology Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | User Interface |
| CSS3 | Styling |
| JavaScript (ES6) | Application Logic |
| Chart.js | Crime Analytics |
| D3.js | Criminal Network Visualization |
| jsPDF | PDF Export |
| Web Speech API | Speech Recognition and Text-to-Speech |

---

# Project Structure

```
SCRB-Crime-AI/
│
├── index.html
├── styles.css
│
├── js/
│   ├── audit.js
│   ├── auth.js
│   ├── charts.js
│   ├── chat.js
│   ├── i18n.js
│   ├── main.js
│   ├── network-graph.js
│   ├── pdf-export.js
│   ├── session.js
│   └── voice.js
│
└── README.md
```

---

# Core Capabilities

- Conversational AI Assistant
- Explainable AI Responses
- Criminal Network Visualization
- Crime Trend Analytics
- Hotspot Detection
- Predictive Crime Alerts
- Voice-Based Interaction
- Audit Trail Logging
- PDF Report Generation
- Role-Based Access Control
- English and Kannada Interface

---

# Example Queries

Investigators can ask questions such as:

- Show robbery cases in Bengaluru.
- List cybercrime incidents this month.
- Display the criminal network of a suspect.
- Show crime hotspots across Karnataka.
- Predict high-risk districts next week.
- Compare crime trends for the last six months.
- Explain why this prediction was generated.
- Show repeat offenders.
- Display district-wise crime statistics.
- Find connected gang members.

---

# Getting Started

## Option 1 – Open Directly

Open `index.html` in any modern web browser.

---

## Option 2 – Run a Local Server (Recommended)

Using Python 3:

```bash
python -m http.server 8000
```

Then open:

```
http://localhost:8000
```

---

# Browser Compatibility

- Google Chrome
- Microsoft Edge
- Brave
- Opera

Voice features work best in Chromium-based browsers.

---

# Prototype Scope

VAJRA demonstrates the workflow of an AI-assisted crime intelligence platform.

The current prototype includes:

- Simulated crime records
- Demonstration criminal network
- Mock predictive analytics
- Rule-based conversational engine
- Explainable AI responses
- Interactive dashboards

The application **does not connect to live law enforcement databases**.

---

# Future Enhancements

Potential production integrations include:

- Karnataka SCRB Systems
- Crime and Criminal Tracking Network & Systems (CCTNS)
- Interoperable Criminal Justice System (ICJS)
- Live FIR databases
- CCTV analytics
- Face recognition systems
- Automatic number plate recognition (ANPR)
- GIS-based crime mapping
- Retrieval-Augmented Generation (RAG)
- Large Language Models (LLMs)
- Multi-agent AI workflows
- Real-time crime intelligence feeds

---

# Built For

**Karnataka State Crime Records Bureau (SCRB) Crime AI Challenge**

VAJRA demonstrates how Explainable Artificial Intelligence can assist investigators by transforming complex crime data into actionable insights while maintaining transparency, accountability, and ease of use.

---

# Disclaimer

This application is intended solely for demonstration and educational purposes.

All crime records, suspects, locations, relationships, and analytics are synthetically generated and do not represent real individuals, organizations, or criminal investigations.

The prototype uses a **limited simulated dataset** and is **not connected to any live government, SCRB, CCTNS, ICJS, or police database.**

---

# Authors

Developed as part of the Karnataka State Crime Records Bureau (SCRB) Crime AI Challenge to demonstrate how conversational AI, explainable analytics, predictive intelligence, and interactive visualizations can support modern law enforcement decision-making.
