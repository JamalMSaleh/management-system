export interface CreateOrder {
  orderType: string;
  products: Product[];
  organization: number;
}
export interface Order extends CreateOrder {
  id?: number;
}

interface Product {
  id: number;
  volume: number;
  pricePerUnit: number;
}

export interface PropsOrders {
  orders: Order[];
}
