# Luxor Muebles

Proyecto web para un negocio argentino dedicado a la venta de sillones personalizados.
El objetivo del sitio es presentar el negocio y sus modelos, explicar las opciones de
personalización y facilitar el contacto usando información real y aprobada.

## Tecnologías

- HTML5 semántico para organizar el contenido.
- CSS3 para la presentación y la adaptación a distintos tamaños de pantalla.
- JavaScript vanilla con módulos ES para el menú y el comportamiento del header.
- Git y GitHub para control de versiones y colaboración.

No se utilizan frameworks, librerías, fuentes externas ni dependencias.

## Estructura

```text
luxor-muebles/
├── index.html
├── README.md
├── .gitignore
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    ├── images/
    └── icons/
```

- `index.html`: documento principal con navegación y las siete secciones previstas.
- `css/styles.css`: reset básico, variables visuales, estilos responsive y accesibilidad.
- `js/main.js`: módulo ES para el menú móvil, la sombra al desplazarse y la medición de la altura real del header.
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
   Modelos destacados; los accesos a WhatsApp llevan provisionalmente a Contacto.
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
Modelos destacados, Personalización, Opiniones, Nosotros y Contacto conservan su
estructura provisional. El catálogo funcional y el footer definitivo no están desarrollados.

La paleta provisional utiliza negro carbón, blanco cálido y rojo de acento. La fuente
funcional es la del sistema y el título del hero usa Georgia con alternativas locales,
sin descargas externas. Se incluyen estilos de foco visible
y respeto por la preferencia de movimiento reducido.

Pendientes: logo oficial, fotografía local aprobada del sillón y número comercial de
WhatsApp. Por ahora se usa el texto “LUXOR MUEBLES”, un fondo CSS con degradados y
enlaces a Contacto. Para incorporar la foto más adelante, colocar el recurso aprobado
en `assets/images/` y actualizar `--hero-image` en CSS con una ruta relativa a ese archivo.

No se incorporaron imágenes, reseñas, precios, garantías, direcciones ni horarios.
No se publicaron fotografías del catálogo mayorista. No se realizaron commits ni push.
La carpeta superior ya contiene un repositorio Git; no se inicializó otro anidado.
Las próximas fases requieren autorización del responsable del proyecto.
