# Inventory mathematics

This document describes the operational formulas used by FORGE VISION. They are decision-support calculations, not a substitute for company-specific inventory policy.

## Average daily demand

Outbound movement quantity is annualized over the observed time span.

```text
average_daily_demand = total_outbound_quantity / observed_days
```

A minimum observation window is used so a few recent events do not produce an unrealistically large daily rate.

## Safety stock

The current implementation estimates variability from outbound movement quantities and applies a service-level factor:

```text
safety_stock ≈ z × demand_sigma × sqrt(lead_time_days)
```

The default implementation uses a `z` value near 1.65.

## Reorder point

```text
ROP = average_daily_demand × lead_time_days + safety_stock
```

When current stock approaches or falls below ROP, replenishment becomes operationally relevant.

## Economic Order Quantity

```text
EOQ = sqrt((2 × D × S) / H)
```

Where:

- `D` = annualized demand;
- `S` = order/setup cost;
- `H` = annual holding cost per unit.

The application derives `H` from unit cost × holding-rate assumption.

## Coverage

```text
days_of_coverage = current_stock / average_daily_demand
```

Coverage is treated as effectively unbounded when observed demand is zero.

## Turnover

```text
turnover = annualized_demand / current_stock
```

This is an operationalized quantity-based turnover indicator rather than an accounting COGS/average-inventory ratio.

## ABC classification

Products are sorted by annual consumption value:

```text
annual_consumption_value = annualized_demand × unit_cost
```

The current thresholds are approximately:

- A: cumulative value up to 80%
- B: cumulative value from 80% to 95%
- C: remaining value

## Forecasting

The browser implementation aggregates outbound movements by month and fits a simple linear trend. It is intentionally lightweight, explainable and deterministic.

The forecasting module should be considered a baseline. A production deployment can replace it with exponential smoothing, intermittent-demand models or more advanced probabilistic forecasting after backtesting against real company data.
