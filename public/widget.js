"use strict";(()=>{var C=(o,r,n)=>new Promise((e,t)=>{var i=a=>{try{s(n.next(a))}catch(c){t(c)}},d=a=>{try{s(n.throw(a))}catch(c){t(c)}},s=a=>a.done?e(a.value):Promise.resolve(a.value).then(i,d);s((n=n.apply(o,r)).next())});function A(o){let r=document.createElement("button");r.id="tryon-floating-button",r.className="tryon-btn-floating",r.setAttribute("aria-label","Open Tryon Widget"),r.title="Try on clothes with your photo";let n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.setAttribute("width","24"),n.setAttribute("height","24"),n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2");let e=document.createElementNS("http://www.w3.org/2000/svg","circle");e.setAttribute("cx","12"),e.setAttribute("cy","12"),e.setAttribute("r","1");let t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","M12 1v6m0 6v6");let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d","M4.22 4.22l4.24 4.24m0 5.08l4.24 4.24");let d=document.createElementNS("http://www.w3.org/2000/svg","path");d.setAttribute("d","M19.78 4.22l-4.24 4.24m0 5.08l-4.24 4.24"),n.appendChild(e),n.appendChild(t),n.appendChild(i),n.appendChild(d);let s=document.createElement("span");return s.className="tryon-tooltip",s.textContent="Try on now",r.appendChild(n),r.appendChild(s),r.addEventListener("click",()=>{o()}),r}function z(o,r,n){let e=document.createElement("div");e.className="tryon-step-container";let t=document.createElement("div");t.className="tryon-spotlight";let i=document.createElement("div");i.className="tryon-step-content";let d=document.createElement("div");d.className="tryon-step-indicator";let s=o[r],a=document.createElement("div");a.className="tryon-step-title",a.textContent=s.title;let c=document.createElement("div");c.className="tryon-step-subtitle",c.textContent=s.subtitle;let l=document.createElement("div");l.className="tryon-step-progress",o.forEach((p,g)=>{let w=document.createElement("div");w.className="tryon-step-dot",g===r&&w.classList.add("active"),g<r&&w.classList.add("completed"),l.appendChild(w)}),d.appendChild(a),d.appendChild(c),d.appendChild(l),i.appendChild(d),i.appendChild(s.component);let m=document.createElement("div");if(m.className="tryon-step-navigation",r>0){let p=document.createElement("button");p.className="tryon-btn-secondary",p.textContent="Back",p.addEventListener("click",()=>n(r-1)),m.appendChild(p)}if(r<o.length-1){let p=document.createElement("button");p.className="tryon-btn-primary",p.textContent="Next",p.addEventListener("click",()=>n(r+1)),m.appendChild(p)}return e.appendChild(t),e.appendChild(i),e.appendChild(m),e}function O(o,r,n="2"){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("width",o),e.setAttribute("height",r),e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width",n),e}function I(o,r,n="2"){let e=O(o,r,n),t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","12"),t.setAttribute("y1","5"),t.setAttribute("x2","12"),t.setAttribute("y2","19");let i=document.createElementNS("http://www.w3.org/2000/svg","line");return i.setAttribute("x1","5"),i.setAttribute("y1","12"),i.setAttribute("x2","19"),i.setAttribute("y2","12"),e.appendChild(t),e.appendChild(i),e}function K(){let o=O("32","32","2"),r=document.createElementNS("http://www.w3.org/2000/svg","path");r.setAttribute("d","M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4");let n=document.createElementNS("http://www.w3.org/2000/svg","polyline");n.setAttribute("points","17 8 12 3 7 8");let e=document.createElementNS("http://www.w3.org/2000/svg","line");return e.setAttribute("x1","12"),e.setAttribute("y1","3"),e.setAttribute("x2","12"),e.setAttribute("y2","15"),o.appendChild(r),o.appendChild(n),o.appendChild(e),o}function v(o,r,n,e=["image/*"],t=!1,i=!1){let d=document.createElement("div");d.className=`tryon-dropzone ${t?"compact":""} ${i?"large":""}`;let s=document.createElement("input");s.type="file",s.accept=e.join(","),s.style.display="none";let a=document.createElement("div");if(a.className="tryon-dropzone-area",i){let l=document.createElement("div");l.className="tryon-dropzone-icon-large",l.appendChild(I("64","64","1.5"));let m=document.createElement("div");m.className="tryon-dropzone-text";let p=document.createElement("div");p.className="tryon-dropzone-placeholder-large",p.textContent=r,m.appendChild(p),a.appendChild(l),a.appendChild(m)}else if(t){let l=document.createElement("div");l.className="tryon-dropzone-icon-compact",l.appendChild(I("32","32","2")),a.appendChild(l)}else{let l=document.createElement("div");l.className="tryon-dropzone-icon",l.appendChild(K());let m=document.createElement("div");m.className="tryon-dropzone-text";let p=document.createElement("div");p.className="tryon-dropzone-title",p.textContent=o;let g=document.createElement("div");g.className="tryon-dropzone-placeholder",g.textContent=r,m.appendChild(p),m.appendChild(g),a.appendChild(l),a.appendChild(m)}function c(l){if(!l)return;if(!e.includes(l.type)&&!e.includes("image/*")){alert("Invalid file type");return}let m=new FileReader;m.onload=p=>{let g=p.target.result;n(g)},m.readAsDataURL(l)}return a.addEventListener("click",()=>s.click()),s.addEventListener("change",l=>{var m;c((m=l.target.files)==null?void 0:m[0])}),a.addEventListener("dragover",l=>{l.preventDefault(),a.classList.add("dragover")}),a.addEventListener("dragleave",()=>{a.classList.remove("dragover")}),a.addEventListener("drop",l=>{var m,p;l.preventDefault(),a.classList.remove("dragover"),c((p=(m=l.dataTransfer)==null?void 0:m.files)==null?void 0:p[0])}),d.appendChild(s),d.appendChild(a),d}var y="tryon-widget";function T(){return localStorage.getItem(`${y}-onboarding-seen`)==="true"}function L(o){localStorage.setItem(`${y}-onboarding-seen`,o?"true":"false")}function N(o){localStorage.setItem(`${y}-user-photo`,o)}function B(){return localStorage.getItem(`${y}-user-photo`)}function k(o,r){let n=JSON.parse(localStorage.getItem(`${y}-clothes`)||"[]");n[o]=r,localStorage.setItem(`${y}-clothes`,JSON.stringify(n))}function S(){return JSON.parse(localStorage.getItem(`${y}-clothes`)||"[]")}function P(o){localStorage.setItem(`${y}-generated-image`,o)}function j(){return localStorage.getItem(`${y}-generated-image`)}function D(){let o=document.createElement("div");o.className="tryon-step-user-photo";let r=v("Upload your photo","Drag your photo here or click to select",e=>{N(e);let t=o.querySelector(".tryon-photo-preview");if(t){for(;t.firstChild;)t.removeChild(t.firstChild);let i=document.createElement("img");i.src=e,i.alt="Your photo",t.appendChild(i),t.classList.add("has-image")}},["image/jpeg","image/png","image/webp"]);o.appendChild(r);let n=B();if(n){let e=document.createElement("div");e.className="tryon-photo-preview has-image";let t=document.createElement("img");t.src=n,t.alt="Your photo",e.appendChild(t),o.appendChild(e)}return o}function U(){let o=document.createElement("div");o.className="tryon-step-clothes";let r=document.createElement("div");r.className="tryon-clothes-grid";let n=4,e=S();for(let t=0;t<n;t++){let i=document.createElement("div");i.className="tryon-clothes-slot",i.dataset.index=t;let d=v(`Clothing ${t+1}`,"Drag image",s=>{k(t,s);let a=i.querySelector(".tryon-clothes-preview");if(a){for(;a.firstChild;)a.removeChild(a.firstChild);let c=document.createElement("img");c.src=s,c.alt=`Clothing item ${t+1}`,a.appendChild(c),a.classList.add("has-image")}},["image/jpeg","image/png","image/webp"],!0);if(i.appendChild(d),e[t]){let s=document.createElement("div");s.className="tryon-clothes-preview has-image";let a=document.createElement("img");a.src=e[t],a.alt=`Clothing item ${t+1}`,s.appendChild(a),i.appendChild(s)}r.appendChild(i)}return o.appendChild(r),o}function G(){let o=document.createElement("div");o.className="tryon-step-generate";let r=document.createElement("div");r.className="tryon-generate-info";let n=document.createElement("div");n.className="tryon-icon-large";let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("width","48"),e.setAttribute("height","48"),e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2");let t=document.createElementNS("http://www.w3.org/2000/svg","circle");t.setAttribute("cx","12"),t.setAttribute("cy","12"),t.setAttribute("r","1");let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d","M12 1v6m0 6v6");let d=document.createElementNS("http://www.w3.org/2000/svg","path");d.setAttribute("d","M4.22 4.22l4.24 4.24m0 5.08l4.24 4.24");let s=document.createElementNS("http://www.w3.org/2000/svg","path");s.setAttribute("d","M19.78 4.22l-4.24 4.24m0 5.08l-4.24 4.24"),e.appendChild(t),e.appendChild(i),e.appendChild(d),e.appendChild(s),n.appendChild(e);let a=document.createElement("h3");a.textContent="Ready to Generate!";let c=document.createElement("p");c.textContent='Click the "Try-on" button to create your virtual try-on image using AI.';let l=document.createElement("div");return l.className="tryon-feature-list",["\u2713 Fast generation (30 seconds)","\u2713 High-quality results","\u2713 Multiple clothing styles"].forEach(p=>{let g=document.createElement("div");g.className="tryon-feature",g.textContent=p,l.appendChild(g)}),r.appendChild(n),r.appendChild(a),r.appendChild(c),r.appendChild(l),o.appendChild(r),o}function R(){let o=document.createElement("div");o.className="tryon-step-result";let r=j();if(r){let n=document.createElement("div");n.className="tryon-result-image-container";let e=document.createElement("img");e.src=r,e.alt="Generated try-on",e.className="tryon-result-image";let t=document.createElement("div");t.className="tryon-result-overlay",t.textContent="Your Try-On Result!",n.appendChild(e),n.appendChild(t);let i=document.createElement("div");i.className="tryon-result-actions";let d=document.createElement("button");d.className="tryon-btn-primary tryon-btn-download",d.textContent="Download Image",d.addEventListener("click",()=>{let a=document.createElement("a");a.href=r,a.download="tryon-result.png",a.click()});let s=document.createElement("button");s.className="tryon-btn-secondary tryon-btn-try-again",s.textContent="Try Another",s.addEventListener("click",()=>{location.reload()}),i.appendChild(d),i.appendChild(s),o.appendChild(n),o.appendChild(i)}else{let n=document.createElement("div");n.className="tryon-result-placeholder";let e=document.createElement("p");e.textContent="No result yet. Generate an image first!",n.appendChild(e),o.appendChild(n)}return o}function $(o){let r=document.createElement("div");r.className="tryon-onboarding";let n=[{title:"Upload Your Photo",subtitle:"Show us what you look like",component:D(),index:0},{title:"Add Your Clothes",subtitle:"Drag up to 4 clothing items",component:U(),index:1},{title:"Generate Try-On",subtitle:"Create your virtual try-on",component:G(),index:2},{title:"See Your Result",subtitle:"Check out how you look",component:R(),index:3}],e=0,t=z(n,e,d=>{e=d,i()});r.appendChild(t);function i(){let d=n[e];t.style.opacity="0",setTimeout(()=>{for(;t.firstChild;)t.removeChild(t.firstChild);let s=z(n,e,a=>{e=a,i()});if(t.appendChild(s.firstChild),t.style.opacity="1",e===n.length-1){let a=document.createElement("button");a.className="tryon-btn-primary tryon-btn-onboarding-complete",a.textContent="Start Using Tryon!",a.addEventListener("click",o),t.appendChild(a)}},300)}return i(),r}function M(o){let r=document.createElement("div");r.className="tryon-image-result-container";let n=document.createElement("div");n.className="tryon-image-wrapper";let e=document.createElement("img");e.src=o,e.alt="Generated try-on result",e.className="tryon-result-image";let t=document.createElement("div");t.className="tryon-magnifier-lens";let i=document.createElement("div");i.className="tryon-magnifier-view";let d=document.createElement("img");d.src=o,d.alt="Magnified view",i.appendChild(d),n.appendChild(e),n.appendChild(t),r.appendChild(n),r.appendChild(i);let s=!1;n.addEventListener("mouseenter",()=>{s=!0,t.style.display="block",i.style.display="block"}),n.addEventListener("mouseleave",()=>{s=!1,t.style.display="none",i.style.display="none"}),n.addEventListener("mousemove",c=>{if(!s)return;let l=n.getBoundingClientRect(),m=c.clientX-l.left,p=c.clientY-l.top;t.style.left=m-50+"px",t.style.top=p-50+"px";let g=2;i.style.backgroundPosition=`-${m*g-150}px -${p*g-150}px`});let a=document.createElement("button");return a.className="tryon-btn-primary tryon-btn-download-result",a.textContent="Download Result",a.addEventListener("click",()=>{let c=document.createElement("a");c.href=o,c.download="tryon-result.png",c.click()}),r.appendChild(a),r}function H(){let o=window.TRYON_WIDGET_CONFIG;if(!o)throw new Error("Tryon Widget config not initialized");return o}function F(o,r){return C(this,null,function*(){let n=H(),e=r.filter(t=>t&&t.length>0);if(!o)throw new Error("User image is required");if(e.length===0)throw new Error("At least one clothing item is required");try{let t=yield fetch(`${n.apiUrl}/generate-widget`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userPhotoBase64:o,clothingBase64:e[0],apiKey:n.apiKey})});if(!t.ok){let d=yield t.json().catch(()=>({}));throw new Error(d.error||`API error: ${t.status}`)}let i=yield t.json();if(!i.success)throw new Error(i.error||"Generation failed");return{url:i.url,generationId:i.generationId}}catch(t){throw console.error("Try-on generation error:",t),t}})}function W(){let o=document.createElement("div");o.className="tryon-main-ui";let r=document.createElement("div");r.className="tryon-main-header";let n=document.createElement("div");n.className="tryon-logo-badge",n.textContent="TryOn Virtual",r.appendChild(n);let e=document.createElement("div");e.className="tryon-user-photo-section";let t=v("","Upload your Picture",u=>{N(u)},["image/jpeg","image/png","image/webp"],!1,!0);e.appendChild(t);let i=document.createElement("div");i.className="tryon-products-label",i.textContent="Drag the products";let d=document.createElement("div");d.className="tryon-clothes-grid-main";let s=S();for(let u=0;u<3;u++){let f=document.createElement("div");f.className="tryon-clothes-slot-main";let h=v("","",x=>{k(u,x)},["image/jpeg","image/png","image/webp"],!0,!1);if(f.appendChild(h),s[u]){let x=document.createElement("div");x.className="tryon-clothes-preview-main has-image";let b=document.createElement("img");b.src=s[u],b.alt=`Clothing ${u+1}`,x.appendChild(b),f.appendChild(x)}d.appendChild(f)}let a=document.createElement("button");a.className="tryon-btn-create",a.textContent="Create",a.id="tryon-generate-btn",a.addEventListener("click",()=>C(this,null,function*(){yield _()}));let c=document.createElement("div");c.className="tryon-footer";let l=document.createElement("span");l.className="tryon-footer-text",l.textContent="powered by TryOn.site";let m=document.createElement("div");m.className="tryon-footer-logo";let p=document.createElement("span");p.textContent="TryOn",m.appendChild(p),c.appendChild(l),c.appendChild(m);let g=document.createElement("div");g.className="tryon-section tryon-section-result",g.id="tryon-result-section",o.appendChild(r),o.appendChild(e),o.appendChild(i),o.appendChild(d),o.appendChild(a),o.appendChild(c),o.appendChild(g);function w(){}function _(){return C(this,null,function*(){let u=localStorage.getItem("tryon-user-photo"),f=JSON.parse(localStorage.getItem("tryon-clothes")||"[]");if(!u){alert("Please upload your photo first");return}if(f.filter(h=>h).length===0){alert("Please add at least one clothing item");return}try{a.disabled=!0,a.textContent="";let h=document.createElement("span");h.className="tryon-spinner",a.appendChild(h),a.appendChild(document.createTextNode(" Generating..."));let x=yield F(u,f);P(x.url);let b=g;for(;b.firstChild;)b.removeChild(b.firstChild);b.appendChild(M(x.url))}catch(h){alert("Error generating image: "+h.message)}finally{a.disabled=!1,a.textContent="Generate Try-On"}})}return o}function Y(o){let r=document.createElement("div");r.id="tryon-modal",r.className="tryon-modal tryon-modal-popover";let n=document.createElement("div");n.className="tryon-modal-wrapper tryon-modal-popover-wrapper";let e=document.createElement("button");e.className="tryon-modal-close",e.textContent="\xD7",e.setAttribute("aria-label","Close modal");let t=document.createElement("div");t.className="tryon-modal-content",n.appendChild(e),n.appendChild(t),r.appendChild(n);let i=!1,d="main";function s(){for(;t.firstChild;)t.removeChild(t.firstChild);if(d==="onboarding"){let l=$(()=>{L(!0),d="main",s()});t.appendChild(l)}else{let l=W();t.appendChild(l)}}function a(){i=!0,r.classList.add("tryon-modal-open"),T()?d="main":d="onboarding",s()}function c(){for(i=!1,r.classList.remove("tryon-modal-open");t.firstChild;)t.removeChild(t.firstChild);o==null||o()}return e.addEventListener("click",c),r.open=a,r.close=c,r}function q(){return`
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
  `}var E=null;function J(){if(E)return E;let o=document.getElementById("tryon-widget-container");o||(o=document.createElement("div"),o.id="tryon-widget-container",o.style.cssText="position: fixed; bottom: 20px; right: 20px; z-index: 999999;",document.body.appendChild(o));let r=o.attachShadow({mode:"open"}),n=document.createElement("div");n.className="tryon-widget-root";let e=document.createElement("style");e.textContent=q(),r.appendChild(e),r.appendChild(n);let t=A(()=>{i.open()});n.appendChild(t);let i=Y(()=>{});return n.appendChild(i),E={hostContainer:o,shadowRoot:r,shadowContainer:n,button:t,modal:i,destroy:()=>{o.remove(),E=null}},console.log("[TryOn Widget] Initialized with Shadow DOM"),E}function X(){let o=document.querySelectorAll("script"),r=null;for(let t of o)if(t.src&&t.src.includes("widget.js")){r=t;break}let n="default-widget-key",e="https://tryon-backend-delta.vercel.app/api";if(r){let t=r.getAttribute("data-tryon-key"),i=r.getAttribute("data-tryon-url");t&&(n=t),i&&(e=i)}return window.TRYON_WIDGET_CONFIG={apiKey:n,apiUrl:e,scriptElement:r},{apiKey:n,apiUrl:e}}function V(){let o=X();console.log("[Tryon Widget] Initializing with config:",o),J()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",V):V();})();
