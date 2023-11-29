import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FBDBService } from '@services/firebase.service'; 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public cuentas: Observable<any> | undefined;

  //Se inyecta el servicio de Firebase y se asigna a database
  constructor(private db: FBDBService) {
  }
  
  ngOnInit(): void {
    //Se asigna a cuentas el observable de cuentas que se obtiene de la base de datos
    this.cuentas = this.db.getCuentas(); // Obtiene cuentas de FBDBService
  }

}
