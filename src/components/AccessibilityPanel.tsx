import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, Volume1, Volume2, EyeOff, Eye, ZapOff, Zap } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

const AccessibilityPanel: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    isFocusMode, toggleFocusMode, 
    isLowSensory, toggleLowSensory, 
    isAnimationDisabled, toggleAnimationDisabled 
  } = useAccessibility();

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 mb-4 w-72 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
          >
            <div className="bg-slate-900 text-white p-4">
              <h3 className="font-bold flex items-center gap-2">
                <Settings2 size={18} /> أدوات وإعدادات الدعم
              </h3>
              <p className="text-slate-400 text-xs mt-1">تخصيص الواجهة لتجربة مريحة وخالية من التشتيت.</p>
            </div>
            
            <div className="p-4 flex flex-col gap-3">
              {/* Focus Mode Toggle */}
              <button 
                onClick={toggleFocusMode}
                className={`flex items-center justify-between p-3 rounded-xl transition ${isFocusMode ? 'bg-primary-50 border-primary-200 border text-primary-800' : 'bg-slate-50 border-slate-100 border text-slate-600 hover:bg-slate-100'}`}
              >
                <div className="flex items-center gap-3 font-semibold text-sm">
                  {isFocusMode ? <EyeOff size={18} /> : <Eye size={18} />} وضع التركيز الحاد
                </div>
                <div className={`w-10 h-5 rounded-full relative transition ${isFocusMode ? 'bg-primary-500' : 'bg-slate-300'}`}>
                  <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition transform ${isFocusMode ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
              </button>

              {/* Low Sensory Toggle */}
              <button 
                onClick={toggleLowSensory}
                className={`flex items-center justify-between p-3 rounded-xl transition ${isLowSensory ? 'bg-emerald-50 border-emerald-200 border text-emerald-800' : 'bg-slate-50 border-slate-100 border text-slate-600 hover:bg-slate-100'}`}
              >
                <div className="flex items-center gap-3 font-semibold text-sm">
                  {isLowSensory ? <Volume1 size={18} /> : <Volume2 size={18} />} الهدوء الحسي (صوت أنعم)
                </div>
                <div className={`w-10 h-5 rounded-full relative transition ${isLowSensory ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                  <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition transform ${isLowSensory ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
              </button>

              {/* Disable Animations Toggle */}
              <button 
                onClick={toggleAnimationDisabled}
                className={`flex items-center justify-between p-3 rounded-xl transition ${isAnimationDisabled ? 'bg-amber-50 border-amber-200 border text-amber-800' : 'bg-slate-50 border-slate-100 border text-slate-600 hover:bg-slate-100'}`}
              >
                <div className="flex items-center gap-3 font-semibold text-sm">
                  {isAnimationDisabled ? <ZapOff size={18} /> : <Zap size={18} />} إيقاف المفاجآت والانيميشن
                </div>
                <div className={`w-10 h-5 rounded-full relative transition ${isAnimationDisabled ? 'bg-amber-500' : 'bg-slate-300'}`}>
                  <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition transform ${isAnimationDisabled ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-900 hover:bg-slate-800 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition transform hover:scale-105"
      >
        <Settings2 size={24} />
      </button>
    </div>
  );
};

export default AccessibilityPanel;
