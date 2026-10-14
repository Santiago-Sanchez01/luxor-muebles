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
      const destination = document.querySelector(link.getAttribute('href'));
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
