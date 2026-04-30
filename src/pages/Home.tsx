import { FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlayCircle, Star, Music, Heart, Sparkles, Smile, Gamepad2 } from 'lucide-react';

const Home: FC = () => {
  return (
    <div className="overflow-hidden bg-gradient-to-b from-blue-50/50 to-white min-h-screen relative">
      
      {/* Fun Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-[10%] w-32 h-32 bg-amber-200/40 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-40 left-[10%] w-40 h-40 bg-rose-200/40 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-80 right-[20%] w-48 h-48 bg-primary-200/40 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative px-4 pt-12 pb-10 md:pt-20 md:pb-16 container mx-auto text-center z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.6, duration: 1 }}
          className="inline-block mb-6"
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto bg-gradient-to-tr from-amber-400 to-orange-400 rounded-[2.5rem] rotate-3 flex items-center justify-center shadow-[0_20px_50px_-12px_rgba(245,158,11,0.5)] border-4 border-white">
            <Music size={70} className="text-white drop-shadow-md -rotate-6" strokeWidth={3} />
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-4 -right-4 bg-white rounded-full p-2.5 shadow-xl border-2 border-amber-100"
            >
              <Star size={28} className="text-amber-500 fill-amber-500" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-black text-slate-800 mb-6 drop-shadow-sm leading-tight"
        >
          أهلاً بك في <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-600 to-teal-400">عالم الموسيقى!</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl md:text-2xl text-slate-600 font-bold max-w-2xl mx-auto mb-10 bg-white/50 backdrop-blur-sm py-3 px-6 rounded-full inline-block border border-white/80 shadow-sm"
        >
          هيا نلعب، نتعلم، ونعزف أجمل الألحان معاً 🎵
        </motion.p>
      </section>

      {/* Main Activities/Lessons - BIG AND COLORFUL */}
      <section className="relative z-20 pb-24 px-4 container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
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
         <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0 }}><Star size={36} className="text-amber-400 fill-amber-400 opacity-60 drop-shadow-sm" /></motion.div>
         <motion.div animate={{ y: [0, -18, 0] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.2 }}><Heart size={36} className="text-rose-400 fill-rose-400 opacity-60 drop-shadow-sm" /></motion.div>
         <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 2.2, delay: 0.4 }}><Music size={36} className="text-primary-400 opacity-60 drop-shadow-sm" /></motion.div>
      </div>
    </div>
  );
};

export default Home;
