import { App, navigate } from '../../router/router';
import { $, $$, fragmentDOM } from '../../utils/DOM';
import { FetchAPI, showLoading } from '../../utils/FetchAPI';
import { mateThinking } from '../Result/Result';
import './Home.css';

export function Home() {
  const HTMLPageTemplate = `
	<main id="home">
		<img src="../../meta-mate-v0.png" class="logo" alt="MetaMatev0 logo" href="https://github.com/Leyinko/metamate-v0" target="_blank"/>
    <div class="search">
      <input id="search" type="input"></input>
      <img role="button" src="/enter.svg">
      <ul id="suggestions-box">
        <div class="loading-logo"></div>
      </ul>
    </div>
	</main>
	`;

  App.appendChild(fragmentDOM(HTMLPageTemplate)), CompHandlers();
}

const CompHandlers = () => {
  const resultLS = localStorage.getItem('result');

  const input = $('#search');
  const suggestions = $('#suggestions-box');
  const enter = $('[role="button"]');
  const resultAnchor = $('a[href="/result"]');

  lastMateAnswer(resultAnchor, resultLS);
  mateSuggestions(input, suggestions, enter);
  askYourMate(enter);
};

const mateSuggestions = (input, suggestions, enter) => {
  // Debounce
  let debounceTimeout;
  input.addEventListener('input', (e) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => outputSuggestions(e.target.value), 300);
  });

  const outputSuggestions = async (game) => {
    suggestions.innerHTML = '<div class="loading-logo"></div>';

    if (game.length > 2) {
      showLoading();
      FetchAPI(`/api/ask-mate/check/${game}`).then((data) => {
        resetSuggestionsBox();
        // console.log(data);
        data.forEach((game, index) => {
          const suggestion = document.createElement('li');

          suggestion.textContent = game.name;
          suggestion.style.animationDelay = `${index * 100}ms`;

          Object.assign(suggestion.dataset, {
            p: game && game?.platforms.at(-1).platform.name,
            y: game && game?.released?.match(/^[0-9]+/)[0],
          });

          suggestion.addEventListener('click', (e) => lockSuggestion(e.target, game));
          suggestions.appendChild(suggestion);
        });
      });
    } else {
      resetSuggestionsBox();
    }

    function resetSuggestionsBox() {
      suggestions.innerHTML = '';
      enter.classList.remove('locked');
    }

    const lockSuggestion = (suggestion, game) => {
      const suggestions = $$('li');
      suggestions.forEach((el) => (el !== suggestion ? el.classList.remove('locked') : suggestion.classList.add('locked')));

      // Lock
      (input.value = suggestion.textContent), enter.classList.add('locked');

      const search = {
        prompt: `${input.value} video game ${suggestion.dataset.y} ${suggestion.dataset.p}`,
        background: game.background_image,
        loading: game.short_screenshots.map((screen) => screen.image),
      };

      localStorage.setItem('search', JSON.stringify(search));
    };
  };
};

const askYourMate = (enter) =>
  enter.addEventListener('click', () => {
    // Animation
    const elements = $$('#home *');
    elements.forEach((element, index) => {
      element.style.animation = 'floating 1s forwards ease-in-out';
      element.style.animationDelay = `${index * 200}ms`;
    });
    // Reset last result
    localStorage.removeItem('result');
    // To Result
    setTimeout(() => (navigate('/result'), mateThinking()), 1000);
  });

const lastMateAnswer = async (anchor, resultLS) => {
  if (resultLS) {
    anchor.classList.add('show');

    anchor.addEventListener('click', async () => {
      await mateAnswerBoxDOM();

      const answer = $('#mate-answer-box');
      const result = $('#result');

      answer.innerHTML = JSON.parse(resultLS).template.replaceAll('\n', '');
      result.style.background = `URL(${JSON.parse(localStorage.getItem('result')).background}) center/cover no-repeat`;
    });
  }

  const mateAnswerBoxDOM = () => {
    return new Promise((res, rej) => {
      const check = setInterval(() => {
        $('#mate-answer-box') ? (clearInterval(check), res()) : rej();
      }, 200);
    });
  };
};
