// 首页顶部日期 + 导航滚动侦测
export function initToday() {
  const el = document.getElementById('todayLine');
  if (!el) return;

  function isoWeek(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = (d.getUTCDay() + 6) % 7;
    d.setUTCDate(d.getUTCDate() - dayNum + 3);
    const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
    const diff = d - firstThursday;
    return 1 + Math.round((diff / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
  }

  try {
    const now = new Date();
    const weeks = ['日', '一', '二', '三', '四', '五', '六'];
    el.textContent =
      now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日 · 星期' +
      weeks[now.getDay()] + ' · 第' + isoWeek(now) + '周';
  } catch (e) {
    /* ignore */
  }
}

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
