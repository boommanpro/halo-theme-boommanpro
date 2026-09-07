// 首页文章分类筛选 + 顶部日期 + 导航滚动侦测
export function initFilter() {
  const chips = document.querySelectorAll('.chip[data-filter]');
  const rows = document.querySelectorAll('.article-row');
  if (!chips.length || !rows.length) return;

  const countEl = document.getElementById('filterCount');

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const filter = chip.dataset.filter;
      let shown = 0;
      rows.forEach((row) => {
        const cats = (row.dataset.cat || '').split(/\s+/);
        const match = filter === 'all' || cats.indexOf(filter) !== -1;
        row.classList.toggle('is-hidden', !match);
        if (match) {
          shown++;
          row.classList.remove('row-flash');
          void row.offsetWidth;
          row.classList.add('row-flash');
        }
      });
      if (countEl) {
        countEl.textContent =
          '显示 ' + shown + ' / ' + rows.length + ' 篇 · ' +
          (filter === 'all' ? '按时间倒序' : chip.textContent.replace(/\d+$/, '').trim());
      }
    });
  });
}

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
