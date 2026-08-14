# Architecture

## Goals

FORGE VISION was designed around four constraints:

1. Run as a Hugging Face Static Space.
2. Keep inventory useful without a permanent backend.
3. Preserve interoperability with CSV/spreadsheet workflows.
4. Keep operational calculations deterministic even when an LLM is used.

## Components

### Inventory state

Products and movements form the source operational state. Browser persistence is automatic on the same origin.

### Analytics engine

Derives inventory value, potential margin, idle capital, stockout risk, coverage, turnover and ABC classification from current state and movement history.

### Replenishment engine

Calculates average demand, safety stock, reorder point, EOQ and suggested purchase quantities.

### Forecast engine

Aggregates outbound movements by period and applies a simple trend model to estimate future demand. The implementation deliberately favors transparency and low compute cost over opaque model complexity.

### Local workspace

When the browser supports File System Access API and the user grants permission, FORGE can synchronize inventory with ordinary local files:

- `forge_inventory.csv`
- `forge_movements.csv`
- `forge_workspace.json`

The directory handle can be remembered through IndexedDB where browser support permits it.

### FORGE AI

FORGE AI receives structured application context rather than raw uncontrolled prose. The application remains responsible for numeric calculations; the LLM provides natural-language interpretation and prioritization.

## Failure modes

- Missing AI key → local analytics mode remains available.
- Unsupported file-system API → browser persistence and manual import/export remain available.
- Invalid CSV → records are validated before affecting state.
- Browser storage cleared → disk workspace or manual JSON backup can restore state if available.

## Production evolution

A multi-user enterprise deployment would add:

- authenticated backend;
- central transactional database;
- tenant isolation;
- role-based access control;
- immutable audit log;
- server-side AI gateway;
- concurrency/conflict handling;
- automated backups;
- observability and alerting.
