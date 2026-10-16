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

## Estado del proyecto

El sitio cuenta con las principales funcionalidades del MVP implementadas.

Antes de su lanzamiento comercial definitivo, quedan pendientes:

- Incorporar fotografías autorizadas de los productos.
- Confirmar medidas, precios y características comerciales.
- Validar las opciones reales de personalización.
- Incorporar testimonios verificados y autorizados.
- Completar los datos comerciales y las condiciones de entrega.
- Realizar las pruebas finales de rendimiento y experiencia de usuario.

**Nota sobre las imágenes:** algunas fotografías ambientales fueron generadas con inteligencia artificial y tienen fines ilustrativos. No representan necesariamente productos, instalaciones o espacios reales de Luxor Muebles.

## Publicación

El proyecto se encuentra publicado mediante **GitHub Pages**, utilizando la rama `main` y la carpeta raíz del repositorio.

**[Visitar Luxor Muebles](https://santiago-sanchez01.github.io/luxor-muebles/)**

---

**Luxor Muebles** — Proyecto web en desarrollo.
