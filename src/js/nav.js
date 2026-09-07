// 站点导航：当前页高亮（按路径精确/前缀匹配）+ 子菜单下拉
// 说明：服务端 contains(active) 匹配在自定义路由前缀（如归档挂到 /post）时失效，
// 这里以浏览器实际路径为准重新计算 is-active。
function normalizePath(p) {
  if (!p) return '';
  try {
    const u = new URL(p, location.origin);
    let path = u.pathname;
    if (path.length > 1) path = path.replace(/\/+$/, '');
    return path;
  } catch (e) {
    return p;
  }
}

function isLocalHref(href) {
  if (!href || href.charAt(0) === '#') return false;
  if (href.charAt(0) === '/') return true;
  try {
    return new URL(href, location.origin).host === location.host;
  } catch (e) {
    return false;
  }
}

export function initNavActive() {
  const links = document.querySelectorAll('.site-nav .nav-link, .site-nav .nav-drop-link');
  if (!links.length) return;

  const current = normalizePath(location.pathname) || '/';

  // 收集所有命中项，取最长路径（最精确）的作为当前项
  let best = null; // { link }
  links.forEach((a) => {
    const href = a.getAttribute('href');
    if (!isLocalHref(href)) return;
    const path = normalizePath(href);
    if (!path) return;
    const hit = path === '/' ? current === '/' : current === path || current.indexOf(path + '/') === 0;
    if (hit && (!best || path.length > best.path.length)) {
      best = { link: a, path: path };
    }
  });

  // 重新计算所有 is-active（覆盖服务端的 contains 猜测）
  const activeSet = new Set();
  if (best) {
    activeSet.add(best.link);
    // 命中的是子项时，其父项 nav-link 一并高亮
    const item = best.link.closest('.nav-item');
    const parentLink = item ? item.querySelector('.nav-link') : null;
    if (parentLink && parentLink !== best.link) activeSet.add(parentLink);
  }
  links.forEach((a) => {
    a.classList.toggle('is-active', activeSet.has(a));
  });
}

export function initNavDrop() {
  const items = document.querySelectorAll('.nav-item');
  if (!items.length) return;
  let openItem = null;

  function place(drop, link) {
    const rect = link.getBoundingClientRect();
    drop.style.left = rect.left + 'px';
    drop.style.top = rect.bottom + 'px';
  }

  function open(item) {
    if (openItem === item) return;
    close();
    const drop = item.querySelector('.nav-drop');
    const link = item.querySelector('.nav-link');
    if (!drop || !link) return;
    place(drop, link);
    item.classList.add('is-open');
    link.setAttribute('aria-expanded', 'true');
    openItem = item;
  }

  function close() {
    if (!openItem) return;
    const link = openItem.querySelector('.nav-link');
    openItem.classList.remove('is-open');
    if (link) link.setAttribute('aria-expanded', 'false');
    openItem = null;
  }

  items.forEach((item) => {
    const drop = item.querySelector('.nav-drop');
    const link = item.querySelector('.nav-link');
    if (!drop || !link) return;

    // 桌面：悬停展开
    item.addEventListener('mouseenter', () => {
      if (window.matchMedia('(hover: hover)').matches) open(item);
    });
    item.addEventListener('mouseleave', () => {
      if (window.matchMedia('(hover: hover)').matches) close();
    });

    // 触屏：首次点击展开，再次点击放行跳转
    link.addEventListener('click', (e) => {
      if (window.matchMedia('(hover: hover)').matches) return;
      if (openItem === item) return;
      e.preventDefault();
      open(item);
    });
  });

  // 点击外部 / ESC / 滚动时收起
  document.addEventListener('click', (e) => {
    if (openItem && !openItem.contains(e.target)) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
  window.addEventListener(
    'scroll',
    () => {
      if (openItem) close();
    },
    { passive: true }
  );
}
