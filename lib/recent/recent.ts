const storageKey = "utils-index:recent";
const maxEntries = 8;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

export function subscribeRecent(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function recentSnapshot() {
  return JSON.stringify(readRecent());
}

export function recentServerSnapshot() {
  return "[]";
}

export type RecentEntry = {
  id: string;
  openedAt: string;
};

export function readRecent(): RecentEntry[] {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.flatMap((entry) => {
      if (
        typeof entry !== "object" ||
        entry === null ||
        !("id" in entry) ||
        !("openedAt" in entry) ||
        typeof entry.id !== "string" ||
        typeof entry.openedAt !== "string"
      ) {
        return [];
      }
      return [{ id: entry.id, openedAt: entry.openedAt }];
    });
  } catch {
    return [];
  }
}

export function rememberUtility(id: string) {
  const next = [
    { id, openedAt: new Date().toISOString() },
    ...readRecent().filter((entry) => entry.id !== id),
  ].slice(0, maxEntries);
  localStorage.setItem(storageKey, JSON.stringify(next));
  emit();
  return next;
}
