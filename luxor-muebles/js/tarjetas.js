export const createProductCard = (producto) => {
  const item = document.createElement('li');
  const card = document.createElement('article');
  card.className = 'product-card';

  const placeholder = document.createElement('div');
  placeholder.className = 'product-placeholder';
  const placeholderLabel = document.createElement('span');
  placeholderLabel.textContent = 'Fotografía pendiente';
  placeholder.append(placeholderLabel);

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
  card.append(placeholder, content);
  item.append(card);
  return item;
};

