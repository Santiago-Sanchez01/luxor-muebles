import { productos } from './productos.js';
import { createProductCard } from './tarjetas.js';
import { crearEnlaceWhatsApp, consultaGeneral } from './config.js';
import { opiniones, renderOpiniones } from './opiniones.js';
import { iniciarAnimaciones } from './animaciones.js';

renderOpiniones(opiniones);

const footerYear = document.querySelector('#footer-year');
if (footerYear) {
  footerYear.textContent = ` · ${new Date().getFullYear()}`;
  footerYear.hidden = false;
}

document.querySelectorAll('[data-whatsapp]').forEach((link) => {
  link.href = crearEnlaceWhatsApp(consultaGeneral);
  link.hidden = false;
});

// Navegación progresiva: sin JavaScript los enlaces permanecen visibles.
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navegacion');
const desktopQuery = window.matchMedia('(min-width: 64rem)');

if (header && menuButton && navigation) {
  const setMenuOpen = (open) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    navigation.hidden = !desktopQuery.matches && !open;
  };

  const syncViewport = () => {
    // Evitar dejar el foco dentro de un elemento que se oculta al cambiar de ancho.
    const focusInNav = navigation.contains(document.activeElement);
    const focusOnButton = document.activeElement === menuButton;
    menuButton.hidden = desktopQuery.matches;
    setMenuOpen(false);
    if (!desktopQuery.matches && focusInNav) menuButton.focus();
    if (desktopQuery.matches && focusOnButton) navigation.querySelector('a')?.focus();
  };

  header.classList.add('menu-ready');
  syncViewport();
  desktopQuery.addEventListener('change', syncViewport);

  // Una única medida mantiene coherentes anclas, menú y hero cuando
  // cambia el ancho, la orientación o el tamaño del texto.
  const updateHeaderHeight = () => {
    document.documentElement.style.setProperty(
      '--header-height', `${header.getBoundingClientRect().height}px`
    );
  };
  updateHeaderHeight();
  if ('ResizeObserver' in window) {
    const headerObserver = new ResizeObserver(updateHeaderHeight);
    headerObserver.observe(header);
  } else {
    window.addEventListener('resize', updateHeaderHeight, { passive: true });
  }

  menuButton.addEventListener('click', () => {
    setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  navigation.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    setMenuOpen(false);
    if (!desktopQuery.matches) {
      const href = link.getAttribute('href');
      const destination = href.startsWith('#') ? document.querySelector(href) : null;
      if (destination) {
        // Llevar también el foco al destino, sin otro desplazamiento de página.
        destination.setAttribute('tabindex', '-1');
        destination.focus({ preventScroll: true });
      }
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  const updateScrollState = () => header.classList.toggle('is-scrolled', window.scrollY > 16);
  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });
}


// Catálogo: crear nodos y usar textContent evita interpretar los datos como HTML.
const productList = document.querySelector('#lista-productos');
const searchInput = document.querySelector('#buscar-productos');
const categorySelect = document.querySelector('#categoria-productos');
const normalizeText = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es-AR').trim();

if (productList && searchInput && categorySelect) {
  const count = document.querySelector('#catalogo-cantidad');
  const announcement = document.querySelector('#catalogo-anuncio');
  const empty = document.querySelector('#catalogo-vacio');
  let announcementTimer;

  [...new Set(productos.map((producto) => producto.categoria))].forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.append(option);
  });

  const renderCatalogue = (announce = false) => {
    const query = normalizeText(searchInput.value);
    const results = productos.filter((producto) =>
      normalizeText(producto.nombre).includes(query)
      && (!categorySelect.value || producto.categoria === categorySelect.value)
    );
    productList.replaceChildren(...results.map(createProductCard));
    productList.hidden = results.length === 0;
    empty.hidden = results.length !== 0;
    count.hidden = false;
    count.textContent = `${results.length} ${results.length === 1 ? 'modelo encontrado' : 'modelos encontrados'}`;
    clearTimeout(announcementTimer);
    // El listado cambia inmediatamente; anunciar solo al terminar de escribir.
    if (announce) {
      const message = `${count.textContent}. Categoría: ${categorySelect.value || 'Todos'}.${searchInput.value.trim() ? ` Búsqueda: ${searchInput.value.trim()}.` : ''}`;
      announcementTimer = setTimeout(() => {
        announcement.textContent = message;
      }, 350);
    }
  };

  document.querySelector('#catalogo-controles').hidden = false;
  searchInput.addEventListener('input', () => renderCatalogue(true));
  categorySelect.addEventListener('change', () => renderCatalogue(true));
  renderCatalogue();
}

// Destacados: mismos datos y tarjetas, con desplazamiento nativo y sin autoplay.
const featuredTrack = document.querySelector('#lista-destacados');
if (featuredTrack) {
  featuredTrack.replaceChildren(...productos.filter((producto) => producto.destacado).map(createProductCard));
  const controls = document.querySelector('#controles-destacados');
  const previous = document.querySelector('#destacados-anterior');
  const next = document.querySelector('#destacados-siguiente');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const updateCarousel = () => {
    const maximum = featuredTrack.scrollWidth - featuredTrack.clientWidth;
    controls.hidden = maximum <= 1;
    // aria-disabled conserva el foco al llegar al extremo con un control.
    previous.setAttribute('aria-disabled', String(featuredTrack.scrollLeft <= 1));
    next.setAttribute('aria-disabled', String(featuredTrack.scrollLeft >= maximum - 1));
  };

  const moveCarousel = (direction) => {
    const card = featuredTrack.firstElementChild;
    if (!card) return;
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(featuredTrack).columnGap);
    featuredTrack.scrollBy({ left: step * direction, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  };
  previous.addEventListener('click', () => {
    if (previous.getAttribute('aria-disabled') !== 'true') moveCarousel(-1);
  });
  next.addEventListener('click', () => {
    if (next.getAttribute('aria-disabled') !== 'true') moveCarousel(1);
  });
  featuredTrack.addEventListener('keydown', (event) => {
    if (event.target !== featuredTrack) return;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      moveCarousel(event.key === 'ArrowLeft' ? -1 : 1);
    } else {
      featuredTrack.scrollTo({ left: event.key === 'Home' ? 0 : featuredTrack.scrollWidth, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    }
  });
  featuredTrack.addEventListener('scroll', updateCarousel, { passive: true });
  if ('ResizeObserver' in window) {
    const carouselObserver = new ResizeObserver(updateCarousel);
    carouselObserver.observe(featuredTrack);
  } else {
    window.addEventListener('resize', updateCarousel, { passive: true });
  }
  updateCarousel();
}

iniciarAnimaciones();
