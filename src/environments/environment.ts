// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//Este archivo con la información sensitiva normalmente estaria dentro de .gitignore para que no se suba a repositorios públicos

export const environment = {
  production: false,
  // Configuración de Firebase en ambiente de desarrollo
  firebase: {
    apiKey: "AIzaSyBTXiQS-VwjjNg7bj3fRu7Ff0Rr9UN3UOY",
    authDomain: "rsewallet.firebaseapp.com",
    projectId: "rsewallet",
    storageBucket: "rsewallet.appspot.com",
    messagingSenderId: "329064991437",
    appId: "1:329064991437:web:79e43e9bc9037c9e41f784",
    measurementId: "G-VMDB3PRDB7"
  },
  // Información de usuario de prueba para consultas en firebase
  owner: "rsilva",
  ownerid: "123",
  accpath: "accounts",
  userspath: "users",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
