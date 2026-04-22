import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export type PianoKeyData = {
  note: string;
  isBlack: boolean;
  keyboardKey?: string;
  solfege: string;
};

/** يطابق عرضًا ثابتًا للمفاتيح حتى لا يتأثر تخطيط البيانو باتجاه الصفحة RTL. */
const WHITE_KEY_BODY_PX = 56;
const WHITE_KEY_GAP_PX = 2;
/** المسافة بين مراكز مفتاحين أبيض متجاورين */
export const WHITE_KEY_STEP_PX = WHITE_KEY_BODY_PX + WHITE_KEY_GAP_PX;
const BLACK_KEY_WIDTH_PX = 34;
const BLACK_KEY_HALF = BLACK_KEY_WIDTH_PX / 2;

// أوكتافان: C4–B5 (دو الوسط حتى سي الأعلى في النطاق) — متوافق مع MIDI و Tone.js
const keys: PianoKeyData[] = [
  { note: 'C4', isBlack: false, keyboardKey: 'A', solfege: 'دو' },
  { note: 'C#4', isBlack: true, keyboardKey: 'W', solfege: 'دو#' },
  { note: 'D4', isBlack: false, keyboardKey: 'S', solfege: 'ري' },
  { note: 'D#4', isBlack: true, keyboardKey: 'E', solfege: 'ري#' },
  { note: 'E4', isBlack: false, keyboardKey: 'D', solfege: 'مي' },
  { note: 'F4', isBlack: false, keyboardKey: 'F', solfege: 'فا' },
  { note: 'F#4', isBlack: true, keyboardKey: 'T', solfege: 'فا#' },
  { note: 'G4', isBlack: false, keyboardKey: 'G', solfege: 'صول' },
  { note: 'G#4', isBlack: true, keyboardKey: 'Y', solfege: 'صول#' },
  { note: 'A4', isBlack: false, keyboardKey: 'H', solfege: 'لا' },
  { note: 'A#4', isBlack: true, keyboardKey: 'U', solfege: 'لا#' },
  { note: 'B4', isBlack: false, keyboardKey: 'J', solfege: 'سي' },

  { note: 'C5', isBlack: false, keyboardKey: 'K', solfege: 'دو' },
  { note: 'C#5', isBlack: true, keyboardKey: 'O', solfege: 'دو#' },
  { note: 'D5', isBlack: false, keyboardKey: 'L', solfege: 'ري' },
  { note: 'D#5', isBlack: true, keyboardKey: 'P', solfege: 'ري#' },
  { note: 'E5', isBlack: false, keyboardKey: ';', solfege: 'مي' },
  { note: 'F5', isBlack: false, keyboardKey: "'", solfege: 'فا' },
  { note: 'F#5', isBlack: true, keyboardKey: ']', solfege: 'فا#' },
  { note: 'G5', isBlack: false, keyboardKey: 'Z', solfege: 'صول' },
  { note: 'G#5', isBlack: true, keyboardKey: 'X', solfege: 'صول#' },
  { note: 'A5', isBlack: false, keyboardKey: 'C', solfege: 'لا' },
  { note: 'A#5', isBlack: true, keyboardKey: 'V', solfege: 'لا#' },
  { note: 'B5', isBlack: false, keyboardKey: 'B', solfege: 'سي' },
];

export const PIANO_KEY_NOTES = keys.map((k) => k.note);
export const PIANO_NOTE_SET = new Set(PIANO_KEY_NOTES);
const WHITE_KEY_COUNT = keys.filter((k) => !k.isBlack).length;
const PIANO_WIDTH_PX = WHITE_KEY_COUNT * WHITE_KEY_BODY_PX + (WHITE_KEY_COUNT - 1) * WHITE_KEY_GAP_PX;
const keysByComputerKey = new Map(keys.filter((k) => k.keyboardKey).map((k) => [k.keyboardKey, k]));

function blackKeyOffsetLeft(keyIndex: number): number {
  const whiteKeysBefore = keys.slice(0, keyIndex).filter((k) => !k.isBlack).length;
  /** المفتاح الأسود يتمركز فوق الفاصل بين المفتاحين الأبيضين السابق واللاحق. */
  const centerX = whiteKeysBefore * WHITE_KEY_STEP_PX - WHITE_KEY_GAP_PX / 2;
  return centerX - BLACK_KEY_HALF;
}

interface PianoKeyboardProps {
  activeNotes: string[];
  onPlayNote: (note: string) => void;
  onReleaseNote: (note: string) => void;
}

const PianoKeyboard: FC<PianoKeyboardProps> = ({ activeNotes, onPlayNote, onReleaseNote }) => {
  const [pointerDown, setPointerDown] = useState<Set<string>>(() => new Set());
  const pointerDownRef = useRef<Set<string>>(new Set());
  const pcKeyboardDownRef = useRef<Set<string>>(new Set());
  const onPlayNoteRef = useRef(onPlayNote);
  const onReleaseNoteRef = useRef(onReleaseNote);

  useEffect(() => {
    onPlayNoteRef.current = onPlayNote;
    onReleaseNoteRef.current = onReleaseNote;
  }, [onPlayNote, onReleaseNote]);

  const pressPointer = useCallback(
    (note: string) => {
      if (pointerDownRef.current.has(note)) return;
      pointerDownRef.current.add(note);
      setPointerDown(new Set(pointerDownRef.current));
      onPlayNote(note);
    },
    [onPlayNote]
  );

  const releasePointer = useCallback(
    (note: string) => {
      if (!pointerDownRef.current.has(note)) return;
      pointerDownRef.current.delete(note);
      setPointerDown(new Set(pointerDownRef.current));
      onReleaseNote(note);
    },
    [onReleaseNote]
  );

  useEffect(() => {
    const normKey = (e: KeyboardEvent) => {
      const k = e.key;
      if (k === ';' || k === '؛') return ';';
      if (k === "'" || k === '’' || k === '‘') return "'";
      if (k === ']' || k === '٤') return ']';
      return k.length === 1 ? k.toUpperCase() : k;
    };

    const releaseAllPcKeys = () => {
      pcKeyboardDownRef.current.forEach((note) => {
        onReleaseNoteRef.current(note);
      });
      pcKeyboardDownRef.current.clear();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
      const keyStr = normKey(e);
      const targetKey = keysByComputerKey.get(keyStr);
      if (!targetKey || pcKeyboardDownRef.current.has(targetKey.note)) return;
      pcKeyboardDownRef.current.add(targetKey.note);
      onPlayNoteRef.current(targetKey.note);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const keyStr = normKey(e);
      const targetKey = keysByComputerKey.get(keyStr);
      if (!targetKey) return;
      if (!pcKeyboardDownRef.current.has(targetKey.note)) return;
      pcKeyboardDownRef.current.delete(targetKey.note);
      onReleaseNoteRef.current(targetKey.note);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', releaseAllPcKeys);
    const onVis = () => {
      if (document.visibilityState === 'hidden') releaseAllPcKeys();
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', releaseAllPcKeys);
      document.removeEventListener('visibilitychange', onVis);
      releaseAllPcKeys();
    };
  }, []);

  const isLit = (note: string) => activeNotes.includes(note) || pointerDown.has(note);

  return (
    <div
      className="relative overflow-x-auto rounded-[1.75rem] border border-slate-800 bg-slate-950 p-4 shadow-2xl shadow-slate-950/30 sm:p-6"
      dir="ltr"
      role="group"
      aria-label="لوحة مفاتيح بيانو مرتبة من C4 يسارًا إلى B5 يمينًا"
    >
      <div
        className="relative mx-auto select-none touch-none rounded-t-2xl border-t border-slate-700 bg-gradient-to-b from-slate-800 to-slate-950 px-0 pt-5"
        style={{ width: PIANO_WIDTH_PX }}
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${WHITE_KEY_COUNT}, ${WHITE_KEY_BODY_PX}px)`,
            columnGap: WHITE_KEY_GAP_PX,
          }}
        >
          {keys.map((keyObj) => {
            if (keyObj.isBlack) return null;
            const pressed = isLit(keyObj.note);
            return (
              <motion.button
                key={keyObj.note}
                type="button"
                onPointerDown={(e) => {
                  e.preventDefault();
                  try {
                    e.currentTarget.setPointerCapture(e.pointerId);
                  } catch {
                    /* بعض المتصفحات/الأجهزة لا تدعم */
                  }
                  pressPointer(keyObj.note);
                }}
                onPointerUp={(e) => {
                  e.preventDefault();
                  releasePointer(keyObj.note);
                }}
                onPointerCancel={() => releasePointer(keyObj.note)}
                onLostPointerCapture={() => releasePointer(keyObj.note)}
                whileHover={{ y: -1 }}
                whileTap={{ y: 3 }}
                animate={{
                  y: pressed ? 3 : 0,
                  backgroundColor: pressed ? '#e1f5ea' : '#fffdf7',
                  boxShadow: pressed
                    ? 'inset 0 -18px 22px rgba(52,109,70,0.18), inset 0 0 0 2px rgba(70,139,93,0.35), 0 8px 18px rgba(0,0,0,0.22)'
                    : 'inset 0 -22px 24px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.9), 0 10px 20px rgba(0,0,0,0.22)',
                  transformOrigin: 'top',
                }}
                className="relative z-0 flex h-52 cursor-pointer flex-col items-center justify-end overflow-hidden rounded-b-xl border border-slate-300 bg-[#fffdf7] px-1 pb-3 text-center outline-none transition focus-visible:ring-4 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                aria-label={`${keyObj.solfege} ${keyObj.note}`}
              >
                {keyObj.keyboardKey && (
                  <span className="absolute top-3 rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-500 ring-1 ring-slate-200">
                    {keyObj.keyboardKey}
                  </span>
                )}
                <span className="text-base font-extrabold text-slate-800" dir="rtl">
                  {keyObj.solfege}
                </span>
                <span className="mt-1 font-mono text-[11px] font-bold text-slate-500">{keyObj.note}</span>
              </motion.button>
            );
          })}
        </div>

        {keys.map((keyObj, i) => {
          if (!keyObj.isBlack) return null;
          const pressed = isLit(keyObj.note);
          return (
            <motion.button
              key={keyObj.note}
              type="button"
              onPointerDown={(e) => {
                e.preventDefault();
                try {
                  e.currentTarget.setPointerCapture(e.pointerId);
                } catch {
                  /* */
                }
                pressPointer(keyObj.note);
              }}
              onPointerUp={(e) => {
                e.preventDefault();
                releasePointer(keyObj.note);
              }}
              onPointerCancel={() => releasePointer(keyObj.note)}
              onLostPointerCapture={() => releasePointer(keyObj.note)}
              whileHover={{ y: -1 }}
              whileTap={{ y: 4 }}
              animate={{
                y: pressed ? 4 : 0,
                backgroundColor: pressed ? '#346d46' : '#101827',
                boxShadow: pressed
                  ? 'inset 0 -12px 16px rgba(255,255,255,0.08), 0 0 0 1px rgba(155,200,169,0.55), 0 14px 22px rgba(14,30,21,0.45)'
                  : 'inset 0 -16px 18px rgba(255,255,255,0.06), 0 10px 18px rgba(0,0,0,0.5)',
                transformOrigin: 'top',
              }}
              className="absolute top-5 z-20 flex h-32 cursor-pointer flex-col items-center justify-between rounded-b-lg border-x border-b border-slate-950 bg-[#101827] px-1 pb-2 pt-2 text-center text-white outline-none transition focus-visible:ring-4 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              style={{
                width: BLACK_KEY_WIDTH_PX,
                left: `${blackKeyOffsetLeft(i)}px`,
              }}
              aria-label={`${keyObj.solfege} ${keyObj.note}`}
            >
              {keyObj.keyboardKey && (
                <span className="font-mono text-[10px] font-bold text-white/45">{keyObj.keyboardKey}</span>
              )}
              <span className="font-mono text-[10px] font-bold text-white/70">{keyObj.note}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default PianoKeyboard;
export { keys as PIANO_KEYS_LAYOUT };
