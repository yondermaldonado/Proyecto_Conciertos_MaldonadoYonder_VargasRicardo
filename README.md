# Conciertos Conectados yonder maldonado ricardo vargas

**PEPE EL BOTELON** es un sitio web responsivo diseñado para simular una tienda online enfocada en la venta de entradas para eventos. El proyecto cuenta con una arquitectura limpia de carpetas y esta optimizado para ofrecer una experiencia de usuario fluida tanto en dispositivos moviles como pantallas de escritorio.

## descripcion del proyecto

Aplicación web desarrollada con HTML5, CSS3 y JavaScript Vanilla para la gestión y compra de tickets de eventos.

El sistema permite a los usuarios visualizar eventos disponibles, filtrarlos por categoría y ciudad, agregarlos a un carrito de compras y registrar la compra. Además, cuenta con un panel administrativo para gestionar categorías, eventos y consultar el historial de ventas.

## caracteristcas

### modulo cliente

Visualización de eventos disponibles.
Búsqueda por nombre del evento.
Filtro por ciudad.
Filtro por categoría.
Visualización de detalles de cada evento.
Carrito de compras.
Eliminación de productos del carrito.
Registro de datos del comprador.
Generación de ventas.
Persistencia de la información mediante LocalStorage.

### modulo administrador

Inicio de sesión con credenciales de administrador.

Credenciales por defecto

Correo:

admin@mail.com

Contraseña:

123456

El administrador puede:

Gestionar categorías (CRUD).
Gestionar eventos (CRUD).
Consultar el historial de ventas.
Visualizar el detalle completo de cada compra.
Cerrar sesión.

## tecnologias utilizadas

HTML5
CSS3
JavaScript
LocalStorage
Web Components

## persistencia de datos

Toda la información es almacenada utilizando LocalStorage, incluyendo:

Categorías.
Eventos.
Carrito de compras.
Historial de ventas.

Al cerrar o actualizar el navegador, la información permanece almacenada.

## instrucciones de visualizacion 

Descargar o clonar el repositorio.
git clone [URL_DEL_REPOSITORIO](https://github.com/yondermaldonado/Proyecto_Conciertos_MaldonadoYonder_VargasRicardo)
Abrir la carpeta del proyecto.
Ejecutar el archivo:
index.html

o utilizar una extensión como Live Server en Visual Studio Code.

## vistas de la pagina

### vista del cliente

[visual_cliente](/img/cliente.png)
[visual_carrito](/img/carrito.png)

### vista del administrador
[visual_login](/img/login.png)
[visual_CRUD_categorias](/img/categorias.png)
[visual_CRUD_eventos](/img/eventos.png)
[visual_ventas](/img/ventas.png)