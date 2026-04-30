import { FC, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MAQAM_LOGO_SRC } from '../constants/brand';
import { useAccessibility } from '../context/AccessibilityContext';

const STORAGE_KEY = 'maqam_platform_intro_v1';

const PlatformIntro: FC = () => {
  const { isAnimationDisabled } = useAccessibility();
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return !sessionStorage.getItem(STORAGE_KEY);
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!isAnimationDisabled) return;
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* */
    }
  }, [isAnimationDisabled]);

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* */
    }
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible || isAnimationDisabled) return;
    const t = window.setTimeout(dismiss, 2800);
    return () => window.clearTimeout(t);
  }, [visible, dismiss, isAnimationDisabled]);

  if (isAnimationDisabled) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#030503] px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-90"
            style={{
              background:
                'radial-gradient(ellipse 85% 55% at 50% 35%, rgba(22, 101, 52, 0.45) 0%, transparent 58%), radial-gradient(ellipse 70% 40% at 80% 80%, rgba(180, 151, 90, 0.08) 0%, transparent 50%)',
            }}
          />
          <motion.div
            className="relative z-10 flex max-w-[min(92vw,420px)] flex-col items-center"
            initial={{ opacity: 0, scale: 0.88, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -8 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src={MAQAM_LOGO_SRC}
              alt="مقام — أكاديمية الموسيقى"
              className="h-auto w-full max-h-[min(52vh,480px)] object-contain drop-shadow-[0_0_48px_rgba(34,197,94,0.15)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12, duration: 0.7 }}
            />
            <motion.div
              className="mt-8 h-[2px] w-0 rounded-full bg-gradient-to-l from-amber-200/90 via-emerald-500/80 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: 'min(240px, 70vw)' }}
              transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.p
              className="mt-6 text-center text-sm font-medium tracking-[0.2em] text-emerald-100/85"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              مرحباً بك في المنصة
            </motion.p>
          </motion.div>

          <button
            type="button"
            onClick={dismiss}
            className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-bold text-emerald-100/70 backdrop-blur-sm transition hover:border-emerald-400/40 hover:text-emerald-50"
          >
            تخطي
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlatformIntro;
