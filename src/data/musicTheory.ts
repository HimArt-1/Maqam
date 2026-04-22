import { Music, Clock, Waves, LibraryBig } from 'lucide-react';

export interface TheorySection {
  id: string;
  title: string;
  icon: any; // Lucide Icon component
  description: string;
  content: string; // HTML string or structured data
}

export const musicTheoryData: TheorySection[] = [
  {
    id: "reading-notes",
    title: "أساسيات قراءة النوتة",
    icon: Music,
    description: "تعرف على المدرج الموسيقي، أسماء النغمات، ومفاتيح قراءة النوتة الرئيسية.",
    content: `
      <div class="space-y-6">
        <div>
          <h3 class="text-2xl font-bold text-slate-800 mb-3">المدرج الموسيقي (The Staff)</h3>
          <p class="text-slate-600 leading-relaxed mb-4">
            تُكتب الموسيقى على المدرج الموسيقي، وهو يتكون من <strong>خمسة خطوط أفقية متوازية وأربع مسافات</strong> بينها. تُقرأ الخطوط والمسافات دائماً من الأسفل إلى الأعلى.
            تُحدد أماكن النوتات على هذه الخطوط أو بينها الطبقة الصوتية (درجة حدة الصوت).
          </p>
          <div class="bg-primary-50 border border-primary-100 p-4 rounded-xl text-center font-bold text-primary-800">
            القاعدة الذهبية: كلما ارتفعت النوتة على المدرج، كلما كان الصوت أكثر حدة.
          </div>
        </div>

        <div>
          <h3 class="text-2xl font-bold text-slate-800 mb-3">مفاتيح الموسيقى (Clefs)</h3>
          <p class="text-slate-600 leading-relaxed mb-4">
            المفتاح هو رمز يوضع في بداية المدرج الموسيقي لتحديد أسماء الخطوط والمسافات. أشهر مفتاحين هما:
          </p>
          <ul class="list-disc list-inside space-y-3 text-slate-700 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <li><strong>مفتاح صول (Treble Clef):</strong> يُستخدم للأصوات الحادة (مثل الكمان، الناي، اليد اليمنى للبيانو). الخط الذي يبدأ منه رسم المفتاح (الخط الثاني من الأسفل) يُسمى دائماً صول (G).</li>
            <li><strong>مفتاح فا (Bass Clef):</strong> يُستخدم للأصوات الغليظة (مثل التشيلو، الجيتار البيس، اليد اليسرى للبيانو). الخط الذي يقع بين نقطتيه (الخط الرابع) يُسمى فا (F).</li>
          </ul>
        </div>

        <div>
          <h3 class="text-2xl font-bold text-slate-800 mb-3">أسماء النغمات الأساسية</h3>
          <p class="text-slate-600 leading-relaxed mb-2">
            السلم الموسيقي الأساسي يتكون من سبع نغمات تُقرأ كالتالي:
          </p>
          <div class="flex flex-wrap gap-2 mb-4 justify-center py-4">
            <span class="px-4 py-2 bg-slate-800 text-white font-bold rounded-lg shadow-md">دو (C)</span>
            <span class="px-4 py-2 bg-slate-800 text-white font-bold rounded-lg shadow-md">ري (D)</span>
            <span class="px-4 py-2 bg-slate-800 text-white font-bold rounded-lg shadow-md">مي (E)</span>
            <span class="px-4 py-2 bg-slate-800 text-white font-bold rounded-lg shadow-md">فا (F)</span>
            <span class="px-4 py-2 bg-slate-800 text-white font-bold rounded-lg shadow-md">صول (G)</span>
            <span class="px-4 py-2 bg-slate-800 text-white font-bold rounded-lg shadow-md">لا (A)</span>
            <span class="px-4 py-2 bg-slate-800 text-white font-bold rounded-lg shadow-md">سي (B)</span>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "time-signatures",
    title: "المقاييس الإيقاعية",
    icon: Clock,
    description: "تعرف على الأشكال الزمنية للنوتات والموازين الإيقاعية المختلفة.",
    content: `
      <div class="space-y-6">
        <div>
          <h3 class="text-2xl font-bold text-slate-800 mb-3">الأشكال الزمنية (Note Values)</h3>
          <p class="text-slate-600 leading-relaxed mb-4">
            شكل النوتة يحدد المدة الزمنية لبقائها (كم من الوقت يجب أن تصدر الصوت). وهذه هي الأشكال القياسية:
          </p>
          <div class="grid md:grid-cols-2 gap-4">
             <div class="border border-slate-200 rounded-xl p-4 flex items-center gap-4 bg-white shadow-sm">
                <div class="bg-indigo-100 text-indigo-700 w-12 h-12 flex items-center justify-center rounded-full font-bold">4</div>
                <div>
                  <h4 class="font-bold text-slate-800">المستديرة (الروند - Whole Note)</h4>
                  <p class="text-slate-500 text-sm">تمتد لقيمة 4 نبضات (أطول نوتة قياسية).</p>
                </div>
             </div>
             <div class="border border-slate-200 rounded-xl p-4 flex items-center gap-4 bg-white shadow-sm">
                <div class="bg-indigo-100 text-indigo-700 w-12 h-12 flex items-center justify-center rounded-full font-bold">2</div>
                <div>
                  <h4 class="font-bold text-slate-800">البيضاء (البلانش - Half Note)</h4>
                  <p class="text-slate-500 text-sm">تمتد لقيمة نبضتين (نصف مدة الروند).</p>
                </div>
             </div>
             <div class="border border-slate-200 rounded-xl p-4 flex items-center gap-4 bg-white shadow-sm">
                <div class="bg-indigo-100 text-indigo-700 w-12 h-12 flex items-center justify-center rounded-full font-bold">1</div>
                <div>
                  <h4 class="font-bold text-slate-800">السوداء (النوار - Quarter Note)</h4>
                  <p class="text-slate-500 text-sm">تمتد لزمن نبضة واحدة (الوحدة القياسية).</p>
                </div>
             </div>
             <div class="border border-slate-200 rounded-xl p-4 flex items-center gap-4 bg-white shadow-sm">
                <div class="bg-indigo-100 text-indigo-700 w-12 h-12 flex items-center justify-center rounded-full font-bold">½</div>
                <div>
                  <h4 class="font-bold text-slate-800">ذات السن (الكروش - Eighth Note)</h4>
                  <p class="text-slate-500 text-sm">تمتد لنصف زمن النبضة (سريعة).</p>
                </div>
             </div>
          </div>
        </div>

        <div class="mt-8">
          <h3 class="text-2xl font-bold text-slate-800 mb-3">الموازين الزمنية (Time Signatures)</h3>
          <p class="text-slate-600 leading-relaxed mb-4">
            يُكتب الميزان الزمني على شكل كسر بجوار مفتاح الموسيقى. يخبرنا كيف يتم تقسيم الإيقاع:
          </p>
          <div class="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl">
             <ul class="space-y-4">
               <li><strong class="text-amber-900 border border-amber-200 bg-amber-100 px-2 py-1 rounded">الميزان الرباعي 4/4</strong> الأكثر شيوعاً (Common Time). كل مازورة (مقياس) تحتوي على 4 نبضات (نوار).</li>
               <li><strong class="text-amber-900 border border-amber-200 bg-amber-100 px-2 py-1 rounded">الميزان الثلاثي 3/4</strong> ميزان الفالس (Waltz). كل مازورة تحتوي على 3 نبضات. يعطي إحساساً بالدوران.</li>
               <li><strong class="text-amber-900 border border-amber-200 bg-amber-100 px-2 py-1 rounded">الميزان الثنائي 2/4</strong> ميزان المارشات العسكرية الحماسية. كل مازورة بها نبضتين.</li>
             </ul>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "western-scales",
    title: "المقامات الغربية",
    icon: LibraryBig,
    description: "أسس نظام السلالم الغربية، الأبعاد، والمسافات (Major & Minor).",
    content: `
       <div class="space-y-6">
        <div>
          <h3 class="text-2xl font-bold text-slate-800 mb-3">نظام الأبعاد والمسافات</h3>
          <p class="text-slate-600 leading-relaxed mb-4">
            الموسيقى الغربية تعتمد على تقسيم الأوكتاف (الديوان) إلى 12 نصف بعد متساوٍ (Semitone).
            "البعد الكامل" (Tone) يساوي مسافة مفتاحين متتاليين على البيانو، و"نصف البعد" (Semitone) يساوي الانقطاع الفوري من مفتاح لآخر ملاصق له مباشرة (سواء أبيض أو أسود).
          </p>
        </div>

        <div>
          <h3 class="text-2xl font-bold text-slate-800 mb-3">السلم الكبير (Major Scale)</h3>
          <p class="text-slate-600 leading-relaxed mb-4">
            يتميز بطابعه السعيد، المشرق والمستقر. يُبنى دائماً على ترتيب محدد جداً للأبعاد:
          </p>
          <div class="flex justify-center bg-slate-900 text-white p-4 rounded-xl font-mono text-lg tracking-widest my-4">
             بعد - بعد - نصف بعد - بعد - بعد - بعد - نصف بعد
          </div>
          <p class="text-slate-600 leading-relaxed">
            مثال: سلم (C Major - دو الكبير) هو السلم الوحيد الذي لا يحتوي على أي علامات تحويل (شيب/دیز) ويتكون من المفاتيح البيضاء فقط.
          </p>
        </div>

        <div class="mt-6">
          <h3 class="text-2xl font-bold text-slate-800 mb-3">السلم الصغير (Minor Scale)</h3>
          <p class="text-slate-600 leading-relaxed mb-4">
            يعطي إحساساً بالحزن، الشجن، والدراما. بناء الأبعاد فيه يختلف، مما يغير من طبيعته:
          </p>
          <div class="flex justify-center bg-slate-800 text-slate-300 p-4 rounded-xl font-mono text-lg tracking-widest my-4">
             بعد - نصف بعد - بعد - بعد - نصف بعد - بعد - بعد
          </div>
           <p class="text-slate-600 leading-relaxed">
            مثال: سلم لا الصغير الطبيعي (A Natural Minor) يستخدم نفس الإشارات مثل سلم دو الكبير، لكن يبدأ من درجة لا؛ فيبدو أكثر حزناً وهدوءاً من السلم الكبير.
          </p>
        </div>
      </div>
    `
  },
  {
    id: "eastern-maqams",
    title: "المقامات الشرقية",
    icon: Waves,
    description: "فلسفة الربع تون وأشهر المقامات الموسيقية الشرقية الأصيلة.",
    content: `
      <div class="space-y-6">
        <div>
          <h3 class="text-2xl font-bold text-slate-800 mb-3">الربع تون (Quarter Tone) السر الشرقي</h3>
          <p class="text-slate-600 leading-relaxed mb-4">
            تتميز الموسيقى الشرقية والأسيوية عن الغربية باحتوائها على مسافات دقيقة جداً تُسمى "أرباع التون".
            على البيانو العادي، أصغر مسافة هي نصف البعد، لكن في الموسيقى الشرقية، نجد نغمات تقع في المنتصف بالضبط بين مفتاحين متتاليين على البيانو.
            لذلك لا يمكن عزف بعض المقامات الشرقية الصرفة على البيانو التقليدي دون تعديل.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 mt-6">
           <div class="bg-gradient-to-b from-rose-50 to-white border border-rose-100 p-6 rounded-2xl shadow-sm text-center transform transition hover:scale-105">
              <h4 class="text-2xl font-bold text-rose-800 mb-3">الراست (Rast)</h4>
              <p class="text-slate-600 text-sm leading-relaxed">
                سيد المقامات وملكها، يمثل الشموخ، الفخر والاعتدال. يعتبر المقام الأساسي عند العرب. درجاته تحتوي على (مي نصف بيمول) و(سي نصف بيمول).
              </p>
           </div>
           
           <div class="bg-gradient-to-b from-sky-50 to-white border border-sky-100 p-6 rounded-2xl shadow-sm text-center transform transition hover:scale-105">
              <h4 class="text-2xl font-bold text-sky-800 mb-3">البياتي (Bayati)</h4>
              <p class="text-slate-600 text-sm leading-relaxed">
                مقام يعبر عن الشجن والحنين والعاطفة الجياشة. يُعتبر من أكثر المقامات انتشاراً وشعبية في بلاد الشام ومصر والجزيرة العربية.
              </p>
           </div>

           <div class="bg-gradient-to-b from-emerald-50 to-white border border-emerald-100 p-6 rounded-2xl shadow-sm text-center transform transition hover:scale-105">
              <h4 class="text-2xl font-bold text-emerald-800 mb-3">السيكاه (Sikah)</h4>
              <p class="text-slate-600 text-sm leading-relaxed">
                مقام ذو طابع خاص يبدأ بنغمة تحمل ربع تون (مثل المي نصف بيمول)، يعطي إحساساً بالتأصيل والتراث القديم. يستعمل كثيراً في تلاوة القرآن والفلكلور.
              </p>
           </div>
        </div>

        <div class="bg-slate-900 text-white p-6 rounded-2xl mt-8">
           <p class="text-center font-bold text-lg mb-2">ملاحظة هندسية</p>
           <p class="text-slate-400 text-center text-sm">
             اليوم توفر أجهزة الأورج الحديثة ميزة (Scale Tuning) التي تتيح عزل مفاتيح معينة لنقصان التردد بمقدار -50 Cents للحصول على الربع التون.
           </p>
        </div>
      </div>
    `
  }
];
