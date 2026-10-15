export const whatsappNumero = '5492974223934';
export const consultaGeneral = 'Hola, quiero consultar por los sillones de Luxor Muebles.';

// Un clic abre la consulta precargada; el visitante confirma el envío en WhatsApp.
export const crearEnlaceWhatsApp = (mensaje) =>
  `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(mensaje)}`;
