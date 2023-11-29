import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FBDBService } from '@services/firebase.service'; 

@Component({
  selector: 'app-tab1',
  templateUrl: 'acc.page.html',
  styleUrls: ['acc.page.scss']
})
export class Tab1Page implements OnInit {

  public cuentas: Observable<any> | undefined;
  public username: Observable<any> | undefined;

  //Se inyecta el servicio de Firebase y se asigna a database
  constructor(private db: FBDBService) {
    this.db.getUsername().then(name => {
      this.username = name;
    });
  }
  
  //Ejecuta la función getCuentas() del servicio de Firebase cuando se inicia la pestaña
  ngOnInit(): void {
    //Se asigna a cuentas el observable de cuentas que se obtiene de la base de datos
    this.cuentas = this.db.getCuentas();
  }

  //Ejecuta la función getCuentas() del servicio de Firebase cuando se entra a la pestaña
  ionViewDidEnter(): void {
    this.cuentas = this.db.getCuentas();
  }
}
