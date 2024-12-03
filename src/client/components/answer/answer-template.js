import './answer-template.css';

export const answerTemplate = (data, time) => {
  return `
		<section id="general">
			<div class="gen-one">
				<q data-time="${time}">MetaMate answered in ${time}s - ${Intl.DateTimeFormat('en-GB').format(new Date())}</q>
        <h1 data-title="${data?.METACRITIC?.title}">${data?.METACRITIC?.title}</h1>
				<img data-cover="${data?.IGN?.image}" src="${data?.IGN?.image}">
    		<audio src="${data?.KHINSIDER?.soundtrack}" preload autoplay controls></audio>
				<span data-release="${data?.METACRITIC?.release}">${data?.METACRITIC?.release}</span>
				<span data-genre="${data?.METACRITIC?.genre}">${data?.METACRITIC?.genre}</span>
        <div class="platforms">${insertsSpecifics['platforms'](data)}</div>
				<p data-developer="${data?.METACRITIC?.developer}">${data?.METACRITIC?.developer}</p>
				<p data-publisher="${data?.METACRITIC?.publisher}">${data?.METACRITIC?.publisher}</p>
        <a data-trailer="${data?.YOUTUBE?.trailer}" href="${data?.YOUTUBE?.trailer}" target="_blank">${data?.YOUTUBE?.trailer !== 'NOT FOUND' ? `Watch trailer` : `NOT FOUND`}</a>
			</div>
			<div class="gen-two">
				<div>
					<div class="scores">
          <h2 data-ign-score="${data?.IGN?.score}">${data?.IGN?.score} / 10 (IGN)</h2>
          <h2 data-metascore="${data?.METACRITIC?.metascore}">${data?.METACRITIC?.metascore} / 100 (Metascore)</h2>
          <h2 data-userscore="${data?.METACRITIC?.userscore}">${data?.METACRITIC?.userscore} / 10 (Users)</h2>
				</div>
				<div class="description">
          <span data-summary="${data?.IGN?.summary}">${data?.IGN?.summary}</span>
          <q data-latest-critic="${data?.METACRITIC?.latest_critic}">${data?.METACRITIC?.latest_critic}</q>
          <a href="${data?.IGN?.review_link}" target="_blank">${data?.IGN?.review_link !== 'NOT FOUND' ? `Read full review` : `NOT FOUND`}</a>
				</div>
				</div>
				<div id="completion">
					<a href="${data?.TRUEACHIEVEMENTS?.achievements_guide}" target="_blank">${data?.TRUEACHIEVEMENTS?.achievements_guide !== 'NOT FOUND' ? `Achievements Guide` : `NOT FOUND`}</a>
					<a href="${data?.IGN?.guide}" target="_blank">${data?.TRUEACHIEVEMENTS?.achievements_guide !== 'NOT FOUND' ? `Full Guide Walkthrough` : `NOT FOUND`}</a>
					<div class="images">${insertsSpecifics['images'](data)}</div>
					<div>
						<div class="speedrun">${insertsSpecifics['speedrun'](data)}</div>
					<div class="news">${insertsSpecifics['news'](data)}</div>
					</div>
				</div>
			</div>
		</section>
	`;
};

const insertsSpecifics = {
  platforms: (data) => (Array.isArray(data?.METACRITIC?.platforms) ? data?.METACRITIC?.platforms.map((pl) => `<span>${pl}</span>`).join('') : `<h2>PLATFORMS INFO NOT FOUND</h2>`),
  images: (data) => {
    let images = [data?.METACRITIC?.difficulty_img, data?.METACRITIC?.completion_img, data?.HOWLONGTOBEAT?.hltb_img, data?.GGDEALS?.deal_img];
    return images.map((image) => (image.startsWith('document') ? `<h2>❌</h2>` : `<img src="${image}">`)).join('');
  },
  speedrun: (data) =>
    Array.isArray(data?.SPEEDRUN?.top_runner)
      ? data?.SPEEDRUN?.top_runner.map((el, index) => el && (index === 0 ? `<h2>Top Speedrun in ${el}</h2>` : `<a href="${el}" target="_blank">Run info</a>`)).join('')
      : `<h2>SPEEDRUN NOT FOUND</h2>`,
  news: (data) =>
    Array.isArray(data?.IGN?.news)
      ? data?.IGN?.news.map((art) => `<a href="${art}" target="_blank">${art !== 'NOT FOUND' ? `${art.split('/').pop().replaceAll('-', ' ').toUpperCase()}` : `NOT FOUND`}</a>`).join('')
      : `<h2>LATEST NEWS NOT FOUND</h2>`,
};
