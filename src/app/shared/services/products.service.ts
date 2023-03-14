import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { CreateProduct, Product } from '../../modules/products/shared/model/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly dbService: NgxIndexedDBService) { }
  addProduct(model: CreateProduct): Observable<CreateProduct> {
    return this.dbService.add('product', model);
  }
  update(model: Product): Observable<Product> {
    return this.dbService.update('product', model);
  }
  getAll(): Observable<Product[]> {
    return this.dbService.getAll('product');
  }
  delete(id: number): Observable<Product[]> {
    return this.dbService.delete('product', id);
  }
  getProductByKey(id: number): Observable<Product> {
    return this.dbService.getByKey('product', id);
  }
}
