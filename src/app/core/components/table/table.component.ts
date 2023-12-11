import { Component, Input, SimpleChanges } from '@angular/core';
import { HeadersDto } from '../../interfaces/table.interface';
import { ProductDto } from '../../interfaces/product.interface';
import { ProductsService } from 'src/app/pages/products/services/products.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  constructor(
    private productsService: ProductsService,
    private router: Router,
  ) {}

  @Input() headers: HeadersDto[] = [];
  @Input() items: any[] = [];
  qty: number = 0;
  @Input() action: boolean = false;

  pages: number[] = [];
  pageNumberSelect: number = 0;
  qtyItemsPerPage: 5 | 10 | 20 = 5;
  itemsShow: any[] = [];
  qtyProducts: number = 0;
  itemsShowQty: number = 0;

  switchModal: boolean = false;
  idSelected: string = '';
  nameSelected: string = '';

  searchInput = new FormControl('');

  ngOnInit(): void {
    if(this.items.length > 0) {
      this.showItems();
    }

    this.searchInput.valueChanges.subscribe(val => {
      this.itemsShow = this.items.filter((item) => {
        const validator: boolean[] = []
        this.headers.filter(header => header.type === 'text').forEach((header) => {
          validator.push(item[header.id].includes(val?.toLowerCase()))
        })
        return validator.some(el => el)
      })
    })
  }
  ngOnChanges(changes: SimpleChanges): void
  {
    const itemsValue = changes['items'];
    if(itemsValue.currentValue)
    {
      this.items = itemsValue.currentValue
      this.showItems();
    }
  }
  showPageSelected(event: number) {
    this.pageNumberSelect = event
    this.showItems()
  }

  showQtySelected(event: any) {
    this.qtyItemsPerPage = event
    this.pageNumberSelect = 0
    this.showItems()
  }

  showItems() {
    this.qty = this.items.length
    const firstItem = this.pageNumberSelect * this.qtyItemsPerPage;
    const lastItem = this.pageNumberSelect * this.qtyItemsPerPage + this.qtyItemsPerPage;
    this.itemsShow = this.items.slice(firstItem, lastItem);
    this.itemsShowQty = this.itemsShow.length;
  }

  openModal(item: ProductDto) {
    this.switchModal = true;
    this.idSelected = item.id;
    this.nameSelected = item.name;
  }

  closeModal(event: boolean) {
    this.switchModal = event;
  }

  close() {
    this.switchModal = false;
  }

  deleteItem() {
    this.productsService.deleteProduct(this.idSelected).subscribe(() => {
      this.close();
      window.location.reload();
    })
  }

  goEditPage(item: ProductDto) {
    localStorage.setItem('product', JSON.stringify(item))
    this.router.navigate(['edit']);
  }
}
