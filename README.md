# Luxor Muebles | Sillones personalizados

Sitio web de **Luxor Muebles**, un negocio argentino dedicado a la venta de sillones personalizados.

El objetivo del proyecto es presentar sus modelos, mostrar opciones de personalización y facilitar el contacto con potenciales clientes.

🌐 **[Ver página web](https://santiago-sanchez01.github.io/luxor-muebles/)**

💻 **[Ver repositorio en GitHub](https://github.com/Santiago-Sanchez01/luxor-muebles)**

> **Estado del proyecto:** MVP en desarrollo. Algunas imágenes son ilustrativas y las especificaciones comerciales están sujetas a confirmación.

## Funcionalidades

- **Diseño responsive:** adaptado a computadoras, tablets y celulares.
- **Catálogo de sillones:** modelos con descripciones y medidas de referencia.
- **Búsqueda y filtros:** búsqueda por nombre y selección de categoría.
- **Modelos destacados:** carrusel horizontal con controles de navegación.
- **Fichas de producto:** información individual, galería de imágenes y modelos relacionados.
- **Personalización:** selección de tapizado, color y patas para preparar una consulta.
- **WhatsApp:** generación de mensajes con el modelo y las preferencias seleccionadas.
- **Copiar consulta:** permite copiar el mensaje generado.
- **Opiniones:** sección preparada para reseñas verificadas, con acceso a Facebook.
- **Animaciones:** transiciones suaves al recorrer la página.

El sitio también incorpora navegación por teclado, indicadores de foco y compatibilidad con la preferencia de movimiento reducido.

## Tecnologías utilizadas

- **HTML5:** estructura y contenido.
- **CSS3:** estilos, diseño responsive y animaciones.
- **JavaScript:** interactividad mediante módulos ES.
- **Git y GitHub:** control de versiones.
- **GitHub Pages:** publicación del proyecto.

No utiliza frameworks ni requiere instalar dependencias.

## Cómo ejecutar el proyecto

**1. Clonar el repositorio**

```bash
git clone https://github.com/Santiago-Sanchez01/luxor-muebles.git
```

**2. Abrir el proyecto**

Abrí la carpeta `luxor-muebles` en Visual Studio Code.

**3. Iniciar un servidor local**

Podés utilizar la extensión **Live Server** de VS Code o ejecutar este comando desde la raíz del proyecto:

```bash
python -m http.server 8000
```

**4. Abrir la página**

Ingresá a:

http://localhost:8000

> Se recomienda utilizar un servidor local porque el proyecto trabaja con módulos de JavaScript.

## Estructura del proyecto

```text
luxor-muebles/
├── index.html
├── producto.html
├── favicon.ico
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── producto.js
│   ├── productos.js
│   ├── tarjetas.js
│   ├── imagenes.js
│   ├── opciones.js
│   ├── config.js
│   ├── opiniones.js
│   └── animaciones.js
├── assets/
│   ├── images/
│   └── icons/
├── .gitignore
└── README.md
```

### Archivos principales

| Archivo | Función |
|---|---|
| `index.html` | Página principal |
| `producto.html` | Ficha individual de cada sillón |
| `css/styles.css` | Diseño visual y responsive |
| `js/main.js` | Funcionalidades de la página principal |
| `js/producto.js` | Funcionalidades de las fichas |
| `js/productos.js` | Información del catálogo |
| `js/opciones.js` | Opciones de personalización |
| `js/config.js` | Configuración de WhatsApp |
| `js/opiniones.js` | Testimonios de clientes |
| `js/animaciones.js` | Animaciones de entrada |

## Cómo actualizar el contenido

**Productos:** los modelos se administran desde `js/productos.js`. Cada producto debe tener un identificador único. Las tarjetas y las fichas utilizan estos datos automáticamente.

**Fotografías:** las imágenes se guardan en `assets/images/productos/`, organizadas por modelo. Sus rutas se incorporan al campo `imagenes` del producto correspondiente.

**Personalización:** las opciones de tapizados, colores y patas se administran desde `js/opciones.js`.

**WhatsApp:** el número comercial está centralizado en `js/config.js`.

**Opiniones:** las reseñas verificadas y autorizadas se pueden incorporar desde `js/opiniones.js`.

### Experiencias reales

`js/opiniones.js` contiene diez transcripciones anonimizadas proporcionadas por el
responsable. Las diez tienen `aprobada: true` tras su autorización expresa y se
muestran directamente en la homepage normal. No dependen de una vista previa,
parámetros de URL ni servidores especiales. El filtro de aprobación sigue vigente.

Cada entrada tiene `id` único, `texto` original, `fuente`, `fecha` ISO y `aprobada`.
Para incorporar o quitar opiniones, editar el array; cambiar la aprobación a `true`
solo tras autorización documentada. No se muestran nombres, iniciales, perfiles,
estrellas ni etiquetas de comprador verificado. Se presenta mes y año, sin reescribir
los textos. Las capturas originales deben cotejarse antes de publicar.

Cero aprobadas: respaldo editorial. Una: tarjeta sin controles. Varias: carril
horizontal nativo con Scroll Snap, contador `01 / 10` y pausa/reanudación.
Con teclado, enfocar el carril y usar flechas o Inicio/Fin. En móvil se desliza
con el dedo; en desktop se puede usar trackpad o arrastrar los márgenes de las
tarjetas. El texto conserva su selección nativa. No se intercepta la rueda vertical.
La navegación circular vuelve al inicio sin recorrer rápidamente todo el carril.

El autoplay espera 4 segundos completos tras cada desplazamiento. No se pausa
por hover ni por navegación manual terminada: se pausa mientras hay gesto, foco
dentro, pestaña oculta o carrusel fuera del viewport. La pausa explícita se conserva
hasta elegir reanudar. Movimiento reducido desactiva autoplay y scroll animado.
Sin IntersectionObserver se conserva la navegación manual. Solo se anuncia la
posición tras movimientos manuales; los automáticos no generan avisos repetitivos.
Los slides inactivos usan `inert` y `aria-hidden`.

En móvil las tarjetas tienen altura natural: fuente y fecha quedan junto al texto.
El carril reserva la altura de la opinión más larga, con fondo oscuro debajo de
las tarjetas cortas, para conservar la posición de controles y CTA sin saltos.
La tarjeta marfil contrasta con la ambientación decorativa propia de Opiniones:
`assets/images/marca/hero-opinion.webp`, con overlay cálido y encuadre responsive.
El JPEG original `hero-opinion.jpg` se conserva intacto: 1168 × 784 px, 311.000 bytes.
La versión WebP mantiene las dimensiones y pesa 128.220 bytes (58,8 % menos),
codificada localmente con calidad 86 %. No se presenta como producto, cliente ni
instalación real. Para reemplazarla, actualizar `--reviews-image` en `.reviews-panel`.
El fondo carbón permanece como respaldo.

Las instrucciones de Destacados y Opiniones están visualmente ocultas y conservan
sus referencias ARIA. La nota visible de Opiniones se retiró; los datos mantienen
la anonimización y aprobación. La aclaración comercial de Catálogo se conserva
debajo de las tarjetas para despejar el encabezado sin perder información importante.
Al finalizar cada desplazamiento se corrige la alineación a partir de la posición
real de la tarjeta, sin depender del redondeo de columnas fraccionarias.

WhatsApp conserva su configuración general. El CTA de Facebook de esta sección utiliza
la fuente de recomendaciones proporcionada, con `&sk=reviews`; no se modifican otros
enlaces sociales. No se implementa conexión a Facebook ni se guardan datos de prueba.

Validado en Chrome a 375, 768, 1024 y 1440 px, con texto al 200 %, estados
cero/una/diez opiniones, rotación y pausas, teclado y prefijo `/luxor-muebles/`.
El arrastre se verificó con entradas de mouse en Chrome. Swipe y desplazamiento
horizontal se comprobaron con emulación táctil y eventos de rueda del navegador;
la pestaña oculta se simuló. Queda la revisión con celular y trackpad físicos.
No hubo errores JavaScript ni recursos de la sección faltantes.

### Favicon y metadatos

Ambas páginas utilizan rutas relativas para `favicon.ico` (16, 32 y 48 px),
`assets/icons/favicon-32.png` y `assets/icons/apple-touch-icon.png` (180 px).
Se derivan únicamente del símbolo central del logo oficial
`assets/images/luxor-logo-fondo-oscuro.png`, recortado sin las letras adyacentes
y reducido sobre fondo carbón; los logos originales permanecen intactos.
Los recursos se generaron localmente sin instalar dependencias. El ICO en la raíz
también responde a la solicitud automática del navegador y resuelve el 404 anterior.

Se conservan los títulos, metadescripciones, idioma `es-AR` y viewport de las dos
páginas. La ficha actualiza su título con el modelo seleccionado mediante JavaScript.
Las rutas funcionan desde la raíz (incluida Cloudflare Pages) y bajo
`/luxor-muebles/` en GitHub Pages. No hace falta un proceso de compilación;
la carpeta publicada debe contener directamente `index.html` y los recursos.

Comprobado localmente en Chrome: iconos con respuesta HTTP 200 desde ambas bases,
homepage y ocho fichas sin errores JavaScript, y sin desbordamientos a 375, 768,
1024 y 1440 px. Falta comprobar visualmente el icono en la pestaña de una ventana
normal y en los alojamientos reales tras un despliegue autorizado.
Pendiente detectado: `#lista-productos` referencia `catalogo-nota` mediante
`aria-describedby`, pero ese elemento no existe actualmente; revisar por separado.

## Estado del proyecto

El catálogo contiene ocho modelos: Chicago, Nube, Valentina, Denver, Nube Max,
Chicago Premium, Naza y Madrid. Los IDs anteriores `amelia` y `miami` muestran
“Producto no encontrado”; no redirigen a otros modelos.

Las fotografías se asocian desde `imagenes` en `js/productos.js`, conservando sus
rutas locales, incluidos los espacios de `nube max/` y `chicago premium/`.
Su procedencia está marcada como `tipo: 'no-verificada'` hasta la confirmación
del responsable. Naza utiliza `assets/images/productos/naza/naza-1.jpeg`.

`js/medidas.js` comparte el formato entre tarjetas y fichas. Naza tiene dos variantes
principales (1,80 × 0,90 m o 2 × 0,90 m) y camastro de 0,65 × 0,65 m independiente;
no se suman dimensiones. Todas las medidas y opciones siguen sujetas a confirmación.

Las descripciones no repiten el nombre ni las medidas: estas se muestran en su bloque
específico. Las fichas reutilizan el footer visual de la homepage, con enlaces de regreso
a sus secciones. `js/comunes.js` comparte el año dinámico y los enlaces generales de
WhatsApp; la consulta personalizada de cada ficha conserva sus preferencias.

El sitio cuenta con las principales funcionalidades del MVP implementadas.

Antes de su lanzamiento comercial definitivo, quedan pendientes:

- Incorporar fotografías autorizadas de los productos.
- Confirmar medidas, precios y características comerciales.
- Validar las opciones reales de personalización.
- Incorporar nuevas recomendaciones únicamente con verificación y autorización.
- Completar los datos comerciales y las condiciones de entrega.
- Realizar las pruebas finales de rendimiento y experiencia de usuario.

**Nota sobre las imágenes:** algunas fotografías ambientales fueron generadas con inteligencia artificial y tienen fines ilustrativos. No representan necesariamente productos, instalaciones o espacios reales de Luxor Muebles.

## Publicación

El proyecto se encuentra publicado mediante **GitHub Pages**, utilizando la rama `main` y la carpeta raíz del repositorio.

**[Visitar Luxor Muebles](https://santiago-sanchez01.github.io/luxor-muebles/)**

---

**Luxor Muebles** — Proyecto web en desarrollo.
