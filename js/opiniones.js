/**
 * Solo testimonios verificados y aprobados para publicar por Luxor.
 * Estructura esperada (documentación, no un testimonio real):
 * { id: 'identificador-unico', nombre: 'Nombre autorizado',
 *   texto: 'Testimonio verificado', fuente: 'Facebook',
 *   url: 'URL pública de la opinión, si está disponible' }
 * Omitir url o usar '' si no existe enlace público confirmado.
 */
export const opiniones = [];

// Aceptar únicamente enlaces HTTPS públicos de Facebook, nunca javascript: u otros sitios.
const enlaceFacebookSeguro = (value) => {
  try {
    const url = new URL(value);
    const host = url.hostname;
    return url.protocol === 'https:' && !url.username && !url.password
      && (host === 'facebook.com' || host.endsWith('.facebook.com')) ? url.href : null;
  } catch { return null; }
};

export const renderOpiniones = (datos) => {
  const list = document.querySelector('#lista-opiniones');
  const empty = document.querySelector('#opiniones-vacio');
  if (!list || !empty) return;
  const valid = datos.filter((opinion) => opinion && ['id', 'nombre', 'texto'].every(
    (key) => typeof opinion[key] === 'string' && opinion[key].trim()
  ) && opinion.fuente === 'Facebook');
  const cards = valid.map((opinion) => {
    const item = document.createElement('li');
    const figure = document.createElement('figure');
    figure.className = 'review-card';
    const quote = document.createElement('blockquote');
    const text = document.createElement('p');
    text.textContent = opinion.texto;
    quote.append(text);
    const author = document.createElement('figcaption');
    const name = document.createElement('strong');
    name.textContent = opinion.nombre;
    const source = document.createElement('span');
    source.textContent = `Recomendación en ${opinion.fuente}`;
    author.append(name, source);
    const url = enlaceFacebookSeguro(opinion.url);
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Ver recomendación original';
      link.setAttribute('aria-label', `Ver recomendación de ${opinion.nombre} en Facebook (abre en otra pestaña)`);
      author.append(link);
    }
    figure.append(quote, author);
    item.append(figure);
    return item;
  });
  list.replaceChildren(...cards);
  list.hidden = cards.length === 0;
  empty.hidden = cards.length > 0;
};
