import { Home } from '../pages/Home/Home';
import { Result } from '../pages/Result/Result';
import { $, $$ } from '../utils/DOM';

window.addEventListener('popstate', router);

export const App = $('#app');

export const routes = [
  {
    path: '/home',
    page: Home,
  },
  {
    path: '/result',
    page: Result,
  },
];

function router() {
  let path = window.location.pathname;
  let pageSelector = '#app > :last-of-type:not(nav)';

  $('.actual-page')?.remove();

  const { page } = routes.find((route) => route.path === path) || {};
  page && page();

  $(`${pageSelector}`).className = 'actual-page';
}

export function navigationState(e) {
  let href = e.target.getAttribute('href');
  if (href) {
    !href.startsWith('http') ? (e.preventDefault(), navigate(href)) : window.open(href);
  }
}

export const navigate = (path) => {
  const links = $$('a');
  links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === path));
  window.history.pushState(null, null, window.location.origin + path);
  router();
};
