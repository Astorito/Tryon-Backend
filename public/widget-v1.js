"use strict";(()=>{var b=(t,e,n)=>new Promise((r,o)=>{var i=a=>{try{s(n.next(a))}catch(d){o(d)}},l=a=>{try{s(n.throw(a))}catch(d){o(d)}},s=a=>a.done?r(a.value):Promise.resolve(a.value).then(i,l);s((n=n.apply(t,e)).next())});function k(t){let e=document.createElement("button");return e.id="tryon-floating-button",e.className="tryon-btn-floating",e.setAttribute("aria-label","Open Tryon Widget"),e.title="Try on clothes with your photo",e.innerHTML=`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="1"></circle>
      <path d="M12 1v6m0 6v6"></path>
      <path d="M4.22 4.22l4.24 4.24m0 5.08l4.24 4.24"></path>
      <path d="M19.78 4.22l-4.24 4.24m0 5.08l-4.24 4.24"></path>
    </svg>
    <span class="tryon-tooltip">Try on now</span>
  `,e.addEventListener("click",()=>{t()}),e}function E(t,e,n){let r=document.createElement("div");r.className="tryon-step-container";let o=document.createElement("div");o.className="tryon-spotlight";let i=document.createElement("div");i.className="tryon-step-content";let l=document.createElement("div");l.className="tryon-step-indicator";let s=t[e];l.innerHTML=`
    <div class="tryon-step-title">${s.title}</div>
    <div class="tryon-step-subtitle">${s.subtitle}</div>
    <div class="tryon-step-progress">
      ${t.map((d,c)=>`
        <div class="tryon-step-dot ${c===e?"active":""} ${c<e?"completed":""}"></div>
      `).join("")}
    </div>
  `,i.appendChild(l),i.appendChild(s.component);let a=document.createElement("div");if(a.className="tryon-step-navigation",e>0){let d=document.createElement("button");d.className="tryon-btn-secondary",d.textContent="Back",d.addEventListener("click",()=>n(e-1)),a.appendChild(d)}if(e<t.length-1){let d=document.createElement("button");d.className="tryon-btn-primary",d.textContent="Next",d.addEventListener("click",()=>n(e+1)),a.appendChild(d)}return r.appendChild(o),r.appendChild(i),r.appendChild(a),r}function f(t,e,n,r=["image/*"],o=!1){let i=document.createElement("div");i.className=`tryon-dropzone ${o?"compact":""}`;let l=document.createElement("input");l.type="file",l.accept=r.join(","),l.style.display="none";let s=document.createElement("div");s.className="tryon-dropzone-area",s.innerHTML=`
    <div class="tryon-dropzone-icon">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17 8 12 3 7 8"></polyline>
        <line x1="12" y1="3" x2="12" y2="15"></line>
      </svg>
    </div>
    <div class="tryon-dropzone-text">
      <div class="tryon-dropzone-title">${t}</div>
      <div class="tryon-dropzone-placeholder">${e}</div>
    </div>
  `;function a(d){if(!d)return;if(!r.includes(d.type)&&!r.includes("image/*")){alert("Invalid file type");return}let c=new FileReader;c.onload=m=>{let p=m.target.result;n(p)},c.readAsDataURL(d)}return s.addEventListener("click",()=>l.click()),l.addEventListener("change",d=>{var c;a((c=d.target.files)==null?void 0:c[0])}),s.addEventListener("dragover",d=>{d.preventDefault(),s.classList.add("dragover")}),s.addEventListener("dragleave",()=>{s.classList.remove("dragover")}),s.addEventListener("drop",d=>{var c,m;d.preventDefault(),s.classList.remove("dragover"),a((m=(c=d.dataTransfer)==null?void 0:c.files)==null?void 0:m[0])}),i.appendChild(l),i.appendChild(s),i}var y="tryon-widget";function S(){return localStorage.getItem(`${y}-onboarding-seen`)==="true"}function N(t){localStorage.setItem(`${y}-onboarding-seen`,t?"true":"false")}function v(t){localStorage.setItem(`${y}-user-photo`,t)}function z(){return localStorage.getItem(`${y}-user-photo`)}function w(t,e){let n=JSON.parse(localStorage.getItem(`${y}-clothes`)||"[]");n[t]=e,localStorage.setItem(`${y}-clothes`,JSON.stringify(n))}function C(){return JSON.parse(localStorage.getItem(`${y}-clothes`)||"[]")}function L(t){localStorage.setItem(`${y}-generated-image`,t)}function T(){return localStorage.getItem(`${y}-generated-image`)}function I(){let t=document.createElement("div");t.className="tryon-step-user-photo";let e=f("Upload your photo","Drag your photo here or click to select",r=>{v(r);let o=t.querySelector(".tryon-photo-preview");o&&(o.innerHTML=`<img src="${r}" alt="Your photo" />`,o.classList.add("has-image"))},["image/jpeg","image/png","image/webp"]);t.appendChild(e);let n=z();if(n){let r=document.createElement("div");r.className="tryon-photo-preview has-image",r.innerHTML=`<img src="${n}" alt="Your photo" />`,t.appendChild(r)}return t}function M(){let t=document.createElement("div");t.className="tryon-step-clothes";let e=document.createElement("div");e.className="tryon-clothes-grid";let n=4,r=C();for(let o=0;o<n;o++){let i=document.createElement("div");i.className="tryon-clothes-slot",i.dataset.index=o;let l=f(`Clothing ${o+1}`,"Drag image",s=>{w(o,s);let a=i.querySelector(".tryon-clothes-preview");a&&(a.innerHTML=`<img src="${s}" alt="Clothing item ${o+1}" />`,a.classList.add("has-image"))},["image/jpeg","image/png","image/webp"],!0);if(i.appendChild(l),r[o]){let s=document.createElement("div");s.className="tryon-clothes-preview has-image",s.innerHTML=`<img src="${r[o]}" alt="Clothing item ${o+1}" />`,i.appendChild(s)}e.appendChild(i)}return t.appendChild(e),t}function $(){let t=document.createElement("div");return t.className="tryon-step-generate",t.innerHTML=`
    <div class="tryon-generate-info">
      <div class="tryon-icon-large">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="1"></circle>
          <path d="M12 1v6m0 6v6"></path>
          <path d="M4.22 4.22l4.24 4.24m0 5.08l4.24 4.24"></path>
          <path d="M19.78 4.22l-4.24 4.24m0 5.08l-4.24 4.24"></path>
        </svg>
      </div>
      <h3>Ready to Generate!</h3>
      <p>Click the "Try-on" button to create your virtual try-on image using AI.</p>
      <div class="tryon-feature-list">
        <div class="tryon-feature">\u2713 Fast generation (30 seconds)</div>
        <div class="tryon-feature">\u2713 High-quality results</div>
        <div class="tryon-feature">\u2713 Multiple clothing styles</div>
      </div>
    </div>
  `,t}function O(){let t=document.createElement("div");t.className="tryon-step-result";let e=T();if(e){t.innerHTML=`
      <div class="tryon-result-image-container">
        <img src="${e}" alt="Generated try-on" class="tryon-result-image" />
        <div class="tryon-result-overlay">Your Try-On Result!</div>
      </div>
      <div class="tryon-result-actions">
        <button class="tryon-btn-primary tryon-btn-download">Download Image</button>
        <button class="tryon-btn-secondary tryon-btn-try-again">Try Another</button>
      </div>
    `;let n=t.querySelector(".tryon-btn-download"),r=t.querySelector(".tryon-btn-try-again");n==null||n.addEventListener("click",()=>{let o=document.createElement("a");o.href=e,o.download="tryon-result.png",o.click()}),r==null||r.addEventListener("click",()=>{location.reload()})}else t.innerHTML=`
      <div class="tryon-result-placeholder">
        <p>No result yet. Generate an image first!</p>
      </div>
    `;return t}function G(t){let e=document.createElement("div");e.className="tryon-onboarding";let n=[{title:"Upload Your Photo",subtitle:"Show us what you look like",component:I(),index:0},{title:"Add Your Clothes",subtitle:"Drag up to 4 clothing items",component:M(),index:1},{title:"Generate Try-On",subtitle:"Create your virtual try-on",component:$(),index:2},{title:"See Your Result",subtitle:"Check out how you look",component:O(),index:3}],r=0,o=E(n,r,l=>{r=l,i()});e.appendChild(o);function i(){let l=n[r];o.style.opacity="0",setTimeout(()=>{o.innerHTML="";let s=E(n,r,a=>{r=a,i()});if(o.appendChild(s.firstChild),o.style.opacity="1",r===n.length-1){let a=document.createElement("button");a.className="tryon-btn-primary tryon-btn-onboarding-complete",a.textContent="Start Using Tryon!",a.addEventListener("click",t),o.appendChild(a)}},300)}return i(),e}function H(t){let e=document.createElement("div");e.className="tryon-image-result-container";let n=document.createElement("div");n.className="tryon-image-wrapper";let r=document.createElement("img");r.src=t,r.alt="Generated try-on result",r.className="tryon-result-image";let o=document.createElement("div");o.className="tryon-magnifier-lens";let i=document.createElement("div");i.className="tryon-magnifier-view",i.innerHTML=`<img src="${t}" alt="Magnified view" />`,n.appendChild(r),n.appendChild(o),e.appendChild(n),e.appendChild(i);let l=!1;n.addEventListener("mouseenter",()=>{l=!0,o.style.display="block",i.style.display="block"}),n.addEventListener("mouseleave",()=>{l=!1,o.style.display="none",i.style.display="none"}),n.addEventListener("mousemove",a=>{if(!l)return;let d=n.getBoundingClientRect(),c=a.clientX-d.left,m=a.clientY-d.top;o.style.left=c-50+"px",o.style.top=m-50+"px";let p=2;i.style.backgroundPosition=`-${c*p-150}px -${m*p-150}px`});let s=document.createElement("button");return s.className="tryon-btn-primary tryon-btn-download-result",s.textContent="Download Result",s.addEventListener("click",()=>{let a=document.createElement("a");a.href=t,a.download="tryon-result.png",a.click()}),e.appendChild(s),e}function W(){let t=window.TRYON_WIDGET_CONFIG;if(!t)throw new Error("Tryon Widget config not initialized");return t}function j(t,e){return b(this,null,function*(){let n=W(),r=e.filter(o=>o&&o.length>0);if(!t)throw new Error("User image is required");if(r.length===0)throw new Error("At least one clothing item is required");try{let o=yield fetch(`${n.apiUrl}/images/generate`,{method:"POST",headers:{"Content-Type":"application/json","x-client-key":n.apiKey},body:JSON.stringify({prompt:`A person wearing ${r.length>1?"multiple clothing items":"a clothing item"} from the provided images`,userImage:t,clothes:r})});if(!o.ok){let l=yield o.json().catch(()=>({}));throw new Error(l.error||`API error: ${o.status}`)}let i=yield o.json();if(!i.success)throw new Error(i.error||"Generation failed");return{url:i.url,generationId:i.generationId}}catch(o){throw console.error("Try-on generation error:",o),o}})}function P(){let t=document.createElement("div");t.className="tryon-main-ui";let e=document.createElement("div");e.className="tryon-main-header",e.innerHTML=`
    <h2>Create Your Try-On</h2>
    <p>Upload your photo and select clothing items</p>
  `;let n=document.createElement("div");n.className="tryon-section",n.innerHTML="<h3>Your Photo</h3>";let r=f("Your Photo","Drag or click to upload",p=>{v(p)},["image/jpeg","image/png","image/webp"]);n.appendChild(r);let o=document.createElement("div");o.className="tryon-section",o.innerHTML="<h3>Clothing Items (Select up to 4)</h3>";let i=document.createElement("div");i.className="tryon-clothes-grid-main";let l=C();for(let p=0;p<4;p++){let h=document.createElement("div");h.className="tryon-clothes-slot-main";let g=f(`Item ${p+1}`,"Add clothing",u=>{w(p,u)},["image/jpeg","image/png","image/webp"],!0);if(h.appendChild(g),l[p]){let u=document.createElement("div");u.className="tryon-clothes-preview-main has-image",u.innerHTML=`<img src="${l[p]}" alt="Clothing ${p+1}" />`,h.appendChild(u)}i.appendChild(h)}o.appendChild(i);let s=document.createElement("div");s.className="tryon-section tryon-section-generate";let a=document.createElement("button");a.className="tryon-btn-primary tryon-btn-generate",a.textContent="Generate Try-On",a.id="tryon-generate-btn",a.addEventListener("click",()=>b(this,null,function*(){yield m()})),s.appendChild(a);let d=document.createElement("div");d.className="tryon-section tryon-section-result",d.id="tryon-result-section",t.appendChild(e),t.appendChild(n),t.appendChild(o),t.appendChild(s),t.appendChild(d);function c(){}function m(){return b(this,null,function*(){let p=localStorage.getItem("tryon-user-photo"),h=JSON.parse(localStorage.getItem("tryon-clothes")||"[]");if(!p){alert("Please upload your photo first");return}if(h.filter(g=>g).length===0){alert("Please add at least one clothing item");return}try{a.disabled=!0,a.textContent="Generating...",a.innerHTML='<span class="tryon-spinner"></span> Generating...';let g=yield j(p,h);L(g.url);let u=d;u.innerHTML="",u.appendChild(H(g.url))}catch(g){alert("Error generating image: "+g.message)}finally{a.disabled=!1,a.textContent="Generate Try-On"}})}return t}function A(t){let e=document.createElement("div");e.id="tryon-modal",e.className="tryon-modal";let n=document.createElement("div");n.className="tryon-modal-backdrop";let r=document.createElement("div");r.className="tryon-modal-wrapper";let o=document.createElement("button");o.className="tryon-modal-close",o.innerHTML="&times;",o.setAttribute("aria-label","Close modal");let i=document.createElement("div");i.className="tryon-modal-content",r.appendChild(o),r.appendChild(i),e.appendChild(n),e.appendChild(r);let l=!1,s="main";function a(){if(i.innerHTML="",s==="onboarding"){let m=G(()=>{N(!0),s="main",a()});i.appendChild(m)}else{let m=P();i.appendChild(m)}}function d(){l=!0,e.classList.add("tryon-modal-open"),S()?s="main":s="onboarding",a()}function c(){l=!1,e.classList.remove("tryon-modal-open"),i.innerHTML="",t==null||t()}return o.addEventListener("click",c),n.addEventListener("click",c),e.open=d,e.close=c,e}function U(){if(document.querySelector("#tryon-widget-styles"))return;let t=document.createElement("style");t.id="tryon-widget-styles",t.textContent=B(),document.head.appendChild(t)}function B(){return`
/* ============================================================================
   Tryon Widget - Global Styles
   ============================================================================ */

.tryon-widget-root {
  --tryon-primary: #5CAEFF;
  --tryon-primary-dark: #4A90E2;
  --tryon-secondary: #6B7280;
  --tryon-background: rgba(255, 255, 255, 0.95);
  --tryon-background-dark: rgba(30, 30, 30, 0.5);
  --tryon-border: rgba(0, 0, 0, 0.1);
  --tryon-text: #1F2937;
  --tryon-text-light: #6B7280;
  --tryon-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  --tryon-radius: 16px;
  --tryon-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tryon-widget-root * {
  box-sizing: border-box;
}

/* ============================================================================
   Floating Button
   ============================================================================ */

.tryon-btn-floating {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--tryon-primary) 0%, var(--tryon-primary-dark) 100%);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--tryon-shadow);
  transition: var(--tryon-transition);
  z-index: 999;
  font-size: 0;
  padding: 0;
}

.tryon-btn-floating:hover {
  transform: scale(1.1);
  box-shadow: 0 25px 60px rgba(92, 174, 255, 0.3);
}

.tryon-btn-floating:active {
  transform: scale(0.95);
}

.tryon-btn-floating svg {
  width: 24px;
  height: 24px;
  stroke-width: 2.5;
}

.tryon-tooltip {
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 8px;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.tryon-btn-floating:hover .tryon-tooltip {
  opacity: 1;
}

/* ============================================================================
   Modal
   ============================================================================ */

.tryon-modal {
  position: fixed;
  inset: 0;
  display: none;
  z-index: 10000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: var(--tryon-text);
}

.tryon-modal.tryon-modal-open {
  display: flex;
}

.tryon-modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  opacity: 0;
  animation: tryon-fade-in 0.3s ease-out forwards;
}

.tryon-modal-wrapper {
  position: relative;
  margin: auto;
  width: 90%;
  max-width: 500px;
  height: auto;
  max-height: 85vh;
  background: var(--tryon-background);
  border-radius: var(--tryon-radius);
  box-shadow: var(--tryon-shadow);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: tryon-slide-up 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.tryon-modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  color: var(--tryon-text);
  font-size: 28px;
  cursor: pointer;
  z-index: 1001;
  transition: var(--tryon-transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.tryon-modal-close:hover {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.tryon-modal-content {
  flex: 1;
  overflow-y: auto;
  padding: 32px 24px;
}

/* ============================================================================
   Buttons
   ============================================================================ */

.tryon-btn-primary,
.tryon-btn-secondary {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--tryon-transition);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
}

.tryon-btn-primary {
  background: linear-gradient(135deg, var(--tryon-primary) 0%, var(--tryon-primary-dark) 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(92, 174, 255, 0.25);
}

.tryon-btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(92, 174, 255, 0.35);
}

.tryon-btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.tryon-btn-secondary {
  background: rgba(0, 0, 0, 0.05);
  color: var(--tryon-text);
  border: 1px solid var(--tryon-border);
}

.tryon-btn-secondary:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.1);
}

/* ============================================================================
   Dropzone
   ============================================================================ */

.tryon-dropzone {
  margin-bottom: 16px;
}

.tryon-dropzone.compact {
  margin-bottom: 12px;
}

.tryon-dropzone-area {
  border: 2px dashed var(--tryon-border);
  border-radius: 12px;
  padding: 24px 16px;
  text-align: center;
  cursor: pointer;
  transition: var(--tryon-transition);
  background: rgba(92, 174, 255, 0.05);
}

.tryon-dropzone.compact .tryon-dropzone-area {
  padding: 16px 12px;
}

.tryon-dropzone-area:hover {
  border-color: var(--tryon-primary);
  background: rgba(92, 174, 255, 0.1);
}

.tryon-dropzone-area.dragover {
  border-color: var(--tryon-primary);
  background: rgba(92, 174, 255, 0.15);
  transform: scale(1.02);
}

.tryon-dropzone-icon {
  color: var(--tryon-primary);
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
}

.tryon-dropzone-text {
  pointer-events: none;
}

.tryon-dropzone-title {
  font-weight: 600;
  font-size: 14px;
  color: var(--tryon-text);
  margin-bottom: 4px;
}

.tryon-dropzone-placeholder {
  font-size: 12px;
  color: var(--tryon-text-light);
}

/* ============================================================================
   Onboarding
   ============================================================================ */

.tryon-onboarding {
  animation: tryon-fade-in 0.3s ease-out;
}

.tryon-step-container {
  position: relative;
}

.tryon-spotlight {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3px);
  border-radius: var(--tryon-radius);
  pointer-events: none;
}

.tryon-step-content {
  position: relative;
  z-index: 1;
  animation: tryon-fade-in 0.3s ease-out;
}

.tryon-step-indicator {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--tryon-border);
}

.tryon-step-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
  color: var(--tryon-text);
}

.tryon-step-subtitle {
  font-size: 14px;
  color: var(--tryon-text-light);
  margin-bottom: 16px;
}

.tryon-step-progress {
  display: flex;
  gap: 8px;
}

.tryon-step-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--tryon-border);
  transition: var(--tryon-transition);
}

.tryon-step-dot.active {
  background: var(--tryon-primary);
  transform: scale(1.2);
}

.tryon-step-dot.completed {
  background: var(--tryon-primary);
}

.tryon-step-navigation {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--tryon-border);
}

.tryon-step-navigation .tryon-btn-secondary {
  flex: 1;
}

.tryon-step-navigation .tryon-btn-primary {
  flex: 1;
}

/* ============================================================================
   Main UI
   ============================================================================ */

.tryon-main-ui {
  animation: tryon-fade-in 0.3s ease-out;
}

.tryon-main-header {
  margin-bottom: 24px;
  text-align: center;
}

.tryon-main-header h2 {
  margin: 0 0 8px;
  font-size: 22px;
  color: var(--tryon-text);
}

.tryon-main-header p {
  margin: 0;
  font-size: 14px;
  color: var(--tryon-text-light);
}

.tryon-section {
  margin-bottom: 24px;
}

.tryon-section h3 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px;
  color: var(--tryon-text);
}

.tryon-clothes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.tryon-clothes-grid-main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.tryon-clothes-slot,
.tryon-clothes-slot-main {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 12px;
  background: rgba(92, 174, 255, 0.05);
}

.tryon-clothes-preview,
.tryon-clothes-preview-main {
  position: absolute;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(92, 174, 255, 0.1) 0%, rgba(74, 144, 226, 0.1) 100%);
}

.tryon-clothes-preview.has-image,
.tryon-clothes-preview-main.has-image {
  display: flex;
}

.tryon-clothes-preview img,
.tryon-clothes-preview-main img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.tryon-section-generate {
  text-align: center;
}

.tryon-btn-generate {
  width: 100%;
  min-height: 48px;
  font-size: 16px;
}

.tryon-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ============================================================================
   Image Result
   ============================================================================ */

.tryon-image-result-container {
  animation: tryon-fade-in 0.3s ease-out;
}

.tryon-image-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  margin-bottom: 16px;
  cursor: crosshair;
}

.tryon-result-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 12px;
}

.tryon-magnifier-lens {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 2px solid var(--tryon-primary);
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 0 3px var(--tryon-primary), inset 0 0 3px rgba(0, 0, 0, 0.1);
  pointer-events: none;
  display: none;
  z-index: 10;
}

.tryon-magnifier-view {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 150px;
  height: 150px;
  border: 2px solid var(--tryon-primary);
  border-radius: 12px;
  overflow: hidden;
  display: none;
  background: white;
  box-shadow: var(--tryon-shadow);
  z-index: 11;
}

.tryon-magnifier-view img {
  width: 200%;
  height: 200%;
  object-fit: cover;
}

.tryon-btn-download-result {
  width: 100%;
  min-height: 44px;
}

/* ============================================================================
   Animations
   ============================================================================ */

@keyframes tryon-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes tryon-slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ============================================================================
   Responsive
   ============================================================================ */

@media (max-width: 640px) {
  .tryon-modal-wrapper {
    width: 95%;
    max-height: 90vh;
    border-radius: 20px;
  }

  .tryon-modal-content {
    padding: 24px 16px;
  }

  .tryon-clothes-grid,
  .tryon-clothes-grid-main {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .tryon-step-title {
    font-size: 18px;
  }

  .tryon-btn-floating {
    bottom: 16px;
    right: 16px;
    width: 52px;
    height: 52px;
  }

  .tryon-magnifier-view {
    width: 120px;
    height: 120px;
  }
}

@media (max-width: 400px) {
  .tryon-modal-wrapper {
    width: 100%;
    max-height: 100vh;
    border-radius: 20px 20px 0 0;
    max-height: calc(100dvh - 10px);
  }

  .tryon-modal-content {
    padding: 20px 12px;
  }

  .tryon-btn-floating {
    width: 48px;
    height: 48px;
  }
}

/* ============================================================================
   Accessibility
   ============================================================================ */

.tryon-btn-primary:focus-visible,
.tryon-btn-secondary:focus-visible,
.tryon-btn-floating:focus-visible {
  outline: 2px solid var(--tryon-primary);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .tryon-widget-root * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
  `}var x=null;function R(){if(x)return x;U();let t=document.createElement("div");t.id="tryon-widget-container",t.className="tryon-widget-root",document.body.appendChild(t);let e=k(()=>{n.open()});t.appendChild(e);let n=A(()=>{});return t.appendChild(n),x={container:t,button:e,modal:n,destroy:()=>{t.remove(),x=null}},x}function Y(){
    let scripts = document.querySelectorAll("script"), found = null;
    for (let s of scripts) {
      try {
        if (s.getAttribute && s.getAttribute('data-tryon-key')) { found = s; break }
        if (s.src && (s.src.includes("widget.js") || s.src.includes("widget-v1.js") || s.src.includes("/api/widget"))) { found = s; break }
      } catch (e) {}
    }
    if (!found) {
      console.error("[Tryon Widget] Could not find widget script tag (add data-tryon-key attribute)");
      return null;
    }
    const key = found.getAttribute('data-tryon-key');
    const url = found.getAttribute('data-tryon-url') || "https://tryon-backend.vercel.app";
    if (!key) { console.error("[Tryon Widget] Missing required attribute: data-tryon-key"); return null }
    window.TRYON_WIDGET_CONFIG = { apiKey: key, apiUrl: url, scriptElement: found };
    return { apiKey: key, apiUrl: url };
  }
  function D(){if(!Y()){console.warn("[Tryon Widget] Widget initialization cancelled due to missing configuration");return}R()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",D):D();})();
