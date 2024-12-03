// Mate Chat Script
const mateChatScript = {
  METACRITIC: {
    jump: `Accessing general information`,
    fragments: {
      title: `Exact title unavailable`,
      platforms: `Platform details are missing`,
      release: `Release date data not retrieved`,
      developer: `Developer information is absent`,
      publisher: `Publisher data is unknown`,
      genre: `Genre classification unavailable`,
      metascore: `Metascore details not found`,
      userscore: `User score not retrieved`,
      latest_critic: `Critical reviews unavailable`,
      difficulty_img: `Difficulty statistics are missing`,
      completion_img: `Completion data not accessible`,
    },
    crash: `Unable to retrieve general information`,
  },
  IGN: {
    jump: `Requesting additional details`,
    fragments: {
      image: `Cover image unavailable`,
      summary: `Summary data not found`,
      score: `IGN score is missing`,
      review_critic: `Key critic information unavailable`,
      review_link: `Review article link not accessible`,
      news: `Latest news data not retrieved`,
      guide: `Game guide details not found`,
    },
    crash: `IGN details could not be retrieved`,
  },
  TRUEACHIEVEMENTS: {
    jump: `Achievements data requested`,
    fragments: {
      achievements_guide: `Achievements guide is unavailable`,
    },
    crash: `Achievement information retrieval failed`,
  },
  SPEEDRUN: {
    jump: `Accessing speedrun records`,
    fragments: {
      top_runner: `Top speedrun record not retrieved`,
    },
    crash: `Speedrun data could not be accessed`,
  },
  HOWLONGTOBEAT: {
    jump: `Retrieving completion time`,
    fragments: {
      hltb_img: `Completion time data is unavailable`,
    },
    crash: `Completion time retrieval failed`,
  },
  YOUTUBE: {
    jump: `Searching for the video trailer`,
    fragments: {
      trailer: `Video trailer unavailable`,
    },
    crash: `Trailer could not be retrieved`,
  },
  GGDEALS: {
    jump: `Checking current market prices`,
    fragments: {
      deal_img: `Price details are missing`,
    },
    crash: `Price information retrieval failed`,
  },
  KHINSIDER: {
    jump: `Accessing soundtrack data`,
    fragments: {
      soundtrack: `Soundtrack information is incorrect or unavailable`,
    },
    crash: `Soundtrack playback failed`,
  },
};

export const mateDotLog = (action, web, piece = null) => {
  switch (action) {
    case 'jump':
      console.log(`[INFO] ${mateChatScript[web][action]}\n`);
      break;
    case 'piece':
      console.warn(`[ALERT] ${mateChatScript[web].fragments[piece]}\n`);
      break;
    case 'crash':
      console.warn(`[ALERT] ${mateChatScript[web].crash}\n`);
      break;
    default:
      `Nothing to say`;
  }
};

// Matrix Conversion Conversation
const subLogToCons = console.log;
const subWarnToCons = console.warn;

console.log = function (...args) {
  chat.push(args.join(' '));
  subLogToCons.apply(console, args);
};

console.warn = function (...args) {
  chat.push(args.join(' '));
  subWarnToCons.apply(console, args);
};

global.chat = [];
