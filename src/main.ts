import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { setupConfig } from '@ionic/core';

defineCustomElements(window);

// Modo "md" para visualizar en el navegador en la interfaz de Android (Material Design), "ios" para interfaz de iOS
setupConfig({
  mode: 'ios',
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));
