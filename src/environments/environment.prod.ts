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
  user: "rsilva",
  uid: "123",
  // Rutas de la base de datos de Firebase
  accpath: "accounts/",
  userspath: "users/",
  transpath: "transacciones/",
  // Configuración de Toasts, no permitio importarlo en el modulo de transferencias
  toastpos: 'bottom',
};