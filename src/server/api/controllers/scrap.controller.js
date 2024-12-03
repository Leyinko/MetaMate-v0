import { fork } from 'node:child_process';

let scrapingProcess = null;

export const checkIt = async (req, res, next) => {
  const game = req.params.game;
  const url = `https://api.rawg.io/api/games?search=${encodeURIComponent(game)}&key=e78489cb3ca94514b01bc659a6d92bba&page_size=5`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const games = data.results.map((game) => game);
    return res.status(200).json(games);
  } catch (error) {
    console.error('Error fetching games suggestions', error);
    next(error);
  }
};

export const scrapIt = (req, res, next) => {
  const { prompt } = req.body;

  try {
    // Call mate
    scrapingProcess = fork('src/server/mate/index.js');
    scrapingProcess.send(prompt);

    // Feedback
    scrapingProcess.on('message', (message) => {
      message.type === 'log' ? console.log(message.log) : console.warn(message.log);
      if (message.status === 'success') {
        res.status(200).json(message.result), (scrapingProcess = null);
      } else if (message.status === 'error') {
        next(new Error(message.error)), (scrapingProcess = null);
      } else if (message === 'terminate') {
        scrapingProcess.kill(0);
      }
    });

    // End
    scrapingProcess.on('exit', () => {
      console.log(`❌ MetaMate operation interrupted.`), (scrapingProcess = null);
    });
  } catch (error) {
    next(error);
  }
};

export const abortIt = async (req, res, next) => {
  try {
    if (scrapingProcess) {
      scrapingProcess.send('terminate');
      scrapingProcess = null;
      return res.status(200).json('Operation stopped');
    } else {
      return res.status(404).json('No scrapping operation');
    }
  } catch (error) {
    next(error);
  }
};

export const thinkIt = async (req, res, next) => {
  try {
    let current = [...chat];
    chat = [];

    return res.status(200).json(current);
  } catch (error) {
    next(error);
  }
};
