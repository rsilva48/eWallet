import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './acc.page';
import { PipeSinComa } from '@app/sinComa.pipe';
import { Tab1PageRoutingModule } from './acc-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
  ],
  declarations: [Tab1Page, PipeSinComa],
  exports: [PipeSinComa], // Exporta SinComaPipe
})
export class Tab1PageModule {}
