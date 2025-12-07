/**
 * Simple TryOn Widget - Sidebar version
 */
(function() {
  console.log('[TryOn Widget] Loading...');
  
  // Get API key from script tag
  const scripts = document.querySelectorAll('script');
  let apiKey = null;
  
  for (const script of scripts) {
    if (script.src && script.src.includes('widget')) {
      apiKey = script.getAttribute('data-tryon-key');
      break;
    }
  }
  
  if (!apiKey) {
    console.error('[TryOn Widget] Missing data-tryon-key attribute');
    return;
  }
  
  console.log('[TryOn Widget] API Key:', apiKey);
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }
  
  function initWidget() {
    console.log('[TryOn Widget] Initializing...');
    
    // Create floating button
    const button = document.createElement('div');
    button.id = 'tryon-floating-button';
    button.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      z-index: 999999;
      font-size: 24px;
      transition: transform 0.3s, box-shadow 0.3s;
      color: white;
      font-weight: bold;
    `;
    button.innerHTML = '✨';
    button.title = 'Try-On';
    
    // Add hover effect
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.1)';
      button.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
      button.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
    });
    
    // Click handler
    button.addEventListener('click', togglePanel);
    
    document.body.appendChild(button);
    console.log('[TryOn Widget] Floating button created');
    
    // Create sidebar panel
    const panel = document.createElement('div');
    panel.id = 'tryon-panel';
    panel.style.cssText = `
      position: fixed;
      right: 0;
      top: 0;
      width: 380px;
      height: 100vh;
      background: white;
      box-shadow: -2px 0 15px rgba(0, 0, 0, 0.15);
      z-index: 999998;
      transform: translateX(400px);
      transition: transform 0.3s ease;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    `;
    
    // Panel header
    const header = document.createElement('div');
    header.style.cssText = `
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
    `;
    
    const title = document.createElement('h3');
    title.style.cssText = `
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    `;
    title.textContent = '✨ Try-On Virtual';
    header.appendChild(title);
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.style.cssText = `
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: background 0.2s;
    `;
    closeBtn.innerHTML = '✕';
    closeBtn.addEventListener('click', togglePanel);
    closeBtn.addEventListener('mouseenter', () => {
      closeBtn.style.background = 'rgba(255, 255, 255, 0.3)';
    });
    closeBtn.addEventListener('mouseleave', () => {
      closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    header.appendChild(closeBtn);
    
    panel.appendChild(header);
    
    // Panel content
    const content = document.createElement('div');
    content.style.cssText = `
      flex: 1;
      padding: 30px 20px;
      overflow-y: auto;
    `;
    
    // Content HTML
    content.innerHTML = `
      <div style="text-align: center; margin-bottom: 25px;">
        <div style="font-size: 48px; margin-bottom: 15px;">👗</div>
        <p style="margin: 0 0 10px 0; color: #333; font-size: 16px; font-weight: 600;">
          Prueba tu ropa virtualmente
        </p>
        <p style="margin: 0; color: #999; font-size: 13px; line-height: 1.5;">
          Carga tu foto y la prenda para ver cómo te ves
        </p>
      </div>
      
      <div style="background: #f8f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 3px solid #667eea;">
        <p style="margin: 0; font-size: 13px; color: #555; line-height: 1.6;">
          <strong>Pasos:</strong><br>
          1. Sube una foto tuya<br>
          2. Carga la prenda<br>
          3. Genera el try-on<br>
          4. ¡Mira el resultado!
        </p>
      </div>
      
      <button id="tryon-start-btn" style="
        width: 100%;
        padding: 12px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s;
      ">
        Comenzar Now
      </button>
      
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="margin: 0 0 10px 0; font-size: 12px; color: #999; font-weight: 600; text-transform: uppercase;">
          Estado
        </p>
        <p style="margin: 0; font-size: 13px; color: #666; background: #f5f5f5; padding: 10px; border-radius: 4px;">
          Cliente: <strong>${apiKey}</strong>
        </p>
      </div>
    `;
    
    panel.appendChild(content);
    document.body.appendChild(panel);
    
    // Button click handler
    const startBtn = document.getElementById('tryon-start-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        alert('🚀 Widget full en desarrollo.\n\nAPI Key: ' + apiKey);
      });
      startBtn.addEventListener('mouseenter', () => {
        startBtn.style.transform = 'translateY(-2px)';
      });
      startBtn.addEventListener('mouseleave', () => {
        startBtn.style.transform = 'translateY(0)';
      });
    }
    
    function togglePanel() {
      const isOpen = panel.style.transform === 'translateX(0px)';
      panel.style.transform = isOpen ? 'translateX(400px)' : 'translateX(0px)';
      button.style.opacity = isOpen ? '1' : '0.5';
    }
    
    // Overlay para cerrar al hacer click afuera
    const overlay = document.createElement('div');
    overlay.id = 'tryon-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999997;
      display: none;
    `;
    overlay.addEventListener('click', togglePanel);
    document.body.appendChild(overlay);
    
    // Mostrar/ocultar overlay
    const originalToggle = togglePanel;
    window.togglePanel = function() {
      originalToggle();
      overlay.style.display = panel.style.transform === 'translateX(0px)' ? 'block' : 'none';
    };
    button.addEventListener('click', window.togglePanel);
    closeBtn.addEventListener('click', window.togglePanel);
    
    console.log('[TryOn Widget] Initialized successfully');
  }
})();

