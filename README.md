# Mundo Wonderlust · tótem touch

Experiencia táctil vertical (1080 × 1920) para tótem, con el lenguaje de estudio blanco de Wonderlust: fotos de estudio con luz natural, objetos de cristal con reflejos dorados y violeta, paneles de vidrio esmerilado y dorado como único acento. El visitante toca la pantalla, un T-rex de cristal atraviesa el portal dorado rugiendo y entra al mundo Wonderlust, donde recorre los cuatro clusters con sus videos y casos.

## Recorrido

1. **Espera**: el portal dorado respira en el estudio. Al primer toque arranca el video del T-rex de cristal que lo cruza y ruge; la pantalla tiembla en el rugido (`ROAR_AT` en `app.js`).
2. **Mundo Wonderlust**: los cuatro portales con sus objetos de cristal (Producción audiovisual, Streaming y transmisiones, Plataformas digitales, Estrategia y experiencias digitales).
3. **Cluster**: video en loop, reel completo (Vimeo), servicios desplegables y casos en carrusel que se abren a pantalla completa. Se desliza a los lados para cambiar de cluster.
4. **Cierre**: cómo trabajamos en cuatro pasos (bombillo, cubo, rompecabezas y claqueta de cristal), QR a wonderlust.live y contactos.

Si nadie toca la pantalla en 90 segundos, vuelve a la espera (`IDLE_SECONDS` en `data.js`).

## Editar contenido

Textos, casos y videos están en `data.js`. Los videos van en `assets/v/` y las portadas en `assets/img/`.

## En el tótem

- Usar Chrome o Edge en modo quiosco: `chrome --kiosk --autoplay-policy=no-user-gesture-required <url>`.
- El video de entrada (`assets/v/intro.mp4`) se generó en Higgsfield (GPT Image 2.5 + Seedance 2.5) y trae su propio sonido.
- El reel completo de cada cluster se carga desde Vimeo y necesita internet; el resto funciona desde los archivos del sitio.
- Para ver el cursor mientras se prueba en computador, agregar `?dev` a la URL.
