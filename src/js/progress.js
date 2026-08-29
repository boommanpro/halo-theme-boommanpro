// 阅读进度条 + 返回顶部
export function initProgress() {
  const bar = document.getElementById('progressBar');
  const topBtn = document.getElementById('backToTop');
  let ticking = false;

  function update() {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    if (bar) {
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    }
    if (topBtn) {
      topBtn.classList.toggle('is-show', h.scrollTop > 400);
    }
    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  update();

  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
