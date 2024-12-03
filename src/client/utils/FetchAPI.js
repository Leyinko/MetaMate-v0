import { $ } from './DOM';

const API_URL = import.meta.env.VITE_API_URL;

export const FetchAPI = async (route, headers, method = 'GET', body) => {
  let config = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(`${API_URL}${route}`, config);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('FetchAPI function error', error);
  }
};

export function showLoading() {
  const start = performance.now();
  $('.loading-logo').classList.add('loading');
  return start;
}

export function hideLoading() {
  const end = performance.now();
  $('.loading-logo').classList.remove('loading');
  return end;
}
