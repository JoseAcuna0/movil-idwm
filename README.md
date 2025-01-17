## Tienda UCN - Proyecto Ionic

Tienda UCN es una aplicación desarrollada en Ionic Framework que permite a los usuarios realizar diversas acciones, como visualizar productos, añadirlos al carrito de compras, gestionar su cuenta y más. A continuación, encontrarás las instrucciones para configurar y ejecutar el proyecto correctamente.

## Requisitos Previos
Antes de comenzar, asegúrate de contar con las siguientes herramientas instaladas en tu sistema:

Node.js
Descárgalo desde https://nodejs.org/. Se recomienda usar la versión LTS.

NPM o Yarn
NPM viene incluido con Node.js, pero también puedes usar Yarn si lo prefieres.

Ionic CLI
Instálalo globalmente ejecutando el siguiente comando en tu terminal:

bash
Copiar código
npm install -g @ionic/cli

## Servidor Backend
Configura un servidor API ejecutándose en http://localhost:5132 que provea los siguientes endpoints:

# Instrucciones de Configuración
Clonar el Repositorio
Descarga este proyecto en tu máquina local con el siguiente comando:

bash
Copiar código
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
Instalar Dependencias
Instala todas las dependencias necesarias ejecutando:

bash
Copiar código
npm install
Configurar el Backend
Verifica que el servidor API esté configurado correctamente y ejecutándose en http://localhost:5132. Revisa la documentación de tu backend para asegurarte de que las rutas y respuestas sean correctas.

## Iniciar el Proyecto
Lanza el servidor de desarrollo con el comando:

ionic serve
Esto abrirá la aplicación en tu navegador predeterminado en la dirección http://localhost:8100.

## Probar en Modo Móvil
Abrir Herramientas de Desarrollo
Abre la página http://localhost:8100 en Google Chrome. Presiona Ctrl+Shift+I (o Cmd+Option+I en macOS) para abrir las herramientas de desarrollo.

Cambiar a Vista Móvil
Haz clic en el ícono de dispositivo móvil en la esquina superior izquierda de las herramientas.

Seleccionar iPhone 14 Pro Max
En la barra superior, cambia el dispositivo a iPhone 14 Pro Max.

Actualizar la Página
Recarga la página (Ctrl+R o Cmd+R) para aplicar los cambios de visualización.

Notas Importantes
Autenticación

El sistema utiliza localStorage para almacenar el ID del usuario autenticado.
Configura correctamente los endpoints en el backend para gestionar el inicio de sesión y otras operaciones relacionadas.
Problemas de CORS
Si encuentras problemas relacionados con CORS, asegúrate de permitir el dominio http://localhost:8100 en la configuración de tu backend.

Tecnologías Utilizadas
Ionic Framework: Framework para aplicaciones híbridas.
Angular: Framework de desarrollo web.
TypeScript: Lenguaje de programación fuertemente tipado.
REST API: Comunicación con el servidor backend.
Contribuciones
Este proyecto fue desarrollado por [Tu Nombre].
Si tienes preguntas o encuentras problemas, por favor crea un Issue en este repositorio.

Licencia
Este proyecto está bajo la licencia MIT. Revisa el archivo LICENSE para más detalles.

