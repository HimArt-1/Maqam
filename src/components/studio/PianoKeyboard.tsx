import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export type PianoKeyData = {
  note: string;
  isBlack: boolean;
  keyboardKey?: string;
  solfege: string;
};

const WHITE_KEY_BODY_PX = 58;
const WHITE_KEY_GAP_PX = 2;
export const WHITE_KEY_STEP_PX = WHITE_KEY_BODY_PX + WHITE_KEY_GAP_PX;
const BLACK_KEY_WIDTH_PX = 36;
const BLACK_KEY_HALF = BLACK_KEY_WIDTH_PX / 2;

// أوكتافان: C4–B5
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
  const centerX = whiteKeysBefore * WHITE_KEY_STEP_PX - WHITE_KEY_GAP_PX / 2;
  return centerX - BLACK_KEY_HALF;
}

interface PianoKeyboardProps {
  activeNotes: string[];
  onPlayNote: (note: string) => void;
  onReleaseNote: (note: string) => void;
  /** النغمة المستهدفة في الدرس الحالي — تُضيء بتوهج أخضر */
  targetNote?: string;
}

const PianoKeyboard: FC<PianoKeyboardProps> = ({ activeNotes, onPlayNote, onReleaseNote, targetNote }) => {
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
      if (k === "'" || k === '‘' || k === '’') return "'";
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
      className="relative overflow-x-auto rounded-[1.75rem] border border-slate-800 bg-slate-950 p-4 shadow-2xl shadow-slate-950/40 sm:p-6"
      dir="ltr"
      role="group"
      aria-label="لوحة مفاتيح بيانو مرتبة من C4 يسارًا إلى B5 يمينًا"
    >
      {/* تلميح لوحة المفاتيح */}
      {targetNote && (
        <div className="mb-3 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium" dir="rtl">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>المفتاح الأخضر هو النغمة المطلوبة</span>
        </div>
      )}

      <div
        className="relative mx-auto select-none touch-none rounded-t-2xl border-t border-slate-700 bg-gradient-to-b from-slate-800 to-slate-950 px-0 pt-5"
        style={{ width: PIANO_WIDTH_PX }}
      >
        {/* المفاتيح البيضاء */}
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
            const isTarget = keyObj.note === targetNote;
            return (
              <motion.button
                key={keyObj.note}
                type="button"
                onPointerDown={(e) => {
                  e.preventDefault();
                  try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* */ }
                  pressPointer(keyObj.note);
                }}
                onPointerUp={(e) => { e.preventDefault(); releasePointer(keyObj.note); }}
                onPointerCancel={() => releasePointer(keyObj.note)}
                onLostPointerCapture={() => releasePointer(keyObj.note)}
                whileHover={{ y: -1 }}
                whileTap={{ y: 3 }}
                animate={{
                  y: pressed ? 3 : 0,
                  backgroundColor: pressed
                    ? '#bae6fd'
                    : isTarget
                      ? '#ecfdf5'
                      : '#fffdf7',
                  boxShadow: pressed
                    ? 'inset 0 -18px 22px rgba(56,189,248,0.22), inset 0 0 0 2px rgba(14,165,233,0.4), 0 8px 18px rgba(0,0,0,0.25)'
                    : isTarget
                      ? 'inset 0 -22px 24px rgba(16,185,129,0.12), inset 0 1px 0 rgba(255,255,255,0.95), 0 0 0 2px rgba(16,185,129,0.5), 0 10px 22px rgba(0,0,0,0.22)'
                      : 'inset 0 -22px 24px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.9), 0 10px 20px rgba(0,0,0,0.22)',
                  transformOrigin: 'top',
                }}
                transition={{ type: 'spring', stiffness: 600, damping: 30 }}
                className="relative z-0 flex h-52 cursor-pointer flex-col items-center justify-end overflow-hidden rounded-b-xl border border-slate-300 px-1 pb-3 text-center outline-none focus-visible:ring-4 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                aria-label={`${keyObj.solfege} ${keyObj.note}`}
              >
                {/* هالة التوهج للمفتاح المستهدف */}
                {isTarget && !pressed && (
                  <motion.div
                    className="pointer-events-none absolute inset-0 rounded-b-xl z-[1]"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.15, ease: 'easeInOut' }}
                    style={{
                      background: 'linear-gradient(to bottom, rgba(16,185,129,0.08) 0%, rgba(16,185,129,0.18) 100%)',
                      boxShadow: 'inset 0 0 0 2.5px rgba(16,185,129,0.7)',
                    }}
                  />
                )}

                {keyObj.keyboardKey && (
                  <span className={`absolute top-3 rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold ring-1 z-10 ${
                    isTarget
                      ? 'bg-emerald-100 text-emerald-700 ring-emerald-300'
                      : 'bg-slate-100 text-slate-500 ring-slate-200'
                  }`}>
                    {keyObj.keyboardKey}
                  </span>
                )}

                {/* علامة النغمة المستهدفة */}
                {isTarget && (
                  <motion.div
                    className="absolute bottom-14 text-emerald-600 z-10 font-black text-base"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                  >
                    ▼
                  </motion.div>
                )}

                <span className={`relative z-10 text-base font-extrabold ${isTarget ? 'text-emerald-700' : 'text-slate-800'}`} dir="rtl">
                  {keyObj.solfege}
                </span>
                <span className={`mt-1 font-mono text-[11px] font-bold z-10 ${isTarget ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {keyObj.note}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* المفاتيح السوداء */}
        {keys.map((keyObj, i) => {
          if (!keyObj.isBlack) return null;
          const pressed = isLit(keyObj.note);
          const isTarget = keyObj.note === targetNote;
          return (
            <motion.button
              key={keyObj.note}
              type="button"
              onPointerDown={(e) => {
                e.preventDefault();
                try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* */ }
                pressPointer(keyObj.note);
              }}
              onPointerUp={(e) => { e.preventDefault(); releasePointer(keyObj.note); }}
              onPointerCancel={() => releasePointer(keyObj.note)}
              onLostPointerCapture={() => releasePointer(keyObj.note)}
              whileHover={{ y: -1 }}
              whileTap={{ y: 4 }}
              animate={{
                y: pressed ? 4 : 0,
                backgroundColor: pressed
                  ? '#f59e0b'
                  : isTarget
                    ? '#064e3b'
                    : '#1e293b',
                boxShadow: pressed
                  ? 'inset 0 -12px 16px rgba(255,255,255,0.15), 0 0 0 1px rgba(251,191,36,0.55), 0 14px 22px rgba(146,64,14,0.45)'
                  : isTarget
                    ? 'inset 0 -16px 18px rgba(255,255,255,0.08), 0 0 0 2px rgba(16,185,129,0.7), 0 0 16px rgba(16,185,129,0.4), 0 10px 18px rgba(0,0,0,0.5)'
                    : 'inset 0 -16px 18px rgba(255,255,255,0.06), 0 10px 18px rgba(0,0,0,0.5)',
                transformOrigin: 'top',
              }}
              transition={{ type: 'spring', stiffness: 600, damping: 30 }}
              className="absolute top-5 z-20 flex h-32 cursor-pointer flex-col items-center justify-between rounded-b-lg border-x border-b border-slate-900 px-1 pb-2 pt-2 text-center text-white outline-none focus-visible:ring-4 focus-visible:ring-secondary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 overflow-hidden"
              style={{
                width: BLACK_KEY_WIDTH_PX,
                left: `${blackKeyOffsetLeft(i)}px`,
              }}
              aria-label={`${keyObj.solfege} ${keyObj.note}`}
            >
              {/* هالة التوهج للمفتاح الأسود المستهدف */}
              {isTarget && !pressed && (
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-b-lg"
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1.15, ease: 'easeInOut' }}
                  style={{ background: 'rgba(16,185,129,0.22)' }}
                />
              )}
              {keyObj.keyboardKey && (
                <span className={`relative z-10 font-mono text-[10px] font-bold ${isTarget ? 'text-emerald-300' : 'text-white/45'}`}>
                  {keyObj.keyboardKey}
                </span>
              )}
              <span className={`relative z-10 font-mono text-[10px] font-bold ${isTarget ? 'text-emerald-300' : 'text-white/70'}`}>
                {keyObj.note}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default PianoKeyboard;
export { keys as PIANO_KEYS_LAYOUT };
