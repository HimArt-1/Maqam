import { FC, useEffect, useState, useRef, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as Tone from 'tone';
import { motion, AnimatePresence } from 'framer-motion';
import { useMIDI } from '../hooks/useMIDI';
import PianoKeyboard from '../components/studio/PianoKeyboard';
import { curriculum } from '../data/curriculum';
import { markLessonComplete } from '../lib/lessonProgress';
import { midiNumberToNoteName } from '../lib/piano';
import { ChevronRight, CheckCircle, Volume2, Sparkles, Lightbulb, Target, BookOpen, UserCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAccessibility } from '../context/AccessibilityContext';

const Lesson: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentNote } = useMIDI();
  
  const lesson = useMemo(() => curriculum.find(l => l.id === id), [id]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeNotes, setActiveNotes] = useState<string[]>([]);
  const activeNotesRef = useRef<string[]>([]);
  const { isLowSensory, isFocusMode, isAnimationDisabled } = useAccessibility();
  
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const [isAudioReady, setIsAudioReady] = useState(false);
  
  // Initialize Tone
  useEffect(() => {
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sine' },
      envelope: { attack: 0.05, decay: 0.1, sustain: 0.3, release: 1 }
    }).toDestination();
    synthRef.current = synth;
    return () => {
      synth.dispose();
    };
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
    } catch (err) {
      console.warn(err);
    }
  };

  const releaseNote = (note: string) => {
    if (!isAudioReady || !synthRef.current) return;
    try {
      synthRef.current.triggerRelease(note, Tone.now());
    } catch (err) {
      console.warn(err);
    }
    activeNotesRef.current = activeNotesRef.current.filter((n) => n !== note);
    setActiveNotes([...activeNotesRef.current]);
  };

  const checkProgress = (notePlayed: string) => {
    // If lesson already completed, ignore logic
    if (isCompleted || !lesson) return;
    
    const target = lesson.steps[currentStepIndex].targetNote;
    if (notePlayed === target) {
      if (currentStepIndex + 1 < lesson.steps.length) {
        // Move to next step
        setCurrentStepIndex(prev => prev + 1);
      } else {
        // Finished Lesson
        setIsCompleted(true);
        if (!isAnimationDisabled) {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
      }
    }
  };

  // MIDI: نفس معيار Tone.js — MIDI 60 = C4
  useEffect(() => {
    if (!currentNote) return;
    const noteName = midiNumberToNoteName(currentNote.note);
    if (currentNote.command === 144) {
      playNote(noteName);
    } else if (currentNote.command === 128) {
      releaseNote(noteName);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNote]);

  useEffect(() => {
    if (synthRef.current && activeNotesRef.current.length > 0) {
      activeNotesRef.current.forEach((n) => {
        try {
          synthRef.current?.triggerRelease(n, Tone.now());
        } catch {
          /* */
        }
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
    return <div className="p-20 text-center text-xl">لم يتم العثور على الدرس المعني!</div>;
  }

  const currentStep = lesson.steps[currentStepIndex];
  const progressPercent = ((currentStepIndex) / lesson.steps.length) * 100;

  return (
    <div className={`min-h-screen py-10 transition-colors ${isFocusMode ? 'bg-white' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 max-w-5xl">
        <button 
          onClick={() => navigate('/activities')} 
          className={`flex items-center text-slate-500 hover:text-primary-600 font-bold mb-6 transition ${isFocusMode ? 'opacity-30 hover:opacity-100' : ''}`}
        >
          <ChevronRight size={20} /> العودة للأنشطة
        </button>

        {!isCompleted ? (
          <div className="card-modern relative mb-10 overflow-hidden p-8">
            {/* Progress Bar */}
            <div className={`absolute top-0 left-0 right-0 h-2 w-full ${isFocusMode ? 'bg-slate-50' : 'bg-slate-100'}`}>
              <motion.div 
                className={`h-full ${isFocusMode ? 'bg-primary-300' : 'bg-primary-500'}`}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
              ></motion.div>
            </div>
            
            <div className={`flex flex-col md:flex-row md:items-start justify-between gap-6 pt-4 transition-opacity ${isFocusMode ? 'opacity-20 hover:opacity-100' : 'opacity-100'}`}>
              <div className="flex-1">
                <span className="bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                  المستوى {lesson.level}
                </span>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">{lesson.title}</h1>
                <p className="text-slate-500">{lesson.description}</p>
              </div>

              {!isAudioReady && (
                <button onClick={startAudio} className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition shadow-lg shrink-0">
                  <Volume2 size={20} /> تفعيل وبدء الدرس
                </button>
              )}
            </div>

            <div className={`mt-8 space-y-4 text-right transition-opacity ${isFocusMode ? 'opacity-25 hover:opacity-100' : ''}`}>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                الوحدة: {lesson.unitTitle} · مدة مقترحة: {lesson.durationRange}
              </p>
              <div className="rounded-2xl border border-slate-100 bg-slate-50/90 p-5 md:p-6">
                <div className="mb-2 flex items-center gap-2 font-bold text-slate-800">
                  <Lightbulb className="shrink-0 text-amber-500" size={22} />
                  شرح مبسّط
                </div>
                <p className="text-slate-600 leading-relaxed text-lg">{lesson.inPlainWords}</p>
              </div>
              <div className="rounded-2xl border border-primary-100 bg-primary-50/60 p-5 md:p-6">
                <div className="mb-3 flex items-center gap-2 font-bold text-primary-900">
                  <Target className="shrink-0" size={22} />
                  أهداف الدرس
                </div>
                <ul className="space-y-2 text-slate-700 leading-relaxed">
                  {lesson.objectives.map((obj, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                      <span>{obj}</span>
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
                      className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-primary-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-primary-50"
                    >
                      <BookOpen size={14} />
                      {t.label}
                    </Link>
                  ))}
                </div>
              )}
              {lesson.educatorNote && (
                <details className="group rounded-2xl border border-slate-200 bg-white p-4 open:shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center gap-2 font-bold text-slate-700 [&::-webkit-details-marker]:hidden">
                    <UserCircle className="text-slate-400" size={20} />
                    للمعلّم أو ولي الأمر
                    <span className="mr-auto text-xs font-normal text-slate-400">اضغط للتوسيع</span>
                  </summary>
                  <p className="mt-3 border-t border-slate-100 pt-3 text-slate-600 leading-relaxed">{lesson.educatorNote}</p>
                </details>
              )}
            </div>

            {/* Instruction Card */}
            <div className={`mt-12 rounded-2xl p-8 text-center text-white border-4 transition-all ${isFocusMode ? 'bg-slate-800 border-slate-700 shadow-2xl scale-[1.02]' : 'bg-slate-900 border-slate-800'}`}>
              <div className="text-primary-400 font-bold text-sm tracking-wider uppercase mb-2">تعليمات الخطوة الحالية</div>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentStepIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-2xl font-bold leading-relaxed mb-6"
                >
                  {currentStep.instruction}
                </motion.div>
              </AnimatePresence>
              {currentStep.hint && (
                <p className="mt-4 max-w-2xl mx-auto text-base font-medium leading-relaxed text-primary-200/95">
                  تلميح: {currentStep.hint}
                </p>
              )}
              
              <div className="flex justify-center flex-wrap gap-2">
                <span className="bg-white/10 text-white border border-white/20 px-8 py-3 rounded-xl font-mono text-xl tracking-widest">
                  النوتة المطلوبة: <span className="text-primary-400 font-bold">{currentStep.targetNote}</span>
                </span>
              </div>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-emerald-50 rounded-3xl p-16 border border-emerald-100 text-center mb-10 shadow-lg"
          >
            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-xl shadow-emerald-500/30">
              <Sparkles size={40} />
            </div>
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">عمل رائع جداً!</h2>
            <p className="text-lg text-emerald-700 max-w-xl mx-auto mb-4">
              لقد أتممت بنجاح تمرين "{lesson.title}". استمر في هذا الأداء المبهر.
            </p>
            {lesson.takeaway && (
              <p className="text-base text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed border border-emerald-100 bg-white/80 rounded-2xl px-6 py-4">
                <span className="font-bold text-emerald-800">ماذا يبقى معك؟ </span>
                {lesson.takeaway}
              </p>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/activities')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-10 rounded-xl transition shadow-lg flex justify-center items-center gap-2"
              >
                <CheckCircle size={24} /> الرجوع لقائمة الأنشطة
              </button>
              {lesson.id === 'studio-prep' && (
                <button 
                  type="button"
                  onClick={() => navigate('/studio')}
                  className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 px-10 rounded-xl transition shadow-lg flex justify-center items-center gap-2 border border-slate-600"
                >
                  <Sparkles size={22} /> فتح الاستوديو الحر
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Studio Interactive Area (Piano Keyboard Only to save vertical space) */}
        <div className="opacity-95 transform transition-all duration-300 hover:opacity-100">
           <PianoKeyboard activeNotes={activeNotes} onPlayNote={playNote} onReleaseNote={releaseNote} />
        </div>
      </div>
    </div>
  );
};

export default Lesson;
