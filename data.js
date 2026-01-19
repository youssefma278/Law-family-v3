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
          subjects: [
            {
              id: "intro_law",
              title: "مدخل العلوم القانونية",
              videos: [
                {
                  title: "أساسيات القانون - الجزء الأول",
                  url: "https://youtube.com/...",
                },
                { title: "نظرية الحق - شرح مفصل", url: "https://t.me/..." },
              ],
              pdfs: [
                { title: "الكتاب المعتمد - مادة المدخل", url: "file.pdf" },
              ],
            },
            { id: "civil1", title: "تاريخ القانون", videos: [], pdfs: [] },
          ],
        },
        { id: "year2", title: "الفرقة الثانية", subjects: [] },
        { id: "year3", title: "الفرقة الثالثة", subjects: [] },
        { id: "year4", title: "الفرقة الرابعة", subjects: [] },
      ],
    },
    {
      id: "coding",
      title: "أكاديمية البرمجة",
      icon: "🚀",
      description: "صناعة المستقبل من خلال تطوير البرمجيات والتقنيات",
      subCategories: [
        {
          id: "web",
          title: "Web Development",
          subjects: [
            {
              id: "js_course",
              title: "Mastering JavaScript",
              videos: [{ title: "ES6 Basics", url: "#" }],
              pdfs: [{ title: "Cheat Sheet", url: "#" }],
            },
          ],
        },
      ],
    },
    {
      id: "graphics",
      title: "مركز التصميم",
      icon: "✨",
      description: "الإبداع البصري وتصميم تجربة المستخدم الحديثة",
      subCategories: [], // يمكنك إضافة أقسام التصميم هنا لاحقاً
    },
    // --- القسم المطلوب: English Club ---
    {
      id: "english",
      title: "English Club",
      icon: "🗣️",
      description: "Learn Business & Academic English",
      subCategories: [
        {
          id: "general_eng",
          title: "General English",
          subjects: [
            {
              id: "grammar",
              title: "English Grammar",
              videos: [{ title: "Tenses Overview", url: "#" }],
              pdfs: [{ title: "Grammar Summary", url: "#" }],
            },
          ],
        },
      ],
    },
    // --- القسم المطلوب: Deutsch Kurs ---
    {
      id: "german",
      title: "Deutsch Kurs",
      icon: "🇩🇪",
      description: "Sprache lernen von A1 bis C1",
      subCategories: [
        {
          id: "level_a1",
          title: "Level A1",
          subjects: [
            {
              id: "alphabet",
              title: "Das Alphabet",
              videos: [{ title: "German Pronunciation", url: "#" }],
              pdfs: [{ title: "A1 Vocabulary List", url: "#" }],
            },
          ],
        },
      ],
    },
  ],
};
