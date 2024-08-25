export function isApproximatelyEqual(
  actual: number,
  expected: number,
  tolerance: number,
) {
  return Math.abs(actual - expected) <= tolerance;
}
