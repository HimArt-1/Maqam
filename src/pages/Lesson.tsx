import { FC, useEffect, useState, useRef, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as Tone from 'tone';
import { motion, AnimatePresence } from 'framer-motion';
import { useMIDI } from '../hooks/useMIDI';
import PianoKeyboard from '../components/studio/PianoKeyboard';
import { curriculum } from '../data/curriculum';
import { markLessonComplete } from '../lib/lessonProgress';
import { midiNumberToNoteName } from '../lib/piano';
import {
  ChevronRight, CheckCircle, Volume2, Sparkles, Lightbulb,
  Target, BookOpen, UserCircle, Music,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAccessibility } from '../context/AccessibilityContext';

// خريطة أسماء النغمات بالعربية
const NOTE_TO_AR: Record<string, string> = {
  C: 'دو', 'C#': 'دو#', D: 'ري', 'D#': 'ري#',
  E: 'مي', F: 'فا', 'F#': 'فا#', G: 'صول',
  'G#': 'صول#', A: 'لا', 'A#': 'لا#', B: 'سي',
};
function noteToArabic(note: string): string {
  const m = note.match(/^([A-G]#?)/);
  return m ? (NOTE_TO_AR[m[1]] ?? note) : note;
}

const Lesson: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentNote } = useMIDI();

  const lesson = useMemo(() => curriculum.find((l) => l.id === id), [id]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeNotes, setActiveNotes] = useState<string[]>([]);
  const activeNotesRef = useRef<string[]>([]);
  const { isLowSensory, isFocusMode, isAnimationDisabled } = useAccessibility();

  const synthRef = useRef<Tone.PolySynth | null>(null);
  const [isAudioReady, setIsAudioReady] = useState(false);

  useEffect(() => {
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sine' },
      envelope: { attack: 0.05, decay: 0.1, sustain: 0.3, release: 1 },
    }).toDestination();
    synthRef.current = synth;
    return () => { synth.dispose(); };
  }, []);

  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.volume.value = isLowSensory ? -15 : 0;
    }
  }, [isLowSensory]);

  const startAudio = async () => {
    await Tone.start();
    setIsAudioReady(true);
  };

  const playNote = (note: string) => {
    if (!isAudioReady || !synthRef.current) return;
    if (activeNotesRef.current.includes(note)) return;
    try {
      synthRef.current.triggerAttack(note, Tone.now());
      activeNotesRef.current = [...activeNotesRef.current, note];
      setActiveNotes([...activeNotesRef.current]);
      checkProgress(note);
    } catch (err) { console.warn(err); }
  };

  const releaseNote = (note: string) => {
    if (!isAudioReady || !synthRef.current) return;
    try { synthRef.current.triggerRelease(note, Tone.now()); } catch (err) { console.warn(err); }
    activeNotesRef.current = activeNotesRef.current.filter((n) => n !== note);
    setActiveNotes([...activeNotesRef.current]);
  };

  const checkProgress = (notePlayed: string) => {
    if (isCompleted || !lesson) return;
    const target = lesson.steps[currentStepIndex].targetNote;
    if (notePlayed === target) {
      if (currentStepIndex + 1 < lesson.steps.length) {
        setCurrentStepIndex((prev) => prev + 1);
      } else {
        setIsCompleted(true);
        if (!isAnimationDisabled) {
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.55 } });
        }
      }
    }
  };

  useEffect(() => {
    if (!currentNote) return;
    const noteName = midiNumberToNoteName(currentNote.note);
    if (currentNote.command === 144) playNote(noteName);
    else if (currentNote.command === 128) releaseNote(noteName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNote]);

  useEffect(() => {
    if (synthRef.current && activeNotesRef.current.length > 0) {
      activeNotesRef.current.forEach((n) => {
        try { synthRef.current?.triggerRelease(n, Tone.now()); } catch { /* */ }
      });
    }
    setCurrentStepIndex(0);
    setIsCompleted(false);
    activeNotesRef.current = [];
    setActiveNotes([]);
  }, [id]);

  useEffect(() => {
    if (!isCompleted || !lesson) return;
    markLessonComplete(lesson.id);
  }, [isCompleted, lesson]);

  if (!lesson) {
    return (
      <div className="p-20 text-center text-xl text-slate-500">
        لم يتم العثور على الدرس المطلوب
      </div>
    );
  }

  const currentStep = lesson.steps[currentStepIndex];
  const progressPercent = (currentStepIndex / lesson.steps.length) * 100;
  const targetForPiano = isCompleted ? undefined : currentStep.targetNote;

  return (
    <div
      id="lesson-top"
      className={`lesson-page min-h-screen min-h-[100dvh] scroll-mt-[5.5rem] py-6 sm:py-10 pb-[max(1.5rem,env(safe-area-inset-bottom))] transition-colors ${isFocusMode ? 'bg-white' : 'bg-transparent'}`}
    >
      <div className="container mx-auto w-full px-3 sm:px-4 max-w-5xl">

        {/* ——— شريط التنقل العلوي ——— */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/activities')}
            className={`flex items-center gap-1 text-slate-500 hover:text-primary-600 font-bold transition ${isFocusMode ? 'opacity-30 hover:opacity-100' : ''}`}
          >
            <ChevronRight size={20} /> العودة للأنشطة
          </button>

          {/* نقاط التقدم */}
          {!isCompleted && (
            <div className="flex items-center gap-1.5" aria-label={`الخطوة ${currentStepIndex + 1} من ${lesson.steps.length}`}>
              {lesson.steps.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: i === currentStepIndex ? 24 : 8,
                    backgroundColor:
                      i < currentStepIndex
                        ? '#10b981'
                        : i === currentStepIndex
                          ? '#0ea5e9'
                          : '#e2e8f0',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="h-2 rounded-full"
                />
              ))}
            </div>
          )}
        </div>

        {/* ——— حالة اكتمال الدرس ——— */}
        {isCompleted ? (
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 18, stiffness: 220 }}
            className="mb-8 overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50/60 to-white p-8 sm:p-12 text-center shadow-xl shadow-emerald-100"
          >
            {/* أيقونة الإنجاز */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 14, stiffness: 280, delay: 0.1 }}
              className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-xl shadow-emerald-500/30"
            >
              <Sparkles size={44} className="text-white" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="text-3xl sm:text-4xl font-black text-emerald-900 mb-3"
            >
              أحسنت! عمل رائع ✨
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-lg text-emerald-700 max-w-xl mx-auto mb-4"
            >
              أكملت بنجاح تمرين &ldquo;{lesson.title}&rdquo; بكل {lesson.steps.length} خطوات.
            </motion.p>

            {lesson.takeaway && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="mx-auto mb-8 max-w-xl rounded-2xl border border-emerald-100 bg-white/80 px-6 py-4 text-slate-600 leading-relaxed shadow-sm"
              >
                <span className="font-bold text-emerald-800">ماذا يبقى معك؟ </span>
                {lesson.takeaway}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={() => navigate('/activities')}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-10 rounded-2xl transition shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
                style={{ willChange: 'transform' }}
              >
                <CheckCircle size={22} /> قائمة الأنشطة
              </button>
              {lesson.id === 'studio-prep' && (
                <button
                  type="button"
                  onClick={() => navigate('/studio')}
                  className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 px-10 rounded-2xl transition shadow-lg border border-slate-600"
                >
                  <Sparkles size={20} /> الاستوديو الحر
                </button>
              )}
            </motion.div>
          </motion.div>
        ) : (
          <>
            {/* ——— بطاقة الخطوة الحالية ——— */}
            <div
              className={`relative mb-6 overflow-hidden rounded-3xl border-2 shadow-2xl ${
                isFocusMode
                  ? 'border-slate-700 bg-slate-800'
                  : 'border-slate-700/80 bg-gradient-to-b from-slate-900 to-slate-950 shadow-slate-900/40'
              }`}
            >
              {/* شريط التقدم العلوي */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-slate-800">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-l from-primary-400 to-emerald-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                />
              </div>

              <div className="px-6 pt-8 pb-6 sm:px-8 sm:pt-10 sm:pb-8 text-center">

                {/* زر تفعيل الصوت */}
                {!isAudioReady && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8"
                  >
                    <button
                      onClick={startAudio}
                      className="relative w-full max-w-sm mx-auto bg-gradient-to-l from-emerald-500 via-emerald-600 to-teal-600 text-white px-6 py-5 rounded-2xl font-extrabold flex items-center justify-center gap-3 shadow-[0_12px_40px_-8px_rgba(16,185,129,0.55)] border-2 border-emerald-300/30 text-lg transition-all hover:-translate-y-1 hover:shadow-[0_18px_50px_-8px_rgba(16,185,129,0.75)]"
                      style={{ willChange: 'transform' }}
                    >
                      <span className="absolute inset-0 rounded-2xl border-4 border-emerald-400/40 animate-ping" style={{ animationDuration: '2s' }} />
                      <Volume2 size={26} className="animate-pulse text-emerald-100" />
                      <span>تفعيل وبدء الدرس</span>
                    </button>
                    <p className="mt-3 text-center text-sm text-slate-500">اضغط لتفعيل الصوت والبدء في التمرين التفاعلي</p>
                  </motion.div>
                )}

                {/* اسم الوحدة */}
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-400/80 mb-6">
                  {lesson.unitTitle}
                </p>

                {/* اسم النغمة المستهدفة — الحجم الأبرز */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStepIndex}
                    initial={{ opacity: 0, scale: 0.65, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.08, y: -20 }}
                    transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                    className="mb-6"
                  >
                    {/* الاسم العربي الكبير */}
                    <div
                      className="font-black leading-none mb-1"
                      style={{ fontSize: 'clamp(4rem, 14vw, 7rem)' }}
                    >
                      <span className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 to-emerald-500">
                        {noteToArabic(currentStep.targetNote)}
                      </span>
                    </div>
                    {/* اسم النغمة بالترميز الإنجليزي */}
                    <div className="font-mono text-base sm:text-lg font-bold text-primary-300/70 tracking-widest">
                      {currentStep.targetNote}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* تعليمات الخطوة */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`inst-${currentStepIndex}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-lg sm:text-xl font-bold text-white/90 mb-4 leading-relaxed"
                  >
                    {currentStep.instruction}
                  </motion.p>
                </AnimatePresence>

                {/* التلميح */}
                {currentStep.hint && (
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`hint-${currentStepIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="max-w-2xl mx-auto text-sm sm:text-base font-medium leading-relaxed text-primary-200/90 bg-white/5 rounded-2xl px-5 py-3 border border-white/8"
                    >
                      💡 {currentStep.hint}
                    </motion.p>
                  </AnimatePresence>
                )}
              </div>

              {/* معلومات الدرس في الأسفل */}
              <div className={`border-t border-slate-800 px-6 py-5 sm:px-8 transition-opacity ${isFocusMode ? 'opacity-20 hover:opacity-100' : 'opacity-100'}`}>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="bg-primary-900/60 text-primary-300 text-xs font-bold px-3 py-1.5 rounded-full border border-primary-700/40">
                    المستوى {lesson.level}
                  </span>
                  <span className="bg-slate-800 text-slate-400 text-xs font-bold px-3 py-1.5 rounded-full border border-slate-700">
                    {lesson.durationRange}
                  </span>
                  <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-800/40">
                    خطوة {currentStepIndex + 1} / {lesson.steps.length}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white mb-1.5">{lesson.title}</h1>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">{lesson.description}</p>
              </div>
            </div>

            {/* ——— تفاصيل الدرس (قابل للطي) ——— */}
            <details
              className={`mb-6 group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm ${isFocusMode ? 'opacity-20 hover:opacity-100' : ''}`}
            >
              <summary className="flex cursor-pointer items-center gap-3 px-5 py-4 font-bold text-slate-700 select-none [&::-webkit-details-marker]:hidden hover:bg-slate-50 transition">
                <Music size={18} className="text-primary-500 shrink-0" />
                تفاصيل الدرس وأهدافه
                <span className="mr-auto text-xs font-normal text-slate-400 group-open:hidden">اضغط للتوسيع</span>
                <span className="mr-auto text-xs font-normal text-slate-400 hidden group-open:block">اضغط للطي</span>
              </summary>

              <div className="px-5 pb-5 pt-2 space-y-4 border-t border-slate-100">
                <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4 sm:p-5">
                  <div className="mb-2 flex items-center gap-2 font-bold text-amber-800 text-sm">
                    <Lightbulb size={18} className="text-amber-500 shrink-0" />
                    شرح مبسّط
                  </div>
                  <p className="text-slate-700 leading-relaxed">{lesson.inPlainWords}</p>
                </div>

                <div className="rounded-2xl border border-primary-100 bg-primary-50/60 p-4 sm:p-5">
                  <div className="mb-3 flex items-center gap-2 font-bold text-primary-800 text-sm">
                    <Target size={18} className="text-primary-500 shrink-0" />
                    أهداف الدرس
                  </div>
                  <ul className="space-y-2 text-slate-700">
                    {lesson.objectives.map((obj, i) => (
                      <li key={i} className="flex gap-3 leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>

                {lesson.relatedTheory && lesson.relatedTheory.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-slate-500">مراجعة نظرية:</span>
                    {lesson.relatedTheory.map((t) => (
                      <Link
                        key={t.hash}
                        to={`/resources#${t.hash}`}
                        className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-primary-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-primary-50 hover:ring-primary-200"
                      >
                        <BookOpen size={13} />
                        {t.label}
                      </Link>
                    ))}
                  </div>
                )}

                {lesson.educatorNote && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 font-bold text-slate-600 text-sm mb-2">
                      <UserCircle size={18} className="text-slate-400" />
                      للمعلّم أو ولي الأمر
                    </div>
                    <p className="text-slate-600 leading-relaxed text-sm">{lesson.educatorNote}</p>
                  </div>
                )}
              </div>
            </details>
          </>
        )}

        {/* ——— البيانو دائماً ظاهر ——— */}
        <div className="transition-all duration-300 hover:opacity-100 opacity-95">
          <PianoKeyboard
            activeNotes={activeNotes}
            onPlayNote={playNote}
            onReleaseNote={releaseNote}
            targetNote={targetForPiano}
          />
        </div>
      </div>
    </div>
  );
};

export default Lesson;
