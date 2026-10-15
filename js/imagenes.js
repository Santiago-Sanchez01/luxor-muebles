// Una sola normalización para tarjetas y ficha; no admite URLs externas.
export const obtenerImagenes = (producto) => {
  const gallery = Array.isArray(producto.imagenes) ? producto.imagenes : [];
  const legacy = producto.imagen ? [{ src: producto.imagen, alt: `Modelo ${producto.nombre}` }] : [];
  const candidates = gallery.length ? gallery : legacy;
  const seen = new Set();
  return candidates.filter((photo) => {
    if (!photo || typeof photo.src !== 'string' || typeof photo.alt !== 'string' || !photo.alt.trim()) return false;
    if (!/^(\.\/)?assets\/images\/[\w/-]+\.(webp|png|jpe?g|avif)$/i.test(photo.src)) return false;
    const path = photo.src.replace(/^\.\//, '');
    if (seen.has(path)) return false;
    seen.add(path);
    return true;
  });
};
