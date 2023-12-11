import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BaseInterceptor } from './core/interceptors/base.interceptor';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
  ],
  providers: [
    {
     provide: HTTP_INTERCEPTORS,
     useClass: BaseInterceptor,
     multi: true
    }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
