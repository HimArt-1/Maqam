import { FC } from 'react';
import { Target, Heart, Lightbulb, Music } from 'lucide-react';

const About: FC = () => {
  return (
    <div className="py-20 bg-white min-h-screen leading-loose">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Intro */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 text-primary-600 rounded-full mb-6 relative">
            <Music size={40} className="relative z-10" />
            <div className="absolute inset-0 bg-primary-400 rounded-full animate-ping opacity-20"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 border-b-4 border-slate-900 inline-block pb-2">عن المنصة</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
            "مقام" ليست مجرد لوحة مفاتيح رقمية، بل هي بيئة أكاديمية، فنية، وداعمة، صُممت لخلق رابطة حقيقية بين الإنسان وصوت الموسيقى.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:border-primary-300 transition-colors shadow-sm">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md mb-6 text-primary-600">
              <Lightbulb size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">رؤيتنا</h2>
            <p className="text-slate-600">
              نطمح إلى جعل التعليم الموسيقي الأكاديمي متاحاً، مبسطاً، ومجانياً بالكامل. نؤمن أن لغة الموسيقى هي لغة عالمية قادرة على تهذيب النفس، تحفيز الإبداع، وربط الثقافات الشرقية بالغربية بطريقة سلسة.
            </p>
          </div>
          
          <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:border-rose-300 transition-colors shadow-sm">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md mb-6 text-rose-500">
              <Target size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">مهمتنا</h2>
            <p className="text-slate-600">
              تقديم منهج تدريبي تفاعلي ذكي يُقيم العازف آنياً (Real-Time)، ويدمج الأجهزة الخارجية (MIDI)، لكسر حاجز الخوف من النوتات وصناعة أداة لا تُعلم وحسب، بل تتجاوب بشكل ديناميكي مع مهارات الفرد.
            </p>
          </div>
        </div>

        {/* Special Support Section */}
        <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Heart size={200} />
          </div>
          <div className="relative z-10 md:w-2/3">
            <h2 className="text-3xl font-bold mb-6 text-primary-400">فلسفة الدعم وتسهيل الوصول</h2>
            <p className="text-slate-300 text-lg mb-6 leading-relaxed">
              لقد ذهبنا لأبعد من مجرد التعليم العام. لقد صُممت المنصة معمارياً لتكون صديقة وملائمة لذوي طيف التوحد (Autism Spectrum) وصعوبات الانتباه.
              لقد قمنا بتطوير "طبقة أدوات الدعم" التي تتيح للمعلم أو للوالدين تنقية الواجهة من المشتتات البصرية، وتنعيم الترددات الصوتية لتلافي العبء الحسي، لنضمن أن الموسيقى ستكون دائماً أداة للشفاء والسلام، وليست مصدراً للضغط.
            </p>
            <div className="flex items-center gap-4 text-sm font-bold mt-8">
              <span className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-md">صديق للتوحد 🧩</span>
              <span className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-md">تركيز صافي 🎯</span>
              <span className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-md">مرجعية علمية 📚</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
