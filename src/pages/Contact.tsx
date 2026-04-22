import { FC } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: FC = () => {
  return (
    <div className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">تواصل معنا</h1>
          <p className="text-lg text-slate-600">
            نحن هنا للإجابة على استفساراتكم ودعمكم في رحلتكم لتعلم الموسيقى. لا تتردد في مراسلتنا في أي وقت.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="w-full lg:w-1/3 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition">
              <div className="bg-primary-50 p-3 rounded-2xl text-primary-600">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 text-lg">راسلنا عبر البريد</h3>
                <p className="text-slate-500 mb-2 text-sm">للرد خلال 24 ساعة</p>
                <a href="mailto:him.music@hotmail.com" className="text-primary-600 font-medium">him.music@hotmail.com</a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition">
              <div className="bg-secondary-50 p-3 rounded-2xl text-secondary-600">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 text-lg">اتصل بنا</h3>
                <p className="text-slate-500 mb-2 text-sm">من الأحد للخميس (9ص - 5م)</p>
                <a href="tel:+966500010299" className="text-secondary-600 font-medium hover:underline" dir="ltr">+966 500010299</a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition">
              <div className="bg-teal-50 p-3 rounded-2xl text-teal-600">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 text-lg">المقر الرئيسي</h3>
                <p className="text-slate-600 leading-relaxed font-medium">المنطقة الشرقية، المملكة العربية السعودية</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-2/3 bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
            <h2 className="text-2xl font-bold mb-8 text-slate-900">أرسل رسالتك</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">الاسم الكامل</label>
                  <input type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition" placeholder="محمد أحمد" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">البريد الإلكتروني</label>
                  <input type="email" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition" placeholder="example@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">الموضوع</label>
                <input type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition" placeholder="عن ماذا تستفسر؟" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">الرسالة</label>
                <textarea rows={5} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none" placeholder="اكتب رسالتك هنا..."></textarea>
              </div>
              <button type="button" className="w-full bg-primary-600 text-white font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-700 transition">
                <Send size={20} />
                إرسال الرسالة
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
