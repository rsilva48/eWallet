import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Database, listVal, ref } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public cuentasfb$: Observable<any>;

  //Se inyecta la base de datos de Firebase y se accede a la referencia de cuentas establecida en el archivo de entorno, para asignarlo a la variable cuentasfb$ como un arreglo
  constructor(database: Database) {
    const doc = ref(database, environment.accpath);
    this.cuentasfb$ = listVal(doc);
  }
  
  ngOnInit(): void {
  }

}
