/**
 * TryOn Widget - Box style version
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
    
    // Create floating button (square box with TryOn text)
    const button = document.createElement('div');
    button.id = 'tryon-floating-button';
    button.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #c9b896 0%, #a89968 100%);
      border-radius: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 15px rgba(157, 137, 99, 0.3);
      z-index: 999999;
      transition: transform 0.3s, box-shadow 0.3s;
      color: #c9b896;
      font-weight: bold;
      border: 3px solid #c9b896;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      font-size: 22px;
      letter-spacing: 1px;
    `;
    button.innerHTML = 'TryOn';
    button.title = 'Try-On Virtual';
    
    // Add hover effect
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.05)';
      button.style.boxShadow = '0 8px 25px rgba(157, 137, 99, 0.4)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
      button.style.boxShadow = '0 4px 15px rgba(157, 137, 99, 0.3)';
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
      width: 350px;
      height: 100vh;
      background: white;
      box-shadow: -2px 0 15px rgba(0, 0, 0, 0.1);
      z-index: 999998;
      transform: translateX(380px);
      transition: transform 0.35s ease;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      border-radius: 8px 0 0 8px;
    `;
    
    // Panel header
    const header = document.createElement('div');
    header.style.cssText = `
      padding: 20px;
      background: linear-gradient(135deg, #c9b896 0%, #a89968 100%);
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
    title.textContent = 'TryOn Virtual';
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
      
      <div style="background: #f8f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 3px solid #c9b896;">
        <p style="margin: 0; font-size: 13px; color: #555; line-height: 1.6;">
          <strong>Pasos:</strong><br>
          1. Sube una foto tuya<br>
          2. Carga la prenda<br>
          3. Genera el try-on<br>
          4. ¡Mira el resultado!
        </p>
      </div>

      <form id="tryon-form" style="display: flex; flex-direction: column; gap: 15px;">
        <!-- Tu foto -->
        <div>
          <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600; color: #333;">
            Tu Foto
          </label>
          <input 
            type="file" 
            id="user-photo" 
            accept="image/*"
            style="width: 100%; padding: 10px; border: 2px dashed #c9b896; border-radius: 6px; cursor: pointer; font-size: 12px;"
          />
          <div id="user-photo-preview" style="margin-top: 10px; text-align: center; display: none;">
            <img id="user-photo-img" src="" style="max-width: 100%; max-height: 150px; border-radius: 6px; border: 1px solid #eee;">
          </div>
        </div>

        <!-- Prenda -->
        <div>
          <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600; color: #333;">
            Prenda de Ropa
          </label>
          <input 
            type="file" 
            id="clothing-item" 
            accept="image/*"
            style="width: 100%; padding: 10px; border: 2px dashed #c9b896; border-radius: 6px; cursor: pointer; font-size: 12px;"
          />
          <div id="clothing-preview" style="margin-top: 10px; text-align: center; display: none;">
            <img id="clothing-img" src="" style="max-width: 100%; max-height: 150px; border-radius: 6px; border: 1px solid #eee;">
          </div>
        </div>

        <button 
          type="button"
          id="tryon-generate-btn"
          style="
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #c9b896 0%, #a89968 100%);
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
            margin-top: 10px;
          "
          disabled
        >
          Generar Try-On
        </button>
      </form>
    `;
    
    panel.appendChild(content);
    document.body.appendChild(panel);
    
    // File input handlers
    let userPhotoFile = null;
    let clothingFile = null;
    
    const userPhotoInput = document.getElementById('user-photo');
    const userPhotoPreview = document.getElementById('user-photo-preview');
    const userPhotoImg = document.getElementById('user-photo-img');
    const clothingInput = document.getElementById('clothing-item');
    const clothingPreview = document.getElementById('clothing-preview');
    const clothingImg = document.getElementById('clothing-img');
    const generateBtn = document.getElementById('tryon-generate-btn');
    
    if (userPhotoInput) {
      userPhotoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          userPhotoFile = file;
          const reader = new FileReader();
          reader.onload = (event) => {
            userPhotoImg.src = event.target.result;
            userPhotoPreview.style.display = 'block';
            checkFormComplete();
          };
          reader.readAsDataURL(file);
        }
      });
    }
    
    if (clothingInput) {
      clothingInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          clothingFile = file;
          const reader = new FileReader();
          reader.onload = (event) => {
            clothingImg.src = event.target.result;
            clothingPreview.style.display = 'block';
            checkFormComplete();
          };
          reader.readAsDataURL(file);
        }
      });
    }
    
    function checkFormComplete() {
      if (userPhotoFile && clothingFile) {
        generateBtn.disabled = false;
      }
    }
    
    if (generateBtn) {
      generateBtn.addEventListener('click', () => {
        generateTryOn();
      });
      generateBtn.addEventListener('mouseenter', () => {
        if (!generateBtn.disabled) {
          generateBtn.style.transform = 'translateY(-2px)';
        }
      });
      generateBtn.addEventListener('mouseleave', () => {
        generateBtn.style.transform = 'translateY(0)';
      });
    }
    
    async function generateTryOn() {
      if (!userPhotoFile || !clothingFile) {
        alert('Por favor carga ambas imágenes');
        return;
      }
      
      // Show loading state
      generateBtn.disabled = true;
      generateBtn.textContent = 'Generando...';
      
      try {
        // Convert files to base64
        const userPhotoBase64 = await fileToBase64(userPhotoFile);
        const clothingBase64 = await fileToBase64(clothingFile);
        
        // Send to backend as JSON
        const response = await fetch('https://tryon-backend-delta.vercel.app/api/images/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-client-key': apiKey,
          },
          body: JSON.stringify({
            userPhotoBase64,
            clothingBase64,
            prompt: 'professional fashion try-on photo',
          }),
        });
        
        if (!response.ok) {
          throw new Error('Error en la generación: ' + response.statusText);
        }
        
        const data = await response.json();
        
        if (data.url) {
          // Show result
          content.innerHTML = `
            <div style="padding: 20px 0;">
              <p style="margin: 0 0 15px 0; color: #333; font-size: 14px; font-weight: 600;">
                ✨ Tu Try-On está listo:
              </p>
              <img src="${data.url}" style="width: 100%; border-radius: 8px; margin-bottom: 15px;">
              <button onclick="location.reload()" style="
                width: 100%;
                padding: 10px;
                background: linear-gradient(135deg, #c9b896 0%, #a89968 100%);
                color: white;
                border: none;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
              ">
                Generar otra
              </button>
            </div>
          `;
        }
      } catch (error) {
        alert('Error: ' + error.message);
        generateBtn.disabled = false;
        generateBtn.textContent = 'Generar Try-On';
      }
    }
    
    function fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          // Extract base64 string without data:image/...;base64, prefix
          const base64String = reader.result.split(',')[1];
          resolve(base64String);
        };
        reader.onerror = error => reject(error);
      });
    }
    
    function togglePanel() {
      const isOpen = panel.style.transform === 'translateX(0px)';
      panel.style.transform = isOpen ? 'translateX(380px)' : 'translateX(0px)';
    }
    
    console.log('[TryOn Widget] Initialized successfully');
  }
})();
