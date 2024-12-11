import { writeMetaAnswer } from '../utils/writeFile.js';
import { mateBrain } from './brain.js';
import puppeteer from 'puppeteer';

// Mate Main Task
async function askMate(game) {
  let brainstorm;

  try {
    brainstorm = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process', '--no-sandbox', '--disable-setuid-sandbox', '--start-maximized'],
      ignoreHTTPSErrors: true,
    });

    const mateAnswer = await mateBrain.thinking(brainstorm, game);
    await brainstorm.close();
    writeMetaAnswer(mateAnswer);
    return mateAnswer;
  } catch (error) {
    console.error(`Asking your mate failed`);
    if (brainstorm) await brainstorm.close();
    process.exit(1);
  }
}

// Mate Subconscious Communication
process.on('message', async (game) => {
  try {
    const result = await askMate(game);
    process.send({ status: 'success', result });
  } catch (error) {
    process.send({ status: 'error', error: error.message });
  }
});

const positiveThoughts = console.log;
const negativeThoughts = console.warn;

console.log = function (...args) {
  process.send({ type: 'log', log: args.join(' ') });
  positiveThoughts.apply(console, args);
};

console.warn = function (...args) {
  process.send({ type: 'warn', log: args.join(' ') });
  negativeThoughts.apply(console, args);
};
