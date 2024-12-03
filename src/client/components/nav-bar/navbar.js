import { App, navigate, navigationState, routes } from '../../router/router';
import { fragmentDOM } from '../../utils/DOM';
import './navbar.css';

export const MetaMate_v0 = () => {
  // Top
  const nav = document.createElement('nav');
  nav.className = 'navigation-bar';
  routes.forEach((route) => nav.append(anchor(route.path)));
  App.prepend(nav), App.addEventListener('click', navigationState), navigate('/home');
  // Bottom
  nav.appendChild(fragmentDOM('<span>© 2024 MetaMate. All rights reserved.</span>'));
};

export function anchor(path) {
  let template = `<a href="${path}">${path.at(1).toUpperCase() + path.slice(2)}</a>`;
  let anchor = fragmentDOM(template);
  return anchor;
}
