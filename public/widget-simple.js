/**
 * TryOn Widget - Ultra-simple version
 */
(function() {
  try {
    console.log('[TryOn] Iniciando...');
    
    // Detectar API key
    let apiKey = 'testtryon01';
    const scripts = document.querySelectorAll('script');
    for (const script of scripts) {
      const key = script.getAttribute('data-tryon-key');
      if (key) {
        apiKey = key;
        break;
      }
    }
    
    // Crear botón flotante
    const btn = document.createElement('button');
    btn.innerHTML = '✨ Try-On';
    btn.style.cssText = 'position:fixed;bottom:20px;right:20px;width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);color:white;border:none;cursor:pointer;font-size:12px;font-weight:bold;z-index:999999;box-shadow:0 4px 12px rgba(102,126,234,0.4);transition:all 0.3s;';
    
    btn.onmouseenter = () => {
      btn.style.transform = 'scale(1.1)';
      btn.style.boxShadow = '0 6px 20px rgba(102,126,234,0.6)';
    };
    btn.onmouseleave = () => {
      btn.style.transform = 'scale(1)';
      btn.style.boxShadow = '0 4px 12px rgba(102,126,234,0.4)';
    };
    
    document.body.appendChild(btn);
    console.log('[TryOn] Botón creado');
    
    btn.onclick = function() {
      alert('✨ Try-On Widget\n\nCliente: ' + apiKey + '\n\nWidget en desarrollo');
    };
    
  } catch(e) {
    console.error('[TryOn] Error:', e.message);
  }
})();


