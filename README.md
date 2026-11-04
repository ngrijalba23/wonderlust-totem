# Mundo Wonderlust · tótem touch

Experiencia táctil vertical (1080 × 1920) para tótem. El visitante toca la pantalla, el dinosaurio sale del agua rugiendo y entra al mundo Wonderlust, donde recorre los cuatro clusters con sus videos y casos.

## Recorrido

1. **Espera**: agua con ondas. Al primer toque el dinosaurio sale, ruge y la pantalla tiembla.
2. **Mundo Wonderlust**: los cuatro portales (Producción audiovisual, Streaming y transmisiones, Plataformas digitales, Estrategia y experiencias digitales).
3. **Cluster**: video en loop, reel completo (Vimeo), servicios desplegables y casos en carrusel que se abren a pantalla completa. Se desliza a los lados para cambiar de cluster.
4. **Cierre**: cómo trabajamos, QR a wonderlust.live y contactos.

Si nadie toca la pantalla en 90 segundos, vuelve a la espera (`IDLE_SECONDS` en `data.js`).

## Editar contenido

Textos, casos y videos están en `data.js`. Los videos van en `assets/v/` y las portadas en `assets/img/`.

## En el tótem

- Usar Chrome o Edge en modo quiosco: `chrome --kiosk --autoplay-policy=no-user-gesture-required <url>`.
- Los objetos y el dinosaurio son video con transparencia (WebM VP9); Safari no los muestra.
- El reel completo de cada cluster se carga desde Vimeo y necesita internet; el resto funciona desde los archivos del sitio.
- Para ver el cursor mientras se prueba en computador, agregar `?dev` a la URL.
