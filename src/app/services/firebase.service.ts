import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import {
  Database,
  listVal,
  ref,
  set,
  push,
  get,
  child,
  list,
} from '@angular/fire/database';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FBDBService {
  constructor(private db: Database) {}

  //Consulta y retorna todas las cuentas
  getCuentas() {
    const AccRef = ref(this.db, environment.accpath);
    return listVal(AccRef);
  }

  //Consulta y retorna todos los usuarios
  getUsuarios() {
    const UsrsRef = ref(this.db, environment.userspath);
    return listVal(UsrsRef);
  }

  //Consulta y retorna la cuenta especificada en el argumento de la función
  async getCuenta(id: string) {
    const res = await get(child(ref(this.db), environment.accpath + `${id}`));
    return res.val();
  }

  //Consulta y retorna el perfil del usuario especificado en el argumento de la función
  async getProfile(id: string) {
    const res = await get(child(ref(this.db), environment.userspath + `${id}`));
    return res.val();
  }

  //Devuelve el nombre del usuario logueado
  getUsername() {
    return get(
      child(ref(this.db), environment.userspath + `${environment.uid}/name`)
    ).then((snapshot) => {
      return snapshot.val();
    });
  }

  //Devuelve el nombre del la cuenta del id proporcionado
  getAccountname(aid: string) {
    return get(child(ref(this.db), environment.userspath + `${aid}/name`)).then(
      (snapshot) => {
        return snapshot.val();
      }
    );
  }

  //Devuelve un arreglo con las transacciones del usuario logueado
  getUserTrans(): Promise<any[]> {
    return get(
      child(
        ref(this.db),
        environment.userspath + `${environment.uid}/transacciones`
      )
    )
      .then((snapshot) => {
        if (snapshot.exists()) {
          return Object.values(snapshot.val());
        } else {
          return [];
        }
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }
  //Actualiza la cuenta especificada en el primer argumento de la función con el objeto cuenta
  async updateCuenta(id: string, cuenta: any) {
    const res = await set(
      child(ref(this.db), environment.accpath + `${id}`),
      cuenta
    );
  }
  //Añade una transferencia al listado de transacciones
  async addTranferencia(transferencia: any) {
    await push(child(ref(this.db), environment.transpath), transferencia);
  }
  async transferir(
    origen: string,
    destino: string,
    monto: number,
    desc: string
  ) {
    //Obtener las cuentas
    const cuentaOrigen = await this.getCuenta(origen);
    const cuentaDestino = await this.getCuenta(destino);

    //Verificar que haya suficiente saldo
    if (cuentaOrigen.saldo < monto) {
      throw new Error('No hay suficiente saldo en la cuenta de origen.');
    }

    //Realizar la transferencia
    cuentaOrigen.saldo -= monto;
    cuentaDestino.saldo += monto;

    //Actualizar las cuentas en Firebase
    await this.updateCuenta(origen, cuentaOrigen);
    await this.updateCuenta(destino, cuentaDestino);

    //Crea la transacción a registrar en Firebase
    const transferencia = {
      name: cuentaOrigen.name,
      origen,
      destino,
      monto,
      desc,
      fecha: new Date().toISOString(),
    };

    //Crea historial de transferencia para cada cuenta de origen y destino
    const transferenciaOrigen = {
      name: cuentaOrigen.name,
      origen: origen,
      destino: destino,
      monto: -monto, // Monto negativo para la cuenta de origen
      desc: desc,
      fecha: new Date().toISOString(),
    };

    const transferenciaDestino = {
      name: cuentaDestino.name,
      origen: origen,
      destino: destino,
      monto: monto, // Monto positivo para la cuenta de destino
      desc: desc,
      fecha: new Date().toISOString(),
    };

    //Añadir la transferencia al historial de la cuenta de origen
    if (!cuentaOrigen.transferencias) {
      cuentaOrigen.transferencias = [];
    }
    cuentaOrigen.transferencias.push(transferenciaOrigen);

    //Añadir la transferencia al historial de la cuenta de destino
    if (!cuentaDestino.transferencias) {
      cuentaDestino.transferencias = [];
    }
    cuentaDestino.transferencias.push(transferenciaDestino);

    //Registra la transferencia en Firebase
    await this.addTranferencia(transferencia);

    //Registra la transferencia en las respectivas cuentas en firebase
    await this.updateCuenta(origen, cuentaOrigen);
    await this.updateCuenta(destino, cuentaDestino);

    // Añadir la transferencia al historial de transacciones del usuario de origen
    await push(
      child(
        ref(this.db),
        environment.userspath + `${cuentaOrigen.ownerid}/transacciones`
      ),
      transferenciaOrigen
    );

    // Añadir la transferencia al historial de transacciones del usuario de destino
    await push(
      child(
        ref(this.db),
        environment.userspath + `${cuentaOrigen.ownerid}/transacciones`
      ),
      transferenciaDestino
    );
  }
}
