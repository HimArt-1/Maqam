const STORAGE_KEY = 'maqam-completed-lessons';

export function getCompletedLessonIds(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as unknown;
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter((x): x is string => typeof x === 'string'));
  } catch {
    return new Set();
  }
}

export function markLessonComplete(id: string): void {
  const next = getCompletedLessonIds();
  next.add(id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
  window.dispatchEvent(new Event('maqam-progress'));
}

export function clearLessonProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('maqam-progress'));
}
