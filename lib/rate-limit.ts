// Best-effort per-process guard. Serverless instances do not share this state.
// Use a shared store or hosting firewall for deployment-wide abuse protection.
let windowStart = 0;
let count = 0;
const WINDOW_MS = 60_000;
const LIMIT = 20;

export function takeRequestSlot(now = Date.now()): number {
  if (now - windowStart >= WINDOW_MS) {
    windowStart = now;
    count = 0;
  }
  if (count >= LIMIT)
    return Math.max(1, Math.ceil((windowStart + WINDOW_MS - now) / 1000));
  count++;
  return 0;
}
