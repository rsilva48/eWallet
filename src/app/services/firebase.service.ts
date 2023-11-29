import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Database, listVal, ref } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FBDBService {
  public cuentas: Observable<any>;
  public usuarios: Observable<any>;

   //Se inyecta la base de datos de Firebase y se accede a la referencia de cuentas establecida en el archivo de entorno, para asignarlo a la variable cuentas como un arreglo
  constructor(private database: Database) {
    const AccRef = ref(this.database, environment.accpath);
    this.cuentas = listVal(AccRef);

    const UsrRef = ref(this.database, environment.userspath);
    this.usuarios = listVal(UsrRef);
  }

  getCuentas(): Observable<any> {
    return this.cuentas;
  }
  getUsuarios(): Observable<any> {
    return this.usuarios;
  }
}