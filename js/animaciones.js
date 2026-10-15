// Mejora progresiva: nunca ocultar contenido si falta alguna API necesaria.
export const iniciarAnimaciones = () => {
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const selector = '.product-card, .review-card, .personalization-steps li, .about-heading, .about-story, .contact-heading, .contact-conversation, .product-detail-info';
  const seen = new WeakSet();
  const pending = new Set();
  const active = new Map();

  const finish = (element) => {
    observer.unobserve(element);
    pending.delete(element);
    element.classList.remove('reveal-pending');
    active.get(element)?.cancel();
    active.delete(element);
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting || !pending.has(target)) return;
      finish(target);
      if (motion.matches || target.matches(':focus-within')) return;
      const item = target.closest('li');
      const index = item ? [...item.parentElement.children].indexOf(item) : 0;
      const delay = Math.min(Math.max(index, 0), 2) * 60;
      const animation = target.animate(
        [{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 620, delay, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' }
      );
      active.set(target, animation);
      animation.finished.then(() => {
        if (active.get(target) === animation) active.delete(target);
      }).catch(() => { /* Cancelación esperada por foco o movimiento reducido. */ });
    });
  }, { threshold: 0 });

  const revealWithin = (root) => {
    [...pending, ...active.keys()].forEach((element) => {
      if (root === element || root.contains(element)) finish(element);
    });
  };
  const anchorTarget = (hash) => {
    if (!hash) return;
    try {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) revealWithin(target);
    } catch { /* Un fragmento mal codificado no debe interrumpir la página. */ }
  };
  const register = (root) => {
    const elements = [...(root.matches?.(selector) ? [root] : []), ...root.querySelectorAll(selector)];
    elements.forEach((element) => {
      if (seen.has(element)) return;
      seen.add(element);
      if (motion.matches || element.matches(':focus-within')) return;
      observer.observe(element);
      pending.add(element);
      element.classList.add('reveal-pending');
    });
    anchorTarget(window.location.hash);
  };

  register(document);
  // Solo listas dinámicas: búsqueda, destacados, relacionados y opiniones.
  const changes = new MutationObserver((records) => {
    [...pending, ...active.keys()].forEach((element) => {
      if (!element.isConnected) finish(element);
    });
    records.forEach((record) => record.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) register(node);
    }));
  });
  document.querySelectorAll('#lista-productos, #lista-destacados, #lista-relacionados, #lista-opiniones')
    .forEach((list) => changes.observe(list, { childList: true }));

  document.addEventListener('focus', (event) => {
    [...pending, ...active.keys()].forEach((element) => {
      if (element.contains(event.target)) finish(element);
    });
  }, { capture: true });
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (link) anchorTarget(link.hash);
  }, { capture: true });
  window.addEventListener('hashchange', () => anchorTarget(window.location.hash));
  motion.addEventListener('change', () => {
    if (motion.matches) [...pending, ...active.keys()].forEach(finish);
  });
};
