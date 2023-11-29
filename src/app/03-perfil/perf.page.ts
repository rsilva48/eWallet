import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { FBDBService } from '@services/firebase.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-tab3',
  templateUrl: 'perf.page.html',
  styleUrls: ['perf.page.scss'],
})
export class Tab3Page implements OnInit {
  public usuario: Observable<any> | undefined;
  public usuarioData: any;
  public transacciones: any[] = []; //Array de transacciones

  //Se inyecta el servicio de Firebase y se asigna a database
  constructor(private db: FBDBService) {
  }

  //Ejecuta la función getCuentas() del servicio de Firebase cuando se inicia la pestaña
  ngOnInit(): void {
    //Se asigna a usuario el promise de la cuenta que se obtiene de la base de datos
    //El user id se obtiene del archivo environment.ts, este simula el id del usuario logueado
    this.usuario = from(this.db.getProfile(environment.uid));
    this.usuario.subscribe((data) => {
      this.usuarioData = data;
    });
    this.db.getUserTrans().then((transacciones) => {
      this.transacciones = transacciones;
    });
  }

  ionViewDidEnter(): void {
    this.usuario = from(this.db.getProfile(environment.uid));
    this.usuario.subscribe((data) => {
      this.usuarioData = data;
    });
    this.db.getUserTrans().then(transacciones => {
      this.transacciones = transacciones;
    });
  }
}
