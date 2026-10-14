import { productos } from './productos.js';
import { createProductCard } from './tarjetas.js';
import { opciones, crearSeleccionInicial, generarConsulta } from './opciones.js';
import { crearEnlaceWhatsApp } from './config.js';

// Solo se admite un ID existente: nunca elegir otro producto por defecto.
const id = new URLSearchParams(window.location.search).get('id');
const producto = productos.find((item) => item.id === id);
const heading = document.querySelector('#producto-nombre');
const status = document.querySelector('#producto-estado');

const renderGallery = (item) => {
  const main = document.querySelector('#galeria-principal');
  const controls = document.querySelector('#galeria-controles');
  const thumbnails = document.querySelector('#galeria-miniaturas');
  const galleryStatus = document.querySelector('#galeria-estado');
  // Futuras fotos: imagenes: [{ src: './assets/images/archivo.webp', alt: 'Descripción real' }].
  // También se admite el campo imagen existente, con el nombre del modelo como alt.
  const candidates = item.imagenes ?? (item.imagen ? [{ src: item.imagen, alt: `Modelo ${item.nombre}` }] : []);
  let photos = candidates.filter((photo) => photo && typeof photo.src === 'string'
    && /^(\.\/)?assets\/images\/[\w/-]+\.(webp|png|jpe?g|avif)$/i.test(photo.src)
    && typeof photo.alt === 'string' && photo.alt.trim());
  photos = photos.filter((photo, index) => photos.findIndex((other) => other.src === photo.src) === index);
  let selected = 0;

  const show = () => {
    main.replaceChildren();
    thumbnails.replaceChildren();
    controls.hidden = thumbnails.hidden = photos.length < 2;
    if (!photos.length) {
      const placeholder = document.createElement('div');
      placeholder.className = 'product-placeholder';
      placeholder.textContent = 'Fotografía pendiente';
      main.append(placeholder);
      galleryStatus.textContent = '';
      return;
    }
    selected = Math.min(selected, photos.length - 1);
    const photo = photos[selected];
    const image = document.createElement('img');
    image.alt = photo.alt;
    image.addEventListener('error', () => {
      photos = photos.filter((entry) => entry !== photo);
      show();
    }, { once: true });
    image.src = photo.src;
    main.append(image);
    galleryStatus.textContent = `Fotografía ${selected + 1} de ${photos.length}`;
    if (photos.length > 1) photos.forEach((entry, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'gallery-thumbnail';
      button.setAttribute('aria-label', `Ver fotografía ${index + 1}: ${entry.alt}`);
      button.setAttribute('aria-pressed', String(index === selected));
      const preview = document.createElement('img');
      preview.src = entry.src;
      preview.alt = '';
      preview.addEventListener('error', () => preview.remove(), { once: true });
      button.append(preview);
      const label = document.createElement('span');
      label.textContent = String(index + 1);
      button.append(label);
      button.addEventListener('click', () => {
        selected = index;
        show();
        thumbnails.children[selected]?.focus();
      });
      thumbnails.append(button);
    });
  };
  document.querySelector('#foto-anterior').addEventListener('click', () => {
    selected = (selected - 1 + photos.length) % photos.length;
    show();
  });
  document.querySelector('#foto-siguiente').addEventListener('click', () => {
    selected = (selected + 1) % photos.length;
    show();
  });
  show();
};

const initializePreferences = (item) => {
  const form = document.querySelector('#preferencias-form');
  const controls = document.querySelector('#preferencias-controles');
  const summary = document.querySelector('#seleccion-resumen');
  const queryText = document.querySelector('#consulta-texto');
  const copyStatus = document.querySelector('#copia-estado');
  let selection = crearSeleccionInicial();
  let copyVersion = 0;

  Object.entries(opciones).forEach(([key, group]) => {
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = group.etiqueta;
    fieldset.append(legend);
    group.valores.forEach((value, index) => {
      const label = document.createElement('label');
      label.className = 'preference-option';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = key;
      input.value = value;
      input.checked = input.defaultChecked = index === 0;
      const text = document.createElement('span');
      text.textContent = value;
      label.append(input, text);
      fieldset.append(label);
    });
    controls.append(fieldset);
  });

  const updateSummary = () => {
    const entries = [['Modelo', item.nombre], ...Object.entries(opciones).map(([key, group]) => [group.etiqueta, selection[key]])];
    summary.replaceChildren();
    entries.forEach(([label, value]) => {
      const term = document.createElement('dt');
      const description = document.createElement('dd');
      term.textContent = label;
      description.textContent = value;
      summary.append(term, description);
    });
    queryText.value = generarConsulta(item.nombre, selection);
    const whatsappLink = document.querySelector('#consultar-whatsapp');
    whatsappLink.href = crearEnlaceWhatsApp(queryText.value);
    whatsappLink.hidden = false;
    copyStatus.textContent = '';
    copyVersion += 1;
  };
  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('change', (event) => {
    const input = event.target;
    if (input.matches('input[type="radio"]') && input.checked) {
      selection[input.name] = input.value;
      updateSummary();
    }
  });
  form.addEventListener('reset', () => {
    selection = crearSeleccionInicial();
    updateSummary();
  });

  // Alternativa antigua; si también falla, el texto visible permite copia manual.
  const copyFallback = () => {
    const focused = document.activeElement;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    queryText.focus({ preventScroll: true });
    queryText.select();
    let copied = false;
    try { copied = document.execCommand('copy'); } catch { /* Se ofrecerá copia manual. */ }
    if (copied) {
      focused?.focus({ preventScroll: true });
      window.scrollTo(scrollX, scrollY);
    }
    return copied;
  };
  document.querySelector('#copiar-consulta').addEventListener('click', async () => {
    const version = copyVersion;
    const message = queryText.value;
    copyStatus.textContent = '';
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(message);
        copied = true;
      }
    } catch { /* Probar la alternativa si el navegador deniega el portapapeles. */ }
    if (version !== copyVersion) return;
    if (!copied) copied = copyFallback();
    copyStatus.textContent = copied
      ? 'Consulta copiada. Podés pegarla donde prefieras; no se envió ningún mensaje.'
      : 'No pudimos copiar automáticamente. El texto está seleccionado: copialo con Ctrl+C, Cmd+C o el menú del dispositivo.';
  });
  updateSummary();
};

if (!producto) {
  heading.textContent = 'Producto no encontrado';
  status.textContent = 'No encontramos un modelo con el ID indicado. Volvé al catálogo para elegir un producto.';
  document.title = 'Producto no encontrado | Luxor Muebles';
} else {
  heading.textContent = producto.nombre;
  document.title = `${producto.nombre} | Luxor Muebles`;
  status.hidden = true;
  document.querySelector('#producto-categoria').textContent = producto.categoria;
  document.querySelector('#producto-descripcion').textContent = producto.descripcion;
  const measures = producto.medidasReferencia;
  document.querySelector('#producto-medidas').textContent = measures
    ? `${measures.valores.join(' × ')} ${measures.unidad}.${measures.alturaInformada ? '' : ' Altura no informada.'}`
    : 'Medidas no informadas.';
  renderGallery(producto);
  initializePreferences(producto);
  const related = productos.filter((item) => item.id !== producto.id && item.categoria === producto.categoria).slice(0, 3);
  document.querySelector('#relacionados').hidden = related.length === 0;
  document.querySelector('#lista-relacionados').replaceChildren(...related.map(createProductCard));
  document.querySelector('#producto-detalle').hidden = false;
}
