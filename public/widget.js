"use strict";(()=>{var f=(t,e,n)=>new Promise((r,o)=>{var s=a=>{try{i(n.next(a))}catch(l){o(l)}},d=a=>{try{i(n.throw(a))}catch(l){o(l)}},i=a=>a.done?r(a.value):Promise.resolve(a.value).then(s,d);i((n=n.apply(t,e)).next())});function E(t){let e=document.createElement("button");return e.id="tryon-floating-button",e.className="tryon-btn-floating",e.setAttribute("aria-label","Open Tryon Widget"),e.title="Try on clothes with your photo",e.innerHTML=`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="1"></circle>
      <path d="M12 1v6m0 6v6"></path>
      <path d="M4.22 4.22l4.24 4.24m0 5.08l4.24 4.24"></path>
      <path d="M19.78 4.22l-4.24 4.24m0 5.08l-4.24 4.24"></path>
    </svg>
    <span class="tryon-tooltip">Try on now</span>
  `,e.addEventListener("click",()=>{t()}),e}function k(t,e,n){let r=document.createElement("div");r.className="tryon-step-container";let o=document.createElement("div");o.className="tryon-spotlight";let s=document.createElement("div");s.className="tryon-step-content";let d=document.createElement("div");d.className="tryon-step-indicator";let i=t[e];d.innerHTML=`
    <div class="tryon-step-title">${i.title}</div>
    <div class="tryon-step-subtitle">${i.subtitle}</div>
    <div class="tryon-step-progress">
      ${t.map((l,c)=>`
        <div class="tryon-step-dot ${c===e?"active":""} ${c<e?"completed":""}"></div>
      `).join("")}
    </div>
  `,s.appendChild(d),s.appendChild(i.component);let a=document.createElement("div");if(a.className="tryon-step-navigation",e>0){let l=document.createElement("button");l.className="tryon-btn-secondary",l.textContent="Back",l.addEventListener("click",()=>n(e-1)),a.appendChild(l)}if(e<t.length-1){let l=document.createElement("button");l.className="tryon-btn-primary",l.textContent="Next",l.addEventListener("click",()=>n(e+1)),a.appendChild(l)}return r.appendChild(o),r.appendChild(s),r.appendChild(a),r}function x(t,e,n,r=["image/*"],o=!1,s=!1){let d=document.createElement("div");d.className=`tryon-dropzone ${o?"compact":""} ${s?"large":""}`;let i=document.createElement("input");i.type="file",i.accept=r.join(","),i.style.display="none";let a=document.createElement("div");a.className="tryon-dropzone-area",s?a.innerHTML=`
      <div class="tryon-dropzone-icon-large">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
      <div class="tryon-dropzone-text">
        <div class="tryon-dropzone-placeholder-large">${e}</div>
      </div>
    `:o?a.innerHTML=`
      <div class="tryon-dropzone-icon-compact">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
    `:a.innerHTML=`
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
    `;function l(c){if(!c)return;if(!r.includes(c.type)&&!r.includes("image/*")){alert("Invalid file type");return}let m=new FileReader;m.onload=p=>{let y=p.target.result;n(y)},m.readAsDataURL(c)}return a.addEventListener("click",()=>i.click()),i.addEventListener("change",c=>{var m;l((m=c.target.files)==null?void 0:m[0])}),a.addEventListener("dragover",c=>{c.preventDefault(),a.classList.add("dragover")}),a.addEventListener("dragleave",()=>{a.classList.remove("dragover")}),a.addEventListener("drop",c=>{var m,p;c.preventDefault(),a.classList.remove("dragover"),l((p=(m=c.dataTransfer)==null?void 0:m.files)==null?void 0:p[0])}),d.appendChild(i),d.appendChild(a),d}var g="tryon-widget";function z(){return localStorage.getItem(`${g}-onboarding-seen`)==="true"}function S(t){localStorage.setItem(`${g}-onboarding-seen`,t?"true":"false")}function v(t){localStorage.setItem(`${g}-user-photo`,t)}function N(){return localStorage.getItem(`${g}-user-photo`)}function w(t,e){let n=JSON.parse(localStorage.getItem(`${g}-clothes`)||"[]");n[t]=e,localStorage.setItem(`${g}-clothes`,JSON.stringify(n))}function C(){return JSON.parse(localStorage.getItem(`${g}-clothes`)||"[]")}function T(t){localStorage.setItem(`${g}-generated-image`,t)}function L(){return localStorage.getItem(`${g}-generated-image`)}function I(){let t=document.createElement("div");t.className="tryon-step-user-photo";let e=x("Upload your photo","Drag your photo here or click to select",r=>{v(r);let o=t.querySelector(".tryon-photo-preview");o&&(o.innerHTML=`<img src="${r}" alt="Your photo" />`,o.classList.add("has-image"))},["image/jpeg","image/png","image/webp"]);t.appendChild(e);let n=N();if(n){let r=document.createElement("div");r.className="tryon-photo-preview has-image",r.innerHTML=`<img src="${n}" alt="Your photo" />`,t.appendChild(r)}return t}function M(){let t=document.createElement("div");t.className="tryon-step-clothes";let e=document.createElement("div");e.className="tryon-clothes-grid";let n=4,r=C();for(let o=0;o<n;o++){let s=document.createElement("div");s.className="tryon-clothes-slot",s.dataset.index=o;let d=x(`Clothing ${o+1}`,"Drag image",i=>{w(o,i);let a=s.querySelector(".tryon-clothes-preview");a&&(a.innerHTML=`<img src="${i}" alt="Clothing item ${o+1}" />`,a.classList.add("has-image"))},["image/jpeg","image/png","image/webp"],!0);if(s.appendChild(d),r[o]){let i=document.createElement("div");i.className="tryon-clothes-preview has-image",i.innerHTML=`<img src="${r[o]}" alt="Clothing item ${o+1}" />`,s.appendChild(i)}e.appendChild(s)}return t.appendChild(e),t}function $(){let t=document.createElement("div");return t.className="tryon-step-generate",t.innerHTML=`
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
  `,t}function O(){let t=document.createElement("div");t.className="tryon-step-result";let e=L();if(e){t.innerHTML=`
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
    `;return t}function j(t){let e=document.createElement("div");e.className="tryon-onboarding";let n=[{title:"Upload Your Photo",subtitle:"Show us what you look like",component:I(),index:0},{title:"Add Your Clothes",subtitle:"Drag up to 4 clothing items",component:M(),index:1},{title:"Generate Try-On",subtitle:"Create your virtual try-on",component:$(),index:2},{title:"See Your Result",subtitle:"Check out how you look",component:O(),index:3}],r=0,o=k(n,r,d=>{r=d,s()});e.appendChild(o);function s(){let d=n[r];o.style.opacity="0",setTimeout(()=>{o.innerHTML="";let i=k(n,r,a=>{r=a,s()});if(o.appendChild(i.firstChild),o.style.opacity="1",r===n.length-1){let a=document.createElement("button");a.className="tryon-btn-primary tryon-btn-onboarding-complete",a.textContent="Start Using Tryon!",a.addEventListener("click",t),o.appendChild(a)}},300)}return s(),e}function H(t){let e=document.createElement("div");e.className="tryon-image-result-container";let n=document.createElement("div");n.className="tryon-image-wrapper";let r=document.createElement("img");r.src=t,r.alt="Generated try-on result",r.className="tryon-result-image";let o=document.createElement("div");o.className="tryon-magnifier-lens";let s=document.createElement("div");s.className="tryon-magnifier-view",s.innerHTML=`<img src="${t}" alt="Magnified view" />`,n.appendChild(r),n.appendChild(o),e.appendChild(n),e.appendChild(s);let d=!1;n.addEventListener("mouseenter",()=>{d=!0,o.style.display="block",s.style.display="block"}),n.addEventListener("mouseleave",()=>{d=!1,o.style.display="none",s.style.display="none"}),n.addEventListener("mousemove",a=>{if(!d)return;let l=n.getBoundingClientRect(),c=a.clientX-l.left,m=a.clientY-l.top;o.style.left=c-50+"px",o.style.top=m-50+"px";let p=2;s.style.backgroundPosition=`-${c*p-150}px -${m*p-150}px`});let i=document.createElement("button");return i.className="tryon-btn-primary tryon-btn-download-result",i.textContent="Download Result",i.addEventListener("click",()=>{let a=document.createElement("a");a.href=t,a.download="tryon-result.png",a.click()}),e.appendChild(i),e}function F(){let t=window.TRYON_WIDGET_CONFIG;if(!t)throw new Error("Tryon Widget config not initialized");return t}function G(t,e){return f(this,null,function*(){let n=F(),r=e.filter(o=>o&&o.length>0);if(!t)throw new Error("User image is required");if(r.length===0)throw new Error("At least one clothing item is required");try{let o=yield fetch(`${n.apiUrl}/generate-widget`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userPhotoBase64:t,clothingBase64:r[0],apiKey:n.apiKey})});if(!o.ok){let d=yield o.json().catch(()=>({}));throw new Error(d.error||`API error: ${o.status}`)}let s=yield o.json();if(!s.success)throw new Error(s.error||"Generation failed");return{url:s.url,generationId:s.generationId}}catch(o){throw console.error("Try-on generation error:",o),o}})}function P(){let t=document.createElement("div");t.className="tryon-main-ui";let e=document.createElement("div");e.className="tryon-main-header",e.innerHTML=`
    <div class="tryon-logo-badge">TryOn Virtual</div>
  `;let n=document.createElement("div");n.className="tryon-user-photo-section";let r=x("","Upload your Picture",p=>{v(p)},["image/jpeg","image/png","image/webp"],!1,!0);n.appendChild(r);let o=document.createElement("div");o.className="tryon-products-label",o.textContent="Drag the products";let s=document.createElement("div");s.className="tryon-clothes-grid-main";let d=C();for(let p=0;p<3;p++){let y=document.createElement("div");y.className="tryon-clothes-slot-main";let u=x("","",h=>{w(p,h)},["image/jpeg","image/png","image/webp"],!0,!1);if(y.appendChild(u),d[p]){let h=document.createElement("div");h.className="tryon-clothes-preview-main has-image",h.innerHTML=`<img src="${d[p]}" alt="Clothing ${p+1}" />`,y.appendChild(h)}s.appendChild(y)}let i=document.createElement("button");i.className="tryon-btn-create",i.textContent="Create",i.id="tryon-generate-btn",i.addEventListener("click",()=>f(this,null,function*(){yield m()}));let a=document.createElement("div");a.className="tryon-footer",a.innerHTML=`
    <span class="tryon-footer-text">powered by TryOn.site</span>
    <div class="tryon-footer-logo">
      <span>TryOn</span>
    </div>
  `;let l=document.createElement("div");l.className="tryon-section tryon-section-result",l.id="tryon-result-section",t.appendChild(e),t.appendChild(n),t.appendChild(o),t.appendChild(s),t.appendChild(i),t.appendChild(a),t.appendChild(l);function c(){}function m(){return f(this,null,function*(){let p=localStorage.getItem("tryon-user-photo"),y=JSON.parse(localStorage.getItem("tryon-clothes")||"[]");if(!p){alert("Please upload your photo first");return}if(y.filter(u=>u).length===0){alert("Please add at least one clothing item");return}try{i.disabled=!0,i.textContent="Generating...",i.innerHTML='<span class="tryon-spinner"></span> Generating...';let u=yield G(p,y);T(u.url);let h=l;h.innerHTML="",h.appendChild(H(u.url))}catch(u){alert("Error generating image: "+u.message)}finally{i.disabled=!1,i.textContent="Generate Try-On"}})}return t}function B(t){let e=document.createElement("div");e.id="tryon-modal",e.className="tryon-modal";let n=document.createElement("div");n.className="tryon-modal-backdrop";let r=document.createElement("div");r.className="tryon-modal-wrapper";let o=document.createElement("button");o.className="tryon-modal-close",o.innerHTML="&times;",o.setAttribute("aria-label","Close modal");let s=document.createElement("div");s.className="tryon-modal-content",r.appendChild(o),r.appendChild(s),e.appendChild(n),e.appendChild(r);let d=!1,i="main";function a(){if(s.innerHTML="",i==="onboarding"){let m=j(()=>{S(!0),i="main",a()});s.appendChild(m)}else{let m=P();s.appendChild(m)}}function l(){d=!0,e.classList.add("tryon-modal-open"),z()?i="main":i="onboarding",a()}function c(){d=!1,e.classList.remove("tryon-modal-open"),s.innerHTML="",t==null||t()}return o.addEventListener("click",c),n.addEventListener("click",c),e.open=l,e.close=c,e}function U(){if(document.querySelector("#tryon-widget-styles"))return;let t=document.createElement("style");t.id="tryon-widget-styles",t.textContent=R(),document.head.appendChild(t)}function R(){return`
/* ============================================================================
   Tryon Widget - Global Styles
   ============================================================================ */

.tryon-widget-root {
  --tryon-primary: #C4A57B;
  --tryon-primary-dark: #B39564;
  --tryon-secondary: #6B7280;
  --tryon-background: #F5F5F5;
  --tryon-card-bg: #FFFFFF;
  --tryon-border: #E5E7EB;
  --tryon-text: #1F2937;
  --tryon-text-light: #6B7280;
  --tryon-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  --tryon-radius: 20px;
  --tryon-radius-sm: 12px;
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
  max-width: 420px;
  height: auto;
  max-height: 90vh;
  background: var(--tryon-background);
  border-radius: var(--tryon-radius);
  box-shadow: var(--tryon-shadow);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: tryon-slide-up 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  padding: 24px;
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
  padding: 0;
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

/* ============================================================================
   New Design - Specific Styles
   ============================================================================ */

.tryon-logo-badge {
  background: white;
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 16px;
  font-weight: 600;
  color: var(--tryon-text);
  display: inline-block;
  margin: 0 auto 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.tryon-main-header {
  text-align: center;
  margin-bottom: 20px;
}

.tryon-user-photo-section {
  margin-bottom: 16px;
}

.tryon-dropzone.large {
  margin-bottom: 0;
}

.tryon-dropzone.large .tryon-dropzone-area {
  background: white;
  border: none;
  border-radius: var(--tryon-radius);
  padding: 60px 24px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: var(--tryon-shadow);
}

.tryon-dropzone-icon-large {
  color: var(--tryon-text-light);
  margin-bottom: 12px;
}

.tryon-dropzone-placeholder-large {
  font-size: 16px;
  font-weight: 500;
  color: var(--tryon-text);
}

.tryon-products-label {
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--tryon-text);
  margin: 16px 0 12px;
}

.tryon-clothes-grid-main {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.tryon-clothes-slot-main {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: var(--tryon-radius-sm);
  background: white;
  box-shadow: var(--tryon-shadow);
}

.tryon-dropzone.compact .tryon-dropzone-area {
  background: white;
  border: none;
  padding: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tryon-dropzone-icon-compact {
  color: var(--tryon-text-light);
}

.tryon-btn-create {
  width: 100%;
  padding: 14px 24px;
  border: none;
  border-radius: var(--tryon-radius-sm);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--tryon-transition);
  background: var(--tryon-primary);
  color: white;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(196, 165, 123, 0.3);
}

.tryon-btn-create:hover:not(:disabled) {
  background: var(--tryon-primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(196, 165, 123, 0.4);
}

.tryon-btn-create:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.tryon-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 0 0;
  border-top: 1px solid var(--tryon-border);
  margin-top: auto;
}

.tryon-footer-text {
  font-size: 12px;
  color: var(--tryon-text-light);
}

.tryon-footer-logo {
  background: var(--tryon-text);
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}
  `}var b=null;function A(){if(b)return b;U();let t=document.createElement("div");t.id="tryon-widget-container",t.className="tryon-widget-root",document.body.appendChild(t);let e=E(()=>{n.open()});t.appendChild(e);let n=B(()=>{});return t.appendChild(n),b={container:t,button:e,modal:n,destroy:()=>{t.remove(),b=null}},b}function W(){let t=document.querySelectorAll("script"),e=null;for(let o of t)if(o.src&&o.src.includes("widget.js")){e=o;break}if(!e)return console.error("[Tryon Widget] Could not find widget script tag"),null;let n=e.getAttribute("data-tryon-key"),r=e.getAttribute("data-tryon-url")||"https://tryon-backend.vercel.app";return n?(window.TRYON_WIDGET_CONFIG={apiKey:n,apiUrl:r,scriptElement:e},{apiKey:n,apiUrl:r}):(console.error("[Tryon Widget] Missing required attribute: data-tryon-key"),null)}function D(){if(!W()){console.warn("[Tryon Widget] Widget initialization cancelled due to missing configuration");return}A()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",D):D();})();
