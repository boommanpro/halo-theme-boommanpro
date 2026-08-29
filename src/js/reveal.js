// 入场动效（IntersectionObserver）
export function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !prefersReduced) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    els.forEach((el) => observer.observe(el));
  } else {
    els.forEach((el) => el.classList.add('is-in'));
  }
}
