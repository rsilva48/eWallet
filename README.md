# eWallet
Reto Frontend realizado por Roger Silva

## Dependencias

### Instalar Node.js compatible con la version de Angular 12.2.17 en Windows

Descargar de [este enlace](https://github.com/coreybutler/nvm-windows/releases/) descargar la ultima versión de Node Version Manager para Windows, buscar en el listado del ultimo release el archivo nvm-setup.exe y ejecutar desde CLI los comandos señalados al final de la sección.

Es posible instalar NVM sobre una instalación actual de Node.js.

```
nvm install 16
nvm use 16.20.2
```
Oficialmente la ultima versión de Node.js compatible con Angular 12.2.17 es 14.15.0 [(Fuente)](https://angular.io/guide/versions), pero estamos instalando la versión 16.20.2 que es mas reciente y que es compatible con Webpack 5 utilizado por Angular 12. 

## Servir app
```
ionic serve
```
Debe abrirse automaticamente en el navegador una página con la dirección http://localhost:8100 en donde se estara ejecutando el proyecto.

Para cerrar el servidor apretar la combinación de teclas Control + C en la terminal donde se esta ejecutando.
