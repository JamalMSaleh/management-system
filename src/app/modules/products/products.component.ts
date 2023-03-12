import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription, filter } from 'rxjs';
import { ProductForm } from './shared/enums/product-form';
import { Product, CreateProduct } from './shared/model/products.model';
import { ProductFacade } from './store/products.facade';

@Component({
  selector: 'odd-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit, OnDestroy {
  public productFormEnum: typeof ProductForm = ProductForm;
  products$: Observable<Product[]> = this.productFacade.selectProducts$;
  public productFormGroup!: FormGroup;
  subscriptions: Subscription = new Subscription();
  productsData: Product[] = [];
  clonedProductsData?: Product;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly productFacade: ProductFacade,
    private readonly ref: ChangeDetectorRef,
  ) { }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {
    this.getAllProduct();
    this.subscriptions.add(this.products$.pipe(
      filter((products: Product[]) => products.length > 0),
    ).subscribe((products?: Product[]) => {
      this.productsData = products !== undefined ? [...products] : [];
      this.ref.markForCheck();
    }));
    this.initializeForm();
  }
  initializeForm(): void {
    this.productFormGroup = this.formBuilder.group({
      [this.productFormEnum.Category]: new FormControl('', Validators.required),
      [this.productFormEnum.Packaging]: new FormControl(
        '',
        Validators.required,
      ),
      [this.productFormEnum.Variety]: new FormControl('', Validators.required),
    });
  }
  getAllProduct(): void {
    this.productFacade.getProducts();
  }
  getAllClick(): void {
    this.getAllProduct();
  }
  addProduct(): void {
    if (this.productFormGroup.valid) {
      const product: CreateProduct = this.productFormGroup.value;
      this.productFacade.addProduct(product);
    }
  }
  onRowEditInit(product: Product): void {
    this.clonedProductsData = { ...product };
  }
  onRowEditSave(product: Product): void {
    this.productFacade.updateProduct(product);
  }
  onRowEditCancel(ri: number): void {
    this.productsData[ri] = (<Product>this.clonedProductsData);
  }
  onRowDelete(product: Product): void {
    this.productFacade.deleteProduct(<number>product.id);
  }
}
