export type HistoryMessage = { role: "user" | "assistant"; text: string };
export type Source = {
  source: string;
  title: string;
  passages: { id: string; heading: string; text: string }[];
};
export const MAX_HISTORY = 6;

export function parseHistory(value: unknown): HistoryMessage[] | null {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.length > MAX_HISTORY) return null;
  const history: HistoryMessage[] = [];
  for (const item of value) {
    if (
      !item ||
      typeof item !== "object" ||
      (item.role !== "user" && item.role !== "assistant") ||
      typeof item.text !== "string" ||
      !item.text.trim() ||
      item.text.length > (item.role === "user" ? 500 : 2000)
    )
      return null;
    history.push({ role: item.role, text: item.text.trim() });
  }
  return history;
}
