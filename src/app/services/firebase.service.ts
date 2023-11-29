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
  //Consuulta y retorna todos los usuarios
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
    // Obtener las cuentas
    const cuentaOrigen = await this.getCuenta(origen);
    const cuentaDestino = await this.getCuenta(destino);

    // Verificar que haya suficiente saldo
    if (cuentaOrigen.saldo < monto) {
      throw new Error('No hay suficiente saldo en la cuenta de origen.');
    }

    // Realizar la transferencia
    cuentaOrigen.saldo -= monto;
    cuentaDestino.saldo += monto;

    // Actualizar las cuentas en Firebase
    await this.updateCuenta(origen, cuentaOrigen);
    await this.updateCuenta(destino, cuentaDestino);

    // Registrar la transacción en Firebase
    const transferencia = {
      origen,
      destino,
      monto,
      fecha: new Date().toISOString(),
    };
    await this.addTranferencia(transferencia);
  }
}
