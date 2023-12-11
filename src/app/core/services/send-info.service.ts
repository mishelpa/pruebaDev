import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductDto } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class SendInfoService {

  private info: Subject<ProductDto> = new Subject<ProductDto>();

  constructor() { }

  getInfo() {
    return this.info.asObservable();
  }

  setInfo(info: ProductDto): void {
    this.info.next(info)
  }
}
