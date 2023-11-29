//Se intento registrar firebase como un servicio, pero no funciono, por lo que se opto por dejarlo sin utilizar
//Se habia importado y añadido a los providers en app.module.ts para poder registrarlo en otros componentes
//Se dejara guardado el codigo por si se quiere intentar de nuevo

import { Injectable } from '@angular/core';
import { getDatabase, ref, query, onValue } from '@angular/fire/database';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  cuentas: any[] = [];

  constructor() {
    const db = getDatabase();
    const AccRef = ref(db, environment.accpath);
    onValue(query(AccRef), snapshot => {
      this.cuentas = [];
      snapshot.forEach(childSnapshot => {
        this.cuentas.push(childSnapshot.val());
      });
    });
  }

  getCuentas() {
    return this.cuentas;
  }
}