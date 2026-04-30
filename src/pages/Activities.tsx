import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Sparkles, CheckCircle2, CircleDot, BookOpen, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { curriculum, curriculumUnitsMeta } from '../data/curriculum';
import { clearLessonProgress, getCompletedLessonIds } from '../lib/lessonProgress';

const Activities: FC = () => {
  const lessonCount = curriculum.length;
  const [completed, setCompleted] = useState(() => getCompletedLessonIds());

  const refreshCompleted = useCallback(() => {
    setCompleted(getCompletedLessonIds());
  }, []);

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
  const nextLesson = useMemo(
    () => curriculum.find((l) => !completed.has(l.id)),
    [completed]
  );
  const progressPct = lessonCount > 0 ? Math.round((doneCount / lessonCount) * 100) : 0;

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
    if (typeof window !== 'undefined' && window.confirm('مسح تقدمك المحفوظ على هذا الجهاز؟ يمكنك البدء من جديد لاحقاً.')) {
      clearLessonProgress();
    }
  };

  return (
    <div className="activities-page min-h-screen min-h-[100dvh] scroll-mt-[5.5rem] py-8 sm:py-12 md:py-16 relative overflow-hidden bg-gradient-to-b from-primary-50/50 to-white pb-[max(2rem,env(safe-area-inset-bottom))]">
      {/* Fun Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-[5%] w-32 h-32 bg-primary-200/40 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-60 right-[10%] w-40 h-40 bg-teal-200/40 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-40 left-[20%] w-48 h-48 bg-blue-200/40 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="container mx-auto w-full px-3 sm:px-4 max-w-5xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-20 max-w-3xl mx-auto px-2">
          <span className="inline-block py-2 px-6 rounded-full bg-white text-primary-600 text-base font-bold mb-6 shadow-sm border border-primary-100">
            ألعاب وتدريبات تفاعلية 🎧
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-slate-800 leading-tight drop-shadow-sm">
            هيا نتدرب <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-600 to-teal-400">ونمرح!</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed bg-white/50 backdrop-blur-sm py-4 px-6 rounded-3xl border border-white/80 shadow-sm inline-block">
            اختر لعبتك ودرسك المفضل وابدأ التحدي. المنصة ستساعدك وتصحح لك خطوة بخطوة.
          </p>
        </div>

        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {curriculumUnitsMeta.map((u) => (
            <div key={u.index} className="bg-white rounded-[2rem] p-6 text-right shadow-xl border-4 border-transparent hover:border-primary-300 transition-all hover:-translate-y-2 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary-50 rounded-full -z-10 transition-transform group-hover:scale-150" />
              <p className="text-sm font-black text-primary-500 mb-2">الوحدة {u.index}</p>
              <h3 className="text-xl font-bold text-slate-800 leading-snug mb-3">{u.title.replace(/^[^:]+:\s*/, '')}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{u.summary}</p>
            </div>
          ))}
        </div>

        <div id="progress" className="card-modern mb-12 p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4 text-right">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                <CircleDot size={28} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">تقدمك على هذا الجهاز</h2>
                <p className="mt-1 text-slate-600 leading-relaxed">
                  يُحفظ الإنجاز تلقائياً في المتصفح ({doneCount} من {lessonCount} درساً — {progressPct}٪).
                </p>
                {nextLesson ? (
                  <Link
                    to={`/lesson/${nextLesson.id}`}
                    className="mt-4 inline-flex items-center gap-2 font-bold text-primary-600 hover:text-primary-700"
                  >
                    <BookOpen size={18} /> متابعة: {nextLesson.title}
                    <ArrowLeft size={18} />
                  </Link>
                ) : (
                  <p className="mt-4 font-bold text-emerald-700">أحسنت! أكملت جميع الدروس المتاحة.</p>
                )}
              </div>
            </div>
            <div className="w-full md:max-w-xs">
              <div className="mb-2 flex justify-between text-xs font-bold text-slate-500">
                <span>0</span>
                <span>{progressPct}٪</span>
                <span>100</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-primary-500 transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <button
                type="button"
                onClick={handleClearProgress}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                <RotateCcw size={16} /> إعادة تعيين التقدم
              </button>
            </div>
          </div>
        </div>

        <div id="lessons" className="space-y-14">
          {lessonsByUnit.map((group) => (
            <section key={group.unitTitle} className="space-y-4">
              <div className="rounded-2xl border border-primary-200/50 bg-primary-50/50 px-6 py-4 text-right shadow-sm backdrop-blur-sm">
                <h2 className="text-lg font-extrabold text-primary-900 md:text-xl">{group.unitTitle}</h2>
                <p className="mt-1 text-sm text-slate-600">
                  {curriculumUnitsMeta.find((m) => m.index === group.unitIndex)?.summary}
                </p>
              </div>
              <div className="space-y-6">
                {group.lessons.map((lesson) => {
                  const isDone = completed.has(lesson.id);
                  const idx = curriculum.findIndex((l) => l.id === lesson.id) + 1;
                  return (
                    <div
                      key={lesson.id}
                      className={`group flex flex-col items-center gap-5 sm:gap-6 md:gap-8 rounded-[2.5rem] border-4 p-5 sm:p-6 md:p-8 lg:p-10 shadow-lg backdrop-blur-sm transition-all hover:shadow-2xl ${
                        isDone
                          ? 'border-emerald-100 bg-white hover:border-emerald-300'
                          : 'border-white bg-white/80 hover:border-primary-300 hover:-translate-y-1'
                      } md:flex-row relative overflow-hidden`}
                    >
                      {isDone && <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10" />}
                      <div
                        className={`w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-[2rem] flex items-center justify-center font-black text-3xl sm:text-4xl shadow-inner border-4 rotate-3 group-hover:rotate-6 transition-transform ${isDone ? 'bg-emerald-400 text-white border-emerald-200' : 'bg-primary-400 text-white border-primary-200'}`}
                      >
                        {isDone ? <CheckCircle2 size={40} strokeWidth={3} /> : idx}
                      </div>

                      <div className="flex-1 text-center md:text-right">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 mb-2">
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{lesson.title}</h3>
                          <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full">
                            المستوى {lesson.level}
                          </span>
                          <span className="bg-slate-50 text-slate-500 text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full">
                            {lesson.durationRange}
                          </span>
                          {isDone && (
                            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full">
                              مكتمل
                            </span>
                          )}
                        </div>
                        <p className="text-slate-500 leading-relaxed text-sm sm:text-base mb-4 md:mb-3">{lesson.description}</p>
                        <p className="text-sm text-slate-600 leading-relaxed hidden md:block border-t border-slate-100 pt-3 mt-3">
                          <span className="font-bold text-slate-700">باختصار: </span>
                          {lesson.inPlainWords}
                        </p>
                      </div>

                      <div className="w-full md:w-auto shrink-0">
                        <Link
                          to={`/lesson/${lesson.id}`}
                          className={`w-full md:w-auto flex items-center justify-center gap-3 font-black py-4 sm:py-5 px-6 sm:px-8 rounded-2xl transition-all shadow-md text-base sm:text-lg ${
                            isDone 
                              ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                              : 'bg-primary-500 hover:bg-primary-600 text-white shadow-primary-500/40 hover:-translate-y-1 hover:shadow-lg'
                          }`}
                        >
                          {isDone ? 'إعادة اللعب' : 'ابدأ اللعب'} <ArrowLeft size={24} strokeWidth={3} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 bg-slate-900 rounded-[2rem] p-10 text-center text-white relative overflow-hidden">
             <div className="absolute opacity-5 right-0 top-0 w-full h-full">
               <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                 <defs>
                   <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                     <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                   </pattern>
                 </defs>
                 <rect width="100%" height="100%" fill="url(#grid)" />
               </svg>
             </div>
             <div className="relative z-10 max-w-2xl mx-auto space-y-6">
               <h3 className="text-2xl font-bold mb-2">بعد إنهاء المسار</h3>
               <p className="text-slate-400 leading-relaxed">
                 يضم المسار اليوم <strong className="text-white">{lessonCount} درساً</strong> في ست وحدات (من التأسيس حتى المغامرات اللحنية ثم الاستوديو الحر)، مع شرح مبسّط وأهداف لكل درس. نُحدّث المحتوى باستمرار.
               </p>
               <Link
                 to="/studio"
                 className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-400 text-white font-bold py-4 px-8 rounded-xl transition shadow-lg shadow-primary-900/40"
               >
                 <Sparkles size={22} /> جرّب الاستوديو الحر
               </Link>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
