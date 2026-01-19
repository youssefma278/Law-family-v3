/**
 * 1. الإعدادات الأساسية
 */
const app = document.getElementById("app");
const backBtn = document.getElementById("backBtn");
let navigationStack = []; // لتخزين مسار المستخدم للرجوع للخلف

/**
 * 2. دالة عرض الصفحة الرئيسية (الأقسام الكبيرة)
 */
function renderHome() {
  navigationStack = [];
  backBtn.classList.add("hidden");
  let html = `
    <div class="text-center mb-16 animate__animated animate__fadeInDown">
        <span class="inline-block px-4 py-1 rounded-full bg-yellow-500/10 text-[#c5a059] text-xs font-bold tracking-widest mb-4">أهلاً بك في عائلة القانون</span>
        <h2 class="text-5xl md:text-7xl font-black mb-6 law-title leading-tight">Law <span class="gold-text">Family</span></h2>
        <p class="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">بوابتك الرقمية المتطورة لكل ما تحتاجه في مسيرتك التعليمية والمهنية.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  `;

  siteData.categories.forEach((cat, index) => {
    html += `
      <div onclick="renderCategory('${cat.id}')" 
           class="glass-card p-8 transition-all cursor-pointer group relative overflow-hidden animate__animated animate__fadeInUp" 
           style="animation-delay: ${index * 0.1}s">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span class="text-8xl">${cat.icon}</span>
          </div>
          <div class="text-4xl mb-6 transform group-hover:scale-110 transition-transform inline-block">${cat.icon}</div>
          <h3 class="text-2xl font-bold mb-3 group-hover:text-[#c5a059] transition-colors">${cat.title}</h3>
          <p class="text-gray-500 text-sm leading-relaxed">${cat.description}</p>
          <div class="mt-8 flex items-center gap-2 text-[#c5a059] font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
              استكشاف القسم <span>←</span>
          </div>
      </div>
    `;
  });

  app.innerHTML = html + `</div>`;
  window.scrollTo(0, 0);
}

/**
 * 3. دالة عرض التصنيفات الفرعية (مثل الفرق الدراسية)
 */
function renderCategory(catId) {
  const category = siteData.categories.find((c) => c.id === catId);
  navigationStack.push({ type: "home" });
  backBtn.classList.remove("hidden");

  let html = `
    <div class="mb-10 animate__animated animate__fadeIn">
        <h2 class="text-4xl font-black gold-text mb-4">${category.title}</h2>
        <p class="text-gray-400">اختر التخصص الفرعي أو السنة الدراسية</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
  `;

  category.subCategories.forEach((sub) => {
    html += `
      <div onclick="renderSubjects('${catId}', '${sub.id}')" 
           class="glass-card p-10 flex justify-between items-center group cursor-pointer hover:bg-white/10 transition-all border-l-4 border-l-transparent hover:border-l-[#c5a059]">
          <div>
              <span class="text-xs text-[#c5a059] font-bold mb-2 block uppercase tracking-tighter">المرحلة</span>
              <h3 class="text-2xl font-black text-white group-hover:tracking-wider transition-all">${sub.title}</h3>
          </div>
          <div class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#c5a059] group-hover:text-slate-900 transition-all">
              →
          </div>
      </div>
    `;
  });

  if (category.subCategories.length === 0) {
    html += `<div class="col-span-full py-20 text-center glass-card opacity-50">قريباً في Law Family</div>`;
  }

  app.innerHTML = html + `</div>`;
  window.scrollTo(0, 0);
}

/**
 * 4. دالة عرض قائمة المواد الدراسية
 */
function renderSubjects(catId, subId) {
  const category = siteData.categories.find((c) => c.id === catId);
  const sub = category.subCategories.find((s) => s.id === subId);
  navigationStack.push({ type: "category", id: catId });

  let html = `
    <div class="mb-10 animate__animated animate__fadeIn">
        <h2 class="text-4xl font-black text-white mb-2">${sub.title}</h2>
        <p class="text-[#c5a059] font-bold">المواد الدراسية والمناهج</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  `;

  sub.subjects.forEach((subject) => {
    html += `
      <div onclick="renderContent('${catId}', '${subId}', '${subject.id}')" 
           class="glass-card p-6 border-b-4 border-b-transparent hover:border-b-[#c5a059] cursor-pointer transition-all subject-grid-item">
          <div class="flex flex-col gap-4">
              <div class="w-12 h-12 bg-[#c5a059]/10 text-[#c5a059] rounded-xl flex items-center justify-center">
                  📚
              </div>
              <h3 class="text-xl font-bold text-gray-100">${subject.title}</h3>
              <div class="flex gap-3 mt-2">
                  <span class="text-[10px] px-2 py-1 bg-white/5 rounded text-gray-400">ملفات: ${subject.pdfs.length}</span>
                  <span class="text-[10px] px-2 py-1 bg-white/5 rounded text-gray-400">فيديو: ${subject.videos.length}</span>
              </div>
          </div>
      </div>
    `;
  });

  app.innerHTML = html + `</div>`;
  window.scrollTo(0, 0);
}

/**
 * 5. دالة عرض المحتوى الداخلي للمادة (فيديوهات و PDFs)
 */
function renderContent(catId, subId, subjectId) {
  const category = siteData.categories.find((c) => c.id === catId);
  const sub = category.subCategories.find((s) => s.id === subId);
  const subject = sub.subjects.find((sj) => sj.id === subjectId);
  navigationStack.push({ type: "subjects", catId: catId, subId: subId });

  let html = `
    <div class="glass-card p-10 mb-10 border-t-4 border-t-[#c5a059] animate__animated animate__fadeInDown">
        <span class="text-[#c5a059] font-black text-sm uppercase mb-2 block tracking-widest">${sub.title}</span>
        <h2 class="text-5xl font-black text-white mb-4">${subject.title}</h2>
        <div class="h-1 w-20 bg-[#c5a059]"></div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section class="animate__animated animate__fadeInLeft">
            <h3 class="flex items-center gap-3 text-2xl font-bold mb-6 text-white">🎬 المحاضرات المرئية</h3>
            <div class="space-y-4">
  `;

  subject.videos.forEach((v) => {
    html += `
      <a href="${v.url}" target="_blank" class="glass-card p-5 block hover:border-red-500/50 group transition-all">
          <div class="flex justify-between items-center">
              <span class="font-bold text-gray-300 group-hover:text-white">${v.title}</span>
              <div class="btn-gold px-4 py-1.5 rounded-full text-xs font-bold text-slate-900">مشاهدة</div>
          </div>
      </a>
    `;
  });

  html += `</div></section> <section class="animate__animated animate__fadeInRight">
            <h3 class="flex items-center gap-3 text-2xl font-bold mb-6 text-white">📄 الملفات والمستندات</h3>
            <div class="space-y-4">`;

  subject.pdfs.forEach((p) => {
    html += `
      <a href="${p.url}" target="_blank" class="glass-card p-5 block hover:border-[#c5a059]/50 group transition-all">
          <div class="flex justify-between items-center">
              <span class="font-bold text-gray-300 group-hover:text-white">${p.title}</span>
              <div class="border border-[#c5a059] text-[#c5a059] px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#c5a059] hover:text-slate-900 transition-all">تحميل</div>
          </div>
      </a>
    `;
  });

  app.innerHTML = html + `</div></section></div>`;
  window.scrollTo(0, 0);
}

/**
 * 6. نظام التنقل والرجوع للخلف
 */
function goBack() {
  if (navigationStack.length === 0) return;
  const lastPage = navigationStack.pop();
  if (lastPage.type === "home") renderHome();
  else if (lastPage.type === "category") renderCategory(lastPage.id);
  else if (lastPage.type === "subjects")
    renderSubjects(lastPage.catId, lastPage.subId);
}

// تشغيل الصفحة الرئيسية عند التحميل
window.onload = renderHome;
