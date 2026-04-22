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
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-4 rounded-full bg-secondary-100 text-secondary-800 text-sm font-bold mb-4">
            التدريب التفاعلي 🎧
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">مسار التعلم العملي</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            منهج متدرّج في ست وحدات: شرح مبسّط في كل درس، أهداف واضحة، وروابط للمرجع النظري عند الحاجة. اختر الدرس وابدأ — المنصة تصحح خطوة بخطوة.
          </p>
        </div>

        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {curriculumUnitsMeta.map((u) => (
            <div key={u.index} className="card-modern p-5 text-right">
              <p className="text-xs font-bold text-primary-600">الوحدة {u.index}</p>
              <h3 className="mt-1 font-bold text-slate-900 leading-snug">{u.title.replace(/^[^:]+:\s*/, '')}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{u.summary}</p>
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
                      className={`group flex flex-col items-center gap-8 rounded-[2rem] border p-8 shadow-sm backdrop-blur-sm transition-all hover:shadow-xl md:flex-row md:p-10 ${
                        isDone
                          ? 'border-emerald-200/80 bg-white/85'
                          : 'border-white/70 bg-white/75 hover:border-primary-200/60'
                      }`}
                    >
                      <div
                        className={`w-20 h-20 shrink-0 rounded-2xl flex items-center justify-center font-bold text-3xl shadow-inner border ${isDone ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-primary-50 text-primary-600 border-primary-100'}`}
                      >
                        {isDone ? <CheckCircle2 size={40} strokeWidth={2.25} /> : idx}
                      </div>

                      <div className="flex-1 text-center md:text-right">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-slate-900">{lesson.title}</h3>
                          <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">
                            المستوى {lesson.level}
                          </span>
                          <span className="bg-slate-50 text-slate-500 text-xs font-bold px-3 py-1 rounded-full">
                            {lesson.durationRange}
                          </span>
                          {isDone && (
                            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                              مكتمل
                            </span>
                          )}
                        </div>
                        <p className="text-slate-500 leading-relaxed mb-3 md:mb-0">{lesson.description}</p>
                        <p className="text-sm text-slate-600 leading-relaxed hidden md:block border-t border-slate-100 pt-3 mt-3">
                          <span className="font-bold text-slate-700">باختصار: </span>
                          {lesson.inPlainWords}
                        </p>
                      </div>

                      <div className="shrink-0">
                        <Link
                          to={`/lesson/${lesson.id}`}
                          className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-xl transition flex items-center gap-3 shadow-lg shadow-primary-600/30 group-hover:-translate-x-2"
                        >
                          {isDone ? 'إعادة الدرس' : 'بدء الدرس'} <ArrowLeft size={20} />
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
