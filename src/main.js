// boommanpro · 纸与墨 —— 脚本入口
import './css/main.scss';
import { initTheme } from './js/theme.js';
import { initProgress } from './js/progress.js';
import { initReveal } from './js/reveal.js';
import { initCounters } from './js/counters.js';
import { initFilter, initToday, initNavSpy } from './js/home.js';
import { initToc } from './js/toc.js';
import { initHighlight } from './js/highlight.js';

document.documentElement.classList.add('js');

function boot() {
  initTheme();
  initProgress();
  initReveal();
  initCounters();
  initFilter();
  initToday();
  initNavSpy();
  initToc();
  initHighlight();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
