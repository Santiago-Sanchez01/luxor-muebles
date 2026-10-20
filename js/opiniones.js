// Transcripciones suministradas por el responsable. Publicación autorizada expresamente por el responsable.
export const opiniones = [
  {
    "id": "facebook-original-01",
    "texto": "Los productos son de primerísima calidad y al mejor precio de la Patagonia. la atención es increíble, mucha paciencia y todo el asesoramiento necesario para comprar el mejor sillón💕",
    "fuente": "Recomendación pública en Facebook",
    "fecha": "2025-08-02",
    "aprobada": true
  },
  {
    "id": "facebook-original-02",
    "texto": "Hermosos muebles e increíbles precios!!!!",
    "fuente": "Recomendación pública en Facebook",
    "fecha": "2025-08-01",
    "aprobada": true
  },
  {
    "id": "facebook-original-03",
    "texto": "Excelentes precios y calidad! Me encanta la variedad que siempre ofrece",
    "fuente": "Recomendación pública en Facebook",
    "fecha": "2025-07-09",
    "aprobada": true
  },
  {
    "id": "facebook-original-04",
    "texto": "Hermoso todo lo que tienen muy recomendable 💕",
    "fuente": "Recomendación pública en Facebook",
    "fecha": "2025-07-09",
    "aprobada": true
  },
  {
    "id": "facebook-original-05",
    "texto": "muy hermosos productos ...😍",
    "fuente": "Recomendación pública en Facebook",
    "fecha": "2024-09-01",
    "aprobada": true
  },
  {
    "id": "facebook-original-06",
    "texto": "me gustan los productos de @luxor Muebles 🤩",
    "fuente": "Recomendación pública en Facebook",
    "fecha": "2024-09-01",
    "aprobada": true
  },
  {
    "id": "facebook-original-07",
    "texto": "Calidad, muy lindos productos",
    "fuente": "Recomendación pública en Facebook",
    "fecha": "2024-08-31",
    "aprobada": true
  },
  {
    "id": "facebook-original-08",
    "texto": "Muy buena Atención y los productos uno más lindo que el otro.! 😍😍",
    "fuente": "Recomendación pública en Facebook",
    "fecha": "2024-04-02",
    "aprobada": true
  },
  {
    "id": "facebook-original-09",
    "texto": "Excelente atención, precio y calidad de productos",
    "fuente": "Recomendación pública en Facebook",
    "fecha": "2024-04-02",
    "aprobada": true
  },
  {
    "id": "facebook-original-10",
    "texto": "muy buena atención y calidad de productos",
    "fuente": "Recomendación pública en Facebook",
    "fecha": "2024-04-02",
    "aprobada": true
  }
];

// Aceptar únicamente enlaces HTTPS públicos de Facebook, nunca javascript: u otros sitios.
const enlaceFacebookSeguro = (value) => {
  try {
    const url = new URL(value);
    const host = url.hostname;
    return url.protocol === 'https:' && !url.username && !url.password
      && (host === 'facebook.com' || host.endsWith('.facebook.com')) ? url.href : null;
  } catch { return null; }
};

let limpiarCarrusel = () => {};
// Conservar la decisión durante esta sesión de página, incluso si se vuelve a renderizar.
let pausaSolicitada = false;

export const renderOpiniones = (datos) => {
  const list = document.querySelector('#lista-opiniones');
  const empty = document.querySelector('#opiniones-vacio');
  const carousel = document.querySelector('#opiniones-carrusel');
  const controls = document.querySelector('#opiniones-controles');
  if (!list || !empty || !carousel || !controls) return;
  limpiarCarrusel();
  const events = new AbortController();
  let settleTimer;
  let resizeObserver;
  let timer;
  let observer;
  limpiarCarrusel = () => {
    events.abort(); clearTimeout(timer); clearTimeout(settleTimer); observer?.disconnect(); resizeObserver?.disconnect();
  };
  const ids = new Set();
  const valid = (Array.isArray(datos) ? datos : []).filter((opinion) => {
    const allowed = opinion?.aprobada === true && ['id', 'texto'].every(
    (key) => typeof opinion[key] === 'string' && opinion[key].trim()
    ) && !ids.has(opinion.id);
    if (allowed) ids.add(opinion.id);
    return allowed;
  });
  const cards = valid.map((opinion) => {
    const item = document.createElement('li');
    const figure = document.createElement('figure');
    figure.className = 'review-card review-carousel-card';
    const quote = document.createElement('blockquote');
    const text = document.createElement('p');
    text.textContent = opinion.texto;
    quote.append(text);
    const author = document.createElement('figcaption');
    const source = document.createElement('span');
    source.textContent = 'Recomendación pública en Facebook';
    author.append(source);
    if (typeof opinion.fecha === 'string' && /^\d{4}-\d{2}(-\d{2})?$/.test(opinion.fecha)) {
      const monthOnly = opinion.fecha.length === 7;
      const completeDate = monthOnly ? `${opinion.fecha}-01` : opinion.fecha;
      const date = new Date(`${completeDate}T00:00:00Z`);
      if (!Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === completeDate) {
        const time = document.createElement('time');
        time.dateTime = opinion.fecha;
        const formatted = new Intl.DateTimeFormat('es-AR', {
          month: 'long', year: 'numeric', timeZone: 'UTC',
        }).format(date);
        time.textContent = formatted.charAt(0).toLocaleUpperCase('es-AR') + formatted.slice(1);
        author.append(time);
      }
    }
    const url = enlaceFacebookSeguro(opinion.url);
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Ver recomendación original';
      link.setAttribute('aria-label', 'Ver recomendación original en Facebook (abre en otra pestaña)');
      author.append(link);
    }
    figure.append(quote);
    if (author.childElementCount) figure.append(author);
    item.append(figure);
    return item;
  });
  list.replaceChildren(...cards);
  carousel.hidden = cards.length === 0;
  controls.hidden = cards.length < 2;
  const hint = document.querySelector('#opiniones-ayuda');
  if (hint) hint.hidden = cards.length < 2;
  empty.hidden = cards.length > 0;
  const counter = document.querySelector('#opinion-posicion');
  const announcement = document.querySelector('#opiniones-anuncio');
  const pauseButton = document.querySelector('#opiniones-pausa');
  announcement.textContent = '';
  counter.textContent = '';
  if (!cards.length) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let selected = 0;
  let visible = false;
  let touching = false;
  let dragging = null;
  let scrolling = false;
  let manual = false;
  let suppressClick = false;
  const listen = (node, type, callback, options = {}) =>
    node.addEventListener(type, callback, { ...options, signal: events.signal });
  // Medir la posición real evita errores por redondeos de offsetLeft en columnas fraccionarias.
  const slideLeft = (card) => card.getBoundingClientRect().left - list.getBoundingClientRect().left + list.scrollLeft;
  const nearest = () => cards.reduce((best, card, i) =>
    Math.abs(slideLeft(card) - list.scrollLeft) < Math.abs(slideLeft(cards[best]) - list.scrollLeft) ? i : best, 0);
  const updateCurrent = (index) => {
    if (index !== selected && cards[selected].contains(document.activeElement)) list.focus({ preventScroll: true });
    selected = index;
    cards.forEach((card, i) => {
      card.classList.toggle('is-current', i === selected);
      card.setAttribute('aria-hidden', String(i !== selected));
      card.inert = i !== selected;
    });
    counter.textContent = `${String(selected + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    counter.setAttribute('aria-label', `Recomendación ${selected + 1} de ${cards.length}`);
  };
  const syncRotation = () => {
    clearTimeout(timer);
    if (events.signal.aborted) return;
    pauseButton.disabled = motion.matches;
    pauseButton.textContent = motion.matches ? 'Rotación desactivada' : pausaSolicitada ? 'Reanudar opiniones' : 'Pausar opiniones';
    if (cards.length < 2 || pausaSolicitada || motion.matches || document.hidden || !visible
      || touching || dragging || scrolling || carousel.contains(document.activeElement)) return;
    timer = setTimeout(() => goTo(selected + 1, false), 4000);
  };
  const settle = () => {
    clearTimeout(settleTimer);
    if (events.signal.aborted || touching || dragging) return;
    const index = nearest();
    const left = slideLeft(cards[index]);
    if (Math.abs(list.scrollLeft - left) > 0.75) {
      list.scrollTo({ left, behavior: 'instant' });
    }
    updateCurrent(index);
    scrolling = false;
    if (manual) announcement.textContent = `Recomendación ${selected + 1} de ${cards.length}`;
    manual = false;
    syncRotation();
  };
  const scheduleSettle = () => {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(settle, 160);
  };
  const goTo = (index, byUser = true, instant = false) => {
    const target = (index + cards.length) % cards.length;
    manual = byUser;
    scrolling = true;
    clearTimeout(timer);
    // El retorno circular evita recorrer rápidamente las diez tarjetas.
    const wraps = Math.abs(target - selected) > 1;
    list.scrollTo({ left: slideLeft(cards[target]), behavior: motion.matches || instant || wraps ? 'instant' : 'smooth' });
    if (motion.matches || instant || wraps) updateCurrent(target);
    scheduleSettle();
  };
  cards.forEach((card, i) => card.setAttribute('aria-label', `Recomendación ${i + 1} de ${cards.length}`));
  list.scrollTo({ left: 0, behavior: 'instant' });
  updateCurrent(0);
  if (cards.length < 2) return;
  listen(pauseButton, 'click', () => {
    pausaSolicitada = !pausaSolicitada;
    if (pausaSolicitada) goTo(selected, false, true);
    syncRotation();
  });
  listen(carousel, 'keydown', (event) => {
    if (event.target.closest('a') || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    goTo(event.key === 'Home' ? 0 : event.key === 'End' ? cards.length - 1 : selected + (event.key === 'ArrowLeft' ? -1 : 1));
  });
  listen(list, 'scroll', () => {
    scrolling = true;
    clearTimeout(timer);
    updateCurrent(nearest());
    scheduleSettle();
  }, { passive: true });
  listen(list, 'scrollend', settle);
  listen(list, 'wheel', (event) => {
    if (Math.abs(event.deltaX) > 0) { manual = true; clearTimeout(timer); scheduleSettle(); }
    // La rueda vertical conserva su comportamiento nativo.
  }, { passive: true });
  listen(list, 'touchstart', () => { touching = true; manual = true; clearTimeout(timer); }, { passive: true });
  const endTouch = () => { touching = false; scheduleSettle(); };
  listen(list, 'touchend', endTouch, { passive: true });
  listen(list, 'touchcancel', endTouch, { passive: true });
  listen(list, 'pointerdown', (event) => {
    // El contenido textual y los enlaces conservan selección y clic nativos.
    if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('blockquote, figcaption, a, button')) return;
    event.preventDefault();
    dragging = { id: event.pointerId, x: event.clientX, y: event.clientY, left: list.scrollLeft, active: false };
    clearTimeout(timer);
  });
  listen(window, 'pointermove', (event) => {
    if (!dragging || event.pointerId !== dragging.id) return;
    const dx = event.clientX - dragging.x;
    const dy = event.clientY - dragging.y;
    if (!dragging.active && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      dragging.active = true;
      manual = true;
      list.classList.add('is-dragging');
      list.setPointerCapture(event.pointerId);
    }
    if (dragging.active) { event.preventDefault(); list.scrollLeft = dragging.left - dx; }
  });
  const endDrag = (event) => {
    if (!dragging || event.pointerId !== dragging.id) return;
    const active = dragging.active;
    dragging = null;
    if (list.hasPointerCapture(event.pointerId)) list.releasePointerCapture(event.pointerId);
    list.classList.remove('is-dragging');
    if (active) {
      suppressClick = true;
      // Se restablece tras el clic generado por este mismo gesto.
      setTimeout(() => { suppressClick = false; }, 0);
      goTo(nearest());
    } else scheduleSettle();
  };
  listen(window, 'pointerup', endDrag);
  listen(window, 'pointercancel', endDrag);
  listen(list, 'click', (event) => {
    if (suppressClick) { event.preventDefault(); event.stopPropagation(); }
  }, { capture: true });
  listen(carousel, 'focusin', () => { goTo(selected, false, true); syncRotation(); });
  listen(carousel, 'focusout', () => queueMicrotask(syncRotation));
  listen(document, 'visibilitychange', () => {
    if (document.hidden) goTo(selected, false, true);
    syncRotation();
  });
  listen(motion, 'change', () => {
    if (motion.matches) goTo(selected, false, true);
    syncRotation();
  });
  if ('ResizeObserver' in window) {
    let width = list.clientWidth;
    resizeObserver = new ResizeObserver(() => {
      if (width === list.clientWidth) return;
      width = list.clientWidth;
      goTo(selected, false, true);
    });
    resizeObserver.observe(list);
  }
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) goTo(selected, false, true);
      syncRotation();
    });
    observer.observe(carousel);
  }
  // Sin observador se mantiene la navegación manual, sin autoplay fuera de pantalla.
  syncRotation();
};
