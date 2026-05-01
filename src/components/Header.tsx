import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Home, Info, Heart, Layers, Activity, Library, MessageCircle, Phone, AudioLines } from 'lucide-react';
import { MAQAM_ICON_SRC } from '../constants/brand';

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'الرئيسية',          path: '/',                 icon: Home },
    { name: 'من نحن',            path: '/about',            icon: Info },
    { name: 'فوائد الموسيقى',   path: '/benefits',         icon: Heart },
    { name: 'هيكل التعلم',      path: '/program-structure', icon: Layers },
    { name: 'الأنشطة',          path: '/activities',       icon: Activity },
    { name: 'استوديو العزف',    path: '/studio',           icon: AudioLines },
    { name: 'المصادر',          path: '/resources',        icon: Library },
    { name: 'الأسئلة الشائعة', path: '/faq',              icon: MessageCircle },
    { name: 'اتصل بنا',        path: '/contact',          icon: Phone },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/85 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.1)] backdrop-blur-xl transition-all duration-300 supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]">
      <div className="container mx-auto max-w-[100vw] px-3 sm:px-4">
        <div className="flex justify-between items-center min-h-[4.25rem] sm:h-20 py-2 sm:py-0 gap-2">

          {/* ——— الشعار ——— */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0 shrink" onClick={() => setIsMenuOpen(false)}>
            {/* أيقونة الشعار في دائرة داكنة */}
            <div className="relative shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-slate-950 ring-1 ring-white/10 shadow-md group-hover:ring-emerald-500/30 transition-all duration-300">
              <img
                src={MAQAM_ICON_SRC}
                alt="مقام"
                className="h-full w-full object-contain scale-[0.88]"
                width={48}
                height={48}
                decoding="async"
              />
            </div>
            <div className="min-w-0 text-right">
              <p className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight leading-none">مقام</p>
              <p className="text-[11px] sm:text-xs text-primary-600 font-bold tracking-wide leading-tight mt-0.5">منصة مقام الموسيقية التعليمية</p>
            </div>
          </Link>

          {/* ——— ناف سطح المكتب ——— */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="التنقل الرئيسي">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    active
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon size={15} className={active ? 'text-primary-500' : 'text-slate-400'} />
                  {link.name}
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-lg bg-primary-50 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ——— زر القائمة الجوال ——— */}
          <button
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition active:scale-95"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={isMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isMenuOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ——— قائمة الجوال المتحركة ——— */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden absolute w-full bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-xl overflow-hidden"
          >
            <nav className="flex flex-col px-3 py-3 gap-1" aria-label="القائمة الجوال">
              {navLinks.map((link, i) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.2 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        active
                          ? 'bg-primary-50 text-primary-700 border-r-4 border-primary-500'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <Icon size={19} className={active ? 'text-primary-500' : 'text-slate-400'} />
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
