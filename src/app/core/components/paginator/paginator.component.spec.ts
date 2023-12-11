import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';
import { SimpleChange } from '@angular/core';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginatorComponent]
    });
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnChanges', () => {

    component.ngOnChanges({
      qtyItems: new SimpleChange(null ,6, true ),
      pageSize: new SimpleChange(null ,5, true )
    });
    fixture.detectChanges();
    expect(component.qtyItems).toEqual(6);
    expect(component.pageSize).toEqual(5);
  });

  it('should previousPage', () => {
    component.page = 5;
    component.previousPage();
    component.pageChanged.subscribe((value) => {
      expect(value).toBe(4);
    })
  });

  it('should nextPage', () => {
    component.page = 5;
    component.qtyPages = 8;
    component.nextPage();
    component.pageChanged.subscribe((value) => {
      expect(value).toBe(6);
    })
  });

  it('should selectPage', () => {
    component.selectPage(1);
    component.pageChanged.subscribe((value) => {
      expect(value).toBe(1);
    })
  });

  it('should getQtyPages', () => {
    component.qtyItems = 12;
    component.getQtyPages(5);
    expect(component.pages).toEqual([0,1,2]);
  });

  it('should selectSize', () => {
    component.qtyItems = 12;
    component.selectSize({target: {value: '5'}});
    component.sizeChanged.subscribe((value) => {
      expect(value).toBe(5);
    })
  });
});
