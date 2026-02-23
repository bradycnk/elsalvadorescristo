# elsalvadorescristo

Organización sin fines de lucro que ayuda a conectar iglesias y personas dispuestas a aportar su granito de arena a comunidades vulnerables, discapacitados, ancianos, niños y niñas que necesiten ayuda, siguiendo el legado de Jesucristo: ama a tu prójimo.

## Despliegue en GitHub Pages

Este repositorio ahora incluye una carpeta `docs/` con:

- `docs/index.html`
- `docs/404.html`
- `docs/.nojekyll`

Esto permite publicar el sitio en GitHub Pages sin pasar por compilación de Jekyll y evita errores como:

- `No such file or directory @ dir_chdir0 - /github/workspace/docs`

### Configuración recomendada

1. En GitHub: **Settings → Pages**.
2. En **Build and deployment**, selecciona **Deploy from a branch**.
3. Branch: `main` (o tu branch principal), folder: `/docs`.
4. Guarda los cambios y espera el despliegue.

> Si usas GitHub Actions para Pages, asegúrate de apuntar también a `docs/` como fuente o subir el artefacto desde esa carpeta.
