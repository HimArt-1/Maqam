import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Youtube, Twitter } from 'lucide-react';

const Footer: FC = () => {
  return (
    <footer className="bg-primary-950 text-white pt-16 pb-8 border-t-4 border-primary-500 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-primary-600/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-secondary-600/10 blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6 inline-block">
              <div className="bg-white rounded-xl p-1 border border-white/20 inline-flex items-center justify-center">
                <img src="/icon.png" alt="أيقونة المنصة" className="w-10 h-10 object-contain" />
              </div>
              <h1 className="text-2xl font-bold align-middle inline-block">
                منصة مقام
              </h1>
            </Link>
            <p className="text-slate-400 leading-relaxed mb-6 w-5/6">
              منصة تعليمية موسيقية متكاملة تهدف إلى نشر ثقافة الإبداع الموسيقي والارتقاء بمهارات المبتدئين والمتعلمين عبر أسس منهجية حديثة وممتعة.
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-white/5 hover:bg-primary-500 hover:text-white p-2.5 rounded-lg text-slate-300 transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="bg-white/5 hover:bg-primary-500 hover:text-white p-2.5 rounded-lg text-slate-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-white/5 hover:bg-primary-500 hover:text-white p-2.5 rounded-lg text-slate-300 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-primary-500 rounded-full block"></span>
              روابط سريعة
            </h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-400 hover:text-primary-300 transition flex items-center gap-2 pr-2 hover:pr-4"><span className="text-primary-500 text-xs text-xs">◀</span>الرئيسية</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-primary-300 transition flex items-center gap-2 pr-2 hover:pr-4"><span className="text-primary-500 text-xs">◀</span>من نحن</Link></li>
              <li><Link to="/benefits" className="text-slate-400 hover:text-primary-300 transition flex items-center gap-2 pr-2 hover:pr-4"><span className="text-primary-500 text-xs">◀</span>فوائد الموسيقى</Link></li>
              <li><Link to="/program-structure" className="text-slate-400 hover:text-primary-300 transition flex items-center gap-2 pr-2 hover:pr-4"><span className="text-primary-500 text-xs">◀</span>منهجية التعلم</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-secondary-500 rounded-full block"></span>
              المصادر والدعم
            </h3>
            <ul className="space-y-3">
              <li><Link to="/activities" className="text-slate-400 hover:text-secondary-300 transition flex items-center gap-2 pr-2 hover:pr-4"><span className="text-secondary-500 text-xs">◀</span>الأنشطة والتدريبات</Link></li>
              <li><Link to="/resources" className="text-slate-400 hover:text-secondary-300 transition flex items-center gap-2 pr-2 hover:pr-4"><span className="text-secondary-500 text-xs">◀</span>المكتبة الموسيقية</Link></li>
              <li><Link to="/faq" className="text-slate-400 hover:text-secondary-300 transition flex items-center gap-2 pr-2 hover:pr-4"><span className="text-secondary-500 text-xs">◀</span>الأسئلة الشائعة</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-secondary-300 transition flex items-center gap-2 pr-2 hover:pr-4"><span className="text-secondary-500 text-xs">◀</span>مركز المساعدة</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-teal-500 rounded-full block"></span>
              تواصل معنا
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="bg-white/5 p-2 rounded-lg text-teal-400 mt-1">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200 mb-0.5">راسلنا عبر البريد</p>
                  <a href="mailto:him.music@hotmail.com" className="text-slate-300 hover:text-white transition">him.music@hotmail.com</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-white/5 p-2 rounded-lg text-teal-400 mt-1">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200 mb-0.5">اتصل بنا</p>
                  <a href="tel:+966500010299" className="text-slate-300 hover:text-white transition" dir="ltr">+966 500010299</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-white/5 p-2 rounded-lg text-teal-400 mt-1">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200 mb-0.5">المقر الرئيسي</p>
                  <p className="text-slate-300 leading-relaxed">المنطقة الشرقية، المملكة العربية السعودية</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
        
        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 منصة مقام التعليمية. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-4 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition">شروط الاستخدام</a>
            <a href="#" className="hover:text-white transition">سياسة الخصوصية</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
