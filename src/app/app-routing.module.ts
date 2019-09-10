import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'profile/:id', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'upload/:id', loadChildren: './pages/upload/upload.module#UploadPageModule' },
  { path: 'view/:id', loadChildren: './pages/view/view.module#ViewPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'help', loadChildren: './pages/help/help.module#HelpPageModule' },
  { path: 'shipping', loadChildren: './pages/shipping/shipping.module#ShippingPageModule' },
  { path: 'sales', loadChildren: './pages/sales/sales.module#SalesPageModule' },
  { path: 'purchases', loadChildren: './pages/purchases/purchases.module#PurchasesPageModule' },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
