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

  //Se inyecta el servicio de Firebase y se asigna a database
  constructor(private database: FBDBService) {
  }
  
  ngOnInit(): void {
    //Se asigna a cuentas el observable de cuentas que se obtiene de la base de datos
    this.cuentas = this.database.getCuentas(); // Obtiene cuentas de FBDBService
  }

}
