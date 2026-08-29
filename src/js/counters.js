// 数字滚动
export function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const pad = parseInt(el.dataset.pad, 10) || 0;
    function render(v) {
      el.textContent = pad ? String(v).padStart(pad, '0') : String(v);
    }
    if (prefersReduced || !('requestAnimationFrame' in window)) {
      render(target);
      return;
    }
    const dur = 1100;
    let start = null;
    function frame(t) {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      render(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => observer.observe(el));
  } else {
    counters.forEach(animateCount);
  }
}
