// 主题切换（亮/暗）。防闪烁脚本内联在模板 head 中。
export function initTheme() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const root = document.documentElement;
    root.classList.add('theme-anim');
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('bp-theme', next);
    } catch (e) {
      /* ignore */
    }
    setTimeout(() => root.classList.remove('theme-anim'), 450);
  });
}
