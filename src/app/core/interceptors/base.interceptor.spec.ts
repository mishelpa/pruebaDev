import { TestBed } from '@angular/core/testing';

import { BaseInterceptor } from './base.interceptor';
import { Observable } from 'rxjs';
import { HttpRequest } from '@angular/common/http';

describe('BaseInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BaseInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: BaseInterceptor = TestBed.inject(BaseInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should test intercept method', () => {
    const interceptor: BaseInterceptor = TestBed.inject(BaseInterceptor);
    const next: any = {
        handle: () => {
          return Observable.create((subscriber: { complete: () => void; }) => {
            subscriber.complete();
          });
        }
      };
    const requestMock = new HttpRequest('GET', '/test');
    const spy = spyOn(interceptor,'intercept').withArgs(requestMock,next).and.callThrough();
    interceptor.intercept(requestMock,next);
    expect(spy).toHaveBeenCalled();
  });
});
