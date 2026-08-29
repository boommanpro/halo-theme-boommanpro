// 文章 TOC：从正文标题生成 + 滚动高亮
export function initToc() {
  const content = document.querySelector('.post-content');
  const tocWrap = document.getElementById('postToc');
  if (!content || !tocWrap) return;

  const headings = content.querySelectorAll('h2, h3');
  if (!headings.length) {
    tocWrap.style.display = 'none';
    return;
  }

  // 为无 id 的标题生成锚点
  headings.forEach((h, i) => {
    if (!h.id) h.id = 'sec-' + (i + 1);
  });

  const list = tocWrap.querySelector('.toc-list');
  const ul = document.createElement('ul');
  let currentH2 = null;

  headings.forEach((h) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    a.setAttribute('data-target', h.id);
    li.appendChild(a);

    if (h.tagName === 'H2') {
      ul.appendChild(li);
      currentH2 = li;
    } else if (currentH2) {
      let sub = currentH2.querySelector('ul');
      if (!sub) {
        sub = document.createElement('ul');
        currentH2.appendChild(sub);
      }
      sub.appendChild(li);
    } else {
      ul.appendChild(li);
    }
  });

  list.appendChild(ul);

  // 移动端：TOC 为折叠面板，默认收起，点击链接后自动合上
  const isMobile = () => window.matchMedia('(max-width: 1100px)').matches;
  if (isMobile()) tocWrap.removeAttribute('open');
  tocWrap.querySelectorAll('a[data-target]').forEach((a) => {
    a.addEventListener('click', () => {
      if (isMobile()) tocWrap.removeAttribute('open');
    });
  });

  // 滚动高亮
  const links = tocWrap.querySelectorAll('a[data-target]');
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((l) => l.classList.toggle('is-active', l.dataset.target === entry.target.id));
          }
        });
      },
      { rootMargin: '-15% 0px -70% 0px' }
    );
    headings.forEach((h) => spy.observe(h));
  }
}
