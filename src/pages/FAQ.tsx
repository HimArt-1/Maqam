import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircleQuestion } from 'lucide-react';

const faqData = [
  {
    question: "هل أحتاج إلى بيانو حقيقي لكي أتعلم على منصة مقام؟",
    answer: "لا، ليس بالضرورة! المنصة مزودة بـ 'كيبورد بيانو تفاعلي' يمكنك العزف عليه باستخدام الفأرة أو شاشة اللمس، أو حتى استخدام لوحة مفاتيح الكمبيوتر الخاص بك (حيث تعمل أزرار A, S, D, F كأنها مفاتيح بيانو). ومع ذلك، إذا كان لديك بيانو إلكتروني (MIDI Controller)، يمكنك ربطه بالكمبيوتر وستقوم المنصة بالتعرف عليه فوراً."
  },
  {
    question: "ما هي ميزة الاستوديو التفاعليوكيف يختلف عن الدرس؟",
    answer: "الاستوديو التفاعلي هو بمثابة 'مساحة إبداعية حرة'؛ حيث يمكنك العزف دون قيود ورؤية النوتات تتشكل بصرياً على السبورة الموسيقية. أما 'الدروس' فهي مسار تعليمي يطلب منك عزف نوتات محددة وفق منهجية معينة ولا يسمح لك بالانتقال للخطوة التالية إلا بعد العزف الصحيح (تقييم فوري)."
  },
  {
    question: "هل يدعم التطبيق ذوي الاحتياجات الخاصة والتوحد؟",
    answer: "نعم وبكل فخر. يمتلك التطبيق محرك دعم متقدم يُسمى (Accessibility Tools) يمكن الوصول إليه من الزر العائم أسفل الشاشة. يتيح لك هذا المحرك تفعيل وضع 'التركيز' لتقليل التشتت البصري، ووضع 'الهدوء الحسي' لخفض وتنعيم الترددات الصوتية لتجنب الحمل الحسي الزائد، بالإضافة إلى خيار إغلاق الحركات الفجائية."
  },
  {
    question: "هل المنصة مجانية؟ وهل يوجد تطبيق للهواتف المحمولة؟",
    answer: "المنصة وتدريباتها الأساسية متاحة بالكامل ومصممة بأحدث تقنيات الويب (PWA) لتعمل بكفاءة على جميع الأجهزة الذكية والأجهزة اللوحية دون الحاجة لتحميل تطبيق من المتجر، حيث تتوائم شاشة البيانو والسبورة مع حجم ونوع جهازك تلقائياً."
  },
  {
    question: "كعازف متقدم، هل ستفيدني المنصة؟",
    answer: "صُممت المنصة أساساً لتعليم وتدريب المبتدئين والمتوسطين من الصفر، ومع ذلك يوفر 'المرجع الموسيقي الأكاديمي' وميزة الربط مع أدوات (MIDI) بيئة استكشاف هادئة حتى للفنانين، خاصة لشرح بعض المقامات والأبعاد بشكل بصري."
  }
];

const FAQ: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
           <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-indigo-100 text-indigo-800 text-sm font-bold mb-4">
            <MessageCircleQuestion size={18}/> الاستفسارات
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 border-b-4 border-primary-500 inline-block pb-2">الأسئلة الشائعة</h1>
          <p className="text-xl text-slate-600">
            كل ما يدور في ذهنك حول المنصة، تقنياتها، وطرق الاستفادة منها.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 border ${isOpen ? 'border-primary-400 shadow-lg shadow-primary-500/10' : 'border-slate-200 hover:border-slate-300'}`}
              >
                <button
                  className="w-full text-right p-6 flex justify-between items-center bg-white"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <span className={`font-bold text-lg md:text-xl pr-4 ${isOpen ? 'text-primary-800' : 'text-slate-800'}`}>
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full shrink-0 transition ${isOpen ? 'bg-primary-100 text-primary-600' : 'bg-slate-100 text-slate-400'}`}>
                    {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                     >
                      <div className="p-6 pt-0 text-slate-600 leading-loose border-t border-slate-100 ml-4 mr-4 mt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 bg-slate-900 text-white rounded-3xl p-10 text-center relative overflow-hidden shadow-xl">
           <div className="absolute opacity-10 right-0 top-0 w-full h-full pointer-events-none text-white">
              <HelpCircle size={300} className="-mr-10 -mt-10" />
           </div>
           <div className="relative z-10">
             <h3 className="text-2xl font-bold mb-4">لم تجد إجابة لسؤالك؟</h3>
             <p className="text-slate-400 max-w-lg mx-auto mb-6">نحن هنا للمساعدة. فريق منصة مقام الفني والأكاديمي متواجد للرد على استفساراتكم التقنية والموسيقية في أي وقت.</p>
             <Link to="/contact" className="inline-block bg-primary-600 hover:bg-primary-500 transition px-8 py-3 rounded-full font-bold text-white shadow-lg">
                تواصل معنا الآن
             </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
