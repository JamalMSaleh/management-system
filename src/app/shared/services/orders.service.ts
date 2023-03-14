import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { DbTableNames } from 'src/database-config';
import { CreateOrder, Order } from '../../modules/orders/shared/model/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private readonly dbService: NgxIndexedDBService) { }

  addOrder(model: CreateOrder): Observable<Order> {
    return this.dbService.add(DbTableNames.Order, model);
  }
  update(model: Order): Observable<Order> {
    return this.dbService.update(DbTableNames.Order, model);
  }
  getAll(): Observable<Order[]> {
    return this.dbService.getAll(DbTableNames.Order);
  }
  delete(id: number): Observable<Order[]> {
    return this.dbService.delete(DbTableNames.Order, id);
  }
  getOrderByKey(id: number): Observable<Order> {
    return this.dbService.getByKey(DbTableNames.Order, id);
  }
}
