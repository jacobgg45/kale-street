// Local-only storage for the MVP. Nothing leaves the visitor's browser.

export function saveLocal<T>(key: string, entry: T) {
  try {
    const existing = JSON.parse(localStorage.getItem(key) ?? '[]') as T[]
    localStorage.setItem(key, JSON.stringify([...existing, entry]))
  } catch {
    // Private mode or blocked storage: the confirmation still shows.
  }
}
