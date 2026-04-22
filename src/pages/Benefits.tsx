import { FC } from 'react';
import { Activity, BrainCircuit, HeartHandshake, Smile, Waves, Sparkles } from 'lucide-react';

const benefitsList = [
  {
    title: "التطور العقلي والذاكرة",
    icon: BrainCircuit,
    image: "/benefit_cognitive.png",
    color: "from-blue-500 to-indigo-500",
    description: "أثبتت الدراسات العصبية أن تعلم عزف الموسيقى ينشط شطري الدماغ في آنٍ واحد، مما يعزز الذاكرة قصيرة وطويلة المدى، ويُقوي الروابط العصبية بشكل لا تفعله أي لغة أخرى."
  },
  {
    title: "المهارات الحركية الدقيقة",
    icon: Activity,
    image: "/benefit_motor.png",
    color: "from-emerald-500 to-teal-500",
    description: "تنسيق حركة الأصابع على لوحة البيانو مع متابعة النوتات والشاشة يعزز التآزر الحركي البصري بشكل هائل، ويُحسن من دقة ردود الأفعال واستقلالية كل إصبع."
  },
  {
    title: "العلاج والدعم النفسي",
    icon: HeartHandshake,
    image: "/benefit_psychological.png",
    color: "from-rose-500 to-pink-500",
    description: "تُعد الموسيقى منفذاً استثنائياً للتعبير عن المشاعر المكبوتة. المنصة توفر بيئة آمنة للمتعلمين تمنحهم شعوراً بالانتماء، الهدوء، وتخفيف التوتر والقلق اليومي."
  },
  {
    title: "التنظيم الحسي والمعرفي",
    icon: Waves,
    image: "/benefit_sensory.png",
    color: "from-amber-500 to-orange-500",
    description: "للأطفال والبالغين ذوي التشتت أو طيف التوحد، توفر دراسة الإيقاعات الموسيقية هيكلاً منظماً رياضياً (Mathematical Structure) يساعد في التنبؤ وتقوية المعالجة السمعية والحسية."
  },
  {
    title: "النجاح والثقة بالنفس",
    icon: Sparkles,
    image: "/benefit_confidence.png",
    color: "from-purple-500 to-fuchsia-500",
    description: "نظام التقييم الفوري واجتياز المراحل يخلق دورة مكافأة (Reward Loop) الدوبامين، مما يبني ثقة هائلة بالنفس بمجرد أن تعزف أول مقطوعة كاملة بيدك."
  },
  {
    title: "تحسين المزاج والرفاهية",
    icon: Smile,
    image: "/benefit_mood.png",
    color: "from-sky-500 to-cyan-500",
    description: "الاستماع والمشاركة في العزف يحفز إفراز هرمونات السعادة، مما يجعل مقام ليست مجرد منصة دراسية، بل واحة يومية للانتعاش وتجديد الطاقة."
  }
];

const Benefits: FC = () => {
  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block py-1.5 px-6 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold mb-4">
            الفوائد المثبتة علمياً 🧬
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 leading-tight">تأثير الموسيقى على العقل والروح</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            تعلم الموسيقى ليس مجرد هواية، بل هو إعادة هندسة إيجابية لقدرات الدماغ ووظائفه. إليك ماذا يحدث عندما تقرر تعلم العزف:
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitsList.map((benefit, idx) => (
            <div key={idx} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 flex flex-col">
              <div className="relative h-56 w-full overflow-hidden">
                <img src={benefit.image} alt={benefit.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-80"></div>
                <div className={`absolute -bottom-6 right-8 w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} text-white flex items-center justify-center shadow-lg border-4 border-white z-10 transform group-hover:rotate-12 transition-transform duration-300`}>
                  <benefit.icon size={28} />
                </div>
              </div>
              <div className="p-8 pt-10 flex-grow relative z-0">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">{benefit.title}</h3>
                <p className="text-slate-600 leading-loose text-lg">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Benefits;
