import { FC, useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { musicTheoryData } from '../data/musicTheory';
import { FileText, ArrowLeft, Activity } from 'lucide-react';

const defaultTabId = musicTheoryData[0]?.id ?? 'reading-notes';

function readHashTabId(): string {
  const hash = typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : '';
  if (hash && musicTheoryData.some((s) => s.id === hash)) return hash;
  return defaultTabId;
}

const Resources: FC = () => {
  const [activeTabId, setActiveTabId] = useState(readHashTabId);

  useEffect(() => {
    setActiveTabId(readHashTabId());
    const onHash = () => setActiveTabId(readHashTabId());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const selectTab = useCallback((id: string) => {
    setActiveTabId(id);
    window.history.replaceState(null, '', `#${id}`);
  }, []);

  const activeContent = musicTheoryData.find(item => item.id === activeTabId);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-primary-100 text-primary-800 text-sm font-bold mb-4">
            <FileText size={16}/> المكتبة الموسيقية الشاملة
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 leading-tight">المرجع العلمي والأكاديمي</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            موسوعة موسيقية مبسطة تغطي كل ما تحتاجه لتأسيس معرفتك وتطوير فهمك للنظرية الموسيقية.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/activities#progress"
              className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-bold text-white shadow-lg shadow-primary-600/25 transition hover:bg-primary-700"
            >
              <Activity size={20} /> الدروس التفاعلية والتقدم
              <ArrowLeft size={18} />
            </Link>
            <p className="max-w-md text-sm text-slate-500 leading-relaxed">
              اقرأ النظرية هنا، ثم طبّقها في <strong className="text-slate-700">الأنشطة</strong> — مثلاً بعد «قراءة النوتة» جرّب دروس المفاتيح، وبعد «المقاييس» تدرب على الإيقاع في التمارين العملية.
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-1/3 shrink-0 flex flex-col gap-3">
            {musicTheoryData.map((section) => {
              const Icon = section.icon;
              const isActive = activeTabId === section.id;
              
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => selectTab(section.id)}
                  className={`flex items-start gap-4 p-5 rounded-2xl text-right transition-all border-2 ${
                    isActive 
                      ? 'bg-white border-primary-500 shadow-xl shadow-primary-500/10 scale-[1.02]' 
                      : 'bg-white/50 border-transparent hover:border-slate-200 hover:bg-white text-slate-600'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${isActive ? 'bg-primary-100 text-primary-600' : 'bg-slate-100 text-slate-500'}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg mb-1 ${isActive ? 'text-primary-800' : 'text-slate-800'}`}>
                      {section.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${isActive ? 'text-slate-600' : 'text-slate-500'}`}>
                      {section.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Content Area */}
          <div className="w-full lg:w-2/3 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 lg:min-h-[600px]">
             <AnimatePresence mode="wait">
               {activeContent && (
                  <motion.div
                    key={activeContent.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
                       <div className="p-4 bg-primary-50 rounded-2xl text-primary-600">
                         <activeContent.icon size={32} />
                       </div>
                       <div>
                         <h2 className="text-3xl font-bold text-slate-900">{activeContent.title}</h2>
                         <p className="text-slate-500 mt-2 font-medium">{activeContent.description}</p>
                       </div>
                    </div>

                    <div 
                      className="prose prose-lg prose-slate max-w-none text-slate-700 leading-loose"
                      dangerouslySetInnerHTML={{ __html: activeContent.content }}
                    />
                  </motion.div>
               )}
             </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Resources;
