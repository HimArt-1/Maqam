import { FC, useEffect, useState, useRef } from 'react';
import * as Tone from 'tone';
import { useMIDI } from '../hooks/useMIDI';
import PianoKeyboard from '../components/studio/PianoKeyboard';
import MusicWhiteboard from '../components/studio/MusicWhiteboard';
import { Volume2, VolumeX, Activity, AudioLines } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { midiNumberToNoteName } from '../lib/piano';

const Studio: FC = () => {
  const { currentNote, inputs, midiError } = useMIDI();
  const [activeNotes, setActiveNotes] = useState<string[]>([]);
  const activeNotesRef = useRef<string[]>([]);
  const [, setSynth] = useState<Tone.Sampler | null>(null);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [isLoadingInstrument, setIsLoadingInstrument] = useState(false);
  const synthRef = useRef<Tone.Sampler | null>(null);
  const { isLowSensory, isFocusMode } = useAccessibility();

  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.volume.value = isLowSensory ? -15 : 0;
    }
  }, [isLowSensory]);

  const startAudio = async () => {
    await Tone.start();
    setIsLoadingInstrument(true);
    
    // تحميل عينات بيانو حقيقية بدلاً من المولد الرقمي العادي
    const sampler = new Tone.Sampler({
      urls: {
        A0: "A0.mp3",
        C1: "C1.mp3",
        "D#1": "Ds1.mp3",
        "F#1": "Fs1.mp3",
        A1: "A1.mp3",
        C2: "C2.mp3",
        "D#2": "Ds2.mp3",
        "F#2": "Fs2.mp3",
        A2: "A2.mp3",
        C3: "C3.mp3",
        "D#3": "Ds3.mp3",
        "F#3": "Fs3.mp3",
        A3: "A3.mp3",
        C4: "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        A4: "A4.mp3",
        C5: "C5.mp3",
        "D#5": "Ds5.mp3",
        "F#5": "Fs5.mp3",
        A5: "A5.mp3",
        C6: "C6.mp3",
        "D#6": "Ds6.mp3",
        "F#6": "Fs6.mp3",
        A6: "A6.mp3",
        C7: "C7.mp3",
        "D#7": "Ds7.mp3",
        "F#7": "Fs7.mp3",
        A7: "A7.mp3",
        C8: "C8.mp3"
      },
      release: 1,
      baseUrl: "https://tonejs.github.io/audio/salamander/",
      onload: () => {
        setIsLoadingInstrument(false);
        setIsAudioReady(true);
      }
    }).toDestination();
    
    synthRef.current = sampler;
    setSynth(sampler);
  };

  const playNote = (note: string) => {
    if (!isAudioReady || !synthRef.current) return;
    if (activeNotesRef.current.includes(note)) return;
    try {
      synthRef.current.triggerAttack(note, Tone.now());
      activeNotesRef.current = [...activeNotesRef.current, note];
      setActiveNotes([...activeNotesRef.current]);
    } catch (err) {
      console.warn("Could not play note:", err);
    }
  };

  const releaseNote = (note: string) => {
    if (!isAudioReady || !synthRef.current) return;
    try {
      synthRef.current.triggerRelease(note, Tone.now());
    } catch (err) {
      console.warn("Could not release note:", err);
    }
    activeNotesRef.current = activeNotesRef.current.filter((n) => n !== note);
    setActiveNotes([...activeNotesRef.current]);
  };

  useEffect(() => {
    if (!currentNote) return;
    const parsedNote = midiNumberToNoteName(currentNote.note);
    if (currentNote.command === 144) {
      playNote(parsedNote);
    } else if (currentNote.command === 128) {
      releaseNote(parsedNote);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNote]);

  return (
    <div
      className={`min-h-screen py-12 transition-colors ${isFocusMode ? 'bg-white' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className={`flex flex-col gap-4 sm:gap-6 mb-8 md:mb-10 transition-opacity ${isFocusMode ? 'opacity-20 hover:opacity-100' : 'opacity-100'}`}>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-3">
              <AudioLines className="text-primary-600" />
              استوديو العزف المتقدم
            </h1>
            <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">تدرب على الإيقاع والأنغام، العب باستخدام كيبورد الكمبيوتر أو جهاز MIDI الخارجي.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className={`px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 border font-bold text-sm sm:text-base ${inputs.length > 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-200 text-slate-500 border-slate-300'}`}>
              <Activity size={18} />
              {inputs.length > 0 ? `متصل (${inputs.length} أجهزة MIDI)` : 'لا يوجد جهاز MIDI'}
            </div>
            {!isAudioReady && !isLoadingInstrument && (
              <button 
                onClick={startAudio}
                className="relative bg-gradient-to-l from-primary-600 to-primary-700 text-white px-6 py-3.5 sm:px-8 sm:py-4 w-full sm:w-auto rounded-2xl font-extrabold flex items-center justify-center gap-3 shadow-[0_10px_30px_-10px_rgba(20,184,166,0.6)] border-2 border-primary-400/50 text-base sm:text-lg transition-all hover:-translate-y-1 hover:shadow-[0_15px_40px_-10px_rgba(20,184,166,0.8)] active:translate-y-0 active:scale-95"
              >
                <span className="absolute inset-0 rounded-2xl border-2 border-primary-400/60 animate-ping" style={{ animationDuration: '2.5s' }}></span>
                <Volume2 size={24} className="animate-pulse drop-shadow-md text-primary-50" />
                <span className="drop-shadow-md tracking-wide">تفعيل البيانو</span>
              </button>
            )}
            {isLoadingInstrument && (
              <div className="bg-amber-50 text-amber-700 px-6 py-3 rounded-xl border border-amber-200 font-bold flex items-center justify-center gap-2 text-sm sm:text-base">
                <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                جاري تحميل الآلة...
              </div>
            )}
            {isAudioReady && (
              <div className="bg-primary-50 text-primary-700 px-6 py-3 rounded-xl border border-primary-200 font-bold flex items-center justify-center gap-2 text-sm sm:text-base">
                <Volume2 size={20} />
                البيانو مفعل
              </div>
            )}
          </div>
        </div>

        {midiError && (
          <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl flex items-center gap-3">
            <VolumeX size={20} />
            {midiError}
          </div>
        )}

        {/* The Whiteboard */}
        <MusicWhiteboard activeNotes={activeNotes} />

        {/* The Piano Keyboard */}
        <PianoKeyboard activeNotes={activeNotes} onPlayNote={playNote} onReleaseNote={releaseNote} />

        <div className="mt-8 space-y-2 text-center text-slate-500 text-sm bg-white p-4 rounded-2xl border border-slate-200 shadow-sm max-w-2xl mx-auto leading-relaxed">
          <p>
            فعّل الصوت أولاً. العزف بالماوس أو اللمس يعمل على كل مفتاح؛ دو الوسط (C4) يطابق <strong className="text-slate-700">MIDI 60</strong> كما في Tone.js والمعايير التعليمية الشائعة.
          </p>
          <p>
            اختصارات (QWERTY): C4–B4 بـ A W S E D F T G Y H U J؛ ثم C5–F5 بـ K O L P والفاصلة المنقوطة (E5) وعلامة النقل الفردية (F5) وزر ] (F#5). النطاق G5–B5 بـ Z X C V B. جهاز MIDI: رسائل Note On/Off على أي قناة (معيار الجهاز).
          </p>
        </div>
      </div>
    </div>
  );
};

export default Studio;
