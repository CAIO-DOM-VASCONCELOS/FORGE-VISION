# 🛡️ FORGE VISION

**Local-first inventory intelligence · operational analytics · replenishment math · forecasting · AI-assisted decision support**

[![Hugging Face](https://img.shields.io/badge/Hugging%20Face-Portfolio-FFD21E?logo=huggingface&logoColor=000)](https://huggingface.co/DOM-CREATOR)
![Static](https://img.shields.io/badge/Deployment-Static%20Space-444)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=000)
![Local First](https://img.shields.io/badge/Architecture-Local--first-7A1E2C)
![PT-BR / EN](https://img.shields.io/badge/UI-PT--BR%20%2F%20EN-009C3B)

FORGE VISION is a browser-based inventory operations system designed to remain useful even without a traditional backend. It combines persistent local inventory, CSV/JSON workspace synchronization, inventory analytics, replenishment mathematics, demand forecasting, scenario simulation and an AI assistant grounded on calculations produced by the application itself.

## What this project demonstrates

- Inventory product, supplier, category and movement management.
- Persistent browser state and optional disk-backed workspace files.
- Excel-compatible CSV import/export and synchronization.
- ABC inventory classification.
- Inventory turnover and days-of-coverage analysis.
- Idle-capital, stockout and excess-stock detection.
- Safety stock, reorder point and EOQ calculations.
- Demand forecasting and scenario simulation.
- Bilingual PT-BR / English interface.
- AI-assisted operational questions using structured inventory context.
- Static deployment architecture with no mandatory server runtime.
- Defensive handling of destructive actions and invalid stock movements.

## Architecture

```text
User
 │
 ├── Inventory operations
 ├── CSV / workspace files
 └── Questions to FORGE AI
 │
 ▼
Browser application
 │
 ├── Inventory state
 ├── Analytics engine
 ├── Replenishment engine
 ├── Forecast engine
 ├── Simulation engine
 ├── localStorage / IndexedDB
 └── File System Access API (when supported)
 │
 ├──────────────► CSV / JSON files on local disk
 │
 └──────────────► Groq API (optional FORGE AI mode)
```

The operational calculations are performed locally. FORGE AI receives structured results from the application so the language model explains and prioritizes existing calculations instead of being treated as the source of truth for inventory numbers.

## Core inventory mathematics

FORGE VISION includes:

- **Reorder Point (ROP)** — `average daily demand × lead time + safety stock`
- **Safety Stock** — variability-based buffer using a service-level factor.
- **EOQ — Economic Order Quantity** — `sqrt((2 × annual demand × order cost) / annual holding cost per unit)`
- **Coverage** — current stock divided by average daily demand.
- **Turnover** — annualized demand relative to current inventory.
- **ABC classification** — cumulative annual consumption value thresholds.

See [`docs/INVENTORY_MATH.md`](docs/INVENTORY_MATH.md) for assumptions and implementation notes.

## Persistence model

FORGE VISION intentionally supports two persistence layers:

1. **Browser persistence** — inventory and movements survive reloads on the same browser/origin.
2. **Optional local workspace folder** — the user can link a directory containing:

```text
forge_inventory.csv
forge_movements.csv
forge_workspace.json
```

This makes it possible to continue using the application while keeping ordinary files that can be opened with spreadsheet software.

## FORGE AI

FORGE AI can answer questions such as:

- Which products are closest to stockout?
- What should be purchased first?
- How much capital is idle?
- Which SKUs belong to class A?
- What changes if demand rises by 20%?
- Which supplier concentrates the greatest operational risk?

The application first computes inventory context locally and then sends structured context to the language model when external AI mode is enabled.

### Security note

The current static portfolio build supports a direct Hugging Face Secret → browser → Groq integration because it was intentionally designed to remain a Static Space. This means the credential is **not hardcoded in this repository**, but client-side Static Space secrets are not a secure production secret boundary.

For a real paid/production deployment, FORGE AI should use a server-side gateway or application backend. This trade-off is documented explicitly in [`SECURITY.md`](SECURITY.md).

## Repository layout

```text
.
├── index.html                  # complete static production application
├── README.md                   # project overview
├── SECURITY.md                 # threat model and deployment trade-offs
├── docs/
│   ├── ARCHITECTURE.md         # system design
│   ├── INVENTORY_MATH.md       # formulas and assumptions
│   └── HUGGING_FACE_SETUP.md   # Static Space configuration
├── scripts/
│   └── validate_static.py      # structural / secret-leak validation
├── tests/
│   └── inventory_math.test.mjs # math specification regression tests
└── .github/workflows/ci.yml    # automated validation
```

## Engineering decisions

### Why local-first?

The project was built under a strict infrastructure constraint: it should remain useful on a free Static Space. Instead of treating that as a blocker, state, analytics and file persistence were moved into the browser.

### Why keep AI separate from the math?

Inventory recommendations should be reproducible. The language model is used as an explanation and interaction layer; deterministic application code remains responsible for stock levels, EOQ, ROP, coverage and related calculations.

### Why preserve CSV?

CSV remains interoperable with existing business workflows and spreadsheet software. FORGE VISION does not require an organization to abandon simple files before trying the application.

## Running locally

No build step is required for the production artifact.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

Some browser APIs such as direct folder access work best on Chromium-based browsers and secure contexts.

## Validation

GitHub Actions checks:

- inline JavaScript syntax;
- required application modules and DOM anchors;
- accidental Groq-key patterns in committed files;
- inventory-math specification tests.

## Status

**Active portfolio project.** The current repository represents the V3.3 FULL static architecture.

## Author

**Caio Henrique Vasconcelos**  
GitHub: [@CAIO-DOM-VASCONCELOS](https://github.com/CAIO-DOM-VASCONCELOS)  
Hugging Face: [@DOM-CREATOR](https://huggingface.co/DOM-CREATOR)
