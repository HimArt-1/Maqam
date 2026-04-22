/**
 * تحويلات موحّدة للبيانو الرقمي:
 * - MIDI 60 = دو الوسط = C4 (نفس اتفاقية Tone.js ومعظم البرامج التعليمية).
 * - أسماء النغمات بالعلامات المرفوعة (#) لتطابق Web MIDI وواجهة الدروس.
 */

export const PITCH_NAMES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;

/** MIDI note number → "C4", "D#5", … */
export function midiNumberToNoteName(midi: number): string {
  const n = Math.max(0, Math.min(127, Math.floor(midi)));
  const octave = Math.floor(n / 12) - 1;
  const name = PITCH_NAMES_SHARP[n % 12];
  return `${name}${octave}`;
}

/** "C4" | "F#4" → MIDI number؛ غير صالح يعيد null */
export function noteNameToMidiNumber(note: string): number | null {
  const m = note.trim().match(/^([A-Ga-g])(#|b)?(\d+)$/);
  if (!m) return null;
  const letter = m[1].toUpperCase();
  const acc = m[2];
  const octave = parseInt(m[3], 10);
  const base: Record<string, number> = {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    B: 11,
  };
  let pc = base[letter];
  if (pc === undefined) return null;
  if (acc === '#') pc += 1;
  if (acc === 'b') pc -= 1;
  pc = ((pc % 12) + 12) % 12;
  const midi = (octave + 1) * 12 + pc;
  if (midi < 0 || midi > 127) return null;
  return midi;
}

/** يطابق اسم نغمة من الجهاز (مثل Db4) مع مفتاح الواجهة (C#4) عبر MIDI */
export function normalizeNoteNameForKeyboard(note: string, validNames: Set<string>): string | null {
  const midi = noteNameToMidiNumber(note.replace('♯', '#').replace('♭', 'b'));
  if (midi === null) return null;
  const canonical = midiNumberToNoteName(midi);
  if (validNames.has(canonical)) return canonical;
  return null;
}
