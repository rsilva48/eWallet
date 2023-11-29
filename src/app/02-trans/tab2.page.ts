import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FBDBService } from '@services/firebase.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public cuentas: Observable<any> | undefined;
  origen: string = '';
  destino: string = '';
  monto: number = 0;

  //Se inyecta el servicio de Firebase y se asigna a database
  constructor(
    private db: FBDBService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    //Se asigna a cuentas el observable de cuentas que se obtiene de la base de datos
    this.cuentas = this.db.getCuentas(); // Obtiene cuentas de FBDBService
  }

  async transferir() {
    try {
      await this.db.transferir(this.origen, this.destino, this.monto);
      this.presentToast('Transferencia realizada con éxito.');
      this.cuentas = this.db.getCuentas(); // Actualiza cuentas
      this.origen = '';
      this.destino = '';
      this.monto = 0;
    } catch (error) {
      if (error instanceof Error) {
        this.presentToast(error.message);
      } else {
        this.presentToast('Error desconocido.');
      }
    }
  }

  //Se intento configurar la posición del toast en el archivo de entorno, pero no funciono
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }
}
