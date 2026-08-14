import test from 'node:test';
import assert from 'node:assert/strict';

const reorderPoint = (dailyDemand, leadDays, safetyStock) =>
  dailyDemand * leadDays + safetyStock;

const eoq = (annualDemand, orderCost, unitCost, holdingRate) => {
  const H = Math.max(0.01, unitCost * holdingRate);
  return Math.sqrt((2 * annualDemand * orderCost) / H);
};

const coverage = (stock, dailyDemand) => dailyDemand > 0 ? stock / dailyDemand : Infinity;

function abcClasses(items) {
  const sorted = [...items].sort((a, b) => b.value - a.value);
  const total = sorted.reduce((sum, x) => sum + x.value, 0) || 1;
  let cumulative = 0;
  return Object.fromEntries(sorted.map(item => {
    cumulative += item.value;
    const ratio = cumulative / total;
    return [item.sku, ratio <= 0.80 ? 'A' : ratio <= 0.95 ? 'B' : 'C'];
  }));
}

test('reorder point combines lead-time demand and safety stock', () => {
  assert.equal(reorderPoint(10, 5, 20), 70);
});

test('EOQ follows sqrt(2DS/H)', () => {
  const value = eoq(3650, 50, 20, 0.25);
  const expected = Math.sqrt((2 * 3650 * 50) / 5);
  assert.ok(Math.abs(value - expected) < 1e-9);
});

test('coverage reports days until stockout at current average demand', () => {
  assert.equal(coverage(100, 5), 20);
  assert.equal(coverage(100, 0), Infinity);
});

test('ABC classification respects cumulative consumption value', () => {
  const result = abcClasses([
    { sku: 'A1', value: 70 },
    { sku: 'B1', value: 20 },
    { sku: 'C1', value: 10 },
  ]);
  assert.equal(result.A1, 'A');
  assert.equal(result.B1, 'B');
  assert.equal(result.C1, 'C');
});
