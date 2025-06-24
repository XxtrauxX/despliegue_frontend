# Frontend: Sistema de Gestión para Atunes del Pacífico S.A.

Este proyecto es la interfaz de usuario (UI) para el Sistema de Gestión de Atunes del Pacífico S.A. Es una aplicación de una sola página (SPA) moderna, construida con **React** y **Vite**, que consume la API RESTful proporcionada por el backend de Spring Boot.

La aplicación ofrece vistas y funcionalidades específicas para cada rol de usuario (Administrador, Operador y Cliente) y utiliza una interfaz profesional y atractiva gracias a la biblioteca de componentes **MUI (Material-UI)**.

## ✨ Características

* Interfaz de inicio de sesión segura con manejo de tokens JWT.
* Navegación protegida y enrutamiento basado en roles de usuario.
* Paneles de control (Dashboards) específicos para cada rol.
* Formularios para la creación de pedidos y gestión de inventario.
* Visualización de datos y reportes mediante gráficos interactivos.
* Diseño responsivo que se adapta a diferentes tamaños de pantalla.

## 🛠️ Tecnologías Utilizadas

* **Framework**: React (con Vite)
* **Enrutamiento**: `react-router-dom`
* **Componentes UI**: MUI (Material-UI)
* **Peticiones HTTP**: Axios (para consumir la API del backend)
* **Gráficos**: `chart.js` y `react-chartjs-2`
* **Manejo de JWT**: `jwt-decode`

## 🚀 Puesta en Marcha (Local)

Sigue estos pasos para configurar y ejecutar el frontend en tu entorno de desarrollo.

### 1. Requisitos Previos

* Node.js (versión 18 o superior recomendada) y npm.
* Tener el [servidor del backend](#) corriendo localmente en el puerto `8080`.

### 2. Instalación

1.  Abre una terminal y navega a la carpeta del proyecto de frontend (ej. `atunes-pacifico-ui`).

2.  Instala todas las dependencias del proyecto con npm:
    ```bash
    npm install
    ```

### 3. Configuración

La aplicación necesita saber la URL del backend al que debe conectarse.

1.  En la raíz del proyecto de frontend, crea un nuevo archivo llamado `.env.local`.

2.  Añade la siguiente línea a ese archivo. Esto le dirá a la aplicación que el backend está corriendo en `http://localhost:8080`.
    ```
    VITE_API_URL=http://localhost:8080
    ```

### 4. Uso

Una vez instalado y configurado, puedes usar los siguientes scripts:

* **Para iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` y se recargará automáticamente cada vez que hagas cambios en el código.

* **Para construir la versión de producción:**
    ```bash
    npm run build
    ```
    Este comando creará una carpeta `dist` con todos los archivos optimizados, listos para ser desplegados en un servidor web como Apache o Vercel.

##  Consume de Endpoints del Backend

La comunicación con el backend se maneja de forma centralizada utilizando **Axios**, una librería potente que simplifica las peticiones HTTP (basada en la `fetch` API nativa del navegador).

* **Cliente de API**: Se ha configurado un cliente de `axios` en `src/services/api.js`.
* **Inyección Automática de Token**: Este cliente utiliza un "interceptor" para adjuntar automáticamente el token JWT (`Authorization: Bearer ...`) a cada petición enviada a los endpoints protegidos después de que el usuario haya iniciado sesión.
* **Servicios**: La lógica de cada petición está organizada en archivos de servicio dentro de la carpeta `src/services/` (ej. `authService.js`, `pedidoService.js`). Esto mantiene el código de los componentes limpio y enfocado en la interfaz.


