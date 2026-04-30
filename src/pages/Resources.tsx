import { FC, useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { musicTheoryData } from '../data/musicTheory';
import { FileText } from 'lucide-react';

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
    <div className="min-h-screen py-16 relative overflow-hidden bg-gradient-to-b from-amber-50/50 to-white">
      {/* Fun Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-[15%] w-32 h-32 bg-amber-200/40 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-60 left-[10%] w-40 h-40 bg-orange-200/40 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-[5%] w-48 h-48 bg-yellow-200/40 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-white border border-amber-100 text-amber-600 text-base font-bold mb-6 shadow-sm">
            <FileText size={18}/> مكتبة الألحان الممتعة
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-slate-800 leading-tight drop-shadow-sm">
            استكشف <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-500 to-orange-400">وتعلم!</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed bg-white/60 backdrop-blur-sm py-4 px-8 rounded-3xl border border-white/80 shadow-sm inline-block max-w-2xl">
            هنا ستجد الكثير من المعلومات الجميلة والمبسطة لتتعرف أكثر على عالم الموسيقى والألحان.
          </p>
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
                  className={`flex items-start gap-4 p-5 rounded-[2rem] text-right transition-all border-4 ${
                    isActive 
                      ? 'scale-[1.02] border-amber-300 bg-white shadow-xl shadow-amber-500/10' 
                      : 'border-transparent bg-white/60 text-slate-600 hover:border-amber-200 hover:bg-white hover:-translate-y-1 shadow-sm'
                  }`}
                >
                  <div className={`p-4 rounded-2xl ${isActive ? 'bg-amber-400 text-white shadow-inner rotate-3' : 'bg-slate-100 text-slate-500'}`}>
                    <Icon size={28} />
                  </div>
                  <div className="pt-1">
                    <h3 className={`font-black text-xl mb-1 ${isActive ? 'text-slate-800' : 'text-slate-700'}`}>
                      {section.title}
                    </h3>
                    <p className={`text-sm font-medium leading-relaxed ${isActive ? 'text-slate-600' : 'text-slate-500'}`}>
                      {section.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Content Area */}
          <div className="bg-white border-4 border-white shadow-xl rounded-[3rem] w-full p-8 md:p-12 lg:min-h-[600px] lg:w-2/3">
             <AnimatePresence mode="wait">
               {activeContent && (
                  <motion.div
                    key={activeContent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-6 mb-8 pb-8 border-b-2 border-slate-100">
                       <div className="p-5 bg-gradient-to-br from-amber-400 to-orange-400 rounded-3xl text-white shadow-lg rotate-3">
                         <activeContent.icon size={40} />
                       </div>
                       <div>
                         <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-2">{activeContent.title}</h2>
                         <p className="text-slate-500 font-medium text-lg">{activeContent.description}</p>
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
