const siteData = {
  categories: [
    {
      id: "law",
      title: "كلية القانون",
      icon: "⚖️",
      description: "المسار الأكاديمي الشامل لطلاب الحقوق والقانون",
      subCategories: [
        {
          id: "year1",
          title: "الفرقة الأولى",
          subjects: [],
        },
        { id: "year2", title: "الفرقة الثانية", subjects: [] },
        {
          id: "year3",
          title: "الفرقة الثالثة",
          subjects: [
            {
              id: "law_1", // معرف فريد للمادة
              title: "القانون القضاء الإداري", // اسم المادة الذي سيظهر
              videos: [
                {
                  title: "المحاضرة الأولى: التعريف بالقانون",
                  url: "رابط_يوتيوب_هنا",
                },
                {
                  title: "المحاضرة الثانية: مصادر الحق",
                  url: "رابط_يوتيوب_أو_تيليجرام",
                },
              ],
              pdfs: [
                { title: "ملخص الكتاب PDF", url: "رابط_الملف_هنا" },
                { title: "صوتيات المحاضرة (رابط)", url: "رابط_ملف_الصوت_هنا" },
              ],
            },
            {
              id: "law_2",
              title: "الشريعة الإسلامية المواريث – الوصية – الوقف ",
              videos: [], // اتركها فارغة إذا لم يوجد محتوى بعد
              pdfs: [],
            },
            {
              id: "law_3",
              title: "قانون المرافعات",
              videos: [], // اتركها فارغة إذا لم يوجد محتوى بعد
              pdfs: [],
            },
            {
              id: "law_4",
              title: "مالية عامة وتشريع ضريبى ",
              videos: [], // اتركها فارغة إذا لم يوجد محتوى بعد
              pdfs: [],
            },
            {
              id: "law_5",
              title: "قانون الجنسية",
              videos: [], // اتركها فارغة إذا لم يوجد محتوى بعد
              pdfs: [],
            },
          ],
        },
        { id: "year4", title: "الفرقة الرابعة", subjects: [] },
      ],
    },
    {
      id: "coding",
      title: "أكاديمية البرمجة",
      icon: "🚀",
      description: "صناعة المستقبل من خلال تطوير البرمجيات والتقنيات",
      subCategories: [],
    },
    {
      id: "graphics",
      title: "مركز التصميم",
      icon: "✨",
      description: "الإبداع البصري وتصميم تجربة المستخدم الحديثة",
      subCategories: [],
    },
    {
      id: "english",
      title: "English Club",
      icon: "🗣️",
      description: "Learn Business & Academic English",
      subCategories: [
        {
          id: "eng_tele",
          title: "Learn English in 6 month",
          externalUrl: "https://t.me/LearnEnglishin6", // ضع رابط قناة الإنجليزي هنا
          subjects: [],
        },
        {
          id: "eng_tele",
          title: "English Speaking Club",
          externalUrl: "https://t.me/SpeakEnglishd", // ضع رابط قناة الإنجليزي هنا
          subjects: [],
        },
      ],
    },
    {
      id: "german",
      title: "Deutsch Kurs",
      icon: "🇩🇪",
      description: "Sprache lernen von A1 bis C1",
      subCategories: [
        {
          id: "german_tele",
          title: "Speak German Deutsch Community",
          externalUrl: "https://t.me/speakgermanDetusch",
          subjects: [],
        },
      ],
    },
  ],
};
