import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './trans.page';

import { Tab2PageRoutingModule } from './trans-routing.module';
import { Tab1PageModule } from '@app/01-acc/acc.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    Tab1PageModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
