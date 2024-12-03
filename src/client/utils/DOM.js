export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);
export const fragmentDOM = (template) => document.createRange().createContextualFragment(template);
