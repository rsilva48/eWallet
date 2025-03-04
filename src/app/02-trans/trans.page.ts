import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FBDBService } from '@services/firebase.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'trans.page.html',
  styleUrls: ['trans.page.scss'],
})
export class Tab2Page implements OnInit {
  public cuentas: Observable<any> | undefined;
  public username: Observable<any> | undefined;
  origen: string = '';
  destino: string = '';
  desc: string = '';
  monto: number = 0;

  //Se inyecta el servicio de Firebase y se asigna a database
  constructor(
    private db: FBDBService,
    private toastController: ToastController
  ) {
    this.db.getUsername().then(name => {
      this.username = name;
    });
  }

  ngOnInit(): void {
    //Se asigna a cuentas el observable de cuentas que se obtiene de la base de datos
    this.cuentas = this.db.getCuentas(); // Obtiene cuentas de FBDBService
  }

  //Ejecuta la función getCuentas() del servicio de Firebase cuando se entra a la pestaña
  ionViewDidEnter(): void {
    this.cuentas = this.db.getCuentas();
  }

  //Llama a la función transferir del servicio de Firebase cuando se hace clic en el botón y muestra un toast con el resultado
  async transferir() {
    try {
      await this.db.transferir(this.origen, this.destino, this.monto, this.desc);
      this.presentToast('Transferencia realizada con éxito.', 'success', 'checkmark-circle');
      this.cuentas = this.db.getCuentas(); // Actualiza cuentas
      this.origen = '';
      this.destino = '';
      this.desc = '';
      this.monto = 0;
    } catch (error) {
      if (error instanceof Error) {
        this.presentToast(error.message, 'danger', 'close-circle');
      } else {
        this.presentToast('Error desconocido.', 'danger', 'close-circle');
      }
    }
  }

  //Se intento configurar la posición del toast en el archivo de entorno, pero no funciono
  async presentToast(msg: string, color: string, icon: string) {
    const toast = await this.toastController.create({
      message: `<ion-icon name="${icon}"></ion-icon> ${msg}`,
      duration: 5000,
      position: 'bottom',
      color: color,
    });
    toast.present();
  }
}
