// 代码高亮：highlight.js（常用语言子集）
import hljs from 'highlight.js/lib/common';

export function initHighlight() {
  const blocks = document.querySelectorAll('.post-content pre code');
  if (!blocks.length) return;
  blocks.forEach((block) => {
    try {
      hljs.highlightElement(block);
    } catch (e) {
      /* ignore */
    }
  });
}
