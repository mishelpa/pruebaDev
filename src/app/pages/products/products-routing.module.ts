import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './container/products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'create', component: ProductFormComponent },
  { path: 'edit', component: ProductFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
