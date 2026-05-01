import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { MAQAM_LOGO_SRC } from '../constants/brand';

const Footer: FC = () => {
  return (
    <footer className="bg-slate-950 text-white pt-14 pb-8 border-t-2 border-primary-500/40 relative overflow-hidden">
      {/* خلفية محيطية */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 rounded-full bg-primary-600/6 blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-emerald-600/5 blur-3xl pointer-events-none" aria-hidden />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* الهوية */}
          <div>
            <Link to="/" className="group flex items-center gap-3 mb-5 w-fit">
              <div className="relative w-12 h-12 shrink-0 rounded-xl overflow-hidden bg-neutral-950 ring-1 ring-white/10 group-hover:ring-emerald-400/30 transition-all shadow-lg">
                <img
                  src={MAQAM_LOGO_SRC}
                  alt="مقام — أكاديمية الموسيقى"
                  className="h-full w-full object-contain scale-[0.9]"
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="text-xl font-black text-white group-hover:text-emerald-300 transition-colors">مقام</span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm mb-6 max-w-[220px]">
              منصة تعليمية موسيقية متكاملة تهدف إلى نشر ثقافة الإبداع الموسيقي عبر أسس منهجية حديثة وممتعة.
            </p>
            <div className="flex gap-2.5">
              {(['يوتيوب', 'إنستغرام', 'تويتر'] as const).map((label) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 text-slate-400 hover:bg-primary-500 hover:text-white transition-all duration-200 hover:-translate-y-0.5 text-xs font-bold"
                  style={{ willChange: 'transform' }}
                >
                  {label === 'يوتيوب' ? '▶' : label === 'إنستغرام' ? '◉' : '✕'}
                </a>
              ))}
            </div>
          </div>

          {/* روابط سريعة */}
          <div>
            <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-primary-500 rounded-full block" />
              روابط سريعة
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: '/', label: 'الرئيسية' },
                { to: '/about', label: 'من نحن' },
                { to: '/benefits', label: 'فوائد الموسيقى' },
                { to: '/program-structure', label: 'منهجية التعلم' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-slate-400 hover:text-primary-300 transition-colors flex items-center gap-2 group/link">
                    <span className="text-primary-500/60 group-hover/link:text-primary-400 transition-colors text-xs">◀</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* المصادر */}
          <div>
            <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-emerald-500 rounded-full block" />
              المصادر والدعم
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: '/activities', label: 'الأنشطة والتدريبات' },
                { to: '/resources', label: 'المكتبة الموسيقية' },
                { to: '/faq', label: 'الأسئلة الشائعة' },
                { to: '/contact', label: 'مركز المساعدة' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-slate-400 hover:text-emerald-300 transition-colors flex items-center gap-2 group/link">
                    <span className="text-emerald-500/60 group-hover/link:text-emerald-400 transition-colors text-xs">◀</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* التواصل */}
          <div>
            <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-teal-500 rounded-full block" />
              تواصل معنا
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-teal-400 mt-0.5">
                  <Mail size={15} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-300 mb-0.5">البريد الإلكتروني</p>
                  <a href="mailto:him.music@hotmail.com" className="text-slate-400 hover:text-white transition-colors">him.music@hotmail.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-teal-400 mt-0.5">
                  <Phone size={15} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-300 mb-0.5">الهاتف</p>
                  <a href="tel:+966500010299" className="text-slate-400 hover:text-white transition-colors" dir="ltr">+966 500010299</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-teal-400 mt-0.5">
                  <MapPin size={15} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-300 mb-0.5">المقر الرئيسي</p>
                  <p className="text-slate-400">المنطقة الشرقية، المملكة العربية السعودية</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* حقوق النشر */}
        <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-slate-500 text-xs">
            © 2026 منصة مقام التعليمية. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-5 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">شروط الاستخدام</a>
            <a href="#" className="hover:text-slate-300 transition-colors">سياسة الخصوصية</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
