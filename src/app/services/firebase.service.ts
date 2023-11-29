import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Database,
  listVal,
  ref,
  set,
  push,
  get,
  child,
} from '@angular/fire/database';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FBDBService {
  public cuentas: Observable<any>;
  public usuarios: Observable<any>;

  //Se inyecta la base de datos de Firebase y se accede a la referencias establecida en el archivo de entorno, para asignarlo a la variables como un arreglo
  constructor(private db: Database) {
    const AccRef = ref(this.db, environment.accpath);
    this.cuentas = listVal(AccRef);

    const UsrRef = ref(this.db, environment.userspath);
    this.usuarios = listVal(UsrRef);
  }

  //Consulta y retorna todas las cuentas
  getCuentas(): Observable<any> {
    return this.cuentas;
  }
  //Consulta y retorna todos los usuarios
  getUsuarios(): Observable<any> {
    return this.usuarios;
  }
  //Consulta y retorna la cuenta especificada en el argumento de la función
  async getCuenta(id: string) {
    const res = await get(child(ref(this.db), environment.accpath + `${id}`));
    return res.val();
  }
  //Actualiza la cuenta especificada en el primer argumento de la función con el objeto cuenta
  async updateCuenta(id: string, cuenta: any) {
    const res = await set(
      child(ref(this.db), environment.accpath + `${id}`),
      cuenta
    );
  }
  //Añade una transferencia al listado de transacciones
  //Deberia añadirse a la cuenta de origen y destino
  async addTranferencia(transferencia: any) {
    await push(child(ref(this.db), environment.transpath), transferencia);
  }
  async transferir(origen: string, destino: string, monto: number) {
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

    //Crea la transacción a regsitrar en Firebase
    const transferencia = {
      origen,
      destino,
      monto,
      fecha: new Date().toISOString(),
    };

    //Crea historial de transferencia para cada cuenta de origen y destino
    const transferenciaOrigen = {
      origen: origen,
      destino: destino,
      monto: -monto, // Monto negativo para la cuenta de origen
      fecha: new Date().toISOString(),
    };

    const transferenciaDestino = {
      destino: destino,
      origen: origen,
      monto: monto, // Monto positivo para la cuenta de destino
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
      child(ref(this.db), environment.userspath + `${cuentaOrigen.ownerid}/transacciones`),
      transferenciaOrigen
    );

    // Añadir la transferencia al historial de transacciones del usuario de destino
    await push(
      child(ref(this.db), environment.userspath + `${cuentaOrigen.ownerid}/transacciones`),
      transferenciaDestino
    );
  }
}
