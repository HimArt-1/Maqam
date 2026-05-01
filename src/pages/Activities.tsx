import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Sparkles, CheckCircle2, CircleDot, BookOpen, RotateCcw, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { curriculum, curriculumUnitsMeta } from '../data/curriculum';
import { clearLessonProgress, getCompletedLessonIds } from '../lib/lessonProgress';

// ألوان الوحدات
const UNIT_PALETTE = [
  { from: 'from-emerald-500', to: 'to-teal-500', light: 'bg-emerald-50', text: 'text-emerald-700', border: 'hover:border-emerald-300', badge: 'bg-emerald-500', ring: 'ring-emerald-200', emoji: '🎹' },
  { from: 'from-sky-500', to: 'to-blue-500',     light: 'bg-sky-50',     text: 'text-sky-700',     border: 'hover:border-sky-300',     badge: 'bg-sky-500',     ring: 'ring-sky-200',     emoji: '🎵' },
  { from: 'from-violet-500', to: 'to-purple-500', light: 'bg-violet-50',  text: 'text-violet-700',  border: 'hover:border-violet-300',  badge: 'bg-violet-500',  ring: 'ring-violet-200',  emoji: '🎼' },
  { from: 'from-amber-500',  to: 'to-orange-500', light: 'bg-amber-50',   text: 'text-amber-700',   border: 'hover:border-amber-300',   badge: 'bg-amber-500',   ring: 'ring-amber-200',   emoji: '🎸' },
  { from: 'from-rose-500',   to: 'to-pink-500',   light: 'bg-rose-50',    text: 'text-rose-700',    border: 'hover:border-rose-300',    badge: 'bg-rose-500',    ring: 'ring-rose-200',    emoji: '🥁' },
  { from: 'from-teal-500',   to: 'to-cyan-500',   light: 'bg-teal-50',    text: 'text-teal-700',    border: 'hover:border-teal-300',    badge: 'bg-teal-500',    ring: 'ring-teal-200',    emoji: '🎶' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.3, duration: 0.65 } },
};

// شعاع SVG للتقدم الدائري
const RADIUS = 42;
const CIRC = 2 * Math.PI * RADIUS;

const Activities: FC = () => {
  const lessonCount = curriculum.length;
  const [completed, setCompleted] = useState(() => getCompletedLessonIds());

  const refreshCompleted = useCallback(() => setCompleted(getCompletedLessonIds()), []);

  useEffect(() => {
    refreshCompleted();
    const onProgress = () => refreshCompleted();
    window.addEventListener('maqam-progress', onProgress);
    window.addEventListener('focus', onProgress);
    return () => {
      window.removeEventListener('maqam-progress', onProgress);
      window.removeEventListener('focus', onProgress);
    };
  }, [refreshCompleted]);

  const doneCount = useMemo(() => curriculum.filter((l) => completed.has(l.id)).length, [completed]);
  const nextLesson = useMemo(() => curriculum.find((l) => !completed.has(l.id)), [completed]);
  const progressPct = lessonCount > 0 ? Math.round((doneCount / lessonCount) * 100) : 0;
  const strokeDash = CIRC * (1 - progressPct / 100);

  const lessonsByUnit = useMemo(() => {
    const groups: { unitTitle: string; unitIndex: number; lessons: typeof curriculum }[] = [];
    for (const lesson of curriculum) {
      const last = groups[groups.length - 1];
      if (!last || last.unitTitle !== lesson.unitTitle) {
        groups.push({ unitTitle: lesson.unitTitle, unitIndex: lesson.unitIndex, lessons: [lesson] });
      } else {
        last.lessons.push(lesson);
      }
    }
    return groups;
  }, []);

  const handleClearProgress = () => {
    if (window.confirm('مسح تقدمك المحفوظ على هذا الجهاز؟ يمكنك البدء من جديد لاحقاً.')) {
      clearLessonProgress();
    }
  };

  return (
    <div className="activities-page min-h-screen min-h-[100dvh] py-8 sm:py-12 md:py-16 relative overflow-hidden bg-gradient-to-b from-primary-50/40 to-white pb-[max(2rem,env(safe-area-inset-bottom))]">
      {/* خلفية محيطية */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute top-20 left-[5%] w-40 h-40 bg-primary-200/30 rounded-full blur-3xl" style={{ animation: 'pulse 6s ease-in-out infinite' }} />
        <div className="absolute top-72 right-[8%] w-56 h-56 bg-teal-200/25 rounded-full blur-3xl" style={{ animation: 'pulse 8s ease-in-out 2s infinite' }} />
        <div className="absolute bottom-48 left-[18%] w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" style={{ animation: 'pulse 7s ease-in-out 1s infinite' }} />
      </div>

      <div className="container mx-auto w-full px-3 sm:px-4 max-w-5xl relative z-10">

        {/* ——— رأس الصفحة ——— */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16 max-w-3xl mx-auto px-2"
        >
          <span className="inline-block py-2 px-6 rounded-full bg-white text-primary-600 text-sm font-bold mb-5 shadow-sm border border-primary-100">
            ألعاب وتدريبات تفاعلية 🎧
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-5 text-slate-800 leading-tight drop-shadow-sm">
            هيا نتدرب{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-600 to-teal-400">ونمرح!</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed bg-white/60 backdrop-blur-sm py-3 px-6 rounded-3xl border border-white/80 shadow-sm inline-block">
            اختر درسك المفضل وابدأ التحدي. المنصة ستصحح لك خطوة بخطوة.
          </p>
        </motion.div>

        {/* ——— بطاقات الوحدات ——— */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {curriculumUnitsMeta.map((u, idx) => {
            const pal = UNIT_PALETTE[idx % UNIT_PALETTE.length];
            const unitLessons = curriculum.filter((l) => l.unitIndex === u.index);
            const unitDone = unitLessons.filter((l) => completed.has(l.id)).length;
            return (
              <motion.div
                key={u.index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={cardVariants}
              >
                <div className={`group relative bg-white rounded-[1.75rem] overflow-hidden shadow-lg border-2 border-transparent ${pal.border} transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl`} style={{ willChange: 'transform' }}>
                  {/* شريط اللون العلوي */}
                  <div className={`h-2.5 bg-gradient-to-l ${pal.from} ${pal.to}`} />
                  <div className="p-5 text-right">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-2xl" role="img">{pal.emoji}</div>
                      <div>
                        <p className={`text-xs font-black ${pal.text} mb-0.5`}>الوحدة {u.index}</p>
                        <p className="text-[11px] text-slate-400 font-medium">{unitDone}/{unitLessons.length} مكتملة</p>
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-slate-800 leading-snug mb-2">{u.title.replace(/^[^:]+:\s*/, '')}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{u.summary}</p>
                    {/* شريط تقدم الوحدة */}
                    <div className="mt-4 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-l ${pal.from} ${pal.to} transition-all duration-700`}
                        style={{ width: unitLessons.length > 0 ? `${(unitDone / unitLessons.length) * 100}%` : '0%' }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ——— قسم التقدم ——— */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="progress"
          className="card-modern mb-12 p-6 sm:p-8"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
            {/* تقدم دائري */}
            <div className="flex flex-col items-center shrink-0 mx-auto md:mx-0">
              <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden>
                <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="#e2e8f0" strokeWidth="8" />
                <motion.circle
                  cx="60" cy="60" r={RADIUS}
                  fill="none"
                  stroke="url(#progressGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  initial={{ strokeDashoffset: CIRC }}
                  animate={{ strokeDashoffset: strokeDash }}
                  transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                  transform="rotate(-90 60 60)"
                />
                <defs>
                  <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                <text x="60" y="56" textAnchor="middle" fill="#1e293b" fontSize="20" fontWeight="800" fontFamily="Tajawal">
                  {progressPct}٪
                </text>
                <text x="60" y="72" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="600" fontFamily="Tajawal">
                  {doneCount}/{lessonCount}
                </text>
              </svg>
              <p className="text-xs font-bold text-slate-500 mt-1">تقدمك الكلي</p>
            </div>

            {/* معلومات التقدم */}
            <div className="flex-1 text-center md:text-right">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <CircleDot size={24} />
                </div>
                <h2 className="text-lg font-bold text-slate-900">تقدمك على هذا الجهاز</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                يُحفظ الإنجاز تلقائياً في المتصفح — أكملت{' '}
                <strong className="text-primary-600">{doneCount}</strong> من{' '}
                <strong>{lessonCount}</strong> درساً.
              </p>

              {nextLesson ? (
                <Link
                  to={`/lesson/${nextLesson.id}`}
                  className="inline-flex items-center gap-2 font-bold text-white bg-primary-500 hover:bg-primary-600 px-5 py-2.5 rounded-xl transition shadow-md shadow-primary-500/25 hover:-translate-y-0.5"
                  style={{ willChange: 'transform' }}
                >
                  <BookOpen size={17} />
                  متابعة: {nextLesson.title}
                  <ArrowLeft size={17} />
                </Link>
              ) : (
                <p className="inline-block font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl">
                  🎉 أحسنت! أكملت جميع الدروس المتاحة.
                </p>
              )}

              <button
                type="button"
                onClick={handleClearProgress}
                className="mt-4 flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition"
              >
                <RotateCcw size={15} /> إعادة تعيين التقدم
              </button>
            </div>
          </div>
        </motion.div>

        {/* ——— قائمة الدروس مجمّعة بالوحدات ——— */}
        <div id="lessons" className="space-y-12">
          {lessonsByUnit.map((group, groupIdx) => {
            const pal = UNIT_PALETTE[groupIdx % UNIT_PALETTE.length];
            return (
              <section key={group.unitTitle} className="space-y-4">
                {/* رأس الوحدة */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-30px' }}
                  variants={cardVariants}
                  className={`flex items-center gap-3 rounded-2xl border px-5 py-3.5 text-right shadow-sm ${pal.light} border-transparent ring-1 ${pal.ring}`}
                >
                  <span className="text-2xl shrink-0" role="img">{pal.emoji}</span>
                  <div>
                    <h2 className={`text-base font-extrabold ${pal.text}`}>{group.unitTitle}</h2>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {curriculumUnitsMeta.find((m) => m.index === group.unitIndex)?.summary}
                    </p>
                  </div>
                </motion.div>

                {/* دروس الوحدة */}
                <div className="space-y-4">
                  {group.lessons.map((lesson, lessonIdx) => {
                    const isDone = completed.has(lesson.id);
                    const idx = curriculum.findIndex((l) => l.id === lesson.id) + 1;
                    return (
                      <motion.div
                        key={lesson.id}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-20px' }}
                        custom={lessonIdx}
                        variants={{
                          hidden: { opacity: 0, x: 24 },
                          visible: {
                            opacity: 1, x: 0,
                            transition: { type: 'spring', bounce: 0.28, delay: lessonIdx * 0.06 },
                          },
                        }}
                      >
                        <div
                          className={`group flex flex-col items-center gap-4 sm:gap-5 md:gap-6 rounded-[2rem] border-2 p-4 sm:p-5 md:p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-xl relative overflow-hidden md:flex-row ${
                            isDone
                              ? 'border-emerald-100 bg-white hover:border-emerald-300'
                              : `border-white bg-white/90 hover:border-current hover:-translate-y-0.5 ${pal.border}`
                          }`}
                          style={{ willChange: 'transform' }}
                        >
                          {isDone && (
                            <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-50 rounded-bl-full -z-10 pointer-events-none" />
                          )}

                          {/* رقم الدرس أو علامة الإنجاز */}
                          <div
                            className={`w-16 h-16 sm:w-18 sm:h-18 shrink-0 rounded-2xl flex items-center justify-center font-black text-2xl sm:text-3xl shadow-inner border-2 rotate-2 group-hover:rotate-4 transition-transform duration-300 ${
                              isDone
                                ? 'bg-emerald-400 text-white border-emerald-200'
                                : `bg-gradient-to-br ${pal.from} ${pal.to} text-white border-white/30`
                            }`}
                          >
                            {isDone ? <CheckCircle2 size={32} strokeWidth={2.5} /> : idx}
                          </div>

                          {/* محتوى الدرس */}
                          <div className="flex-1 text-center md:text-right">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2 mb-1.5">
                              <h3 className="text-lg sm:text-xl font-bold text-slate-900">{lesson.title}</h3>
                              <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">
                                م{lesson.level}
                              </span>
                              <span className="bg-slate-50 text-slate-500 text-xs font-medium px-2 py-0.5 rounded-full">
                                {lesson.durationRange}
                              </span>
                              {isDone && (
                                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
                                  ✓ مكتمل
                                </span>
                              )}
                            </div>
                            <p className="text-slate-500 leading-relaxed text-sm mb-2">{lesson.description}</p>
                            <p className="hidden md:block text-xs text-slate-400 leading-relaxed border-t border-slate-100 pt-2 mt-2">
                              {lesson.inPlainWords}
                            </p>
                          </div>

                          {/* زر البدء */}
                          <div className="w-full md:w-auto shrink-0">
                            <Link
                              to={`/lesson/${lesson.id}`}
                              className={`w-full md:w-auto flex items-center justify-center gap-2 font-black py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl transition-all shadow-md text-sm sm:text-base ${
                                isDone
                                  ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                                  : `bg-gradient-to-l ${pal.from} ${pal.to} text-white hover:-translate-y-0.5 hover:shadow-lg shadow-black/10`
                              }`}
                              style={{ willChange: 'transform' }}
                            >
                              {isDone ? 'إعادة اللعب' : 'ابدأ اللعب'}
                              <ChevronLeft size={20} strokeWidth={3} />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* ——— قسم ما بعد الإنهاء ——— */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 bg-slate-900 rounded-[2rem] p-8 sm:p-10 text-center text-white relative overflow-hidden"
        >
          <div className="absolute opacity-[0.04] right-0 top-0 w-full h-full pointer-events-none" aria-hidden>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h3 className="text-2xl sm:text-3xl font-bold">بعد إنهاء المسار</h3>
            <p className="text-slate-400 leading-relaxed">
              يضم المسار اليوم{' '}
              <strong className="text-white">{lessonCount} درساً</strong>{' '}
              في ست وحدات — من التأسيس حتى المغامرات اللحنية والاستوديو الحر. نُحدّث المحتوى باستمرار.
            </p>
            <Link
              to="/studio"
              className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-400 text-white font-bold py-4 px-8 rounded-xl transition shadow-lg shadow-primary-900/40 hover:-translate-y-0.5"
              style={{ willChange: 'transform' }}
            >
              <Sparkles size={20} /> جرّب الاستوديو الحر
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Activities;
