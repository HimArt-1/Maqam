import { FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlayCircle, ArrowLeft, Star, Heart, TrendingUp, Music, Library } from 'lucide-react';

const Home: FC = () => {
  return (
    <div className="overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-28 md:pt-32 md:pb-40 container mx-auto">
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[620px] w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 opacity-40">
          <div className="absolute top-0 right-10 h-80 w-80 rounded-full bg-primary-400/90 blur-3xl animate-blob" />
          <div className="animation-delay-2000 absolute top-10 left-0 h-72 w-72 rounded-full bg-secondary-300/80 blur-3xl animate-blob" />
          <div className="animation-delay-4000 absolute -bottom-12 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-teal-300/70 blur-3xl animate-blob" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex flex-col items-center justify-center py-3 px-8 md:px-10 rounded-[2rem] bg-gradient-to-b from-white to-slate-50/80 backdrop-blur-sm border-2 border-primary-100 shadow-xl shadow-primary-900/5 text-center mb-10 relative z-20"
          >
            <span className="text-xl md:text-2xl text-primary-700 font-extrabold tracking-wide drop-shadow-sm flex items-center gap-2">
              <Star size={20} className="text-amber-500 fill-amber-500" />
              مبادرة تعليمية ـ تطوير: هيثم الزهراني
              <Star size={20} className="text-amber-500 fill-amber-500" />
            </span>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="relative flex justify-center items-center w-full mb-12"
          >
            {/* Glowing background effect around the logo */}
            <div className="absolute inset-0 bg-primary-400 blur-[100px] opacity-25 rounded-full animate-pulse w-3/4 h-3/4 m-auto"></div>
            <img 
              src="/logo.png" 
              alt="الشعار الكامل لمنصة مقام" 
              className="relative z-10 w-80 md:w-[28rem] lg:w-[36rem] h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.25)] object-contain" 
            />
          </motion.div>

          <h1 className="mb-8 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
            رحلتك نحو <br className="md:hidden" />
            <span className="inline-block bg-gradient-to-l from-primary-700 via-primary-600 to-secondary-600 bg-clip-text pb-1 leading-relaxed text-transparent">
              الإبداع الموسيقي
            </span>{' '}
            تبدأ هنا
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-slate-600 md:text-2xl">
            منصة تعليمية متكاملة خطوة بخطوة؛ لتعلم النوتة، الإيقاع، والعزف بأحدث الأساليب التفاعلية الممتعة.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/program-structure"
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-primary-700 to-primary-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary-900/20 transition hover:from-primary-800 hover:to-primary-700 hover:shadow-xl sm:w-auto"
            >
              ابدأ رحلتك الآن
              <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            </Link>
            <Link
              to="/activities"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/80 bg-white/75 px-8 py-4 text-lg font-bold text-slate-800 shadow-[0_8px_30px_-10px_rgba(27,54,38,0.15)] backdrop-blur-md transition hover:border-primary-200/80 hover:bg-white/90 hover:shadow-lg sm:w-auto"
            >
              <PlayCircle size={24} className="text-secondary-600" />
              استكشف الأنشطة
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="section-fade relative z-20 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-primary-600/90">لماذا نحن</p>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">لماذا منصة مقام؟</h2>
            <p className="text-lg text-slate-600">
              نقدم تجربة تعليمية فريدة تدمج بين التأسيس الأكاديمي والمتعة التفاعلية لمختلف المهارات والمستويات.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {[
              {
                icon: <Star className="text-amber-500" size={30} />,
                title: 'منهجية متدرجة',
                desc: 'منهج مصمم بعناية يبدأ معك من الصفر لتعلم الإيقاع والأساسيات وحتى اتقان العزف.',
                accent: 'from-amber-500/15 to-transparent',
              },
              {
                icon: <Music className="text-primary-600" size={30} />,
                title: 'أنشطة تفاعلية',
                desc: 'تدريبات عملية وممتعة تضمن تفاعل المتعلم وترسيخ المعلومات السمعية والحركية.',
                accent: 'from-primary-500/15 to-transparent',
              },
              {
                icon: <TrendingUp className="text-secondary-600" size={30} />,
                title: 'تطوير مستمر',
                desc: 'تحديثات دائمة للمكتبة الموسيقية مع تتبع آلي لتقدمك وتطور مهارتك.',
                accent: 'from-secondary-500/15 to-transparent',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.5 }}
                className="card-modern-hover relative overflow-hidden p-8"
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-80`}
                  aria-hidden
                />
                <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/80 bg-white/90 shadow-md backdrop-blur-sm">
                  {feature.icon}
                </div>
                <h3 className="relative mb-3 text-xl font-bold text-slate-900 md:text-2xl">{feature.title}</h3>
                <p className="relative text-lg leading-relaxed text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Tracks Preview */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl text-right">
              <p className="mb-2 text-sm font-bold text-primary-600">استكشف</p>
              <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">مسارات التعلم الأساسية</h2>
              <p className="text-lg text-slate-600">
                اختر المسار الذي يناسبك وابدأ تطوير قدراتك، نحن نغطي كافة الجوانب التي يحتاجها الموسيقي الشامل.
              </p>
            </div>
            <Link
              to="/activities"
              className="flex shrink-0 items-center gap-2 whitespace-nowrap font-bold text-primary-700 transition hover:text-primary-800"
            >
              تصفح التمارين <ArrowLeft size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { path: '/resources#time-signatures', title: 'أساسيات الإيقاع', image: '/card_rhythm.png' },
              { path: '/resources#western-scales', title: 'النغم والمقامات', image: '/card_melody.png' },
              { path: '/activities#lessons', title: 'التمارين الصوتية', image: '/card_vocal.png' },
              { path: '/program-structure', title: 'العزف الجماعي', image: '/card_group.png' },
            ].map((track, i) => (
              <Link to={track.path} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="group relative h-72 overflow-hidden rounded-[1.35rem] border border-white/50 shadow-[0_12px_40px_-12px_rgba(27,54,38,0.18)] ring-1 ring-primary-900/5 transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(27,54,38,0.22)]"
                >
                  <img
                    src={track.image}
                    alt={track.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/35 to-slate-900/10 transition group-hover:from-slate-950 group-hover:via-slate-900/45" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="flex w-full items-center justify-between gap-3">
                      <h3 className="text-lg font-bold text-white drop-shadow-md md:text-xl">{track.title}</h3>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md transition group-hover:scale-110 group-hover:bg-primary-500 group-hover:border-primary-400/50">
                        <ArrowLeft size={18} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-primary-800/30 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 p-10 text-center shadow-[0_24px_60px_-12px_rgba(27,54,38,0.45)] md:p-16">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0">
              <img src="/music_language.png" alt="الموسيقى لغة الجميع" className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
              <div className="absolute inset-0 bg-primary-900/40"></div>
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <Heart className="text-rose-400 mx-auto mb-6" size={48} />
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">الموسيقى لغة الجميع</h2>
              <p className="text-xl text-primary-50 mb-10 leading-relaxed font-medium drop-shadow-md">
                انضم إلى الآلاف من المتعلمين واستفد من مصادرنا المتجددة. سواء كنت هاوياً أو تسعى للاحتراف، مقام هي بدايتك.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  to="/resources"
                  className="flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-primary-900 shadow-lg transition hover:bg-primary-50 hover:shadow-xl"
                >
                  <Library size={22} />
                  المكتبة الموسيقية
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credits Footer Section Removed */}

    </div>
  );
};

export default Home;
