// Preferencias provisionales para consulta, no disponibilidad por modelo.
export const opciones = {
  tapizado: { etiqueta: 'Tapizado', valores: ['Sin definir', 'Antidesgarro', 'Pana antimanchas', 'Consultar otros tapizados'] },
  color: { etiqueta: 'Color', valores: ['Sin definir', 'Beige', 'Gris', 'Verde', 'Otro color / consultar'] },
  patas: { etiqueta: 'Patas', valores: ['Sin definir', 'Madera natural', 'Madera negra', 'Consultar otras opciones'] },
};

export const crearSeleccionInicial = () => Object.fromEntries(
  Object.keys(opciones).map((categoria) => [categoria, 'Sin definir'])
);

export const generarConsulta = (nombre, seleccion) =>
  `Hola, quiero consultar por el sillón ${nombre} de Luxor Muebles.\n\n`
  + `Tapizado: ${seleccion.tapizado}.\nColor: ${seleccion.color}.\nPatas: ${seleccion.patas}.\n\n`
  + '¿Podrían confirmarme disponibilidad, opciones y precio?';
