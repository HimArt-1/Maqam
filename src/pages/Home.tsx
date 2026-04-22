import { FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlayCircle, ArrowLeft, Star, Heart, TrendingUp, Music, Library } from 'lucide-react';

const Home: FC = () => {
  return (
    <div className="overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-28 md:pt-32 md:pb-40 container mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] max-w-4xl opacity-30 pointer-events-none">
          <div className="absolute top-0 right-10 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 left-10 w-72 h-72 bg-secondary-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
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

          <h1 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight text-slate-900 leading-tight">
            رحلتك نحو <br className="md:hidden" />
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent leading-relaxed pb-2 inline-block">الإبداع الموسيقي</span> تبدأ هنا
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            منصة تعليمية متكاملة خطوة بخطوة؛ لتعلم النوتة، الإيقاع، والعزف بأحدث الأساليب التفاعلية الممتعة.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/program-structure" className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white rounded-xl font-bold text-lg hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/20 transition-all flex items-center justify-center gap-2 group">
              ابدأ رحلتك الآن
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
            <Link to="/activities" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 hover:shadow-md transition-all flex items-center justify-center gap-2">
              <PlayCircle size={24} className="text-secondary-500" />
              استكشف الأنشطة
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24 relative z-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">لماذا منصة مقام؟</h2>
            <p className="text-lg text-slate-600">نقدم تجربة تعليمية فريدة تدمج بين التأسيس الأكاديمي والمتعة التفاعلية لمختلف المهارات والمستويات.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Star className="text-amber-500" size={32} />,
                title: "منهجية متدرجة",
                desc: "منهج مصمم بعناية يبدأ معك من الصفر لتعلم الإيقاع والأساسيات وحتى اتقان العزف.",
                bg: "bg-amber-50",
                border: "border-amber-100"
              },
              {
                icon: <Music className="text-primary-500" size={32} />,
                title: "أنشطة تفاعلية",
                desc: "تدريبات عملية وممتعة تضمن تفاعل المتعلم وترسيخ المعلومات السمعية والحركية.",
                bg: "bg-primary-50",
                border: "border-primary-100"
              },
              {
                icon: <TrendingUp className="text-secondary-500" size={32} />,
                title: "تطوير مستمر",
                desc: "تحديثات دائمة للمكتبة الموسيقية مع تتبع آلي لتقدمك وتطور مهارتك.",
                bg: "bg-secondary-50",
                border: "border-secondary-100"
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className={`p-8 rounded-3xl border ${feature.border} ${feature.bg} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Tracks Preview */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">مسارات التعلم الأساسية</h2>
              <p className="text-lg text-slate-600">اختر المسار الذي يناسبك وابدأ تطوير قدراتك، نحن نغطي كافة الجوانب التي يحتاجها الموسيقي الشامل.</p>
            </div>
            <Link to="/activities" className="text-primary-600 hover:text-primary-700 font-bold flex items-center gap-2 whitespace-nowrap">
              تصفح التمارين <ArrowLeft size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { path: '/resources#time-signatures', title: 'أساسيات الإيقاع', image: '/card_rhythm.png' },
              { path: '/resources#western-scales', title: 'النغم والمقامات', image: '/card_melody.png' },
              { path: '/activities#lessons', title: 'التمارين الصوتية', image: '/card_vocal.png' },
              { path: '/program-structure', title: 'العزف الجماعي', image: '/card_group.png' },
            ].map((track, i) => (
              <Link to={track.path} key={i}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative h-72 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  {/* Background Image */}
                  <img src={track.image} alt={track.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  
                  {/* Overlay Gradient for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Content Container */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex justify-between items-center w-full">
                      <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-md">{track.title}</h3>
                      <div className="w-10 h-10 rounded-full bg-primary-500/80 text-white flex items-center justify-center backdrop-blur-md group-hover:bg-primary-500 group-hover:scale-110 transition-all shadow-lg">
                        <ArrowLeft size={20} />
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
          <div className="bg-primary-900 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
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
                <Link to="/resources" className="bg-white text-primary-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-50 hover:shadow-xl transition-all flex items-center gap-2">
                  <Library size={22} />
                  المكتبة الموسيقية
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credits Footer Section */}
      <section className="bg-white py-12 border-t border-slate-100 text-center">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div>
            <p className="text-sm text-slate-400 font-bold uppercase mb-1">تطوير برمجي وإعداد</p>
            <p className="text-lg font-bold text-slate-800">أ. هيثم بن غرم الله الزهراني</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-slate-200"></div>
          <div>
            <p className="text-sm text-slate-400 font-bold uppercase mb-1">بإشراف مدير المدرسة</p>
            <p className="text-lg font-bold text-slate-800">أ. حسام بن محمد يار</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
