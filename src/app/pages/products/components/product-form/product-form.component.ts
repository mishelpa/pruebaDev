import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDto } from 'src/app/core/interfaces/product.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  form: FormGroup = new FormGroup({});
  dateRevision: string = '';
  dateInitialRelease: string = '';
  product: ProductDto | null = null;
  isUnavailable: Boolean = false;
  edit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private route: Router) { }

  ngOnInit() {
    this.buildForm();
    if(this.route.url === '/edit') {
      this.edit = true;
      const productStorage = localStorage.getItem('product')
      if (productStorage) {
        const product = JSON.parse(productStorage);
        this.form.patchValue(product);
        this.form.controls['date_release'].setValue(this.setDate(new Date(product.date_release)))
        this.getDateRevision(new Date(product.date_release))
      }
    } else {
      this.edit = false;
      this.form.controls['date_release'].setValue(this.setDate(new Date()))
    }

    this.dateInitialRelease = this.setDate(new Date())

    this.form.controls['date_release'].valueChanges.subscribe(val=>{
      let fecha = new Date(val)
      fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset())
      this.getDateRevision(new Date(fecha))
    })

    this.form.controls['id'].valueChanges.subscribe(val=>{
      this.verificationId()
    })

  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      logo: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      date_release: ['', Validators.required],
      date_revision: ['', Validators.required],
    })
  }

  actionProduct() {
    if(this.edit) {
        this.productsService.updateProduct(this.form.value).subscribe(() => {
          this.form.reset();
          this.route.navigate(['']);
        })
      } else {
        this.productsService.createProduct(this.form.value).subscribe(() => {
          this.form.reset();
          this.route.navigate(['']);
        })
      }
    }

  verificationId() {
    this.productsService.verificationIdProduct(this.form.controls['id'].value).subscribe(isUnavailable => this.isUnavailable = isUnavailable)
  }

  resetForm() {
    this.form.reset()
  }

  getDateRevision(dateRelease: any) {
    dateRelease.setFullYear(dateRelease.getFullYear() + 1);
    this.dateRevision = this.setDate(dateRelease);
    this.form.controls['date_revision'].setValue(this.dateRevision)
  }

  setDate(dateConvert: Date) {
    const day = ("0" + dateConvert.getDate()).slice(-2);
    const month = ("0" + (dateConvert.getMonth() + 1)).slice(-2);

    return dateConvert.getFullYear()+"-"+(month)+"-"+(day) ;
  }
}
