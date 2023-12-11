import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let product = {
    id: "trj-cred1",
    name: "Tarjeta de credito1",
    description: "Tarjeta de credito personalizada",
    logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    date_release: "2023-12-15T00:00:00.000+00:00",
    date_revision: "2024-12-15T00:00:00.000+00:00"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [TableComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    component.items = [product]
    component.pageNumberSelect = 0;
    component.qtyItemsPerPage = 5;
    component.ngOnInit();
    expect(component.itemsShowQty).toEqual(1);

  });

  it('should showPageSelected', () => {
    component.showPageSelected(5);
    expect(component.pageNumberSelect).toEqual(5);
  });

  it('should showQtySelected', () => {
    component.showQtySelected(10);
    expect(component.qtyItemsPerPage).toEqual(10);
    expect(component.pageNumberSelect).toEqual(0);
  });

  it('should openModal', () => {
    component.openModal(product);
    expect(component.switchModal).toEqual(true);
    expect(component.pageNumberSelect).toEqual(0);
  });

  it('should closeModal', () => {
    component.closeModal(true);
    expect(component.switchModal).toEqual(true);
  });

  it('should close', () => {
    component.close();
    expect(component.switchModal).toEqual(false);
  });



});
