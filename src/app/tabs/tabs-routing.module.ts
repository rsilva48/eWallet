import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'app',
    component: TabsPage,
    children: [
      {
        path: 'cuentas',
        loadChildren: () => import('../01-acc/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'transferencias',
        loadChildren: () => import('../02-trans/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../03-perfil/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/app/cuentas',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/cuentas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
