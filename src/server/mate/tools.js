import { mateDotLog } from './communication.js';

const core = (game = '', web = '') => `https://www.google.com/search?q=${game.replaceAll(' ', '+') + web}`;
const password = /(?<=')[^']+(?=')/g;

const archives = {
  METACRITIC: {
    lock: '+metacritic.com/game',
    pad: 'a[href*="www.metacritic.com/game"]',
    fragments: {
      title: `document.querySelector('[data-testid="hero-title"] > h1').textContent`,
      platforms: `Array.from(
        document.querySelectorAll('[class*="c-gameDetails_sectionContainer"]:first-of-type > div:first-of-type > ul > li')
      ).map((el) => el.textContent.trim().replace(/\s/g, ' '))`,
      release: `document.querySelector(
        '[class*="c-gameDetails_sectionContainer"]:first-of-type > div:last-of-type span:last-of-type'
      ).textContent`,
      developer: `document.querySelector('[class*="c-gameDetails_Developer"] ul li').textContent.trim()`,
      publisher: `document.querySelector('[class*="c-gameDetails_Distributor"] span:last-of-type').textContent`,
      genre: `document.querySelector('[class*="c-gameDetails_sectionContainer"]:last-of-type .c-globalButton_label')
        .textContent.trim()`,
      metascore: `document.querySelector('[data-testid="critic-score-info"] div:last-of-type span').textContent`,
      userscore: `document.querySelector('[data-testid="user-score-info"] div:last-of-type span').textContent`,
      latest_critic: `\`\${document.querySelector('.c-siteReviewHeader_publisherLogo a').textContent.trim()} : \${document.querySelector('[class*="c-siteReview_quote"] span').textContent}\``,
      difficulty_img: `document.querySelector('[class*="globalCarousel_content-scrollable"] > div:first-of-type')`,
      completion_img: `document.querySelector('[class*="globalCarousel_content-scrollable"] > div:last-of-type')`,
    },
  },
  IGN: {
    lock: '+ign.com/games',
    pad: 'a[href*="//www.ign.com/games"]',
    fragments: {
      image: `document.querySelector('figure img').src`,
      summary: `document.querySelector('[data-cy="content-rating-description"] > div').textContent`,
      score: `document.querySelector('[data-cy="review-score"] span').textContent`,
      review_critic: `\`\${document.querySelector('[class$="review-details"] > div:last-of-type div').textContent.toUpperCase()} : \${document.querySelector("[class$='review-details'] > div:last-of-type div:nth-of-type(2)").textContent}\``,
      review_link: `new URL(document.URL).origin + document.querySelector('[class$="review-details"] > div:last-of-type a:last-of-type').getAttribute('href')`,
      news: `Array.from(document.querySelectorAll('[data-cy="content-item"] a.item-body')).slice(0, 3).map(el => new URL(document.URL).origin + el.getAttribute('href'))`,
      guide: `new URL(document.URL).origin + document.querySelector('[class$="guide-links"] ul a:first-of-type').getAttribute('href')`,
    },
  },
  TRUEACHIEVEMENTS: {
    lock: '+achievements+trueachievements.com',
    fragments: {
      achievements_guide: `document.querySelector('#search a[href*="achievements"]:first-of-type').getAttribute('href')`,
    },
  },
  SPEEDRUN: {
    lock: '+on+speedrun.com',
    pad: 'a[href*="www.speedrun.com"]',
    fragments: {
      top_runner: `[document.querySelectorAll('tbody tr:first-of-type td:nth-of-type(4) a span')[0].textContent, new URL(document.URL).origin + document.querySelector('tbody tr a').getAttribute('href')]`,
    },
  },
  HOWLONGTOBEAT: {
    lock: '+howlongtobeat.com',
    pad: 'a[href*="howlongtobeat.com/game"]',
    fragments: {
      hltb_img: `document.querySelector('[class*="GameStats_game_times"]')`,
    },
  },
  YOUTUBE: {
    lock: '+official+trailer',
    fragments: {
      trailer: `document.querySelector('#search a').getAttribute('href')`,
    },
  },
  GGDEALS: {
    lock: '+best+price+gg.deals.com',
    pad: 'a[href*="https://gg.deals/game"]',
    fragments: {
      deal_img: `document.querySelector('.col-right')`,
    },
  },
  KHINSIDER: {
    lock: '+original+soundtrack+khinsider.com',
    pad: 'a[href*="https://downloads.khinsider.com/"]',
    fragments: {
      soundtrack: `document.querySelector('audio').src`,
    },
  },
};

const admission = async (page) => {
  const googleCookie = await page.$('button:nth-of-type(2)');
  if (googleCookie) await googleCookie.click();
};

const jump = async (page, web) => {
  try {
    const access = await page.waitForSelector(archives[web].pad, { timeout: 3000 });
    await access.click();

    await new Promise((resolve) => setTimeout(resolve, 500));

    const selector = Object.values(archives[web].fragments).at(0).match(password)[0];
    await page.waitForSelector(selector, { timeout: 5000 });

    let timeout = web === 'KHINSIDER' ? 1000 : 500;
    await new Promise((resolve) => setTimeout(resolve, timeout));
  } catch (error) {
    mateDotLog('crash', web);
  }
};

const snapshots = async (page, web, collected) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  switch (web) {
    case 'METACRITIC':
      try {
        const metaCookie = await page.waitForSelector('#onetrust-accept-btn-handler');
        if (metaCookie) await metaCookie.click();

        for (let flash of Object.keys(collected)) {
          if (flash.endsWith('img')) {
            const modalSelector = collected[flash].match(password)[0];
            const modal = await page.$(modalSelector);

            modal.scrollIntoView();
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const buffer = await modal.screenshot({ encoding: 'base64', fullpage: false });
            collected[flash] = `data:image/png;base64,${buffer}`;
          }
        }
      } catch (error) {
        mateDotLog('piece', web, flash);
      }
      break;
    case 'HOWLONGTOBEAT':
    case 'GGDEALS':
      try {
        const howlongCookie = await page.$('#onetrust-accept-btn-handler');
        if (howlongCookie) await howlongCookie.click();

        await new Promise((resolve) => setTimeout(resolve, 1000));

        let flash = Object.keys(collected)[0];
        const image = await page.$(collected[flash].match(password)[0]);
        const buffer = await image.screenshot({ encoding: 'base64' });
        collected[flash] = `data:image/png;base64,${buffer}`;
      } catch (error) {
        mateDotLog('piece', web, flash);
      }
      break;
    default:
      'No such fragment';
  }
};

export { archives, password, snapshots, core, admission, jump };
