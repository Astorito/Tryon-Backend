"use strict";(()=>{function k(t){let e=document.createElement("button");return e.id="tryon-floating-button",e.className="tryon-btn-floating",e.setAttribute("aria-label","Open Tryon Widget"),e.title="Try on clothes with your photo",e.innerHTML=`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="1"></circle>
      <path d="M12 1v6m0 6v6"></path>
      <path d="M4.22 4.22l4.24 4.24m0 5.08l4.24 4.24"></path>
      <path d="M19.78 4.22l-4.24 4.24m0 5.08l-4.24 4.24"></path>
    </svg>
    <span class="tryon-tooltip">Try on now</span>
  `,e.addEventListener("click",()=>{t()}),e}function C(t,e,n){let r=document.createElement("div");r.className="tryon-step-container";let o=document.createElement("div");o.className="tryon-spotlight";let a=document.createElement("div");a.className="tryon-step-content";let l=document.createElement("div");l.className="tryon-step-indicator";let s=t[e];l.innerHTML=`
    <div class="tryon-step-title">${s.title}</div>
    <div class="tryon-step-subtitle">${s.subtitle}</div>
    <div class="tryon-step-progress">
      ${t.map((d,p)=>`
        <div class="tryon-step-dot ${p===e?"active":""} ${p<e?"completed":""}"></div>
      `).join("")}
    </div>
  `,a.appendChild(l),a.appendChild(s.component);let i=document.createElement("div");if(i.className="tryon-step-navigation",e>0){let d=document.createElement("button");d.className="tryon-btn-secondary",d.textContent="Back",d.addEventListener("click",()=>n(e-1)),i.appendChild(d)}if(e<t.length-1){let d=document.createElement("button");d.className="tryon-btn-primary",d.textContent="Next",d.addEventListener("click",()=>n(e+1)),i.appendChild(d)}return r.appendChild(o),r.appendChild(a),r.appendChild(i),r}function f(t,e,n,r=["image/*"],o=!1){let a=document.createElement("div");a.className=`tryon-dropzone ${o?"compact":""}`;let l=document.createElement("input");l.type="file",l.accept=r.join(","),l.style.display="none";let s=document.createElement("div");s.className="tryon-dropzone-area",s.innerHTML=`
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
  `;function i(d){if(!d)return;if(!r.includes(d.type)&&!r.includes("image/*")){alert("Invalid file type");return}let p=new FileReader;p.onload=m=>{let c=m.target.result;n(c)},p.readAsDataURL(d)}return s.addEventListener("click",()=>l.click()),l.addEventListener("change",d=>{i(d.target.files?.[0])}),s.addEventListener("dragover",d=>{d.preventDefault(),s.classList.add("dragover")}),s.addEventListener("dragleave",()=>{s.classList.remove("dragover")}),s.addEventListener("drop",d=>{d.preventDefault(),s.classList.remove("dragover"),i(d.dataTransfer?.files?.[0])}),a.appendChild(l),a.appendChild(s),a}var y="tryon-widget";function E(){return localStorage.getItem(`${y}-onboarding-seen`)==="true"}function S(t){localStorage.setItem(`${y}-onboarding-seen`,t?"true":"false")}function x(t){localStorage.setItem(`${y}-user-photo`,t)}function N(){return localStorage.getItem(`${y}-user-photo`)}function v(t,e){let n=JSON.parse(localStorage.getItem(`${y}-clothes`)||"[]");n[t]=e,localStorage.setItem(`${y}-clothes`,JSON.stringify(n))}function w(){return JSON.parse(localStorage.getItem(`${y}-clothes`)||"[]")}function z(t){localStorage.setItem(`${y}-generated-image`,t)}function L(){return localStorage.getItem(`${y}-generated-image`)}function T(){let t=document.createElement("div");t.className="tryon-step-user-photo";let e=f("Upload your photo","Drag your photo here or click to select",r=>{x(r);let o=t.querySelector(".tryon-photo-preview");o&&(o.innerHTML=`<img src="${r}" alt="Your photo" />`,o.classList.add("has-image"))},["image/jpeg","image/png","image/webp"]);t.appendChild(e);let n=N();if(n){let r=document.createElement("div");r.className="tryon-photo-preview has-image",r.innerHTML=`<img src="${n}" alt="Your photo" />`,t.appendChild(r)}return t}function I(){let t=document.createElement("div");t.className="tryon-step-clothes";let e=document.createElement("div");e.className="tryon-clothes-grid";let n=4,r=w();for(let o=0;o<n;o++){let a=document.createElement("div");a.className="tryon-clothes-slot",a.dataset.index=o;let l=f(`Clothing ${o+1}`,"Drag image",s=>{v(o,s);let i=a.querySelector(".tryon-clothes-preview");i&&(i.innerHTML=`<img src="${s}" alt="Clothing item ${o+1}" />`,i.classList.add("has-image"))},["image/jpeg","image/png","image/webp"],!0);if(a.appendChild(l),r[o]){let s=document.createElement("div");s.className="tryon-clothes-preview has-image",s.innerHTML=`<img src="${r[o]}" alt="Clothing item ${o+1}" />`,a.appendChild(s)}e.appendChild(a)}return t.appendChild(e),t}function M(){let t=document.createElement("div");return t.className="tryon-step-generate",t.innerHTML=`
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
  `,t}function $(){let t=document.createElement("div");t.className="tryon-step-result";let e=L();if(e){t.innerHTML=`
      <div class="tryon-result-image-container">
        <img src="${e}" alt="Generated try-on" class="tryon-result-image" />
        <div class="tryon-result-overlay">Your Try-On Result!</div>
      </div>
      <div class="tryon-result-actions">
        <button class="tryon-btn-primary tryon-btn-download">Download Image</button>
        <button class="tryon-btn-secondary tryon-btn-try-again">Try Another</button>
      </div>
    `;let n=t.querySelector(".tryon-btn-download"),r=t.querySelector(".tryon-btn-try-again");n?.addEventListener("click",()=>{let o=document.createElement("a");o.href=e,o.download="tryon-result.png",o.click()}),r?.addEventListener("click",()=>{location.reload()})}else t.innerHTML=`
      <div class="tryon-result-placeholder">
        <p>No result yet. Generate an image first!</p>
      </div>
    `;return t}function O(t){let e=document.createElement("div");e.className="tryon-onboarding";let n=[{title:"Upload Your Photo",subtitle:"Show us what you look like",component:T(),index:0},{title:"Add Your Clothes",subtitle:"Drag up to 4 clothing items",component:I(),index:1},{title:"Generate Try-On",subtitle:"Create your virtual try-on",component:M(),index:2},{title:"See Your Result",subtitle:"Check out how you look",component:$(),index:3}],r=0,o=C(n,r,l=>{r=l,a()});e.appendChild(o);function a(){let l=n[r];o.style.opacity="0",setTimeout(()=>{o.innerHTML="";let s=C(n,r,i=>{r=i,a()});if(o.appendChild(s.firstChild),o.style.opacity="1",r===n.length-1){let i=document.createElement("button");i.className="tryon-btn-primary tryon-btn-onboarding-complete",i.textContent="Start Using Tryon!",i.addEventListener("click",t),o.appendChild(i)}},300)}return a(),e}function G(t){let e=document.createElement("div");e.className="tryon-image-result-container";let n=document.createElement("div");n.className="tryon-image-wrapper";let r=document.createElement("img");r.src=t,r.alt="Generated try-on result",r.className="tryon-result-image";let o=document.createElement("div");o.className="tryon-magnifier-lens";let a=document.createElement("div");a.className="tryon-magnifier-view",a.innerHTML=`<img src="${t}" alt="Magnified view" />`,n.appendChild(r),n.appendChild(o),e.appendChild(n),e.appendChild(a);let l=!1;n.addEventListener("mouseenter",()=>{l=!0,o.style.display="block",a.style.display="block"}),n.addEventListener("mouseleave",()=>{l=!1,o.style.display="none",a.style.display="none"}),n.addEventListener("mousemove",i=>{if(!l)return;let d=n.getBoundingClientRect(),p=i.clientX-d.left,m=i.clientY-d.top;o.style.left=p-50+"px",o.style.top=m-50+"px";let c=2;a.style.backgroundPosition=`-${p*c-150}px -${m*c-150}px`});let s=document.createElement("button");return s.className="tryon-btn-primary tryon-btn-download-result",s.textContent="Download Result",s.addEventListener("click",()=>{let i=document.createElement("a");i.href=t,i.download="tryon-result.png",i.click()}),e.appendChild(s),e}function R(){let t=window.TRYON_WIDGET_CONFIG;if(!t)throw new Error("Tryon Widget config not initialized");return t}async function A(t,e){let n=R(),r=e.filter(o=>o&&o.length>0);if(!t)throw new Error("User image is required");if(r.length===0)throw new Error("At least one clothing item is required");try{let o=await fetch(`${n.apiUrl}/images/generate`,{method:"POST",headers:{"Content-Type":"application/json","x-client-key":n.apiKey},body:JSON.stringify({prompt:`A person wearing ${r.length>1?"multiple clothing items":"a clothing item"} from the provided images`,userImage:t,clothes:r})});if(!o.ok){let l=await o.json().catch(()=>({}));throw new Error(l.error||`API error: ${o.status}`)}let a=await o.json();if(!a.success)throw new Error(a.error||"Generation failed");return{url:a.url,generationId:a.generationId}}catch(o){throw console.error("Try-on generation error:",o),o}}function H(){let t=document.createElement("div");t.className="tryon-main-ui";let e=document.createElement("div");e.className="tryon-main-header",e.innerHTML=`
    <h2>Create Your Try-On</h2>
    <p>Upload your photo and select clothing items</p>
  `;let n=document.createElement("div");n.className="tryon-section",n.innerHTML="<h3>Your Photo</h3>";let r=f("Your Photo","Drag or click to upload",c=>{x(c)},["image/jpeg","image/png","image/webp"]);n.appendChild(r);let o=document.createElement("div");o.className="tryon-section",o.innerHTML="<h3>Clothing Items (Select up to 4)</h3>";let a=document.createElement("div");a.className="tryon-clothes-grid-main";let l=w();for(let c=0;c<4;c++){let h=document.createElement("div");h.className="tryon-clothes-slot-main";let g=f(`Item ${c+1}`,"Add clothing",u=>{v(c,u)},["image/jpeg","image/png","image/webp"],!0);if(h.appendChild(g),l[c]){let u=document.createElement("div");u.className="tryon-clothes-preview-main has-image",u.innerHTML=`<img src="${l[c]}" alt="Clothing ${c+1}" />`,h.appendChild(u)}a.appendChild(h)}o.appendChild(a);let s=document.createElement("div");s.className="tryon-section tryon-section-generate";let i=document.createElement("button");i.className="tryon-btn-primary tryon-btn-generate",i.textContent="Generate Try-On",i.id="tryon-generate-btn",i.addEventListener("click",async()=>{await m()}),s.appendChild(i);let d=document.createElement("div");d.className="tryon-section tryon-section-result",d.id="tryon-result-section",t.appendChild(e),t.appendChild(n),t.appendChild(o),t.appendChild(s),t.appendChild(d);function p(){}async function m(){let c=localStorage.getItem("tryon-user-photo"),h=JSON.parse(localStorage.getItem("tryon-clothes")||"[]");if(!c){alert("Please upload your photo first");return}if(h.filter(g=>g).length===0){alert("Please add at least one clothing item");return}try{i.disabled=!0,i.textContent="Generating...",i.innerHTML='<span class="tryon-spinner"></span> Generating...';let g=await A(c,h);z(g.url);let u=d;u.innerHTML="",u.appendChild(G(g.url))}catch(g){alert("Error generating image: "+g.message)}finally{i.disabled=!1,i.textContent="Generate Try-On"}}return t}function j(t){let e=document.createElement("div");e.id="tryon-modal",e.className="tryon-modal";let n=document.createElement("div");n.className="tryon-modal-backdrop";let r=document.createElement("div");r.className="tryon-modal-wrapper";let o=document.createElement("button");o.className="tryon-modal-close",o.innerHTML="&times;",o.setAttribute("aria-label","Close modal");let a=document.createElement("div");a.className="tryon-modal-content",r.appendChild(o),r.appendChild(a),e.appendChild(n),e.appendChild(r);let l=!1,s="main";function i(){if(a.innerHTML="",s==="onboarding"){let m=O(()=>{S(!0),s="main",i()});a.appendChild(m)}else{let m=H();a.appendChild(m)}}function d(){l=!0,e.classList.add("tryon-modal-open"),E()?s="main":s="onboarding",i()}function p(){l=!1,e.classList.remove("tryon-modal-open"),a.innerHTML="",t?.()}return o.addEventListener("click",p),n.addEventListener("click",p),e.open=d,e.close=p,e}function P(){if(document.querySelector("#tryon-widget-styles"))return;let t=document.createElement("style");t.id="tryon-widget-styles",t.textContent=D(),document.head.appendChild(t)}function D(){return`
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
  `}var b=null;function U(){if(b)return b;P();let t=document.createElement("div");t.id="tryon-widget-container",t.className="tryon-widget-root",document.body.appendChild(t);let e=k(()=>{n.open()});t.appendChild(e);let n=j(()=>{});return t.appendChild(n),b={container:t,button:e,modal:n,destroy:()=>{t.remove(),b=null}},b}function W(){let t=document.querySelectorAll("script"),e=null;for(let o of t)if(o.src&&o.src.includes("widget.js")){e=o;break}if(!e)return console.error("[Tryon Widget] Could not find widget script tag"),null;let n=e.getAttribute("data-tryon-key"),r=e.getAttribute("data-tryon-url")||"https://tryon-backend.vercel.app";return n?(window.TRYON_WIDGET_CONFIG={apiKey:n,apiUrl:r,scriptElement:e},{apiKey:n,apiUrl:r}):(console.error("[Tryon Widget] Missing required attribute: data-tryon-key"),null)}function B(){if(!W()){console.warn("[Tryon Widget] Widget initialization cancelled due to missing configuration");return}U()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",B):B();})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NvbXBvbmVudHMvYnV0dG9uLmpzIiwgIi4uL3NyYy9jb21wb25lbnRzL3N0ZXBzL3N0ZXBDb250YWluZXIuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvZHJvcHpvbmUuanMiLCAiLi4vc3JjL3V0aWxzL3N0b3JhZ2UuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvc3RlcHMvdXNlclBob3RvU3RlcC5qcyIsICIuLi9zcmMvY29tcG9uZW50cy9zdGVwcy9jbG90aGVzU3RlcC5qcyIsICIuLi9zcmMvY29tcG9uZW50cy9zdGVwcy9nZW5lcmF0ZVN0ZXAuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvc3RlcHMvcmVzdWx0U3RlcC5qcyIsICIuLi9zcmMvY29tcG9uZW50cy9vbmJvYXJkaW5nLmpzIiwgIi4uL3NyYy9jb21wb25lbnRzL2ltYWdlUmVzdWx0LmpzIiwgIi4uL3NyYy9zZXJ2aWNlcy9hcGkuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvbWFpblVJLmpzIiwgIi4uL3NyYy9jb21wb25lbnRzL21vZGFsLmpzIiwgIi4uL3NyYy9zdHlsZXMvaW5kZXguanMiLCAiLi4vc3JjL3dpZGdldC5qcyIsICIuLi9zcmMvaW5kZXguanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogRmxvYXRpbmcgQnV0dG9uIENvbXBvbmVudFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCdXR0b24ob25DbGlja0NhbGxiYWNrKSB7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBidXR0b24uaWQgPSAndHJ5b24tZmxvYXRpbmctYnV0dG9uJztcbiAgYnV0dG9uLmNsYXNzTmFtZSA9ICd0cnlvbi1idG4tZmxvYXRpbmcnO1xuICBidXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ09wZW4gVHJ5b24gV2lkZ2V0Jyk7XG4gIGJ1dHRvbi50aXRsZSA9ICdUcnkgb24gY2xvdGhlcyB3aXRoIHlvdXIgcGhvdG8nO1xuXG4gIC8vIEJ1dHRvbiBjb250ZW50IHdpdGggU1ZHIGljb25cbiAgYnV0dG9uLmlubmVySFRNTCA9IGBcbiAgICA8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIj5cbiAgICAgIDxjaXJjbGUgY3g9XCIxMlwiIGN5PVwiMTJcIiByPVwiMVwiPjwvY2lyY2xlPlxuICAgICAgPHBhdGggZD1cIk0xMiAxdjZtMCA2djZcIj48L3BhdGg+XG4gICAgICA8cGF0aCBkPVwiTTQuMjIgNC4yMmw0LjI0IDQuMjRtMCA1LjA4bDQuMjQgNC4yNFwiPjwvcGF0aD5cbiAgICAgIDxwYXRoIGQ9XCJNMTkuNzggNC4yMmwtNC4yNCA0LjI0bTAgNS4wOGwtNC4yNCA0LjI0XCI+PC9wYXRoPlxuICAgIDwvc3ZnPlxuICAgIDxzcGFuIGNsYXNzPVwidHJ5b24tdG9vbHRpcFwiPlRyeSBvbiBub3c8L3NwYW4+XG4gIGA7XG5cbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG9uQ2xpY2tDYWxsYmFjaygpO1xuICB9KTtcblxuICByZXR1cm4gYnV0dG9uO1xufVxuIiwgIi8qKlxuICogU3RlcCBDb250YWluZXIgd2l0aCBTcG90bGlnaHQgRWZmZWN0XG4gKiBDcmVhdGVzIHRoZSBibHVycmVkIGJhY2tncm91bmQgYW5kIGhpZ2hsaWdodGVkIHN0ZXAgZWZmZWN0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0ZXBDb250YWluZXIoc3RlcHMsIGN1cnJlbnRTdGVwLCBvblN0ZXBDaGFuZ2UpIHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnRhaW5lci5jbGFzc05hbWUgPSAndHJ5b24tc3RlcC1jb250YWluZXInO1xuXG4gIC8vIFNwb3RsaWdodCBiYWNrZ3JvdW5kIChibHVycmVkKVxuICBjb25zdCBzcG90bGlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgc3BvdGxpZ2h0LmNsYXNzTmFtZSA9ICd0cnlvbi1zcG90bGlnaHQnO1xuXG4gIC8vIEN1cnJlbnQgc3RlcCBjb250ZW50XG4gIGNvbnN0IHN0ZXBDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHN0ZXBDb250ZW50LmNsYXNzTmFtZSA9ICd0cnlvbi1zdGVwLWNvbnRlbnQnO1xuXG4gIC8vIFN0ZXAgaW5kaWNhdG9yXG4gIGNvbnN0IHN0ZXBJbmRpY2F0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgc3RlcEluZGljYXRvci5jbGFzc05hbWUgPSAndHJ5b24tc3RlcC1pbmRpY2F0b3InO1xuXG4gIGNvbnN0IHN0ZXAgPSBzdGVwc1tjdXJyZW50U3RlcF07XG4gIHN0ZXBJbmRpY2F0b3IuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJ0cnlvbi1zdGVwLXRpdGxlXCI+JHtzdGVwLnRpdGxlfTwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ0cnlvbi1zdGVwLXN1YnRpdGxlXCI+JHtzdGVwLnN1YnRpdGxlfTwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ0cnlvbi1zdGVwLXByb2dyZXNzXCI+XG4gICAgICAke3N0ZXBzLm1hcCgoXywgaSkgPT4gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwidHJ5b24tc3RlcC1kb3QgJHtpID09PSBjdXJyZW50U3RlcCA/ICdhY3RpdmUnIDogJyd9ICR7aSA8IGN1cnJlbnRTdGVwID8gJ2NvbXBsZXRlZCcgOiAnJ31cIj48L2Rpdj5cbiAgICAgIGApLmpvaW4oJycpfVxuICAgIDwvZGl2PlxuICBgO1xuXG4gIC8vIEFkZCBjb21wb25lbnQgdG8gc3RlcCBjb250ZW50XG4gIHN0ZXBDb250ZW50LmFwcGVuZENoaWxkKHN0ZXBJbmRpY2F0b3IpO1xuICBzdGVwQ29udGVudC5hcHBlbmRDaGlsZChzdGVwLmNvbXBvbmVudCk7XG5cbiAgLy8gTmF2aWdhdGlvbiBidXR0b25zXG4gIGNvbnN0IG5hdmlnYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbmF2aWdhdGlvbi5jbGFzc05hbWUgPSAndHJ5b24tc3RlcC1uYXZpZ2F0aW9uJztcblxuICBpZiAoY3VycmVudFN0ZXAgPiAwKSB7XG4gICAgY29uc3QgcHJldkJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHByZXZCdG4uY2xhc3NOYW1lID0gJ3RyeW9uLWJ0bi1zZWNvbmRhcnknO1xuICAgIHByZXZCdG4udGV4dENvbnRlbnQgPSAnQmFjayc7XG4gICAgcHJldkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IG9uU3RlcENoYW5nZShjdXJyZW50U3RlcCAtIDEpKTtcbiAgICBuYXZpZ2F0aW9uLmFwcGVuZENoaWxkKHByZXZCdG4pO1xuICB9XG5cbiAgaWYgKGN1cnJlbnRTdGVwIDwgc3RlcHMubGVuZ3RoIC0gMSkge1xuICAgIGNvbnN0IG5leHRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBuZXh0QnRuLmNsYXNzTmFtZSA9ICd0cnlvbi1idG4tcHJpbWFyeSc7XG4gICAgbmV4dEJ0bi50ZXh0Q29udGVudCA9ICdOZXh0JztcbiAgICBuZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gb25TdGVwQ2hhbmdlKGN1cnJlbnRTdGVwICsgMSkpO1xuICAgIG5hdmlnYXRpb24uYXBwZW5kQ2hpbGQobmV4dEJ0bik7XG4gIH1cblxuICAvLyBBc3NlbWJsZVxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3BvdGxpZ2h0KTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHN0ZXBDb250ZW50KTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5hdmlnYXRpb24pO1xuXG4gIHJldHVybiBjb250YWluZXI7XG59XG4iLCAiLyoqXG4gKiBEcm9wem9uZSBDb21wb25lbnRcbiAqIEhhbmRsZXMgZHJhZyAmIGRyb3AgYW5kIGZpbGUgdXBsb2FkXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURyb3B6b25lKHRpdGxlLCBwbGFjZWhvbGRlciwgb25GaWxlU2VsZWN0ZWQsIGFjY2VwdGVkVHlwZXMgPSBbJ2ltYWdlLyonXSwgY29tcGFjdCA9IGZhbHNlKSB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb250YWluZXIuY2xhc3NOYW1lID0gYHRyeW9uLWRyb3B6b25lICR7Y29tcGFjdCA/ICdjb21wYWN0JyA6ICcnfWA7XG5cbiAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBpbnB1dC50eXBlID0gJ2ZpbGUnO1xuICBpbnB1dC5hY2NlcHQgPSBhY2NlcHRlZFR5cGVzLmpvaW4oJywnKTtcbiAgaW5wdXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICBjb25zdCBkcm9wQXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkcm9wQXJlYS5jbGFzc05hbWUgPSAndHJ5b24tZHJvcHpvbmUtYXJlYSc7XG4gIGRyb3BBcmVhLmlubmVySFRNTCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwidHJ5b24tZHJvcHpvbmUtaWNvblwiPlxuICAgICAgPHN2ZyB3aWR0aD1cIjMyXCIgaGVpZ2h0PVwiMzJcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNMjEgMTV2NGEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMnYtNFwiPjwvcGF0aD5cbiAgICAgICAgPHBvbHlsaW5lIHBvaW50cz1cIjE3IDggMTIgMyA3IDhcIj48L3BvbHlsaW5lPlxuICAgICAgICA8bGluZSB4MT1cIjEyXCIgeTE9XCIzXCIgeDI9XCIxMlwiIHkyPVwiMTVcIj48L2xpbmU+XG4gICAgICA8L3N2Zz5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidHJ5b24tZHJvcHpvbmUtdGV4dFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRyeW9uLWRyb3B6b25lLXRpdGxlXCI+JHt0aXRsZX08L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0cnlvbi1kcm9wem9uZS1wbGFjZWhvbGRlclwiPiR7cGxhY2Vob2xkZXJ9PC9kaXY+XG4gICAgPC9kaXY+XG4gIGA7XG5cbiAgLy8gRmlsZSByZWFkaW5nIGZ1bmN0aW9uXG4gIGZ1bmN0aW9uIHJlYWRGaWxlKGZpbGUpIHtcbiAgICBpZiAoIWZpbGUpIHJldHVybjtcblxuICAgIC8vIFZhbGlkYXRlIGZpbGUgdHlwZVxuICAgIGlmICghYWNjZXB0ZWRUeXBlcy5pbmNsdWRlcyhmaWxlLnR5cGUpICYmICFhY2NlcHRlZFR5cGVzLmluY2x1ZGVzKCdpbWFnZS8qJykpIHtcbiAgICAgIGFsZXJ0KCdJbnZhbGlkIGZpbGUgdHlwZScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLm9ubG9hZCA9IChlKSA9PiB7XG4gICAgICBjb25zdCBiYXNlNjQgPSBlLnRhcmdldC5yZXN1bHQ7XG4gICAgICBvbkZpbGVTZWxlY3RlZChiYXNlNjQpO1xuICAgIH07XG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gIH1cblxuICAvLyBDbGljayB0byB1cGxvYWRcbiAgZHJvcEFyZWEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBpbnB1dC5jbGljaygpKTtcbiAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcbiAgICByZWFkRmlsZShlLnRhcmdldC5maWxlcz8uWzBdKTtcbiAgfSk7XG5cbiAgLy8gRHJhZyAmIGRyb3BcbiAgZHJvcEFyZWEuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBkcm9wQXJlYS5jbGFzc0xpc3QuYWRkKCdkcmFnb3ZlcicpO1xuICB9KTtcblxuICBkcm9wQXJlYS5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCAoKSA9PiB7XG4gICAgZHJvcEFyZWEuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ292ZXInKTtcbiAgfSk7XG5cbiAgZHJvcEFyZWEuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRyb3BBcmVhLmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdvdmVyJyk7XG4gICAgcmVhZEZpbGUoZS5kYXRhVHJhbnNmZXI/LmZpbGVzPy5bMF0pO1xuICB9KTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZHJvcEFyZWEpO1xuXG4gIHJldHVybiBjb250YWluZXI7XG59XG4iLCAiLyoqXG4gKiBTdG9yYWdlIFV0aWxpdGllc1xuICogSGFuZGxlIGxvY2FsU3RvcmFnZSBmb3Igd2lkZ2V0IHN0YXRlXG4gKi9cblxuY29uc3QgU1RPUkFHRV9QUkVGSVggPSAndHJ5b24td2lkZ2V0JztcblxuLy8gT25ib2FyZGluZ1xuZXhwb3J0IGZ1bmN0aW9uIGhhc1NlZW5PbmJvYXJkaW5nKCkge1xuICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7U1RPUkFHRV9QUkVGSVh9LW9uYm9hcmRpbmctc2VlbmApID09PSAndHJ1ZSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRPbmJvYXJkaW5nU2VlbihzZWVuKSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGAke1NUT1JBR0VfUFJFRklYfS1vbmJvYXJkaW5nLXNlZW5gLCBzZWVuID8gJ3RydWUnIDogJ2ZhbHNlJyk7XG59XG5cbi8vIFVzZXIgUGhvdG9cbmV4cG9ydCBmdW5jdGlvbiBzdG9yZVVzZXJQaG90byhiYXNlNjQpIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYCR7U1RPUkFHRV9QUkVGSVh9LXVzZXItcGhvdG9gLCBiYXNlNjQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlclBob3RvKCkge1xuICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7U1RPUkFHRV9QUkVGSVh9LXVzZXItcGhvdG9gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyVXNlclBob3RvKCkge1xuICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHtTVE9SQUdFX1BSRUZJWH0tdXNlci1waG90b2ApO1xufVxuXG4vLyBDbG90aGVzXG5leHBvcnQgZnVuY3Rpb24gc3RvcmVDbG90aGVzKGluZGV4LCBiYXNlNjQpIHtcbiAgY29uc3QgY2xvdGhlcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7U1RPUkFHRV9QUkVGSVh9LWNsb3RoZXNgKSB8fCAnW10nKTtcbiAgY2xvdGhlc1tpbmRleF0gPSBiYXNlNjQ7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGAke1NUT1JBR0VfUFJFRklYfS1jbG90aGVzYCwgSlNPTi5zdHJpbmdpZnkoY2xvdGhlcykpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xvdGhlcygpIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7U1RPUkFHRV9QUkVGSVh9LWNsb3RoZXNgKSB8fCAnW10nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQ2xvdGhlcygpIHtcbiAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYCR7U1RPUkFHRV9QUkVGSVh9LWNsb3RoZXNgKTtcbn1cblxuLy8gR2VuZXJhdGVkIEltYWdlXG5leHBvcnQgZnVuY3Rpb24gc3RvcmVHZW5lcmF0ZWRJbWFnZSh1cmwpIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYCR7U1RPUkFHRV9QUkVGSVh9LWdlbmVyYXRlZC1pbWFnZWAsIHVybCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRHZW5lcmF0ZWRJbWFnZSgpIHtcbiAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke1NUT1JBR0VfUFJFRklYfS1nZW5lcmF0ZWQtaW1hZ2VgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyR2VuZXJhdGVkSW1hZ2UoKSB7XG4gIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGAke1NUT1JBR0VfUFJFRklYfS1nZW5lcmF0ZWQtaW1hZ2VgKTtcbn1cblxuLy8gQ2xlYXIgYWxsXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJBbGxTdG9yYWdlKCkge1xuICBPYmplY3Qua2V5cyhsb2NhbFN0b3JhZ2UpXG4gICAgLmZpbHRlcigoa2V5KSA9PiBrZXkuc3RhcnRzV2l0aChTVE9SQUdFX1BSRUZJWCkpXG4gICAgLmZvckVhY2goKGtleSkgPT4gbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KSk7XG59XG4iLCAiLyoqXG4gKiBTdGVwIDE6IFVzZXIgUGhvdG8gVXBsb2FkXG4gKi9cblxuaW1wb3J0IHsgY3JlYXRlRHJvcHpvbmUgfSBmcm9tICcuLi9kcm9wem9uZS5qcyc7XG5pbXBvcnQgeyBzdG9yZVVzZXJQaG90bywgZ2V0VXNlclBob3RvIH0gZnJvbSAnLi4vLi4vdXRpbHMvc3RvcmFnZS5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVVc2VyUGhvdG9TdGVwKCkge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29udGFpbmVyLmNsYXNzTmFtZSA9ICd0cnlvbi1zdGVwLXVzZXItcGhvdG8nO1xuXG4gIGNvbnN0IGRyb3B6b25lID0gY3JlYXRlRHJvcHpvbmUoXG4gICAgJ1VwbG9hZCB5b3VyIHBob3RvJyxcbiAgICAnRHJhZyB5b3VyIHBob3RvIGhlcmUgb3IgY2xpY2sgdG8gc2VsZWN0JyxcbiAgICAoaW1hZ2VEYXRhKSA9PiB7XG4gICAgICBzdG9yZVVzZXJQaG90byhpbWFnZURhdGEpO1xuICAgICAgLy8gU2hvdyBwcmV2aWV3XG4gICAgICBjb25zdCBwcmV2aWV3ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy50cnlvbi1waG90by1wcmV2aWV3Jyk7XG4gICAgICBpZiAocHJldmlldykge1xuICAgICAgICBwcmV2aWV3LmlubmVySFRNTCA9IGA8aW1nIHNyYz1cIiR7aW1hZ2VEYXRhfVwiIGFsdD1cIllvdXIgcGhvdG9cIiAvPmA7XG4gICAgICAgIHByZXZpZXcuY2xhc3NMaXN0LmFkZCgnaGFzLWltYWdlJyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbJ2ltYWdlL2pwZWcnLCAnaW1hZ2UvcG5nJywgJ2ltYWdlL3dlYnAnXVxuICApO1xuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkcm9wem9uZSk7XG5cbiAgLy8gU2hvdyBleGlzdGluZyBwaG90byBpZiBhdmFpbGFibGVcbiAgY29uc3QgdXNlclBob3RvID0gZ2V0VXNlclBob3RvKCk7XG4gIGlmICh1c2VyUGhvdG8pIHtcbiAgICBjb25zdCBwcmV2aWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJldmlldy5jbGFzc05hbWUgPSAndHJ5b24tcGhvdG8tcHJldmlldyBoYXMtaW1hZ2UnO1xuICAgIHByZXZpZXcuaW5uZXJIVE1MID0gYDxpbWcgc3JjPVwiJHt1c2VyUGhvdG99XCIgYWx0PVwiWW91ciBwaG90b1wiIC8+YDtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocHJldmlldyk7XG4gIH1cblxuICByZXR1cm4gY29udGFpbmVyO1xufVxuIiwgIi8qKlxuICogU3RlcCAyOiBDbG90aGVzIFVwbG9hZFxuICovXG5cbmltcG9ydCB7IGNyZWF0ZURyb3B6b25lIH0gZnJvbSAnLi4vZHJvcHpvbmUuanMnO1xuaW1wb3J0IHsgc3RvcmVDbG90aGVzLCBnZXRDbG90aGVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvc3RvcmFnZS5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDbG90aGVzU3RlcCgpIHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnRhaW5lci5jbGFzc05hbWUgPSAndHJ5b24tc3RlcC1jbG90aGVzJztcblxuICBjb25zdCBjbG90aGVzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNsb3RoZXNDb250YWluZXIuY2xhc3NOYW1lID0gJ3RyeW9uLWNsb3RoZXMtZ3JpZCc7XG5cbiAgLy8gQ3JlYXRlIDQgc2xvdHMgZm9yIGNsb3RoaW5nXG4gIGNvbnN0IGNsb3RoZXNDb3VudCA9IDQ7XG4gIGNvbnN0IGNsb3RoZXMgPSBnZXRDbG90aGVzKCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbG90aGVzQ291bnQ7IGkrKykge1xuICAgIGNvbnN0IHNsb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzbG90LmNsYXNzTmFtZSA9ICd0cnlvbi1jbG90aGVzLXNsb3QnO1xuICAgIHNsb3QuZGF0YXNldC5pbmRleCA9IGk7XG5cbiAgICBjb25zdCBkcm9wem9uZSA9IGNyZWF0ZURyb3B6b25lKFxuICAgICAgYENsb3RoaW5nICR7aSArIDF9YCxcbiAgICAgICdEcmFnIGltYWdlJyxcbiAgICAgIChpbWFnZURhdGEpID0+IHtcbiAgICAgICAgc3RvcmVDbG90aGVzKGksIGltYWdlRGF0YSk7XG4gICAgICAgIC8vIFVwZGF0ZSBwcmV2aWV3XG4gICAgICAgIGNvbnN0IHByZXZpZXcgPSBzbG90LnF1ZXJ5U2VsZWN0b3IoJy50cnlvbi1jbG90aGVzLXByZXZpZXcnKTtcbiAgICAgICAgaWYgKHByZXZpZXcpIHtcbiAgICAgICAgICBwcmV2aWV3LmlubmVySFRNTCA9IGA8aW1nIHNyYz1cIiR7aW1hZ2VEYXRhfVwiIGFsdD1cIkNsb3RoaW5nIGl0ZW0gJHtpICsgMX1cIiAvPmA7XG4gICAgICAgICAgcHJldmlldy5jbGFzc0xpc3QuYWRkKCdoYXMtaW1hZ2UnKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFsnaW1hZ2UvanBlZycsICdpbWFnZS9wbmcnLCAnaW1hZ2Uvd2VicCddLFxuICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICBzbG90LmFwcGVuZENoaWxkKGRyb3B6b25lKTtcblxuICAgIC8vIFNob3cgZXhpc3RpbmcgY2xvdGhlcyBpZiBhdmFpbGFibGVcbiAgICBpZiAoY2xvdGhlc1tpXSkge1xuICAgICAgY29uc3QgcHJldmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcHJldmlldy5jbGFzc05hbWUgPSAndHJ5b24tY2xvdGhlcy1wcmV2aWV3IGhhcy1pbWFnZSc7XG4gICAgICBwcmV2aWV3LmlubmVySFRNTCA9IGA8aW1nIHNyYz1cIiR7Y2xvdGhlc1tpXX1cIiBhbHQ9XCJDbG90aGluZyBpdGVtICR7aSArIDF9XCIgLz5gO1xuICAgICAgc2xvdC5hcHBlbmRDaGlsZChwcmV2aWV3KTtcbiAgICB9XG5cbiAgICBjbG90aGVzQ29udGFpbmVyLmFwcGVuZENoaWxkKHNsb3QpO1xuICB9XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNsb3RoZXNDb250YWluZXIpO1xuXG4gIHJldHVybiBjb250YWluZXI7XG59XG4iLCAiLyoqXG4gKiBTdGVwIDM6IEdlbmVyYXRlIFRyeS1PblxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHZW5lcmF0ZVN0ZXAoKSB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb250YWluZXIuY2xhc3NOYW1lID0gJ3RyeW9uLXN0ZXAtZ2VuZXJhdGUnO1xuXG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cInRyeW9uLWdlbmVyYXRlLWluZm9cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0cnlvbi1pY29uLWxhcmdlXCI+XG4gICAgICAgIDxzdmcgd2lkdGg9XCI0OFwiIGhlaWdodD1cIjQ4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiPlxuICAgICAgICAgIDxjaXJjbGUgY3g9XCIxMlwiIGN5PVwiMTJcIiByPVwiMVwiPjwvY2lyY2xlPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTIgMXY2bTAgNnY2XCI+PC9wYXRoPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNNC4yMiA0LjIybDQuMjQgNC4yNG0wIDUuMDhsNC4yNCA0LjI0XCI+PC9wYXRoPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTkuNzggNC4yMmwtNC4yNCA0LjI0bTAgNS4wOGwtNC4yNCA0LjI0XCI+PC9wYXRoPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGgzPlJlYWR5IHRvIEdlbmVyYXRlITwvaDM+XG4gICAgICA8cD5DbGljayB0aGUgXCJUcnktb25cIiBidXR0b24gdG8gY3JlYXRlIHlvdXIgdmlydHVhbCB0cnktb24gaW1hZ2UgdXNpbmcgQUkuPC9wPlxuICAgICAgPGRpdiBjbGFzcz1cInRyeW9uLWZlYXR1cmUtbGlzdFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidHJ5b24tZmVhdHVyZVwiPlx1MjcxMyBGYXN0IGdlbmVyYXRpb24gKDMwIHNlY29uZHMpPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0cnlvbi1mZWF0dXJlXCI+XHUyNzEzIEhpZ2gtcXVhbGl0eSByZXN1bHRzPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0cnlvbi1mZWF0dXJlXCI+XHUyNzEzIE11bHRpcGxlIGNsb3RoaW5nIHN0eWxlczwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGA7XG5cbiAgcmV0dXJuIGNvbnRhaW5lcjtcbn1cbiIsICIvKipcbiAqIFN0ZXAgNDogUmVzdWx0XG4gKi9cblxuaW1wb3J0IHsgZ2V0R2VuZXJhdGVkSW1hZ2UgfSBmcm9tICcuLi8uLi91dGlscy9zdG9yYWdlLmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlc3VsdFN0ZXAoKSB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb250YWluZXIuY2xhc3NOYW1lID0gJ3RyeW9uLXN0ZXAtcmVzdWx0JztcblxuICBjb25zdCBnZW5lcmF0ZWRJbWFnZSA9IGdldEdlbmVyYXRlZEltYWdlKCk7XG5cbiAgaWYgKGdlbmVyYXRlZEltYWdlKSB7XG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJ0cnlvbi1yZXN1bHQtaW1hZ2UtY29udGFpbmVyXCI+XG4gICAgICAgIDxpbWcgc3JjPVwiJHtnZW5lcmF0ZWRJbWFnZX1cIiBhbHQ9XCJHZW5lcmF0ZWQgdHJ5LW9uXCIgY2xhc3M9XCJ0cnlvbi1yZXN1bHQtaW1hZ2VcIiAvPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidHJ5b24tcmVzdWx0LW92ZXJsYXlcIj5Zb3VyIFRyeS1PbiBSZXN1bHQhPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0cnlvbi1yZXN1bHQtYWN0aW9uc1wiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwidHJ5b24tYnRuLXByaW1hcnkgdHJ5b24tYnRuLWRvd25sb2FkXCI+RG93bmxvYWQgSW1hZ2U8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInRyeW9uLWJ0bi1zZWNvbmRhcnkgdHJ5b24tYnRuLXRyeS1hZ2FpblwiPlRyeSBBbm90aGVyPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgY29uc3QgZG93bmxvYWRCdG4gPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnRyeW9uLWJ0bi1kb3dubG9hZCcpO1xuICAgIGNvbnN0IHRyeUFnYWluQnRuID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy50cnlvbi1idG4tdHJ5LWFnYWluJyk7XG5cbiAgICBkb3dubG9hZEJ0bj8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgbGluay5ocmVmID0gZ2VuZXJhdGVkSW1hZ2U7XG4gICAgICBsaW5rLmRvd25sb2FkID0gJ3RyeW9uLXJlc3VsdC5wbmcnO1xuICAgICAgbGluay5jbGljaygpO1xuICAgIH0pO1xuXG4gICAgdHJ5QWdhaW5CdG4/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgLy8gUmVzZXQgdG8gbWFpbiBVSVxuICAgICAgbG9jYXRpb24ucmVsb2FkKCk7IC8vIFNpbXBsZSBhcHByb2FjaFxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwidHJ5b24tcmVzdWx0LXBsYWNlaG9sZGVyXCI+XG4gICAgICAgIDxwPk5vIHJlc3VsdCB5ZXQuIEdlbmVyYXRlIGFuIGltYWdlIGZpcnN0ITwvcD5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cblxuICByZXR1cm4gY29udGFpbmVyO1xufVxuIiwgIi8qKlxuICogT25ib2FyZGluZyBDb21wb25lbnRcbiAqIFN0ZXAtYnktc3RlcCBndWlkZWQgZXhwZXJpZW5jZSB3aXRoIHNwb3RsaWdodCBlZmZlY3RcbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVTdGVwQ29udGFpbmVyIH0gZnJvbSAnLi9zdGVwcy9zdGVwQ29udGFpbmVyLmpzJztcbmltcG9ydCB7IGNyZWF0ZVVzZXJQaG90b1N0ZXAgfSBmcm9tICcuL3N0ZXBzL3VzZXJQaG90b1N0ZXAuanMnO1xuaW1wb3J0IHsgY3JlYXRlQ2xvdGhlc1N0ZXAgfSBmcm9tICcuL3N0ZXBzL2Nsb3RoZXNTdGVwLmpzJztcbmltcG9ydCB7IGNyZWF0ZUdlbmVyYXRlU3RlcCB9IGZyb20gJy4vc3RlcHMvZ2VuZXJhdGVTdGVwLmpzJztcbmltcG9ydCB7IGNyZWF0ZVJlc3VsdFN0ZXAgfSBmcm9tICcuL3N0ZXBzL3Jlc3VsdFN0ZXAuanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlT25ib2FyZGluZyhvbkNvbXBsZXRlQ2FsbGJhY2spIHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnRhaW5lci5jbGFzc05hbWUgPSAndHJ5b24tb25ib2FyZGluZyc7XG5cbiAgLy8gRGVmaW5lIG9uYm9hcmRpbmcgc3RlcHNcbiAgY29uc3Qgc3RlcHMgPSBbXG4gICAge1xuICAgICAgdGl0bGU6ICdVcGxvYWQgWW91ciBQaG90bycsXG4gICAgICBzdWJ0aXRsZTogJ1Nob3cgdXMgd2hhdCB5b3UgbG9vayBsaWtlJyxcbiAgICAgIGNvbXBvbmVudDogY3JlYXRlVXNlclBob3RvU3RlcCgpLFxuICAgICAgaW5kZXg6IDAsXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0FkZCBZb3VyIENsb3RoZXMnLFxuICAgICAgc3VidGl0bGU6ICdEcmFnIHVwIHRvIDQgY2xvdGhpbmcgaXRlbXMnLFxuICAgICAgY29tcG9uZW50OiBjcmVhdGVDbG90aGVzU3RlcCgpLFxuICAgICAgaW5kZXg6IDEsXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0dlbmVyYXRlIFRyeS1PbicsXG4gICAgICBzdWJ0aXRsZTogJ0NyZWF0ZSB5b3VyIHZpcnR1YWwgdHJ5LW9uJyxcbiAgICAgIGNvbXBvbmVudDogY3JlYXRlR2VuZXJhdGVTdGVwKCksXG4gICAgICBpbmRleDogMixcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnU2VlIFlvdXIgUmVzdWx0JyxcbiAgICAgIHN1YnRpdGxlOiAnQ2hlY2sgb3V0IGhvdyB5b3UgbG9vaycsXG4gICAgICBjb21wb25lbnQ6IGNyZWF0ZVJlc3VsdFN0ZXAoKSxcbiAgICAgIGluZGV4OiAzLFxuICAgIH0sXG4gIF07XG5cbiAgbGV0IGN1cnJlbnRTdGVwID0gMDtcblxuICAvLyBDcmVhdGUgc3RlcCBjb250YWluZXIgd2l0aCBzcG90bGlnaHQgZWZmZWN0XG4gIGNvbnN0IHN0ZXBDb250YWluZXIgPSBjcmVhdGVTdGVwQ29udGFpbmVyKFxuICAgIHN0ZXBzLFxuICAgIGN1cnJlbnRTdGVwLFxuICAgIChzdGVwSW5kZXgpID0+IHtcbiAgICAgIGN1cnJlbnRTdGVwID0gc3RlcEluZGV4O1xuICAgICAgcmVuZGVyU3RlcCgpO1xuICAgIH1cbiAgKTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3RlcENvbnRhaW5lcik7XG5cbiAgZnVuY3Rpb24gcmVuZGVyU3RlcCgpIHtcbiAgICAvLyBVcGRhdGUgc3RlcCBkaXNwbGF5XG4gICAgY29uc3Qgc3RlcCA9IHN0ZXBzW2N1cnJlbnRTdGVwXTtcblxuICAgIC8vIEZhZGUgYW5pbWF0aW9uXG4gICAgc3RlcENvbnRhaW5lci5zdHlsZS5vcGFjaXR5ID0gJzAnO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc3RlcENvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcblxuICAgICAgY29uc3QgbmV3U3RlcENvbnRhaW5lciA9IGNyZWF0ZVN0ZXBDb250YWluZXIoXG4gICAgICAgIHN0ZXBzLFxuICAgICAgICBjdXJyZW50U3RlcCxcbiAgICAgICAgKHN0ZXBJbmRleCkgPT4ge1xuICAgICAgICAgIGN1cnJlbnRTdGVwID0gc3RlcEluZGV4O1xuICAgICAgICAgIHJlbmRlclN0ZXAoKTtcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgICAgc3RlcENvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdTdGVwQ29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICAgICAgc3RlcENvbnRhaW5lci5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuXG4gICAgICBpZiAoY3VycmVudFN0ZXAgPT09IHN0ZXBzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgLy8gTGFzdCBzdGVwIC0gc2hvdyBjb21wbGV0aW9uIGJ1dHRvblxuICAgICAgICBjb25zdCBjb21wbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjb21wbGV0ZUJ0bi5jbGFzc05hbWUgPSAndHJ5b24tYnRuLXByaW1hcnkgdHJ5b24tYnRuLW9uYm9hcmRpbmctY29tcGxldGUnO1xuICAgICAgICBjb21wbGV0ZUJ0bi50ZXh0Q29udGVudCA9ICdTdGFydCBVc2luZyBUcnlvbiEnO1xuICAgICAgICBjb21wbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ29tcGxldGVDYWxsYmFjayk7XG4gICAgICAgIHN0ZXBDb250YWluZXIuYXBwZW5kQ2hpbGQoY29tcGxldGVCdG4pO1xuICAgICAgfVxuICAgIH0sIDMwMCk7XG4gIH1cblxuICAvLyBJbml0aWFsIHJlbmRlclxuICByZW5kZXJTdGVwKCk7XG5cbiAgcmV0dXJuIGNvbnRhaW5lcjtcbn1cbiIsICIvKipcbiAqIEltYWdlIFJlc3VsdCBDb21wb25lbnRcbiAqIERpc3BsYXlzIGdlbmVyYXRlZCBpbWFnZSB3aXRoIGhvdmVyIG1hZ25pZmllciBlZmZlY3RcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW1hZ2VSZXN1bHQoaW1hZ2VVcmwpIHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnRhaW5lci5jbGFzc05hbWUgPSAndHJ5b24taW1hZ2UtcmVzdWx0LWNvbnRhaW5lcic7XG5cbiAgY29uc3QgaW1hZ2VXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGltYWdlV3JhcHBlci5jbGFzc05hbWUgPSAndHJ5b24taW1hZ2Utd3JhcHBlcic7XG5cbiAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gIGltZy5zcmMgPSBpbWFnZVVybDtcbiAgaW1nLmFsdCA9ICdHZW5lcmF0ZWQgdHJ5LW9uIHJlc3VsdCc7XG4gIGltZy5jbGFzc05hbWUgPSAndHJ5b24tcmVzdWx0LWltYWdlJztcblxuICAvLyBNYWduaWZpZXIgbGVuc1xuICBjb25zdCBsZW5zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGxlbnMuY2xhc3NOYW1lID0gJ3RyeW9uLW1hZ25pZmllci1sZW5zJztcblxuICAvLyBNYWduaWZpZXIgdmlld1xuICBjb25zdCBtYWduaWZpZXJWaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1hZ25pZmllclZpZXcuY2xhc3NOYW1lID0gJ3RyeW9uLW1hZ25pZmllci12aWV3JztcbiAgbWFnbmlmaWVyVmlldy5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIke2ltYWdlVXJsfVwiIGFsdD1cIk1hZ25pZmllZCB2aWV3XCIgLz5gO1xuXG4gIGltYWdlV3JhcHBlci5hcHBlbmRDaGlsZChpbWcpO1xuICBpbWFnZVdyYXBwZXIuYXBwZW5kQ2hpbGQobGVucyk7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGltYWdlV3JhcHBlcik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtYWduaWZpZXJWaWV3KTtcblxuICAvLyBNYWduaWZpZXIgZnVuY3Rpb25hbGl0eVxuICBsZXQgaXNIb3ZlcmluZyA9IGZhbHNlO1xuXG4gIGltYWdlV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgIGlzSG92ZXJpbmcgPSB0cnVlO1xuICAgIGxlbnMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgbWFnbmlmaWVyVmlldy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgfSk7XG5cbiAgaW1hZ2VXcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgaXNIb3ZlcmluZyA9IGZhbHNlO1xuICAgIGxlbnMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBtYWduaWZpZXJWaWV3LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH0pO1xuXG4gIGltYWdlV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSkgPT4ge1xuICAgIGlmICghaXNIb3ZlcmluZykgcmV0dXJuO1xuXG4gICAgY29uc3QgcmVjdCA9IGltYWdlV3JhcHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB4ID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgIGNvbnN0IHkgPSBlLmNsaWVudFkgLSByZWN0LnRvcDtcblxuICAgIC8vIFVwZGF0ZSBsZW5zIHBvc2l0aW9uXG4gICAgbGVucy5zdHlsZS5sZWZ0ID0geCAtIDUwICsgJ3B4JztcbiAgICBsZW5zLnN0eWxlLnRvcCA9IHkgLSA1MCArICdweCc7XG5cbiAgICAvLyBVcGRhdGUgbWFnbmlmaWVyIHZpZXdcbiAgICBjb25zdCBzY2FsZSA9IDI7IC8vIDJ4IG1hZ25pZmljYXRpb25cbiAgICBtYWduaWZpZXJWaWV3LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9IGAtJHt4ICogc2NhbGUgLSAxNTB9cHggLSR7eSAqIHNjYWxlIC0gMTUwfXB4YDtcbiAgfSk7XG5cbiAgLy8gRG93bmxvYWQgYnV0dG9uXG4gIGNvbnN0IGRvd25sb2FkQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGRvd25sb2FkQnRuLmNsYXNzTmFtZSA9ICd0cnlvbi1idG4tcHJpbWFyeSB0cnlvbi1idG4tZG93bmxvYWQtcmVzdWx0JztcbiAgZG93bmxvYWRCdG4udGV4dENvbnRlbnQgPSAnRG93bmxvYWQgUmVzdWx0JztcblxuICBkb3dubG9hZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGxpbmsuaHJlZiA9IGltYWdlVXJsO1xuICAgIGxpbmsuZG93bmxvYWQgPSAndHJ5b24tcmVzdWx0LnBuZyc7XG4gICAgbGluay5jbGljaygpO1xuICB9KTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZG93bmxvYWRCdG4pO1xuXG4gIHJldHVybiBjb250YWluZXI7XG59XG4iLCAiLyoqXG4gKiBBUEkgU2VydmljZVxuICogSGFuZGxlcyBjb21tdW5pY2F0aW9uIHdpdGggVHJ5b24gYmFja2VuZFxuICovXG5cbmZ1bmN0aW9uIGdldEFwaUNvbmZpZygpIHtcbiAgY29uc3QgY29uZmlnID0gd2luZG93LlRSWU9OX1dJREdFVF9DT05GSUc7XG4gIGlmICghY29uZmlnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUcnlvbiBXaWRnZXQgY29uZmlnIG5vdCBpbml0aWFsaXplZCcpO1xuICB9XG4gIHJldHVybiBjb25maWc7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZW5lcmF0ZVRyeU9uKHVzZXJJbWFnZUJhc2U2NCwgY2xvdGhlc0ltYWdlc0Jhc2U2NEFycmF5KSB7XG4gIGNvbnN0IGNvbmZpZyA9IGdldEFwaUNvbmZpZygpO1xuICBcbiAgLy8gRmlsdGVyIG91dCBlbXB0eSBzbG90c1xuICBjb25zdCBjbG90aGVzID0gY2xvdGhlc0ltYWdlc0Jhc2U2NEFycmF5LmZpbHRlcigoYykgPT4gYyAmJiBjLmxlbmd0aCA+IDApO1xuXG4gIGlmICghdXNlckltYWdlQmFzZTY0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVc2VyIGltYWdlIGlzIHJlcXVpcmVkJyk7XG4gIH1cblxuICBpZiAoY2xvdGhlcy5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0IGxlYXN0IG9uZSBjbG90aGluZyBpdGVtIGlzIHJlcXVpcmVkJyk7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7Y29uZmlnLmFwaVVybH0vaW1hZ2VzL2dlbmVyYXRlYCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICd4LWNsaWVudC1rZXknOiBjb25maWcuYXBpS2V5LFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgcHJvbXB0OiBgQSBwZXJzb24gd2VhcmluZyAke2Nsb3RoZXMubGVuZ3RoID4gMSA/ICdtdWx0aXBsZSBjbG90aGluZyBpdGVtcycgOiAnYSBjbG90aGluZyBpdGVtJ30gZnJvbSB0aGUgcHJvdmlkZWQgaW1hZ2VzYCxcbiAgICAgICAgdXNlckltYWdlOiB1c2VySW1hZ2VCYXNlNjQsXG4gICAgICAgIGNsb3RoZXMsXG4gICAgICB9KSxcbiAgICB9KTtcblxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIGNvbnN0IGVycm9yRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKS5jYXRjaCgoKSA9PiAoe30pKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvckRhdGEuZXJyb3IgfHwgYEFQSSBlcnJvcjogJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIGlmICghZGF0YS5zdWNjZXNzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YS5lcnJvciB8fCAnR2VuZXJhdGlvbiBmYWlsZWQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdXJsOiBkYXRhLnVybCxcbiAgICAgIGdlbmVyYXRpb25JZDogZGF0YS5nZW5lcmF0aW9uSWQsXG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdUcnktb24gZ2VuZXJhdGlvbiBlcnJvcjonLCBlcnJvcik7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlQXBpS2V5KGFwaUtleSkge1xuICBjb25zdCBjb25maWcgPSBnZXRBcGlDb25maWcoKTtcbiAgXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtjb25maWcuYXBpVXJsfS9hdXRoL3ZhbGlkYXRlYCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBhcGlLZXkgfSksXG4gICAgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICByZXR1cm4gZGF0YS52YWxpZCA9PT0gdHJ1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdBUEkga2V5IHZhbGlkYXRpb24gZXJyb3I6JywgZXJyb3IpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwgIi8qKlxuICogTWFpbiBVSSBDb21wb25lbnRcbiAqIFNob3duIGFmdGVyIG9uYm9hcmRpbmcgaXMgY29tcGxldGVcbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVEcm9wem9uZSB9IGZyb20gJy4vZHJvcHpvbmUuanMnO1xuaW1wb3J0IHsgY3JlYXRlSW1hZ2VSZXN1bHQgfSBmcm9tICcuL2ltYWdlUmVzdWx0LmpzJztcbmltcG9ydCB7IHN0b3JlVXNlclBob3RvLCBzdG9yZUNsb3RoZXMsIGdldENsb3RoZXMsIHN0b3JlR2VuZXJhdGVkSW1hZ2UgfSBmcm9tICcuLi91dGlscy9zdG9yYWdlLmpzJztcbmltcG9ydCB7IGdlbmVyYXRlVHJ5T24gfSBmcm9tICcuLi9zZXJ2aWNlcy9hcGkuanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWFpblVJKCkge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29udGFpbmVyLmNsYXNzTmFtZSA9ICd0cnlvbi1tYWluLXVpJztcblxuICAvLyBIZWFkZXJcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGhlYWRlci5jbGFzc05hbWUgPSAndHJ5b24tbWFpbi1oZWFkZXInO1xuICBoZWFkZXIuaW5uZXJIVE1MID0gYFxuICAgIDxoMj5DcmVhdGUgWW91ciBUcnktT248L2gyPlxuICAgIDxwPlVwbG9hZCB5b3VyIHBob3RvIGFuZCBzZWxlY3QgY2xvdGhpbmcgaXRlbXM8L3A+XG4gIGA7XG5cbiAgLy8gVXNlciBwaG90byBzZWN0aW9uXG4gIGNvbnN0IHVzZXJQaG90b1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdXNlclBob3RvU2VjdGlvbi5jbGFzc05hbWUgPSAndHJ5b24tc2VjdGlvbic7XG4gIHVzZXJQaG90b1NlY3Rpb24uaW5uZXJIVE1MID0gYDxoMz5Zb3VyIFBob3RvPC9oMz5gO1xuXG4gIGNvbnN0IHVzZXJQaG90b0Ryb3B6b25lID0gY3JlYXRlRHJvcHpvbmUoXG4gICAgJ1lvdXIgUGhvdG8nLFxuICAgICdEcmFnIG9yIGNsaWNrIHRvIHVwbG9hZCcsXG4gICAgKGltYWdlRGF0YSkgPT4ge1xuICAgICAgc3RvcmVVc2VyUGhvdG8oaW1hZ2VEYXRhKTtcbiAgICAgIHVwZGF0ZVVJKCk7XG4gICAgfSxcbiAgICBbJ2ltYWdlL2pwZWcnLCAnaW1hZ2UvcG5nJywgJ2ltYWdlL3dlYnAnXVxuICApO1xuICB1c2VyUGhvdG9TZWN0aW9uLmFwcGVuZENoaWxkKHVzZXJQaG90b0Ryb3B6b25lKTtcblxuICAvLyBDbG90aGVzIGdyaWRcbiAgY29uc3QgY2xvdGhlc1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY2xvdGhlc1NlY3Rpb24uY2xhc3NOYW1lID0gJ3RyeW9uLXNlY3Rpb24nO1xuICBjbG90aGVzU2VjdGlvbi5pbm5lckhUTUwgPSBgPGgzPkNsb3RoaW5nIEl0ZW1zIChTZWxlY3QgdXAgdG8gNCk8L2gzPmA7XG5cbiAgY29uc3QgY2xvdGhlc0dyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY2xvdGhlc0dyaWQuY2xhc3NOYW1lID0gJ3RyeW9uLWNsb3RoZXMtZ3JpZC1tYWluJztcblxuICBjb25zdCBjbG90aGVzID0gZ2V0Q2xvdGhlcygpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgY29uc3Qgc2xvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNsb3QuY2xhc3NOYW1lID0gJ3RyeW9uLWNsb3RoZXMtc2xvdC1tYWluJztcblxuICAgIGNvbnN0IGRyb3B6b25lID0gY3JlYXRlRHJvcHpvbmUoXG4gICAgICBgSXRlbSAke2kgKyAxfWAsXG4gICAgICAnQWRkIGNsb3RoaW5nJyxcbiAgICAgIChpbWFnZURhdGEpID0+IHtcbiAgICAgICAgc3RvcmVDbG90aGVzKGksIGltYWdlRGF0YSk7XG4gICAgICAgIHVwZGF0ZVVJKCk7XG4gICAgICB9LFxuICAgICAgWydpbWFnZS9qcGVnJywgJ2ltYWdlL3BuZycsICdpbWFnZS93ZWJwJ10sXG4gICAgICB0cnVlXG4gICAgKTtcblxuICAgIHNsb3QuYXBwZW5kQ2hpbGQoZHJvcHpvbmUpO1xuXG4gICAgaWYgKGNsb3RoZXNbaV0pIHtcbiAgICAgIGNvbnN0IHByZXZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHByZXZpZXcuY2xhc3NOYW1lID0gJ3RyeW9uLWNsb3RoZXMtcHJldmlldy1tYWluIGhhcy1pbWFnZSc7XG4gICAgICBwcmV2aWV3LmlubmVySFRNTCA9IGA8aW1nIHNyYz1cIiR7Y2xvdGhlc1tpXX1cIiBhbHQ9XCJDbG90aGluZyAke2kgKyAxfVwiIC8+YDtcbiAgICAgIHNsb3QuYXBwZW5kQ2hpbGQocHJldmlldyk7XG4gICAgfVxuXG4gICAgY2xvdGhlc0dyaWQuYXBwZW5kQ2hpbGQoc2xvdCk7XG4gIH1cblxuICBjbG90aGVzU2VjdGlvbi5hcHBlbmRDaGlsZChjbG90aGVzR3JpZCk7XG5cbiAgLy8gR2VuZXJhdGUgYnV0dG9uXG4gIGNvbnN0IGdlbmVyYXRlU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBnZW5lcmF0ZVNlY3Rpb24uY2xhc3NOYW1lID0gJ3RyeW9uLXNlY3Rpb24gdHJ5b24tc2VjdGlvbi1nZW5lcmF0ZSc7XG5cbiAgY29uc3QgZ2VuZXJhdGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgZ2VuZXJhdGVCdG4uY2xhc3NOYW1lID0gJ3RyeW9uLWJ0bi1wcmltYXJ5IHRyeW9uLWJ0bi1nZW5lcmF0ZSc7XG4gIGdlbmVyYXRlQnRuLnRleHRDb250ZW50ID0gJ0dlbmVyYXRlIFRyeS1Pbic7XG4gIGdlbmVyYXRlQnRuLmlkID0gJ3RyeW9uLWdlbmVyYXRlLWJ0bic7XG5cbiAgZ2VuZXJhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgaGFuZGxlR2VuZXJhdGUoKTtcbiAgfSk7XG5cbiAgZ2VuZXJhdGVTZWN0aW9uLmFwcGVuZENoaWxkKGdlbmVyYXRlQnRuKTtcblxuICAvLyBSZXN1bHQgc2VjdGlvblxuICBjb25zdCByZXN1bHRTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHJlc3VsdFNlY3Rpb24uY2xhc3NOYW1lID0gJ3RyeW9uLXNlY3Rpb24gdHJ5b24tc2VjdGlvbi1yZXN1bHQnO1xuICByZXN1bHRTZWN0aW9uLmlkID0gJ3RyeW9uLXJlc3VsdC1zZWN0aW9uJztcblxuICAvLyBBc3NlbWJsZVxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHVzZXJQaG90b1NlY3Rpb24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY2xvdGhlc1NlY3Rpb24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZ2VuZXJhdGVTZWN0aW9uKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJlc3VsdFNlY3Rpb24pO1xuXG4gIC8vIFVwZGF0ZSBVSSBmdW5jdGlvblxuICBmdW5jdGlvbiB1cGRhdGVVSSgpIHtcbiAgICAvLyBDb3VsZCBhZGQgdmFsaWRhdGlvbiBmZWVkYmFjayBoZXJlXG4gIH1cblxuICAvLyBHZW5lcmF0ZSBoYW5kbGVyXG4gIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUdlbmVyYXRlKCkge1xuICAgIGNvbnN0IHVzZXJQaG90byA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0cnlvbi11c2VyLXBob3RvJyk7XG4gICAgY29uc3QgY2xvdGhlcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RyeW9uLWNsb3RoZXMnKSB8fCAnW10nKTtcblxuICAgIGlmICghdXNlclBob3RvKSB7XG4gICAgICBhbGVydCgnUGxlYXNlIHVwbG9hZCB5b3VyIHBob3RvIGZpcnN0Jyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGNsb3RoZXMuZmlsdGVyKChjKSA9PiBjKS5sZW5ndGggPT09IDApIHtcbiAgICAgIGFsZXJ0KCdQbGVhc2UgYWRkIGF0IGxlYXN0IG9uZSBjbG90aGluZyBpdGVtJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGdlbmVyYXRlQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIGdlbmVyYXRlQnRuLnRleHRDb250ZW50ID0gJ0dlbmVyYXRpbmcuLi4nO1xuICAgICAgZ2VuZXJhdGVCdG4uaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwidHJ5b24tc3Bpbm5lclwiPjwvc3Bhbj4gR2VuZXJhdGluZy4uLic7XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGdlbmVyYXRlVHJ5T24odXNlclBob3RvLCBjbG90aGVzKTtcblxuICAgICAgLy8gU3RvcmUgcmVzdWx0XG4gICAgICBzdG9yZUdlbmVyYXRlZEltYWdlKHJlc3VsdC51cmwpO1xuXG4gICAgICAvLyBTaG93IHJlc3VsdFxuICAgICAgY29uc3QgcmVzdWx0Q29udGFpbmVyID0gcmVzdWx0U2VjdGlvbjtcbiAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgIHJlc3VsdENvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVJbWFnZVJlc3VsdChyZXN1bHQudXJsKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGFsZXJ0KCdFcnJvciBnZW5lcmF0aW5nIGltYWdlOiAnICsgZXJyb3IubWVzc2FnZSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGdlbmVyYXRlQnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICBnZW5lcmF0ZUJ0bi50ZXh0Q29udGVudCA9ICdHZW5lcmF0ZSBUcnktT24nO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb250YWluZXI7XG59XG4iLCAiLyoqXG4gKiBNb2RhbCBDb21wb25lbnRcbiAqIE1haW4gY29udGFpbmVyIGZvciB0aGUgVHJ5b24gZXhwZXJpZW5jZVxuICovXG5cbmltcG9ydCB7IGNyZWF0ZU9uYm9hcmRpbmcgfSBmcm9tICcuL29uYm9hcmRpbmcuanMnO1xuaW1wb3J0IHsgY3JlYXRlTWFpblVJIH0gZnJvbSAnLi9tYWluVUkuanMnO1xuaW1wb3J0IHsgaGFzU2Vlbk9uYm9hcmRpbmcsIHNldE9uYm9hcmRpbmdTZWVuIH0gZnJvbSAnLi4vdXRpbHMvc3RvcmFnZS5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNb2RhbChvbkNsb3NlQ2FsbGJhY2spIHtcbiAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbW9kYWwuaWQgPSAndHJ5b24tbW9kYWwnO1xuICBtb2RhbC5jbGFzc05hbWUgPSAndHJ5b24tbW9kYWwnO1xuXG4gIC8vIE1vZGFsIGJhY2tkcm9wXG4gIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGJhY2tkcm9wLmNsYXNzTmFtZSA9ICd0cnlvbi1tb2RhbC1iYWNrZHJvcCc7XG5cbiAgLy8gTW9kYWwgY29udGVudCB3cmFwcGVyXG4gIGNvbnN0IGNvbnRlbnRXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnRlbnRXcmFwcGVyLmNsYXNzTmFtZSA9ICd0cnlvbi1tb2RhbC13cmFwcGVyJztcblxuICAvLyBDbG9zZSBidXR0b25cbiAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgY2xvc2VCdG4uY2xhc3NOYW1lID0gJ3RyeW9uLW1vZGFsLWNsb3NlJztcbiAgY2xvc2VCdG4uaW5uZXJIVE1MID0gJyZ0aW1lczsnO1xuICBjbG9zZUJ0bi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnQ2xvc2UgbW9kYWwnKTtcblxuICAvLyBNYWluIGNvbnRlbnQgYXJlYSAod2lsbCBiZSBwb3B1bGF0ZWQgZHluYW1pY2FsbHkpXG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29udGVudC5jbGFzc05hbWUgPSAndHJ5b24tbW9kYWwtY29udGVudCc7XG5cbiAgLy8gQXNzZW1ibGUgbW9kYWxcbiAgY29udGVudFdyYXBwZXIuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pO1xuICBjb250ZW50V3JhcHBlci5hcHBlbmRDaGlsZChjb250ZW50KTtcbiAgbW9kYWwuYXBwZW5kQ2hpbGQoYmFja2Ryb3ApO1xuICBtb2RhbC5hcHBlbmRDaGlsZChjb250ZW50V3JhcHBlcik7XG5cbiAgLy8gTW9kYWwgc3RhdGVcbiAgbGV0IGlzT3BlbiA9IGZhbHNlO1xuICBsZXQgY3VycmVudFZpZXcgPSAnbWFpbic7IC8vICdvbmJvYXJkaW5nJyBvciAnbWFpbidcblxuICAvLyBMb2FkIGFwcHJvcHJpYXRlIHZpZXdcbiAgZnVuY3Rpb24gbG9hZFZpZXcoKSB7XG4gICAgY29udGVudC5pbm5lckhUTUwgPSAnJztcblxuICAgIGlmIChjdXJyZW50VmlldyA9PT0gJ29uYm9hcmRpbmcnKSB7XG4gICAgICBjb25zdCBvbmJvYXJkaW5nID0gY3JlYXRlT25ib2FyZGluZygoKSA9PiB7XG4gICAgICAgIC8vIE9uIG9uYm9hcmRpbmcgY29tcGxldGVcbiAgICAgICAgc2V0T25ib2FyZGluZ1NlZW4odHJ1ZSk7XG4gICAgICAgIGN1cnJlbnRWaWV3ID0gJ21haW4nO1xuICAgICAgICBsb2FkVmlldygpO1xuICAgICAgfSk7XG4gICAgICBjb250ZW50LmFwcGVuZENoaWxkKG9uYm9hcmRpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYWluVUkgPSBjcmVhdGVNYWluVUkoKTtcbiAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQobWFpblVJKTtcbiAgICB9XG4gIH1cblxuICAvLyBPcGVuIG1vZGFsXG4gIGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgaXNPcGVuID0gdHJ1ZTtcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCd0cnlvbi1tb2RhbC1vcGVuJyk7XG5cbiAgICAvLyBEZXRlcm1pbmUgd2hpY2ggdmlldyB0byBzaG93XG4gICAgaWYgKCFoYXNTZWVuT25ib2FyZGluZygpKSB7XG4gICAgICBjdXJyZW50VmlldyA9ICdvbmJvYXJkaW5nJztcbiAgICB9IGVsc2Uge1xuICAgICAgY3VycmVudFZpZXcgPSAnbWFpbic7XG4gICAgfVxuXG4gICAgbG9hZFZpZXcoKTtcbiAgfVxuXG4gIC8vIENsb3NlIG1vZGFsXG4gIGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgIGlzT3BlbiA9IGZhbHNlO1xuICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ3RyeW9uLW1vZGFsLW9wZW4nKTtcbiAgICBjb250ZW50LmlubmVySFRNTCA9ICcnO1xuICAgIG9uQ2xvc2VDYWxsYmFjaz8uKCk7XG4gIH1cblxuICAvLyBFdmVudCBsaXN0ZW5lcnNcbiAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZSk7XG4gIGJhY2tkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2UpO1xuXG4gIC8vIEV4cG9zZSBtZXRob2RzXG4gIG1vZGFsLm9wZW4gPSBvcGVuO1xuICBtb2RhbC5jbG9zZSA9IGNsb3NlO1xuXG4gIHJldHVybiBtb2RhbDtcbn1cbiIsICIvKipcbiAqIFN0eWxlcyBJbmplY3RvclxuICogSW5qZWN0cyBhbGwgd2lkZ2V0IHN0eWxlcyBpbnRvIHRoZSBwYWdlXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGluamVjdFN0eWxlcygpIHtcbiAgLy8gQ2hlY2sgaWYgc3R5bGVzIGFscmVhZHkgaW5qZWN0ZWRcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0cnlvbi13aWRnZXQtc3R5bGVzJykpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHN0eWxlLmlkID0gJ3RyeW9uLXdpZGdldC1zdHlsZXMnO1xuICBzdHlsZS50ZXh0Q29udGVudCA9IGdldFN0eWxlcygpO1xuXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5mdW5jdGlvbiBnZXRTdHlsZXMoKSB7XG4gIHJldHVybiBgXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICBUcnlvbiBXaWRnZXQgLSBHbG9iYWwgU3R5bGVzXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi50cnlvbi13aWRnZXQtcm9vdCB7XG4gIC0tdHJ5b24tcHJpbWFyeTogIzVDQUVGRjtcbiAgLS10cnlvbi1wcmltYXJ5LWRhcms6ICM0QTkwRTI7XG4gIC0tdHJ5b24tc2Vjb25kYXJ5OiAjNkI3MjgwO1xuICAtLXRyeW9uLWJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45NSk7XG4gIC0tdHJ5b24tYmFja2dyb3VuZC1kYXJrOiByZ2JhKDMwLCAzMCwgMzAsIDAuNSk7XG4gIC0tdHJ5b24tYm9yZGVyOiByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gIC0tdHJ5b24tdGV4dDogIzFGMjkzNztcbiAgLS10cnlvbi10ZXh0LWxpZ2h0OiAjNkI3MjgwO1xuICAtLXRyeW9uLXNoYWRvdzogMCAyMHB4IDUwcHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcbiAgLS10cnlvbi1yYWRpdXM6IDE2cHg7XG4gIC0tdHJ5b24tdHJhbnNpdGlvbjogYWxsIDAuM3MgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTtcbn1cblxuLnRyeW9uLXdpZGdldC1yb290ICoge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICBGbG9hdGluZyBCdXR0b25cbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLnRyeW9uLWJ0bi1mbG9hdGluZyB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgYm90dG9tOiAyNHB4O1xuICByaWdodDogMjRweDtcbiAgd2lkdGg6IDU2cHg7XG4gIGhlaWdodDogNTZweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCB2YXIoLS10cnlvbi1wcmltYXJ5KSAwJSwgdmFyKC0tdHJ5b24tcHJpbWFyeS1kYXJrKSAxMDAlKTtcbiAgYm9yZGVyOiBub25lO1xuICBjb2xvcjogd2hpdGU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJveC1zaGFkb3c6IHZhcigtLXRyeW9uLXNoYWRvdyk7XG4gIHRyYW5zaXRpb246IHZhcigtLXRyeW9uLXRyYW5zaXRpb24pO1xuICB6LWluZGV4OiA5OTk7XG4gIGZvbnQtc2l6ZTogMDtcbiAgcGFkZGluZzogMDtcbn1cblxuLnRyeW9uLWJ0bi1mbG9hdGluZzpob3ZlciB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcbiAgYm94LXNoYWRvdzogMCAyNXB4IDYwcHggcmdiYSg5MiwgMTc0LCAyNTUsIDAuMyk7XG59XG5cbi50cnlvbi1idG4tZmxvYXRpbmc6YWN0aXZlIHtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjk1KTtcbn1cblxuLnRyeW9uLWJ0bi1mbG9hdGluZyBzdmcge1xuICB3aWR0aDogMjRweDtcbiAgaGVpZ2h0OiAyNHB4O1xuICBzdHJva2Utd2lkdGg6IDIuNTtcbn1cblxuLnRyeW9uLXRvb2x0aXAge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMTAwJTtcbiAgcmlnaHQ6IDA7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbiAgcGFkZGluZzogNnB4IDEycHg7XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC44KTtcbiAgY29sb3I6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3BhY2l0eTogMDtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycztcbn1cblxuLnRyeW9uLWJ0bi1mbG9hdGluZzpob3ZlciAudHJ5b24tdG9vbHRpcCB7XG4gIG9wYWNpdHk6IDE7XG59XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIE1vZGFsXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi50cnlvbi1tb2RhbCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgaW5zZXQ6IDA7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHotaW5kZXg6IDEwMDAwO1xuICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sIE94eWdlbiwgVWJ1bnR1LCBDYW50YXJlbGwsIHNhbnMtc2VyaWY7XG4gIGNvbG9yOiB2YXIoLS10cnlvbi10ZXh0KTtcbn1cblxuLnRyeW9uLW1vZGFsLnRyeW9uLW1vZGFsLW9wZW4ge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4udHJ5b24tbW9kYWwtYmFja2Ryb3Age1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGluc2V0OiAwO1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNCk7XG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cig0cHgpO1xuICBvcGFjaXR5OiAwO1xuICBhbmltYXRpb246IHRyeW9uLWZhZGUtaW4gMC4zcyBlYXNlLW91dCBmb3J3YXJkcztcbn1cblxuLnRyeW9uLW1vZGFsLXdyYXBwZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1hcmdpbjogYXV0bztcbiAgd2lkdGg6IDkwJTtcbiAgbWF4LXdpZHRoOiA1MDBweDtcbiAgaGVpZ2h0OiBhdXRvO1xuICBtYXgtaGVpZ2h0OiA4NXZoO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10cnlvbi1iYWNrZ3JvdW5kKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdHJ5b24tcmFkaXVzKTtcbiAgYm94LXNoYWRvdzogdmFyKC0tdHJ5b24tc2hhZG93KTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYW5pbWF0aW9uOiB0cnlvbi1zbGlkZS11cCAwLjRzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSkgZm9yd2FyZHM7XG59XG5cbi50cnlvbi1tb2RhbC1jbG9zZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxMnB4O1xuICByaWdodDogMTJweDtcbiAgd2lkdGg6IDMycHg7XG4gIGhlaWdodDogMzJweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgY29sb3I6IHZhcigtLXRyeW9uLXRleHQpO1xuICBmb250LXNpemU6IDI4cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgei1pbmRleDogMTAwMTtcbiAgdHJhbnNpdGlvbjogdmFyKC0tdHJ5b24tdHJhbnNpdGlvbik7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4udHJ5b24tbW9kYWwtY2xvc2U6aG92ZXIge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMDUpO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG59XG5cbi50cnlvbi1tb2RhbC1jb250ZW50IHtcbiAgZmxleDogMTtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgcGFkZGluZzogMzJweCAyNHB4O1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICBCdXR0b25zXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi50cnlvbi1idG4tcHJpbWFyeSxcbi50cnlvbi1idG4tc2Vjb25kYXJ5IHtcbiAgcGFkZGluZzogMTJweCAyNHB4O1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IHZhcigtLXRyeW9uLXRyYW5zaXRpb24pO1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4udHJ5b24tYnRuLXByaW1hcnkge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCB2YXIoLS10cnlvbi1wcmltYXJ5KSAwJSwgdmFyKC0tdHJ5b24tcHJpbWFyeS1kYXJrKSAxMDAlKTtcbiAgY29sb3I6IHdoaXRlO1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoOTIsIDE3NCwgMjU1LCAwLjI1KTtcbn1cblxuLnRyeW9uLWJ0bi1wcmltYXJ5OmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xuICBib3gtc2hhZG93OiAwIDZweCAxNnB4IHJnYmEoOTIsIDE3NCwgMjU1LCAwLjM1KTtcbn1cblxuLnRyeW9uLWJ0bi1wcmltYXJ5OmRpc2FibGVkIHtcbiAgb3BhY2l0eTogMC42O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4udHJ5b24tYnRuLXNlY29uZGFyeSB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4wNSk7XG4gIGNvbG9yOiB2YXIoLS10cnlvbi10ZXh0KTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdHJ5b24tYm9yZGVyKTtcbn1cblxuLnRyeW9uLWJ0bi1zZWNvbmRhcnk6aG92ZXI6bm90KDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIERyb3B6b25lXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi50cnlvbi1kcm9wem9uZSB7XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG59XG5cbi50cnlvbi1kcm9wem9uZS5jb21wYWN0IHtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbn1cblxuLnRyeW9uLWRyb3B6b25lLWFyZWEge1xuICBib3JkZXI6IDJweCBkYXNoZWQgdmFyKC0tdHJ5b24tYm9yZGVyKTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgcGFkZGluZzogMjRweCAxNnB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogdmFyKC0tdHJ5b24tdHJhbnNpdGlvbik7XG4gIGJhY2tncm91bmQ6IHJnYmEoOTIsIDE3NCwgMjU1LCAwLjA1KTtcbn1cblxuLnRyeW9uLWRyb3B6b25lLmNvbXBhY3QgLnRyeW9uLWRyb3B6b25lLWFyZWEge1xuICBwYWRkaW5nOiAxNnB4IDEycHg7XG59XG5cbi50cnlvbi1kcm9wem9uZS1hcmVhOmhvdmVyIHtcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS10cnlvbi1wcmltYXJ5KTtcbiAgYmFja2dyb3VuZDogcmdiYSg5MiwgMTc0LCAyNTUsIDAuMSk7XG59XG5cbi50cnlvbi1kcm9wem9uZS1hcmVhLmRyYWdvdmVyIHtcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS10cnlvbi1wcmltYXJ5KTtcbiAgYmFja2dyb3VuZDogcmdiYSg5MiwgMTc0LCAyNTUsIDAuMTUpO1xuICB0cmFuc2Zvcm06IHNjYWxlKDEuMDIpO1xufVxuXG4udHJ5b24tZHJvcHpvbmUtaWNvbiB7XG4gIGNvbG9yOiB2YXIoLS10cnlvbi1wcmltYXJ5KTtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLnRyeW9uLWRyb3B6b25lLXRleHQge1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuLnRyeW9uLWRyb3B6b25lLXRpdGxlIHtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogdmFyKC0tdHJ5b24tdGV4dCk7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcbn1cblxuLnRyeW9uLWRyb3B6b25lLXBsYWNlaG9sZGVyIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjb2xvcjogdmFyKC0tdHJ5b24tdGV4dC1saWdodCk7XG59XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIE9uYm9hcmRpbmdcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLnRyeW9uLW9uYm9hcmRpbmcge1xuICBhbmltYXRpb246IHRyeW9uLWZhZGUtaW4gMC4zcyBlYXNlLW91dDtcbn1cblxuLnRyeW9uLXN0ZXAtY29udGFpbmVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4udHJ5b24tc3BvdGxpZ2h0IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBpbnNldDogMDtcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjEpO1xuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoM3B4KTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdHJ5b24tcmFkaXVzKTtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG5cbi50cnlvbi1zdGVwLWNvbnRlbnQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDE7XG4gIGFuaW1hdGlvbjogdHJ5b24tZmFkZS1pbiAwLjNzIGVhc2Utb3V0O1xufVxuXG4udHJ5b24tc3RlcC1pbmRpY2F0b3Ige1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMTZweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLXRyeW9uLWJvcmRlcik7XG59XG5cbi50cnlvbi1zdGVwLXRpdGxlIHtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBmb250LXdlaWdodDogNzAwO1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gIGNvbG9yOiB2YXIoLS10cnlvbi10ZXh0KTtcbn1cblxuLnRyeW9uLXN0ZXAtc3VidGl0bGUge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiB2YXIoLS10cnlvbi10ZXh0LWxpZ2h0KTtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbn1cblxuLnRyeW9uLXN0ZXAtcHJvZ3Jlc3Mge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDhweDtcbn1cblxuLnRyeW9uLXN0ZXAtZG90IHtcbiAgd2lkdGg6IDhweDtcbiAgaGVpZ2h0OiA4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdHJ5b24tYm9yZGVyKTtcbiAgdHJhbnNpdGlvbjogdmFyKC0tdHJ5b24tdHJhbnNpdGlvbik7XG59XG5cbi50cnlvbi1zdGVwLWRvdC5hY3RpdmUge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10cnlvbi1wcmltYXJ5KTtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjIpO1xufVxuXG4udHJ5b24tc3RlcC1kb3QuY29tcGxldGVkIHtcbiAgYmFja2dyb3VuZDogdmFyKC0tdHJ5b24tcHJpbWFyeSk7XG59XG5cbi50cnlvbi1zdGVwLW5hdmlnYXRpb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDEycHg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gIG1hcmdpbi10b3A6IDI0cHg7XG4gIHBhZGRpbmctdG9wOiAxNnB4O1xuICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tdHJ5b24tYm9yZGVyKTtcbn1cblxuLnRyeW9uLXN0ZXAtbmF2aWdhdGlvbiAudHJ5b24tYnRuLXNlY29uZGFyeSB7XG4gIGZsZXg6IDE7XG59XG5cbi50cnlvbi1zdGVwLW5hdmlnYXRpb24gLnRyeW9uLWJ0bi1wcmltYXJ5IHtcbiAgZmxleDogMTtcbn1cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgTWFpbiBVSVxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4udHJ5b24tbWFpbi11aSB7XG4gIGFuaW1hdGlvbjogdHJ5b24tZmFkZS1pbiAwLjNzIGVhc2Utb3V0O1xufVxuXG4udHJ5b24tbWFpbi1oZWFkZXIge1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi50cnlvbi1tYWluLWhlYWRlciBoMiB7XG4gIG1hcmdpbjogMCAwIDhweDtcbiAgZm9udC1zaXplOiAyMnB4O1xuICBjb2xvcjogdmFyKC0tdHJ5b24tdGV4dCk7XG59XG5cbi50cnlvbi1tYWluLWhlYWRlciBwIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiB2YXIoLS10cnlvbi10ZXh0LWxpZ2h0KTtcbn1cblxuLnRyeW9uLXNlY3Rpb24ge1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xufVxuXG4udHJ5b24tc2VjdGlvbiBoMyB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbWFyZ2luOiAwIDAgMTJweDtcbiAgY29sb3I6IHZhcigtLXRyeW9uLXRleHQpO1xufVxuXG4udHJ5b24tY2xvdGhlcy1ncmlkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcbiAgZ2FwOiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG4udHJ5b24tY2xvdGhlcy1ncmlkLW1haW4ge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xuICBnYXA6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG5cbi50cnlvbi1jbG90aGVzLXNsb3QsXG4udHJ5b24tY2xvdGhlcy1zbG90LW1haW4ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGFzcGVjdC1yYXRpbzogMTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgYmFja2dyb3VuZDogcmdiYSg5MiwgMTc0LCAyNTUsIDAuMDUpO1xufVxuXG4udHJ5b24tY2xvdGhlcy1wcmV2aWV3LFxuLnRyeW9uLWNsb3RoZXMtcHJldmlldy1tYWluIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBpbnNldDogMDtcbiAgZGlzcGxheTogbm9uZTtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHJnYmEoOTIsIDE3NCwgMjU1LCAwLjEpIDAlLCByZ2JhKDc0LCAxNDQsIDIyNiwgMC4xKSAxMDAlKTtcbn1cblxuLnRyeW9uLWNsb3RoZXMtcHJldmlldy5oYXMtaW1hZ2UsXG4udHJ5b24tY2xvdGhlcy1wcmV2aWV3LW1haW4uaGFzLWltYWdlIHtcbiAgZGlzcGxheTogZmxleDtcbn1cblxuLnRyeW9uLWNsb3RoZXMtcHJldmlldyBpbWcsXG4udHJ5b24tY2xvdGhlcy1wcmV2aWV3LW1haW4gaW1nIHtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBtYXgtaGVpZ2h0OiAxMDAlO1xuICBvYmplY3QtZml0OiBjb250YWluO1xufVxuXG4udHJ5b24tc2VjdGlvbi1nZW5lcmF0ZSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnRyeW9uLWJ0bi1nZW5lcmF0ZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBtaW4taGVpZ2h0OiA0OHB4O1xuICBmb250LXNpemU6IDE2cHg7XG59XG5cbi50cnlvbi1zcGlubmVyIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogMTZweDtcbiAgaGVpZ2h0OiAxNnB4O1xuICBib3JkZXI6IDJweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMyk7XG4gIGJvcmRlci10b3AtY29sb3I6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGFuaW1hdGlvbjogc3BpbiAwLjhzIGxpbmVhciBpbmZpbml0ZTtcbn1cblxuQGtleWZyYW1lcyBzcGluIHtcbiAgdG8geyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XG59XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIEltYWdlIFJlc3VsdFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4udHJ5b24taW1hZ2UtcmVzdWx0LWNvbnRhaW5lciB7XG4gIGFuaW1hdGlvbjogdHJ5b24tZmFkZS1pbiAwLjNzIGVhc2Utb3V0O1xufVxuXG4udHJ5b24taW1hZ2Utd3JhcHBlciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDEwMCU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gIGN1cnNvcjogY3Jvc3NoYWlyO1xufVxuXG4udHJ5b24tcmVzdWx0LWltYWdlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG59XG5cbi50cnlvbi1tYWduaWZpZXItbGVucyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDEwMHB4O1xuICBoZWlnaHQ6IDEwMHB4O1xuICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS10cnlvbi1wcmltYXJ5KTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgYm94LXNoYWRvdzogMCAwIDAgM3B4IHZhcigtLXRyeW9uLXByaW1hcnkpLCBpbnNldCAwIDAgM3B4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHotaW5kZXg6IDEwO1xufVxuXG4udHJ5b24tbWFnbmlmaWVyLXZpZXcge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMjBweDtcbiAgcmlnaHQ6IDIwcHg7XG4gIHdpZHRoOiAxNTBweDtcbiAgaGVpZ2h0OiAxNTBweDtcbiAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tdHJ5b24tcHJpbWFyeSk7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGRpc3BsYXk6IG5vbmU7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3gtc2hhZG93OiB2YXIoLS10cnlvbi1zaGFkb3cpO1xuICB6LWluZGV4OiAxMTtcbn1cblxuLnRyeW9uLW1hZ25pZmllci12aWV3IGltZyB7XG4gIHdpZHRoOiAyMDAlO1xuICBoZWlnaHQ6IDIwMCU7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xufVxuXG4udHJ5b24tYnRuLWRvd25sb2FkLXJlc3VsdCB7XG4gIHdpZHRoOiAxMDAlO1xuICBtaW4taGVpZ2h0OiA0NHB4O1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICBBbmltYXRpb25zXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbkBrZXlmcmFtZXMgdHJ5b24tZmFkZS1pbiB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbiAgdG8ge1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cblxuQGtleWZyYW1lcyB0cnlvbi1zbGlkZS11cCB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDMwcHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICBSZXNwb25zaXZlXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbkBtZWRpYSAobWF4LXdpZHRoOiA2NDBweCkge1xuICAudHJ5b24tbW9kYWwtd3JhcHBlciB7XG4gICAgd2lkdGg6IDk1JTtcbiAgICBtYXgtaGVpZ2h0OiA5MHZoO1xuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIH1cblxuICAudHJ5b24tbW9kYWwtY29udGVudCB7XG4gICAgcGFkZGluZzogMjRweCAxNnB4O1xuICB9XG5cbiAgLnRyeW9uLWNsb3RoZXMtZ3JpZCxcbiAgLnRyeW9uLWNsb3RoZXMtZ3JpZC1tYWluIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xuICAgIGdhcDogMTBweDtcbiAgfVxuXG4gIC50cnlvbi1zdGVwLXRpdGxlIHtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gIH1cblxuICAudHJ5b24tYnRuLWZsb2F0aW5nIHtcbiAgICBib3R0b206IDE2cHg7XG4gICAgcmlnaHQ6IDE2cHg7XG4gICAgd2lkdGg6IDUycHg7XG4gICAgaGVpZ2h0OiA1MnB4O1xuICB9XG5cbiAgLnRyeW9uLW1hZ25pZmllci12aWV3IHtcbiAgICB3aWR0aDogMTIwcHg7XG4gICAgaGVpZ2h0OiAxMjBweDtcbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNDAwcHgpIHtcbiAgLnRyeW9uLW1vZGFsLXdyYXBwZXIge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1heC1oZWlnaHQ6IDEwMHZoO1xuICAgIGJvcmRlci1yYWRpdXM6IDIwcHggMjBweCAwIDA7XG4gICAgbWF4LWhlaWdodDogY2FsYygxMDBkdmggLSAxMHB4KTtcbiAgfVxuXG4gIC50cnlvbi1tb2RhbC1jb250ZW50IHtcbiAgICBwYWRkaW5nOiAyMHB4IDEycHg7XG4gIH1cblxuICAudHJ5b24tYnRuLWZsb2F0aW5nIHtcbiAgICB3aWR0aDogNDhweDtcbiAgICBoZWlnaHQ6IDQ4cHg7XG4gIH1cbn1cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgQWNjZXNzaWJpbGl0eVxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4udHJ5b24tYnRuLXByaW1hcnk6Zm9jdXMtdmlzaWJsZSxcbi50cnlvbi1idG4tc2Vjb25kYXJ5OmZvY3VzLXZpc2libGUsXG4udHJ5b24tYnRuLWZsb2F0aW5nOmZvY3VzLXZpc2libGUge1xuICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdHJ5b24tcHJpbWFyeSk7XG4gIG91dGxpbmUtb2Zmc2V0OiAycHg7XG59XG5cbkBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XG4gIC50cnlvbi13aWRnZXQtcm9vdCAqIHtcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDAuMDFtcyAhaW1wb3J0YW50O1xuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IDEgIWltcG9ydGFudDtcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjAxbXMgIWltcG9ydGFudDtcbiAgfVxufVxuICBgO1xufVxuIiwgIi8qKlxuICogTWFpbiBXaWRnZXQgTW9kdWxlXG4gKiBIYW5kbGVzIHdpZGdldCBpbml0aWFsaXphdGlvbiwgRE9NIGNyZWF0aW9uLCBhbmQgbGlmZWN5Y2xlXG4gKi9cblxuaW1wb3J0IHsgY3JlYXRlQnV0dG9uIH0gZnJvbSAnLi9jb21wb25lbnRzL2J1dHRvbi5qcyc7XG5pbXBvcnQgeyBjcmVhdGVNb2RhbCB9IGZyb20gJy4vY29tcG9uZW50cy9tb2RhbC5qcyc7XG5pbXBvcnQgeyBpbmplY3RTdHlsZXMgfSBmcm9tICcuL3N0eWxlcy9pbmRleC5qcyc7XG5cbmxldCB3aWRnZXRJbnN0YW5jZSA9IG51bGw7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXaWRnZXQoKSB7XG4gIC8vIFByZXZlbnQgbXVsdGlwbGUgaW5zdGFuY2VzXG4gIGlmICh3aWRnZXRJbnN0YW5jZSkgcmV0dXJuIHdpZGdldEluc3RhbmNlO1xuXG4gIC8vIEluamVjdCBzY29wZWQgc3R5bGVzXG4gIGluamVjdFN0eWxlcygpO1xuXG4gIC8vIENyZWF0ZSB3aWRnZXQgY29udGFpbmVyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb250YWluZXIuaWQgPSAndHJ5b24td2lkZ2V0LWNvbnRhaW5lcic7XG4gIGNvbnRhaW5lci5jbGFzc05hbWUgPSAndHJ5b24td2lkZ2V0LXJvb3QnO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG5cbiAgLy8gQ3JlYXRlIGFuZCBpbmplY3QgZmxvYXRpbmcgYnV0dG9uXG4gIGNvbnN0IGJ1dHRvbiA9IGNyZWF0ZUJ1dHRvbigoKSA9PiB7XG4gICAgbW9kYWwub3BlbigpO1xuICB9KTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbik7XG5cbiAgLy8gQ3JlYXRlIG1vZGFsXG4gIGNvbnN0IG1vZGFsID0gY3JlYXRlTW9kYWwoKCkgPT4ge1xuICAgIC8vIE9uIGNsb3NlIGNhbGxiYWNrXG4gIH0pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQobW9kYWwpO1xuXG4gIHdpZGdldEluc3RhbmNlID0ge1xuICAgIGNvbnRhaW5lcixcbiAgICBidXR0b24sXG4gICAgbW9kYWwsXG4gICAgZGVzdHJveTogKCkgPT4ge1xuICAgICAgY29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgd2lkZ2V0SW5zdGFuY2UgPSBudWxsO1xuICAgIH0sXG4gIH07XG5cbiAgcmV0dXJuIHdpZGdldEluc3RhbmNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2lkZ2V0SW5zdGFuY2UoKSB7XG4gIHJldHVybiB3aWRnZXRJbnN0YW5jZTtcbn1cbiIsICIvKipcbiAqIFRyeW9uIFdpZGdldCAtIEVtYmVkZGFibGUgd2lkZ2V0IGZvciB0cnktb24gaW1hZ2UgZ2VuZXJhdGlvblxuICogRW50cnkgcG9pbnQgdGhhdCBpbml0aWFsaXplcyB0aGUgd2lkZ2V0XG4gKi9cblxuaW1wb3J0IHsgY3JlYXRlV2lkZ2V0IH0gZnJvbSAnLi93aWRnZXQuanMnO1xuXG4vLyBHZXQgY29uZmlndXJhdGlvbiBmcm9tIHNjcmlwdCB0YWdcbmZ1bmN0aW9uIGdldFdpZGdldENvbmZpZygpIHtcbiAgY29uc3Qgc2NyaXB0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdCcpO1xuICBsZXQgc2NyaXB0RWxlbWVudCA9IG51bGw7XG5cbiAgZm9yIChjb25zdCBzY3JpcHQgb2Ygc2NyaXB0cykge1xuICAgIGlmIChzY3JpcHQuc3JjICYmIHNjcmlwdC5zcmMuaW5jbHVkZXMoJ3dpZGdldC5qcycpKSB7XG4gICAgICBzY3JpcHRFbGVtZW50ID0gc2NyaXB0O1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFzY3JpcHRFbGVtZW50KSB7XG4gICAgY29uc29sZS5lcnJvcignW1RyeW9uIFdpZGdldF0gQ291bGQgbm90IGZpbmQgd2lkZ2V0IHNjcmlwdCB0YWcnKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGFwaUtleSA9IHNjcmlwdEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRyeW9uLWtleScpO1xuICBjb25zdCBhcGlVcmwgPSBzY3JpcHRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10cnlvbi11cmwnKSB8fCAnaHR0cHM6Ly90cnlvbi1iYWNrZW5kLnZlcmNlbC5hcHAnO1xuXG4gIGlmICghYXBpS2V5KSB7XG4gICAgY29uc29sZS5lcnJvcignW1RyeW9uIFdpZGdldF0gTWlzc2luZyByZXF1aXJlZCBhdHRyaWJ1dGU6IGRhdGEtdHJ5b24ta2V5Jyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBTdG9yZSBjb25maWcgaW4gd2luZG93IGZvciBhY2Nlc3MgYnkgb3RoZXIgbW9kdWxlc1xuICB3aW5kb3cuVFJZT05fV0lER0VUX0NPTkZJRyA9IHtcbiAgICBhcGlLZXksXG4gICAgYXBpVXJsLFxuICAgIHNjcmlwdEVsZW1lbnQsXG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBhcGlLZXksXG4gICAgYXBpVXJsLFxuICB9O1xufVxuXG4vLyBJbml0aWFsaXplIHRoZSB3aWRnZXQgd2hlbiBET00gaXMgcmVhZHlcbmZ1bmN0aW9uIGluaXRpYWxpemVXaWRnZXQoKSB7XG4gIGNvbnN0IGNvbmZpZyA9IGdldFdpZGdldENvbmZpZygpO1xuXG4gIGlmICghY29uZmlnKSB7XG4gICAgY29uc29sZS53YXJuKCdbVHJ5b24gV2lkZ2V0XSBXaWRnZXQgaW5pdGlhbGl6YXRpb24gY2FuY2VsbGVkIGR1ZSB0byBtaXNzaW5nIGNvbmZpZ3VyYXRpb24nKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjcmVhdGVXaWRnZXQoKTtcbn1cblxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5pdGlhbGl6ZVdpZGdldCk7XG59IGVsc2Uge1xuICBpbml0aWFsaXplV2lkZ2V0KCk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAibUJBSU8sU0FBU0EsRUFBYUMsRUFBaUIsQ0FDNUMsSUFBTUMsRUFBUyxTQUFTLGNBQWMsUUFBUSxFQUM5QyxPQUFBQSxFQUFPLEdBQUssd0JBQ1pBLEVBQU8sVUFBWSxxQkFDbkJBLEVBQU8sYUFBYSxhQUFjLG1CQUFtQixFQUNyREEsRUFBTyxNQUFRLGlDQUdmQSxFQUFPLFVBQVk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBVW5CQSxFQUFPLGlCQUFpQixRQUFTLElBQU0sQ0FDckNELEVBQWdCLENBQ2xCLENBQUMsRUFFTUMsQ0FDVCxDQ3RCTyxTQUFTQyxFQUFvQkMsRUFBT0MsRUFBYUMsRUFBYyxDQUNwRSxJQUFNQyxFQUFZLFNBQVMsY0FBYyxLQUFLLEVBQzlDQSxFQUFVLFVBQVksdUJBR3RCLElBQU1DLEVBQVksU0FBUyxjQUFjLEtBQUssRUFDOUNBLEVBQVUsVUFBWSxrQkFHdEIsSUFBTUMsRUFBYyxTQUFTLGNBQWMsS0FBSyxFQUNoREEsRUFBWSxVQUFZLHFCQUd4QixJQUFNQyxFQUFnQixTQUFTLGNBQWMsS0FBSyxFQUNsREEsRUFBYyxVQUFZLHVCQUUxQixJQUFNQyxFQUFPUCxFQUFNQyxDQUFXLEVBQzlCSyxFQUFjLFVBQVk7QUFBQSxvQ0FDUUMsRUFBSyxLQUFLO0FBQUEsdUNBQ1BBLEVBQUssUUFBUTtBQUFBO0FBQUEsUUFFNUNQLEVBQU0sSUFBSSxDQUFDUSxFQUFHQyxJQUFNO0FBQUEscUNBQ1NBLElBQU1SLEVBQWMsU0FBVyxFQUFFLElBQUlRLEVBQUlSLEVBQWMsWUFBYyxFQUFFO0FBQUEsT0FDckcsRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUFBO0FBQUEsSUFLZkksRUFBWSxZQUFZQyxDQUFhLEVBQ3JDRCxFQUFZLFlBQVlFLEVBQUssU0FBUyxFQUd0QyxJQUFNRyxFQUFh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O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBb21CVCxDQzltQkEsSUFBSUMsRUFBaUIsS0FFZCxTQUFTQyxHQUFlLENBRTdCLEdBQUlELEVBQWdCLE9BQU9BLEVBRzNCRSxFQUFhLEVBR2IsSUFBTUMsRUFBWSxTQUFTLGNBQWMsS0FBSyxFQUM5Q0EsRUFBVSxHQUFLLHlCQUNmQSxFQUFVLFVBQVksb0JBQ3RCLFNBQVMsS0FBSyxZQUFZQSxDQUFTLEVBR25DLElBQU1DLEVBQVNDLEVBQWEsSUFBTSxDQUNoQ0MsRUFBTSxLQUFLLENBQ2IsQ0FBQyxFQUNESCxFQUFVLFlBQVlDLENBQU0sRUFHNUIsSUFBTUUsRUFBUUMsRUFBWSxJQUFNLENBRWhDLENBQUMsRUFDRCxPQUFBSixFQUFVLFlBQVlHLENBQUssRUFFM0JOLEVBQWlCLENBQ2YsVUFBQUcsRUFDQSxPQUFBQyxFQUNBLE1BQUFFLEVBQ0EsUUFBUyxJQUFNLENBQ2JILEVBQVUsT0FBTyxFQUNqQkgsRUFBaUIsSUFDbkIsQ0FDRixFQUVPQSxDQUNULENDdkNBLFNBQVNRLEdBQWtCLENBQ3pCLElBQU1DLEVBQVUsU0FBUyxpQkFBaUIsUUFBUSxFQUM5Q0MsRUFBZ0IsS0FFcEIsUUFBV0MsS0FBVUYsRUFDbkIsR0FBSUUsRUFBTyxLQUFPQSxFQUFPLElBQUksU0FBUyxXQUFXLEVBQUcsQ0FDbERELEVBQWdCQyxFQUNoQixLQUNGLENBR0YsR0FBSSxDQUFDRCxFQUNILGVBQVEsTUFBTSxpREFBaUQsRUFDeEQsS0FHVCxJQUFNRSxFQUFTRixFQUFjLGFBQWEsZ0JBQWdCLEVBQ3BERyxFQUFTSCxFQUFjLGFBQWEsZ0JBQWdCLEdBQUssbUNBRS9ELE9BQUtFLEdBTUwsT0FBTyxvQkFBc0IsQ0FDM0IsT0FBQUEsRUFDQSxPQUFBQyxFQUNBLGNBQUFILENBQ0YsRUFFTyxDQUNMLE9BQUFFLEVBQ0EsT0FBQUMsQ0FDRixJQWRFLFFBQVEsTUFBTSwyREFBMkQsRUFDbEUsS0FjWCxDQUdBLFNBQVNDLEdBQW1CLENBRzFCLEdBQUksQ0FGV04sRUFBZ0IsRUFFbEIsQ0FDWCxRQUFRLEtBQUssNkVBQTZFLEVBQzFGLE1BQ0YsQ0FFQU8sRUFBYSxDQUNmLENBRUksU0FBUyxhQUFlLFVBQzFCLFNBQVMsaUJBQWlCLG1CQUFvQkQsQ0FBZ0IsRUFFOURBLEVBQWlCIiwKICAibmFtZXMiOiBbImNyZWF0ZUJ1dHRvbiIsICJvbkNsaWNrQ2FsbGJhY2siLCAiYnV0dG9uIiwgImNyZWF0ZVN0ZXBDb250YWluZXIiLCAic3RlcHMiLCAiY3VycmVudFN0ZXAiLCAib25TdGVwQ2hhbmdlIiwgImNvbnRhaW5lciIsICJzcG90bGlnaHQiLCAic3RlcENvbnRlbnQiLCAic3RlcEluZGljYXRvciIsICJzdGVwIiwgIl8iLCAiaSIsICJuYXZpZ2F0aW9uIiwgInByZXZCdG4iLCAibmV4dEJ0biIsICJjcmVhdGVEcm9wem9uZSIsICJ0aXRsZSIsICJwbGFjZWhvbGRlciIsICJvbkZpbGVTZWxlY3RlZCIsICJhY2NlcHRlZFR5cGVzIiwgImNvbXBhY3QiLCAiY29udGFpbmVyIiwgImlucHV0IiwgImRyb3BBcmVhIiwgInJlYWRGaWxlIiwgImZpbGUiLCAicmVhZGVyIiwgImUiLCAiYmFzZTY0IiwgIlNUT1JBR0VfUFJFRklYIiwgImhhc1NlZW5PbmJvYXJkaW5nIiwgInNldE9uYm9hcmRpbmdTZWVuIiwgInNlZW4iLCAic3RvcmVVc2VyUGhvdG8iLCAiYmFzZTY0IiwgImdldFVzZXJQaG90byIsICJzdG9yZUNsb3RoZXMiLCAiaW5kZXgiLCAiYmFzZTY0IiwgImNsb3RoZXMiLCAiU1RPUkFHRV9QUkVGSVgiLCAiZ2V0Q2xvdGhlcyIsICJzdG9yZUdlbmVyYXRlZEltYWdlIiwgInVybCIsICJTVE9SQUdFX1BSRUZJWCIsICJnZXRHZW5lcmF0ZWRJbWFnZSIsICJjcmVhdGVVc2VyUGhvdG9TdGVwIiwgImNvbnRhaW5lciIsICJkcm9wem9uZSIsICJjcmVhdGVEcm9wem9uZSIsICJpbWFnZURhdGEiLCAic3RvcmVVc2VyUGhvdG8iLCAicHJldmlldyIsICJ1c2VyUGhvdG8iLCAiZ2V0VXNlclBob3RvIiwgImNyZWF0ZUNsb3RoZXNTdGVwIiwgImNvbnRhaW5lciIsICJjbG90aGVzQ29udGFpbmVyIiwgImNsb3RoZXNDb3VudCIsICJjbG90aGVzIiwgImdldENsb3RoZXMiLCAiaSIsICJzbG90IiwgImRyb3B6b25lIiwgImNyZWF0ZURyb3B6b25lIiwgImltYWdlRGF0YSIsICJzdG9yZUNsb3RoZXMiLCAicHJldmlldyIsICJjcmVhdGVHZW5lcmF0ZVN0ZXAiLCAiY29udGFpbmVyIiwgImNyZWF0ZVJlc3VsdFN0ZXAiLCAiY29udGFpbmVyIiwgImdlbmVyYXRlZEltYWdlIiwgImdldEdlbmVyYXRlZEltYWdlIiwgImRvd25sb2FkQnRuIiwgInRyeUFnYWluQnRuIiwgImxpbmsiLCAiY3JlYXRlT25ib2FyZGluZyIsICJvbkNvbXBsZXRlQ2FsbGJhY2siLCAiY29udGFpbmVyIiwgInN0ZXBzIiwgImNyZWF0ZVVzZXJQaG90b1N0ZXAiLCAiY3JlYXRlQ2xvdGhlc1N0ZXAiLCAiY3JlYXRlR2VuZXJhdGVTdGVwIiwgImNyZWF0ZVJlc3VsdFN0ZXAiLCAiY3VycmVudFN0ZXAiLCAic3RlcENvbnRhaW5lciIsICJjcmVhdGVTdGVwQ29udGFpbmVyIiwgInN0ZXBJbmRleCIsICJyZW5kZXJTdGVwIiwgInN0ZXAiLCAibmV3U3RlcENvbnRhaW5lciIsICJjb21wbGV0ZUJ0biIsICJjcmVhdGVJbWFnZVJlc3VsdCIsICJpbWFnZVVybCIsICJjb250YWluZXIiLCAiaW1hZ2VXcmFwcGVyIiwgImltZyIsICJsZW5zIiwgIm1hZ25pZmllclZpZXciLCAiaXNIb3ZlcmluZyIsICJlIiwgInJlY3QiLCAieCIsICJ5IiwgInNjYWxlIiwgImRvd25sb2FkQnRuIiwgImxpbmsiLCAiZ2V0QXBpQ29uZmlnIiwgImNvbmZpZyIsICJnZW5lcmF0ZVRyeU9uIiwgInVzZXJJbWFnZUJhc2U2NCIsICJjbG90aGVzSW1hZ2VzQmFzZTY0QXJyYXkiLCAiY2xvdGhlcyIsICJjIiwgInJlc3BvbnNlIiwgImVycm9yRGF0YSIsICJkYXRhIiwgImVycm9yIiwgImNyZWF0ZU1haW5VSSIsICJjb250YWluZXIiLCAiaGVhZGVyIiwgInVzZXJQaG90b1NlY3Rpb24iLCAidXNlclBob3RvRHJvcHpvbmUiLCAiY3JlYXRlRHJvcHpvbmUiLCAiaW1hZ2VEYXRhIiwgInN0b3JlVXNlclBob3RvIiwgImNsb3RoZXNTZWN0aW9uIiwgImNsb3RoZXNHcmlkIiwgImNsb3RoZXMiLCAiZ2V0Q2xvdGhlcyIsICJpIiwgInNsb3QiLCAiZHJvcHpvbmUiLCAic3RvcmVDbG90aGVzIiwgInByZXZpZXciLCAiZ2VuZXJhdGVTZWN0aW9uIiwgImdlbmVyYXRlQnRuIiwgImhhbmRsZUdlbmVyYXRlIiwgInJlc3VsdFNlY3Rpb24iLCAidXBkYXRlVUkiLCAidXNlclBob3RvIiwgImMiLCAicmVzdWx0IiwgImdlbmVyYXRlVHJ5T24iLCAic3RvcmVHZW5lcmF0ZWRJbWFnZSIsICJyZXN1bHRDb250YWluZXIiLCAiY3JlYXRlSW1hZ2VSZXN1bHQiLCAiZXJyb3IiLCAiY3JlYXRlTW9kYWwiLCAib25DbG9zZUNhbGxiYWNrIiwgIm1vZGFsIiwgImJhY2tkcm9wIiwgImNvbnRlbnRXcmFwcGVyIiwgImNsb3NlQnRuIiwgImNvbnRlbnQiLCAiaXNPcGVuIiwgImN1cnJlbnRWaWV3IiwgImxvYWRWaWV3IiwgIm9uYm9hcmRpbmciLCAiY3JlYXRlT25ib2FyZGluZyIsICJzZXRPbmJvYXJkaW5nU2VlbiIsICJtYWluVUkiLCAiY3JlYXRlTWFpblVJIiwgIm9wZW4iLCAiaGFzU2Vlbk9uYm9hcmRpbmciLCAiY2xvc2UiLCAiaW5qZWN0U3R5bGVzIiwgInN0eWxlIiwgImdldFN0eWxlcyIsICJ3aWRnZXRJbnN0YW5jZSIsICJjcmVhdGVXaWRnZXQiLCAiaW5qZWN0U3R5bGVzIiwgImNvbnRhaW5lciIsICJidXR0b24iLCAiY3JlYXRlQnV0dG9uIiwgIm1vZGFsIiwgImNyZWF0ZU1vZGFsIiwgImdldFdpZGdldENvbmZpZyIsICJzY3JpcHRzIiwgInNjcmlwdEVsZW1lbnQiLCAic2NyaXB0IiwgImFwaUtleSIsICJhcGlVcmwiLCAiaW5pdGlhbGl6ZVdpZGdldCIsICJjcmVhdGVXaWRnZXQiXQp9Cg==
