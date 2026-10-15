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

La aplicación está directamente en la raíz del repositorio, junto a `.git/`.
No existe una subcarpeta adicional `luxor-muebles/` dentro de esa raíz.

La aplicaci?n est? directamente en la ra?z del repositorio; no hay una subcarpeta
adicional `luxor-muebles/` dentro de ella. `.git/` se conserva sin modificaciones.

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
│   ├── imagenes.js
│   ├── opiniones.js
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
Set-Location 'C:\Users\Equipo\Desktop\Luxor-Muebles'
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
Contacto y el footer incorporan la Fase 05F.1. Opiniones incorpora la sección editorial
de la Fase 05E.1. Nosotros incorpora la
presentación editorial de la Fase 05D.1. Personalización
incorpora la presentación editorial de la Fase 05C.
El catálogo inicial de la Fase 03A conserva el destino `#modelos`. El footer de la
homepage está desarrollado y refinado en la Fase 05F.2.

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
`imagenes` admite fotos autorizadas y `imagen` se conserva por compatibilidad.
Sin fotografías cargables se muestran placeholders CSS. Desde la Fase 04A, “Ver modelo” enlaza a la ficha. Sin JavaScript,
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

## Fase 05A: identidad visual oficial

Recursos locales disponibles, conservados sin modificaciones:

- `assets/images/luxor-logo-fondo-oscuro.png`: logo oficial utilizado en los headers
  oscuros de `index.html` y `producto.html`.
- `assets/images/luxor-logo-fondo-claro.png`: versión oficial para fondos claros,
  disponible para su uso cuando corresponda; no se incorpora en secciones nuevas.

Ambos originales miden 2118 × 689 px. Los headers muestran el logo con ancho de
152 px en móvil y tablet y 176 px desde 1024 px, con altura automática para conservar
sus proporciones. Los atributos HTML `width` y `height` reservan la proporción antes
de cargar; `alt="Luxor Muebles"` identifica el enlace para lectores de pantalla.
El enlace lleva a Inicio en ambas páginas y mantiene foco visible y área de al menos
48 px de altura. No se alteró la paleta Luxor Premium ni el diseño de otras secciones.

Para probar: verificar carga, proporción y legibilidad del logo en ambas páginas,
a 375, 768, 1024 y 1440 px y con texto ampliado al 200 %. Comprobar que no se superpone
al menú y que el enlace funciona con teclado. Las fotografías de los sillones siguen
pendientes; el hero conserva su fondo CSS con degradados.

## Fase 05B.1: biblioteca de fotografías

Carpetas preparadas (vacías hasta incorporar recursos autorizados):

```text
assets/images/
├── luxor-logo-fondo-claro.png
├── luxor-logo-fondo-oscuro.png
├── productos/
│   ├── valentina/
│   ├── chicago/
│   ├── nube/
│   ├── miami/
│   ├── amelia/
│   └── denver/
├── hero/
└── marca/
```

Los logos originales permanecen en su ubicación; `marca/` queda disponible para
futuros recursos. Git no guarda estas carpetas vacías hasta que contengan archivos.

Cada producto ahora tiene `imagenes: []`, además del campo existente `imagen: null`.
La galería usa un array de objetos `{ src, alt }`; la primera foto es la principal.
`js/imagenes.js` normaliza los datos para ambas vistas, evita duplicados y admite solo
rutas locales dentro de `assets/images/`. Cuando el array está vacío, usa `imagen`
si hay una ruta antigua definida. No se han asignado rutas a fotos inexistentes.

Para incorporar la primera fotografía de Valentina:

1. Conseguí una fotografía real y autorizada. Preferí WebP o AVIF; también se admiten
   JPG/JPEG y PNG. Usá nombres en minúsculas, sin espacios ni tildes, con guiones,
   por ejemplo `valentina-01.webp`. Optimizá el archivo antes de incorporarlo y
   verificá que conserve el detalle; evitá originales innecesariamente grandes.
2. Colocá ese archivo en `assets/images/productos/valentina/`.
3. Solo después de que exista, completá `imagenes` en el objeto Valentina:

```js
imagenes: [
  {
    src: './assets/images/productos/valentina/valentina-01.webp',
    alt: 'Descripción fiel de la fotografía autorizada de Valentina',
  },
],
```

Este ejemplo es una convención documental, no una fotografía existente. Reemplazá
el texto alternativo por una descripción real. Para más fotos, agregá objetos con
nombres consecutivos y textos alternativos propios; no repitas la misma imagen.

Las tarjetas usan la primera foto cargable, con `loading="lazy"` y `decoding="async"`.
Si falla, prueban la siguiente; si todas fallan, conservan el placeholder. La ficha
carga su imagen principal sin lazy porque aparece en la primera pantalla y aplica
lazy a las miniaturas. Con cero imágenes hay un placeholder; con una no se muestran
controles ni miniaturas; con varias aparecen los controles accesibles existentes.
Las fotos que fallan se retiran de la galería.

Se reserva un área 4:3 para reducir saltos de diseño. `object-fit: contain` conserva
la foto completa, sin deformar ni recortar el sillón. Los atributos de tamaño indican
la proporción del área de presentación, sin modificar los archivos originales.
No se descargaron fotografías ni se publicaron recursos del catálogo mayorista.

## Fase 05B.3: hero cinematográfico

El hero utiliza `assets/images/hero/hero-luxor-original.png`, una ambientación
ilustrativa generada con IA. No es una fotografía de un producto comercial específico
de Luxor y no se incorpora al catálogo ni a las fichas.

`--hero-image` en `css/styles.css` define la ruta local relativa al CSS. Desde 640 px,
la imagen cubre el hero y un degradado oscuro protege el texto izquierdo, conservando
el sillón hacia la derecha. En móvil, la misma imagen se encuadra en una franja inferior
de 12rem con transición oscura; el título y los botones permanecen sobre fondo carbón,
sin necesitar otra imagen ni una altura mínima de pantalla completa.

Se conservan los textos, enlaces y animación previa; no se añadieron animaciones.
La altura se reserva mediante CSS, por lo que cargar el fondo no cambia el tamaño
del hero. Si el recurso falla, permanece el fondo provisional con degradados.
El original PNG se conserva sin modificaciones; pesa aproximadamente 2,36 MB.
Una eventual versión WebP requiere informar su incorporación antes de cambiar la ruta.

Para reemplazar la ambientación, colocar primero el nuevo recurso autorizado dentro
de `assets/images/hero/`, actualizar `--hero-image` y revisar los encuadres a 375, 768,
1024 y 1440 px y con texto al 200 %. Conservar el original y actualizar esta documentación
si cambia el origen o carácter ilustrativo de la imagen.

## Fase 05C: sección editorial de personalización

La sección existente `#personalizacion` explica tres pasos: elegir un modelo,
indicar preferencias y consultar con Luxor. El título aprobado es “Diseñado para tu
espacio. Pensado para vos.” y “Explorar modelos” lleva al catálogo `#modelos`.

En desktop se presenta un área visual a la izquierda y los pasos a la derecha;
en móvil y tablet el orden es título, imagen y pasos. La lista ordenada utiliza
encabezados `h3` bajo el `h2` de la sección. Los números visuales se ocultan al lector
de pantalla para evitar repetir la numeración de la lista.

El área visual incorpora la ambientación de la Fase 05C.2, sin reutilizar el hero.
La aclaración sobre confirmación de opciones permanece visible.
No se modificaron las fichas ni sus selectores y no se agregaron animaciones.

## Fase 05C.2: imagen editorial de personalización

Original conservado: `assets/images/marca/personalizacion-editorial.png`,
1086 × 1448 px, 3.041.929 bytes. Versión utilizada:
`assets/images/marca/personalizacion-editorial.webp`, mismas dimensiones,
421.726 bytes (aproximadamente 86 % menos). Se exportó localmente con Chrome y
calidad WebP 90 %, sin filtros, cambios de contenido ni dependencias instaladas.
La compresión es con pérdida; se conserva el PNG para futuras exportaciones.

Es una ambientación ilustrativa generada con IA, no una fotografía de un modelo
comercial específico; no se usa en tarjetas ni fichas. Un elemento `img` proporciona
texto alternativo, `loading="lazy"`, `decoding="async"` y dimensiones explícitas.
CSS reserva el área y usa `object-fit: cover`: 4:3 en móvil con encuadre al 65 % vertical,
y una imagen a la izquierda abarcando el título y pasos derechos en desktop.
La numeración, textos y enlace al catálogo se conservan. No se superpone texto a la foto.

Para reemplazarla, colocar primero el recurso autorizado en `assets/images/marca/`,
actualizar el `src`, dimensiones y descripción alternativa en `index.html`, y revisar
el encuadre y proporción en CSS. Conservar los originales y documentar el nuevo recurso.

Pendientes: fotografías reales autorizadas de los productos y evaluación de una
versión optimizada del hero.

Se incorporaron los logos oficiales y la ambientación IA del hero; no se agregaron fotografías de productos,
reseñas, precios, garantías, direcciones ni horarios.
No se publicaron fotografías del catálogo mayorista. No se realizaron commits ni push.
La raíz de la aplicación coincide con la del repositorio Git; no se creó otro repositorio.
Las próximas fases requieren autorización del responsable del proyecto.


## Fase 05D.1: Nosotros

La sección existente `#nosotros` incorpora la etiqueta “CONOCÉ LUXOR”, el título
“Más que sillones, espacios para vivir.” y los textos aprobados sobre acompañamiento
y preferencias. “Conocer nuestros modelos” lleva a `#modelos`. No se agregaron años
de trayectoria, testimonios, dirección ni afirmaciones de fabricación propia.

La composición inicial se refinó en la Fase 05D.2: fondo y contenido forman un único
hero editorial secundario dentro del ancho del sitio, con textos alineados a la izquierda.
No se duplica el hero principal ni se utiliza una altura de pantalla completa.

Desde la Fase 05D.3, `--about-image` en `.about-content` utiliza la imagen editorial
local de Nosotros con un degradado oscuro. En móvil se refuerza el degradado y se
encuadra al 65 % horizontal; el bloque crece según el texto, sin altura mínima visual.
El mínimo de desktop es 32rem, no una altura fija: también puede crecer con texto ampliado.
Reutiliza la paleta, tipografía y foco visible, sin animaciones ni cambios funcionales.

## Fase 05D.3: fotografía del hero secundario

Recurso: `assets/images/marca/hero-secundario.png`. Formato PNG verificado por su firma,
1672 × 941 px, 2.419.735 bytes (aproximadamente 2,42 MB). Ya estaba en la carpeta final;
se conserva intacto, sin copias ni conversiones.

Es una ambientación ilustrativa generada con IA: no representa necesariamente el
showroom ni un producto comercial real de Luxor. Se usa únicamente como fondo
decorativo de Nosotros, sin reutilizar el hero principal o Personalización.

En desktop se utiliza `background-size: cover` y encuadre derecho, con oscuridad
concentrada detrás del texto izquierdo y detalles más visibles a la derecha. En móvil,
el encuadre al 65 % y el degradado reforzado priorizan la lectura. No hay altura fija,
animaciones nuevas ni cambios en los textos o CTA. El fondo no provoca saltos al cargar.

Para reemplazarla, incorporar primero un recurso aprobado en `assets/images/marca/`,
actualizar `--about-image` en CSS y revisar el encuadre, contraste y texto ampliado.
Se recomienda evaluar un WebP optimizado conservando este original; no se generó en
esta fase. La trayectoria, dirección y fabricación requieren confirmación comercial
antes de incorporarse al contenido.

## Fase 05E.1: recomendaciones de clientes

`#opiniones` conserva su ID y presenta un encabezado editorial sobre fondo cálido.
`js/opiniones.js` exporta `opiniones = []`: todavía no hay testimonios aprobados
publicados. Mientras esté vacío, se muestra una invitación a consultar las recomendaciones
en el perfil de Facebook proporcionado, también visible sin JavaScript. No se publican
estrellas, porcentajes, cantidades, nombres, fotos ni opiniones ficticias.

Para agregar un testimonio, verificar primero su autenticidad, el nombre autorizado,
el texto y la aprobación comercial. Añadir al array un objeto con `id` único, `nombre`,
`texto`, `fuente: 'Facebook'` y `url` pública opcional. El esquema está documentado
en el módulo; no hay ejemplos ficticios cargados. No copiar automáticamente desde Facebook.

`renderOpiniones` se invoca desde `main.js` y crea tarjetas con `createElement` y
`textContent`, usando `figure`, `blockquote` y `figcaption`. Solo permite enlaces HTTPS
de Facebook y agrega `target="_blank"` con `rel="noopener noreferrer"`. Sin URL válida
se muestra la atribución sin enlace. La validación técnica no sustituye la aprobación
de autenticidad o autorización del nombre.

La grilla tiene una columna en móvil, dos en tablet y tres desde 1024 px. No hay
imágenes ni carruseles. Los datos temporales de pruebas se introducen únicamente
en memoria durante la verificación, nunca se guardan como opiniones reales.
Pendientes: selección de recomendaciones auténticas, autorización del contenido y
aprobación comercial. No se verificaron cifras actuales de recomendaciones ni se
implementaron conexiones a Facebook, credenciales o tokens.

## Fase 05F.1: Contacto y footer

La sección existente `#contacto` presenta el título aprobado, una consulta principal
por WhatsApp y bloques de atención personalizada y entregas, sin formulario ni backend.
Usa fondo carbón, tipografía editorial y separadores discretos. En móvil los bloques
se apilan y el CTA ocupa el ancho disponible; la altura crece según el contenido.

El footer de la homepage incluye el logo oficial para fondo oscuro, las seis anclas
de navegación, Facebook y WhatsApp. `main.js` completa el año con `new Date().getFullYear()`
del navegador, sin servicios externos. Se incluye la aclaración sobre imágenes IA.
Los estilos se limitan a la homepage; no se cambió el footer de las fichas.

Los nuevos enlaces WhatsApp usan `data-whatsapp`: el manejador de inicialización
existente reutiliza `crearEnlaceWhatsApp(consultaGeneral)` y el número centralizado
en `js/config.js`. No se duplicó el número ni se agregaron funciones de envío.
Los enlaces externos abren otra pestaña con `noopener noreferrer` y nombre accesible.
Sin JavaScript permanecen el contenido, logo, navegación, Facebook y la aclaración IA;
WhatsApp queda oculto y Contacto ofrece Facebook como alternativa. El año no se
muestra hasta poder calcularlo, para evitar una fecha estática obsoleta.

Pendientes comerciales: dirección física, correo, horarios, cobertura, costos y plazos
de entrega. No se publican hasta confirmarlos. Las pruebas de WhatsApp verifican el
destino y texto del enlace sin enviar mensajes reales.

## Fase 05F.2: refinamiento de Contacto y footer

Contacto conserva sus textos y lógica con dos columnas equilibradas en desktop,
espaciado ampliado y CTA de 56 px de alto mínimo, con ícono SVG de mensaje decorativo
y flecha externa. En móvil se apila y el CTA utiliza el ancho disponible.

El footer se organiza en identidad (logo y descripción editorial), navegación y redes
y contacto. La variable `--color-footer` diferencia sutilmente su carbón del de Contacto.
En móvil las áreas siguen ese orden en una columna; en tablet se distribuyen en dos
y en desktop en tres. La franja inferior conserva año dinámico, marca y el aviso IA.
Se mantienen los enlaces subrayados, foco claro, áreas táctiles y movimiento reducido.

No se cambió JavaScript ni la configuración comercial: WhatsApp sigue utilizando
`crearEnlaceWhatsApp(consultaGeneral)` mediante `data-whatsapp`. No se duplicaron
destinos ni números y no se incorporaron dependencias o recursos remotos.

## Fase 05G.1: entradas cinematográficas

`js/animaciones.js` comparte `iniciarAnimaciones` entre homepage y ficha. El contenido
es visible por defecto; solo después de crear `IntersectionObserver` se aplica un estado
pendiente a tarjetas, pasos, texto de Nosotros, título/CTA de Contacto e información
de la ficha. Al entrar en pantalla, se deja de observar y se anima una sola vez con
Web Animations API: opacidad y 18 px verticales durante 620 ms. El escalonado es de
60 ms y está limitado a 120 ms para no acumular esperas en listas largas.

Un `MutationObserver` limitado a las listas detecta tarjetas nuevas tras buscar o
filtrar, así como opiniones aprobadas y relacionados. Los nodos retirados se liberan.
No se calculan posiciones en listeners de scroll ni se animan dimensiones, imágenes,
header sticky o footer. Se conserva la aparición inicial existente del hero sin duplicarla.

Sin JavaScript, IntersectionObserver o Web Animations API, no se oculta contenido.
Con movimiento reducido no se preparan animaciones; si la preferencia cambia durante
la visita, se cancelan y todo se revela inmediatamente. Foco y navegación por anclas
revelan el destino sin espera, también al acceder con un fragmento inicial. Los elementos
ya revelados no vuelven a ocultarse al subir. No se agregaron librerías ni efectos de zoom.

Pruebas de esta fase: revisar los cuatro anchos y texto al 200 %, entradas por scroll,
tarjetas tras búsqueda y filtros, foco en enlaces pendientes, anclas, movimiento reducido
y alternativas sin JavaScript u observador. Los testimonios reales siguen pendientes
de aprobación; el renderizador es compatible con futuras tarjetas sin datos ficticios.

## Fase 05H.1: auditoría y optimización de imágenes

Se conservaron todos los PNG y logos originales. Chrome local exportó WebP con
calidad 90 %, sin redimensionar, recortar, aplicar filtros o instalar dependencias.
La compresión es con pérdida y puede introducir diferencias mínimas respecto al PNG.

| Recurso | Dimensiones | Original PNG (bytes) | WebP (bytes) | Reducción |
| --- | --- | ---: | ---: | ---: |
| `hero/hero-luxor-original` | 1942 × 809 | 2.356.247 | 268.458 | 88,61 % |
| `marca/hero-secundario` | 1672 × 941 | 2.419.735 | 278.792 | 88,48 % |
| `marca/personalizacion-editorial` (optimizado anteriormente) | 1086 × 1448 | 3.041.929 | 421.726 | 86,14 % |

Todas las rutas de la tabla están dentro de `assets/images/`. Se actualizaron únicamente
`--hero-image` y `--about-image` en CSS para usar los nuevos WebP. Las posiciones,
degradados, tamaños y animaciones permanecen intactos. Las referencias PNG anteriores
en esta documentación describen los originales conservados; el recurso activo ahora es WebP.

El logo oscuro utilizado mide 2118 × 689 y pesa 385.198 bytes; el claro disponible
mide 2118 × 689 y pesa 564.480 bytes. No se modificaron ni se incorporó el claro a la carga.
El PNG de Personalización se conserva como original y no se descarga en la página.
Los productos no tienen fotos asignadas y siguen usando placeholders.

Personalización, tarjetas, miniaturas y logo del footer ya utilizan lazy loading.
El hero principal y el logo superior se mantienen sin carga diferida para no retrasar
la primera pantalla. Los fondos CSS no admiten el atributo `loading`; Nosotros sigue
su carga nativa CSS para evitar cambiar estructura o lógica de revelado en esta fase.
No se cargan los originales PNG además de los WebP ni se agregaron efectos a las fotos.

Verificación: servir tanto desde `/` como desde `/luxor-muebles/`, revisar carga y
dimensiones, cuatro anchos, encuadres, errores HTTP y consola. Pendientes: fotografías
reales autorizadas de los productos y, si las mediciones futuras lo justifican, variantes
de resolución y una estrategia específica de carga diferida para fondos fuera de pantalla.

## Documentación de la raíz anterior

El README original de la raíz contenía:

# luxor-muebles

## Publicación en GitHub Pages

URL esperada: https://santiago-sanchez01.github.io/luxor-muebles/
Repositorio: https://github.com/Santiago-Sanchez01/luxor-muebles

La reorganización coloca `index.html`, `producto.html`, `css/`, `js/`, `assets/` y
`.gitignore` directamente en la raíz. La documentación previa se conserva integrada
en este README. Los archivos de la aplicación no requieren compilación ni instalación.

Después de revisar y autorizar el commit y push de la reorganización:

1. En GitHub, abrir **Settings → Pages** del repositorio.
2. En **Build and deployment → Source**, seleccionar **Deploy from a branch**.
3. Seleccionar la rama **main** y la carpeta **/(root)**; guardar con **Save**.
4. Revisar **Actions** hasta que finalice correctamente el despliegue de Pages.
5. Abrir la URL indicada y probar también `producto.html?id=valentina`.

Las rutas HTML, imports ES y recursos visuales son relativos, compatibles con el
prefijo `/luxor-muebles/`. No usar `/css/`, `/js/` o `/assets/` como rutas desde la
raíz del dominio. Los enlaces externos de WhatsApp conservan sus destinos.

Esta corrección local no cambia por sí sola el sitio publicado: requiere el commit,
push y despliegue posteriores autorizados. No se modificó la configuración remota.
Guía oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
