import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseInterceptor } from './interceptors/base.interceptor';
import { TableComponent } from './components/table/table.component';
import { HeaderComponent } from './components/header/header.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TableComponent,
    HeaderComponent,
    PaginatorComponent,
    ModalComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    TableComponent,
    NavbarComponent
  ],
})
export class CoreModule {
  static forRoot(): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
    throw new Error('Method not implemented.');
  }
}
