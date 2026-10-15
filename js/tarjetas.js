import { obtenerImagenes } from './imagenes.js';

export const createProductCard = (producto) => {
  const item = document.createElement('li');
  const card = document.createElement('article');
  card.className = 'product-card';

  const placeholder = document.createElement('div');
  placeholder.className = 'product-placeholder';
  const placeholderLabel = document.createElement('span');
  placeholderLabel.textContent = 'Fotografía pendiente';
  placeholder.append(placeholderLabel);
  const media = document.createElement('div');
  media.className = 'product-media';
  media.append(placeholder);
  const photos = obtenerImagenes(producto);
  const tryPhoto = (index) => {
    if (!photos[index]) return;
    const image = document.createElement('img');
    image.className = 'product-photo';
    image.alt = photos[index].alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.width = 1200;
    image.height = 900;
    image.addEventListener('load', () => {
      placeholder.remove();
      image.classList.add('is-loaded');
    }, { once: true });
    image.addEventListener('error', () => {
      image.remove();
      tryPhoto(index + 1);
    }, { once: true });
    image.src = photos[index].src;
    media.append(image);
  };
  tryPhoto(0);

  const content = document.createElement('div');
  content.className = 'product-content';
  const category = document.createElement('p');
  category.className = 'product-category';
  category.textContent = producto.categoria;
  const name = document.createElement('h3');
  name.textContent = producto.nombre;
  const description = document.createElement('p');
  description.className = 'product-description';
  description.textContent = producto.descripcion;
  content.append(category, name, description);

  if (producto.medidasReferencia) {
    const { valores, unidad, alturaInformada } = producto.medidasReferencia;
    const measurements = document.createElement('p');
    measurements.className = 'product-measurements';
    measurements.textContent = `Medidas de referencia (provisionales): ${valores.join(' × ')} ${unidad}.${alturaInformada ? '' : ' Altura no informada.'}`;
    content.append(measurements);
  }

  const action = document.createElement('a');
  action.className = 'button product-action';
  action.href = `./producto.html?id=${encodeURIComponent(producto.id)}`;
  action.setAttribute('aria-label', `Ver modelo ${producto.nombre}`);
  action.textContent = 'Ver modelo';
  content.append(action);
  card.append(media, content);
  item.append(card);
  return item;
};

