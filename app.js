(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const stage = $('#stage');
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
    if (id === 'world') $('#world').scrollTop = 0;
  }

  // Solo suenan/reproducen los videos de la pantalla visible
  function syncVideos() {
    $$('.screen video').forEach(v => {
      const on = v.closest('.screen').id === current && v.id !== 'dino';
      if (on && v.src) v.play().catch(() => {});
      else if (v.id !== 'dino') v.pause();
    });
  }

  // ---------- 1 · El rugido ----------
  const dino = $('#dino');
  const roars = ['assets/sfx/roar1.mp3', 'assets/sfx/roar2.mp3'].map(src => { const a = new Audio(src); a.preload = 'auto'; return a; });
  let roaring = false;
  let timers = [];

  function wake() {
    if (roaring) return;
    roaring = true;
    const att = $('#attract');
    att.classList.add('roar');
    dino.currentTime = 0;
    dino.play().catch(() => {});
    const roar = roars[Math.floor(Math.random() * roars.length)];
    timers.push(setTimeout(() => { roar.currentTime = 0; roar.play().catch(() => {}); }, 350));
    timers.push(setTimeout(() => { stage.classList.remove('shake'); void stage.offsetWidth; stage.classList.add('shake'); }, 550));
    timers.push(setTimeout(enterWorld, 5600));
  }

  function enterWorld() {
    const door = document.createElement('div');
    door.className = 'door';
    stage.appendChild(door);
    setTimeout(() => { show('world'); door.classList.add('out'); }, 1000);
    setTimeout(() => door.remove(), 2000);
  }

  function resetAttract() {
    timers.forEach(clearTimeout);
    timers = [];
    roaring = false;
    $('#attract').classList.remove('roar');
    stage.classList.remove('shake');
    dino.pause();
    dino.currentTime = 0;
  }

  $('#attract').addEventListener('pointerdown', wake);

  // Los objetos salen del agua y se hunden: se repite solo el tramo en que están arriba
  const WIN = [1.8, 6.0];
  document.addEventListener('timeupdate', e => {
    const v = e.target;
    if (v.classList && v.classList.contains('obj') && (v.currentTime > WIN[1] || v.currentTime < WIN[0] - .05)) v.currentTime = WIN[0];
  }, true);
  document.addEventListener('ended', e => { if (e.target.classList.contains('obj')) { e.target.currentTime = WIN[0]; e.target.play(); } }, true);

  // ---------- 2 · Portales ----------
  const portals = $('#portals');
  CLUSTERS.forEach((c, i) => {
    const b = document.createElement('button');
    b.className = 'portal';
    b.style.setProperty('--c', c.color);
    b.innerHTML = `<div class="halo"></div><div class="beam"></div><div class="pool"></div>
      <video class="obj" muted playsinline autoplay src="${c.obj}" style="--oy:${c.objY}px"></video>
      <span class="num">${c.num}</span><span class="go">→</span>
      <span class="name">${c.title.join('<br>')}</span>`;
    b.addEventListener('click', () => { b.classList.add('pulse'); setTimeout(() => { b.classList.remove('pulse'); openCluster(i); }, 260); });
    portals.appendChild(b);
  });

  $('#marquee').innerHTML = [...CLIENTS, ...CLIENTS].map(n => `<span>${n}</span>`).join('');

  // ---------- 3 · Interior del cluster ----------
  const dots = $('#dots');
  CLUSTERS.forEach((c, i) => {
    const d = document.createElement('button');
    d.addEventListener('click', () => openCluster(i));
    dots.appendChild(d);
  });

  function renderCluster(i) {
    const c = CLUSTERS[i];
    const sec = $('#cluster');
    sec.style.setProperty('--c', c.color);
    $('#clNum').textContent = c.num;
    $('#clTitle').innerHTML = `${c.title[0]}<span>${c.title[1]}</span>`;
    $('#clTag').textContent = c.tagline;
    $('#clDesc').textContent = c.desc;
    $('#recName').textContent = c.title.join(' ').replace('&', 'y');
    setVideo($('#clObj'), c.obj);
    $('#clObj').style.setProperty('--oy', c.objY * 1.2 + 'px');
    setVideo($('#clLoop'), c.loop);
    $('#playReel').onclick = () => openPlayer({ iframe: c.reel + '?autoplay=1&title=0&byline=0&portrait=0', brand: `Cluster ${c.num}`, title: c.title.join(' '), color: c.color });

    $('#clServices').innerHTML = c.services.map(([h, b]) => `<button class="svc"><div class="h">${h}<i>+</i></div><div class="b">${b}</div></button>`).join('');
    $$('#clServices .svc').forEach(s => s.addEventListener('click', () => {
      const open = s.classList.contains('open');
      $$('#clServices .svc').forEach(o => o.classList.remove('open'));
      if (!open) s.classList.add('open');
    }));

    const cases = $('#clCases');
    cases.innerHTML = c.cases.map((k, j) => `<button class="case" data-j="${j}">
      <div class="ph" style="background-image:url('${k.poster}')"></div>
      <div class="t"><div class="brand">${k.brand}</div><h3>${k.title}</h3></div></button>`).join('');
    cases.scrollLeft = 0;
    $$('.case', cases).forEach(el => el.addEventListener('click', () => {
      const k = c.cases[+el.dataset.j];
      openPlayer({ video: k.video, brand: k.brand, title: k.title, text: k.text, stat: k.stat, color: c.color });
    }));

    const n = CLUSTERS[(i + 1) % CLUSTERS.length];
    $('#nextCl').innerHTML = `<button style="--nc:${n.color}"><div><small>Siguiente portal</small><strong>${n.title.join('<br>')}</strong></div><i>→</i></button>`;
    $('#nextCl button').onclick = () => openCluster((i + 1) % CLUSTERS.length, 1);

    $$('button', dots).forEach((d, j) => d.classList.toggle('on', j === i));
    $('#clScroll').scrollTop = 0;
  }

  function setVideo(v, src) {
    if (v.getAttribute('src') === src) return;
    v.src = src;
    v.load();
    v.play().catch(() => {});
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
  $('#steps').innerHTML = STEPS.map(([b, s], i) => `<div class="step" style="animation-delay:${.15 + i * .12}s"><div class="orb"></div><div><b>${b}</b><span>${s}</span></div></div>`).join('');
  if (window.qrcode) {
    const q = qrcode(0, 'M');
    q.addData('https://wonderlust.live');
    q.make();
    $('#qr').innerHTML = q.createSvgTag({ cellSize: 6, margin: 0, scalable: true });
  }

  $$('[data-go]').forEach(b => b.addEventListener('click', () => show(b.dataset.go)));

  // ---------- Reproductor ----------
  const player = $('#player');
  const media = $('#playerMedia');

  function openPlayer(o) {
    player.style.setProperty('--c', o.color);
    if (o.iframe) {
      media.innerHTML = `<iframe src="${o.iframe}" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
      player.classList.add('horizontal');
    } else {
      media.innerHTML = `<video src="${o.video}" playsinline autoplay loop></video>`;
      const v = $('video', media);
      v.addEventListener('loadedmetadata', () => {
        const vertical = v.videoHeight > v.videoWidth;
        v.className = vertical ? 'v' : 'h';
        player.classList.toggle('horizontal', !vertical);
      });
      v.addEventListener('click', () => v.paused ? v.play() : v.pause());
    }
    $('#playerCopy').innerHTML = `<div class="brand">${o.brand || ''}</div><h3>${o.title || ''}</h3>${o.text ? `<p>${o.text}</p>` : ''}${o.stat ? `<div class="st"><b>${o.stat[0]}</b><span>${o.stat[1]}</span></div>` : ''}`;
    player.classList.add('open');
    $$('.screen.active video').forEach(v => v.pause());
  }

  function closePlayer() {
    player.classList.remove('open');
    setTimeout(() => { if (!player.classList.contains('open')) media.innerHTML = ''; }, 400);
    syncVideos();
  }
  $('#playerClose').addEventListener('click', closePlayer);

  // ---------- Onda de luz en cada toque ----------
  stage.addEventListener('pointerdown', e => {
    const r = stage.getBoundingClientRect();
    const fx = document.createElement('div');
    fx.className = 'tap-fx';
    fx.style.left = (e.clientX - r.left) / scale + 'px';
    fx.style.top = (e.clientY - r.top) / scale + 'px';
    if (current === 'cluster') fx.style.setProperty('--tc', CLUSTERS[clIndex].color);
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
