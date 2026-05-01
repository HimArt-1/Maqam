import { FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlayCircle, Star, Heart, Sparkles, Smile, Gamepad2 } from 'lucide-react';
import { MAQAM_LOGO_LIGHT_SRC } from '../constants/brand';

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', bounce: 0.38, delay: 0.38 + i * 0.1 },
  }),
};

const Home: FC = () => {
  return (
    <div className="overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-sky-50/30 min-h-screen min-h-[100dvh] relative">

      {/* خلفية محيطية — CSS فقط، مُسرَّعة بالـ GPU */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute top-16 right-[10%] w-48 h-48 bg-amber-200/30 rounded-full blur-3xl"
          style={{ animation: 'pulse 6s ease-in-out infinite', willChange: 'opacity' }}
        />
        <div
          className="absolute top-44 left-[8%] w-56 h-56 bg-rose-200/22 rounded-full blur-3xl"
          style={{ animation: 'pulse 7.5s ease-in-out 1.8s infinite', willChange: 'opacity' }}
        />
        <div
          className="absolute top-80 right-[20%] w-72 h-72 bg-emerald-200/18 rounded-full blur-3xl"
          style={{ animation: 'pulse 9s ease-in-out 3.2s infinite', willChange: 'opacity' }}
        />
        {/* بقعة ضوء علوية */}
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[36rem] h-72 rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(16,185,129,0.08) 0%, transparent 70%)',
            filter: 'blur(32px)',
          }}
        />
      </div>

      {/* ===== قسم الهيرو ===== */}
      <section
        className="relative px-3 sm:px-4 pt-10 pb-8 md:pt-20 md:pb-14 container mx-auto text-center z-10 max-w-[100vw]"
        style={{ contain: 'layout style' }}
      >

        {/* ——— الشعار العائم بدون خلفية ——— */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 18, stiffness: 175 }}
          className="relative inline-block mb-5 sm:mb-7"
        >
          <div className="relative mx-auto w-[min(68vw,188px)] sm:w-48 md:w-56">

            {/* توهج أخضر محيطي خلف الشعار */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full"
              aria-hidden
              style={{
                margin: '-3.5rem',
                background:
                  'radial-gradient(ellipse 68% 58% at 50% 58%, rgba(16,185,129,0.32) 0%, rgba(52,211,153,0.1) 48%, transparent 72%)',
                filter: 'blur(22px)',
              }}
            />
            {/* توهج ذهبي دافئ */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full"
              aria-hidden
              style={{
                margin: '-2rem',
                background:
                  'radial-gradient(ellipse 55% 38% at 50% 76%, rgba(180,151,90,0.18) 0%, transparent 65%)',
                filter: 'blur(16px)',
              }}
            />

            {/* نوتات موسيقية طافية — CSS فقط */}
            <span className="hero-note hero-note-1" aria-hidden>♪</span>
            <span className="hero-note hero-note-2" aria-hidden>♫</span>
            <span className="hero-note hero-note-3" aria-hidden>♩</span>
            <span className="hero-note hero-note-4" aria-hidden>♬</span>

            {/* الشعار — mix-blend-mode:multiply يُزيل الخلفية البيضاء */}
            <img
              src={MAQAM_LOGO_LIGHT_SRC}
              alt="شعار أكاديمية مقام الموسيقية — منصة مقام التعليمية"
              className="relative w-full h-auto object-contain"
              style={{
                mixBlendMode: 'multiply',
                filter: 'drop-shadow(0 6px 18px rgba(5,150,105,0.22)) drop-shadow(0 2px 6px rgba(0,0,0,0.08))',
              }}
              decoding="async"
              loading="eager"
            />
          </div>

          {/* شارة النجمة */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 10, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
            className="absolute -top-2 -right-2 sm:-right-3 bg-white rounded-full p-[0.42rem] sm:p-[0.5rem] shadow-xl border border-amber-100"
            style={{ willChange: 'transform' }}
          >
            <Star size={17} className="text-amber-500 fill-amber-500 sm:w-5 sm:h-5" />
          </motion.div>
        </motion.div>

        {/* العنوان الرئيسي */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.14 }}
          className="text-2xl leading-snug sm:text-3xl md:text-5xl md:leading-tight font-black text-slate-800 mb-4 sm:mb-6 drop-shadow-sm px-1"
        >
          أهلاً بك في{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-emerald-700 via-primary-600 to-teal-500">
            أكاديمية مقام الموسيقية
          </span>
        </motion.h1>

        {/* الوصف */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="text-base sm:text-lg md:text-2xl text-slate-600 font-bold max-w-2xl mx-auto mb-8 sm:mb-10 bg-white/60 backdrop-blur-sm py-3 px-4 sm:px-6 rounded-2xl sm:rounded-full inline-block border border-white/80 shadow-sm leading-relaxed"
        >
          منصة تعليمية سعودية — نلعب، نتعلم، ونعزف معاً
        </motion.p>
      </section>

      {/* ===== بطاقات الأنشطة الرئيسية ===== */}
      <section className="relative z-20 pb-16 sm:pb-24 px-3 sm:px-4 container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">

          {/* بطاقة ١: هيا نتدرب */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Link
              to="/activities"
              className="group block relative h-full bg-white rounded-[3rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-transparent hover:border-primary-400 hover:-translate-y-3 z-10 overflow-hidden"
              style={{ willChange: 'transform' }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-50 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-125" />
              {/* بريق خفيف عند الـ hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[3rem] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 40% at 15% 15%, rgba(52,211,153,0.07) 0%, transparent 65%)' }} />
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

          {/* بطاقة ٢: الاستوديو الحر */}
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Link
              to="/studio"
              className="group block relative h-full bg-white rounded-[3rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-transparent hover:border-secondary-400 hover:-translate-y-3 z-10 overflow-hidden"
              style={{ willChange: 'transform' }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-secondary-50 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-125" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[3rem] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 40% at 15% 15%, rgba(251,113,133,0.07) 0%, transparent 65%)' }} />
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

          {/* بطاقة ٣: مكتبة الألحان */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Link
              to="/resources"
              className="group block relative h-full bg-white rounded-[3rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-transparent hover:border-amber-400 hover:-translate-y-3 z-10 overflow-hidden"
              style={{ willChange: 'transform' }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-50 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-125" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[3rem] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 40% at 15% 15%, rgba(251,191,36,0.08) 0%, transparent 65%)' }} />
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

      {/* زخارف سفلية */}
      <div className="flex justify-center items-center gap-8 pb-16" aria-hidden>
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0 }}
          style={{ willChange: 'transform' }}
        >
          <Star size={32} className="text-amber-400 fill-amber-400 opacity-60 drop-shadow-sm sm:w-9 sm:h-9" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: 0.2 }}
          style={{ willChange: 'transform' }}
        >
          <Heart size={32} className="text-rose-400 fill-rose-400 opacity-60 drop-shadow-sm sm:w-9 sm:h-9" />
        </motion.div>
        <motion.span
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, delay: 0.4 }}
          className="inline-block text-primary-500 opacity-70 text-3xl sm:text-4xl"
          style={{ willChange: 'transform' }}
        >
          ♪
        </motion.span>
      </div>
    </div>
  );
};

export default Home;
