"use strict";(()=>{var f=(t,o,n)=>new Promise((r,e)=>{var i=a=>{try{s(n.next(a))}catch(l){e(l)}},d=a=>{try{s(n.throw(a))}catch(l){e(l)}},s=a=>a.done?r(a.value):Promise.resolve(a.value).then(i,d);s((n=n.apply(t,o)).next())});function E(t){let o=document.createElement("button");return o.id="tryon-floating-button",o.className="tryon-btn-floating",o.setAttribute("aria-label","Open Tryon Widget"),o.title="Try on clothes with your photo",o.innerHTML=`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="1"></circle>
      <path d="M12 1v6m0 6v6"></path>
      <path d="M4.22 4.22l4.24 4.24m0 5.08l4.24 4.24"></path>
      <path d="M19.78 4.22l-4.24 4.24m0 5.08l-4.24 4.24"></path>
    </svg>
    <span class="tryon-tooltip">Try on now</span>
  `,o.addEventListener("click",()=>{t()}),o}function k(t,o,n){let r=document.createElement("div");r.className="tryon-step-container";let e=document.createElement("div");e.className="tryon-spotlight";let i=document.createElement("div");i.className="tryon-step-content";let d=document.createElement("div");d.className="tryon-step-indicator";let s=t[o];d.innerHTML=`
    <div class="tryon-step-title">${s.title}</div>
    <div class="tryon-step-subtitle">${s.subtitle}</div>
    <div class="tryon-step-progress">
      ${t.map((l,c)=>`
        <div class="tryon-step-dot ${c===o?"active":""} ${c<o?"completed":""}"></div>
      `).join("")}
    </div>
  `,i.appendChild(d),i.appendChild(s.component);let a=document.createElement("div");if(a.className="tryon-step-navigation",o>0){let l=document.createElement("button");l.className="tryon-btn-secondary",l.textContent="Back",l.addEventListener("click",()=>n(o-1)),a.appendChild(l)}if(o<t.length-1){let l=document.createElement("button");l.className="tryon-btn-primary",l.textContent="Next",l.addEventListener("click",()=>n(o+1)),a.appendChild(l)}return r.appendChild(e),r.appendChild(i),r.appendChild(a),r}function x(t,o,n,r=["image/*"],e=!1,i=!1){let d=document.createElement("div");d.className=`tryon-dropzone ${e?"compact":""} ${i?"large":""}`;let s=document.createElement("input");s.type="file",s.accept=r.join(","),s.style.display="none";let a=document.createElement("div");a.className="tryon-dropzone-area",i?a.innerHTML=`
      <div class="tryon-dropzone-icon-large">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
      <div class="tryon-dropzone-text">
        <div class="tryon-dropzone-placeholder-large">${o}</div>
      </div>
    `:e?a.innerHTML=`
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
        <div class="tryon-dropzone-placeholder">${o}</div>
      </div>
    `;function l(c){if(!c)return;if(!r.includes(c.type)&&!r.includes("image/*")){alert("Invalid file type");return}let m=new FileReader;m.onload=p=>{let y=p.target.result;n(y)},m.readAsDataURL(c)}return a.addEventListener("click",()=>s.click()),s.addEventListener("change",c=>{var m;l((m=c.target.files)==null?void 0:m[0])}),a.addEventListener("dragover",c=>{c.preventDefault(),a.classList.add("dragover")}),a.addEventListener("dragleave",()=>{a.classList.remove("dragover")}),a.addEventListener("drop",c=>{var m,p;c.preventDefault(),a.classList.remove("dragover"),l((p=(m=c.dataTransfer)==null?void 0:m.files)==null?void 0:p[0])}),d.appendChild(s),d.appendChild(a),d}var g="tryon-widget";function z(){return localStorage.getItem(`${g}-onboarding-seen`)==="true"}function S(t){localStorage.setItem(`${g}-onboarding-seen`,t?"true":"false")}function v(t){localStorage.setItem(`${g}-user-photo`,t)}function N(){return localStorage.getItem(`${g}-user-photo`)}function w(t,o){let n=JSON.parse(localStorage.getItem(`${g}-clothes`)||"[]");n[t]=o,localStorage.setItem(`${g}-clothes`,JSON.stringify(n))}function C(){return JSON.parse(localStorage.getItem(`${g}-clothes`)||"[]")}function T(t){localStorage.setItem(`${g}-generated-image`,t)}function L(){return localStorage.getItem(`${g}-generated-image`)}function I(){let t=document.createElement("div");t.className="tryon-step-user-photo";let o=x("Upload your photo","Drag your photo here or click to select",r=>{v(r);let e=t.querySelector(".tryon-photo-preview");e&&(e.innerHTML=`<img src="${r}" alt="Your photo" />`,e.classList.add("has-image"))},["image/jpeg","image/png","image/webp"]);t.appendChild(o);let n=N();if(n){let r=document.createElement("div");r.className="tryon-photo-preview has-image",r.innerHTML=`<img src="${n}" alt="Your photo" />`,t.appendChild(r)}return t}function M(){let t=document.createElement("div");t.className="tryon-step-clothes";let o=document.createElement("div");o.className="tryon-clothes-grid";let n=4,r=C();for(let e=0;e<n;e++){let i=document.createElement("div");i.className="tryon-clothes-slot",i.dataset.index=e;let d=x(`Clothing ${e+1}`,"Drag image",s=>{w(e,s);let a=i.querySelector(".tryon-clothes-preview");a&&(a.innerHTML=`<img src="${s}" alt="Clothing item ${e+1}" />`,a.classList.add("has-image"))},["image/jpeg","image/png","image/webp"],!0);if(i.appendChild(d),r[e]){let s=document.createElement("div");s.className="tryon-clothes-preview has-image",s.innerHTML=`<img src="${r[e]}" alt="Clothing item ${e+1}" />`,i.appendChild(s)}o.appendChild(i)}return t.appendChild(o),t}function O(){let t=document.createElement("div");return t.className="tryon-step-generate",t.innerHTML=`
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
  `,t}function $(){let t=document.createElement("div");t.className="tryon-step-result";let o=L();if(o){t.innerHTML=`
      <div class="tryon-result-image-container">
        <img src="${o}" alt="Generated try-on" class="tryon-result-image" />
        <div class="tryon-result-overlay">Your Try-On Result!</div>
      </div>
      <div class="tryon-result-actions">
        <button class="tryon-btn-primary tryon-btn-download">Download Image</button>
        <button class="tryon-btn-secondary tryon-btn-try-again">Try Another</button>
      </div>
    `;let n=t.querySelector(".tryon-btn-download"),r=t.querySelector(".tryon-btn-try-again");n==null||n.addEventListener("click",()=>{let e=document.createElement("a");e.href=o,e.download="tryon-result.png",e.click()}),r==null||r.addEventListener("click",()=>{location.reload()})}else t.innerHTML=`
      <div class="tryon-result-placeholder">
        <p>No result yet. Generate an image first!</p>
      </div>
    `;return t}function j(t){let o=document.createElement("div");o.className="tryon-onboarding";let n=[{title:"Upload Your Photo",subtitle:"Show us what you look like",component:I(),index:0},{title:"Add Your Clothes",subtitle:"Drag up to 4 clothing items",component:M(),index:1},{title:"Generate Try-On",subtitle:"Create your virtual try-on",component:O(),index:2},{title:"See Your Result",subtitle:"Check out how you look",component:$(),index:3}],r=0,e=k(n,r,d=>{r=d,i()});o.appendChild(e);function i(){let d=n[r];e.style.opacity="0",setTimeout(()=>{e.innerHTML="";let s=k(n,r,a=>{r=a,i()});if(e.appendChild(s.firstChild),e.style.opacity="1",r===n.length-1){let a=document.createElement("button");a.className="tryon-btn-primary tryon-btn-onboarding-complete",a.textContent="Start Using Tryon!",a.addEventListener("click",t),e.appendChild(a)}},300)}return i(),o}function P(t){let o=document.createElement("div");o.className="tryon-image-result-container";let n=document.createElement("div");n.className="tryon-image-wrapper";let r=document.createElement("img");r.src=t,r.alt="Generated try-on result",r.className="tryon-result-image";let e=document.createElement("div");e.className="tryon-magnifier-lens";let i=document.createElement("div");i.className="tryon-magnifier-view",i.innerHTML=`<img src="${t}" alt="Magnified view" />`,n.appendChild(r),n.appendChild(e),o.appendChild(n),o.appendChild(i);let d=!1;n.addEventListener("mouseenter",()=>{d=!0,e.style.display="block",i.style.display="block"}),n.addEventListener("mouseleave",()=>{d=!1,e.style.display="none",i.style.display="none"}),n.addEventListener("mousemove",a=>{if(!d)return;let l=n.getBoundingClientRect(),c=a.clientX-l.left,m=a.clientY-l.top;e.style.left=c-50+"px",e.style.top=m-50+"px";let p=2;i.style.backgroundPosition=`-${c*p-150}px -${m*p-150}px`});let s=document.createElement("button");return s.className="tryon-btn-primary tryon-btn-download-result",s.textContent="Download Result",s.addEventListener("click",()=>{let a=document.createElement("a");a.href=t,a.download="tryon-result.png",a.click()}),o.appendChild(s),o}function D(){let t=window.TRYON_WIDGET_CONFIG;if(!t)throw new Error("Tryon Widget config not initialized");return t}function B(t,o){return f(this,null,function*(){let n=D(),r=o.filter(e=>e&&e.length>0);if(!t)throw new Error("User image is required");if(r.length===0)throw new Error("At least one clothing item is required");try{let e=yield fetch(`${n.apiUrl}/generate-widget`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userPhotoBase64:t,clothingBase64:r[0],apiKey:n.apiKey})});if(!e.ok){let d=yield e.json().catch(()=>({}));throw new Error(d.error||`API error: ${e.status}`)}let i=yield e.json();if(!i.success)throw new Error(i.error||"Generation failed");return{url:i.url,generationId:i.generationId}}catch(e){throw console.error("Try-on generation error:",e),e}})}function H(){let t=document.createElement("div");t.className="tryon-main-ui";let o=document.createElement("div");o.className="tryon-main-header",o.innerHTML=`
    <div class="tryon-logo-badge">TryOn Virtual</div>
  `;let n=document.createElement("div");n.className="tryon-user-photo-section";let r=x("","Upload your Picture",p=>{v(p)},["image/jpeg","image/png","image/webp"],!1,!0);n.appendChild(r);let e=document.createElement("div");e.className="tryon-products-label",e.textContent="Drag the products";let i=document.createElement("div");i.className="tryon-clothes-grid-main";let d=C();for(let p=0;p<3;p++){let y=document.createElement("div");y.className="tryon-clothes-slot-main";let u=x("","",h=>{w(p,h)},["image/jpeg","image/png","image/webp"],!0,!1);if(y.appendChild(u),d[p]){let h=document.createElement("div");h.className="tryon-clothes-preview-main has-image",h.innerHTML=`<img src="${d[p]}" alt="Clothing ${p+1}" />`,y.appendChild(h)}i.appendChild(y)}let s=document.createElement("button");s.className="tryon-btn-create",s.textContent="Create",s.id="tryon-generate-btn",s.addEventListener("click",()=>f(this,null,function*(){yield m()}));let a=document.createElement("div");a.className="tryon-footer",a.innerHTML=`
    <span class="tryon-footer-text">powered by TryOn.site</span>
    <div class="tryon-footer-logo">
      <span>TryOn</span>
    </div>
  `;let l=document.createElement("div");l.className="tryon-section tryon-section-result",l.id="tryon-result-section",t.appendChild(o),t.appendChild(n),t.appendChild(e),t.appendChild(i),t.appendChild(s),t.appendChild(a),t.appendChild(l);function c(){}function m(){return f(this,null,function*(){let p=localStorage.getItem("tryon-user-photo"),y=JSON.parse(localStorage.getItem("tryon-clothes")||"[]");if(!p){alert("Please upload your photo first");return}if(y.filter(u=>u).length===0){alert("Please add at least one clothing item");return}try{s.disabled=!0,s.textContent="Generating...",s.innerHTML='<span class="tryon-spinner"></span> Generating...';let u=yield B(p,y);T(u.url);let h=l;h.innerHTML="",h.appendChild(P(u.url))}catch(u){alert("Error generating image: "+u.message)}finally{s.disabled=!1,s.textContent="Generate Try-On"}})}return t}function U(t){let o=document.createElement("div");o.id="tryon-modal",o.className="tryon-modal tryon-modal-popover";let n=document.createElement("div");n.className="tryon-modal-wrapper tryon-modal-popover-wrapper";let r=document.createElement("button");r.className="tryon-modal-close",r.innerHTML="&times;",r.setAttribute("aria-label","Close modal");let e=document.createElement("div");e.className="tryon-modal-content",n.appendChild(r),n.appendChild(e),o.appendChild(n);let i=!1,d="main";function s(){if(e.innerHTML="",d==="onboarding"){let c=j(()=>{S(!0),d="main",s()});e.appendChild(c)}else{let c=H();e.appendChild(c)}}function a(){i=!0,o.classList.add("tryon-modal-open"),z()?d="main":d="onboarding",s()}function l(){i=!1,o.classList.remove("tryon-modal-open"),e.innerHTML="",t==null||t()}return r.addEventListener("click",l),o.open=a,o.close=l,o}function G(){return`
/* ============================================================================
   Shadow DOM Reset - Prevent host styles from bleeding in
   ============================================================================ */

:host {
  all: initial;
  display: block;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 999999;
  pointer-events: none;
}

/* Reset all elements to prevent inheritance from host */
* {
  all: unset;
  display: revert;
  box-sizing: border-box;
}

/* Restore default element behavior */
div, span, button, input, img, svg, form, label {
  display: block;
}

button, input[type="file"] {
  cursor: pointer;
}

img {
  max-width: 100%;
  height: auto;
}

/* ============================================================================
   Tryon Widget - Variables & Base Styles
   ============================================================================ */

.tryon-widget-root {
  all: initial;
  display: block;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #1F2937;
  pointer-events: auto;
  min-height: 60px;
  
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
   Modal - Popover Style (NO backdrop, NO full screen)
   ============================================================================ */

.tryon-modal {
  position: absolute;
  bottom: 80px;
  right: 0;
  display: none;
  z-index: 9999;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: var(--tryon-text);
  pointer-events: auto;
}

.tryon-modal.tryon-modal-open {
  display: block;
}

/* NO backdrop for popover mode */
.tryon-modal-backdrop {
  display: none !important;
}

.tryon-modal-wrapper {
  position: relative;
  width: 380px;
  max-width: calc(100vw - 48px);
  height: auto;
  max-height: calc(100vh - 140px);
  background: var(--tryon-background);
  border-radius: var(--tryon-radius);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: visible;
  animation: tryon-slide-up-right 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  padding: 24px;
  border: 1px solid var(--tryon-border);
}

/* Popover specific wrapper */
.tryon-modal-popover-wrapper {
  width: 380px;
  max-height: calc(100vh - 140px);
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
  overflow-x: hidden;
  padding: 0;
  border-radius: var(--tryon-radius-sm);
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

@keyframes tryon-slide-up-right {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ============================================================================
   Responsive
   ============================================================================ */

@media (max-width: 640px) {
  .tryon-modal {
    right: 12px;
    bottom: 80px;
  }

  .tryon-modal-wrapper {
    width: calc(100vw - 24px);
    max-height: calc(100vh - 120px);
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
  .tryon-modal {
    right: 8px;
    bottom: 70px;
  }

  .tryon-modal-wrapper {
    width: calc(100vw - 16px);
    max-height: calc(100vh - 100px);
    border-radius: 16px;
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
  `}var b=null;function R(){if(b)return b;let t=document.getElementById("tryon-widget-container");t||(t=document.createElement("div"),t.id="tryon-widget-container",t.style.cssText="position: fixed; bottom: 20px; right: 20px; z-index: 999999;",document.body.appendChild(t));let o=t.attachShadow({mode:"open"}),n=document.createElement("div");n.className="tryon-widget-root";let r=document.createElement("style");r.textContent=G(),o.appendChild(r),o.appendChild(n);let e=E(()=>{i.open()});n.appendChild(e);let i=U(()=>{});return n.appendChild(i),b={hostContainer:t,shadowRoot:o,shadowContainer:n,button:e,modal:i,destroy:()=>{t.remove(),b=null}},console.log("[TryOn Widget] Initialized with Shadow DOM"),b}function F(){let t=document.querySelectorAll("script"),o=null;for(let e of t)if(e.src&&e.src.includes("widget.js")){o=e;break}let n="default-widget-key",r="https://tryon-backend-delta.vercel.app/api";if(o){let e=o.getAttribute("data-tryon-key"),i=o.getAttribute("data-tryon-url");e&&(n=e),i&&(r=i)}return window.TRYON_WIDGET_CONFIG={apiKey:n,apiUrl:r,scriptElement:o},{apiKey:n,apiUrl:r}}function A(){let t=F();console.log("[Tryon Widget] Initializing with config:",t),R()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",A):A();})();
