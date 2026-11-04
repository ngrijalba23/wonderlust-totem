(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const stage = $('#stage');
  const player = $('#player');
  const media = $('#playerMedia');
  let scale = 1;
  let current = 'attract';
  let clIndex = 0;

  if (new URLSearchParams(location.search).has('dev')) document.body.classList.add('dev');

  // ---------- Ajuste del lienzo 1080x1920 a cualquier pantalla ----------
  function fit() {
    scale = Math.min(innerWidth / 1080, innerHeight / 1920);
    const t = `translate(-50%, -50%) scale(${scale})`;
    stage.style.setProperty('--fit', t);
    stage.style.transform = t;
  }
  addEventListener('resize', fit);
  fit();

  // ---------- Navegación entre pantallas ----------
  function show(id) {
    $$('.screen').forEach(s => s.classList.toggle('active', s.id === id));
    current = id;
    syncVideos();
    if (id === 'attract') resetAttract();
    if (id === 'world' || id === 'close') $('#' + id).scrollTop = 0;
    $$('video[data-src]').forEach(v => { seen.unobserve(v); seen.observe(v); });
  }

  // Solo se reproducen los videos de la pantalla visible
  function syncVideos() {
    $$('.screen video').forEach(v => {
      if (v.id === 'intro') return;
      if (v.closest('.screen').id !== current) v.pause();
      else if (!v.dataset.src && v.src) v.play().catch(() => {});
    });
  }

  // ---------- 1 · El T-rex cruza el umbral ----------
  // ROAR_AT: segundo del video en que ruge (temblor y destello)
  const intro = $('#intro');
  const ROAR_AT = 5.8;
  let roaring = false, shook = false;
  let timers = [];

  function wake() {
    if (roaring) return;
    roaring = true;
    shook = false;
    $('#attract').classList.add('roar');
    intro.muted = false;
    intro.volume = 1;
    intro.currentTime = 0;
    // Si el navegador bloquea el sonido, no se reproduce en silencio: se espera el siguiente toque
    intro.play().catch(() => { roaring = false; $('#attract').classList.remove('roar'); });
  }

  intro.addEventListener('timeupdate', () => {
    if (!roaring || shook || intro.currentTime < ROAR_AT) return;
    shook = true;
    stage.classList.remove('shake'); void stage.offsetWidth; stage.classList.add('shake');
    $('#attract').classList.remove('flashing'); void stage.offsetWidth; $('#attract').classList.add('flashing');
  });
  intro.addEventListener('ended', () => { if (roaring) enterWorld(); });
  intro.addEventListener('error', () => { if (roaring) enterWorld(); });

  let entering = false;
  function enterWorld() {
    if (entering) return;
    entering = true;
    const door = document.createElement('div');
    door.className = 'door';
    stage.appendChild(door);
    setTimeout(() => { show('world'); door.classList.add('out'); }, 1000);
    setTimeout(() => { door.remove(); entering = false; }, 2000);
  }

  function resetAttract() {
    timers.forEach(clearTimeout);
    timers = [];
    roaring = false;
    $('#attract').classList.remove('roar', 'flashing');
    stage.classList.remove('shake');
    intro.pause();
    intro.currentTime = 0;
  }

  $('#attract').addEventListener('click', e => { if (!e.target.closest('.skip')) wake(); });
  $('#attract .skip').addEventListener('click', enterWorld);

  // ---------- Videos que se reproducen al desplazarse ----------
  const seen = new IntersectionObserver(entries => entries.forEach(({ target: v, isIntersecting }) => {
    if (isIntersecting && v.closest('.screen.active') && !player.classList.contains('open')) {
      if (!v.getAttribute('src')) v.src = v.dataset.src;
      v.play().catch(() => {});
    } else v.pause();
  }), { threshold: .45 });
  const watch = root => $$('video[data-src]', root).forEach(v => seen.observe(v));
  seen.observe($('#clLoop'));

  // ---------- 2 · Portales ----------
  CLUSTERS.forEach((c, i) => {
    const b = document.createElement('button');
    b.className = 'portal';
    b.innerHTML = `<div class="in"><img src="${c.cover}" alt=""><span class="go">→</span><span class="name">${c.title.join('<br>')}</span></div>`;
    b.addEventListener('click', () => { b.classList.add('pulse'); setTimeout(() => { b.classList.remove('pulse'); openCluster(i); }, 300); });
    $('#portals').appendChild(b);
  });

  $('#marquee').innerHTML = [...CLIENTS, ...CLIENTS].map(n => `<span>${n}</span>`).join('');

  // ---------- 3 · Interior del cluster ----------
  const dots = $('#dots');
  CLUSTERS.forEach((c, i) => {
    const d = document.createElement('button');
    d.addEventListener('click', () => openCluster(i, i > clIndex ? 1 : -1));
    dots.appendChild(d);
  });

  function renderCluster(i) {
    const c = CLUSTERS[i];
    $('#clCover').src = c.cover;
    $('#clTitle').innerHTML = `${c.title[0]}<span><em>${c.title[1]}</em></span>`;
    $('#clTag').textContent = c.tagline;
    $('#clDesc').textContent = c.desc;
    const loop = $('#clLoop');
    if (loop.dataset.src !== c.loop) { loop.pause(); loop.removeAttribute('src'); loop.dataset.src = c.loop; loop.load(); }
    $('#playReel').onclick = () => openPlayer({ iframe: c.reel + '?autoplay=1&title=0&byline=0&portrait=0', brand: 'Reel', title: c.title.join(' ') });

    $('#clServices').innerHTML = c.services.map(([h, b, img]) => `<button class="svc">
      <div class="th${img ? '' : ' none'}"${img ? ` style="background-image:url('${img}')"` : ''}></div>
      <div class="tx"><div class="h">${h}<i>+</i></div><div class="b">${b}</div></div></button>`).join('');
    $$('#clServices .svc').forEach(s => s.addEventListener('click', () => {
      const open = s.classList.contains('open');
      $$('#clServices .svc').forEach(o => o.classList.remove('open'));
      if (!open) s.classList.add('open');
    }));

    const cases = $('#clCases');
    cases.innerHTML = c.cases.map((k, j) => `<button class="case bezel" data-j="${j}"><div class="in">
      <div class="ph" style="background-image:url('${k.poster}')"><video muted loop playsinline preload="none" poster="${k.poster}" data-src="${k.video}"></video></div>
      <div class="t"><div class="brand">${k.brand}</div><h3>${k.title}</h3></div></div></button>`).join('');
    cases.scrollLeft = 0;
    watch(cases);
    $$('.case', cases).forEach(el => el.addEventListener('click', () => {
      const k = c.cases[+el.dataset.j];
      openPlayer({ video: k.video, brand: k.brand, title: k.title, text: k.text, stat: k.stat });
    }));

    const n = CLUSTERS[(i + 1) % CLUSTERS.length];
    $('#nextCl').innerHTML = `<button class="bezel"><div class="in"><img src="${n.cover}" alt=""><div><small>Siguiente portal</small><strong>${n.title.join('<br>')}</strong></div><i>→</i></div></button>`;
    $('#nextCl button').onclick = () => openCluster((i + 1) % CLUSTERS.length, 1);

    $$('button', dots).forEach((d, j) => d.classList.toggle('on', j === i));
    $('#clScroll').scrollTop = 0;
  }

  function openCluster(i, dir = 0) {
    const scroll = $('#clScroll');
    if (current === 'cluster' && dir) {
      scroll.classList.add(dir > 0 ? 'leave-l' : 'leave-r');
      setTimeout(() => {
        clIndex = i; renderCluster(i);
        scroll.style.transition = 'none';
        scroll.classList.remove('leave-l', 'leave-r');
        scroll.classList.add(dir > 0 ? 'leave-r' : 'leave-l');
        void scroll.offsetWidth;
        scroll.style.transition = '';
        scroll.classList.remove('leave-l', 'leave-r');
      }, 420);
    } else {
      clIndex = i;
      renderCluster(i);
      show('cluster');
    }
  }

  // Deslizar a los lados para cambiar de cluster
  let sx = 0, sy = 0, st = 0, fromCases = false;
  $('#cluster').addEventListener('pointerdown', e => { sx = e.clientX; sy = e.clientY; st = Date.now(); fromCases = !!e.target.closest('.cases'); });
  $('#cluster').addEventListener('pointerup', e => {
    if (fromCases) return;
    const dx = (e.clientX - sx) / scale, dy = (e.clientY - sy) / scale;
    if (Math.abs(dx) > 140 && Math.abs(dx) > Math.abs(dy) * 1.6 && Date.now() - st < 700) {
      const dir = dx < 0 ? 1 : -1;
      openCluster((clIndex + dir + CLUSTERS.length) % CLUSTERS.length, dir);
    }
  });

  // ---------- 4 · Cierre ----------
  $('#steps').innerHTML = STEPS.map(([b, s, img], i) => `<div class="step glass" style="animation-delay:${.15 + i * .14}s"><img src="${img}" alt=""><b>${b}</b><span>${s}</span></div>`).join('');
  if (window.qrcode) {
    const q = qrcode(0, 'M');
    q.addData('https://wonderlust.live');
    q.make();
    $('#qr').innerHTML = q.createSvgTag({ cellSize: 6, margin: 0, scalable: true });
  }

  $$('[data-go]').forEach(b => b.addEventListener('click', () => show(b.dataset.go)));

  // ---------- Reproductor ----------

  function openPlayer(o) {
    if (o.iframe) {
      media.innerHTML = `<iframe src="${o.iframe}" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    } else {
      media.innerHTML = `<video src="${o.video}" playsinline autoplay loop></video>`;
      const v = $('video', media);
      v.addEventListener('loadedmetadata', () => { v.className = v.videoHeight > v.videoWidth ? 'v' : 'h'; });
      v.addEventListener('click', () => v.paused ? v.play() : v.pause());
    }
    $('#playerCopy').innerHTML = `<div class="brand">${o.brand || ''}</div><h3>${o.title || ''}</h3>${o.text ? `<p>${o.text}</p>` : ''}${o.stat ? `<div class="st"><b>${o.stat[0]}</b><span>${o.stat[1]}</span></div>` : ''}`;
    player.classList.add('open');
    $$('.screen.active video').forEach(v => v.pause());
  }

  function closePlayer() {
    player.classList.remove('open');
    $$('video[data-src]').forEach(v => { seen.unobserve(v); seen.observe(v); });
    setTimeout(() => { if (!player.classList.contains('open')) media.innerHTML = ''; }, 500);
    syncVideos();
  }
  $('#playerClose').addEventListener('click', closePlayer);

  // ---------- Onda dorada en cada toque ----------
  stage.addEventListener('pointerdown', e => {
    const r = stage.getBoundingClientRect();
    const fx = document.createElement('div');
    fx.className = 'tap-fx';
    fx.style.left = (e.clientX - r.left) / scale + 'px';
    fx.style.top = (e.clientY - r.top) / scale + 'px';
    $('#fx').appendChild(fx);
    setTimeout(() => fx.remove(), 750);
  }, true);

  // ---------- Volver a la espera si nadie toca ----------
  let idle;
  function bump() {
    clearTimeout(idle);
    idle = setTimeout(() => { if (current !== 'attract' || player.classList.contains('open')) { closePlayer(); show('attract'); } }, IDLE_SECONDS * 1000);
  }
  ['pointerdown', 'scroll', 'touchmove'].forEach(ev => document.addEventListener(ev, bump, { capture: true, passive: true }));
  bump();

  // Evita el menú contextual y el zoom en el tótem
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('gesturestart', e => e.preventDefault());
})();
