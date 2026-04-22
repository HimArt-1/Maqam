/** روابط اختيارية لمراجعة نظرية مرتبطة من صفحة المصادر */
export interface TheoryLink {
  label: string;
  hash: string;
}

export interface LessonStep {
  instruction: string;
  targetNote: string;
  /** تلميح بصري/حركي دون إطالة */
  hint?: string;
}

export interface Lesson {
  id: string;
  level: number;
  title: string;
  description: string;
  steps: LessonStep[];
  /** عنوان الوحدة كما يظهر في قائمة الأنشطة */
  unitTitle: string;
  /** ترتيب الوحدة في المنهج */
  unitIndex: number;
  /** مدة تقديرية للجلسة */
  durationRange: string;
  /** أهداف قصيرة وقابلة للقياس */
  objectives: string[];
  /** شرح بلغة يومية قبل المصطلحات */
  inPlainWords: string;
  /** توجيه للمعلّم أو ولي الأمر */
  educatorNote?: string;
  /** جملة تختتم الدرس بعد الإنجاز */
  takeaway: string;
  relatedTheory?: TheoryLink[];
}

const U1 = 'الوحدة ١: عالم المفاتيح والصوت الأول';
const U2 = 'الوحدة ٢: حركة أوسع وثبات في الإيقاع';
const U3 = 'الوحدة ٣: السلالم — بناء وفهم';
const U4 = 'الوحدة ٤: التآلفات — أكثر من نغمة';
const U5 = 'الوحدة ٥: ألحان وتطبيق موسيقي';
const U6 = 'الوحدة ٦: مغامرات لحنية وألوان جديدة';

export const curriculum: Lesson[] = [
  {
    id: 'basics-warmup',
    unitIndex: 1,
    unitTitle: U1,
    level: 1,
    title: 'تدفئة: دو وري',
    description: 'درس قصير للتعود على الصوت والانتقال بين أول نغمتين على لوحة المفاتيح.',
    durationRange: '٣–٦ دقائق',
    inPlainWords:
      'نبدأ بأبسط حركة: نغمة ثم الجارة فوقها. لا نحتاج سرعة؛ المهم أن يُسمع الفرق بين «أخفض» و«أعلى قليلاً».',
    objectives: [
      'تمييز موقع دو الوسط (C4) على الشاشة أو الكيبورد.',
      'الانتقال بثقة إلى ري (D4) والعودة إلى دو.',
      'ربط النظر بالمفتاح قبل الضغط (تخطيط بسيط).',
    ],
    educatorNote:
      'اسمح بوقت كافٍ بين النغمات. التكرار الهادئ أفضل من الإسراع. يمكن قول أسماء النغم بصوت عالٍ مع المتعلّم.',
    takeaway: 'أصبحت تعرف أن «الجوار» يغيّر ارتفاع الصوت خطوة بخطوة.',
    relatedTheory: [{ label: 'أسماء النغمات على المدرج', hash: 'reading-notes' }],
    steps: [
      { instruction: 'اعزف مفتاح دو (C4) برفق.', targetNote: 'C4', hint: 'أول مفتاح أبيض قبل زوج المفاتيح السوداء.' },
      { instruction: 'انتقل إلى المفتاح المجاور للأعلى: ري (D4).', targetNote: 'D4', hint: 'مباشرة يمين دو (في اتجاه الجرس الأعلى).' },
      { instruction: 'ارجع إلى دو (C4) مرة أخرى.', targetNote: 'C4' },
      { instruction: 'أنهِ التدفئة على مفتاح ري (D4).', targetNote: 'D4' },
    ],
  },
  {
    id: 'basics-1',
    unitIndex: 1,
    unitTitle: U1,
    level: 1,
    title: 'المفاتيح البيضاء الأساسية',
    description: 'التعرف على دو، ري، مي (C, D, E) وعزفها بالترتيب.',
    durationRange: '٥–٨ دقائق',
    inPlainWords:
      'ثلاث نغمات متجاورة تشكل بداية سلم دو الكبير. نتعلم أين تقع وكيف تتسلسل «للأعلى».',
    objectives: ['إيجاد دو وري ومي على لوحة العزف.', 'عزف التسلسل صعوداً بانتظام.', 'تعزيز الربط بين الاسم العربي/اللاتيني والمفتاح.'],
    educatorNote: 'إن أخطأ المتعلّم نغمة، أعد قراءة التعليمة فقط دون انتقاد؛ المنصة تصحح تلقائياً عند النغمة الصحيحة.',
    takeaway: 'رسمت في ذهنك أول ثلاث درجات من سلم دو على المفاتيح البيضاء.',
    relatedTheory: [{ label: 'أسماء النغمات', hash: 'reading-notes' }],
    steps: [
      { instruction: 'ابحث عن مفتاح دو (C4) — أول أبيض قبل المفتاحين السود.', targetNote: 'C4' },
      { instruction: 'رائع! الآن اعزف مفتاح ري (D4) المجاور.', targetNote: 'D4' },
      { instruction: 'ممتاز! أخيراً اعزف مفتاح مي (E4).', targetNote: 'E4' },
    ],
  },
  {
    id: 'basics-2',
    unitIndex: 1,
    unitTitle: U1,
    level: 1,
    title: 'تمارين القفز والاستقرار',
    description: 'الانتقال بين دو، مي، وصول مع «تخطي» نغمات — تمرين ذهني وليس فقط حركي.',
    durationRange: '٦–١٠ دقائق',
    inPlainWords:
      'بدل الضغط على كل مفتاح متجاور، ن«قفز» فوق نغمة. هذا يدرب الذاكرة المكانية: أين مي إذا تركنا ري؟',
    objectives: ['تنفيذ قفزات صغيرة بثبات.', 'سماع فرق البعد بين النغمات غير المتجاورة.', 'الإنهاء بنغمة راحة (مي).'],
    educatorNote: 'يمكن الإشارة بإصبع إلى المسافة على الهواء قبل العزف؛ بعض المتعلمين يستفيدون من الإيماء البطيء.',
    takeaway: 'فهمت أن العزف ليس «متجاوراً دائماً» — يمكن القفز والعودة بأمان.',
    relatedTheory: [{ label: 'السلم الكبير مقدمة', hash: 'western-scales' }],
    steps: [
      { instruction: 'ابدأ بمفتاح دو (C4).', targetNote: 'C4' },
      { instruction: 'تخطَّ ري، واعزف مي (E4).', targetNote: 'E4', hint: 'تخطّ مفتاحاً أبيضاً واحداً.' },
      { instruction: 'تخطَّ فا، واعزف صول (G4).', targetNote: 'G4' },
      { instruction: 'انزل واعزف مي (E4) لإنهاء التدريب.', targetNote: 'E4' },
    ],
  },
  {
    id: 'basics-black-duo',
    unitIndex: 1,
    unitTitle: U1,
    level: 1,
    title: 'لمسة أولى على المفاتيح السوداء',
    description: 'فا دييز وصول دييز (F# و G#) — لون صوتي مختلف قليلاً.',
    durationRange: '٥–٨ دقائق',
    inPlainWords:
      'المفاتيح السوداء ليست «أصعب»؛ هي مجرد نغمات بين البيضاء. نلمس اثنين قريبين ونستمع للتوتر والحل البسيط.',
    objectives: ['تخفيف الخوف من المفاتيح السوداء.', 'عزف F#4 و G#4 بوضوح.', 'مقارنة اللون الصوتي مع البيضاء المجاورة لاحقاً.'],
    educatorNote: 'الصوت قد يبدو «أغمق»؛ خفّض مستوى الصوت من إعدادات إن لزم عبر لوحة إمكانية الوصول.',
    takeaway: 'أدركت أن السوداء جزء طبيعي من اللوحة، وليست استثناءً.',
    relatedTheory: [{ label: 'أبعاد ونصف بعد', hash: 'western-scales' }],
    steps: [
      { instruction: 'اعزف فا دييز (F#4) — الأسود بين فا وصول.', targetNote: 'F#4' },
      { instruction: 'الآن اعزف صول دييز (G#4) بين صول ولا.', targetNote: 'G#4' },
      { instruction: 'لخص التمرين بفا دييز (F#4) واستمع.', targetNote: 'F#4' },
    ],
  },
  {
    id: 'melody-fga-ladder',
    unitIndex: 1,
    unitTitle: U1,
    level: 1,
    title: 'جملة صعود وهبوط',
    description: 'فا — صول — لا — صعوداً ثم هبوطاً؛ جملة موسيقية صغيرة كاملة.',
    durationRange: '٦–١٠ دقائق',
    inPlainWords:
      'مثل تسلق درجتين ثم النزول: نفس المسار للعودة. هذا يشبه كثيراً بدايات الألحان البسيطة.',
    objectives: ['عزف خمس نغمات بترتيب منطقي.', 'الإحساس بـ«ذروة» على لا ثم الهدوء نحو فا.', 'تثبيت اليد في منطقة الوسط.'],
    educatorNote: 'غنِّ الجملة على مقطع «صعود—ذروة—نزول» بصوتك؛ يربط السمع بالحركة.',
    takeaway: 'عزفت جملة قصيرة لها بداية ونهاية — مثل جملة كلام.',
    relatedTheory: [{ label: 'السلم الكبير', hash: 'western-scales' }],
    steps: [
      { instruction: 'ابدأ من فا (F4).', targetNote: 'F4' },
      { instruction: 'اصعد إلى صول (G4).', targetNote: 'G4' },
      { instruction: 'اصعد إلى لا (A4).', targetNote: 'A4' },
      { instruction: 'انزل خطوة إلى صول (G4).', targetNote: 'G4' },
      { instruction: 'أنهِ على فا (F4).', targetNote: 'F4' },
    ],
  },
  {
    id: 'interval-fifth-cg',
    unitIndex: 2,
    unitTitle: U2,
    level: 2,
    title: 'الخامسة الصافية: دو وصول',
    description: 'نسمع «مدى» موسيقي واسعاً بين دو وصول ثم نربطه بدو أعلى.',
    durationRange: '٦–١٠ دقائق',
    inPlainWords:
      'عندما نعدّ من دو إلى صول نحصل على علاقة قوية ومستقرة تُسمى خامسة. كثير من الألحان والكوردات تعتمد عليها.',
    objectives: ['عزف قفزة واسعة بثبات من C4 إلى G4.', 'سماع استقرار الخامسة.', 'ربط G4 بـ C5 كتأكيد لنفس «عائلة» دو.'],
    educatorNote: 'شجع النظر إلى المفتاح الهدف قبل اللمس؛ القفز الواسع يحتاج تخطيطاً بصرياً.',
    takeaway: 'عرفت أن دو وصول «أصدقاء» في النظام الغربي — أساس الكثير من الألحان.',
    relatedTheory: [{ label: 'السلم والدرجات', hash: 'western-scales' }],
    steps: [
      { instruction: 'اعزف دو الوسط (C4).', targetNote: 'C4' },
      { instruction: 'اقفز إلى صول (G4) في نفس المنطقة.', targetNote: 'G4', hint: 'تخطَّ عدة مفاتيح؛ استهدف صول بوضوح.' },
      { instruction: 'اصعد إلى دو العليا (C5).', targetNote: 'C5' },
      { instruction: 'أعد سماع الخامسة: صول (G4) بعد دو العليا.', targetNote: 'G4' },
    ],
  },
  {
    id: 'rhythm-1',
    unitIndex: 2,
    unitTitle: U2,
    level: 2,
    title: 'النزول السلس (أصابع متتالية)',
    description: 'نزول من فا إلى دو، مفتاحاً بعد مفتاح — تدريب انسيابي.',
    durationRange: '٦–١٠ دقائق',
    inPlainWords:
      'نرجع «سلماً» لأسفل دون قفز. الحركة تشبه الزحف البطيء على المفاتيح؛ مفيدة للتحكم والاسترخاء.',
    objectives: ['تنفيذ أربع نغمات متتالية نازلة.', 'الإنهاء على دو كمحطة راحة.', 'تقليل التوتر في اليد عند التتابع.'],
    educatorNote: 'إن تعثّر المتعلّم، اجعل التمرين نصف سرعة مع عدّ صامت ١-٢-٣ بين النغمات.',
    takeaway: 'تمرّنت على النزول المنظم — مهارة أساسية قبل الألحان السريعة.',
    relatedTheory: [{ label: 'قيم النوتات والميزان', hash: 'time-signatures' }],
    steps: [
      { instruction: 'اعزف فا (F4) — أبيض قبل مجموعة الثلاثة السوداء.', targetNote: 'F4' },
      { instruction: 'ارجع خطوة واعزف مي (E4).', targetNote: 'E4' },
      { instruction: 'ارجع خطوة واعزف ري (D4).', targetNote: 'D4' },
      { instruction: 'أنهِ على دو (C4) بنغمة مستقرة.', targetNote: 'C4' },
    ],
  },
  {
    id: 'rhythm-twinkle-a',
    unitIndex: 2,
    unitTitle: U2,
    level: 2,
    title: 'لحن بسيط: بداية «توينكل»',
    description: 'أول مقطع من أغنية معروفة — نفس النغمة مرتين ثم حركة قصيرة.',
    durationRange: '٨–١٢ دقيقة',
    inPlainWords:
      'الأطفال يعرفون هذا اللحن. التكرار يساعد الذاكرة: نعزف نغمتين متطابقتين ثم نصعد ونكرر نمطاً مشابهاً.',
    objectives: ['تكرار نغمة بنفس الصبر.', 'ربط الإيقاع البسيط (تكرار) بالحركة على اللوحة.', 'تجربة شعور «أغنية» كاملة جزئياً.'],
    educatorNote: 'يمكن التصفيق بلطف على نبضتين قبل العزف لإحساس الزمن دون تعقيد نظري.',
    takeaway: 'لاحظت أن التكرار في اللحن يجعل الحفظ أسهل.',
    relatedTheory: [{ label: 'المقاييس الإيقاعية', hash: 'time-signatures' }],
    steps: [
      { instruction: 'النغمة الأولى من اللحن: دو (C4).', targetNote: 'C4', hint: 'نفس النغمة ستأتي مرة ثانية في الخطوة التالية.' },
      { instruction: 'النغمة الثانية: دو (C4) مرة أخرى.', targetNote: 'C4' },
      { instruction: 'انتقل إلى صول (G4).', targetNote: 'G4' },
      { instruction: 'كرر صول (G4).', targetNote: 'G4' },
      { instruction: 'اعزف لا (A4).', targetNote: 'A4' },
      { instruction: 'كرر لا (A4).', targetNote: 'A4' },
      { instruction: 'أنهِ المقطع على صول (G4).', targetNote: 'G4' },
    ],
  },
  {
    id: 'scale-1',
    unitIndex: 3,
    unitTitle: U3,
    level: 3,
    title: 'سلم دو الكبير (صعوداً)',
    description: 'ثماني درجات من دو إلى دو العليا — أساس النظام الغربي.',
    durationRange: '١٠–١٥ دقيقة',
    inPlainWords:
      '«سلم» يعني تسلسل نغمات مرتبة. في دو الكبير كل المفاتيح بيضاء هنا، لذا يسهل تتبعها خطوة فوق خطوة.',
    objectives: ['عزف السلم صعوداً دون تخطٍّ.', 'تسمية الدرجات من الأولى إلى الثامنة.', 'الإحساس ب«وصول» دو العليا كخاتمة الصعود.'],
    educatorNote: 'قسّم السلم إلى جزئين: دو–فا ثم صول–دو العليا إن احتاج المتعلّم راحة.',
    takeaway: 'أتقنت صعود سلم دو الكبير — مرجعك لمعظم التمارين القادمة.',
    relatedTheory: [{ label: 'بناء السلم الكبير', hash: 'western-scales' }],
    steps: [
      { instruction: 'الدرجة ١: دو (C4)', targetNote: 'C4' },
      { instruction: 'الدرجة ٢: ري (D4)', targetNote: 'D4' },
      { instruction: 'الدرجة ٣: مي (E4)', targetNote: 'E4' },
      { instruction: 'الدرجة ٤: فا (F4)', targetNote: 'F4' },
      { instruction: 'الدرجة ٥: صول (G4)', targetNote: 'G4' },
      { instruction: 'الدرجة ٦: لا (A4)', targetNote: 'A4' },
      { instruction: 'الدرجة ٧: سي (B4)', targetNote: 'B4' },
      { instruction: 'الدرجة ٨ (الجواب): دو (C5)', targetNote: 'C5' },
    ],
  },
  {
    id: 'scale-down-c',
    unitIndex: 3,
    unitTitle: U3,
    level: 3,
    title: 'سلم دو الكبير: النزول',
    description: 'نفس الدرجات من الأعلى إلى الأسفل — توازن عضلي وذهني.',
    durationRange: '٨–١٢ دقيقة',
    inPlainWords:
      'النزول يحتاج انتباهاً مماثلاً للصعود؛ أحياناً يكون أصعب لأن العين تعود لليسار (في لوحة معينة).',
    objectives: ['عزف السلم نزولاً كاملاً.', 'تثبيت نهاية مستقرة على دو الوسط.', 'مقارنة الإحساس بين الصعود والهبوط.'],
    educatorNote: 'شجع العدّ الصامت من ٨ إلى ١ إن ساعد ذلك على عدم تخطي درجة.',
    takeaway: 'أصبحت تتحكم بالسلم في الاتجاهين — مهارة أساسية قبل الألحان الطويلة.',
    relatedTheory: [{ label: 'السلم الكبير', hash: 'western-scales' }],
    steps: [
      { instruction: 'ابدأ من دو العليا (C5).', targetNote: 'C5' },
      { instruction: 'سي (B4).', targetNote: 'B4' },
      { instruction: 'لا (A4).', targetNote: 'A4' },
      { instruction: 'صول (G4).', targetNote: 'G4' },
      { instruction: 'فا (F4).', targetNote: 'F4' },
      { instruction: 'مي (E4).', targetNote: 'E4' },
      { instruction: 'ري (D4).', targetNote: 'D4' },
      { instruction: 'استقر على دو (C4).', targetNote: 'C4' },
    ],
  },
  {
    id: 'scale-pentatonic-c',
    unitIndex: 3,
    unitTitle: U3,
    level: 3,
    title: 'سلم بنتاتوني على دو',
    description: 'خمس نغمات (بدون فا ولا سي) — صوت «مفتوح» يستخدم في كثير من الثقافات.',
    durationRange: '٨–١٢ دقيقة',
    inPlainWords:
      'نترك نغمتين من السلم الكامل؛ النتيجة لحنية مرنة وقليلة التوتر. مفيدة للارتجال المبكر والاستماع.',
    objectives: ['عزف تسلسل دو–ري–مي–صول–لا–دو العليا.', 'فهم أن «بنتاتوني» لا يعني عشوائياً بل نمطاً محدداً.', 'تجربة صوت مختلف عن السلم الكامل.'],
    educatorNote: 'اربط الدرس بموسيقى يعرفها المتعلّم (مثلاً أفلام أو تراث) دون إلزامه بأسماء.',
    takeaway: 'تعرفت على سلم أقصر لكنه موسيقي جداً — مدخل للارتجال.',
    relatedTheory: [{ label: 'المقامات والأبعاد', hash: 'eastern-maqams' }],
    steps: [
      { instruction: 'دو (C4).', targetNote: 'C4' },
      { instruction: 'ري (D4).', targetNote: 'D4' },
      { instruction: 'مي (E4).', targetNote: 'E4' },
      { instruction: 'تخطَّ فا — اعزف صول (G4).', targetNote: 'G4', hint: 'لا نلمس فا في هذا السلم.' },
      { instruction: 'لا (A4).', targetNote: 'A4' },
      { instruction: 'دو العليا (C5).', targetNote: 'C5' },
    ],
  },
  {
    id: 'chords-1',
    unitIndex: 4,
    unitTitle: U4,
    level: 4,
    title: 'كورد دو الكبير (C Major)',
    description: 'ثلاث نغمات: الجذر، الثالثة، الخامسة — نعزفها واحدة تلو الأخرى هنا.',
    durationRange: '٦–١٠ دقائق',
    inPlainWords:
      'الكورد يعني «نغمات تُسمع معاً». في التمرين نفككها لنغمات متتالية؛ لاحقاً على بيانو حقيقي تُضغط معاً.',
    objectives: ['معرفة درجات كورد دو: دو–مي–صول.', 'عزف التسلسل بثبات.', 'الاستماع لـ«سُمك» الصوت حتى في العزف المتتابع.'],
    educatorNote: 'وضّح أن الترتيب هنا تعليمي؛ العزف المتزامن يأتي مع المدرّس أو مرحلة لاحقة.',
    takeaway: 'فهمت بنية أبسط كورد كبير — أساس التآلفات القادمة.',
    relatedTheory: [{ label: 'السلم الكبير والدرجات', hash: 'western-scales' }],
    steps: [
      { instruction: 'جذر الكورد: دو (C4).', targetNote: 'C4' },
      { instruction: 'الثالثة: مي (E4).', targetNote: 'E4' },
      { instruction: 'الخامسة: صول (G4).', targetNote: 'G4' },
    ],
  },
  {
    id: 'chord-am',
    unitIndex: 4,
    unitTitle: U4,
    level: 4,
    title: 'تآلف لا الصغير (A Minor)',
    description: 'لا–دو–مي: طابع أكثر هدوءاً وحزناً خفيفاً مقارنة بدو الكبير.',
    durationRange: '٦–١٠ دقائق',
    inPlainWords:
      'نفس فكرة الكورد السابق لكن «نقطة الانطلاق» لا؛ تتغير المشاعر قليلاً رغم استخدام مفاتيح بيضاء كثيرة.',
    objectives: ['عزف A4 ثم C5 ثم E5 بترتيب.', 'مقارنة الإحساس مع كورد دو.', 'ربط الصغير بالكبير مفهومياً دون تعقيد.'],
    educatorNote: 'لا تفرض مصطلح «موازي»؛ يكفي الإحساس والمقارنة السمعية.',
    takeaway: 'سمعت فرقاً بسيطاً بين «مشرق» و«أهدأ» بفضل ترتيب النغمات.',
    relatedTheory: [{ label: 'السلم الصغير', hash: 'western-scales' }],
    steps: [
      { instruction: 'الجذر: لا (A4).', targetNote: 'A4' },
      { instruction: 'الثالثة: دو (C5).', targetNote: 'C5' },
      { instruction: 'الخامسة: مي (E5).', targetNote: 'E5' },
    ],
  },
  {
    id: 'chord-g-major',
    unitIndex: 4,
    unitTitle: U4,
    level: 4,
    title: 'كورد صول كبير (G Major)',
    description: 'صول–سي–ري — كورد شائع يدعم كثيراً من الألحان في دو.',
    durationRange: '٦–١٠ دقائق',
    inPlainWords:
      'ننتقل لعائلة أخرى: نبدأ من صول. سي هنا نغمة حساسة لأنها تختلف عن سلم دو البيضاء فقط — لكن التمرين يوجّه خطوة بخطوة.',
    objectives: ['عزف G4، B4، D5 بالترتيب.', 'تثبيت قفزة اليد نحو الري العليا.', 'سماع لون «كبير» انطلاقاً من صول.'],
    educatorNote: 'إن واجه المتعلّم صعوبة في B4، أشر إلى موقعه كمفتاح أبيض قبل ثلاثة سوداء.',
    takeaway: 'توسعت مكتبتك: كورد ثانٍ كبير يذكرنا بألحان كثيرة.',
    relatedTheory: [{ label: 'درجات السلم', hash: 'western-scales' }],
    steps: [
      { instruction: 'جذر: صول (G4).', targetNote: 'G4' },
      { instruction: 'الثالثة: سي (B4).', targetNote: 'B4' },
      { instruction: 'الخامسة: ري (D5).', targetNote: 'D5' },
    ],
  },
  {
    id: 'chord-f-major',
    unitIndex: 4,
    unitTitle: U4,
    level: 4,
    title: 'كورد فا كبير (F Major)',
    description: 'فا–لا–دو — كورد دافئ يكمل مع دو وصول في تقدمات بسيطة.',
    durationRange: '٦–١٠ دقائق',
    inPlainWords:
      'نغلق الوحدة بكورد يبدأ من فا. ستلاحظ أن اليد تعود قليلاً نحو الوسط — تمرين جيد على المسافات.',
    objectives: ['عزف F4، A4، C5.', 'ربط الفا الكبير بالدو الكبير سمعياً.', 'الاستعداد لألحان تستخدم أكثر من كورد واحد.'],
    educatorNote: 'ذكّر بأن C5 هنا هي نفس «دو» لكن أوكتاف أعلى من بداية كورد دو السابق.',
    takeaway: 'أصبح لديك ثلاثة كوردات كبيرة أساسية: دو، فا، صول.',
    relatedTheory: [{ label: 'التآلفات والسلم', hash: 'western-scales' }],
    steps: [
      { instruction: 'جذر: فا (F4).', targetNote: 'F4' },
      { instruction: 'الثالثة: لا (A4).', targetNote: 'A4' },
      { instruction: 'الخامسة: دو العليا (C5).', targetNote: 'C5' },
    ],
  },
  {
    id: 'melody-mary-short',
    unitIndex: 5,
    unitTitle: U5,
    level: 5,
    title: 'جملة من «ماري لها خروف»',
    description: 'بداية أغنية أطفال كلاسيكية — نغمات قريبة ومتكررة.',
    durationRange: '٨–١٢ دقيقة',
    inPlainWords:
      'اللحن يمشي حول مي ودو وري. التكرار يساعد؛ لا تتردد في الغناء مع العزف.',
    objectives: ['عزف سبع نغمات بذاكرة قصيرة المدى.', 'تثبيت الإيقاع البسيط للتكرار.', 'تجربة فرح إكمال لحن معروف.'],
    educatorNote: 'إن أرهق المتعلّم، أوقف عند أول أربع نغمات واحتفل بإنجاز جزئي.',
    takeaway: 'ربطت بين «أغنية» و«أصابع» — خطوة كبيرة نحو العزف من الذاكرة.',
    relatedTheory: [{ label: 'قراءة النوتة', hash: 'reading-notes' }],
    steps: [
      { instruction: 'مي (E4).', targetNote: 'E4' },
      { instruction: 'ري (D4).', targetNote: 'D4' },
      { instruction: 'دو (C4).', targetNote: 'C4' },
      { instruction: 'ري (D4).', targetNote: 'D4' },
      { instruction: 'مي (E4).', targetNote: 'E4' },
      { instruction: 'كرر مي (E4).', targetNote: 'E4' },
      { instruction: 'ثالث مي (E4) لإكمال الجملة.', targetNote: 'E4' },
    ],
  },
  {
    id: 'song-ode-to-joy',
    unitIndex: 5,
    unitTitle: U5,
    level: 5,
    title: 'لحن: نشيد الفرح (بيتهوفن)',
    description: 'مقطع مشهور من السيمفونية التاسعة — تطبيق لكل ما سبق.',
    durationRange: '١٢–٢٠ دقيقة',
    inPlainWords:
      'لحن عالمي يتحرك خطوة بخطوة ثم يستقر. خذ وقتاً؛ الهدف المتعة والدقة معاً وليس السرعة القياسية.',
    objectives: ['عزف تسلسل أطول بتركيز.', 'إحساس العبارة الموسيقية (صعود ثم هبوط).', 'الاحتفال بإنجاز فني حقيقي.'],
    educatorNote: 'قسّم اللحن إلى قسمين: حتى استقرار صول، ثم من فا إلى دو. احتفل بعد كل قسم.',
    takeaway: 'عزفت مقطوعة تعرفها البشرية جمعاء — إنجاز يستحق الفخر.',
    relatedTheory: [{ label: 'المقاييس والعبارة', hash: 'time-signatures' }],
    steps: [
      { instruction: 'مي (E4).', targetNote: 'E4' },
      { instruction: 'كرر مي (E4).', targetNote: 'E4' },
      { instruction: 'فا (F4).', targetNote: 'F4' },
      { instruction: 'صول (G4).', targetNote: 'G4' },
      { instruction: 'ثبات على صول (G4).', targetNote: 'G4' },
      { instruction: 'فا (F4).', targetNote: 'F4' },
      { instruction: 'مي (E4).', targetNote: 'E4' },
      { instruction: 'ري (D4).', targetNote: 'D4' },
      { instruction: 'استقرار على دو (C4).', targetNote: 'C4' },
      { instruction: 'كرر دو (C4).', targetNote: 'C4' },
    ],
  },
  {
    id: 'frere-jacques-bells',
    unitIndex: 6,
    unitTitle: U6,
    level: 5,
    title: 'هل سمعت الجرس؟ — بداية «فار هولم»',
    description: 'أول جملة من أغنية أطفال عالمية؛ تكرار يثبت الذاكرة ثم صعود قصير.',
    durationRange: '١٠–١٥ دقيقة',
    inPlainWords:
      'كأننا نقرع جرساً بنفس اللحن مرتين، ثم نصعد قليلاً كأن الجرس ابتعد. الأغنية معروفة في كل العالم — ستشعر أنك «تعرفها بالفعل».',
    objectives: ['عزف جملة متكررة بثبات دون ملل.', 'تنفيذ صعود E–F–G بعد التكرار.', 'ربط المتعة بالانتباه للتكرار الموسيقي.'],
    educatorNote: 'غنِّ «فرير جاك» أو «يا جبل ما له» إن كان المتعلّم يعرف نسخة محلية؛ يربط الثقافة بالعزف.',
    takeaway: 'عزفت لحناً عالمياً من أربع نغمات فقط — والتكرار جعله سهلاً.',
    relatedTheory: [{ label: 'المدرج والنغمات', hash: 'reading-notes' }],
    steps: [
      { instruction: 'ابدأ الجرس: دو (C4).', targetNote: 'C4' },
      { instruction: 'ري (D4).', targetNote: 'D4' },
      { instruction: 'مي (E4).', targetNote: 'E4' },
      { instruction: 'عودة إلى دو (C4).', targetNote: 'C4' },
      { instruction: 'كرر اللحن: دو (C4).', targetNote: 'C4' },
      { instruction: 'ري ثانية (D4).', targetNote: 'D4' },
      { instruction: 'مي ثانية (E4).', targetNote: 'E4' },
      { instruction: 'أغلق الجملة على دو (C4).', targetNote: 'C4' },
      { instruction: 'الجملة الثانية تصعد: مي (E4).', targetNote: 'E4' },
      { instruction: 'فا (F4).', targetNote: 'F4' },
      { instruction: 'صول (G4).', targetNote: 'G4' },
    ],
  },
  {
    id: 'arpeggio-spinner',
    unitIndex: 6,
    unitTitle: U6,
    level: 5,
    title: 'طائرة حول الجرس — أربيجيو مرح',
    description: 'نرسم دائرة صوتية: جذر، ثالثة، خامسة، ثم نلمس دو العليا ونعود.',
    durationRange: '٨–١٢ دقيقة',
    inPlainWords:
      'تخيّل طائرة ورقية تدور حول نقطة ثابتة (دو). نصعد على درجات كورد دو الكبير ثم نهبط بسلاسة — تمرين «فخم» يبدو أصعب مما هو.',
    objectives: ['عزف أربيجيو منظم على كورد دو.', 'لمس C5 والعودة نحو الوسط.', 'الإحساس بالتوازن بين الصعود والهبوط.'],
    educatorNote: 'شجع الحركة البطيئة أولاً؛ السرعة تأتي مع الراحة في الأصابع.',
    takeaway: 'فهمت أن «كورد دو» يمكن أن يطير بشكل لحني وليس ككتلة جامدة.',
    relatedTheory: [{ label: 'التآلف والسلم', hash: 'western-scales' }],
    steps: [
      { instruction: 'انطلق من دو (C4).', targetNote: 'C4' },
      { instruction: 'مي (E4).', targetNote: 'E4' },
      { instruction: 'صول (G4).', targetNote: 'G4' },
      { instruction: 'دو العليا (C5).', targetNote: 'C5' },
      { instruction: 'انزل إلى صول (G4).', targetNote: 'G4' },
      { instruction: 'مي (E4).', targetNote: 'E4' },
      { instruction: 'استقر على دو (C4).', targetNote: 'C4' },
    ],
  },
  {
    id: 'bridge-dou-soul-dou',
    unitIndex: 6,
    unitTitle: U6,
    level: 5,
    title: 'جسر دو — صول — دو',
    description: 'أبسط حركة هارمونية في الموسيقى الغربية: الذهاب إلى الخامسة والعودة.',
    durationRange: '٦–١٠ دقائق',
    inPlainWords:
      'كثير من الأغاني «تفتقد» الوسط ثم «تعود للبيت». هنا نذهب من دو إلى صول (الخامسة) ونعود — وكأننا نمشي على جسر ونرجع بأمان.',
    objectives: ['تثبيت انتقال دو → صول → دو العليا.', 'سماع استقرار العودة إلى الجذر.', 'تجربة شعور «سؤال وجواب» بين نغمتين.'],
    educatorNote: 'يمكن وصف صول بأنها «صديقة» لدو تساعد اللحن على التنفس.',
    takeaway: 'عرفت عملياً لماذا الخامسة مهمة في الألحان البسيطة.',
    relatedTheory: [{ label: 'درجات السلم', hash: 'western-scales' }],
    steps: [
      { instruction: 'دو الوسط (C4).', targetNote: 'C4' },
      { instruction: 'اقفز إلى صول (G4).', targetNote: 'G4', hint: 'خامسة فوق دو — قفزة واسعة واثقة.' },
      { instruction: 'دو العليا (C5) لتأكيد الجواب.', targetNote: 'C5' },
      { instruction: 'أعد سماع الخامسة: صول (G4).', targetNote: 'G4' },
      { instruction: 'أغلق على دو (C4).', targetNote: 'C4' },
    ],
  },
  {
    id: 'folk-dance-steps',
    unitIndex: 6,
    unitTitle: U6,
    level: 5,
    title: 'خطوات على السلم — إيقاع خطوات',
    description: 'نمط متكرر يربط ري ومي ودو؛ مناسب لتخيّل خطوات راقصة على إيقاع هادئ.',
    durationRange: '٨–١٤ دقيقة',
    inPlainWords:
      'ليس بالضرورة رقصة حقيقية — لكن الدماغ يحب الأنماط المتكررة. نعزف نفس «الخطوة» مرتين ثم نغيّر قليلاً في النهاية كأننا نلف للجهة الأخرى.',
    objectives: ['عزف تكرار متقن لأربع نغمات.', 'تغيير خاتمة الجملة بذكاء.', 'ربط الحركة الموسيقية بخيال حركي بسيط.'],
    educatorNote: 'صفق مع المتعلّم نبضتين قبل العزف؛ يربط الجسد بالزمن دون قراءة معقدة.',
    takeaway: 'تمرّنت على «خلية» لحنية يمكن أن تتكرر في موسيقى الشعبي والترفيه.',
    relatedTheory: [{ label: 'المقاييس الإيقاعية', hash: 'time-signatures' }],
    steps: [
      { instruction: 'ري (D4) — أول خطوة.', targetNote: 'D4' },
      { instruction: 'مي (E4).', targetNote: 'E4' },
      { instruction: 'ري (D4).', targetNote: 'D4' },
      { instruction: 'دو (C4).', targetNote: 'C4' },
      { instruction: 'كرر الخطوات: ري (D4).', targetNote: 'D4' },
      { instruction: 'مي (E4).', targetNote: 'E4' },
      { instruction: 'ري (D4).', targetNote: 'D4' },
      { instruction: 'دو (C4).', targetNote: 'C4' },
      { instruction: 'خاتمة صاعدة خفيفة: مي (E4).', targetNote: 'E4' },
      { instruction: 'صول (G4) — وكأننا نرفع الرأس.', targetNote: 'G4' },
      { instruction: 'استقر على ري (D4).', targetNote: 'D4' },
    ],
  },
  {
    id: 'eastern-breeze-piano',
    unitIndex: 6,
    unitTitle: U6,
    level: 5,
    title: 'نسمة شرقية — على مفاتيح البيانو',
    description: 'جملة قصيرة تستند إلى نمط شائع في المقامات (نهاوند/بيياتي) لكن بدوال بيضاء فقط — مناسبة للبيانو.',
    durationRange: '١٠–١٥ دقيقة',
    inPlainWords:
      'البيانو لا يعطي ربع تون، لكن يمكن أن «يقترح» جواً شرقياً باختيار النغمات والالتفاف على مي وصول. استمع كأنك في سوق موسيقي صغير.',
    objectives: ['تجربة لون صوتي مختلف عن «المدرسة الغربية» فقط.', 'عزف منعطفات حول مي وصول.', 'فهم حدود البيانو مع المقام دون إحباط.'],
    educatorNote: 'أكد أن النسخة الكاملة للمقام قد تحتاج آلة أخرى؛ هنا نستمتع بالتقريب.',
    takeaway: 'ربطت بين ما تعرفه من سلم دو وبين «إحساس» يشبه الموسيقى العربية.',
    relatedTheory: [{ label: 'المقامات الشرقية', hash: 'eastern-maqams' }],
    steps: [
      { instruction: 'مي (E4) — نقطة انطلاق دافئة.', targetNote: 'E4' },
      { instruction: 'دو (C4).', targetNote: 'C4' },
      { instruction: 'ري (D4).', targetNote: 'D4' },
      { instruction: 'مي (E4).', targetNote: 'E4' },
      { instruction: 'صول (G4).', targetNote: 'G4' },
      { instruction: 'فا (F4) — لفة قصيرة.', targetNote: 'F4' },
      { instruction: 'مي (E4).', targetNote: 'E4' },
      { instruction: 'ري (D4).', targetNote: 'D4' },
      { instruction: 'استقر على دو (C4).', targetNote: 'C4' },
    ],
  },
  {
    id: 'skip-little-challenge',
    unitIndex: 6,
    unitTitle: U6,
    level: 5,
    title: 'تحدّي القفزات الصغيرة',
    description: 'قفزات بين درجات كورد دو الكبير معكوسة — تمرين ذهني ولطيف.',
    durationRange: '٨–١٢ دقيقة',
    inPlainWords:
      'كألغاز سريعة: صول، مي، دو… ثم نعيد بناء الصعود. من يحب الألعاب سيجد فيه متعة؛ من يفضل الهدوء يعزف ببطء شديد.',
    objectives: ['تنفيذ قفزات صغيرة بدقة.', 'إعادة ترتيب نفس النغمات باتجاه صاعد.', 'تعزيز الثقة بعد الوحدة السابقة.'],
    educatorNote: 'إن أخطأ المتعلّم، اجعل التحدي «جولة ثانية» دون ضغط نفسي.',
    takeaway: 'أثبتت لنفسك أن القفزات لم تعد مخيفة.',
    relatedTheory: [{ label: 'السلم الكبير', hash: 'western-scales' }],
    steps: [
      { instruction: 'صول (G4).', targetNote: 'G4' },
      { instruction: 'مي (E4).', targetNote: 'E4' },
      { instruction: 'دو (C4).', targetNote: 'C4' },
      { instruction: 'مي (E4) مرة أخرى.', targetNote: 'E4' },
      { instruction: 'صول (G4).', targetNote: 'G4' },
      { instruction: 'دو العليا (C5) — ذروة صغيرة.', targetNote: 'C5' },
      { instruction: 'أنهِ على صول (G4).', targetNote: 'G4' },
    ],
  },
  {
    id: 'studio-prep',
    unitIndex: 6,
    unitTitle: U6,
    level: 5,
    title: 'جاهز للاستوديو الحر',
    description: 'ختام المسار التوجيهي: أربيجيو دو الكبير ثم الدخول للعزف الحر.',
    durationRange: '٥–٨ دقائق',
    inPlainWords:
      'بعد مغامرات الوحدة السادسة، نختم بحركة واضحة تشبه الوداع الموسيقي: جذر، ثالثة، خامسة، دو العليا. ثم استوديوك بانتظارك.',
    objectives: ['تثبيت كورد دو كحركة موسيقية وليس كقائمة.', 'الانتقال إلى دو العليا بثقة.', 'فهم أن الاستوديو مساحة تجريب دون خطوات صارمة.'],
    educatorNote: 'ناقش مع المتعلّم ما الذي يريد تجربته في الاستوديو (صوت، سرعة، تكرار) قبل الدخول.',
    takeaway: 'أنت جاهز للعب والتجربة بحرية — مع بقاء ما تعلمته أساساً قوياً.',
    relatedTheory: [{ label: 'المكتبة النظرية', hash: 'reading-notes' }],
    steps: [
      { instruction: 'دو (C4).', targetNote: 'C4' },
      { instruction: 'مي (E4).', targetNote: 'E4' },
      { instruction: 'صول (G4).', targetNote: 'G4' },
      { instruction: 'دو العليا (C5).', targetNote: 'C5' },
    ],
  },
];

/** أوصاف الوحدات للعرض في صفحات أخرى */
export const curriculumUnitsMeta = [
  { index: 1, title: U1, summary: 'من أول لمسة إلى جملة صغيرة — بناء الثقة على اللوحة.' },
  { index: 2, title: U2, summary: 'قفزات أوسع، إحساس بالخامسة، ولحن إيقاعي مألوف.' },
  { index: 3, title: U3, summary: 'سلم كامل، نزول منظم، وتجربة البنتاتوني.' },
  { index: 4, title: U4, summary: 'أربعة تآلفات أساسية تغطي مشاعر ومقاطع شائعة.' },
  { index: 5, title: U5, summary: 'ألحان كاملة الجملة من التراث العالمي والمدرسة الكلاسيكية.' },
  { index: 6, title: U6, summary: 'مغامرات لحنية: جسور، فولكلور، لمحة شرقية، وتحديات قفز — ثم الخاتمة نحو الاستوديو.' },
];
