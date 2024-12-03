(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const t of s)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function o(s){const t={};return s.integrity&&(t.integrity=s.integrity),s.referrerPolicy&&(t.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?t.credentials="include":s.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(s){if(s.ep)return;s.ep=!0;const t=o(s);fetch(s.href,t)}})();const u=e=>document.querySelector(e),f=e=>document.querySelectorAll(e),a=e=>document.createRange().createContextualFragment(e),q="http://localhost:3000",I=async(e,n,o="GET",r)=>{let s={method:o,headers:{"Content-Type":"application/json",...n},body:JSON.stringify(r)};try{return await(await fetch(`${q}${e}`,s)).json()}catch(t){throw console.log(t),new Error("FetchAPI function error",t)}};function B(){const e=performance.now();return u(".loading-logo").classList.add("loading"),e}function d(){const e=performance.now();return u(".loading-logo").classList.remove("loading"),e}const V=(e,n)=>{var o,r,s,t,l,h,m,i,g,c,p,T,$,C,O,w,M,A,y,L,b,S,k,R,U,D,_,F,G,P,H,x;return`
		<section id="general">
			<div class="gen-one">
				<q data-time="${n}">MetaMate answered in ${n}s - ${Intl.DateTimeFormat("en-GB").format(new Date)}</q>
        <h1 data-title="${(o=e==null?void 0:e.METACRITIC)==null?void 0:o.title}">${(r=e==null?void 0:e.METACRITIC)==null?void 0:r.title}</h1>
				<img data-cover="${(s=e==null?void 0:e.IGN)==null?void 0:s.image}" src="${(t=e==null?void 0:e.IGN)==null?void 0:t.image}">
    		<audio src="${(l=e==null?void 0:e.KHINSIDER)==null?void 0:l.soundtrack}" preload autoplay controls></audio>
				<span data-release="${(h=e==null?void 0:e.METACRITIC)==null?void 0:h.release}">${(m=e==null?void 0:e.METACRITIC)==null?void 0:m.release}</span>
				<span data-genre="${(i=e==null?void 0:e.METACRITIC)==null?void 0:i.genre}">${(g=e==null?void 0:e.METACRITIC)==null?void 0:g.genre}</span>
        <div class="platforms">${v.platforms(e)}</div>
				<p data-developer="${(c=e==null?void 0:e.METACRITIC)==null?void 0:c.developer}">${(p=e==null?void 0:e.METACRITIC)==null?void 0:p.developer}</p>
				<p data-publisher="${(T=e==null?void 0:e.METACRITIC)==null?void 0:T.publisher}">${($=e==null?void 0:e.METACRITIC)==null?void 0:$.publisher}</p>
        <a data-trailer="${(C=e==null?void 0:e.YOUTUBE)==null?void 0:C.trailer}" href="${(O=e==null?void 0:e.YOUTUBE)==null?void 0:O.trailer}" target="_blank">${((w=e==null?void 0:e.YOUTUBE)==null?void 0:w.trailer)!=="NOT FOUND"?"Watch trailer":"NOT FOUND"}</a>
			</div>
			<div class="gen-two">
				<div>
					<div class="scores">
          <h2 data-ign-score="${(M=e==null?void 0:e.IGN)==null?void 0:M.score}">${(A=e==null?void 0:e.IGN)==null?void 0:A.score} / 10 (IGN)</h2>
          <h2 data-metascore="${(y=e==null?void 0:e.METACRITIC)==null?void 0:y.metascore}">${(L=e==null?void 0:e.METACRITIC)==null?void 0:L.metascore} / 100 (Metascore)</h2>
          <h2 data-userscore="${(b=e==null?void 0:e.METACRITIC)==null?void 0:b.userscore}">${(S=e==null?void 0:e.METACRITIC)==null?void 0:S.userscore} / 10 (Users)</h2>
				</div>
				<div class="description">
          <span data-summary="${(k=e==null?void 0:e.IGN)==null?void 0:k.summary}">${(R=e==null?void 0:e.IGN)==null?void 0:R.summary}</span>
          <q data-latest-critic="${(U=e==null?void 0:e.METACRITIC)==null?void 0:U.latest_critic}">${(D=e==null?void 0:e.METACRITIC)==null?void 0:D.latest_critic}</q>
          <a href="${(_=e==null?void 0:e.IGN)==null?void 0:_.review_link}" target="_blank">${((F=e==null?void 0:e.IGN)==null?void 0:F.review_link)!=="NOT FOUND"?"Read full review":"NOT FOUND"}</a>
				</div>
				</div>
				<div id="completion">
					<a href="${(G=e==null?void 0:e.TRUEACHIEVEMENTS)==null?void 0:G.achievements_guide}" target="_blank">${((P=e==null?void 0:e.TRUEACHIEVEMENTS)==null?void 0:P.achievements_guide)!=="NOT FOUND"?"Achievements Guide":"NOT FOUND"}</a>
					<a href="${(H=e==null?void 0:e.IGN)==null?void 0:H.guide}" target="_blank">${((x=e==null?void 0:e.TRUEACHIEVEMENTS)==null?void 0:x.achievements_guide)!=="NOT FOUND"?"Full Guide Walkthrough":"NOT FOUND"}</a>
					<div class="images">${v.images(e)}</div>
					<div>
						<div class="speedrun">${v.speedrun(e)}</div>
					<div class="news">${v.news(e)}</div>
					</div>
				</div>
			</div>
		</section>
	`},v={platforms:e=>{var n,o;return Array.isArray((n=e==null?void 0:e.METACRITIC)==null?void 0:n.platforms)?(o=e==null?void 0:e.METACRITIC)==null?void 0:o.platforms.map(r=>`<span>${r}</span>`).join(""):"<h2>PLATFORMS INFO NOT FOUND</h2>"},images:e=>{var o,r,s,t;return[(o=e==null?void 0:e.METACRITIC)==null?void 0:o.difficulty_img,(r=e==null?void 0:e.METACRITIC)==null?void 0:r.completion_img,(s=e==null?void 0:e.HOWLONGTOBEAT)==null?void 0:s.hltb_img,(t=e==null?void 0:e.GGDEALS)==null?void 0:t.deal_img].map(l=>l.startsWith("document")?"<h2>❌</h2>":`<img src="${l}">`).join("")},speedrun:e=>{var n,o;return Array.isArray((n=e==null?void 0:e.SPEEDRUN)==null?void 0:n.top_runner)?(o=e==null?void 0:e.SPEEDRUN)==null?void 0:o.top_runner.map((r,s)=>r&&(s===0?`<h2>Top Speedrun in ${r}</h2>`:`<a href="${r}" target="_blank">Run info</a>`)).join(""):"<h2>SPEEDRUN NOT FOUND</h2>"},news:e=>{var n,o;return Array.isArray((n=e==null?void 0:e.IGN)==null?void 0:n.news)?(o=e==null?void 0:e.IGN)==null?void 0:o.news.map(r=>`<a href="${r}" target="_blank">${r!=="NOT FOUND"?`${r.split("/").pop().replaceAll("-"," ").toUpperCase()}`:"NOT FOUND"}</a>`).join(""):"<h2>LATEST NEWS NOT FOUND</h2>"}};function Y(){E.appendChild(a(`
	<main id="result">
    <div id="loading-container">
      <div class="loading-logo"></div>
      <pre id="mate-logs"></pre>
      <button id="abort-controller">Cancel</button>
    </div>
    <section id="mate-answer-box"></section>
	</main>
	`))}const K=async()=>{const e=JSON.parse(localStorage.getItem("search")),n=u("#loading-container");let o=h();u("#abort-controller").addEventListener("click",()=>j);const s=u("#mate-logs"),t=setInterval(m,500),l=await z(e.loading);I("/api/ask-mate/ask",{},"PUT",{prompt:e.prompt}).then(g=>{let c=i(t,l);Z(g,c)});function h(){const g=B();return f(".navigation-bar a").forEach(c=>c.classList.add("scrapping")),n.style.display="block",g}async function m(){(await I("/api/ask-mate/logs",{},"GET")).forEach(c=>{if(c.length<=100&&!c.startsWith("MetaMate")){!s.classList.contains("show")&&s.classList.add("show");const p=document.createElement("p");p.className=c.startsWith("[INFO]")?"log":"warn",p.textContent=c.replace(/^\[[A-Z]+\]\s+/,""),s.appendChild(p),p.textContent==="❌ MetaMate operation interrupted."&&j()}})}function i(...g){const c=d();return g.forEach(p=>clearInterval(p)),f(".navigation-bar a").forEach(p=>p.classList.remove("scrapping")),s.classList.add("show"),n.remove(),((c-o)/1e3).toFixed(2)}},Z=(e,n)=>{const o=u("#mate-answer-box"),r=u("#result");o.innerHTML=V(e,n);const s={template:o.innerHTML,background:JSON.parse(localStorage.getItem("search")).background};localStorage.setItem("result",JSON.stringify(s)),r.style.background=`URL(${JSON.parse(localStorage.getItem("result")).background}) center/cover no-repeat`},j=()=>I("/api/ask-mate/abort",{},"POST").then(()=>setTimeout(()=>window.location.reload(),2e3));function z(e){return new Promise((n,o)=>{const r=u("#loading-container");let s,t=0,l;e.forEach(h=>{l=new Image,l.src=h,l.addEventListener("load",()=>{if(t++,t===e.length){let m=0;s=setInterval(()=>{const i=u(".loading-image");i&&i.remove();const g=document.createElement("img");Object.assign(g,{src:e[m],className:"loading-image"}),r.insertAdjacentElement("afterbegin",g),m=(m+1)%e.length},5e3),n(s)}})})})}function Q(){E.appendChild(a(`
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
	`)),X()}const X=()=>{const e=localStorage.getItem("result"),n=u("#search"),o=u("#suggestions-box"),r=u('[role="button"]'),s=u('a[href="/result"]');se(s,e),ee(n,o,r),ne(r)},ee=(e,n,o)=>{let r;e.addEventListener("input",t=>{clearTimeout(r),r=setTimeout(()=>s(t.target.value),300)});const s=async t=>{n.innerHTML='<div class="loading-logo"></div>',t.length>2?(B(),I(`/api/ask-mate/check/${t}`).then(m=>{l(),m.forEach((i,g)=>{var p;const c=document.createElement("li");c.textContent=i.name,c.style.animationDelay=`${g*100}ms`,Object.assign(c.dataset,{p:i&&(i==null?void 0:i.platforms.at(-1).platform.name),y:i&&((p=i==null?void 0:i.released)==null?void 0:p.match(/^[0-9]+/)[0])}),c.addEventListener("click",T=>h(T.target,i)),n.appendChild(c)})})):l();function l(){n.innerHTML="",o.classList.remove("locked")}const h=(m,i)=>{f("li").forEach(p=>p!==m?p.classList.remove("locked"):m.classList.add("locked")),e.value=m.textContent,o.classList.add("locked");const c={prompt:`${e.value} video game ${m.dataset.y} ${m.dataset.p}`,background:i.background_image,loading:i.short_screenshots.map(p=>p.image)};localStorage.setItem("search",JSON.stringify(c))}}},ne=e=>e.addEventListener("click",()=>{f("#home *").forEach((o,r)=>{o.style.animation="floating 1s forwards ease-in-out",o.style.animationDelay=`${r*200}ms`}),localStorage.removeItem("result"),setTimeout(()=>(N("/result"),K()),1e3)}),se=async(e,n)=>{n&&(e.classList.add("show"),e.addEventListener("click",async()=>{await o();const r=u("#mate-answer-box"),s=u("#result");r.innerHTML=JSON.parse(n).template.replaceAll(`
`,""),s.style.background=`URL(${JSON.parse(localStorage.getItem("result")).background}) center/cover no-repeat`}));const o=()=>new Promise((r,s)=>{const t=setInterval(()=>{u("#mate-answer-box")?(clearInterval(t),r()):s()},200)})};window.addEventListener("popstate",W);const E=u("#app"),J=[{path:"/home",page:Q},{path:"/result",page:Y}];function W(){var r;let e=window.location.pathname,n="#app > :last-of-type:not(nav)";(r=u(".actual-page"))==null||r.remove();const{page:o}=J.find(s=>s.path===e)||{};o&&o(),u(`${n}`).className="actual-page"}function oe(e){let n=e.target.getAttribute("href");n&&(n.startsWith("http")?window.open(n):(e.preventDefault(),N(n)))}const N=e=>{f("a").forEach(o=>o.classList.toggle("active",o.getAttribute("href")===e)),window.history.pushState(null,null,window.location.origin+e),W()},re=()=>{const e=document.createElement("nav");e.className="navigation-bar",J.forEach(n=>e.append(te(n.path))),E.prepend(e),E.addEventListener("click",oe),N("/home"),e.appendChild(a("<span>© 2024 MetaMate. All rights reserved.</span>"))};function te(e){let n=`<a href="${e}">${e.at(1).toUpperCase()+e.slice(2)}</a>`;return a(n)}re();
