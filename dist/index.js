import{i as l,S as u}from"./assets/vendor-Cau1Iyua.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const p="49003372-3de9a450de0a99d64583d6c94",m="https://pixabay.com/api/",f=async r=>(await(await fetch(`${m}?key=${p}&q=${r}&image_type=photo&orientation=horizontal&safesearch=true`)).json()).hits,y=document.getElementById("search-form"),h=document.getElementById("search-input"),d=document.getElementById("gallery"),c=document.getElementById("loader"),g=()=>{d.innerHTML=""};let o;y.addEventListener("submit",async r=>{r.preventDefault();const t=h.value.trim();if(!t){l.error({title:"",message:"Please enter a search query!"});return}g(),c.classList.remove("hidden");try{const a=await f(t);if(a.length===0){l.error({title:"",message:"Sorry, there are no images matching your search query. Please try again!"}),c.classList.add("hidden");return}const n=a.map(e=>`
      <a href="${e.largeImageURL}" class="gallery-item">
        <img src="${e.webformatURL}" alt="${e.tags}">
        <div class="info">
          <div class="stat">
            <span class="label">Likes</span>
            <span class="value">${e.likes}</span>
          </div>
          <div class="stat">
            <span class="label">Views</span>
            <span class="value">${e.views}</span>
          </div>
          <div class="stat">
            <span class="label">Comments</span>
            <span class="value">${e.comments}</span>
          </div>
          <div class="stat">
            <span class="label">Downloads</span>
            <span class="value">${e.downloads}</span>
          </div>
        </div>
      </a>
    `).join("");d.innerHTML=n,o&&o.destroy(),o=new u(".gallery-item a",{captions:!0,captionsData:"alt",captionDelay:250,close:!0,loop:!0,nav:!0,swipeClose:!0,animationSpeed:250,fadeSpeed:300}),o.refresh()}catch{l.error({title:"",message:"An error occurred. Please try again later."})}finally{c.classList.add("hidden")}});
//# sourceMappingURL=index.js.map
