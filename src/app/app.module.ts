import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Importación de modulos de Angular Fire para el uso de Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FunctionsModule, getFunctions, provideFunctions } from '@angular/fire/functions';


//Importación de environment (constantes)
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

    provideDatabase(() => {
      const database = getDatabase();
      return database;
    }),

    provideAuth(() => {
      const auth = getAuth();
      return auth;
    }),

    FunctionsModule,
    provideFunctions(() => {
      const functions = getFunctions();
      return functions;
    }),

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
