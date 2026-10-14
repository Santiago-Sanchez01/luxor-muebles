# Luxor Muebles

Proyecto web para un negocio argentino dedicado a la venta de sillones personalizados.
El objetivo del sitio es presentar el negocio y sus modelos, explicar las opciones de
personalización y facilitar el contacto usando información real y aprobada.

## Tecnologías

- HTML5 semántico para organizar el contenido.
- CSS3 para la presentación y la adaptación a distintos tamaños de pantalla.
- JavaScript vanilla con módulos ES para el menú, el header y el catálogo.
- Git y GitHub para control de versiones y colaboración.

No se utilizan frameworks, librerías, fuentes externas ni dependencias.

## Estructura

```text
luxor-muebles/
├── index.html
├── producto.html
├── README.md
├── .gitignore
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── producto.js
│   ├── opciones.js
│   ├── config.js
│   ├── tarjetas.js
│   └── productos.js
└── assets/
    ├── images/
    └── icons/
```

- `index.html`: documento principal con las secciones originales y la selección de destacados separada del catálogo.
- `css/styles.css`: reset básico, variables visuales, estilos responsive y accesibilidad.
- `js/main.js`: módulo ES para el menú móvil, el header y el renderizado de las tarjetas.
- `js/productos.js`: datos locales de los modelos de referencia.
- `.gitignore`: evita incorporar archivos temporales y secretos locales al control de versiones.
- `assets/images/` y `assets/icons/`: carpetas vacías disponibles para futuros recursos aprobados.

Git no registra carpetas vacías. Estas existen localmente, pero aparecerán en GitHub
cuando se agreguen archivos. No se agregan marcadores para conservar la estructura solicitada.

## Ejecutar localmente

Usá un servidor HTTP local: los módulos ES pueden quedar bloqueados si abrís el HTML
directamente con `file://`. Python ya está disponible en el equipo actual.

Desde cualquier ubicación, ejecutá en PowerShell (si ya estás en la raíz del proyecto,
podés omitir la primera línea):

```powershell
Set-Location 'C:\Users\Equipo\Desktop\Luxor-Muebles\luxor-muebles'
python -m http.server 8000 --bind 127.0.0.1
```

Abrí `http://127.0.0.1:8000/` en el navegador. Para detener el servidor, presioná
`Ctrl+C` en la terminal. Si el puerto está ocupado, usá otro, por ejemplo `8001`,
y actualizá la dirección del navegador.

## Probar el header y el hero

1. Revisá el diseño a 375, 768, 1024 y 1440 px, y con el teléfono horizontal.
   No debe aparecer desplazamiento horizontal.
2. Probá los enlaces del menú y del hero: “Catálogo” y “Explorar catálogo” llevan a
   Catálogo (`#modelos`); los accesos a WhatsApp abren una consulta general precargada.
   Los títulos de destino deben quedar visibles debajo del header.
3. Usá la tecla Tab para comprobar el foco visible y el enlace “Saltar al contenido”.
4. Por debajo de 1024 px (con configuración de texto predeterminada), abrí el menú
   con la hamburguesa. Comprobá el cierre con el botón, Escape y al elegir un enlace.
   En horizontal, el menú permite desplazarse verticalmente si no cabe completo.
5. En las herramientas de desarrollo del navegador, verificá que `css/styles.css`
   y `js/main.js` cargan sin errores, y que la consola no informa errores.
6. Ampliá el texto al 200 % y comprobá que los enlaces y botones sigan disponibles.
   El header adapta su altura y el espacio reservado para las anclas.
7. Activá la preferencia de movimiento reducido del sistema o emulala desde las
   herramientas del navegador: se desactivan animaciones y transiciones.

Las rutas `./css/styles.css` y `./js/main.js` son relativas a `index.html`.

## Estado actual

Fase 01 completada: estructura inicial, HTML semántico y archivos conectados.

Fase 02 implementada: header responsive con navegación interna, menú móvil funcional
con JavaScript y hero cinematográfico provisional. El header permanece visible al
desplazarse y su altura real se mide con `ResizeObserver` para evitar que tape las
anclas cuando cambia el tamaño del texto. Sin JavaScript, los enlaces quedan visibles
y el header se desplaza con la página.

El hero móvil utiliza la altura necesaria para su contenido y espaciado, evitando
rellenar la pantalla con espacio vacío. Las siete secciones siguen presentes; Categorías,
Personalización, Opiniones, Nosotros y Contacto conservan su estructura provisional.
El catálogo inicial de la Fase 03A conserva el destino `#modelos`. El footer
definitivo no está desarrollado.

Fase 03A implementada: seis tarjetas generadas desde datos locales, placeholders CSS,
grilla de una, dos o tres columnas y botones “Ver modelo · Próximamente” deshabilitados.

## Datos y mantenimiento del catálogo

`js/productos.js` exporta el array `productos`. Cada objeto tiene `id` único, `nombre`,
`categoria`, `medidasReferencia`, `descripcion`, `imagen` opcional y `destacado` booleano.
Se utiliza la categoría general “Sillones”; no se asignan subcategorías sin confirmación.
Los seis modelos se marcan destacados para esta selección inicial, sin implicar popularidad.

`medidasReferencia` contiene `valores` (números en el orden proporcionado), `unidad`
y `alturaInformada`. Puede ser `null` cuando no haya medidas. No se infiere la altura
de Nube ni Amelia. Las medidas suministradas del catálogo MS Sillones son provisionales.

Para agregar un modelo, copiá un objeto dentro del array y completá sus campos con
datos aprobados. Elegí un `id` distinto, dejá `imagen: null` mientras no haya fotografía
y usá `destacado: true` para incluirlo también en los destacados. Todos los modelos
aparecen en el catálogo, sujetos a la búsqueda y categoría elegidas. Recargá después
de guardar. No necesitás copiar tarjetas en HTML.

`main.js` importa los datos y crea las tarjetas de ambas vistas
mediante `createProductCard`. Usa `createElement`, `textContent` y `replaceChildren`:
los textos se muestran como texto, sin interpretar etiquetas HTML.

Limitaciones: sin precios ni stock. El campo
`imagen` queda reservado: esta fase siempre muestra placeholders CSS, sin solicitar
imágenes en las tarjetas. Desde la Fase 04A, “Ver modelo” enlaza a la ficha. Sin JavaScript,
se muestra un aviso en lugar de las tarjetas. Las especificaciones comerciales y
las fotografías requieren confirmación antes de publicarse como definitivas.

Para probar: verificá los seis nombres y medidas; Nube y Amelia deben indicar “Altura
no informada”. Comprobá una columna a 375 px, dos a 768 px y tres desde 1024 px con
texto predeterminado. Los enlaces “Ver modelo” deben abrir el producto correcto.
Repetí con texto ampliado y movimiento reducido; no debe haber desbordamiento.

## Fase 03B: búsqueda, filtros y destacados

Hay dos vistas de los mismos datos: `#destacados` muestra únicamente los objetos con
`destacado: true` en una selección horizontal; `#modelos` contiene el catálogo completo
en grilla. Ambas reutilizan `createProductCard`, sin copiar ni mantener dos arrays.
Los enlaces del header y hero siguen intactos y llevan al catálogo.

La búsqueda filtra por nombre sin distinguir mayúsculas ni tildes, usando normalización
Unicode. Se combina con la categoría elegida en un selector nativo accesible. Las
categorías se generan con `Set` a partir de los datos: actualmente solo existen
“Todos” y “Sillones”. No se crearon categorías adicionales.

La grilla y el contador visible cambian sin recargar. Si no hay coincidencias, aparece
un mensaje explicativo. Una región `role="status"` anuncia el resultado tras una pausa
de 350 ms para evitar avisos por cada tecla. No se mueve el foco al actualizar.

El carrusel usa desplazamiento nativo y CSS Scroll Snap, sin autoplay. Puede recorrerse
con gestos táctiles, los botones Anterior/Siguiente y, al enfocarlo con Tab, las flechas
izquierda/derecha y las teclas Inicio/Fin. Los controles se ocultan si no hay contenido
fuera de vista; sus extremos se indican con `aria-disabled` y borde discontinuo, sin
perder el foco. Con movimiento reducido, los desplazamientos programados son inmediatos.

Pruebas sugeridas: buscar “NÚBE” debe encontrar Nube; un nombre inexistente muestra
cero resultados. Combiná ambas categorías con la búsqueda, limpiá el campo y verificá
los seis productos. Probá el carrusel con Tab, flechas, Inicio/Fin y botones, y con tacto
en un teléfono. Repetí a 375, 768, 1024 y 1440 px y con texto al 200 %. Las medidas
mantienen su carácter provisional.

## Fase 04A: ficha dinámica

`producto.html?id=valentina` muestra la ficha Valentina; funciona para los seis IDs
existentes. `js/producto.js` obtiene el ID con `URLSearchParams` y busca una coincidencia
exacta en `productos.js`. Si falta o no existe, muestra “Producto no encontrado” y
permite volver al catálogo, sin seleccionar otro modelo por defecto.

Ejemplo local: `http://127.0.0.1:8000/producto.html?id=valentina`.
La información, descripción y medidas provienen del mismo array; no se duplican
en HTML. `js/tarjetas.js` comparte la función `createProductCard` entre homepage y
relacionados. Los relacionados son hasta tres modelos de la misma categoría, excluyendo
el actual; no representan recomendaciones comerciales ni popularidad.

La ficha tiene un header compacto, regreso al catálogo, galería, información,
estructura de personalización y consulta a `index.html#contacto`. En desktop la
galería queda a la izquierda; en móvil se muestra arriba. No hay configurador de
compra. Desde la Fase 04B
se pueden indicar preferencias para una consulta, sin disponibilidad confirmada.

Actualmente todos los productos muestran un único placeholder sin controles de galería.
Para futuras fotos aprobadas se admite `imagen` con una ruta local, o un campo opcional
`imagenes: [{ src: './assets/images/archivo.webp', alt: 'Descripción de la foto real' }]`.
Solo se aceptan rutas dentro de `assets/images/`; con varias fotos distintas aparecen
miniaturas y botones anterior/siguiente. No se duplican fotos para llenar la galería.
Una foto que no pueda cargarse se retira; sin fotos restantes vuelve el placeholder.

Pruebas: abrir Valentina, Nube y Amelia; comprobar medidas y alturas no informadas.
Abrir sin ID y con uno inexistente; comprobar el mensaje y regreso. Desde ambas
vistas de la homepage, verificar los enlaces y que las fichas con placeholders no
muestren miniaturas ni controles. Las fotografías, opciones de personalización y
especificaciones comerciales definitivas siguen pendientes.

## Fase 04B: preferencias interactivas

`js/opciones.js` centraliza las categorías `tapizado`, `color` y `patas`, con una
etiqueta y un array de valores provisionales. Para cambiar las opciones, editá esos
arrays conservando “Sin definir” como primera opción. No son combinaciones disponibles
confirmadas ni implican compra, reserva o stock.

La ficha genera grupos de radios nativos con `fieldset` y `legend`. Cada categoría
permite una selección, indicada por el radio marcado, el borde y el texto en negrita.
El estado se guarda en memoria en `producto.js`; `crearSeleccionInicial` proporciona
“Sin definir” para las tres categorías. Un cambio actualiza inmediatamente “Tu selección”
y el texto de consulta. “Restablecer selección” reinicia controles y estado sin recargar.
No se persiste al recargar ni se modifican las imágenes al elegir un color.

`generarConsulta(nombre, seleccion)` es una función reutilizable que prepara el mensaje
con modelo, tapizado, color, patas y una solicitud de confirmación de disponibilidad,
opciones y precio. “Copiar consulta” intenta usar `navigator.clipboard.writeText`; si
no está disponible o falla, prueba `document.execCommand('copy')`. Si ambas alternativas
fallan, deja el texto seleccionado y explica cómo copiarlo manualmente.

El feedback de copia usa una región `aria-live="polite"`. El resumen no es una región
viva para evitar anuncios redundantes al cambiar radios. Los controles funcionan con
Tab y flechas. El enlace a Contacto permanece; no hay envíos automáticos,
precios, pagos ni confirmaciones comerciales.

Para probar: cambiar una opción por grupo, revisar resumen y mensaje, restablecer y
comprobar “Sin definir”. Copiar y pegar la consulta en un editor. Verificar la alternativa
si el navegador bloquea el portapapeles y la copia manual si también falla. Repetir
con teclado, a cuatro anchos y con texto ampliado al 200 %.

La paleta provisional utiliza negro carbón, blanco cálido y rojo de acento. La fuente
funcional es la del sistema y el título del hero usa Georgia con alternativas locales,
sin descargas externas. Se incluyen estilos de foco visible
y respeto por la preferencia de movimiento reducido.

## Fase 04C: consulta por WhatsApp

`js/config.js` centraliza el número comercial internacional, el mensaje general y
`crearEnlaceWhatsApp(mensaje)`. Esta función construye `https://wa.me/NUMERO?text=...`
usando `encodeURIComponent` para codificar el texto completo, incluidos acentos y saltos
de línea. Para cambiar el número, editá únicamente `whatsappNumero` en ese archivo.

En la ficha, `generarConsulta` incluye modelo, marca, preferencias actuales y solicitud
de confirmación de disponibilidad, opciones y precio. El mismo texto se muestra,
se copia y se precarga en WhatsApp. El enlace se actualiza al cambiar o restablecer
preferencias, conservando “Sin definir” cuando corresponda.

Los accesos del header y hero usan el mensaje general “Hola, quiero consultar por los
sillones de Luxor Muebles.” Los enlaces normales a Contacto no cambian. Los accesos
WhatsApp se habilitan al cargar JavaScript para mantener el número en un único archivo;
sin JavaScript, Contacto sigue disponible en la navegación.

Los enlaces abren otra pestaña con `rel="noopener noreferrer"`, con nombre accesible
que avisa ese comportamiento. Solo se abre WhatsApp al activar el enlace y el envío
requiere confirmación del visitante dentro de WhatsApp. No se usan APIs privadas,
tokens ni envíos automáticos. “Copiar consulta” conserva sus alternativas y feedback.

Para probar: verificar el mensaje inicial, cambiar preferencias y restablecer; comparar
el mensaje visible con el parámetro `text` decodificado. Abrir WhatsApp manualmente para
comprobar el destinatario y el texto, sin enviar durante la prueba. Repetir con teclado,
en los cuatro anchos y con texto al 200 %. La apertura final depende de WhatsApp y
de su instalación o sesión en el dispositivo.

Pendientes: logo oficial y fotografía local aprobada del sillón.
Por ahora se usa el texto “LUXOR MUEBLES” y un fondo CSS con degradados.
Para incorporar la foto más adelante, colocar el recurso aprobado
en `assets/images/` y actualizar `--hero-image` en CSS con una ruta relativa a ese archivo.

No se incorporaron imágenes, reseñas, precios, garantías, direcciones ni horarios.
No se publicaron fotografías del catálogo mayorista. No se realizaron commits ni push.
La carpeta superior ya contiene un repositorio Git; no se inicializó otro anidado.
Las próximas fases requieren autorización del responsable del proyecto.
