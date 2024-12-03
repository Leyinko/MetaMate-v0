import { answerTemplate } from '../../components/answer/answer-template';
import { App } from '../../router/router';
import { $, $$, fragmentDOM } from '../../utils/DOM';
import { FetchAPI, hideLoading, showLoading } from '../../utils/FetchAPI';
import './Result.css';

export function Result() {
  const HTMLPageTemplate = `
	<main id="result">
    <div id="loading-container">
      <div class="loading-logo"></div>
      <pre id="mate-logs"></pre>
      <button id="abort-controller">Cancel</button>
    </div>
    <section id="mate-answer-box"></section>
	</main>
	`;

  App.appendChild(fragmentDOM(HTMLPageTemplate));
}

export const mateThinking = async () => {
  const searchLS = JSON.parse(localStorage.getItem('search'));
  const loading = $('#loading-container');

  // Loading...
  let start = startThinking();
  const cancel = $('#abort-controller');
  cancel.addEventListener('click', () => interruptMate());

  // Logs
  const reflectionBox = $('#mate-logs');
  const reflectionIntervalID = setInterval(mateReflections, 500);
  const visualLoadingIntervalID = await mateVisualsLoading(searchLS.loading);

  // Ask Mate
  FetchAPI('/api/ask-mate/ask', {}, 'PUT', { prompt: searchLS.prompt }).then((data) => {
    // Result
    let reflectionPeriod = stopThinking(reflectionIntervalID, visualLoadingIntervalID);
    mateAnswer(data, reflectionPeriod);
  });

  function startThinking() {
    const start = showLoading();
    $$('.navigation-bar a').forEach((anchor) => anchor.classList.add('scrapping')), (loading.style.display = 'block');
    return start;
  }

  async function mateReflections() {
    let reflections = await FetchAPI('/api/ask-mate/logs', {}, 'GET');

    reflections.forEach((thought) => {
      if (thought.length <= 100 && !thought.startsWith('MetaMate')) {
        !reflectionBox.classList.contains('show') && reflectionBox.classList.add('show');

        const log = document.createElement('p');
        log.className = thought.startsWith('[INFO]') ? 'log' : 'warn';
        log.textContent = thought.replace(/^\[[A-Z]+\]\s+/, '');
        reflectionBox.appendChild(log);

        log.textContent === '❌ MetaMate operation interrupted.' && interruptMate();
      }
    });
  }

  function stopThinking(...intervals) {
    const end = hideLoading();
    intervals.forEach((interval) => clearInterval(interval));
    $$('.navigation-bar a').forEach((anchor) => anchor.classList.remove('scrapping')), reflectionBox.classList.remove('show'), loading.remove();
    return ((end - start) / 1000).toFixed(2);
  }
};

const mateAnswer = (data, time) => {
  const answer = $('#mate-answer-box');
  const result = $('#result');

  // Answer
  answer.innerHTML = answerTemplate(data, time);

  // Save in LS
  const resultData = {
    template: answer.innerHTML,
    background: JSON.parse(localStorage.getItem('search')).background,
  };
  localStorage.setItem('result', JSON.stringify(resultData));

  // Set Background
  result.style.background = `URL(${JSON.parse(localStorage.getItem('result')).background}) center/cover no-repeat`;
};

const interruptMate = () => FetchAPI('/api/ask-mate/abort', {}, 'POST').then(() => setTimeout(() => window.location.reload(), 2000));

function mateVisualsLoading(images) {
  return new Promise((res, rej) => {
    const container = $('#loading-container');
    let intervalID;

    let length = 0;
    let loaded = undefined;

    images.forEach((img) => {
      loaded = new Image();
      loaded.src = img;

      loaded.addEventListener('load', () => {
        length++;

        if (length === images.length) {
          let count = 0;
          intervalID = setInterval(() => {
            const previous = $('.loading-image');
            if (previous) previous.remove();

            const image = document.createElement('img');
            Object.assign(image, {
              src: images[count],
              className: 'loading-image',
            });

            container.insertAdjacentElement('afterbegin', image);

            count = (count + 1) % images.length;
          }, 5000);

          res(intervalID);
        }
      });
    });
  });
}
