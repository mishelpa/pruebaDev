import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConstantsInterceptor } from '../utils/constants';
import { environment } from 'src/environments/environment';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let url = `${environment.apigateway.baseUrl}/${request.url}`

    const newHeaders = new HttpHeaders({
      "authorId":ConstantsInterceptor.AUTHOR_ID
    });

    let clone = request.clone( { headers: newHeaders, url } );
    return next.handle(clone);
  }
}
