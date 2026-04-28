import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Info, Heart, Layers, Activity, Library, MessageCircle, Phone, AudioLines, Music, Sparkles } from 'lucide-react';

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'الرئيسية', path: '/', icon: Home },
    { name: 'من نحن', path: '/about', icon: Info },
    { name: 'فوائد الموسيقى', path: '/benefits', icon: Heart },
    { name: 'هيكل التعلم', path: '/program-structure', icon: Layers },
    { name: 'الأنشطة والتدريبات', path: '/activities', icon: Activity },
    { name: 'استوديو العزف', path: '/studio', icon: AudioLines },
    { name: 'المصادر', path: '/resources', icon: Library },
    { name: 'الأسئلة الشائعة', path: '/faq', icon: MessageCircle },
    { name: 'اتصل بنا', path: '/contact', icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/70 shadow-[0_8px_32px_-12px_rgba(27,54,38,0.08)] backdrop-blur-xl transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-tr from-primary-400 to-secondary-400 rounded-2xl flex items-center justify-center p-2.5 shadow-md group-hover:shadow-lg transition-transform group-hover:scale-105 group-active:scale-95 relative overflow-hidden">
              <Sparkles size={14} className="text-white absolute top-1 right-1 opacity-70" />
              <Music size={28} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                مـقـام
              </h1>
              <p className="text-sm text-primary-600 font-bold tracking-wide">عالم الموسيقى الممتع</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-primary-600" : "text-gray-400"} />
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full">
          <nav className="flex flex-col px-4 py-4 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-md font-medium transition-all ${
                    isActive 
                    ? 'bg-primary-50 text-primary-700 border-r-4 border-primary-500' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} className={isActive ? "text-primary-500" : "text-gray-400"} />
                  {link.name}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
