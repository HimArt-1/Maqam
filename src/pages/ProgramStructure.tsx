import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Network, Star, Zap, CodeSquare, Headphones, Award, ArrowLeft, Library } from 'lucide-react';
import { curriculum, curriculumUnitsMeta } from '../data/curriculum';

const programSteps = [
  {
    title: "المرحلة الأولى: الأساسيات والاستكشاف",
    icon: Star,
    color: "from-blue-500 to-sky-400",
    description: "تبدأ رحلتك بالتعرف على لوحة المفاتيح. نعلمك أين تقع نغمات السلم الأوسط، وكيف تُميز بين النغمات البيضاء والسوداء عبر واجهة بصرية ملونة تتفاعل معك.",
    outcomes: ["معرفة أسماء النغمات الأساسية", "تطوير التآزر العضلي للتحكم بالأصابع", "التعود على أصوات البيانو الغربية"]
  },
  {
    title: "المرحلة الثانية: الإيقاع والقفز الحر",
    icon: Zap,
    color: "from-amber-500 to-orange-400",
    description: "بعد التأسيس، ننتقل إلى التفاعل اللحني. يطلب منك المنهج عزف نغمات متفرقة لتدريب عقلك على القفز السريع بين المفاتيح دون النظر المستمر للشاشة.",
    outcomes: ["زيادة سرعة الاستجابة", "ربط الصوت بموقع المفتاح", "تأسيس الذاكرة العضلية"]
  },
  {
    title: "المرحلة الثالثة: السلالم والتآلفات (Chords)",
    icon: Network,
    color: "from-emerald-500 to-teal-400",
    description: "هنا يبدأ العمق الموسيقي. ستتعلم عزف أكثر من نغمة في نفس الوقت لتوليد (التآلف/الكورد)، وهو أساس صناعة الألحان والمشاعر في أي موسيقى.",
    outcomes: ["عزف التآلفات الأساسية (الكوردات)", "معرفة أبعاد السلم الكبير (Major)", "القدرة على قراءة النغمات المركبة"]
  },
  {
    title: "المرحلة الرابعة: عزف المقطوعات الكلاسيكية",
    icon: Headphones,
    color: "from-purple-500 to-indigo-400",
    description: "تتويجاً لجهدك، ستُطبق كل ما تعلمته لعزف أجزاء من سيمفونيات ومقطوعات عالمية (مثل نشيد الفرح لبيتهوفن)، والمذهل أن المنصة ستصحح لك كل نغمة تعزفها آنياً.",
    outcomes: ["عزف لحن كامل من الذاكرة والشاشة", "الاستمتاع بحس الإنجاز الفني", "الاستعداد الكامل للبيانو الحقيقي"]
  },
  {
    title: "مرحلة الاحتراف: الاستوديو التفاعلي",
    icon: CodeSquare,
    color: "from-rose-500 to-pink-400",
    description: "وداعاً للدروس الموجهة! الآن مساحتك الحرة. قم بربط أورج خارجي (MIDI) وابدأ بتأليف مقطوعاتك الخاصة بينما تقوم المنصة برسم نوتاتك على السبورة فوراً.",
    outcomes: ["احتراف العزف الحر", "كتابة النوتات بالنظر", "تأليف ألحان إبداعية"]
  }
];

const ProgramStructure: FC = () => {
  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="text-center mb-20">
          <span className="inline-block py-1.5 px-5 rounded-full bg-slate-200 text-slate-800 text-sm font-bold mb-4 shadow-sm border border-slate-300">
            خريطة الطريق المنهجية 🗺️
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900">هيكل التدريب والمستويات</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            صُمم المنهج التدريبي في مقام بعناية ليتدرج معك من الصفر المطلق إلى الاحتراف والارتجال الحر؛ ويتضمن مساراً تفاعلياً كاملاً من التدفئة على المفاتيح حتى لحن نشيد الفرح وتمهيد للاستوديو الحر.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/activities#lessons"
              className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-bold text-white shadow-lg shadow-primary-600/25 transition hover:bg-primary-700"
            >
              <Library size={20} />
              المسار التفاعلي ({curriculum.length} درساً)
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>

        <div className="mb-20 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-2 text-center text-2xl font-extrabold text-slate-900">الوحدات التعليمية في المسار التفاعلي</h2>
          <p className="mx-auto mb-8 max-w-2xl text-center text-slate-600 leading-relaxed">
            كل وحدة تضم عدة دروس؛ داخل كل درس ستجد شرحاً مبسّطاً، أهدافاً واضحة، تلميحات للخطوات، وروابط لمراجعة نظرية من المكتبة عند الحاجة.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {curriculumUnitsMeta.map((u) => (
              <div key={u.index} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 text-right">
                <p className="text-xs font-bold text-primary-600">الوحدة {u.index}</p>
                <h3 className="mt-1 font-bold text-slate-900">{u.title.replace(/^[^:]+:\s*/, '')}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{u.summary}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Central Line for absolute continuum */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-slate-200 transform -translate-x-1/2 rounded-full z-0"></div>

          <div className="space-y-12 md:space-y-24 relative z-10">
            {programSteps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                  
                  {/* Content Box */}
                  <div className={`flex-1 w-full bg-white p-8 rounded-3xl shadow-lg border border-slate-100 relative ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                     <div className={`md:hidden w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg mb-6 flex items-center justify-center text-white`}>
                        <step.icon size={28} />
                     </div>
                     <span className="text-sm font-bold text-slate-400 mb-2 block uppercase tracking-wider">
                       مستوى {idx + 1}
                     </span>
                     <h3 className="text-2xl font-bold text-slate-800 mb-4">{step.title}</h3>
                     <p className="text-slate-600 leading-relaxed mb-6">
                       {step.description}
                     </p>
                     
                     <div className={`bg-slate-50 p-4 rounded-2xl border border-slate-100 ${!isEven && 'text-right'}`}>
                        <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2 justify-start">
                          <Award size={18} className="text-amber-500" />
                          المخرجات التعليمية:
                        </h4>
                        <ul className="space-y-2">
                           {step.outcomes.map((outcome, oIdx) => (
                             <li key={oIdx} className="text-slate-600 text-sm flex items-center gap-2">
                               <div className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0"></div>
                               {outcome}
                             </li>
                           ))}
                        </ul>
                     </div>
                  </div>

                  {/* Marker (Center Icon) */}
                  <div className={`hidden md:flex w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} shadow-xl items-center justify-center text-white shrink-0 z-10 transform transition hover:scale-110 hover:rotate-6 cursor-default border-4 border-slate-50`} style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}>
                    <step.icon size={32} />
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block flex-1"></div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProgramStructure;
