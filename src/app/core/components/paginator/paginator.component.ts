import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input() page: number = 0;
  @Input() pageSize: 5 | 10 | 20 = 5;
  @Input() qtyItems: number = 0;
  @Input() itemsShowQty: number = 0;

  @Output() pageChanged = new EventEmitter<number>();
  @Output() sizeChanged = new EventEmitter<number>();

  qtyPages: number = 0;
  pages: number[] = [];
  start: number = 0;
  end: number = 0;

  ngOnInit(): void {
    this.start = this.page * this.pageSize + 1;
    this.end = this.page * this.pageSize + this.pageSize;
    this.getQtyPages(this.pageSize)
  }
  ngOnChanges(changes: SimpleChanges): void
  {
    const qtyItemsValue = changes['qtyItems'];
    if(qtyItemsValue && qtyItemsValue.currentValue)
    {
      this.qtyItems = qtyItemsValue.currentValue
    }

    const pageSizeValue = changes['pageSize'];
    if(pageSizeValue && pageSizeValue.currentValue)
    {
      this.pageSize = pageSizeValue.currentValue
    }

    this.start = this.page * this.pageSize + 1;
    this.end = this.page * this.pageSize + this.pageSize;
    this.getQtyPages(this.pageSize)
  }
  previousPage() {
    if (this.page !== 0) {
      this.selectPage(this.page - 1)
    }
  }

  nextPage() {
    if (this.page !== this.qtyPages - 1) {
      this.selectPage(this.page + 1);
    }
  }

  selectPage(index: number) {
    this.pageChanged.emit(index);
  }

  getQtyPages(qty: number) {
    this.pages = [];
    for (let i = 0; i < this.qtyItems / qty; i++) {
      this.pages.push(i);
    }

    this.qtyPages = this.pages.length;
  }

  selectSize(event:any) {
    this.sizeChanged.emit(Number(event.target.value));
    this.getQtyPages(Number(event.target.value));
  }

}
