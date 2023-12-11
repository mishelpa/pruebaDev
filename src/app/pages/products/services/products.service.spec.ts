import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  const productList = [
    {
      id: "trj-cred1",
      name: "Tarjeta de credito1",
      description: "Tarjeta de credito personalizada",
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: "2023-12-15T00:00:00.000+00:00",
      date_revision: "2024-12-15T00:00:00.000+00:00"
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getAllProducts', () => {

    service.getAllProducts().subscribe((list) => {
      expect(list).toEqual(productList);
    });

    const request = httpMock.expectOne('products');
    expect(request.request.method).toBe("GET");
    request.flush(productList);
    httpMock.verify();

  });


  it('should createProduct', () => {

    service.createProduct(productList[0]).subscribe((list) => {
      expect(list).toEqual(productList);
    });

    const request = httpMock.expectOne('products');
    expect(request.request.method).toBe("POST");
    request.flush(productList);
    httpMock.verify();

  });

  it('should updateProduct', () => {

    service.updateProduct(productList[0]).subscribe((list) => {
      expect(list).toEqual(productList);
    });

    const request = httpMock.expectOne('products');
    expect(request.request.method).toBe("PUT");
    request.flush(productList);
    httpMock.verify();

  });

  it('should deleteProduct', () => {

    service.deleteProduct('trj-cred1').subscribe((list) => {
      expect(list).toEqual('Product successfully removed');
    });

    const request = httpMock.expectOne('products?id=trj-cred1');
    expect(request.request.method).toBe("DELETE");
    request.flush('Product successfully removed');
    httpMock.verify();

  });

  it('should verificationIdProduct', () => {

    service.verificationIdProduct('trj-cred1').subscribe((el) => {
      expect(el).toEqual(true);
    });

    const request = httpMock.expectOne('products/verification?id=trj-cred1');
    expect(request.request.method).toBe("GET");
    request.flush(true);
    httpMock.verify();

  });
});
