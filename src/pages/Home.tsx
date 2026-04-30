import { FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlayCircle, Star, Heart, Sparkles, Smile, Gamepad2 } from 'lucide-react';
import { MAQAM_LOGO_SRC } from '../constants/brand';

const Home: FC = () => {
  return (
    <div className="overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-sky-50/30 min-h-screen min-h-[100dvh] relative">
      
      {/* Fun Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-[10%] w-32 h-32 bg-amber-200/40 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-40 left-[10%] w-40 h-40 bg-rose-200/40 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-80 right-[20%] w-48 h-48 bg-primary-200/40 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative px-3 sm:px-4 pt-8 pb-8 md:pt-16 md:pb-14 container mx-auto text-center z-10 max-w-[100vw]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.35, duration: 0.9 }}
          className="inline-block mb-5 sm:mb-6"
        >
          <div className="relative mx-auto w-[min(88vw,280px)] sm:w-72 md:w-80">
            <div className="rounded-[1.75rem] overflow-hidden ring-4 ring-white shadow-[0_24px_60px_-20px_rgba(22,101,52,0.35)] bg-neutral-950">
              <img
                src={MAQAM_LOGO_SRC}
                alt="شعار أكاديمية مقام الموسيقية — منصة مقام التعليمية"
                className="w-full h-auto object-contain"
                decoding="async"
              />
            </div>
            <motion.div 
              animate={{ y: [0, -8, 0] }} 
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="absolute -top-2 -right-1 sm:-right-2 bg-white rounded-full p-2 shadow-xl border border-emerald-100"
            >
              <Star size={22} className="text-amber-500 fill-amber-500 sm:w-7 sm:h-7" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-2xl leading-snug sm:text-3xl md:text-5xl md:leading-tight font-black text-slate-800 mb-4 sm:mb-6 drop-shadow-sm px-1"
        >
          أهلاً بك في <span className="text-transparent bg-clip-text bg-gradient-to-l from-emerald-700 via-primary-600 to-teal-500">أكاديمية مقام الموسيقية</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="text-base sm:text-lg md:text-2xl text-slate-600 font-bold max-w-2xl mx-auto mb-8 sm:mb-10 bg-white/60 backdrop-blur-sm py-3 px-4 sm:px-6 rounded-2xl sm:rounded-full inline-block border border-white/80 shadow-sm leading-relaxed"
        >
          منصة تعليمية سعودية — نلعب، نتعلم، ونعزف معاً
        </motion.p>
      </section>

      {/* Main Activities/Lessons - BIG AND COLORFUL */}
      <section className="relative z-20 pb-16 sm:pb-24 px-3 sm:px-4 container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          
          {/* Card 1: Lessons */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.4, delay: 0.4 }}
          >
            <Link to="/activities" className="group block relative h-full bg-white rounded-[3rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-transparent hover:border-primary-400 hover:-translate-y-3 z-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-50 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-110" />
              <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-primary-500/30 rotate-3 group-hover:rotate-6 transition-transform duration-300 border-4 border-white">
                <Gamepad2 size={48} className="text-white drop-shadow-sm" />
              </div>
              <h2 className="text-3xl font-black text-slate-800 mb-4 group-hover:text-primary-600 transition-colors">هيا نتدرب</h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                ألعاب ودروس تفاعلية ممتعة لتعلم الإيقاع والنغم خطوة بخطوة.
              </p>
              <div className="flex justify-center items-center gap-2 text-white font-black text-lg bg-primary-500 py-4 px-6 rounded-2xl w-full group-hover:bg-primary-600 shadow-md transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                <PlayCircle size={26} /> ابدأ اللعب
              </div>
            </Link>
          </motion.div>

          {/* Card 2: Free Studio */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.4, delay: 0.5 }}
          >
            <Link to="/studio" className="group block relative h-full bg-white rounded-[3rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-transparent hover:border-secondary-400 hover:-translate-y-3 z-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-secondary-50 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-110" />
              <div className="w-24 h-24 bg-gradient-to-br from-secondary-400 to-rose-500 rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-secondary-500/30 -rotate-3 group-hover:-rotate-6 transition-transform duration-300 border-4 border-white">
                <Sparkles size={48} className="text-white drop-shadow-sm" />
              </div>
              <h2 className="text-3xl font-black text-slate-800 mb-4 group-hover:text-secondary-600 transition-colors">الاستوديو الحر</h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                مساحتك الخاصة للإبداع! اعزف على البيانو والآلات الموسيقية بحرية.
              </p>
              <div className="flex justify-center items-center gap-2 text-white font-black text-lg bg-secondary-500 py-4 px-6 rounded-2xl w-full group-hover:bg-secondary-600 shadow-md transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                <PlayCircle size={26} /> ادخل الاستوديو
              </div>
            </Link>
          </motion.div>

          {/* Card 3: Resources/Library */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.4, delay: 0.6 }}
          >
            <Link to="/resources" className="group block relative h-full bg-white rounded-[3rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-transparent hover:border-amber-400 hover:-translate-y-3 z-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-50 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-110" />
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-amber-500/30 rotate-3 group-hover:rotate-6 transition-transform duration-300 border-4 border-white">
                <Smile size={48} className="text-white drop-shadow-sm" />
              </div>
              <h2 className="text-3xl font-black text-slate-800 mb-4 group-hover:text-amber-500 transition-colors">مكتبة الألحان</h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                استكشف مجموعة من الألحان والأغاني الجميلة، استمع وشارك.
              </p>
              <div className="flex justify-center items-center gap-2 text-white font-black text-lg bg-amber-500 py-4 px-6 rounded-2xl w-full group-hover:bg-amber-600 shadow-md transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                <PlayCircle size={26} /> استمع الآن
              </div>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* Decorative Bottom */}
      <div className="flex justify-center items-center gap-8 pb-16">
         <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0 }}><Star size={32} className="text-amber-400 fill-amber-400 opacity-60 drop-shadow-sm sm:w-9 sm:h-9" /></motion.div>
         <motion.div animate={{ y: [0, -18, 0] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.2 }}><Heart size={32} className="text-rose-400 fill-rose-400 opacity-60 drop-shadow-sm sm:w-9 sm:h-9" /></motion.div>
         <motion.span animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 2.2, delay: 0.4 }} className="inline-block text-primary-500 opacity-70 text-3xl sm:text-4xl" aria-hidden>♪</motion.span>
      </div>
    </div>
  );
};

export default Home;
