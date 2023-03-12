import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription, filter } from 'rxjs';
import { PagesName } from 'src/app/shared/enums/pages-name';
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
  productFormEnum: typeof ProductForm = ProductForm;
  products$: Observable<Product[]> = this.productFacade.selectProducts$;
  pending$: Observable<boolean> = this.productFacade.selectProductsPending$;
  productFormGroup!: FormGroup;
  productEditFormGroup!: FormGroup;
  subscriptions: Subscription = new Subscription();
  productsData: Product[] = [];
  pendingState: boolean = false;
  pageNameEnum: typeof PagesName = PagesName;
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
    this.productFacade.getProducts();
    this.initializeSubscriptions();

    this.initializeForm();
  }
  initializeSubscriptions(): void {
    this.subscriptions.add(this.products$.pipe(
      filter((products: Product[]) => products.length > 0),
    ).subscribe((products?: Product[]) => {
      this.productsData = products !== undefined ? [...products] : [];
      this.ref.markForCheck();
    }));
    this.subscriptions.add(this.pending$.subscribe((state: boolean) => {
      this.pendingState = state;
      this.ref.markForCheck();
    }));
  }
  initializeForm(): void {
    this.productFormGroup = this.formBuilder.group({
      [this.productFormEnum.Category]: ['', [Validators.required]],
      [this.productFormEnum.Packaging]: ['', [Validators.required]],
      [this.productFormEnum.Variety]: ['', [Validators.required]],
    });
    this.productEditFormGroup = this.formBuilder.group({
      [this.productFormEnum.Id]: ['', [Validators.required]],
      [this.productFormEnum.Category]: ['', [Validators.required]],
      [this.productFormEnum.Packaging]: ['', [Validators.required]],
      [this.productFormEnum.Variety]: ['', [Validators.required]],
    });
  }
  addProduct(): void {
    if (this.productFormGroup.valid) {
      const product: CreateProduct = this.productFormGroup.value;
      this.productFacade.addProduct(product);
    }
  }
  onRowEditInit(product: Product): void {
    this.productEditFormGroup.patchValue({
      ...product,
    });
    this.clonedProductsData = { ...product };
  }
  onRowEditSave(): void {
    this.productFacade.updateProduct(this.productEditFormGroup.value);
    this.productEditFormGroup.reset();
  }
  onRowEditCancel(): void {
    this.productEditFormGroup.reset();
  }
  onRowDelete(product: Product): void {
    this.productFacade.deleteProduct(<number>product.id);
  }
}
