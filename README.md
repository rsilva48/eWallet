# eWallet
Reto Frontend realizado por Roger Silva

## Dependencias

### Requisitos de compatibilidad

- Version 12 de Angular Core (@angular/core@12.2.17)

- Version 5 de Ionic Framework Angular (@ionic/angular@5.9.4)

- Version 6 de Ionic CLI (@ionic/cli@6.20.9)

Los comandos utilizados para hacer downgrade a las versiones solicitadas estan en el archivo [Comandos](Comandos.md)

### Firebase y AngularFire
Se instalaron las ultimas versiones soportadas y compatibles con Angular v12

- AngularFire v7 (@angular/fire@^7.6.1)

- Firebase v9 (firebase@^9.23.0)

Se esta utilizando el API Modular de Firebase

## Instalación

### Instalar Node.js compatible con la version de Angular 12.2.17 en Windows

Descargar de [este enlace](https://github.com/coreybutler/nvm-windows/releases/) descargar la ultima versión de Node Version Manager para Windows, buscar en el listado del ultimo release el archivo nvm-setup.exe y ejecutar desde CLI los comandos señalados al final de la sección.

Es posible instalar NVM sobre una instalación actual de Node.js.

```
nvm install 16
nvm use 16.20.2
```
Oficialmente la ultima versión de Node.js compatible con Angular 12.2.17 es 14.15.0 [(Fuente)](https://angular.io/guide/versions), pero estamos instalando la versión 16.20.2 que es mas reciente y que es compatible con Webpack 5 utilizado por Angular 12. 

### Instalar dependencias del proyecto
```
npm install -g @ionic/cli
npm install
```
## Servir app
```
ionic serve
```
Es posible que la primera vez salga una alerta del firewall de Windows para permitirle acceso a Node.js, hay que darle a permitir/allow.

Debe abrirse automaticamente en el navegador una página con la dirección http://localhost:8100 en donde se estara ejecutando el proyecto.

Para cerrar el servidor apretar la combinación de teclas Control + C en la terminal donde se esta ejecutando.
