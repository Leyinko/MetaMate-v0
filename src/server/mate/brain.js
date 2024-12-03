import { core, jump, admission, snapshots, archives } from './tools.js';
import { mateDotLog } from './communication.js';

export const mateBrain = {
  async thinking(browser, game) {
    // Brain
    let page = await browser.newPage();
    await page.goto(core()), await admission(page);

    const mateAnswer = {};

    const gatherFromFragments = (game, web) =>
      new Promise(async (res, rej) => {
        try {
          // Lock
          let verse = archives[web];
          await page.goto(core(game, verse.lock), { waitUntil: 'networkidle0' });

          // Jump
          if (verse.pad) await jump(page, web);
          mateDotLog('jump', web);

          // Gather
          const collection = {};
          for (let piece of Object.keys(verse.fragments)) {
            try {
              let answer = await page.evaluate((fragment) => eval(fragment), verse.fragments[piece]);
              // Writes
              Array.isArray(answer) ? (collection[piece] = String(answer).split(',')) : (collection[piece] = answer);
              // Visuals
              if (/img$/.test(piece)) collection[piece] = verse.fragments[piece];
            } catch (error) {
              mateDotLog('piece', web, piece), (collection[piece] = 'NOT FOUND');
            }
          }
          if (Object.keys(collection).some((key) => key.endsWith('img'))) await snapshots(page, web, collection);

          // Extract
          res(collection);
        } catch (error) {
          mateDotLog('crash', web), rej(error);
        }
      });

    // Fragments Loop Operation
    for (let memory of Object.keys(archives)) mateAnswer[memory] = await gatherFromFragments(game, memory);
    await page.close();
    return mateAnswer;
  },
};
