import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Heart } from 'lucide-react';

const WelcomePopup: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if it has been shown in this session
    const hasSeenWelcome = sessionStorage.getItem('maqam_welcome_shown');
    if (!hasSeenWelcome) {
      // Small delay to let the page load
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    sessionStorage.setItem('maqam_welcome_shown', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100]"
            onClick={closePopup}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 max-w-xl w-full text-center border-[6px] border-primary-50 relative pointer-events-auto"
            >
              <button 
                onClick={closePopup}
                className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-rose-100 hover:text-rose-600 transition-colors"
                aria-label="إغلاق"
              >
                <X size={20} />
              </button>

              <div className="mb-8 relative inline-block group">
                <div className="absolute inset-0 bg-primary-200 blur-2xl opacity-60 rounded-full group-hover:opacity-100 transition-opacity"></div>
                <img src="/logo.png" alt="شعار منصة مقام" className="w-48 md:w-64 mx-auto relative z-10 drop-shadow-2xl transform hover:scale-105 transition-transform" />
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 mb-8 border border-amber-100 relative shadow-inner">
                <Star className="absolute -top-4 -right-4 text-amber-400 fill-amber-400 drop-shadow-md animate-pulse" size={32} />
                <Star className="absolute -bottom-3 -left-3 text-amber-400 fill-amber-400 drop-shadow-md" size={24} />
                <p className="text-primary-700 font-bold text-lg md:text-xl mb-1 -mt-2">هذه المنصة مبادرة تعليمية</p>
                <p className="text-secondary-600 font-extrabold text-2xl md:text-3xl drop-shadow-sm leading-tight">مدرسة الأمير سعود بن جلوي المتوسطة</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-sm text-slate-500 font-bold mb-2 border-b border-slate-200 pb-2">تطوير برمجي وإعداد</p>
                  <p className="font-extrabold text-slate-800 text-lg">أ. هيثم بن غرم الله الزهراني</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-sm text-slate-500 font-bold mb-2 border-b border-slate-200 pb-2">بإشراف مدير المدرسة</p>
                  <p className="font-extrabold text-slate-800 text-lg">أ. حسام بن محمد يار</p>
                </div>
              </div>

              <button 
                onClick={closePopup}
                className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-3 transform hover:-translate-y-1"
              >
                <Heart size={24} className="fill-white/20" />
                الدخول للمنصة
              </button>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WelcomePopup;
