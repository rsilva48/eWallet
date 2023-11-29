import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './perf.page';
import { Tab3PageRoutingModule } from './perf-routing.module';
import { Tab1PageModule } from '@app/01-acc/acc.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab3PageRoutingModule,
    Tab1PageModule
  ],
  declarations: [Tab3Page],
})
export class Tab3PageModule {}
