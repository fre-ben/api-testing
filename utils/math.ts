export function calculatePercentage(value: number, max: number): string {
  const result = Math.round((value / max) * 100);

  if (result > 100) {
    return "Invalid input";
  }

  return result + "%";
}
