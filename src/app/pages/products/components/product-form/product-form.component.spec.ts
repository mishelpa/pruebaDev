import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductFormComponent } from './product-form.component';
import { ProductsService } from '../../services/products.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productsService: any;
  let product = {
    id: "trj-cred1",
    name: "Tarjeta de credito1",
    description: "Tarjeta de credito personalizada",
    logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    date_release: "2023-12-15T00:00:00.000+00:00",
    date_revision: "2024-12-15T00:00:00.000+00:00"
  }

  beforeEach(() => {
    let store: any = {};
    let routerStub = () => ({ url: '/edit'});
    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });
    spyOn(localStorage, 'getItem').and.callFake( (key:string):string => {
      return store[key] || null;
     });
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['updateProduct', 'createProduct', 'verificationIdProduct']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ProductFormComponent],
      providers: [
        {provide: ProductsService, useValue: productsServiceSpy},
        { provide: Router, useFactory: routerStub },]
    });
    fixture = TestBed.createComponent(ProductFormComponent);
    productsService = TestBed.inject(ProductsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    localStorage.setItem('product', JSON.stringify(product));
    component.ngOnInit();
    expect(component.form.controls['id'].value).toEqual('trj-cred1');
    expect(component.form.controls['date_release'].value).toEqual('2023-12-14');
    expect(component.form.controls['date_revision'].value).toEqual('2024-12-14');
  });

  it('should buildForm', () => {
    component.buildForm();
		expect(component.form.controls['id']).toBeTruthy();
    expect(component.form.controls['name']).toBeTruthy();
    expect(component.form.controls['logo']).toBeTruthy();
    expect(component.form.controls['description']).toBeTruthy();
    expect(component.form.controls['date_release']).toBeTruthy();
    expect(component.form.controls['date_revision']).toBeTruthy();
	});

  // it('should actionProduct when edit is true', () => {
  //   component.edit = true
  //   component.actionProduct();
  //   expect(productsService.updateProduct).toHaveBeenCalled();
	// 	expect(component.form.controls['id'].value).toEqual(null);
	// });

  // it('should actionProduct when edit is false', () => {
  //   component.form.setValue(product);
  //   component.edit = false;
  //   component.actionProduct();
  //   expect(productsService.createProduct).toHaveBeenCalled();
	// 	expect(component.form.controls['id'].value).toEqual(null);
	// });

  // it('should verificationId', () => {
  //   component.form.setValue(product);
  //   component.form.controls['id'].setValue('trj-cred')
  //   productsService.verificationIdProduct.and.returnValue(of(true));
  //   component.verificationId();
  //   expect(productsService.verificationIdProduct).toHaveBeenCalled();
	// 	expect(component.isUnavailable).toEqual(true);
	// });

  // it('should resetForm', () => {
  //   component.resetForm();
	// 	expect(component.form.controls['id'].value).toEqual(null);
	// });

  // it('should getDateRevision', () => {
  //   component.getDateRevision('Sun Dec 10 2023 18:43:25 GMT-0500 (Peru Standard Time)');
	// 	expect(component.form.controls['date_revision'].value).toEqual('2023-12-10');
	// });
});
