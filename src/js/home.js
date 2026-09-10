// 首页导航滚动侦测
export function initNavSpy() {
  const navCurrent = document.getElementById('navCurrent');
  const sections = document.querySelectorAll('main section[data-navlabel]');
  if (!navCurrent || !sections.length) return;

  // 仅更新右侧滚动栏目指示；菜单高亮由 initNavActive 按当前路径统一管理
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navCurrent.textContent = entry.target.dataset.navlabel;
          }
        });
      },
      { rootMargin: '-42% 0px -52% 0px' }
    );
    sections.forEach((s) => spy.observe(s));
  }
}
