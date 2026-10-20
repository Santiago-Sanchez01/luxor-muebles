import { crearEnlaceWhatsApp, consultaGeneral } from './config.js';

// Inicialización compartida por homepage y fichas, sin duplicar la configuración.
export const iniciarEnlacesComunes = () => {
  const footerYear = document.querySelector('#footer-year');
  if (footerYear) {
    footerYear.textContent = ` · ${new Date().getFullYear()}`;
    footerYear.hidden = false;
  }
  document.querySelectorAll('[data-whatsapp]').forEach((link) => {
    link.href = crearEnlaceWhatsApp(consultaGeneral);
    link.hidden = false;
  });
};
