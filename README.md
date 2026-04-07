# elsalvadorescristo

Organización sin fines de lucro que conecta iglesias, voluntarios y donantes para ayudar a comunidades vulnerables en alimentación, educación y salud.

## Stack actual

- HTML + Tailwind CSS (CDN)
- TypeScript compilado a JavaScript (`src/main.ts` → `assets/main.js` y `docs/assets/main.js`)

## Noticias bíblicas en la web

La sección **Noticias** intenta cargar el **versículo del día** desde:

- https://www.bible.com/es/verse-of-the-day

Como Bible.com no siempre permite CORS directo, el frontend usa una lectura vía proxy público (`allorigins`) y tiene fallback con enlace manual si falla la carga.

## Desarrollo local

```bash
npm install
npm run build:all
```

Luego abre `index.html` o levanta servidor estático.

## Despliegue en GitHub Pages

El sitio se publica desde `docs/`:

- `docs/index.html`
- `docs/404.html`
- `docs/.nojekyll`
- `docs/assets/main.js`

Configurar en GitHub:

1. **Settings → Pages**
2. **Build and deployment → Deploy from a branch**
3. Seleccionar branch principal y carpeta **`/docs`**

Esto evita el error:

- `No such file or directory @ dir_chdir0 - /github/workspace/docs`
