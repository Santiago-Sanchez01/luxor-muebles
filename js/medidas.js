// Formato compartido para tarjetas y fichas; nunca suma dimensiones de accesorios.
export const formatearMedidas = (medidas) => {
  if (!medidas) return 'Medidas no informadas.';
  const format = (valores, unidad) => `${valores.map((valor) =>
    new Intl.NumberFormat('es-AR', {
      minimumFractionDigits: unidad === 'm' && !Number.isInteger(valor) ? 2 : 0,
      maximumFractionDigits: 2,
    }).format(valor)
  ).join(' × ')} ${unidad}`;
  const principal = medidas.variantes
    ? `Dos medidas principales de referencia: ${medidas.variantes.map((valores) => format(valores, medidas.unidad)).join(' o ')}.`
    : `${format(medidas.valores, medidas.unidad)}.`;
  const camastro = medidas.camastro
    ? ` Camastro (medida independiente): ${format(medidas.camastro.valores, medidas.camastro.unidad)}.` : '';
  return `${principal}${camastro}${medidas.alturaInformada ? '' : ' Altura no informada.'}`;
};
