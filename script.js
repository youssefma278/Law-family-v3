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
        <p class="text-gray-400">اختر القسم المطلوب للبدء</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
  `;

  category.subCategories.forEach((sub) => {
    // التحقق إذا كان القسم يحتوي على رابط خارجي (تيليجرام مثلاً)
    const isExternal = sub.externalUrl && sub.externalUrl !== "";
    const clickAction = isExternal
      ? `window.open('${sub.externalUrl}', '_blank')`
      : `renderSubjects('${catId}', '${sub.id}')`;

    html += `
  <div onclick="${clickAction}" 
       class="glass-card p-10 flex justify-between items-center group cursor-pointer hover:bg-white/10 transition-all border-l-4 border-l-transparent hover:border-l-[#c5a059]">
      <div>
          <span class="text-xs text-[#c5a059] font-bold mb-2 block uppercase tracking-tighter">
            ${isExternal ? "رابط خارجي" : "عرض المحتوى"}
          </span>
          <h3 class="text-2xl font-black text-white group-hover:tracking-wider transition-all">${sub.title}</h3>
      </div>
      <div class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#c5a059] group-hover:text-slate-900 transition-all">
          ${isExternal ? "🔗" : "→"}
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

// --- وظائف نظام الحساب ---

let tempImageData = null;

function handleImageUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    tempImageData = reader.result;
    document.getElementById("previewImg").src = tempImageData;
  };
  if (file) reader.readAsDataURL(file);
}

function renderAuthForm(isSignUp = false) {
  navigationStack.push({ type: "home" });
  backBtn.classList.remove("hidden");
  tempImageData = null;

  app.innerHTML = `
        <div class="max-w-md mx-auto glass-card p-10 animate__animated animate__fadeIn">
            <h2 class="text-3xl font-black gold-text mb-8 text-center">${isSignUp ? "إنشاء حساب جديد" : "تسجيل الدخول"}</h2>
            <form onsubmit="handleAuth(event, ${isSignUp})" class="space-y-4 text-right">
                ${
                  isSignUp
                    ? `
                <div class="image-upload-wrapper">
                    <img id="previewImg" src="https://ui-avatars.com/api/?name=User&background=c5a059&color=fff" />
                    <div class="upload-icon-badge">📷</div>
                    <input type="file" accept="image/*" onchange="handleImageUpload(event)" class="absolute inset-0 opacity-0 cursor-pointer">
                </div>
                <div>
                    <label class="block mb-1 text-xs text-gray-400 mr-2">الأسم الكامل</label>
                    <input type="text" id="regName" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#c5a059]">
                </div>
                <div>
                    <label class="block mb-1 text-xs text-gray-400 mr-2">البريد الإلكتروني</label>
                    <input type="email" id="regEmail" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#c5a059]" placeholder="example@mail.com">
                </div>`
                    : ""
                }
                <div>
                    <label class="block mb-1 text-xs text-gray-400 mr-2">رقم الهاتف</label>
                    <input type="tel" id="userPhone" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#c5a059]" placeholder="01xxxxxxxxx">
                </div>
                <div>
                    <label class="block mb-1 text-xs text-gray-400 mr-2">كلمة المرور</label>
                    <input type="password" id="userPass" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#c5a059]">
                </div>
                <button type="submit" class="w-full btn-gold py-4 rounded-xl font-bold text-slate-900 mt-6 shadow-lg shadow-yellow-600/20">
                    ${isSignUp ? "تأكيد التسجيل" : "دخول"}
                </button>
            </form>
            <p class="text-center mt-6 text-gray-400 text-sm cursor-pointer hover:text-[#c5a059]" onclick="renderAuthForm(${!isSignUp})">
                ${isSignUp ? "لديك حساب؟ سجل دخولك" : "لا تملك حساب؟ ابدأ الآن"}
            </p>
        </div>
    `;
}

function handleAuth(event, isSignUp) {
  event.preventDefault();
  const phone = document.getElementById("userPhone").value;
  const pass = document.getElementById("userPass").value;

  if (isSignUp) {
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const newUser = {
      name,
      email,
      phone,
      pass,
      active: true,
      image:
        tempImageData ||
        `https://ui-avatars.com/api/?name=${name}&background=c5a059&color=fff`,
      joinDate: new Date().toLocaleDateString("ar-EG"),
    };
    localStorage.setItem("lawFamilyUser", JSON.stringify(newUser));
    alert("تم إنشاء الحساب بنجاح!");
  } else {
    const savedUser = JSON.parse(localStorage.getItem("lawFamilyUser"));
    if (savedUser && savedUser.phone === phone && savedUser.pass === pass) {
      alert("أهلاً بك مجدداً!");
    } else {
      alert("بيانات الدخول غير صحيحة");
      return;
    }
  }
  location.reload();
}

function renderProfile(user) {
  navigationStack.push({ type: "home" });
  backBtn.classList.remove("hidden");

  app.innerHTML = `
        <div class="max-w-2xl mx-auto glass-card p-10 animate__animated animate__zoomIn">
            <div class="text-center mb-10">
                <img src="${user.image}" class="w-32 h-32 rounded-full border-4 border-[#c5a059] mx-auto mb-4 object-cover" />
                <h2 class="text-3xl font-black text-white">${user.name}</h2>
                <div class="flex items-center justify-center gap-2 mt-2">
                    <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span class="text-green-500 text-sm font-bold">الحساب نشط</span>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
                <div class="bg-white/5 p-5 rounded-2xl border border-white/5">
                    <p class="text-gray-500 text-xs mb-1">البريد الإلكتروني</p>
                    <p class="font-bold text-gray-200 truncate">${user.email || "غير متوفر"}</p>
                </div>
                <div class="bg-white/5 p-5 rounded-2xl border border-white/5">
                    <p class="text-gray-500 text-xs mb-1">رقم الهاتف</p>
                    <p class="font-bold text-gray-200">${user.phone}</p>
                </div>
                <div class="bg-white/5 p-5 rounded-2xl border border-white/5 md:col-span-2">
                    <p class="text-gray-500 text-xs mb-1">تاريخ الانضمام للمنصة</p>
                    <p class="font-bold text-gray-200">${user.joinDate}</p>
                </div>
            </div>
            
            <button onclick="handleLogout()" class="w-full mt-10 py-3 border border-red-500/30 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold">
                تسجيل الخروج
            </button>
        </div>
    `;
}

function checkAuthStatus() {
  const user = JSON.parse(localStorage.getItem("lawFamilyUser"));
  if (user) {
    const authControls = document.getElementById("authControls");
    if (authControls) {
      authControls.innerHTML = `
            <div onclick="toggleProfile()" class="flex items-center gap-3 cursor-pointer bg-white/5 pl-4 pr-1 py-1 rounded-full border border-white/10 hover:border-[#c5a059] transition-all">
                <img src="${user.image}" class="w-8 h-8 rounded-full object-cover border border-[#c5a059]" />
                <span class="text-xs font-black text-white hidden sm:block">${user.name.split(" ")[0]}</span>
            </div>
        `;
    }
  }
}

function toggleProfile() {
  const user = JSON.parse(localStorage.getItem("lawFamilyUser"));
  user ? renderProfile(user) : renderAuthForm();
}

function handleLogout() {
  localStorage.removeItem("lawFamilyUser");
  location.reload();
}

window.addEventListener("load", checkAuthStatus);
