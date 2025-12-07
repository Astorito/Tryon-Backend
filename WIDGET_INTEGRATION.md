# Widget Integration Guide

Ejemplos de cómo consumir los endpoints del backend desde tu widget (Shopify, Hostinger, etc.)

## 1. Validación de API Key (Inicio)

Antes de permitir que el usuario genere imágenes, valida su API key:

```javascript
// widget.js - Validar al cargar
const validateApiKey = async (apiKey) => {
  const response = await fetch("https://tu-backend.com/auth/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apiKey: apiKey,
    }),
  });

  const data = await response.json();

  if (!data.success) {
    console.error("Invalid API key:", data.error);
    return null;
  }

  return {
    empresaId: data.empresaId,
    nombre: data.nombre,
  };
};

// Uso:
const config = await validateApiKey("sk_abc123...");
if (!config) {
  // Mostrar error al usuario
  showError("Invalid API key. Contact support.");
} else {
  console.log(`Welcome, ${config.nombre}!`);
  initializeWidget();
}
```

## 2. Generar Imagen (Main Endpoint)

El endpoint más importante. Llamado desde el formulario de generación:

```javascript
// widget.js - Generar imagen
const generateImage = async (apiKey, prompt, modelo = "banana") => {
  const response = await fetch("https://tu-backend.com/images/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-client-key": apiKey, // API key de la empresa en header
    },
    body: JSON.stringify({
      prompt: prompt, // Ej: "persona usando remera roja"
      modelo: modelo, // "banana", "veo3" o "mosaico"
      metadata: {
        // Opcional: información adicional
        source: "shopify-widget",
        version: "1.0.0",
      },
    }),
  });

  const data = await response.json();

  if (!data.success) {
    console.error("Image generation failed:", data.error);
    return null;
  }

  return {
    url: data.url, // URL de la imagen generada
    generationId: data.generationId, // ID para futuras referencias
    provider: data.provider,
  };
};

// Uso en formulario:
document.getElementById("generateBtn").addEventListener("click", async () => {
  const prompt = document.getElementById("promptInput").value;
  const modelo = document.getElementById("modelSelect").value || "banana";

  const result = await generateImage(apiKey, prompt, modelo);

  if (result) {
    // Mostrar imagen
    document.getElementById("preview").src = result.url;
    console.log(`Image generated with ${result.provider}`);
    console.log(`ID: ${result.generationId}`);
  } else {
    showError("Failed to generate image. Try again.");
  }
});
```

## 3. Ejemplo Completo: Widget HTML + JavaScript

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Image Generator Widget</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
    }
    .widget {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      background: #fff;
    }
    input,
    select {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 10px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    button:hover {
      background: #0056b3;
    }
    .preview {
      margin-top: 20px;
      text-align: center;
    }
    .preview img {
      max-width: 100%;
      border-radius: 8px;
    }
    .error {
      color: red;
      margin: 10px 0;
    }
    .loading {
      color: blue;
    }
  </style>
</head>
<body>
  <div class="widget">
    <h2>AI Image Generator</h2>

    <!-- Campo de API Key -->
    <input
      type="text"
      id="apiKeyInput"
      placeholder="Paste your API key here"
      value="sk_"
    />

    <!-- Campo de Prompt -->
    <textarea
      id="promptInput"
      placeholder="Describe the image you want to generate..."
      rows="3"
      style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px"
    ></textarea>

    <!-- Selector de Modelo -->
    <select id="modelSelect">
      <option value="banana">Banana (fast)</option>
      <option value="veo3">VEO3 (quality)</option>
      <option value="mosaico">Mosaico</option>
    </select>

    <!-- Botón de Generar -->
    <button id="generateBtn">Generate Image</button>

    <!-- Área de Error -->
    <div id="error" class="error"></div>

    <!-- Área de Loading -->
    <div id="loading" class="loading" style="display: none">
      Generating image... Please wait
    </div>

    <!-- Área de Preview -->
    <div class="preview">
      <img id="preview" style="display: none" />
    </div>
  </div>

  <script>
    const API_URL = "https://tu-backend.com"; // Reemplazar con tu URL

    const showError = (msg) => {
      const errorDiv = document.getElementById("error");
      errorDiv.textContent = msg;
      setTimeout(() => {
        errorDiv.textContent = "";
      }, 5000);
    };

    const showLoading = (show) => {
      document.getElementById("loading").style.display = show
        ? "block"
        : "none";
    };

    // Validar API key al ingresar
    document
      .getElementById("apiKeyInput")
      .addEventListener("blur", async (e) => {
        const apiKey = e.target.value;
        if (!apiKey.startsWith("sk_")) {
          showError("Invalid API key format");
          return;
        }

        const response = await fetch(`${API_URL}/auth/validate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ apiKey }),
        });

        const data = await response.json();
        if (data.success) {
          console.log(`✅ Company: ${data.nombre}`);
        } else {
          showError(data.error);
        }
      });

    // Generar imagen
    document
      .getElementById("generateBtn")
      .addEventListener("click", async () => {
        const apiKey = document.getElementById("apiKeyInput").value;
        const prompt = document.getElementById("promptInput").value;
        const modelo = document.getElementById("modelSelect").value;

        if (!apiKey || !prompt) {
          showError("Please fill all fields");
          return;
        }

        showLoading(true);

        try {
          const response = await fetch(`${API_URL}/images/generate`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-client-key": apiKey,
            },
            body: JSON.stringify({
              prompt,
              modelo,
            }),
          });

          const data = await response.json();

          if (!data.success) {
            showError(data.error);
            showLoading(false);
            return;
          }

          // Mostrar imagen
          const previewImg = document.getElementById("preview");
          previewImg.src = data.url;
          previewImg.style.display = "block";

          console.log(`✅ Generated with ${data.provider}`);
          console.log(`ID: ${data.generationId}`);
        } catch (error) {
          showError("Network error. Check your connection.");
          console.error(error);
        }

        showLoading(false);
      });
  </script>
</body>
</html>
```

## 4. Obtener Detalles de una Generación

Después de generar, puedes obtener detalles:

```javascript
const getGenerationDetails = async (apiKey, generationId) => {
  const response = await fetch(
    `https://tu-backend.com/images/${generationId}`,
    {
      method: "GET",
      headers: {
        "x-client-key": apiKey,
      },
    }
  );

  const data = await response.json();

  if (!data.success) {
    console.error("Failed to fetch details:", data.error);
    return null;
  }

  return {
    id: data.data.id,
    prompt: data.data.prompt,
    modelo: data.data.modelo,
    urlResultado: data.data.urlResultado,
    createdAt: data.data.createdAt,
  };
};

// Uso:
const details = await getGenerationDetails(
  apiKey,
  "clx12345..."
);
console.log(details);
```

## 5. Consumir desde React/Next.js

```typescript
// hooks/useImageGenerator.ts
import { useState } from "react";

interface GenerationResult {
  url: string;
  generationId: string;
  provider: string;
}

export const useImageGenerator = (apiKey: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (
    prompt: string,
    modelo: "banana" | "veo3" | "mosaico" = "banana"
  ): Promise<GenerationResult | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://tu-backend.com/images/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-key": apiKey,
        },
        body: JSON.stringify({ prompt, modelo }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error);
        return null;
      }

      return {
        url: data.url,
        generationId: data.generationId,
        provider: data.provider,
      };
    } catch (err) {
      setError("Network error");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generate, loading, error };
};

// Uso en componente:
import { useState } from "react";
import { useImageGenerator } from "@/hooks/useImageGenerator";

export default function ImageGeneratorWidget() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const apiKey = "sk_abc123..."; // Desde config/props

  const { generate, loading, error } = useImageGenerator(apiKey);

  const handleGenerate = async () => {
    const result = await generate(prompt, "banana");
    if (result) {
      setImageUrl(result.url);
    }
  };

  return (
    <div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your image..."
      />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {imageUrl && <img src={imageUrl} alt="Generated" />}
    </div>
  );
}
```

## 6. Consumir desde Vue.js

```vue
<template>
  <div class="widget">
    <h2>AI Image Generator</h2>

    <textarea
      v-model="prompt"
      placeholder="Describe the image..."
      rows="3"
    ></textarea>

    <select v-model="modelo">
      <option value="banana">Banana</option>
      <option value="veo3">VEO3</option>
      <option value="mosaico">Mosaico</option>
    </select>

    <button @click="generateImage" :disabled="loading">
      {{ loading ? "Generating..." : "Generate Image" }}
    </button>

    <p v-if="error" style="color: red">{{ error }}</p>
    <img v-if="imageUrl" :src="imageUrl" alt="Generated image" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const apiKey = ref("sk_abc123...");
const prompt = ref("");
const modelo = ref("banana");
const imageUrl = ref("");
const loading = ref(false);
const error = ref("");

const generateImage = async () => {
  loading.value = true;
  error.value = "";

  try {
    const response = await fetch("https://tu-backend.com/images/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-key": apiKey.value,
      },
      body: JSON.stringify({
        prompt: prompt.value,
        modelo: modelo.value,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      error.value = data.error;
      return;
    }

    imageUrl.value = data.url;
  } catch (err) {
    error.value = "Network error";
    console.error(err);
  } finally {
    loading.value = false;
  }
};
</script>
```

## 7. Consumir desde Python (Back-end a Back-end)

```python
# widget_server.py - Si tu widget está en backend (Flask, Django, FastAPI)
import requests
import json

class ImageGeneratorClient:
    def __init__(self, api_key, base_url="https://tu-backend.com"):
        self.api_key = api_key
        self.base_url = base_url

    def validate_key(self):
        """Valida la API key"""
        response = requests.post(
            f"{self.base_url}/auth/validate",
            json={"apiKey": self.api_key}
        )
        return response.json()

    def generate_image(self, prompt, modelo="banana"):
        """Genera una imagen"""
        response = requests.post(
            f"{self.base_url}/images/generate",
            headers={
                "Content-Type": "application/json",
                "x-client-key": self.api_key
            },
            json={
                "prompt": prompt,
                "modelo": modelo
            }
        )
        return response.json()

    def get_image(self, generation_id):
        """Obtiene detalles de una imagen"""
        response = requests.get(
            f"{self.base_url}/images/{generation_id}",
            headers={"x-client-key": self.api_key}
        )
        return response.json()

# Uso:
client = ImageGeneratorClient("sk_abc123...")

# Validar
validation = client.validate_key()
if validation["success"]:
    print(f"Valid for company: {validation['nombre']}")

# Generar
result = client.generate_image("red shirt person", "banana")
if result["success"]:
    print(f"Image URL: {result['url']}")
    print(f"Generation ID: {result['generationId']}")
```

## 8. Seguridad

⚠️ **IMPORTANTE**:

1. **Nunca** guardes API keys en código frontend visible
2. **Siempre** usa HTTPS en producción
3. **Valida** el prompt servidor-side (no confíes solo en frontend)
4. **Limita** rate de generaciones por empresa
5. **Loguea** todas las generaciones para auditoría

```javascript
// ❌ MAL - API key en código
const apiKey = "sk_abc123...";

// ✅ BIEN - API key desde variable de entorno
const apiKey = process.env.REACT_APP_API_KEY;

// ✅ MEJOR - API key desde cookie segura (server-set)
// Cookie configurada en backend con httpOnly: true
```

---

**¿Necesitas más ejemplos? Contacta al equipo de soporte.**
