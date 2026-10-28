/* Character Studio — التفاعلات والحركات */
(() => {
  "use strict";

  // إظهار العناصر عند وصولها إلى الشاشة
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // تغيير خلفية شريط التنقل عند التمرير
  const navbar = document.querySelector(".site-nav");
  const updateNavbar = () => navbar?.classList.toggle("scrolled", window.scrollY > 18);
  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  // تصفية المعرض حسب نوع العمل
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle("active", item === button));
      portfolioItems.forEach((item) => {
        const matches = filter === "all" || item.dataset.category === filter;
        item.classList.toggle("is-hidden", !matches);
        if (matches) {
          item.classList.remove("is-visible");
          // إعادة حركة الظهور عند تبديل التصنيف
          requestAnimationFrame(() => item.classList.add("is-visible"));
        }
      });
    });
  });

  // نافذة معاينة العمل بالحجم الأكبر
  const modalElement = document.getElementById("workModal");
  const workModal = modalElement && window.bootstrap
    ? new bootstrap.Modal(modalElement)
    : null;
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("workModalTitle");
  const modalDescription = document.getElementById("modalDescription");

  document.querySelectorAll(".work-card").forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.dataset.title || "عمل فني";
      const description = card.dataset.description || "";
      const imagePath = card.dataset.image || "";

      modalTitle.textContent = title;
      modalDescription.textContent = description;
      modalImage.alt = title;
      modalImage.src = imagePath;
      modalImage.onerror = () => {
        modalImage.removeAttribute("src");
        modalImage.alt = "أضف صورة العمل إلى مجلد assets/images";
        modalImage.style.height = "0";
      };
      modalImage.onload = () => { modalImage.style.height = ""; };
      workModal?.show();
    });
  });

  // إغلاق قائمة الهاتف عند اختيار رابط
  document.querySelectorAll("#mainNav .nav-link, #mainNav .nav-cta").forEach((link) => {
    link.addEventListener("click", () => {
      const navElement = document.getElementById("mainNav");
      if (navElement?.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(navElement).hide();
      }
    });
  });

  // السنة الحالية تلقائيًا
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
