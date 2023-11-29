import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FBDBService } from '@services/firebase.service'; 

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public cuentas: Observable<any> | undefined;
  origen: string= '';
  destino: string= '';
  monto: number= 0;

  //Se inyecta el servicio de Firebase y se asigna a database
  constructor(private db: FBDBService) {  }
  
  ngOnInit(): void {
    //Se asigna a cuentas el observable de cuentas que se obtiene de la base de datos
    this.cuentas = this.db.getCuentas(); // Obtiene cuentas de FBDBService
  }

  async transferir() {
    try {
      await this.db.transferir(this.origen, this.destino, this.monto);
      alert('Transferencia realizada con éxito.');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Error desconocido.')
      }
    }
  }
}
