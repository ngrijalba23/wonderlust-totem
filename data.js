// Contenido del tótem. Para cambiar textos, casos o videos, editar solo este archivo.
const V = 'assets/v/', I = 'assets/img/';

const CLUSTERS = [
  {
    id: 'audiovisual',
    num: '01',
    title: ['Producción', 'audiovisual'],
    cover: I + 'cov-stream.jpg',
    tagline: 'Del concepto al máster, sin intermediarios.',
    desc: 'Contenido que cuenta la marca: comerciales, cubrimiento de eventos y piezas para redes, con equipo propio de preproducción, rodaje y posproducción.',
    loop: V + 'cl-audiovisual.mp4',
    reel: 'https://player.vimeo.com/video/1218081987',
    services: [
      ['Comerciales y piezas para redes', 'Ideas pensadas para cada pantalla, del guion a la entrega final.', I + 'th-stream.jpg'],
      ['Cubrimiento de eventos', 'Lo que pasó en el salón, contado para quienes no estuvieron.', I + 'th-eventos.jpg'],
      ['Documentales de marca', 'Historias reales de la empresa, su gente y sus procesos.', I + 'th-documental.jpg'],
      ['Avatares con IA', 'Presentadores digitales que hablan en varios idiomas sin volver a grabar.', I + 'th-ia.jpg'],
      ['Proyección y mapping', 'Gran formato sobre superficies convencionales y no convencionales.', I + 'th-mapping.jpg']
    ],
    cases: [
      { brand: 'Xposible · Colsubsidio', title: 'Un reconocimiento distinto cada año', text: 'Desde 2019 acompañamos cada edición con proyección de gran formato, escenografías digitales e interactivos para los asistentes.', stat: ['2019', 'aliados desde'], video: V + 'v5.mp4', poster: I + 'p5.jpg' },
      { brand: 'Gemelo digital', title: 'Graba una vez, aparece en todas partes', text: 'El doble digital de una persona real, como un vocero de la compañía, que presenta en cada evento, en varios idiomas y con mensajes nuevos.', video: V + 'v14.mp4', poster: I + 'p14.jpg' },
      { brand: 'Avatar desde cero', title: 'Personajes con voz y gesto propios', text: 'Presentadores y personajes con guion propio, listos para pantalla, tótem o redes.', video: V + 'v15.mp4', poster: I + 'p15.jpg' }
    ]
  },
  {
    id: 'streaming',
    num: '02',
    title: ['Streaming &', 'transmisiones'],
    cover: I + 'cov-set.jpg',
    tagline: 'Producido como un programa de televisión.',
    desc: 'Grabamos en nuestro estudio de croma y el escenario se genera en 3D en tiempo real. Conectamos invitados desde otras ciudades y la audiencia ve un programa, no una reunión.',
    loop: V + 'cl-streaming.mp4',
    reel: 'https://player.vimeo.com/video/1217708609',
    services: [
      ['Sets virtuales en 3D', 'Escenarios que cambian con cada marca, sin construir nada físico.', I + 'th-set.jpg'],
      ['Varias cámaras en vivo', 'Dirección y realización como en televisión.', I + 'th-camaras.jpg'],
      ['Invitados en otras ciudades', 'Panelistas conectados desde donde estén, dentro del mismo set.', I + 'th-invitados.jpg'],
      ['Transmisión a varias plataformas', 'La misma señal en la web, redes y plataformas internas.', I + 'th-multiplataforma.jpg']
    ],
    cases: [
      { brand: 'ZEISS Vision Care · Nestlé Ascenda', title: 'Ciencia contada en set virtual', text: 'Desde nuestro estudio transmitimos contenido científico para marcas de salud y bienestar, con sets virtuales que hacen visual la explicación técnica.', video: V + 'ciencia.mp4', poster: I + 'ciencia.jpg' },
      { brand: 'Estudio Wonderlust · Bogotá', title: 'Así se ve un streaming nuestro', text: 'Un recorrido por el estudio de croma, las cámaras y los escenarios que armamos para cada transmisión.', video: V + 'reel-streaming.mp4', poster: I + 'cl-streaming.jpg', sound: true }
    ]
  },
  {
    id: 'plataformas',
    num: '03',
    title: ['Plataformas', 'digitales'],
    cover: I + 'cov-latam.jpg',
    tagline: 'El evento se acaba. La plataforma queda.',
    desc: 'Ferias y espacios virtuales en 3D con pabellones, stands y recorridos en 360, donde el visitante navega a su ritmo y la marca sabe quién entró y qué vio.',
    loop: V + 'cl-plataformas.mp4',
    reel: 'https://player.vimeo.com/video/1218088093',
    services: [
      ['Ferias y showrooms virtuales', 'Pabellones y stands que se recorren en línea.', I + 'th-latam.jpg'],
      ['Registro y reportes', 'Quién entró, cuánto tiempo estuvo y qué contenido vio.', I + 'th-reportes.jpg'],
      ['Recorridos en 360', 'El espacio real, navegable desde cualquier pantalla.', I + 'th-360.jpg'],
      ['Invitaciones que se juegan', 'Apps y micrositios donde cada reto desbloquea información.', I + 'th-gesto.jpg']
    ],
    cases: [
      { brand: 'COP16 · Cali, 2024', title: 'La factura del aire', text: 'En tótems y en una plataforma digital, cada persona ingresaba su fecha de nacimiento y recibía su factura del aire: lo que le debe al planeta por todo lo que ha respirado.', stat: ['9.83M', 'de audiencia en medios'], video: V + 'v3.mp4', poster: I + 'p3.jpg' },
      { brand: 'Coca-Cola · Domina el Juego', title: 'Una invitación que se juega', text: 'La invitación a la convención se juega en el celular: cada reto superado desbloquea información del evento.', video: V + 'v9.mp4', poster: I + 'p9.jpg' }
    ]
  },
  {
    id: 'experiencias',
    num: '04',
    title: ['Estrategia &', 'experiencias digitales'],
    cover: I + 'cov-juegos.jpg',
    tagline: 'La activación no se ve. Se juega.',
    desc: 'Juegos personalizados, efectos interactivos en tiempo real, realidad aumentada e inteligencia artificial, pensados para el objetivo de cada evento.',
    loop: V + 'cl-experiencias.mp4',
    reel: 'https://player.vimeo.com/video/1223248100',
    services: [
      ['Juegos a la medida', 'Una mecánica propia para cada marca, para que la gente quiera repetir.', I + 'th-juegos.jpg'],
      ['Pantallas y tótems táctiles', 'Mesas, cubos y tótems que responden al tacto.', I + 'th-totem.jpg'],
      ['Realidad aumentada', 'Capas digitales sobre el espacio físico, con tablet o celular.', I + 'th-ar.jpg'],
      ['Experiencias con IA', 'La inteligencia artificial crea en vivo con lo que dice cada asistente.', I + 'th-ia.jpg']
    ],
    cases: [
      { brand: 'Bancolombia · Festival Gabo', title: 'Laboratorio de historias', text: 'Cada asistente contaba su sueño y la IA lo convertía en tiempo real en un poema, una canción y una imagen.', stat: ['89%', 'de participación'], video: V + 'v6.mp4', poster: I + 'p6.jpg' },
      { brand: 'COP16 · Cali, 2024', title: 'Interacción en tiempo real para niños', text: 'Cada niño elegía un animal, lo coloreaba y lo firmaba con su nombre. Al terminar, su animal saltaba a una pantalla gigante junto a los de los demás.', stat: ['12', 'días de ejecución'], video: V + 'v1.mp4', poster: I + 'p1.jpg' },
      { brand: 'Claro Empresas', title: 'Un stand que responde al tacto', text: 'Un cubo hecho con pantallas: cada cara activa contenido que viaja por cintas LED hasta la pantalla principal.', video: V + 'v7.mp4', poster: I + 'p7.jpg' },
      { brand: 'Colsubsidio · Hotel Alcaraván', title: 'Muro de la conservación', text: 'Fotografías de especies en peligro que, al escanearlas con la tablet, activan el animal animado en realidad aumentada.', video: V + 'v4.mp4', poster: I + 'p4.jpg' },
      { brand: 'Banco Agrario · Stand', title: 'Mesa táctil para explorar', text: 'Una mesa interactiva con el mapa de Colombia para que los visitantes descubran el contenido del stand jugando.', video: V + 'v11.mp4', poster: I + 'p11.jpg' },
      { brand: 'Colsubsidio Turismo', title: 'Juego de piso en stand', text: 'Un juego de piso conectado a pantalla, donde los visitantes participan con todo el cuerpo.', video: V + 'v13.mp4', poster: I + 'p13.jpg' }
    ]
  }
];

const CLIENTS = ['Coca-Cola', 'Coca-Cola FEMSA', 'Nestlé', 'Naciones Unidas', 'BID', 'ProColombia', 'Gobierno de Colombia', 'Mercado Libre', 'Grupo Bancolombia', 'HSBC', 'Colsubsidio', 'ETB', 'Terpel', 'Chevrolet', 'Banco Popular', 'Alimentos Polar', 'Colpatria', 'Ramo', 'Incocrédito', 'ANDA', 'WOBI'];

const STEPS = [
  ['Concepto', 'Entendemos el reto y proponemos el formato que mejor lo resuelve.', I + 'paso1.png'],
  ['Desarrollo', 'Producimos el contenido, el software y las piezas con nuestro equipo en Bogotá.', I + 'paso2.png'],
  ['Integración', 'Ajustamos todo al espacio, las pantallas, la plataforma o la transmisión.', I + 'paso3.png'],
  ['Operación', 'Pruebas, montaje y soporte durante el evento, con plan de contingencia.', I + 'paso4.png']
];

// Segundos sin tocar la pantalla antes de volver a la pantalla de espera
const IDLE_SECONDS = 90;
