import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'principal-page',
    loadComponent: () => import('./principal-page/principal-page.page').then( m => m.PrincipalPagePage)
  },
  {
    path: 'shoppin',
    loadComponent: () => import('./shoppin/shoppin.page').then( m => m.ShoppinPage)
  },
  {
    path: 'acount',
    loadComponent: () => import('./acount/acount.page').then( m => m.AcountPage)
  },




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
